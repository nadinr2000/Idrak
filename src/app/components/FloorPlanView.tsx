import { AlertCircle, ZoomIn, ZoomOut, RotateCcw, Grid3x3, LayoutGrid, Map, Activity, Thermometer, Wind, Droplets } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { RoomDetailPanel } from './RoomDetailPanel';
import { SensorDetailPanel } from './SensorDetailPanel';
import { IncidentDetailView } from './IncidentDetailView';
import { Language, translations } from '../translations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import floorPlanImage from '@/assets/NewBG.png';


// Legend Component
function FloorPlanLegend({ emergencyMode }: { emergencyMode: false | 'incident' | 'emergency' }) {
  const legendItems = [
    { symbol: 'DP', label: 'Differential Pressure', color: '#139B48', shape: 'circle' },
    { symbol: 'R', label: 'Radiological Detectors', color: '#139B48', shape: 'triangle' },
    { symbol: 'B', label: 'Biological Detectors', color: '#139B48', shape: 'triangle' },
    { symbol: 'C', label: 'Chemical Detectors', color: '#139B48', shape: 'triangle' },
    { symbol: 'CO₂', label: 'CO₂ Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'CO', label: 'CO Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'O₂', label: 'O₂ Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'T', label: 'Temperature Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'H', label: 'Humidity Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'W', label: 'Water Level Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'AF', label: 'Airflow Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'F', label: 'Filter Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'GTV', label: 'Gastight Valve Sensors', color: '#139B48', shape: 'rectangle' },
    { symbol: 'DOOR', label: 'Door Status', color: '#139B48', shape: 'rectangle' },
  ];

  const renderShape = (item: typeof legendItems[0]) => {
    const baseClasses = "flex items-center justify-center text-[8px] font-bold text-black border border-black";
    
    if (item.shape === 'circle') {
      return (
        <div 
          className={`w-5 h-5 rounded-full ${baseClasses}`}
          style={{ backgroundColor: item.color }}
        >
          {item.symbol}
        </div>
      );
    } else if (item.shape === 'triangle') {
      return (
        <div className="w-5 h-5 relative flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 16 16" fill="none">
            <path 
              d="M8 2 L14 14 L2 14 Z" 
              fill={item.color} 
              stroke="black" 
              strokeWidth="1"
            />
          </svg>
          <span className="relative z-10 text-[8px] font-bold text-black mt-1">{item.symbol}</span>
        </div>
      );
    } else {
      // rectangle
      return (
        <div 
          className={`w-7 h-4 rounded ${baseClasses}`}
          style={{ backgroundColor: item.color }}
        >
          <span className="text-[6px]">{item.symbol}</span>
        </div>
      );
    }
  };

  return (
    <div className="rounded-lg shadow-md border-2 border-gray-300 overflow-hidden max-h-[calc(100vh-220px)] flex flex-col bg-transparent">
      <div className="overflow-y-auto">
        <table className="w-full border-collapse bg-white">
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr className="border-b-2 border-gray-300">
              <th className="py-1.5 px-2 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">Symbol</th>
              <th className="py-1.5 px-2 text-left text-[10px] font-bold text-gray-700">Sensor Type</th>
            </tr>
          </thead>
          <tbody>
            {legendItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50 bg-white">
                <td className="py-1 px-2 border-r border-gray-300">
                  {renderShape(item)}
                </td>
                <td className="py-1 px-2 text-[10px] font-semibold text-gray-900 whitespace-nowrap">
                  {item.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface FloorPlanViewProps {
  floorId: string;
  onRoomClick: (roomId: string) => void;
  onIncidentClick: (incidentId: string) => void;
  onBack?: () => void;
  emergencyMode?: false | 'incident' | 'emergency';
  hideBreadcrumbs?: boolean;
  language?: Language;
}

interface Sensor {
  id: string;
  name: string;
  type: 'chemical' | 'temperature' | 'smoke' | 'motion' | 'pressure' | 'air-quality';
  subType?: 'R' | 'B' | 'C' | 'CO2' | 'CO' | 'O2' | 'DP' | 'T' | 'H' | 'W' | 'AF' | 'F' | 'GTV' | 'DOOR';
  status: 'operational' | 'warning' | 'critical';
  value: string;
  x: number;
  y: number;
  lastUpdate?: string;
}

export function FloorPlanView({ floorId, onRoomClick, onIncidentClick, onBack, emergencyMode, hideBreadcrumbs, language = 'en' }: FloorPlanViewProps) {
  const t = translations[language];
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [hoveredFloorSensor, setHoveredFloorSensor] = useState<{ id: string; name: string; status: string; value: string; type: string } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [leftPanelWidth, setLeftPanelWidth] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1.0);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(-120);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  
  // Persist viewMode in localStorage to maintain state across demo mode changes
  const [viewMode, setViewMode] = useState<'dashboard' | 'floorplan'>(() => {
    const saved = localStorage.getItem('idrak-floorplan-viewmode');
    return (saved === 'dashboard' || saved === 'floorplan') ? saved : 'floorplan';
  });

  // Save viewMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('idrak-floorplan-viewmode', viewMode);
  }, [viewMode]);

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentHoverElementRef = useRef<HTMLElement | null>(null);

  // Check localStorage for clicked sensor on mount and when switching to dashboard view
  useEffect(() => {
    console.log('ViewMode changed to:', viewMode);
    const clickedSensor = localStorage.getItem('clickedSensor');
    console.log('Clicked sensor from localStorage:', clickedSensor);
    if (clickedSensor) {
      try {
        const sensor = JSON.parse(clickedSensor);
        console.log('Parsed sensor:', sensor);
        setSelectedSensor(sensor);
        if (viewMode === 'dashboard') {
          setIsRightPanelCollapsed(false);
        }
      } catch (e) {
        console.error('Failed to parse clicked sensor:', e);
        localStorage.removeItem('clickedSensor');
      }
    }
  }, [viewMode]);

  // Helper function to get sensor shape based on subType
  const getSensorShape = (subType?: string) => {
    if (!subType) return 'circle';
    if (['R', 'B', 'C'].includes(subType)) return 'triangle';
    if (['GTV', 'DOOR'].includes(subType)) return 'rectangle';
    return 'circle';
  };

  // Helper component to render sensor with correct shape
  const SensorMarker = ({ 
    subType, 
    label, 
    status = 'operational',
    onMouseEnter, 
    onMouseLeave, 
    onClick
  }: { 
    subType?: string; 
    label: string; 
    status?: 'operational' | 'warning' | 'critical';
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
  }) => {
    const shape = getSensorShape(subType);
    const bgColor = status === 'warning' ? 'bg-orange-500' : status === 'critical' ? 'bg-red-600' : 'bg-green-600';
    const fillColor = status === 'warning' ? '#f97316' : status === 'critical' ? '#dc2626' : '#16a34a';
    const animateClass = status === 'warning' || status === 'critical' ? 'animate-pulse' : '';
    const baseClasses = `${bgColor} border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative ${animateClass}`;
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      currentHoverElementRef.current = e.currentTarget;
      onMouseEnter();
    };
    
    const handleMouseLeave = () => {
      currentHoverElementRef.current = null;
      onMouseLeave();
    };
    
    const handleClick = (e: React.MouseEvent) => {
      console.log('SensorMarker mouseDown!', label);
      e.stopPropagation();
      e.preventDefault();
      onClick();
    };
    
    if (shape === 'circle') {
      return (
        <div 
          data-sensor-marker
          className={`w-1.5 h-1.5 rounded-full ${baseClasses}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleClick}
        >
          <span className="text-[2px] text-gray-900 leading-none font-bold">{label}</span>
        </div>
      );
    } else if (shape === 'triangle') {
      return (
        <div 
          data-sensor-marker
          className={`w-1.5 h-1.5 relative cursor-pointer hover:opacity-80 transition-opacity ${animateClass}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleClick}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 6 6" fill="none">
            <path 
              d="M3 0.5 L5.5 5 L0.5 5 Z" 
              fill={fillColor}
              stroke="#1f2937" 
              strokeWidth="0.3"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[2px] text-gray-900 leading-none font-bold z-10">{label}</span>
        </div>
      );
    } else {
      return (
        <div 
          data-sensor-marker
          className={`w-2 h-1 rounded-sm ${baseClasses}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleClick}
        >
          <span className="text-[2px] text-gray-900 leading-none font-bold">{label}</span>
        </div>
      );
    }
  };

  // Reset selections when hideBreadcrumbs is true
  useEffect(() => {
    if (hideBreadcrumbs) {
      setSelectedRoom(null);
      setSelectedSensor(null);
      setSelectedIncident(null);
      setIsRightPanelCollapsed(true);
    }
  }, [hideBreadcrumbs]);

  // Auto-open incident warning panel in dashboard view during active incident mode
  useEffect(() => {
    if (emergencyMode === 'incident' && viewMode === 'dashboard') {
      // Create a warning sensor with AI insights
      const warningSensor: Sensor = {
        id: 'warning-incident-001',
        name: 'Active Incident Alert',
        type: 'warning',
        subType: 'AI',
        status: 'warning',
        value: 'Elevated Threat Level Detected',
        x: 0,
        y: 0,
        lastUpdate: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit', 
          hour12: false 
        })
      };
      setSelectedSensor(warningSensor);
      setIsRightPanelCollapsed(false);
      localStorage.setItem('clickedSensor', JSON.stringify(warningSensor));
    } else if (emergencyMode === 'emergency' && viewMode === 'dashboard') {
      // Create a critical threat sensor for emergency mode
      const threatSensor: Sensor = {
        id: 'threat-emergency-001',
        name: 'Detected Threat Info',
        type: 'chemical',
        subType: 'C',
        status: 'critical',
        value: 'CHEMICAL AGENT DETECTED',
        x: 73,
        y: 50,
        lastUpdate: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit', 
          hour12: false 
        })
      };
      setSelectedSensor(threatSensor);
      setIsRightPanelCollapsed(false);
      localStorage.setItem('clickedSensor', JSON.stringify(threatSensor));
    }
  }, [emergencyMode, viewMode]);

  // Initialize panel width
  useEffect(() => {
    if (leftPanelWidth === null && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const initialWidth = Math.floor((containerWidth - 48) / 2);  // Start with split view width
      setLeftPanelWidth(initialWidth);
    }
  }, [leftPanelWidth]);

  // Watch for container size changes
  useEffect(() => {
    if (!containerRef.current) return;
    // Only update leftPanelWidth for floor plan view, not dashboard view
    if (viewMode !== 'floorplan') return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        
        // Always use split view width - don't change based on right panel state
        const newLeftPanelWidth = Math.floor((containerWidth - 48) / 2);
        
        setLeftPanelWidth(newLeftPanelWidth);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isRightPanelCollapsed, viewMode]);

  // Listen for sensor clicks from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'clickedSensor' && e.newValue) {
        try {
          const sensor = JSON.parse(e.newValue);
          console.log('Sensor click detected from another tab:', sensor);
          setSelectedSensor(sensor);
          setSelectedIncident(null);
          setIsRightPanelCollapsed(false);
          // If in dashboard view, stay in dashboard view
          // If in floor plan view, stay in floor plan view
        } catch (error) {
          console.error('Error parsing sensor from localStorage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle panning
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        const deltaX = e.clientX - panStart.x;
        const deltaY = e.clientY - panStart.y;
        setPanX(prev => prev + deltaX);
        setPanY(prev => prev + deltaY);
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsPanning(false);
    };

    if (isPanning) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (!isPanning) {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
  }, [isPanning, panStart]);

  // Track mouse position for tooltip and clear when not hovering
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredFloorSensor) {
        // Check if mouse is still over the sensor element
        const target = e.target as HTMLElement;
        const isOverSensor = currentHoverElementRef.current && 
                            (currentHoverElementRef.current === target || 
                             currentHoverElementRef.current.contains(target));
        
        if (!isOverSensor) {
          // Mouse moved away from sensor, clear tooltip
          setHoveredFloorSensor(null);
          currentHoverElementRef.current = null;
          return;
        }
        
        // Update tooltip position
        if (tooltipRef.current) {
          const tooltipWidth = tooltipRef.current.offsetWidth || 200;
          const tooltipHeight = tooltipRef.current.offsetHeight || 80;
          const offset = 10;
          const padding = 10;
          
          let x = e.clientX + offset;
          let y = e.clientY + offset;
          
          if (x + tooltipWidth + padding > window.innerWidth) {
            x = e.clientX - tooltipWidth - offset;
          }
          
          if (y + tooltipHeight + padding > window.innerHeight) {
            y = e.clientY - tooltipHeight - offset;
          }
          
          if (x < padding) {
            x = padding;
          }
          
          if (y < padding) {
            y = e.clientY + offset;
          }
          
          setTooltipPosition({ x, y });
        }
      }
    };

    if (hoveredFloorSensor) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredFloorSensor]);

  // Zoom functions
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.3));
  };

  const handleResetZoom = () => {
    setZoom(1.0);
    setPanX(0);
    setPanY(-120);
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.5, Math.min(5, prev + delta)));
  };

  // Start panning
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start panning if clicking on an interactive element (sensor, button, etc.)
    const target = e.target as HTMLElement;
    const isInteractiveElement = target.closest('[data-sensor-marker]') || 
                                  target.closest('button') ||
                                  target.tagName === 'BUTTON';
    
    console.log('MouseDown - target:', target.tagName, 'isInteractive:', isInteractiveElement, 'zoom:', zoom);
    
    if (zoom >= 1 && !isInteractiveElement) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleSensorClick = (sensor: any) => {
    console.log('Sensor clicked:', sensor);
    // Save to localStorage
    localStorage.setItem('clickedSensor', JSON.stringify(sensor));
    console.log('Saved to localStorage');
    
    setSelectedSensor(sensor);
    setSelectedIncident(null);
    setIsRightPanelCollapsed(false);
    
    // Don't change view mode - stay on current view
  };

  return (
    <div ref={containerRef} className={`h-full w-full overflow-hidden ${
      emergencyMode === 'emergency' ? 'bg-red-50' : emergencyMode === 'incident' ? 'bg-orange-50/30' : 'bg-gray-50'
    }`}>
      {/* Floor Plan - Full Width */}
      <div className={`w-full h-full overflow-auto ${
        emergencyMode === 'emergency' ? 'bg-red-50' : emergencyMode === 'incident' ? 'bg-orange-50/30' : 'bg-gray-100'
      }`}>
        {/* Facility Header Bar */}
        <div className="px-4 pt-4 pb-3">
          <div className={`flex items-center justify-between gap-3 border rounded-lg px-4 py-1.5 ${
            emergencyMode === 'emergency' 
              ? 'bg-red-200 border-red-400' 
              : emergencyMode === 'incident' 
              ? 'bg-orange-200 border-orange-400' 
              : 'bg-green-200 border-green-400'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-gray-900">{t.bunkerAlpha7}</span>
              {emergencyMode === 'emergency' ? (
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-red-600">
                  <div className="w-2 h-2 rounded-full bg-red-200 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase">{t.underAttack}</span>
                </div>
              ) : emergencyMode === 'incident' ? (
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-orange-600">
                  <div className="w-2 h-2 rounded-full bg-orange-200 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase">{t.warning}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-200 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase">{t.operational || 'OPERATIONAL'}</span>
                </div>
              )}
            </div>
            
            {/* View Toggle Buttons */}
            <div className="flex items-center bg-white rounded-md shadow-sm border border-gray-300 overflow-hidden">
              <button
                className={`px-3 py-2 flex items-center justify-center transition-colors ${
                  viewMode === 'dashboard' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={language === 'en' ? 'Dashboard View' : 'عرض لوحة القيادة'}
                onClick={() => setViewMode('dashboard')}
              >
                <LayoutGrid className="size-5" />
              </button>
              <div className="w-px h-6 bg-gray-300" />
              <button
                className={`px-3 py-2 flex items-center justify-center transition-colors ${
                  viewMode === 'floorplan' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={language === 'en' ? 'Floor Plan View' : 'عرض مخطط الطابق'}
                onClick={() => setViewMode('floorplan')}
              >
                <Map className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard View */}
        {viewMode === 'dashboard' && (
          <div className="flex gap-0">
            {/* Left Panel - Dashboard Content */}
            <div className={`px-6 pb-4 transition-all duration-300 ${selectedSensor ? 'w-[70%]' : 'w-full'}`}>
            {/* Quick Stats Tiles */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {/* Total Sensors */}
              <div className="bg-white rounded-lg border-2 border-gray-300 p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Total Sensors</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">248</div>
                  <div className="text-[10px] text-green-600 font-semibold mt-0.5">↑ 100% Operational</div>
                </div>
              </div>

              {/* Temperature */}
              <div className="bg-white rounded-lg border-2 border-gray-300 p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <div className="p-1.5 bg-orange-100 rounded-lg">
                    <Thermometer className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Temperature</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-900">22.5°C</div>
                  <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Avg across facility</div>
                </div>
              </div>

              {/* Air Quality */}
              <div className={`rounded-lg border-2 p-3 shadow-sm hover:shadow-md transition-shadow ${
                emergencyMode === 'incident' 
                  ? 'bg-orange-50 border-orange-300' 
                  : 'bg-white border-gray-300'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className={`p-1.5 rounded-lg ${
                    emergencyMode === 'incident' ? 'bg-orange-100' : 'bg-green-100'
                  }`}>
                    <Wind className={`w-4 h-4 ${
                      emergencyMode === 'incident' ? 'text-orange-600' : 'text-green-600'
                    }`} />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Air Quality</span>
                </div>
                <div className="mt-2">
                  <div className={`text-2xl font-bold ${
                    emergencyMode === 'incident' ? 'text-orange-600' : 'text-gray-900'
                  }`}>
                    {emergencyMode === 'incident' ? 'Elevated' : 'Good'}
                  </div>
                  <div className={`text-[10px] font-semibold mt-0.5 ${
                    emergencyMode === 'incident' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    CO₂: {emergencyMode === 'incident' ? '483 ppm ↑15%' : '420 ppm'}
                  </div>
                </div>
              </div>

              {/* Humidity */}
              <div className={`rounded-lg border-2 p-3 shadow-sm hover:shadow-md transition-shadow ${
                emergencyMode === 'incident' 
                  ? 'bg-orange-50 border-orange-300' 
                  : 'bg-white border-gray-300'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className={`p-1.5 rounded-lg ${
                    emergencyMode === 'incident' ? 'bg-orange-100' : 'bg-cyan-100'
                  }`}>
                    <Droplets className={`w-4 h-4 ${
                      emergencyMode === 'incident' ? 'text-orange-600' : 'text-cyan-600'
                    }`} />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Humidity</span>
                </div>
                <div className="mt-2">
                  <div className={`text-2xl font-bold ${
                    emergencyMode === 'incident' ? 'text-orange-600' : 'text-gray-900'
                  }`}>
                    {emergencyMode === 'incident' ? '49%' : '45%'}
                  </div>
                  <div className={`text-[10px] font-semibold mt-0.5 ${
                    emergencyMode === 'incident' ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {emergencyMode === 'incident' ? '↑8% above normal' : 'Optimal range'}
                  </div>
                </div>
              </div>
            </div>

            {/* Trend Graph - Historical + AI Prediction */}
            <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Environmental Trends (Last 6h + AI Prediction 6h)</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-orange-600"></div>
                    <span className="text-[10px] text-gray-600">Temperature (Past)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-orange-300"></div>
                    <span className="text-[10px] text-gray-600">Temperature (AI)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-green-600"></div>
                    <span className="text-[10px] text-gray-600">Air Quality (Past)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-green-300"></div>
                    <span className="text-[10px] text-gray-600">Air Quality (AI)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-cyan-600"></div>
                    <span className="text-[10px] text-gray-600">Humidity (Past)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-cyan-300"></div>
                    <span className="text-[10px] text-gray-600">Humidity (AI)</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={emergencyMode === 'incident' ? [
                    // Historical data (last 6 hours) - Incident Mode
                    { time: '-6h', tempPast: 21.8, airQualityPast: 410, humidityPast: 43 },
                    { time: '-5h', tempPast: 22.0, airQualityPast: 415, humidityPast: 44 },
                    { time: '-4h', tempPast: 22.1, airQualityPast: 420, humidityPast: 44 },
                    { time: '-3h', tempPast: 22.3, airQualityPast: 435, humidityPast: 45 },
                    { time: '-2h', tempPast: 22.4, airQualityPast: 455, humidityPast: 47 },
                    { time: '-1h', tempPast: 22.5, airQualityPast: 470, humidityPast: 48 },
                    { time: 'Now', tempPast: 22.5, airQualityPast: 483, humidityPast: 49, tempForecast: 22.5, airQualityForecast: 483, humidityForecast: 49 },
                    // AI Predicted data (next 6 hours) - Continuing elevation
                    { time: '+1h', tempForecast: 22.6, airQualityForecast: 495, humidityForecast: 50 },
                    { time: '+2h', tempForecast: 22.7, airQualityForecast: 510, humidityForecast: 51 },
                    { time: '+3h', tempForecast: 22.8, airQualityForecast: 525, humidityForecast: 52 },
                    { time: '+4h', tempForecast: 22.9, airQualityForecast: 540, humidityForecast: 53 },
                    { time: '+5h', tempForecast: 23.0, airQualityForecast: 555, humidityForecast: 54 },
                    { time: '+6h', tempForecast: 23.1, airQualityForecast: 570, humidityForecast: 55 },
                  ] : [
                    // Historical data (last 6 hours) - Normal Mode
                    { time: '-6h', tempPast: 21.8, airQualityPast: 410, humidityPast: 43 },
                    { time: '-5h', tempPast: 22.0, airQualityPast: 415, humidityPast: 44 },
                    { time: '-4h', tempPast: 22.1, airQualityPast: 418, humidityPast: 44 },
                    { time: '-3h', tempPast: 22.3, airQualityPast: 420, humidityPast: 45 },
                    { time: '-2h', tempPast: 22.4, airQualityPast: 422, humidityPast: 45 },
                    { time: '-1h', tempPast: 22.5, airQualityPast: 420, humidityPast: 45 },
                    { time: 'Now', tempPast: 22.5, airQualityPast: 420, humidityPast: 45, tempForecast: 22.5, airQualityForecast: 420, humidityForecast: 45 },
                    // AI Predicted data (next 6 hours) - Normal Mode
                    { time: '+1h', tempForecast: 22.6, airQualityForecast: 425, humidityForecast: 46 },
                    { time: '+2h', tempForecast: 22.7, airQualityForecast: 428, humidityForecast: 46 },
                    { time: '+3h', tempForecast: 22.8, airQualityForecast: 430, humidityForecast: 47 },
                    { time: '+4h', tempForecast: 22.9, airQualityForecast: 432, humidityForecast: 47 },
                    { time: '+5h', tempForecast: 23.0, airQualityForecast: 435, humidityForecast: 48 },
                    { time: '+6h', tempForecast: 23.1, airQualityForecast: 438, humidityForecast: 48 },
                  ]}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    stroke="#9ca3af"
                    label={{ value: 'Temp (°C) / Humidity (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    stroke="#9ca3af"
                    label={{ value: 'Air Quality (ppm)', angle: 90, position: 'insideRight', style: { fontSize: 10, fill: '#6b7280' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '11px'
                    }}
                    formatter={(value: any, name: string) => {
                      if (name === 'tempPast' || name === 'tempForecast') return [value + '°C', name === 'tempPast' ? 'Temperature (Past)' : 'Temperature (AI Forecast)'];
                      if (name === 'airQualityPast' || name === 'airQualityForecast') return [value + ' ppm', name === 'airQualityPast' ? 'Air Quality (Past)' : 'Air Quality (AI Forecast)'];
                      if (name === 'humidityPast' || name === 'humidityForecast') return [value + '%', name === 'humidityPast' ? 'Humidity (Past)' : 'Humidity (AI Forecast)'];
                      return [value, name];
                    }}
                  />
                  
                  {/* Temperature Lines */}
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="tempPast" 
                    stroke="#ea580c" 
                    strokeWidth={2.5}
                    dot={{ fill: '#ea580c', r: 3 }}
                    connectNulls={false}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="tempForecast" 
                    stroke="#fdba74" 
                    strokeWidth={2.5}
                    dot={{ fill: '#fdba74', r: 3 }}
                    connectNulls={false}
                    strokeDasharray="5 5"
                  />
                  
                  {/* Air Quality Lines */}
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="airQualityPast" 
                    stroke="#15803d" 
                    strokeWidth={2.5}
                    dot={{ fill: '#15803d', r: 3 }}
                    connectNulls={false}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="airQualityForecast" 
                    stroke="#86efac" 
                    strokeWidth={2.5}
                    dot={{ fill: '#86efac', r: 3 }}
                    connectNulls={false}
                    strokeDasharray="5 5"
                  />
                  
                  {/* Humidity Lines */}
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="humidityPast" 
                    stroke="#0e7490" 
                    strokeWidth={2.5}
                    dot={{ fill: '#0e7490', r: 3 }}
                    connectNulls={false}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="humidityForecast" 
                    stroke="#67e8f9" 
                    strokeWidth={2.5}
                    dot={{ fill: '#67e8f9', r: 3 }}
                    connectNulls={false}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Auto-Resolved Alerts */}
            <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900">Recent Auto-Resolved Alerts</h3>
                <span className="text-[10px] text-gray-500 font-semibold">Last 24 Hours</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-50">
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">Timestamp</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">Alert Type</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">Location/Sensor</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">Severity</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">Auto-Resolution Rule</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">Resolution Time</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      className="border-b border-gray-300 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => handleSensorClick({
                        id: 'CO2-12',
                        name: 'CO₂ Sensor 12',
                        type: 'air-quality',
                        subType: 'CO2',
                        status: 'operational',
                        value: '420 ppm',
                        x: 40,
                        y: 30,
                        lastUpdate: '02/01/2026 14:23:15'
                      })}
                    >
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        02/01/2026 14:23:15
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-semibold">
                        High CO₂ Level
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        Zone B / Sensor CO2-12
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                          MEDIUM
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">HVAC Auto-Boost Rule</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Increased ventilation rate by 25%</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        3m 42s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ RESOLVED
                        </span>
                      </td>
                    </tr>

                    <tr 
                      className="border-b border-gray-300 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => handleSensorClick({
                        id: 'T-08',
                        name: 'Temperature Sensor 08',
                        type: 'temperature',
                        subType: 'T',
                        status: 'operational',
                        value: '22.5°C',
                        x: 60,
                        y: 40,
                        lastUpdate: '02/01/2026 13:45:08'
                      })}
                    >
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        02/01/2026 13:45:08
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-semibold">
                        Temperature Spike
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        Server Room / Sensor T-08
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                          MEDIUM
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">Thermal Control Protocol</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Activated backup cooling system</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        1m 18s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ RESOLVED
                        </span>
                      </td>
                    </tr>

                    <tr 
                      className="border-b border-gray-300 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => handleSensorClick({
                        id: 'DP-15',
                        name: 'Differential Pressure Sensor 15',
                        type: 'pressure',
                        subType: 'DP',
                        status: 'operational',
                        value: '+5 Pa',
                        x: 50,
                        y: 50,
                        lastUpdate: '02/01/2026 12:17:33'
                      })}
                    >
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        02/01/2026 12:17:33
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-semibold">
                        Pressure Differential Low
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        Corridor 3 / Sensor DP-15
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                          LOW
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">Pressure Stabilization AI</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Adjusted airflow to maintain +5Pa differential</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        45s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ RESOLVED
                        </span>
                      </td>
                    </tr>

                    <tr 
                      className="border-b border-gray-300 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => handleSensorClick({
                        id: 'H-21',
                        name: 'Humidity Sensor 21',
                        type: 'air-quality',
                        subType: 'H',
                        status: 'operational',
                        value: '45%',
                        x: 70,
                        y: 60,
                        lastUpdate: '02/01/2026 11:02:44'
                      })}
                    >
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        02/01/2026 11:02:44
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-semibold">
                        Humidity Out of Range
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        Storage Area / Sensor H-21
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                          LOW
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">Climate Control Automation</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Activated dehumidification cycle</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        8m 15s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ RESOLVED
                        </span>
                      </td>
                    </tr>

                    <tr 
                      className="border-b border-gray-300 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => handleSensorClick({
                        id: 'F-04',
                        name: 'Filter Sensor 04',
                        type: 'air-quality',
                        subType: 'F',
                        status: 'operational',
                        value: 'Normal',
                        x: 30,
                        y: 70,
                        lastUpdate: '02/01/2026 09:38:21'
                      })}
                    >
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        02/01/2026 09:38:21
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-semibold">
                        Filter Pressure Warning
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        HVAC Unit 2 / Sensor F-04
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                          MEDIUM
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">Predictive Maintenance AI</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Scheduled filter replacement, bypassed to Unit 3</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        2m 03s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ RESOLVED
                        </span>
                      </td>
                    </tr>

                    <tr 
                      className="border-b border-gray-300 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => handleSensorClick({
                        id: 'DOOR-01',
                        name: 'Door Sensor 01',
                        type: 'motion',
                        subType: 'DOOR',
                        status: 'operational',
                        value: 'Closed',
                        x: 20,
                        y: 80,
                        lastUpdate: '02/01/2026 08:12:55'
                      })}
                    >
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        02/01/2026 08:12:55
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-semibold">
                        Door Sensor Timeout
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        Entrance A / Sensor DOOR-01
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                          LOW
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">Sensor Self-Diagnostic</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">Sensor reset and reconnected successfully</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        12s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ RESOLVED
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Panel - Sensor Details */}
          {selectedSensor && (
            <div className="w-[30%] transition-all duration-300 border-l-2 border-gray-300 bg-gray-50 px-6 pb-4">
              <SensorDetailPanel 
                sensor={selectedSensor}
                onClose={() => {
                  localStorage.removeItem('clickedSensor');
                  setSelectedSensor(null);
                }}
                language={language}
              />
            </div>
          )}
          </div>
        )}

        {viewMode === 'floorplan' && (
          <>
            {/* SVG Floor Plan - Full Width */}
            <div 
              className="w-full overflow-hidden px-6 pb-6 relative flex items-center justify-center"
              style={{ cursor: zoom >= 1 ? 'grab' : 'default', minHeight: '600px' }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
            >
              {/* Legend - Top Left Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <FloorPlanLegend emergencyMode={emergencyMode} />
              </div>

              {/* Zoom Controls - Top Right */}
              <div className="absolute top-8 right-8 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-1.5 border border-gray-300">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-gray-700" />
                </button>
                <div className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-semibold text-xs text-gray-700 min-w-[50px] text-center">
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4 text-gray-700" />
                </button>
                <div className="w-px h-6 bg-gray-300" />
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-1.5 border rounded transition-colors ${
                    showGrid 
                      ? 'bg-blue-500 border-blue-600 text-white' 
                      : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700'
                  }`}
                  title={showGrid ? "Hide Grid" : "Show Grid"}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>

              {/* Detailed Floor Plan Image */}
              <div
                className="relative"
                style={{
                  transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                  transformOrigin: 'center center',
                  transition: isPanning ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                <img 
                  src={floorPlanImage}
                  alt="Floor Plan"
                  className="h-auto"
                  style={{ 
                    width: viewMode === 'dashboard' 
                      ? '1800px'  // Fixed width for dashboard view
                      : `${leftPanelWidth ? Math.min(Math.max(leftPanelWidth - 100, 600), 1800) : 600}px`,  // Responsive with min 600px, max 1800px
                    height: 'auto', 
                    display: 'block' 
                  }}
                />
                
                {/* Grid Overlay */}
                {showGrid && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ 
                      width: viewMode === 'dashboard' 
                        ? '1800px'  // Fixed width for dashboard view
                        : `${leftPanelWidth ? Math.min(Math.max(leftPanelWidth - 100, 600), 1800) : 600}px`,  // Responsive with min 600px, max 1800px
                    }}
                  >
                    {/* Vertical lines */}
                    {Array.from({ length: 41 }).map((_, i) => (
                      <div
                        key={`col-${i}`}
                        className="absolute top-0 bottom-0 border-l border-blue-400/40"
                        style={{ left: `${(i * 2.5)}%` }}
                      >
                        <div
                          className="absolute -top-6 left-0 transform -translate-x-1/2 bg-blue-500 text-white text-[4px] font-bold px-0.5 py-0 rounded shadow-lg"
                        >
                          {i}
                        </div>
                      </div>
                    ))}
                    
                    {/* Horizontal lines */}
                    {Array.from({ length: 41 }).map((_, i) => (
                      <div
                        key={`row-${i}`}
                        className="absolute left-0 right-0 border-t border-blue-400/40"
                        style={{ top: `${(i * 2.5)}%` }}
                      >
                        <div
                          className="absolute top-0 -left-6 transform -translate-y-1/2 bg-blue-500 text-white text-[4px] font-bold px-0.5 py-0 rounded shadow-lg"
                        >
                          {i}
                        </div>
                      </div>
                    ))}
                    
                    {/* Grid Cell Numbers */}
                    {Array.from({ length: 40 }).map((_, row) => (
                      Array.from({ length: 40 }).map((_, col) => (
                        <div
                          key={`cell-${col}-${row}`}
                          className="absolute flex items-center justify-center"
                          style={{ 
                            left: `${(col * 2.5) + 1.25}%`,
                            top: `${(row * 2.5) + 1.25}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          <span className="text-[4px] font-bold text-blue-400/30 bg-white/40 px-0 rounded">
                            {col},{row}
                          </span>
                        </div>
                      ))
                    ))}
                  </div>
                )}
                


                {/* Sample Sensor Markers - Zone B Environmental Sensors */}
                <div className="absolute" style={{ left: '65%', top: '45%' }}>
                  <div className="flex flex-col items-center gap-px">
                    <div className="flex items-center gap-0">
                      {/* CO2 Sensor - Warning in incident mode */}
                      <SensorMarker
                        subType="CO2"
                        label="CO₂"
                        status={emergencyMode === 'incident' ? 'warning' : 'operational'}
                        onMouseEnter={() => setHoveredFloorSensor({ 
                          id: 'sensor-co2-1', 
                          name: 'CO₂ Sensor Zone B', 
                          status: emergencyMode === 'incident' ? 'warning' : 'operational', 
                          value: emergencyMode === 'incident' ? '483 ppm' : '420 ppm',
                          type: 'air-quality'
                        })}
                        onMouseLeave={() => setHoveredFloorSensor(null)}
                        onClick={() => handleSensorClick({ 
                          id: 'S-F2-CO2-1', 
                          name: 'CO₂ Sensor Zone B', 
                          type: 'air-quality', 
                          subType: 'CO2', 
                          status: emergencyMode === 'incident' ? 'warning' : 'operational', 
                          value: emergencyMode === 'incident' ? '483 ppm' : '420 ppm', 
                          x: 65, 
                          y: 45,
                          lastUpdate: '2s ago'
                        })}
                      />
                      {/* Airflow Sensor - Warning in incident mode */}
                      <SensorMarker
                        subType="AF"
                        label="AF"
                        status={emergencyMode === 'incident' ? 'warning' : 'operational'}
                        onMouseEnter={() => setHoveredFloorSensor({ 
                          id: 'sensor-af-1', 
                          name: 'Airflow Sensor Zone B', 
                          status: emergencyMode === 'incident' ? 'warning' : 'operational', 
                          value: emergencyMode === 'incident' ? '0.88 m/s (-12%)' : '1.0 m/s',
                          type: 'air-quality'
                        })}
                        onMouseLeave={() => setHoveredFloorSensor(null)}
                        onClick={() => handleSensorClick({ 
                          id: 'S-F2-AF-1', 
                          name: 'Airflow Sensor Zone B', 
                          type: 'air-quality', 
                          subType: 'AF', 
                          status: emergencyMode === 'incident' ? 'warning' : 'operational', 
                          value: emergencyMode === 'incident' ? '0.88 m/s (-12%)' : '1.0 m/s', 
                          x: 66, 
                          y: 45,
                          lastUpdate: '1s ago'
                        })}
                      />
                      {/* Humidity Sensor - Warning in incident mode */}
                      <SensorMarker
                        subType="H"
                        label="H"
                        status={emergencyMode === 'incident' ? 'warning' : 'operational'}
                        onMouseEnter={() => setHoveredFloorSensor({ 
                          id: 'sensor-h-1', 
                          name: 'Humidity Sensor Zone B', 
                          status: emergencyMode === 'incident' ? 'warning' : 'operational', 
                          value: emergencyMode === 'incident' ? '49% (+8%)' : '45%',
                          type: 'air-quality'
                        })}
                        onMouseLeave={() => setHoveredFloorSensor(null)}
                        onClick={() => handleSensorClick({ 
                          id: 'S-F2-H-1', 
                          name: 'Humidity Sensor Zone B', 
                          type: 'air-quality', 
                          subType: 'H', 
                          status: emergencyMode === 'incident' ? 'warning' : 'operational', 
                          value: emergencyMode === 'incident' ? '49% (+8%)' : '45%', 
                          x: 67, 
                          y: 45,
                          lastUpdate: '1s ago'
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute" style={{ left: '70%', top: '48%' }}>
                  <SensorMarker
                    subType="R"
                    label="R"
                    status="operational"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensor-r-1', 
                      name: 'Radiological Detector', 
                      status: 'operational', 
                      value: 'Normal',
                      type: 'chemical'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-R-1', 
                      name: 'Radiological Detector 1', 
                      type: 'chemical', 
                      subType: 'R', 
                      status: 'operational', 
                      value: 'Normal', 
                      x: 70, 
                      y: 48,
                      lastUpdate: '1s ago'
                    })}
                  />
                </div>

                {/* Chemical Detector - Red and blinking in emergency mode */}
                <div className="absolute" style={{ left: '73%', top: '50%' }}>
                  <SensorMarker
                    subType="C"
                    label="C"
                    status={emergencyMode === 'emergency' ? 'critical' : 'operational'}
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensor-c-1', 
                      name: 'Chemical Agent Detector', 
                      status: emergencyMode === 'emergency' ? 'critical' : 'operational', 
                      value: emergencyMode === 'emergency' ? 'CHEMICAL AGENT DETECTED' : 'Normal',
                      type: 'chemical'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-C-1', 
                      name: 'Chemical Agent Detector 1', 
                      type: 'chemical', 
                      subType: 'C', 
                      status: emergencyMode === 'emergency' ? 'critical' : 'operational', 
                      value: emergencyMode === 'emergency' ? 'CHEMICAL AGENT DETECTED' : 'Normal', 
                      x: 73, 
                      y: 50,
                      lastUpdate: '0s ago'
                    })}
                  />
                </div>

                <div className="absolute" style={{ left: '67%', top: '52%' }}>
                  <SensorMarker
                    subType="DP"
                    label="DP"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensor-dp-1', 
                      name: 'Pressure Monitor', 
                      status: 'operational', 
                      value: '+8 Pa',
                      type: 'pressure'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-DP-1', 
                      name: 'Pressure Monitor 1', 
                      type: 'pressure', 
                      subType: 'DP', 
                      status: 'operational', 
                      value: '+8 Pa', 
                      x: 67, 
                      y: 52,
                      lastUpdate: '3s ago'
                    })}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Panel - Details */}
      {!isRightPanelCollapsed && (
        <div className="flex-grow flex flex-col bg-white border-l border-gray-300">
          <div className="flex-1 overflow-auto p-6">
            {selectedSensor && (
              <SensorDetailPanel
                sensor={selectedSensor}
                onClose={() => {
                  localStorage.removeItem('clickedSensor');
                  setSelectedSensor(null);
                  if (viewMode === 'floorplan') {
                    setIsRightPanelCollapsed(true);
                    if (containerRef.current) {
                      setLeftPanelWidth(containerRef.current.offsetWidth);
                    }
                  }
                }}
                language={language}
              />
            )}

            {selectedIncident && (
              <IncidentDetailView
                incidentId={selectedIncident}
                onClose={() => {
                  setSelectedIncident(null);
                  if (viewMode === 'floorplan') {
                    setIsRightPanelCollapsed(true);
                    if (containerRef.current) {
                      setLeftPanelWidth(containerRef.current.offsetWidth);
                    }
                  }
                }}
                language={language}
              />
            )}
          </div>
        </div>
      )}

      {/* Global Tooltip */}
      {hoveredFloorSensor && (
        <div 
          ref={tooltipRef}
          className="fixed text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
          style={{ 
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            zIndex: 99999,
            backgroundColor: 'rgb(15, 23, 42)',
            fontSize: '10px',
            padding: '8px 12px'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{hoveredFloorSensor.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{ color: '#9ca3af' }}>Status:</span>
            <span style={{ 
              padding: '2px 6px', 
              borderRadius: '4px',
              fontWeight: 'bold',
              backgroundColor: hoveredFloorSensor.status === 'operational' ? '#16a34a' :
                             hoveredFloorSensor.status === 'warning' ? '#ca8a04' : '#dc2626'
            }}>
              {hoveredFloorSensor.status.toUpperCase()}
            </span>
          </div>
          <div style={{ color: '#d1d5db' }}>
            <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
          </div>
        </div>
      )}
    </div>
  );
}