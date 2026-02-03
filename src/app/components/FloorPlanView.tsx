import { AlertCircle, ZoomIn, ZoomOut, RotateCcw, Grid3x3, LayoutGrid, Map, Activity, Thermometer, Wind, Droplets } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { RoomDetailPanel } from './RoomDetailPanel';
import { SensorDetailPanel } from './SensorDetailPanel';
import { IncidentDetailView } from './IncidentDetailView';
import { Language, translations } from '../translations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import floorPlanImage from '@/assets/NewBG2.png';
import { GaugeWidget } from './GaugeWidget';

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
    { symbol: 'Door', label: 'Door Status', color: '#16a34a', shape: 'rectangle' },
  ];

  const renderShape = (item: typeof legendItems[0]) => {
    const baseClasses = "flex items-center justify-center text-[8px] font-bold text-white border border-black/20";
    
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
        <div className="w-[23px] h-[23px] relative flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 16 16" fill="none">
            <path 
              d="M8 2 L14 14 L2 14 Z" 
              fill={item.color} 
              stroke="black" 
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          </svg>
          <span className="relative z-10 text-[8px] font-bold text-white mt-1">{item.symbol}</span>
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
  subType?: 'R' | 'B' | 'C' | 'CO2' | 'CO' | 'O2' | 'DP' | 'T' | 'H' | 'W' | 'AF' | 'F' | 'GTV';
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
  const [panY, setPanY] = useState(-80);
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

  // Helper functions for sensor hover events
  const handleSensorHover = (e: React.MouseEvent, sensor: { id: string; name: string; status: string; value: string; type: string }) => {
    e.stopPropagation();
    setHoveredFloorSensor(sensor);
    setTooltipPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleSensorLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHoveredFloorSensor(null);
  };

  // Check localStorage for clicked sensor on mount and when switching to dashboard view
  useEffect(() => {
    console.log('ViewMode changed to:', viewMode);
    const clickedSensor = localStorage.getItem('clickedSensor');
    console.log('Clicked sensor from localStorage:', clickedSensor);
    if (clickedSensor) {
      try {
        const sensor = JSON.parse(clickedSensor);
        console.log('Parsed sensor:', sensor);
        
        // Don't restore warning/threat sensors in normal mode
        const isWarningOrThreatSensor = sensor.id === 'warning-incident-001' || sensor.id === 'threat-emergency-001';
        if (isWarningOrThreatSensor && emergencyMode === 'normal') {
          console.log('Skipping restore of warning/threat sensor in normal mode');
          localStorage.removeItem('clickedSensor');
          return;
        }
        
        setSelectedSensor(sensor);
        if (viewMode === 'dashboard') {
          setIsRightPanelCollapsed(false);
        }
      } catch (e) {
        console.error('Failed to parse clicked sensor:', e);
        localStorage.removeItem('clickedSensor');
      }
    }
  }, [viewMode, emergencyMode]);

  // Helper function to get sensor shape based on subType
  const getSensorShape = (subType?: string) => {
    if (!subType) return 'circle';
    if (['R', 'B', 'C'].includes(subType)) return 'triangle';
    if (['GTV'].includes(subType)) return 'rectangle';
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
        name: 'Active Alarm Alert',
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
    } else if (emergencyMode === 'normal') {
      // Clear any active alerts whenever in normal mode, regardless of view
      const clickedSensor = localStorage.getItem('clickedSensor');
      if (clickedSensor) {
        try {
          const sensor = JSON.parse(clickedSensor);
          const isWarningOrThreatSensor = sensor.id === 'warning-incident-001' || sensor.id === 'threat-emergency-001';
          if (isWarningOrThreatSensor) {
            setSelectedSensor(null);
            setSelectedIncident(null);
            localStorage.removeItem('clickedSensor');
          }
        } catch (e) {
          // Invalid sensor data, clear it
          localStorage.removeItem('clickedSensor');
        }
      }
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
    const updateTooltipPosition = (e: MouseEvent) => {
      const tooltipWidth = tooltipRef.current?.offsetWidth || 200;
      const tooltipHeight = tooltipRef.current?.offsetHeight || 80;
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
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredFloorSensor) {
        updateTooltipPosition(e);
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
      emergencyMode === 'emergency' ? 'bg-red-50' : emergencyMode === 'incident' ? 'bg-orange-50/30' : 'bg-green-50/50'
    }`}>
      {/* Floor Plan - Full Width */}
      <div className={`w-full h-full overflow-auto ${
        emergencyMode === 'emergency' ? 'bg-red-50' : emergencyMode === 'incident' ? 'bg-orange-50/30' : 'bg-green-50/50'
      }`}>
        {/* Facility Header Bar - Sticky */}
        <div className={`sticky top-0 z-50 px-4 pt-4 pb-3 ${
          emergencyMode === 'emergency' ? 'bg-red-50' : emergencyMode === 'incident' ? 'bg-orange-50' : 'bg-green-50'
        }`}>
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
              <div className="absolute top-4 left-6 z-10">
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

              {/* Live Status Gauges - Below Zoom Controls */}
              <div className="absolute top-20 right-8 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-gray-300 w-[240px] mt-4">
                <h4 className="text-xs font-bold text-gray-800 mb-3 text-center border-b border-gray-300 pb-1.5">Live Status</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <GaugeWidget 
                    label="CO" 
                    value={3} 
                    unit="ppm" 
                    maxValue={50} 
                  />
                  <GaugeWidget 
                    label="CO₂" 
                    value={emergencyMode === 'incident' ? 950 : 420} 
                    unit="ppm" 
                    maxValue={2000} 
                  />
                  <GaugeWidget 
                    label="O₂" 
                    value={emergencyMode === 'emergency' ? 18.2 : 20.9} 
                    unit="%" 
                    maxValue={21} 
                    reverse={true}
                  />
                  <GaugeWidget 
                    label="Water" 
                    value={emergencyMode === 'emergency' ? 78 : 12} 
                    unit="%" 
                    maxValue={100} 
                  />
                </div>
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
                      : `${leftPanelWidth ? Math.min(Math.max(leftPanelWidth - 100, 600), 2400) : 600}px`,  // Responsive with min 600px, max 2400px
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
                        : `${leftPanelWidth ? Math.min(Math.max(leftPanelWidth - 100, 600), 2400) : 600}px`,  // Responsive with min 600px, max 2400px
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
                


                {/* Sample Sensor Markers - Zone B Environmental Sensors - Group 2 */}
                <div className="absolute" style={{ left: '63.5%', top: '45%' }}>
                  <div className="flex flex-col items-center gap-px relative">
                    {/* Number label above sensors with connecting lines */}
                    <div className="relative flex flex-col items-center mb-0.5">
                      <div className="w-2 h-2 bg-white rounded-full border border-black/40 flex items-center justify-center">
                        <span className="text-black text-[5px] font-bold leading-none">2</span>
                      </div>
                      {/* Umbrella-style curved connecting lines */}
                      <svg className="absolute" style={{ top: '6px', left: '50%', transform: 'translateX(-50%)' }} width="28" height="6" xmlns="http://www.w3.org/2000/svg">
                        {/* Left curve - from left edge of circle to top of CO₂ sensor */}
                        <path d="M 10 0 Q 6 3, 2 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                        {/* Right curve - from right edge of circle to top of O₂ sensor */}
                        <path d="M 18 0 Q 22 3, 26 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-0">
                      {/* CO2 Sensor */}
                      <div className={`w-2.5 h-2.5 rounded-full border border-black/20 flex items-center justify-center relative ${
                        emergencyMode === 'incident' 
                          ? 'bg-orange-500 sensor-blink sensor-pulse-ring' 
                          : 'bg-green-600'
                      }`}>
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      {/* CO Sensor */}
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      {/* O₂ Sensor */}
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">O₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Sensor Markers - Zone A Environmental Sensors - Group 1 */}
                <div className="absolute" style={{ left: '45.25%', top: '31.25%' }}>
                  <div className="flex flex-col items-center gap-px relative">
                    {/* Number label above sensors with connecting lines */}
                    <div className="relative flex flex-col items-center mb-0.5">
                      <div className="w-2 h-2 bg-white rounded-full border border-black/40 flex items-center justify-center">
                        <span className="text-black text-[5px] font-bold leading-none">1</span>
                      </div>
                      {/* Umbrella-style curved connecting lines */}
                      <svg className="absolute" style={{ top: '6px', left: '50%', transform: 'translateX(-50%)' }} width="28" height="6" xmlns="http://www.w3.org/2000/svg">
                        {/* Left curve - from left edge of circle to top of CO₂ sensor */}
                        <path d="M 10 0 Q 6 3, 2 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                        {/* Right curve - from right edge of circle to top of O₂ sensor */}
                        <path d="M 18 0 Q 22 3, 26 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-0">
                      {/* CO2 Sensor */}
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      {/* CO Sensor */}
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      {/* O₂ Sensor */}
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">O₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Sensors - Group 3 */}
                <div className="absolute" style={{ left: '79.75%', top: '44.25%' }}>
                  <div className="flex flex-col items-center gap-px relative">
                    <div className="relative flex flex-col items-center mb-0.5">
                      <div className="w-2 h-2 bg-white rounded-full border border-black/40 flex items-center justify-center">
                        <span className="text-black text-[5px] font-bold leading-none">3</span>
                      </div>
                      <svg className="absolute" style={{ top: '6px', left: '50%', transform: 'translateX(-50%)' }} width="28" height="6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 0 Q 6 3, 2 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                        <path d="M 18 0 Q 22 3, 26 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-0">
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">O₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Sensors - Group 4 */}
                <div className="absolute" style={{ left: '82.25%', top: '59.25%' }}>
                  <div className="flex flex-col items-center gap-px relative">
                    <div className="relative flex flex-col items-center mb-0.5">
                      <div className="w-2 h-2 bg-white rounded-full border border-black/40 flex items-center justify-center">
                        <span className="text-black text-[5px] font-bold leading-none">4</span>
                      </div>
                      <svg className="absolute" style={{ top: '6px', left: '50%', transform: 'translateX(-50%)' }} width="28" height="6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 0 Q 6 3, 2 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                        <path d="M 18 0 Q 22 3, 26 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-0">
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">O₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Sensors - Group 5 */}
                <div className="absolute" style={{ left: '82.25%', top: '69.25%' }}>
                  <div className="flex flex-col items-center gap-px relative">
                    <div className="relative flex flex-col items-center mb-0.5">
                      <div className="w-2 h-2 bg-white rounded-full border border-black/40 flex items-center justify-center">
                        <span className="text-black text-[5px] font-bold leading-none">5</span>
                      </div>
                      <svg className="absolute" style={{ top: '6px', left: '50%', transform: 'translateX(-50%)' }} width="28" height="6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 0 Q 6 3, 2 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                        <path d="M 18 0 Q 22 3, 26 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-0">
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">O₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Sensors - Group 6 */}
                <div className="absolute" style={{ left: '49.75%', top: '66.25%' }}>
                  <div className="flex flex-col items-center gap-px relative">
                    <div className="relative flex flex-col items-center mb-0.5">
                      <div className="w-2 h-2 bg-white rounded-full border border-black/40 flex items-center justify-center">
                        <span className="text-black text-[5px] font-bold leading-none">6</span>
                      </div>
                      <svg className="absolute" style={{ top: '6px', left: '50%', transform: 'translateX(-50%)' }} width="28" height="6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 0 Q 6 3, 2 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                        <path d="M 18 0 Q 22 3, 26 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-0">
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">O₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Sensors - Group 7 */}
                <div className="absolute" style={{ left: '49.75%', top: '54.25%' }}>
                  <div className="flex flex-col items-center gap-px relative">
                    <div className="relative flex flex-col items-center mb-0.5">
                      <div className="w-2 h-2 bg-white rounded-full border border-black/40 flex items-center justify-center">
                        <span className="text-black text-[5px] font-bold leading-none">7</span>
                      </div>
                      <svg className="absolute" style={{ top: '6px', left: '50%', transform: 'translateX(-50%)' }} width="28" height="6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 0 Q 6 3, 2 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                        <path d="M 18 0 Q 22 3, 26 6" stroke="black" strokeWidth="0.4" fill="none" opacity="0.5"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-0">
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                        <span className="text-white text-[4px] font-bold leading-none">O₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Door 1 - Simple green rectangle */}
                <div className="absolute" style={{ left: '49%', top: '6%' }}>
                  <div className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">Door 1</span>
                  </div>
                </div>

                {/* DP1 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '44%', top: '6%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">DP1</span>
                  </div>
                </div>

                {/* Door 2 - Simple green rectangle */}
                <div className="absolute" style={{ left: '49%', top: '20%' }}>
                  <div className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">Door 2</span>
                  </div>
                </div>

                {/* DP2 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '44%', top: '20%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">DP2</span>
                  </div>
                </div>

                {/* Door 3 - Simple green rectangle */}
                <div className="absolute" style={{ left: '71.5%', top: '39.5%' }}>
                  <div className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">Door 3</span>
                  </div>
                </div>

                {/* T1 and H1 sensors at grid position 35,16 */}
                <div className="absolute flex items-center gap-0" style={{ left: '87.75%', top: '39.25%' }}>
                  {/* T1 - Temperature Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">T1</span>
                  </div>
                  {/* H1 - Humidity Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">H1</span>
                  </div>
                </div>

                {/* T2 and H2 sensors at grid position 35,22 */}
                <div className="absolute flex items-center gap-0" style={{ left: '87.75%', top: '54.25%' }}>
                  {/* T2 - Temperature Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">T2</span>
                  </div>
                  {/* H2 - Humidity Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">H2</span>
                  </div>
                </div>

                {/* T3 and H3 sensors at grid position 35,26 */}
                <div className="absolute flex items-center gap-0" style={{ left: '87.75%', top: '64.25%' }}>
                  {/* T3 - Temperature Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">T3</span>
                  </div>
                  {/* H3 - Humidity Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">H3</span>
                  </div>
                </div>

                {/* T5 and H5 sensors at grid position 18,21 */}
                <div className="absolute flex items-center gap-0" style={{ left: '44.75%', top: '52.75%' }}>
                  {/* T5 - Temperature Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">T5</span>
                  </div>
                  {/* H5 - Humidity Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">H5</span>
                  </div>
                </div>

                {/* T6 and H6 sensors at grid position 18,25 */}
                <div className="absolute flex items-center gap-0" style={{ left: '44.75%', top: '62.75%' }}>
                  {/* T6 - Temperature Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">T6</span>
                  </div>
                  {/* H6 - Humidity Sensor */}
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">H6</span>
                  </div>
                </div>

                {/* Door 4 - Simple green rectangle */}
                <div className="absolute" style={{ left: '59.5%', top: '92.5%' }}>
                  <div className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">Door 4</span>
                  </div>
                </div>

                {/* Door 5 - Simple green rectangle */}
                <div className="absolute" style={{ left: '59.5%', top: '78.5%' }}>
                  <div className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">Door 5</span>
                  </div>
                </div>

                {/* Door 6 - Simple green rectangle */}
                <div className="absolute" style={{ left: '39%', top: '40%' }}>
                  <div className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">Door 6</span>
                  </div>
                </div>

                {/* Door 7 - Simple green rectangle */}
                <div className="absolute" style={{ left: '29%', top: '40%' }}>
                  <div className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">Door 7</span>
                  </div>
                </div>

                {/* Door 8 - Simple green rectangle */}
                <div className="absolute" style={{ left: '19%', top: '40%' }}>
                  <div className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">Door 8</span>
                  </div>
                </div>

                {/* DP3 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '65.5%', top: '78.5%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">DP3</span>
                  </div>
                </div>

                {/* DP4 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '65.5%', top: '92.5%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">DP4</span>
                  </div>
                </div>

                {/* DP5 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '29%', top: '42.5%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">DP5</span>
                  </div>
                </div>

                {/* DP6 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '19%', top: '42.5%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">DP6</span>
                  </div>
                </div>

                {/* W - Water Level Sensor */}
                <div className="absolute" style={{ left: '16%', top: '25.5%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">W</span>
                  </div>
                </div>

                {/* R1, B1, C1 - CBRNe Detectors at grid position 17,4 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '43.5%', top: '10%' }}>
                  {/* R1 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r1', name: 'Radiological Detector R1', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R1', 
                        name: 'Radiological Detector R1', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 17, 
                        y: 4,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R1</span>
                  </div>
                  {/* B1 - Biological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-b1', name: 'Biological Detector B1', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-B1', 
                        name: 'Biological Detector B1', 
                        type: 'chemical', 
                        subType: 'B', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 17, 
                        y: 4,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">B1</span>
                  </div>
                  {/* C1 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c1', name: 'Chemical Detector C1', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C1', 
                        name: 'Chemical Detector C1', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 17, 
                        y: 4,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C1</span>
                  </div>
                </div>

                {/* R2, B2, C2 - CBRNe Detectors at grid position 25,16 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '62.5%', top: '39.5%' }}>
                  {/* R2 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r2', name: 'Radiological Detector R2', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R2', 
                        name: 'Radiological Detector R2', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 25, 
                        y: 16,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R2</span>
                  </div>
                  {/* B2 - Biological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-b2', name: 'Biological Detector B2', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-B2', 
                        name: 'Biological Detector B2', 
                        type: 'chemical', 
                        subType: 'B', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 25, 
                        y: 16,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">B2</span>
                  </div>
                  {/* C2 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c2', name: 'Chemical Detector C2', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C2', 
                        name: 'Chemical Detector C2', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 25, 
                        y: 16,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C2</span>
                  </div>
                </div>

                {/* R3, B3, C3 - CBRNe Detectors at grid position 27,20 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '67.5%', top: '51.5%' }}>
                  {/* R3 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r3', name: 'Radiological Detector R3', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R3', 
                        name: 'Radiological Detector R3', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 27, 
                        y: 20,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R3</span>
                  </div>
                  {/* B3 - Biological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-b3', name: 'Biological Detector B3', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-B3', 
                        name: 'Biological Detector B3', 
                        type: 'chemical', 
                        subType: 'B', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 27, 
                        y: 20,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">B3</span>
                  </div>
                  {/* C3 - Chemical Detector */}
                  <div className={`w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity ${
                    emergencyMode === 'emergency' ? 'sensor-blink sensor-pulse-ring-red' : ''
                  }`}
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c3', name: 'Chemical Detector C3', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C3', 
                        name: 'Chemical Detector C3', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 27, 
                        y: 20,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill={emergencyMode === 'emergency' ? '#dc2626' : '#16a34a'}
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C3</span>
                  </div>
                </div>

                {/* R4, B4, C4 - CBRNe Detectors at grid position 26,34 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '62%', top: '85%' }}>
                  {/* R4 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r4', name: 'Radiological Detector R4', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R4', 
                        name: 'Radiological Detector R4', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 26, 
                        y: 34,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R4</span>
                  </div>
                  {/* B4 - Biological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-b4', name: 'Biological Detector B4', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-B4', 
                        name: 'Biological Detector B4', 
                        type: 'chemical', 
                        subType: 'B', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 26, 
                        y: 34,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">B4</span>
                  </div>
                  {/* C4 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c4', name: 'Chemical Detector C4', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C4', 
                        name: 'Chemical Detector C4', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 26, 
                        y: 34,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C4</span>
                  </div>
                </div>

                {/* R5, B5, C5 - CBRNe Detectors at grid position 21,24 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '52.5%', top: '60%' }}>
                  {/* R5 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r5', name: 'Radiological Detector R5', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R5', 
                        name: 'Radiological Detector R5', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 21, 
                        y: 24,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R5</span>
                  </div>
                  {/* B5 - Biological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-b5', name: 'Biological Detector B5', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-B5', 
                        name: 'Biological Detector B5', 
                        type: 'chemical', 
                        subType: 'B', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 21, 
                        y: 24,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">B5</span>
                  </div>
                  {/* C5 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c5', name: 'Chemical Detector C5', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C5', 
                        name: 'Chemical Detector C5', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 21, 
                        y: 24,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C5</span>
                  </div>
                </div>

                {/* R6, B6, C6 - CBRNe Detectors at grid position 21,28 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '52.5%', top: '71.5%' }}>
                  {/* R6 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r6', name: 'Radiological Detector R6', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R6', 
                        name: 'Radiological Detector R6', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 21, 
                        y: 28,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R6</span>
                  </div>
                  {/* B6 - Biological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-b6', name: 'Biological Detector B6', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-B6', 
                        name: 'Biological Detector B6', 
                        type: 'chemical', 
                        subType: 'B', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 21, 
                        y: 28,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">B6</span>
                  </div>
                  {/* C6 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c6', name: 'Chemical Detector C6', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C6', 
                        name: 'Chemical Detector C6', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 21, 
                        y: 28,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C6</span>
                  </div>
                </div>

                {/* R7, C7 - CBRNe Detectors at grid position 32,9 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '80%', top: '22.5%' }}>
                  {/* R7 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r7', name: 'Radiological Detector R7', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R7', 
                        name: 'Radiological Detector R7', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 32, 
                        y: 9,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R7</span>
                  </div>
                  {/* C7 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c7', name: 'Chemical Detector C7', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C7', 
                        name: 'Chemical Detector C7', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 32, 
                        y: 9,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C7</span>
                  </div>
                </div>

                {/* R8, C8 - CBRNe Detectors at grid position 10,9 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '25%', top: '22.5%' }}>
                  {/* R8 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r8', name: 'Radiological Detector R8', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R8', 
                        name: 'Radiological Detector R8', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 10, 
                        y: 9,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R8</span>
                  </div>
                  {/* C8 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c8', name: 'Chemical Detector C8', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C8', 
                        name: 'Chemical Detector C8', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 10, 
                        y: 9,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C8</span>
                  </div>
                </div>

                {/* R9, C9 - CBRNe Detectors at grid position 9,30 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '22.5%', top: '75%' }}>
                  {/* R9 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r9', name: 'Radiological Detector R9', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R9', 
                        name: 'Radiological Detector R9', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 9, 
                        y: 30,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R9</span>
                  </div>
                  {/* C9 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c9', name: 'Chemical Detector C9', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C9', 
                        name: 'Chemical Detector C9', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 9, 
                        y: 30,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C9</span>
                  </div>
                </div>

                {/* R10, C10 - CBRNe Detectors at grid position 32,30 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '80%', top: '75%' }}>
                  {/* R10 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r10', name: 'Radiological Detector R10', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R10', 
                        name: 'Radiological Detector R10', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 32, 
                        y: 30,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R10</span>
                  </div>
                  {/* C10 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c10', name: 'Chemical Detector C10', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C10', 
                        name: 'Chemical Detector C10', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 32, 
                        y: 30,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C10</span>
                  </div>
                </div>

                {/* R11, C11 - CBRNe Detectors at grid position 1,19 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '1.5%', top: '47.5%' }}>
                  {/* R11 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r11', name: 'Radiological Detector R11', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R11', 
                        name: 'Radiological Detector R11', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 1, 
                        y: 19,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R11</span>
                  </div>
                  {/* C11 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c11', name: 'Chemical Detector C11', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C11', 
                        name: 'Chemical Detector C11', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 1, 
                        y: 19,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C11</span>
                  </div>
                </div>

                {/* R12, C12 - CBRNe Detectors at grid position 37,18 */}
                <div className="absolute flex items-center -space-x-1" style={{ left: '92.5%', top: '45%' }}>
                  {/* R12 - Radiological Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-r12', name: 'Radiological Detector R12', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-R12', 
                        name: 'Radiological Detector R12', 
                        type: 'chemical', 
                        subType: 'R', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 37, 
                        y: 18,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">R12</span>
                  </div>
                  {/* C12 - Chemical Detector */}
                  <div className="w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c12', name: 'Chemical Detector C12', status: 'operational', value: 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C12', 
                        name: 'Chemical Detector C12', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: 'operational', 
                        value: 'Normal', 
                        x: 37, 
                        y: 18,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill="#16a34a"
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C12</span>
                  </div>
                </div>

                {/* F - Filter Sensor */}
                <div className="absolute" style={{ left: '13.8%', top: '57.5%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">F</span>
                  </div>
                </div>

                {/* AF - Airflow Sensor */}
                <div className="absolute" style={{ left: '13.8%', top: '65%' }}>
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">AF</span>
                  </div>
                </div>

                {/* GTV 1 - Gas Tight Valve */}
                <div className="absolute" style={{ left: '11%', top: '55%' }}>
                  <div className="w-4 h-2 bg-green-600 border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">GTV 1</span>
                  </div>
                </div>

                {/* GTV 2 - Gas Tight Valve */}
                <div className="absolute" style={{ left: '11%', top: '57.5%' }}>
                  <div className="w-4 h-2 bg-green-600 border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">GTV 2</span>
                  </div>
                </div>

                {/* GTV 3 - Gas Tight Valve */}
                <div className="absolute" style={{ left: '11%', top: '62.5%' }}>
                  <div className="w-4 h-2 bg-green-600 border border-black/20 flex items-center justify-center">
                    <span className="text-white text-[4px] font-bold leading-none">GTV 3</span>
                  </div>
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