import { AlertCircle, AlertTriangle, ZoomIn, ZoomOut, RotateCcw, Grid3x3, LayoutGrid, Map, Activity, Thermometer, Wind, Droplets, Radio, Filter, Gauge, Airplay, FlaskConical, CloudRain, Brain } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { RoomDetailPanel } from './RoomDetailPanel';
import { SensorDetailPanel } from './SensorDetailPanel';
import { IncidentDetailView } from './IncidentDetailView';
import { Language, translations } from '../translations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import floorPlanImage from '@/assets/NewBG2.png';
import { GaugeWidget } from './GaugeWidget';

// Legend Component
function FloorPlanLegend({ emergencyMode, language }: { emergencyMode: false | 'incident' | 'emergency'; language: Language }) {
  const t = translations[language];
  
  const legendItems = [
    { symbol: 'DP', label: t.differentialPressure, color: '#139B48', shape: 'circle' },
    { symbol: 'R', label: t.radiologicalDetectors, color: '#139B48', shape: 'triangle' },
    { symbol: 'B', label: t.biologicalDetectors, color: '#139B48', shape: 'triangle' },
    { symbol: 'C', label: t.chemicalDetectors, color: '#139B48', shape: 'triangle' },
    { symbol: 'CO₂', label: t.co2Sensors, color: '#139B48', shape: 'circle' },
    { symbol: 'CO', label: t.coSensors, color: '#139B48', shape: 'circle' },
    { symbol: 'O₂', label: t.o2Sensors, color: '#139B48', shape: 'circle' },
    { symbol: 'T', label: t.temperatureSensors, color: '#139B48', shape: 'circle' },
    { symbol: 'H', label: t.humiditySensors, color: '#139B48', shape: 'circle' },
    { symbol: 'W', label: t.waterLevelSensors, color: '#139B48', shape: 'circle' },
    { symbol: 'AF', label: t.airflowSensors, color: '#139B48', shape: 'circle' },
    { symbol: 'F', label: t.filterSensors, color: '#139B48', shape: 'circle' },
    { symbol: 'GTV', label: t.gastightValveSensors, color: '#139B48', shape: 'rectangle' },
    { symbol: 'Door', label: t.doorStatus, color: '#16a34a', shape: 'rectangle' },
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
              <th className="py-1.5 px-2 text-right text-[10px] font-bold text-gray-700 border-r border-gray-300">{t.legendSymbol}</th>
              <th className="py-1.5 px-2 text-right text-[10px] font-bold text-gray-700">{t.legendSensorType}</th>
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
  simulationTime?: number; // Time in seconds
  scenarioId?: string; // ID of the running scenario
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

export function FloorPlanView({ floorId, onRoomClick, onIncidentClick, onBack, emergencyMode, simulationTime = 0, scenarioId, hideBreadcrumbs, language = 'en' }: FloorPlanViewProps) {
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
  
  // Each tab maintains its own viewMode independently (not persisted across tabs)
  const [viewMode, setViewMode] = useState<'dashboard' | 'floorplan'>('floorplan');

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentHoverElementRef = useRef<HTMLElement | null>(null);
  const prevEmergencyModeRef = useRef<false | 'incident' | 'emergency'>(emergencyMode);

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
        if (isWarningOrThreatSensor && emergencyMode === false) {
          console.log('Skipping restore of warning/threat sensor in normal mode');
          localStorage.removeItem('clickedSensor');
          setSelectedSensor(null);
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
    const prevMode = prevEmergencyModeRef.current;
    const isTransitioningToIncident = emergencyMode === 'incident' && prevMode !== 'incident';
    const isTransitioningToEmergency = emergencyMode === 'emergency' && prevMode !== 'emergency';
    
    if (isTransitioningToIncident && viewMode === 'dashboard') {
      // Create a warning sensor for CO2 level increase - only on transition
      const warningSensor: Sensor = {
        id: 'warning-incident-001',
        name: 'CO₂ Level Warning',
        type: 'air-quality',
        subType: 'CO2',
        status: 'warning',
        value: '950 ppm',
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
      // Don't open the side panel in incident mode, we'll show a static card instead
      // setIsRightPanelCollapsed(false);
      localStorage.setItem('clickedSensor', JSON.stringify(warningSensor));
    } else if (isTransitioningToEmergency) {
      // Clear any selected sensor when entering emergency mode
      setSelectedSensor(null);
      setSelectedIncident(null);
      localStorage.removeItem('clickedSensor');
    } else if (emergencyMode === false && prevMode !== false) {
      // When returning to normal mode, clear everything and close the panel
      setSelectedSensor(null);
      setSelectedIncident(null);
      setIsRightPanelCollapsed(true);
      localStorage.removeItem('clickedSensor');
    }
    
    // Update the ref for next comparison
    prevEmergencyModeRef.current = emergencyMode;
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

  // Listen for sensor clicks and demo mode changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'clickedSensor') {
        if (e.newValue) {
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
        } else {
          // clickedSensor was removed/cleared from another tab
          setSelectedSensor(null);
          setSelectedIncident(null);
          setIsRightPanelCollapsed(true);
        }
      } else if (e.key === 'demoMode') {
        // Demo mode changed in another tab
        const newMode = e.newValue;
        if (newMode === 'false' || newMode === null) {
          // Switched to normal mode - clear everything
          setSelectedSensor(null);
          setSelectedIncident(null);
          setIsRightPanelCollapsed(true);
          localStorage.removeItem('clickedSensor');
        }
      }
      // ViewMode sync removed - each tab maintains its own view independently
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
            
            {emergencyMode === 'emergency' ? (
              <>
            {/* Chemical Threat Detected and Emergency Response Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Chemical Threat Detected Card */}
              <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-red-600 mb-3">{t.chemicalThreatDetected}</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-gray-700 w-24 flex-shrink-0">{t.threatTypeLabel}:</span>
                    <span className="text-[10px] text-gray-900 font-semibold">{t.chemicalAgentC3Detection}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-gray-700 w-24 flex-shrink-0">{t.detectorLabel}:</span>
                    <div className="flex items-center gap-1.5">
                      {scenarioId ? (
                        <>
                          <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded">C12</span>
                          {simulationTime >= 900 && (
                            <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded">C7</span>
                          )}
                        </>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded">C3</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-gray-700 w-24 flex-shrink-0">{t.detectionTimeLabel}:</span>
                    <span className="text-[10px] text-gray-900">02/03/2026 14:47:23</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-gray-700 w-24 flex-shrink-0">{t.severityLabel}:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-red-600 text-white border border-red-700">
                      {t.critical.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-gray-700 w-24 flex-shrink-0">{t.sourceLabel}:</span>
                    <span className="text-[10px] text-gray-900">{t.externalContaminationUnknownOrigin}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-gray-700 w-24 flex-shrink-0">{t.affectedZonesLabel}:</span>
                    <span className="text-[10px] text-gray-900 font-semibold">A-2, A-3, B-1 (3 {t.total})</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold text-gray-700 w-24 flex-shrink-0">{t.personnelAtRiskLabel}:</span>
                    <span className="text-[10px] text-gray-900 font-semibold">12 {t.occupants}</span>
                  </div>
                </div>
              </div>

              {/* Automated Emergency Response Status */}
              <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{t.automatedEmergencyResponseStatus}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* GTV System */}
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Wind className="size-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-0.5">{t.gtvSystem}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-green-500"></div>
                        <span className="text-xs font-semibold text-gray-900">{t.on}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fresh Air Intake */}
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Airplay className="size-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-0.5">{t.freshAirIntake}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-red-500"></div>
                        <span className="text-xs font-semibold text-gray-900">{t.off}</span>
                      </div>
                    </div>
                  </div>

                  {/* External Water Supply */}
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <CloudRain className="size-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-0.5">{t.externalWater}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-red-500"></div>
                        <span className="text-xs font-semibold text-gray-900">{t.off}</span>
                      </div>
                    </div>
                  </div>

                  {/* Filtration System */}
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Filter className="size-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-0.5">{t.filtrationSystem}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-green-500"></div>
                        <span className="text-xs font-semibold text-gray-900">{t.on}</span>
                      </div>
                    </div>
                  </div>

                  {/* CO2 Removal */}
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="size-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-0.5">{t.co2Removal}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-green-500"></div>
                        <span className="text-xs font-semibold text-gray-900">{t.on}</span>
                      </div>
                    </div>
                  </div>

                  {/* Oxygen Supply System */}
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Radio className="size-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-gray-600 mb-0.5">{t.o2SupplySystem}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-green-500"></div>
                        <span className="text-xs font-semibold text-gray-900">{t.on}</span>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* AI Assessment and Predictions - Title Outside */}
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t.aiAssessmentAndPredictions}</h3>

            {/* Three Separate Graphs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* CO2 Graph */}
              <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-sm font-bold text-gray-900">{t.co2Level}</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 bg-blue-600"></div>
                      <span className="text-gray-600">{t.actual_label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 border-t-2 border-dashed border-purple-600"></div>
                      <span className="text-gray-600">{t.aiPredicted}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 bg-orange-500"></div>
                      <span className="text-gray-600">{t.warningThreshold} (800)</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={emergencyMode === 'emergency' ? [
                      { time: '-6h', value: 420, warning: 800 },
                      { time: '-5h', value: 435, warning: 800 },
                      { time: '-4h', value: 445, warning: 800 },
                      { time: '-3h', value: 458, warning: 800 },
                      { time: '-2h', value: 470, warning: 800 },
                      { time: '-1h', value: 480, warning: 800 },
                      { time: 'Now', value: 483, pred: 483, warning: 800 },
                      { time: '+1h', pred: 495, warning: 800 },
                      { time: '+2h', pred: 510, warning: 800 },
                      { time: '+3h', pred: 525, warning: 800 },
                      { time: '+4h', pred: 545, warning: 800 },
                      { time: '+5h', pred: 558, warning: 800 },
                      { time: '+6h', pred: 570, warning: 800 },
                    ] : emergencyMode === 'incident' ? [
                      { time: '-6h', value: 550, warning: 800 },
                      { time: '-5h', value: 620, warning: 800 },
                      { time: '-4h', value: 710, warning: 800 },
                      { time: '-3h', value: 780, warning: 800 },
                      { time: '-2h', value: 850, warning: 800 },
                      { time: '-1h', value: 900, warning: 800 },
                      { time: 'Now', value: 950, pred: 950, warning: 800 },
                      { time: '+1h', pred: 975, warning: 800 },
                      { time: '+2h', pred: 1000, warning: 800 },
                      { time: '+3h', pred: 1025, warning: 800 },
                      { time: '+4h', pred: 1050, warning: 800 },
                      { time: '+5h', pred: 1080, warning: 800 },
                      { time: '+6h', pred: 1100, warning: 800 },
                    ] : [
                      { time: '-6h', value: 410, warning: 800 },
                      { time: '-5h', value: 415, warning: 800 },
                      { time: '-4h', value: 418, warning: 800 },
                      { time: '-3h', value: 420, warning: 800 },
                      { time: '-2h', value: 422, warning: 800 },
                      { time: '-1h', value: 420, warning: 800 },
                      { time: 'Now', value: 420, pred: 420, warning: 800 },
                      { time: '+1h', pred: 422, warning: 800 },
                      { time: '+2h', pred: 425, warning: 800 },
                      { time: '+3h', pred: 423, warning: 800 },
                      { time: '+4h', pred: 420, warning: 800 },
                      { time: '+5h', pred: 418, warning: 800 },
                      { time: '+6h', pred: 415, warning: 800 },
                    ]}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      stroke="#9ca3af"
                      label={{ value: 'ppm', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '11px'
                      }}
                      formatter={(value: any, name: string) => {
                        if (name === 'value') return [value + ' ppm', 'Actual'];
                        if (name === 'pred') return [value + ' ppm', 'AI Predicted'];
                        if (name === 'warning') return [value + ' ppm', 'Warning'];
                        return [value, name];
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ fill: '#2563eb', r: 3 }}
                      connectNulls={false}
                      name="value"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pred" 
                      stroke="#9333ea"
                      strokeWidth={2.5}
                      strokeDasharray="5 5"
                      dot={{ fill: '#9333ea', r: 3 }}
                      connectNulls={false}
                      name="pred"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="warning" 
                      stroke="#f97316"
                      strokeWidth={1.5}
                      dot={false}
                      connectNulls={false}
                      name="warning"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* O2 Graph */}
              <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-sm font-bold text-gray-900">{t.o2Level}</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 bg-blue-600"></div>
                      <span className="text-gray-600">{t.actual_label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 border-t-2 border-dashed border-purple-600"></div>
                      <span className="text-gray-600">{t.aiPredicted}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 bg-orange-500"></div>
                      <span className="text-gray-600">{t.criticalThreshold} (19.5%)</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={emergencyMode === 'emergency' ? [
                      { time: '-6h', value: 20.9, critical: 19.5 },
                      { time: '-5h', value: 20.7, critical: 19.5 },
                      { time: '-4h', value: 20.5, critical: 19.5 },
                      { time: '-3h', value: 20.3, critical: 19.5 },
                      { time: '-2h', value: 20.1, critical: 19.5 },
                      { time: '-1h', value: 19.9, critical: 19.5 },
                      { time: 'Now', value: 19.8, pred: 19.8, critical: 19.5 },
                      { time: '+1h', pred: 19.5, critical: 19.5 },
                      { time: '+2h', pred: 19.3, critical: 19.5 },
                      { time: '+3h', pred: 19.0, critical: 19.5 },
                      { time: '+4h', pred: 18.8, critical: 19.5 },
                      { time: '+5h', pred: 18.6, critical: 19.5 },
                      { time: '+6h', pred: 18.5, critical: 19.5 },
                    ] : emergencyMode === 'incident' ? [
                      { time: '-6h', value: 20.9, critical: 19.5 },
                      { time: '-5h', value: 20.8, critical: 19.5 },
                      { time: '-4h', value: 20.8, critical: 19.5 },
                      { time: '-3h', value: 20.7, critical: 19.5 },
                      { time: '-2h', value: 20.7, critical: 19.5 },
                      { time: '-1h', value: 20.6, critical: 19.5 },
                      { time: 'Now', value: 20.6, pred: 20.6, critical: 19.5 },
                      { time: '+1h', pred: 20.5, critical: 19.5 },
                      { time: '+2h', pred: 20.4, critical: 19.5 },
                      { time: '+3h', pred: 20.3, critical: 19.5 },
                      { time: '+4h', pred: 20.2, critical: 19.5 },
                      { time: '+5h', pred: 20.1, critical: 19.5 },
                      { time: '+6h', pred: 20.0, critical: 19.5 },
                    ] : [
                      { time: '-6h', value: 20.9, critical: 19.5 },
                      { time: '-5h', value: 20.9, critical: 19.5 },
                      { time: '-4h', value: 21.0, critical: 19.5 },
                      { time: '-3h', value: 20.9, critical: 19.5 },
                      { time: '-2h', value: 21.0, critical: 19.5 },
                      { time: '-1h', value: 20.9, critical: 19.5 },
                      { time: 'Now', value: 20.9, pred: 20.9, critical: 19.5 },
                      { time: '+1h', pred: 20.9, critical: 19.5 },
                      { time: '+2h', pred: 21.0, critical: 19.5 },
                      { time: '+3h', pred: 20.9, critical: 19.5 },
                      { time: '+4h', pred: 20.9, critical: 19.5 },
                      { time: '+5h', pred: 20.8, critical: 19.5 },
                      { time: '+6h', pred: 20.8, critical: 19.5 },
                    ]}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      stroke="#9ca3af"
                      domain={emergencyMode === 'emergency' ? [18, 21] : [19, 21.5]}
                      label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '11px'
                      }}
                      formatter={(value: any, name: string) => {
                        if (name === 'value') return [value + '%', 'Actual'];
                        if (name === 'pred') return [value + '%', 'AI Predicted'];
                        if (name === 'critical') return [value + '%', 'Critical'];
                        return [value, name];
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ fill: '#2563eb', r: 3 }}
                      connectNulls={false}
                      name="value"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pred" 
                      stroke="#9333ea"
                      strokeWidth={2.5}
                      strokeDasharray="5 5"
                      dot={{ fill: '#9333ea', r: 3 }}
                      connectNulls={false}
                      name="pred"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="critical" 
                      stroke="#f97316"
                      strokeWidth={1.5}
                      dot={false}
                      connectNulls={false}
                      name="critical"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Water Level Graph */}
              <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-sm font-bold text-gray-900">{t.waterLevel_label}</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 bg-blue-600"></div>
                      <span className="text-gray-600">{t.actual_label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 border-t-2 border-dashed border-purple-600"></div>
                      <span className="text-gray-600">{t.aiPredicted}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-0.5 bg-orange-500"></div>
                      <span className="text-gray-600">{t.low} (20%)</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={emergencyMode === 'emergency' ? [
                      { time: '-6h', value: 88, low: 20 },
                      { time: '-5h', value: 75, low: 20 },
                      { time: '-4h', value: 60, low: 20 },
                      { time: '-3h', value: 48, low: 20 },
                      { time: '-2h', value: 35, low: 20 },
                      { time: '-1h', value: 28, low: 20 },
                      { time: 'Now', value: 22, pred: 22, low: 20 },
                      { time: '+1h', pred: 18, low: 20 },
                      { time: '+2h', pred: 14, low: 20 },
                      { time: '+3h', pred: 10, low: 20 },
                      { time: '+4h', pred: 6, low: 20 },
                      { time: '+5h', pred: 4, low: 20 },
                      { time: '+6h', pred: 2, low: 20 },
                    ] : emergencyMode === 'incident' ? [
                      { time: '-6h', value: 87, low: 20 },
                      { time: '-5h', value: 88, low: 20 },
                      { time: '-4h', value: 87, low: 20 },
                      { time: '-3h', value: 88, low: 20 },
                      { time: '-2h', value: 87, low: 20 },
                      { time: '-1h', value: 88, low: 20 },
                      { time: 'Now', value: 88, pred: 88, low: 20 },
                      { time: '+1h', pred: 87, low: 20 },
                      { time: '+2h', pred: 87, low: 20 },
                      { time: '+3h', pred: 86, low: 20 },
                      { time: '+4h', pred: 86, low: 20 },
                      { time: '+5h', pred: 85, low: 20 },
                      { time: '+6h', pred: 85, low: 20 },
                    ] : [
                      { time: '-6h', value: 87, low: 20 },
                      { time: '-5h', value: 88, low: 20 },
                      { time: '-4h', value: 87, low: 20 },
                      { time: '-3h', value: 88, low: 20 },
                      { time: '-2h', value: 88, low: 20 },
                      { time: '-1h', value: 87, low: 20 },
                      { time: 'Now', value: 88, pred: 88, low: 20 },
                      { time: '+1h', pred: 88, low: 20 },
                      { time: '+2h', pred: 87, low: 20 },
                      { time: '+3h', pred: 87, low: 20 },
                      { time: '+4h', pred: 88, low: 20 },
                      { time: '+5h', pred: 88, low: 20 },
                      { time: '+6h', pred: 87, low: 20 },
                    ]}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      stroke="#9ca3af"
                      domain={[0, 100]}
                      label={{ value: '%', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#6b7280' } }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '11px'
                      }}
                      formatter={(value: any, name: string) => {
                        if (name === 'value') return [value + '%', 'Actual'];
                        if (name === 'pred') return [value + '%', 'AI Predicted'];
                        if (name === 'low') return [value + '%', 'Low'];
                        return [value, name];
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ fill: '#2563eb', r: 3 }}
                      connectNulls={false}
                      name="value"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pred" 
                      stroke="#9333ea"
                      strokeWidth={2.5}
                      strokeDasharray="5 5"
                      dot={{ fill: '#9333ea', r: 3 }}
                      connectNulls={false}
                      name="pred"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="low" 
                      stroke="#f97316"
                      strokeWidth={1.5}
                      dot={false}
                      connectNulls={false}
                      name="low"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Assessment and Recommendations - Two Columns */}
            <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm mb-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column - AI Assessment Notes */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">AI Analysis</h4>
                  {emergencyMode === 'emergency' ? (
                    <div className="space-y-2">
                      {/* Key Metric Cards */}
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-md p-2 shadow-sm">
                          <div className="text-[8px] text-red-50 font-semibold uppercase tracking-wide mb-0.5">Predicted Failure</div>
                          <div className="text-white text-lg font-bold">4.2h</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-md p-2 shadow-sm">
                          <div className="text-[8px] text-orange-50 font-semibold uppercase tracking-wide mb-0.5">CBRN Filter</div>
                          <div className="text-white text-lg font-bold">2.8h</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-md p-2 shadow-sm">
                          <div className="text-[8px] text-red-50 font-semibold uppercase tracking-wide mb-0.5">CO₂ Filter</div>
                          <div className="text-white text-lg font-bold">1.5h</div>
                          <div className="text-[8px] text-red-100">Critical</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-md p-2 shadow-sm">
                          <div className="text-[8px] text-red-50 font-semibold uppercase tracking-wide mb-0.5">Water Reserve</div>
                          <div className="text-white text-lg font-bold">3.1h</div>
                        </div>
                      </div>
                      
                      {/* Additional Status Items */}
                      <div className="space-y-1.5">
                        <div className="bg-orange-50 border border-orange-200 rounded px-2 py-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] font-bold text-orange-800">O₂ Level Status:</span>
                            <span className="text-[10px] text-orange-700 font-semibold">19.8%</span>
                          </div>
                          <div className="text-[8px] text-orange-600 mt-0.5">Declining (Safe: &gt;19.5%)</div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded px-2 py-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] font-bold text-yellow-800">GTV System Load:</span>
                            <span className="text-[10px] text-yellow-700 font-semibold">92%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-gray-700 w-36 flex-shrink-0">System Status:</span>
                        <span className="text-[10px] text-green-600 font-semibold">All Systems Optimal</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-gray-700 w-36 flex-shrink-0">CBRN Filter Capacity:</span>
                        <span className="text-[10px] text-green-600 font-semibold">168+ hours remaining</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-gray-700 w-36 flex-shrink-0">CO₂ Filter Capacity:</span>
                        <span className="text-[10px] text-green-600 font-semibold">Normal - 72+ hours</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-gray-700 w-36 flex-shrink-0">Water Reserve Level:</span>
                        <span className="text-[10px] text-green-600 font-semibold">88% - 96+ hours supply</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-gray-700 w-36 flex-shrink-0">O₂ Level Status:</span>
                        <span className="text-[10px] text-green-600 font-semibold">Optimal - 20.9%</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-gray-700 w-36 flex-shrink-0">GTV System Load:</span>
                        <span className="text-[10px] text-green-600 font-semibold">18% capacity</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-gray-700 w-36 flex-shrink-0">Threat Level:</span>
                        <span className="text-[10px] text-green-600 font-semibold">None Detected</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold text-gray-700 w-36 flex-shrink-0">6-Hour Forecast:</span>
                        <span className="text-[10px] text-green-600 font-semibold">Stable Conditions Expected</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - AI Recommendations */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">AI Recommendations</h4>
                  {emergencyMode === 'emergency' ? (
                    <div className="space-y-2">
                      {/* Recommendation 1 - IMMEDIATE */}
                      <div className="bg-white border-l-4 border-red-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">1</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] font-bold text-red-700 uppercase tracking-wide mb-0.5">IMMEDIATE</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              Establish external water supply connection
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              Prevent reserve depletion
                            </p>
                          </div>
                          <button className="bg-red-600 hover:bg-red-700 text-white text-[9px] font-semibold py-1.5 px-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0">
                            Execute
                          </button>
                        </div>
                      </div>

                      {/* Recommendation 2 - CRITICAL */}
                      <div className="bg-white border-l-4 border-red-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">2</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] font-bold text-red-700 uppercase tracking-wide mb-0.5">CRITICAL</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              Replace CBRN filter within 2 hours
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              Maintain contamination protection
                            </p>
                          </div>
                          <button className="bg-red-600 hover:bg-red-700 text-white text-[9px] font-semibold py-1.5 px-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0">
                            Execute
                          </button>
                        </div>
                      </div>

                      {/* Recommendation 3 - HIGH */}
                      <div className="bg-white border-l-4 border-orange-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">3</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] font-bold text-orange-700 uppercase tracking-wide mb-0.5">HIGH</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              Reduce facility occupancy by 30%
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              Decrease O₂ consumption rate
                            </p>
                          </div>
                          <button className="bg-orange-600 hover:bg-orange-700 text-white text-[9px] font-semibold py-1.5 px-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0">
                            Execute
                          </button>
                        </div>
                      </div>

                      {/* Recommendation 4 - HIGH */}
                      <div className="bg-white border-l-4 border-orange-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">4</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] font-bold text-orange-700 uppercase tracking-wide mb-0.5">HIGH</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              Replace CO₂ scrubber cartridge
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              Maintain air quality
                            </p>
                          </div>
                          <button className="bg-orange-600 hover:bg-orange-700 text-white text-[9px] font-semibold py-1.5 px-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0">
                            Execute
                          </button>
                        </div>
                      </div>

                      {/* Recommendation 5 - MEDIUM */}
                      <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">5</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] font-bold text-yellow-700 uppercase tracking-wide mb-0.5">MEDIUM</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              Monitor GTV system temperature
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              Operating near thermal limits
                            </p>
                          </div>
                          <button className="bg-yellow-600 hover:bg-yellow-700 text-white text-[9px] font-semibold py-1.5 px-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0">
                            Execute
                          </button>
                        </div>
                      </div>

                      {/* Automated Action - INFO */}
                      <div className="bg-white border-l-4 border-blue-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[8px] font-bold">AI</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-[8px] font-bold text-blue-700 uppercase tracking-wide mb-0.5">AUTOMATED</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              GTV and filtration systems activated
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              Recovery time: 6-8 hours with external water
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Status - Green */}
                      <div className="bg-white border-l-4 border-green-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[8px] font-bold">✓</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-[8px] font-bold text-green-700 uppercase tracking-wide mb-0.5">STATUS</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              All systems operating within normal parameters - no intervention required
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Routine 1 */}
                      <div className="bg-white border-l-4 border-blue-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">1</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] font-bold text-blue-700 uppercase tracking-wide mb-0.5">ROUTINE</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              Schedule CBRN filter inspection in 30 days
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              Next: 03/05/2026
                            </p>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-semibold py-1.5 px-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0">
                            Execute
                          </button>
                        </div>
                      </div>

                      {/* Routine 2 */}
                      <div className="bg-white border-l-4 border-blue-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">2</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] font-bold text-blue-700 uppercase tracking-wide mb-0.5">ROUTINE</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              CO₂ scrubber maintenance due in 14 days
                            </p>
                            <p className="text-[9px] text-gray-600 mt-0.5">
                              Next: 02/17/2026
                            </p>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-semibold py-1.5 px-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0">
                            Execute
                          </button>
                        </div>
                      </div>

                      {/* Optimal */}
                      <div className="bg-white border-l-4 border-blue-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">3</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-[8px] font-bold text-blue-700 uppercase tracking-wide mb-0.5">OPTIMAL</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              Water reserves adequate - continue normal consumption patterns
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* AI Forecast */}
                      <div className="bg-white border-l-4 border-blue-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[8px] font-bold">AI</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-[8px] font-bold text-blue-700 uppercase tracking-wide mb-0.5">FORECAST</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              Minor CO₂ fluctuations expected (±15 ppm) due to occupancy patterns
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* AI Prediction */}
                      <div className="bg-white border-l-4 border-blue-500 rounded-lg p-2.5 shadow-sm">
                        <div className="flex items-start gap-2">
                          <div className="size-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[8px] font-bold">AI</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-[8px] font-bold text-blue-700 uppercase tracking-wide mb-0.5">{t.aiPrediction}</div>
                            <p className="text-[10px] text-gray-900 font-semibold">
                              {t.allEnvironmentalMetricsStable}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
              </>
            ) : (
              <>
                {/* NORMAL/ALARM MODE - Original Layout */}
                {/* Environmental Metrics Tiles */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {/* Temperature Tile */}
                  <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="text-[10px] text-gray-600 mb-1">{t.temperature}</div>
                    <div className="text-2xl font-bold text-gray-900">22.5°C</div>
                    <div className="text-[10px] text-green-600 mt-1">{t.normal}</div>
                  </div>

                  {/* Air Quality Tile */}
                  <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="text-[10px] text-gray-600 mb-1">{t.airQuality}</div>
                    <div className="text-2xl font-bold text-gray-900">420 ppm</div>
                    <div className="text-[10px] text-green-600 mt-1">{t.excellent}</div>
                  </div>

                  {/* Humidity Tile */}
                  <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="text-[10px] text-gray-600 mb-1">{t.humidity}</div>
                    <div className="text-2xl font-bold text-gray-900">45%</div>
                    <div className="text-[10px] text-green-600 mt-1">{t.optimal}</div>
                  </div>

                  {/* Water Level Tile */}
                  <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
                    <div className="text-[10px] text-gray-600 mb-1">{t.waterLevel}</div>
                    <div className="text-2xl font-bold text-gray-900">88%</div>
                    <div className="text-[10px] text-green-600 mt-1">{t.full}</div>
                  </div>
                </div>

                {/* Environmental Trends Graph + AI Prediction */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-4">{t.environmentalTrends}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { time: '-6h', temp: 21.8, airQuality: 410, humidity: 43, tempPred: null, airQualityPred: null, humidityPred: null },
                        { time: '-5h', temp: 22.0, airQuality: 415, humidity: 44, tempPred: null, airQualityPred: null, humidityPred: null },
                        { time: '-4h', temp: 22.1, airQuality: 418, humidity: 44, tempPred: null, airQualityPred: null, humidityPred: null },
                        { time: '-3h', temp: 22.3, airQuality: 420, humidity: 45, tempPred: null, airQualityPred: null, humidityPred: null },
                        { time: '-2h', temp: 22.4, airQuality: 422, humidity: 45, tempPred: null, airQualityPred: null, humidityPred: null },
                        { time: '-1h', temp: 22.5, airQuality: 420, humidity: 45, tempPred: null, airQualityPred: null, humidityPred: null },
                        { time: 'Now', temp: 22.5, airQuality: 420, humidity: 45, tempPred: 22.5, airQualityPred: 420, humidityPred: 45 },
                        { time: '+1h', temp: null, airQuality: null, humidity: null, tempPred: 22.5, airQualityPred: 422, humidityPred: 45 },
                        { time: '+2h', temp: null, airQuality: null, humidity: null, tempPred: 22.6, airQualityPred: 425, humidityPred: 46 },
                        { time: '+3h', temp: null, airQuality: null, humidity: null, tempPred: 22.7, airQualityPred: 423, humidityPred: 46 },
                        { time: '+4h', temp: null, airQuality: null, humidity: null, tempPred: 22.6, airQualityPred: 421, humidityPred: 45 },
                        { time: '+5h', temp: null, airQuality: null, humidity: null, tempPred: 22.5, airQualityPred: 419, humidityPred: 45 },
                        { time: '+6h', temp: null, airQuality: null, humidity: null, tempPred: 22.4, airQualityPred: 418, humidityPred: 44 },
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
                          if (name === 'temp' || name === 'tempPred') return [value + '°C', 'Temperature'];
                          if (name === 'airQuality' || name === 'airQualityPred') return [value + ' ppm', 'Air Quality'];
                          if (name === 'humidity' || name === 'humidityPred') return [value + '%', 'Humidity'];
                          return [value, name];
                        }}
                      />
                      {/* Historical data - solid lines */}
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="temp" 
                        stroke="#ea580c" 
                        strokeWidth={2.5}
                        dot={{ fill: '#ea580c', r: 3 }}
                        connectNulls={false}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="airQuality" 
                        stroke="#15803d" 
                        strokeWidth={2.5}
                        dot={{ fill: '#15803d', r: 3 }}
                        connectNulls={false}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="humidity" 
                        stroke="#0e7490" 
                        strokeWidth={2.5}
                        dot={{ fill: '#0e7490', r: 3 }}
                        connectNulls={false}
                      />
                      {/* Predicted data - dashed lines */}
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="tempPred" 
                        stroke="#ea580c" 
                        strokeWidth={2.5}
                        strokeDasharray="5 5"
                        dot={{ fill: '#ea580c', r: 3 }}
                        connectNulls={false}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="airQualityPred" 
                        stroke="#15803d" 
                        strokeWidth={2.5}
                        strokeDasharray="5 5"
                        dot={{ fill: '#15803d', r: 3 }}
                        connectNulls={false}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="humidityPred" 
                        stroke="#0e7490" 
                        strokeWidth={2.5}
                        strokeDasharray="5 5"
                        dot={{ fill: '#0e7490', r: 3 }}
                        connectNulls={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>


              </>
            )}

            {/* Recent Auto-Resolved Alerts - Only show in Normal and Alarm modes */}
            {emergencyMode !== 'emergency' && (
            <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900">{t.recentAutoResolvedAlerts}</h3>
                <span className="text-[10px] text-gray-500 font-semibold">{t.last24Hours}</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-50">
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">{t.timestamp}</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">{t.alertType}</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">{t.locationSensor}</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">{t.severity}</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">{t.autoResolutionRule}</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700 border-r border-gray-300">{t.resolutionTime}</th>
                      <th className="py-2 px-3 text-left text-[10px] font-bold text-gray-700">{t.status}</th>
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
                        {t.highCo2Level}
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        {t.zoneBSensorCO2}
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                          {t.medium.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">{t.hvacAutoBoostRule}</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">{t.hvacAutoBoostRuleDesc}</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        3m 42s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ {t.resolved}
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
                        {t.temperatureSpike}
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        {t.serverRoomSensorT}
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                          {t.medium.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">{t.thermalControlProtocol}</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">{t.thermalControlProtocolDesc}</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        1m 18s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ {t.resolved}
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
                        {t.pressureDifferentialLow}
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        {t.corridor3SensorDP}
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                          {t.low.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">{t.pressureStabilizationAI}</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">{t.pressureStabilizationAIDesc}</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        45s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ {t.resolved}
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
                        {t.humidityOutOfRange}
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        {t.storageAreaSensorH}
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                          {t.low.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">{t.climateControlAutomation}</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">{t.climateControlAutomationDesc}</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        8m 15s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ {t.resolved}
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
                        {t.filterPressureWarning}
                      </td>
                      <td className="py-2 px-3 text-[10px] text-blue-600 border-r border-gray-300 font-semibold hover:underline">
                        {t.hvacUnit2SensorF}
                      </td>
                      <td className="py-2 px-3 border-r border-gray-300">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                          {t.medium.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300">
                        <div className="font-semibold text-blue-600">{t.predictiveMaintenanceAI}</div>
                        <div className="text-[9px] text-gray-500 mt-0.5">{t.predictiveMaintenanceAIDesc}</div>
                      </td>
                      <td className="py-2 px-3 text-[10px] text-gray-900 border-r border-gray-300 font-medium">
                        2m 03s
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-800 border border-green-300">
                          ✓ {t.resolved}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>

          {/* Right Panel - Sensor Info for all modes */}
          {selectedSensor && (
            <div className="w-[30%] transition-all duration-300 border-l-2 border-gray-300 bg-gray-50 overflow-y-auto px-6 pb-4 pt-4">
              {emergencyMode === 'incident' ? (
                /* Warning Card for Active Alarm Mode */
                <div className="sticky top-4">
                  <div className="bg-orange-50 rounded-lg border-2 border-orange-400 shadow-lg p-5">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-orange-300">
                      <div className="size-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-orange-900 mb-1">
                          {language === 'en' ? 'CO₂ Level Warning' : 'تحذير مستوى ثاني أكسيد الكربون'}
                        </h4>
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold uppercase rounded">
                          {language === 'en' ? 'WARNING' : 'تحذير'}
                        </span>
                      </div>
                    </div>

                    {/* Warning Details */}
                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                          {language === 'en' ? 'ID' : 'المعرف'}
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          warning-incident-001
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                          {language === 'en' ? 'Current Reading' : 'القراءة الحالية'}
                        </div>
                        <div className="text-2xl font-bold text-orange-600">950 ppm</div>
                        <div className="text-xs text-orange-700 mt-1">
                          {language === 'en' ? 'Above normal threshold (800 ppm)' : 'أعلى من العتبة الطبيعية (800 جزء في المليون)'}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                          {language === 'en' ? 'Affected Zones' : 'المناطق المتأثرة'}
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {language === 'en' ? 'Multiple areas' : 'مناطق متعددة'}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                          {language === 'en' ? 'Detection Time' : 'وقت الكشف'}
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {selectedSensor.lastUpdate}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                          {language === 'en' ? 'Status' : 'الحالة'}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-orange-500 animate-pulse"></div>
                          <span className="text-sm font-semibold text-orange-700 uppercase">
                            {language === 'en' ? 'ACTIVE' : 'نشط'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* AI Assessment */}
                    <div className="bg-white rounded-lg border border-orange-300 p-4 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="size-4 text-purple-600" />
                        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                          {language === 'en' ? 'AI Assessment' : 'تقييم الذكاء الاصطناعي'}
                        </h5>
                      </div>
                      <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                        <div className="flex items-start gap-2">
                          <div className="size-1.5 rounded-full bg-orange-600 mt-1.5 flex-shrink-0"></div>
                          <p>
                            {language === 'en'
                              ? 'CO₂ levels are elevated above safe thresholds. Ventilation system automatically activated.'
                              : 'مستويات ثاني أكسيد الكربون مرتفعة فوق العتبات الآمنة. تم تفعيل نظام التهوية تلقائياً.'}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="size-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                          <p>
                            {language === 'en'
                              ? 'HVAC systems working to reduce CO₂ concentration. Expected normalization in 15-20 minutes.'
                              : 'أنظمة التهوية تعمل على تقليل تركيز ثاني أكسيد الكربون. التطبيع المتوقع في 15-20 دقيقة.'}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="size-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></div>
                          <p>
                            {language === 'en'
                              ? 'No immediate health risk. Monitoring continues.'
                              : 'لا يوجد خطر صحي فوري. المراقبة مستمرة.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Normal Sensor Detail Panel */
                <SensorDetailPanel 
                  sensor={selectedSensor}
                  onClose={() => {
                    localStorage.removeItem('clickedSensor');
                    setSelectedSensor(null);
                  }}
                  language={language}
                />
              )}
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
                <FloorPlanLegend emergencyMode={emergencyMode} language={language} />
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
                <h4 className="text-xs font-bold text-gray-800 mb-3 text-center border-b border-gray-300 pb-1.5">{t.liveStatus}</h4>
                
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
                    value={emergencyMode === 'emergency' ? 22 : 88} 
                    unit="%" 
                    maxValue={100} 
                    reverse={true}
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
                      <div 
                        className={`w-2.5 h-2.5 rounded-full border border-black/20 flex items-center justify-center relative cursor-pointer hover:opacity-80 transition-opacity ${
                          emergencyMode === 'incident' 
                            ? 'bg-orange-500 sensor-blink sensor-pulse-ring' 
                            : 'bg-green-600'
                        }`}
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co2-2', name: 'CO₂ Sensor - Group 2', status: emergencyMode === 'incident' ? 'warning' : 'operational', value: emergencyMode === 'incident' ? '950 ppm' : '420 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO2-02', 
                            name: 'CO₂ Sensor - Group 2', 
                            type: 'air-quality', 
                            subType: 'CO2', 
                            status: emergencyMode === 'incident' ? 'warning' : 'operational', 
                            value: emergencyMode === 'incident' ? '950 ppm' : '420 ppm', 
                            x: 25, 
                            y: 18,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      {/* CO Sensor */}
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co-2', name: 'CO Sensor - Group 2', status: 'operational', value: '3 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO-02', 
                            name: 'CO Sensor - Group 2', 
                            type: 'air-quality', 
                            subType: 'CO', 
                            status: 'operational', 
                            value: '3 ppm', 
                            x: 25, 
                            y: 18,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      {/* O₂ Sensor */}
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-o2-2', name: 'O₂ Sensor - Group 2', status: 'operational', value: '20.9%', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'O2-02', 
                            name: 'O₂ Sensor - Group 2', 
                            type: 'air-quality', 
                            subType: 'O2', 
                            status: 'operational', 
                            value: '20.9%', 
                            x: 25, 
                            y: 18,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
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
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co2-1', name: 'CO₂ Sensor - Group 1', status: 'operational', value: '420 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO2-01', 
                            name: 'CO₂ Sensor - Group 1', 
                            type: 'air-quality', 
                            subType: 'CO2', 
                            status: 'operational', 
                            value: '420 ppm', 
                            x: 18, 
                            y: 12,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      {/* CO Sensor */}
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co-1', name: 'CO Sensor - Group 1', status: 'operational', value: '3 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO-01', 
                            name: 'CO Sensor - Group 1', 
                            type: 'air-quality', 
                            subType: 'CO', 
                            status: 'operational', 
                            value: '3 ppm', 
                            x: 18, 
                            y: 12,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      {/* O₂ Sensor */}
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-o2-1', name: 'O₂ Sensor - Group 1', status: 'operational', value: '20.9%', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'O2-01', 
                            name: 'O₂ Sensor - Group 1', 
                            type: 'air-quality', 
                            subType: 'O2', 
                            status: 'operational', 
                            value: '20.9%', 
                            x: 18, 
                            y: 12,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
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
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co2-3', name: 'CO₂ Sensor - Group 3', status: 'operational', value: '415 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO2-03', 
                            name: 'CO₂ Sensor - Group 3', 
                            type: 'air-quality', 
                            subType: 'CO2', 
                            status: 'operational', 
                            value: '415 ppm', 
                            x: 32, 
                            y: 17,
                            lastUpdate: '2s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co-3', name: 'CO Sensor - Group 3', status: 'operational', value: '2 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO-03', 
                            name: 'CO Sensor - Group 3', 
                            type: 'air-quality', 
                            subType: 'CO', 
                            status: 'operational', 
                            value: '2 ppm', 
                            x: 32, 
                            y: 17,
                            lastUpdate: '2s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-o2-3', name: 'O₂ Sensor - Group 3', status: 'operational', value: '20.8%', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'O2-03', 
                            name: 'O₂ Sensor - Group 3', 
                            type: 'air-quality', 
                            subType: 'O2', 
                            status: 'operational', 
                            value: '20.8%', 
                            x: 32, 
                            y: 17,
                            lastUpdate: '2s ago'
                          });
                        }}
                      >
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
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co2-4', name: 'CO₂ Sensor - Group 4', status: 'operational', value: '425 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO2-04', 
                            name: 'CO₂ Sensor - Group 4', 
                            type: 'air-quality', 
                            subType: 'CO2', 
                            status: 'operational', 
                            value: '425 ppm', 
                            x: 33, 
                            y: 23,
                            lastUpdate: '3s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co-4', name: 'CO Sensor - Group 4', status: 'operational', value: '3 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO-04', 
                            name: 'CO Sensor - Group 4', 
                            type: 'air-quality', 
                            subType: 'CO', 
                            status: 'operational', 
                            value: '3 ppm', 
                            x: 33, 
                            y: 23,
                            lastUpdate: '3s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-o2-4', name: 'O₂ Sensor - Group 4', status: 'operational', value: '20.9%', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'O2-04', 
                            name: 'O₂ Sensor - Group 4', 
                            type: 'air-quality', 
                            subType: 'O2', 
                            status: 'operational', 
                            value: '20.9%', 
                            x: 33, 
                            y: 23,
                            lastUpdate: '3s ago'
                          });
                        }}
                      >
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
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co2-5', name: 'CO₂ Sensor - Group 5', status: 'operational', value: '418 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO2-05', 
                            name: 'CO₂ Sensor - Group 5', 
                            type: 'air-quality', 
                            subType: 'CO2', 
                            status: 'operational', 
                            value: '418 ppm', 
                            x: 33, 
                            y: 27,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co-5', name: 'CO Sensor - Group 5', status: 'operational', value: '2 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO-05', 
                            name: 'CO Sensor - Group 5', 
                            type: 'air-quality', 
                            subType: 'CO', 
                            status: 'operational', 
                            value: '2 ppm', 
                            x: 33, 
                            y: 27,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-o2-5', name: 'O₂ Sensor - Group 5', status: 'operational', value: '20.8%', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'O2-05', 
                            name: 'O₂ Sensor - Group 5', 
                            type: 'air-quality', 
                            subType: 'O2', 
                            status: 'operational', 
                            value: '20.8%', 
                            x: 33, 
                            y: 27,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
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
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co2-6', name: 'CO₂ Sensor - Group 6', status: 'operational', value: '422 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO2-06', 
                            name: 'CO₂ Sensor - Group 6', 
                            type: 'air-quality', 
                            subType: 'CO2', 
                            status: 'operational', 
                            value: '422 ppm', 
                            x: 20, 
                            y: 26,
                            lastUpdate: '2s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co-6', name: 'CO Sensor - Group 6', status: 'operational', value: '3 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO-06', 
                            name: 'CO Sensor - Group 6', 
                            type: 'air-quality', 
                            subType: 'CO', 
                            status: 'operational', 
                            value: '3 ppm', 
                            x: 20, 
                            y: 26,
                            lastUpdate: '2s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-o2-6', name: 'O₂ Sensor - Group 6', status: 'operational', value: '20.9%', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'O2-06', 
                            name: 'O₂ Sensor - Group 6', 
                            type: 'air-quality', 
                            subType: 'O2', 
                            status: 'operational', 
                            value: '20.9%', 
                            x: 20, 
                            y: 26,
                            lastUpdate: '2s ago'
                          });
                        }}
                      >
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
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co2-7', name: 'CO₂ Sensor - Group 7', status: 'operational', value: '417 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO2-07', 
                            name: 'CO₂ Sensor - Group 7', 
                            type: 'air-quality', 
                            subType: 'CO2', 
                            status: 'operational', 
                            value: '417 ppm', 
                            x: 20, 
                            y: 21,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO₂</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-co-7', name: 'CO Sensor - Group 7', status: 'operational', value: '3 ppm', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'CO-07', 
                            name: 'CO Sensor - Group 7', 
                            type: 'air-quality', 
                            subType: 'CO', 
                            status: 'operational', 
                            value: '3 ppm', 
                            x: 20, 
                            y: 21,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">CO</span>
                      </div>
                      <div 
                        className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-o2-7', name: 'O₂ Sensor - Group 7', status: 'operational', value: '20.9%', type: 'air-quality' })}
                        onMouseLeave={handleSensorLeave}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleSensorClick({ 
                            id: 'O2-07', 
                            name: 'O₂ Sensor - Group 7', 
                            type: 'air-quality', 
                            subType: 'O2', 
                            status: 'operational', 
                            value: '20.9%', 
                            x: 20, 
                            y: 21,
                            lastUpdate: '1s ago'
                          });
                        }}
                      >
                        <span className="text-white text-[4px] font-bold leading-none">O₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Door 1 - Simple green rectangle */}
                <div className="absolute" style={{ left: '49%', top: '6%' }}>
                  <div 
                    className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'door-1', name: 'Door 1', status: 'operational', value: 'Closed', type: 'access-control' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DOOR-01', 
                        name: 'Door 1', 
                        type: 'access-control', 
                        subType: 'Door', 
                        status: 'operational', 
                        value: 'Closed', 
                        x: 19, 
                        y: 2,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">Door 1</span>
                  </div>
                </div>

                {/* DP1 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '44%', top: '6%' }}>
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'dp-1', name: 'Differential Pressure Sensor DP1', status: 'operational', value: '+2.5 Pa', type: 'pressure' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DP-01', 
                        name: 'Differential Pressure Sensor DP1', 
                        type: 'pressure', 
                        subType: 'DP', 
                        status: 'operational', 
                        value: '+2.5 Pa', 
                        x: 17, 
                        y: 2,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">DP1</span>
                  </div>
                </div>

                {/* Door 2 - Simple green rectangle */}
                <div className="absolute" style={{ left: '49%', top: '20%' }}>
                  <div 
                    className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'door-2', name: 'Door 2', status: 'operational', value: 'Closed', type: 'access-control' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DOOR-02', 
                        name: 'Door 2', 
                        type: 'access-control', 
                        subType: 'Door', 
                        status: 'operational', 
                        value: 'Closed', 
                        x: 19, 
                        y: 8,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">Door 2</span>
                  </div>
                </div>

                {/* DP2 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '44%', top: '20%' }}>
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'dp-2', name: 'Differential Pressure Sensor DP2', status: 'operational', value: '+2.3 Pa', type: 'pressure' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DP-02', 
                        name: 'Differential Pressure Sensor DP2', 
                        type: 'pressure', 
                        subType: 'DP', 
                        status: 'operational', 
                        value: '+2.3 Pa', 
                        x: 17, 
                        y: 8,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">DP2</span>
                  </div>
                </div>

                {/* Door 3 - Simple green rectangle */}
                <div className="absolute" style={{ left: '71.5%', top: '39.5%' }}>
                  <div 
                    className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'door-3', name: 'Door 3', status: 'operational', value: 'Closed', type: 'access-control' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DOOR-03', 
                        name: 'Door 3', 
                        type: 'access-control', 
                        subType: 'Door', 
                        status: 'operational', 
                        value: 'Closed', 
                        x: 28, 
                        y: 15,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">Door 3</span>
                  </div>
                </div>

                {/* T1 and H1 sensors at grid position 35,16 */}
                <div className="absolute flex items-center gap-0" style={{ left: '87.75%', top: '39.25%' }}>
                  {/* T1 - Temperature Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-t1', name: 'Temperature Sensor T1', status: 'operational', value: '22.5°C', type: 'temperature' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'T-01', 
                        name: 'Temperature Sensor T1', 
                        type: 'temperature', 
                        subType: 'T', 
                        status: 'operational', 
                        value: '22.5°C', 
                        x: 35, 
                        y: 16,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">T1</span>
                  </div>
                  {/* H1 - Humidity Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-h1', name: 'Humidity Sensor H1', status: 'operational', value: '45%', type: 'humidity' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'H-01', 
                        name: 'Humidity Sensor H1', 
                        type: 'humidity', 
                        subType: 'H', 
                        status: 'operational', 
                        value: '45%', 
                        x: 35, 
                        y: 16,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">H1</span>
                  </div>
                </div>

                {/* T2 and H2 sensors at grid position 35,22 */}
                <div className="absolute flex items-center gap-0" style={{ left: '87.75%', top: '54.25%' }}>
                  {/* T2 - Temperature Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-t2', name: 'Temperature Sensor T2', status: 'operational', value: '23.1°C', type: 'temperature' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'T-02', 
                        name: 'Temperature Sensor T2', 
                        type: 'temperature', 
                        subType: 'T', 
                        status: 'operational', 
                        value: '23.1°C', 
                        x: 35, 
                        y: 22,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">T2</span>
                  </div>
                  {/* H2 - Humidity Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-h2', name: 'Humidity Sensor H2', status: 'operational', value: '46%', type: 'humidity' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'H-02', 
                        name: 'Humidity Sensor H2', 
                        type: 'humidity', 
                        subType: 'H', 
                        status: 'operational', 
                        value: '46%', 
                        x: 35, 
                        y: 22,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">H2</span>
                  </div>
                </div>

                {/* T3 and H3 sensors at grid position 35,26 */}
                <div className="absolute flex items-center gap-0" style={{ left: '87.75%', top: '64.25%' }}>
                  {/* T3 - Temperature Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-t3', name: 'Temperature Sensor T3', status: 'operational', value: '22.8°C', type: 'temperature' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'T-03', 
                        name: 'Temperature Sensor T3', 
                        type: 'temperature', 
                        subType: 'T', 
                        status: 'operational', 
                        value: '22.8°C', 
                        x: 35, 
                        y: 26,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">T3</span>
                  </div>
                  {/* H3 - Humidity Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-h3', name: 'Humidity Sensor H3', status: 'operational', value: '44%', type: 'humidity' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'H-03', 
                        name: 'Humidity Sensor H3', 
                        type: 'humidity', 
                        subType: 'H', 
                        status: 'operational', 
                        value: '44%', 
                        x: 35, 
                        y: 26,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">H3</span>
                  </div>
                </div>

                {/* T5 and H5 sensors at grid position 18,21 */}
                <div className="absolute flex items-center gap-0" style={{ left: '44.75%', top: '52.75%' }}>
                  {/* T5 - Temperature Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-t5', name: 'Temperature Sensor T5', status: 'operational', value: '23.4°C', type: 'temperature' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'T-05', 
                        name: 'Temperature Sensor T5', 
                        type: 'temperature', 
                        subType: 'T', 
                        status: 'operational', 
                        value: '23.4°C', 
                        x: 18, 
                        y: 21,
                        lastUpdate: '3s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">T5</span>
                  </div>
                  {/* H5 - Humidity Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-h5', name: 'Humidity Sensor H5', status: 'operational', value: '47%', type: 'humidity' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'H-05', 
                        name: 'Humidity Sensor H5', 
                        type: 'humidity', 
                        subType: 'H', 
                        status: 'operational', 
                        value: '47%', 
                        x: 18, 
                        y: 21,
                        lastUpdate: '3s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">H5</span>
                  </div>
                </div>

                {/* T6 and H6 sensors at grid position 18,25 */}
                <div className="absolute flex items-center gap-0" style={{ left: '44.75%', top: '62.75%' }}>
                  {/* T6 - Temperature Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-t6', name: 'Temperature Sensor T6', status: 'operational', value: '22.9°C', type: 'temperature' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'T-06', 
                        name: 'Temperature Sensor T6', 
                        type: 'temperature', 
                        subType: 'T', 
                        status: 'operational', 
                        value: '22.9°C', 
                        x: 18, 
                        y: 25,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">T6</span>
                  </div>
                  {/* H6 - Humidity Sensor */}
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-h6', name: 'Humidity Sensor H6', status: 'operational', value: '43%', type: 'humidity' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'H-06', 
                        name: 'Humidity Sensor H6', 
                        type: 'humidity', 
                        subType: 'H', 
                        status: 'operational', 
                        value: '43%', 
                        x: 18, 
                        y: 25,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">H6</span>
                  </div>
                </div>

                {/* Door 4 - Simple green rectangle */}
                <div className="absolute" style={{ left: '59.5%', top: '92.5%' }}>
                  <div 
                    className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'door-4', name: 'Door 4', status: 'operational', value: 'Closed', type: 'access-control' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DOOR-04', 
                        name: 'Door 4', 
                        type: 'access-control', 
                        subType: 'Door', 
                        status: 'operational', 
                        value: 'Closed', 
                        x: 23, 
                        y: 37,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">Door 4</span>
                  </div>
                </div>

                {/* Door 5 - Simple green rectangle */}
                <div className="absolute" style={{ left: '59.5%', top: '78.5%' }}>
                  <div 
                    className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'door-5', name: 'Door 5', status: 'operational', value: 'Closed', type: 'access-control' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DOOR-05', 
                        name: 'Door 5', 
                        type: 'access-control', 
                        subType: 'Door', 
                        status: 'operational', 
                        value: 'Closed', 
                        x: 23, 
                        y: 31,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">Door 5</span>
                  </div>
                </div>

                {/* Door 6 - Simple green rectangle */}
                <div className="absolute" style={{ left: '39%', top: '40%' }}>
                  <div 
                    className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'door-6', name: 'Door 6', status: 'operational', value: 'Closed', type: 'access-control' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DOOR-06', 
                        name: 'Door 6', 
                        type: 'access-control', 
                        subType: 'Door', 
                        status: 'operational', 
                        value: 'Closed', 
                        x: 15, 
                        y: 16,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">Door 6</span>
                  </div>
                </div>

                {/* Door 7 - Simple green rectangle */}
                <div className="absolute" style={{ left: '29%', top: '40%' }}>
                  <div 
                    className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'door-7', name: 'Door 7', status: 'operational', value: 'Closed', type: 'access-control' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DOOR-07', 
                        name: 'Door 7', 
                        type: 'access-control', 
                        subType: 'Door', 
                        status: 'operational', 
                        value: 'Closed', 
                        x: 11, 
                        y: 16,
                        lastUpdate: '3s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">Door 7</span>
                  </div>
                </div>

                {/* Door 8 - Simple green rectangle */}
                <div className="absolute" style={{ left: '19%', top: '40%' }}>
                  <div 
                    className="w-[0.95rem] h-2 bg-green-600 rounded-[1px] border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'door-8', name: 'Door 8', status: 'operational', value: 'Closed', type: 'access-control' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DOOR-08', 
                        name: 'Door 8', 
                        type: 'access-control', 
                        subType: 'Door', 
                        status: 'operational', 
                        value: 'Closed', 
                        x: 7, 
                        y: 16,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">Door 8</span>
                  </div>
                </div>

                {/* DP3 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '65.5%', top: '78.5%' }}>
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'dp-3', name: 'Differential Pressure Sensor DP3', status: 'operational', value: '+2.7 Pa', type: 'pressure' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DP-03', 
                        name: 'Differential Pressure Sensor DP3', 
                        type: 'pressure', 
                        subType: 'DP', 
                        status: 'operational', 
                        value: '+2.7 Pa', 
                        x: 26, 
                        y: 31,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">DP3</span>
                  </div>
                </div>

                {/* DP4 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '65.5%', top: '92.5%' }}>
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'dp-4', name: 'Differential Pressure Sensor DP4', status: 'operational', value: '+2.4 Pa', type: 'pressure' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DP-04', 
                        name: 'Differential Pressure Sensor DP4', 
                        type: 'pressure', 
                        subType: 'DP', 
                        status: 'operational', 
                        value: '+2.4 Pa', 
                        x: 26, 
                        y: 37,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">DP4</span>
                  </div>
                </div>

                {/* DP5 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '29%', top: '42.5%' }}>
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'dp-5', name: 'Differential Pressure Sensor DP5', status: 'operational', value: '+2.6 Pa', type: 'pressure' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DP-05', 
                        name: 'Differential Pressure Sensor DP5', 
                        type: 'pressure', 
                        subType: 'DP', 
                        status: 'operational', 
                        value: '+2.6 Pa', 
                        x: 11, 
                        y: 17,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">DP5</span>
                  </div>
                </div>

                {/* DP6 - Differential Pressure Sensor */}
                <div className="absolute" style={{ left: '19%', top: '42.5%' }}>
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'dp-6', name: 'Differential Pressure Sensor DP6', status: 'operational', value: '+2.8 Pa', type: 'pressure' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'DP-06', 
                        name: 'Differential Pressure Sensor DP6', 
                        type: 'pressure', 
                        subType: 'DP', 
                        status: 'operational', 
                        value: '+2.8 Pa', 
                        x: 7, 
                        y: 17,
                        lastUpdate: '3s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">DP6</span>
                  </div>
                </div>

                {/* W - Water Level Sensor */}
                <div className="absolute" style={{ left: '16%', top: '25.5%' }}>
                  <div className={`w-2.5 h-2.5 relative cursor-pointer hover:opacity-80 transition-opacity ${
                    emergencyMode === 'emergency' ? 'sensor-blink sensor-pulse-ring-red' : ''
                  }`}>
                    <div 
                      className={`w-2.5 h-2.5 ${emergencyMode === 'emergency' ? 'bg-red-600' : 'bg-green-600'} rounded-full border border-black/20 flex items-center justify-center relative`}
                      onMouseEnter={(e) => handleSensorHover(e, { id: 'w-1', name: 'Water Level Sensor', status: emergencyMode === 'emergency' ? 'critical' : 'operational', value: emergencyMode === 'emergency' ? '22%' : '88%', type: 'water-level' })}
                      onMouseLeave={handleSensorLeave}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleSensorClick({ 
                          id: 'W-01', 
                          name: 'Water Level Sensor', 
                          type: 'water-level', 
                          subType: 'W', 
                          status: emergencyMode === 'emergency' ? 'critical' : 'operational', 
                          value: emergencyMode === 'emergency' ? '22%' : '88%', 
                          x: 6, 
                          y: 10,
                          lastUpdate: '2s ago'
                        });
                      }}
                    >
                      <span className="text-white text-[4px] font-bold leading-none">W</span>
                    </div>
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
                    emergencyMode === 'emergency' && !scenarioId ? 'sensor-blink sensor-pulse-ring-red' : ''
                  }`}
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c3', name: 'Chemical Detector C3', status: emergencyMode === 'emergency' && !scenarioId ? 'critical' : 'operational', value: emergencyMode === 'emergency' && !scenarioId ? 'Detected' : 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C3', 
                        name: 'Chemical Detector C3', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: emergencyMode === 'emergency' && !scenarioId ? 'critical' : 'operational', 
                        value: emergencyMode === 'emergency' && !scenarioId ? 'Detected' : 'Normal', 
                        x: 27, 
                        y: 20,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill={emergencyMode === 'emergency' && !scenarioId ? '#dc2626' : '#16a34a'}
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
                  <div className={`w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity ${
                    emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 900 ? 'sensor-blink sensor-pulse-ring-red' : ''
                  }`}
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c7', name: 'Chemical Detector C7', status: emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 900 ? 'critical' : 'operational', value: emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 900 ? 'Detected' : 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C7', 
                        name: 'Chemical Detector C7', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 900 ? 'critical' : 'operational', 
                        value: emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 900 ? 'Detected' : 'Normal', 
                        x: 32, 
                        y: 9,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill={emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 900 ? '#dc2626' : '#16a34a'}
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
                  <div className={`w-3.5 h-3.5 relative cursor-pointer hover:opacity-80 transition-opacity ${
                    emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 0 ? 'sensor-blink sensor-pulse-ring-red' : ''
                  }`}
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'sensor-c12', name: 'Chemical Detector C12', status: emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 0 ? 'critical' : 'operational', value: emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 0 ? 'Detected' : 'Normal', type: 'chemical' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'S-F2-C12', 
                        name: 'Chemical Detector C12', 
                        type: 'chemical', 
                        subType: 'C', 
                        status: emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 0 ? 'critical' : 'operational', 
                        value: emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 0 ? 'Detected' : 'Normal', 
                        x: 37, 
                        y: 18,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M7 2 L12 12 L2 12 Z" 
                        fill={emergencyMode === 'emergency' && scenarioId === '3' && simulationTime >= 0 ? '#dc2626' : '#16a34a'}
                        stroke="rgba(0,0,0,0.2)" 
                        strokeWidth="0.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[4px] text-white leading-none font-bold z-10 pt-1">C12</span>
                  </div>
                </div>

                {/* F - Filter Sensor */}
                <div className="absolute" style={{ left: '13.8%', top: '57.5%' }}>
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'f-1', name: 'Filter Sensor', status: 'operational', value: '92% Efficiency', type: 'filter' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'F-01', 
                        name: 'Filter Sensor', 
                        type: 'filter', 
                        subType: 'F', 
                        status: 'operational', 
                        value: '92% Efficiency', 
                        x: 5, 
                        y: 23,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">F</span>
                  </div>
                </div>

                {/* AF - Airflow Sensor */}
                <div className="absolute" style={{ left: '13.8%', top: '65%' }}>
                  <div 
                    className="w-2.5 h-2.5 bg-green-600 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'af-1', name: 'Airflow Sensor', status: 'operational', value: '450 CFM', type: 'airflow' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'AF-01', 
                        name: 'Airflow Sensor', 
                        type: 'airflow', 
                        subType: 'AF', 
                        status: 'operational', 
                        value: '450 CFM', 
                        x: 5, 
                        y: 26,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">AF</span>
                  </div>
                </div>

                {/* GTV 1 - Gas Tight Valve */}
                <div className="absolute" style={{ left: '11%', top: '55%' }}>
                  <div 
                    className="w-4 h-2 bg-green-600 border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'gtv-1', name: 'Gas Tight Valve 1', status: 'operational', value: 'Open', type: 'valve' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'GTV-01', 
                        name: 'Gas Tight Valve 1', 
                        type: 'valve', 
                        subType: 'GTV', 
                        status: 'operational', 
                        value: 'Open', 
                        x: 4, 
                        y: 22,
                        lastUpdate: '2s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">GTV 1</span>
                  </div>
                </div>

                {/* GTV 2 - Gas Tight Valve */}
                <div className="absolute" style={{ left: '11%', top: '57.5%' }}>
                  <div 
                    className="w-4 h-2 bg-green-600 border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'gtv-2', name: 'Gas Tight Valve 2', status: 'operational', value: 'Open', type: 'valve' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'GTV-02', 
                        name: 'Gas Tight Valve 2', 
                        type: 'valve', 
                        subType: 'GTV', 
                        status: 'operational', 
                        value: 'Open', 
                        x: 4, 
                        y: 23,
                        lastUpdate: '1s ago'
                      });
                    }}
                  >
                    <span className="text-white text-[4px] font-bold leading-none">GTV 2</span>
                  </div>
                </div>

                {/* GTV 3 - Gas Tight Valve */}
                <div className="absolute" style={{ left: '11%', top: '62.5%' }}>
                  <div 
                    className="w-4 h-2 bg-green-600 border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={(e) => handleSensorHover(e, { id: 'gtv-3', name: 'Gas Tight Valve 3', status: 'operational', value: 'Open', type: 'valve' })}
                    onMouseLeave={handleSensorLeave}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSensorClick({ 
                        id: 'GTV-03', 
                        name: 'Gas Tight Valve 3', 
                        type: 'valve', 
                        subType: 'GTV', 
                        status: 'operational', 
                        value: 'Open', 
                        x: 4, 
                        y: 25,
                        lastUpdate: '3s ago'
                      });
                    }}
                  >
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