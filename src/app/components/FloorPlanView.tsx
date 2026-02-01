import { AlertCircle, Thermometer, Activity, Shield, ArrowLeft, X, ChevronRight, CheckCircle, Brain, TrendingUp, Sparkles, ZoomIn, ZoomOut, RotateCcw, Wind, Radio, Lock, Eye, Zap, Droplets, Building2, Clock, AlertTriangle, MapPin, ChevronLeft, Grid3x3 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { incidents } from '../data/mockData';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RoomDetailPanel } from './RoomDetailPanel';
import { SensorDetailPanel } from './SensorDetailPanel';
import { IncidentDetailView } from './IncidentDetailView';
import { Language, translations } from '../translations';
import floorPlanImage from '@/assets/BG.png';

// FloorPlanView - Room details with incident tracking

interface FloorPlanViewProps {
  floorId: string;
  onRoomClick: (roomId: string) => void;
  onIncidentClick: (incidentId: string) => void;
  onBack?: () => void;
  emergencyMode?: boolean;
  hideBreadcrumbs?: boolean;
  language?: Language;
}

// Room type definition for the floor plan
interface Room {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: 'operational' | 'warning' | 'critical';
  temp?: number;
  hasIncident?: boolean;
  sensors?: Sensor[];
}

interface Sensor {
  id: string;
  name: string;
  type: 'chemical' | 'temperature' | 'smoke' | 'motion' | 'pressure' | 'air-quality';
  subType?: 'R' | 'B' | 'C' | 'CO2' | 'CO' | 'O2' | 'DP'; // Specific sensor subtype
  status: 'operational' | 'warning' | 'critical';
  value: string;
  x: number; // Position within room (percentage)
  y: number; // Position within room (percentage)
  lastUpdate?: string;
}

export function FloorPlanView({ floorId, onRoomClick, onIncidentClick, onBack, emergencyMode, hideBreadcrumbs, language = 'en' }: FloorPlanViewProps) {
  const t = translations[language];
  const SHOW_INLINE_TOOLTIPS = false; // Disable inline tooltips, use global tooltip instead
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);
  const [hoveredFloorSensor, setHoveredFloorSensor] = useState<{ id: string; name: string; status: string; value: string; type: string } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [leftPanelWidth, setLeftPanelWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1.0);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(emergencyMode ? -100 : -350);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(!emergencyMode);
  const [showGrid, setShowGrid] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Reset selections when hideBreadcrumbs is true (used in summary dashboard)
  useEffect(() => {
    if (hideBreadcrumbs) {
      setSelectedRoom(null);
      setSelectedSensor(null);
      setSelectedIncident(null);
      setIsRightPanelCollapsed(true);
    }
  }, [hideBreadcrumbs]);

  // Initialize panel width once on mount to a fixed size based on current container
  useEffect(() => {
    if (leftPanelWidth === null && containerRef.current) {
      // Set initial width based on current container size
      // This will be a fixed pixel value that won't change when sidebar toggles
      const containerWidth = containerRef.current.offsetWidth;
      // If in emergency mode (right panel is open), use 50%
      // Otherwise (right panel collapsed), use full width minus button area (48px)
      const initialWidth = emergencyMode 
        ? Math.floor(containerWidth * 0.5) 
        : containerWidth - 48;
      setLeftPanelWidth(initialWidth);
    }
  }, [leftPanelWidth, emergencyMode])

  // Watch for container size changes (e.g., sidebar opening/closing)
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        
        // Recalculate left panel width based on current state
        if (isRightPanelCollapsed) {
          // Right panel collapsed: floor takes all space minus button column
          setLeftPanelWidth(containerWidth - 48);
        } else {
          // Right panel expanded: floor takes half the available space
          setLeftPanelWidth(Math.floor((containerWidth - 48) / 2));
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isRightPanelCollapsed])



  // Handle dragging for resizing panels
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left;
        const minWidth = 400;
        const maxWidth = containerRect.width - 400;
        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setLeftPanelWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Handle panning for zoomed floor plan
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

  // Track mouse position for tooltip with smart positioning
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredFloorSensor && tooltipRef.current) {
        const tooltipWidth = tooltipRef.current.offsetWidth || 200;
        const tooltipHeight = tooltipRef.current.offsetHeight || 80;
        const offset = 10;
        const padding = 10; // Extra padding from viewport edges
        
        let x = e.clientX + offset;
        let y = e.clientY + offset;
        
        // Check if tooltip would go off the right edge
        if (x + tooltipWidth + padding > window.innerWidth) {
          x = e.clientX - tooltipWidth - offset;
        }
        
        // Check if tooltip would go off the bottom edge
        if (y + tooltipHeight + padding > window.innerHeight) {
          y = e.clientY - tooltipHeight - offset;
        }
        
        // Ensure tooltip doesn't go off the left edge
        if (x < padding) {
          x = padding;
        }
        
        // Ensure tooltip doesn't go off the top edge
        if (y < padding) {
          y = e.clientY + offset;
        }
        
        setTooltipPosition({ x, y });
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
    setPanY(-350);
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.5, Math.min(5, prev + delta)));
  };

  // Start panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom >= 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  // Helper function to get sensors for each room
  const getSensorsForRoom = (roomId: string, hasIncident?: boolean): Sensor[] => {
    const baseSensors: Record<string, Sensor[]> = {
      'F2-R1': [ // Command Center
        { id: 'S-F2-R1-01', name: 'CO2 Sensor North', type: 'air-quality', subType: 'CO2', status: 'operational', value: '450 ppm', x: 20, y: 20, lastUpdate: '2s ago' },
        { id: 'S-F2-R1-02', name: 'O2 Sensor South', type: 'air-quality', subType: 'O2', status: 'operational', value: '20.9%', x: 80, y: 80, lastUpdate: '2s ago' },
        { id: 'S-F2-R1-03', name: 'Radiological Detector', type: 'chemical', subType: 'R', status: 'operational', value: 'Normal', x: 50, y: 10, lastUpdate: '1s ago' },
        { id: 'S-F2-R1-04', name: 'Diff Pressure', type: 'pressure', subType: 'DP', status: 'operational', value: '+8 Pa', x: 50, y: 90, lastUpdate: '3s ago' },
      ],
      'F2-R6': hasIncident ? [ // Sector B - Lab (CRITICAL - ONLY in emergency mode)
        { id: 'S-F2-R6-01', name: 'Chemical Detector A', type: 'chemical', subType: 'C', status: 'critical', value: 'AGENT DETECTED', x: 25, y: 30, lastUpdate: '1s ago' },
        { id: 'S-F2-R6-02', name: 'Biological Detector', type: 'chemical', subType: 'B', status: 'critical', value: 'ALERT', x: 75, y: 30, lastUpdate: '1s ago' },
        { id: 'S-F2-R6-03', name: 'CO Sensor', type: 'air-quality', subType: 'CO', status: 'warning', value: '12 ppm', x: 50, y: 70, lastUpdate: '2s ago' },
        { id: 'S-F2-R6-04', name: 'Air Pressure Monitor', type: 'pressure', subType: 'DP', status: 'warning', value: '-12 Pa', x: 85, y: 85, lastUpdate: '2s ago' },
        { id: 'S-F2-R6-05', name: 'Radiological Monitor', type: 'chemical', subType: 'R', status: 'operational', value: 'Normal', x: 15, y: 85, lastUpdate: '3s ago' },
      ] : [ // Normal operations - all clear
        { id: 'S-F2-R6-01', name: 'Chemical Detector A', type: 'chemical', subType: 'C', status: 'operational', value: 'Clear', x: 25, y: 30, lastUpdate: '1s ago' },
        { id: 'S-F2-R6-02', name: 'Biological Detector', type: 'chemical', subType: 'B', status: 'operational', value: 'Clear', x: 75, y: 30, lastUpdate: '1s ago' },
        { id: 'S-F2-R6-03', name: 'CO Sensor', type: 'air-quality', subType: 'CO', status: 'operational', value: '2 ppm', x: 50, y: 70, lastUpdate: '2s ago' },
        { id: 'S-F2-R6-04', name: 'Air Pressure Monitor', type: 'pressure', subType: 'DP', status: 'operational', value: '+5 Pa', x: 85, y: 85, lastUpdate: '2s ago' },
        { id: 'S-F2-R6-05', name: 'Radiological Monitor', type: 'chemical', subType: 'R', status: 'operational', value: 'Normal', x: 15, y: 85, lastUpdate: '3s ago' },
      ],
      'F2-R7': hasIncident ? [ // Sector B - Equipment (WARNING - ONLY in emergency mode)
        { id: 'S-F2-R7-01', name: 'Chemical Detector', type: 'chemical', subType: 'C', status: 'warning', value: 'Trace Detected', x: 30, y: 40, lastUpdate: '2s ago' },
        { id: 'S-F2-R7-02', name: 'CO2 Monitor', type: 'air-quality', subType: 'CO2', status: 'warning', value: '850 ppm', x: 70, y: 60, lastUpdate: '2s ago' },
        { id: 'S-F2-R7-03', name: 'O2 Sensor', type: 'air-quality', subType: 'O2', status: 'warning', value: '19.2%', x: 50, y: 80, lastUpdate: '3s ago' },
      ] : [ // Normal operations
        { id: 'S-F2-R7-01', name: 'Chemical Detector', type: 'chemical', subType: 'C', status: 'operational', value: 'Clear', x: 30, y: 40, lastUpdate: '2s ago' },
        { id: 'S-F2-R7-02', name: 'CO2 Monitor', type: 'air-quality', subType: 'CO2', status: 'operational', value: '420 ppm', x: 70, y: 60, lastUpdate: '2s ago' },
        { id: 'S-F2-R7-03', name: 'O2 Sensor', type: 'air-quality', subType: 'O2', status: 'operational', value: '20.9%', x: 50, y: 80, lastUpdate: '3s ago' },
      ],
      'F2-R10': [ // Medical Bay
        { id: 'S-F2-R10-01', name: 'O2 Monitor', type: 'air-quality', subType: 'O2', status: 'operational', value: '21.0%', x: 30, y: 30, lastUpdate: '2s ago' },
        { id: 'S-F2-R10-02', name: 'CO2 Monitor', type: 'air-quality', subType: 'CO2', status: 'operational', value: '400 ppm', x: 70, y: 30, lastUpdate: '2s ago' },
        { id: 'S-F2-R10-03', name: 'Biological Detector', type: 'chemical', subType: 'B', status: 'operational', value: 'Clear', x: 50, y: 15, lastUpdate: '1s ago' },
        { id: 'S-F2-R10-04', name: 'Pressure Monitor', type: 'pressure', subType: 'DP', status: 'operational', value: '+5 Pa', x: 50, y: 85, lastUpdate: '2s ago' },
      ],
    };

    // Return sensors for the room if defined, otherwise return default sensors
    if (baseSensors[roomId]) {
      return baseSensors[roomId];
    }

    // Default sensors for other rooms
    return [
      { id: `S-${roomId}-01`, name: 'CO2 Sensor', type: 'air-quality', subType: 'CO2', status: 'operational', value: '420 ppm', x: 30, y: 30, lastUpdate: '2s ago' },
      { id: `S-${roomId}-02`, name: 'Pressure Monitor', type: 'pressure', subType: 'DP', status: 'operational', value: '+3 Pa', x: 70, y: 70, lastUpdate: '1s ago' },
    ];
  };

  // Define rooms for Floor 2 (chemical incident floor) and Floor 1
  const floor2Rooms: Room[] = [
    // Access Tunnels (narrow corridors)
    { id: 'F2-T1', name: 'West Access Tunnel', type: 'Tunnel', x: 20, y: 135, width: 30, height: 110, status: 'operational' },
    { id: 'F2-T2', name: 'East Access Tunnel', type: 'Tunnel', x: 870, y: 110, width: 30, height: 140, status: 'operational' },
    
    // Top left - Command and control area (varied dimensions)
    { id: 'F2-R1', name: 'Command Center', type: 'Control Room', x: 60, y: 60, width: 235, height: 125, status: 'operational', temp: 21, sensors: getSensorsForRoom('F2-R1') },
    { id: 'F2-R2', name: 'Communications', type: 'Comm Room', x: 305, y: 60, width: 145, height: 75, status: 'operational', temp: 20, sensors: getSensorsForRoom('F2-R2') },
    { id: 'F2-R3', name: 'Server Room', type: 'IT', x: 305, y: 145, width: 145, height: 105, status: 'operational', temp: 18, sensors: getSensorsForRoom('F2-R3') },
    
    // Connecting corridor (top horizontal)
    { id: 'F2-C1', name: 'North Corridor', type: 'Hallway', x: 60, y: 195, width: 390, height: 55, status: 'operational' },
    
    // Top right - Sector A (Storage area - irregular sizes)
    { id: 'F2-R4', name: 'Sector A - Storage 1', type: 'Storage', x: 470, y: 60, width: 105, height: 100, status: 'operational', temp: 19 },
    { id: 'F2-R5', name: 'Sector A - Storage 2', type: 'Storage', x: 470, y: 170, width: 105, height: 80, status: 'operational', temp: 20 },
    
    // Top far right - Sector B (INCIDENT AREA - status changes based on emergency mode)
    { id: 'F2-R6', name: 'Sector B - Lab', type: 'Laboratory', x: 595, y: 60, width: 255, height: 110, status: 'operational', temp: 22, hasIncident: false, sensors: getSensorsForRoom('F2-R6', false) },
    { id: 'F2-R7', name: 'Sector B - Equipment', type: 'Equipment', x: 595, y: 180, width: 165, height: 100, status: 'operational', temp: 21, hasIncident: false, sensors: getSensorsForRoom('F2-R7', false) },
    { id: 'F2-R8', name: 'Storage Closet', type: 'Storage', x: 770, y: 180, width: 80, height: 100, status: 'operational', temp: 21 },
    
    // Main corridor (wider central hallway)
    { id: 'F2-R9', name: 'Main Corridor', type: 'Hallway', x: 60, y: 260, width: 790, height: 70, status: 'operational' },
    
    // Bottom left - Medical and living (irregular dimensions)
    { id: 'F2-R10', name: 'Medical Bay', type: 'Medical', x: 60, y: 340, width: 185, height: 170, status: 'operational', temp: 22, sensors: getSensorsForRoom('F2-R10') },
    { id: 'F2-R11', name: 'Pharmacy', type: 'Medical Storage', x: 255, y: 340, width: 95, height: 80, status: 'operational', temp: 21 },
    { id: 'F2-R12', name: 'Isolation Room', type: 'Medical', x: 255, y: 430, width: 95, height: 80, status: 'operational', temp: 22 },
    
    // Bottom middle - Living quarters (varied sizes)
    { id: 'F2-R13', name: 'Living Quarters A', type: 'Dormitory', x: 360, y: 340, width: 150, height: 80, status: 'operational', temp: 21 },
    { id: 'F2-R14', name: 'Living Quarters B', type: 'Dormitory', x: 360, y: 430, width: 150, height: 80, status: 'operational', temp: 22 },
    { id: 'F2-R15', name: 'Bathroom', type: 'Facilities', x: 520, y: 340, width: 80, height: 80, status: 'operational', temp: 23 },
    
    // Bottom right - Supply and utilities (irregular layout)
    { id: 'F2-R16', name: 'Supply Room', type: 'Storage', x: 610, y: 340, width: 125, height: 85, status: 'operational', temp: 19 },
    { id: 'F2-R17', name: 'Utility Room', type: 'Utilities', x: 745, y: 340, width: 105, height: 85, status: 'warning', temp: 26 }, // Temperature warning - normal operations
    { id: 'F2-R18', name: 'Generator Room', type: 'Power', x: 610, y: 435, width: 135, height: 75, status: 'operational', temp: 26 },
    { id: 'F2-R19', name: 'Maintenance', type: 'Workshop', x: 755, y: 435, width: 95, height: 75, status: 'operational', temp: 22 },
  ];

  const floor1Rooms: Room[] = [
    // Access Tunnels
    { id: 'F1-T1', name: 'South Access Tunnel', type: 'Tunnel', x: 20, y: 145, width: 30, height: 100, status: 'operational' },
    { id: 'F1-T2', name: 'North Access Tunnel', type: 'Tunnel', x: 870, y: 120, width: 30, height: 130, status: 'operational' },
    
    // Entry area - CBRNe Protection (irregular dimensions)
    { id: 'F1-R1', name: 'Security Checkpoint', type: 'Security', x: 60, y: 60, width: 175, height: 105, status: 'operational', temp: 20 },
    { id: 'F1-R2', name: 'Airlock Entry', type: 'Airlock', x: 245, y: 60, width: 105, height: 105, status: 'operational', temp: 21 },
    { id: 'F1-R3', name: 'Decontamination', type: 'Decon Chamber', x: 360, y: 60, width: 155, height: 105, status: 'operational', temp: 22 },
    
    // Connecting corridor
    { id: 'F1-C1', name: 'Access Corridor', type: 'Hallway', x: 60, y: 175, width: 455, height: 55, status: 'operational' },
    
    // Command & Control (varied sizes)
    { id: 'F1-R4', name: 'Watch Center', type: 'Operations', x: 525, y: 60, width: 145, height: 70, status: 'operational', temp: 21 },
    { id: 'F1-R5', name: 'Tactical Planning', type: 'Planning Room', x: 680, y: 60, width: 170, height: 70, status: 'operational', temp: 21 },
    { id: 'F1-R6', name: 'Intelligence Center', type: 'Intel Analysis', x: 525, y: 140, width: 145, height: 90, status: 'operational', temp: 20 },
    { id: 'F1-R7', name: 'Communications Hub', type: 'Comm Center', x: 680, y: 140, width: 90, height: 90, status: 'operational', temp: 19 },
    { id: 'F1-R8', name: 'Briefing Room', type: 'Briefing', x: 780, y: 140, width: 70, height: 90, status: 'operational', temp: 21 },
    
    // Main corridor
    { id: 'F1-R9', name: 'Main Hallway', type: 'Hallway', x: 60, y: 240, width: 790, height: 70, status: 'operational' },
    
    // Weapons & Equipment (irregular layout)
    { id: 'F1-R10', name: 'Armory', type: 'Weapons Storage', x: 60, y: 320, width: 115, height: 95, status: 'operational', temp: 20 },
    { id: 'F1-R11', name: 'Ammunition Storage', type: 'Ammo Vault', x: 185, y: 320, width: 95, height: 95, status: 'operational', temp: 20 },
    { id: 'F1-R12', name: 'NBC Equipment', type: 'CBRN Storage', x: 290, y: 320, width: 135, height: 95, status: 'warning', temp: 24 },
    
    // Support Areas (varied dimensions)
    { id: 'F1-R13', name: 'Equipment Lockers', type: 'Gear Storage', x: 60, y: 425, width: 115, height: 85, status: 'operational', temp: 21 },
    { id: 'F1-R14', name: 'Rations Supply', type: 'Supply Depot', x: 185, y: 425, width: 95, height: 85, status: 'operational', temp: 18 },
    { id: 'F1-R15', name: 'Hazmat Storage', type: 'Hazmat Vault', x: 290, y: 425, width: 135, height: 85, status: 'operational', temp: 19 },
    { id: 'F1-R16', name: 'Emergency Response', type: 'Staging Area', x: 435, y: 320, width: 185, height: 190, status: 'operational', temp: 21 },
    
    // Technical Infrastructure
    { id: 'F1-R17', name: 'Data Center', type: 'IT Infrastructure', x: 630, y: 320, width: 115, height: 95, status: 'operational', temp: 18 },
    { id: 'F1-R18', name: 'Electrical Room', type: 'Power Distribution', x: 630, y: 425, width: 220, height: 85, status: 'critical', temp: 29 },
  ];

  const rooms = floorId === 'floor-a-2' ? floor2Rooms : floor1Rooms;
  const isFloor2 = floorId === 'floor-a-2';

  // Update Floor 2 room statuses based on emergency mode
  const adjustedRooms = rooms.map(room => {
    if (isFloor2 && (room.id === 'F2-R6' || room.id === 'F2-R7')) {
      // Sector B rooms change status based on emergency mode
      return {
        ...room,
        status: emergencyMode ? 'critical' : 'warning',
        hasIncident: emergencyMode,
      };
    }
    return room;
  });

  const handleRoomClick = (room: Room) => {
    if (room.type !== 'Hallway') {
      setSelectedRoom(room.id);
      setSelectedSensor(null);
      onRoomClick(room.id);
    }
  };

  const handleSensorClick = (sensor: any) => {
    setSelectedSensor(sensor);
    setSelectedIncident(null); // Clear any incident selection
    
    // Expand the panel and adjust the floor plan width
    if (isRightPanelCollapsed && containerRef.current) {
      setIsRightPanelCollapsed(false);
      setLeftPanelWidth(containerRef.current.offsetWidth / 2);
      setPanX(0);
      setPanY(-100);
      setZoom(1.0);
    }
  };

  const selectedRoomData = adjustedRooms.find(r => r.id === selectedRoom);

  // Helper function to generate historical data for sensors
  const generateSensorHistory = (sensor: Sensor) => {
    const historicalHours = 6; // Last 6 hours
    const forecastHours = 6;   // Next 6 hours
    const data = [];
    const now = new Date();
    
    // Generate historical data (last 6 hours)
    for (let i = historicalHours; i >= 0; i--) {
      const timeDate = new Date(now.getTime() - i * 60 * 60 * 1000);
      const timeStr = timeDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
      const timestamp = i === 0 ? 'Now' : `-${i}h`;
      let value = 0;
      
      if (sensor.subType === 'CO2') {
        const base = sensor.status === 'warning' ? 850 : sensor.status === 'critical' ? 1300 : 420;
        value = base + (Math.random() * 50 - 25);
      } else if (sensor.subType === 'O2') {
        const base = sensor.status === 'warning' ? 19.2 : sensor.status === 'critical' ? 18.5 : 20.9;
        value = base + (Math.random() * 0.5 - 0.25);
      } else if (sensor.subType === 'CO') {
        const base = sensor.status === 'warning' ? 12 : sensor.status === 'critical' ? 40 : 2;
        value = base + (Math.random() * 3 - 1.5);
      } else if (sensor.subType === 'DP') {
        const base = sensor.status === 'warning' ? -12 : 8;
        value = base + (Math.random() * 4 - 2);
      }
      
      data.push({ 
        time: timestamp, 
        timeActual: timeStr,
        actual: Math.max(0, value), 
        predicted: null 
      });
    }
    
    // Generate forecast data (next 6 hours)
    const lastValue = data[data.length - 1].actual;
    for (let i = 1; i <= forecastHours; i++) {
      const timeDate = new Date(now.getTime() + i * 60 * 60 * 1000);
      const timeStr = timeDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
      const timestamp = `+${i}h`;
      let predictedValue = 0;
      
      // AI prediction logic - trend based on current status
      if (sensor.status === 'critical') {
        // Critical: predict gradual improvement if interventions taken
        predictedValue = lastValue - (i * 0.15 * lastValue);
      } else if (sensor.status === 'warning') {
        // Warning: predict stabilization
        const targetNormal = sensor.subType === 'CO2' ? 420 : sensor.subType === 'O2' ? 20.9 : sensor.subType === 'CO' ? 2 : 8;
        predictedValue = lastValue - ((lastValue - targetNormal) * i / forecastHours);
      } else {
        // Operational: predict slight variations
        predictedValue = lastValue + (Math.random() * 10 - 5);
      }
      
      data.push({ 
        time: timestamp, 
        timeActual: timeStr,
        actual: null, 
        predicted: Math.max(0, predictedValue) 
      });
    }
    
    return data;
  };

  // Helper function to generate temperature history for rooms
  const generateTemperatureHistory = (room: Room) => {
    const hours = 24;
    const data = [];
    
    for (let i = hours; i >= 0; i--) {
      const timestamp = `${i}h`;
      const base = room.temp || 21;
      const value = base + (Math.random() * 2 - 1);
      
      data.push({ time: timestamp, temp: value });
    }
    
    return data.reverse();
  };

  return (
    <div ref={containerRef} className="h-full w-full bg-gray-50 flex overflow-hidden">
      {/* Left Panel - Floor Plan */}
      <div 
        className="flex-shrink-0 bg-white overflow-auto"
        style={{ width: leftPanelWidth ? `${leftPanelWidth}px` : '50%' }}
      >
        <div className="p-6 pb-0">
          {/* Legend removed from here - now overlaid on image */}
        </div>

        {/* Facility Header Bar */}
        <div className="px-6 pb-3">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
            <span className="text-sm font-semibold text-gray-900">{t.bunkerAlpha7}</span>
            {emergencyMode ? (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-red-600">
                <div className="w-2 h-2 rounded-full bg-red-200 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase">{t.underAttack}</span>
              </div>
            ) : (
              <>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded border border-green-300">
                  {t.secure}
                </span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-medium rounded border border-orange-300">
                  1 {t.warning}
                </span>
              </>
            )}
          </div>
        </div>

        {/* SVG Floor Plan - Full Width */}
        <div 
          className="w-full overflow-hidden px-6 pb-6 relative flex items-center justify-center"
          style={{ cursor: zoom >= 1 ? 'grab' : 'default', minHeight: '600px', backgroundColor: emergencyMode ? '#fefafa' : '#fbfefb' }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
        >
          {/* Legend - Top Left Overlay */}
          <div className="absolute top-4 left-4 z-10 bg-white rounded shadow-lg border border-gray-900" style={{ fontSize: '8px' }}>
            <table className="border-collapse">
              <tbody>
                {/* Differential Pressure */}
                <tr className="border-b border-gray-900">
                  <td className="border-r border-gray-900 p-0.5 text-center">
                    <div className="w-3 h-2.5 bg-orange-500 border border-gray-900 rounded flex items-center justify-center mx-auto">
                      <span className="text-[6px] font-bold text-black leading-none">DP</span>
                    </div>
                  </td>
                  <td className="p-0.5 px-1">
                    <span className="text-[8px] font-medium text-gray-900 whitespace-nowrap">{t.differentialPressure}</span>
                  </td>
                </tr>
                
                {/* CBRN Detectors */}
                <tr className="border-b border-gray-900">
                  <td className="border-r border-gray-900 p-0.5 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      <div className="w-2.5 h-2.5 bg-purple-700 border border-gray-900 rounded flex items-center justify-center">
                        <span className="text-[6px] font-bold text-black leading-none">R</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-teal-600 border border-gray-900 rounded flex items-center justify-center">
                        <span className="text-[6px] font-bold text-black leading-none">B</span>
                      </div>
                      <div className="w-2.5 h-2.5 bg-yellow-600 border border-gray-900 rounded flex items-center justify-center">
                        <span className="text-[6px] font-bold text-black leading-none">C</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-0.5 px-1">
                    <span className="text-[8px] font-medium text-gray-900 whitespace-nowrap">{t.cbrnDetectors}</span>
                  </td>
                </tr>
                
                {/* CO2 Sensors */}
                <tr className="border-b border-gray-900">
                  <td className="border-r border-gray-900 p-0.5 text-center">
                    <div className="w-4 h-4 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-[6px] font-bold text-black leading-none">CO₂</span>
                    </div>
                  </td>
                  <td className="p-0.5 px-1">
                    <span className="text-[8px] font-medium text-gray-900 whitespace-nowrap">{t.co2Sensor}</span>
                  </td>
                </tr>
                
                {/* CO Sensors */}
                <tr className="border-b border-gray-900">
                  <td className="border-r border-gray-900 p-0.5 text-center">
                    <div className="w-4 h-4 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-[6px] font-bold text-black leading-none">CO</span>
                    </div>
                  </td>
                  <td className="p-0.5 px-1">
                    <span className="text-[8px] font-medium text-gray-900 whitespace-nowrap">{t.coSensor}</span>
                  </td>
                </tr>
                
                {/* O2 Sensors */}
                <tr className="border-b border-gray-900">
                  <td className="border-r border-gray-900 p-0.5 text-center">
                    <div className="w-4 h-4 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-[6px] font-bold text-black leading-none">O₂</span>
                    </div>
                  </td>
                  <td className="p-0.5 px-1">
                    <span className="text-[8px] font-medium text-gray-900 whitespace-nowrap">{t.o2Sensor}</span>
                  </td>
                </tr>
                
                {/* Door Status */}
                <tr>
                  <td className="border-r border-gray-900 p-0.5 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      <div className="px-0.5 py-0.5 bg-red-600 text-black text-[6px] font-bold rounded border border-gray-900 leading-none">
                        OFF
                      </div>
                      <div className="px-0.5 py-0.5 bg-green-600 text-black text-[6px] font-bold rounded border border-gray-900 leading-none">
                        ON
                      </div>
                    </div>
                  </td>
                  <td className="p-0.5 px-1">
                    <span className="text-[8px] font-medium text-gray-900 whitespace-nowrap">{t.doorStatus}</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
            <div className="w-px h-6 bg-gray-300 hidden" />
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 border rounded transition-colors hidden ${
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
              transform: `translate(${panX}px, ${panY + (isRightPanelCollapsed ? 250 : 0)}px) scale(${zoom}) rotate(-90deg)`,
              transformOrigin: 'center center',
              transition: isPanning ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            <img 
              src={floorPlanImage}
              alt="Floor Plan"
              className="h-auto"
              style={{ 
                width: `${leftPanelWidth ? (isRightPanelCollapsed ? 480 : Math.max(leftPanelWidth - 100, 1500)) : 480}px`, 
                height: 'auto', 
                display: 'block' 
              }}
            />
            
            {/* Grid Overlay */}
            {showGrid && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ 
                  width: `${leftPanelWidth ? (isRightPanelCollapsed ? 480 : Math.max(leftPanelWidth - 100, 1500)) : 480}px`,
                }}
              >
                {/* Vertical lines (columns) */}
                {Array.from({ length: 21 }).map((_, i) => (
                  <div
                    key={`col-${i}`}
                    className="absolute top-0 bottom-0 border-l border-blue-400/40"
                    style={{ left: `${(i * 5)}%` }}
                  >
                    {/* Column number at top */}
                    <div
                      className="absolute -top-6 left-0 transform -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg"
                      style={{ transform: 'rotate(90deg) translateY(-50%)' }}
                    >
                      {i}
                    </div>
                  </div>
                ))}
                
                {/* Horizontal lines (rows) */}
                {Array.from({ length: 21 }).map((_, i) => (
                  <div
                    key={`row-${i}`}
                    className="absolute left-0 right-0 border-t border-blue-400/40"
                    style={{ top: `${(i * 5)}%` }}
                  >
                    {/* Row number at left */}
                    <div
                      className="absolute top-0 -left-6 transform -translate-y-1/2 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg"
                      style={{ transform: 'rotate(90deg)' }}
                    >
                      {i}
                    </div>
                  </div>
                ))}
                
                {/* Grid Cell Numbers */}
                {Array.from({ length: 20 }).map((_, row) => (
                  Array.from({ length: 20 }).map((_, col) => (
                    <div
                      key={`cell-${col}-${row}`}
                      className="absolute flex items-center justify-center"
                      style={{ 
                        left: `${(col * 5) + 2.5}%`,
                        top: `${(row * 5) + 2.5}%`,
                        transform: 'translate(-50%, -50%) rotate(90deg)',
                      }}
                    >
                      <span className="text-[9px] font-bold text-blue-400/30 bg-white/40 px-1 rounded">
                        {col},{row}
                      </span>
                    </div>
                  ))
                ))}
              </div>
            )}
            
            {/* Command Center Warning Icon - Show in normal mode */}
            {!emergencyMode && (
              <div 
                className="absolute cursor-pointer" 
                style={{ left: '55%', top: '49%', transform: 'rotate(90deg)' }}
                onClick={() => {
                  setSelectedIncident('inc-011');
                  setSelectedSensor(null);
                  setSelectedRoom(null);
                  // Expand the right panel if collapsed
                  if (isRightPanelCollapsed && containerRef.current) {
                    setLeftPanelWidth(containerRef.current.offsetWidth / 2);
                    setPanX(0);
                    setPanY(-100);
                    setZoom(1.0);
                    setIsRightPanelCollapsed(false);
                  }
                }}
                onMouseEnter={(e) => {
                  setHoveredFloorSensor({
                    id: 'command-center-warning',
                    name: 'Command Center',
                    status: 'warning',
                    value: 'Warning Active',
                    type: 'room'
                  });
                }}
                onMouseLeave={() => setHoveredFloorSensor(null)}
              >
                <div className="relative">
                  <AlertTriangle className="w-6 h-6 text-orange-500 fill-orange-100 drop-shadow-lg animate-pulse hover:scale-110 transition-transform" />
                  
                  {SHOW_INLINE_TOOLTIPS && hoveredFloorSensor?.id === 'command-center-warning' && (
                    <div 
                      className="absolute pointer-events-none whitespace-nowrap"
                      style={{ 
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginBottom: '12px',
                        zIndex: 99999
                      }}
                    >
                      <div style={{
                        backgroundColor: '#ffffff',
                        border: '1.5px solid #f97316',
                        borderRadius: '6px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        fontSize: '11px',
                        padding: '8px 12px',
                        color: '#1e293b',
                        fontWeight: 600
                      }}>
                        <div style={{ marginBottom: '4px', color: '#f97316' }}>⚠️ Command Center Alert</div>
                        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>
                          Equipment Alert
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Red Alert Indicators - Only show in emergency mode */}
            {emergencyMode && (
              <>
                {/* Alert 1 - Room Area 1 */}
                <div 
                  className="absolute" 
                  style={{ left: '67%', top: '46%', transform: 'rotate(90deg)', pointerEvents: 'none' }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                      <AlertCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>

                {/* Alert 2 - Room Area 2 (nearby) */}
                <div 
                  className="absolute" 
                  style={{ left: '72%', top: '49%', transform: 'rotate(90deg)', pointerEvents: 'none' }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                      <AlertCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>

                {/* Alert 3 - Room Area 3 (nearby) */}
                <div 
                  className="absolute" 
                  style={{ left: '76%', top: '46.5%', transform: 'rotate(90deg)', pointerEvents: 'none' }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                      <AlertCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Sensor Overlays - rotated with image */}
            {/* Top section - Sensors 3 */}
            <div 
              className="absolute" 
              style={{ left: '65%', top: '48%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>65%,48%</div>
              <div className="flex flex-col items-center gap-px">
                <div className="flex items-center gap-0">
                  {/* CO₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-3-co2', 
                      name: 'CO₂ Sensor 3', 
                      status: 'operational', 
                      value: '420 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO2-3', 
                      name: 'CO₂ Sensor 3', 
                      type: 'air-quality', 
                      subType: 'CO2', 
                      status: 'operational', 
                      value: '420 ppm', 
                      x: 65, 
                      y: 48,
                      lastUpdate: '2s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO₂</span>
                    
                    {SHOW_INLINE_TOOLTIPS && hoveredFloorSensor?.id === 'sensors-3-co2' && (
                      <div 
                        className="absolute pointer-events-none whitespace-nowrap animate-in fade-in duration-200"
                        style={{ 
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginBottom: `${16 / zoom}px`,
                          zIndex: 99999
                        }}
                      >
                        <div
                          className="bg-white rounded-lg shadow-2xl border-2 border-blue-500"
                          style={{
                            fontSize: `${13 / zoom}px`,
                            padding: `${12 / zoom}px ${16 / zoom}px`,
                            minWidth: `${180 / zoom}px`
                          }}
                        >
                          <div style={{ fontWeight: 700, marginBottom: `${8 / zoom}px`, color: '#1e293b', fontSize: `${14 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: `${8 / zoom}px`, marginBottom: `${6 / zoom}px` }}>
                            <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                            <span style={{ 
                              padding: `${3 / zoom}px ${8 / zoom}px`, 
                              borderRadius: `${6 / zoom}px`,
                              fontWeight: 600,
                              fontSize: `${11 / zoom}px`,
                              backgroundColor: '#16a34a',
                              color: 'white'
                            }}>
                              OPERATIONAL
                            </span>
                          </div>
                          <div style={{ color: '#334155', fontWeight: 500 }}>
                            <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                          </div>
                        </div>
                        {/* Arrow pointing down */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: `${-6 / zoom}px`,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: `${6 / zoom}px solid transparent`,
                            borderRight: `${6 / zoom}px solid transparent`,
                            borderTop: `${6 / zoom}px solid #3b82f6`
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* CO Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-3-co', 
                      name: 'CO Sensor 3', 
                      status: 'operational', 
                      value: '2 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO-3', 
                      name: 'CO Sensor 3', 
                      type: 'air-quality', 
                      subType: 'CO', 
                      status: 'operational', 
                      value: '2 ppm', 
                      x: 65, 
                      y: 48,
                      lastUpdate: '2s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-3-co' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* O₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-3-o2', 
                      name: 'O₂ Sensor 3', 
                      status: 'operational', 
                      value: '20.9%',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-O2-3', 
                      name: 'O₂ Sensor 3', 
                      type: 'air-quality', 
                      subType: 'O2', 
                      status: 'operational', 
                      value: '20.9%', 
                      x: 65, 
                      y: 48,
                      lastUpdate: '1s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>O₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-3-o2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Sensors 3</span>
              </div>
            </div>
            
            {/* Bottom section - Sensors 2 */}
            <div 
              className="absolute" 
              style={{ left: '80%', top: '48%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>80%,48%</div>
              <div className="flex flex-col items-center gap-px">
                <div className="flex items-center gap-0">
                  {/* CO₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-2-co2', 
                      name: 'CO₂ Sensor 2', 
                      status: 'operational', 
                      value: '430 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO2-2', 
                      name: 'CO₂ Sensor 2', 
                      type: 'air-quality', 
                      subType: 'CO2', 
                      status: 'operational', 
                      value: '430 ppm', 
                      x: 80, 
                      y: 48,
                      lastUpdate: '3s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-2-co2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* CO Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-2-co', 
                      name: 'CO Sensor 2', 
                      status: 'operational', 
                      value: '1 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO-2', 
                      name: 'CO Sensor 2', 
                      type: 'air-quality', 
                      subType: 'CO', 
                      status: 'operational', 
                      value: '1 ppm', 
                      x: 80, 
                      y: 48,
                      lastUpdate: '4s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-2-co' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* O₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-2-o2', 
                      name: 'O₂ Sensor 2', 
                      status: 'operational', 
                      value: '21.0%',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-O2-2', 
                      name: 'O₂ Sensor 2', 
                      type: 'air-quality', 
                      subType: 'O2', 
                      status: 'operational', 
                      value: '21.0%', 
                      x: 80, 
                      y: 48,
                      lastUpdate: '2s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>O₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-2-o2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Sensors 2</span>
              </div>
            </div>

            {/* Sensor Group at 16,11 - Sensors 4 */}
            <div 
              className="absolute" 
              style={{ left: '82%', top: '57%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>82%,57%</div>
              <div className="flex flex-col items-center gap-px">
                <div className="flex items-center gap-0">
                  {/* CO₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-4-co2', 
                      name: 'CO₂ Sensor 4', 
                      status: 'operational', 
                      value: '415 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO2-4', 
                      name: 'CO₂ Sensor 4', 
                      type: 'air-quality', 
                      subType: 'CO2', 
                      status: 'operational', 
                      value: '415 ppm', 
                      x: 80, 
                      y: 55,
                      lastUpdate: '3s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-4-co2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* CO Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-4-co', 
                      name: 'CO Sensor 4', 
                      status: 'operational', 
                      value: '1 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO-4', 
                      name: 'CO Sensor 4', 
                      type: 'air-quality', 
                      subType: 'CO', 
                      status: 'operational', 
                      value: '1 ppm', 
                      x: 80, 
                      y: 55,
                      lastUpdate: '3s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-4-co' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* O₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-4-o2', 
                      name: 'O₂ Sensor 4', 
                      status: 'operational', 
                      value: '20.8%',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-O2-4', 
                      name: 'O₂ Sensor 4', 
                      type: 'air-quality', 
                      subType: 'O2', 
                      status: 'operational', 
                      value: '20.8%', 
                      x: 80, 
                      y: 55,
                      lastUpdate: '2s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>O₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-4-o2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Sensors 4</span>
              </div>
            </div>

            {/* Sensor Group at 16,12 - Sensors 5 */}
            <div 
              className="absolute" 
              style={{ left: '82%', top: '64%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>82%,64%</div>
              <div className="flex flex-col items-center gap-px">
                <div className="flex items-center gap-0">
                  {/* CO₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-5-co2', 
                      name: 'CO₂ Sensor 5', 
                      status: 'operational', 
                      value: '410 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO2-5', 
                      name: 'CO₂ Sensor 5', 
                      type: 'air-quality', 
                      subType: 'CO2', 
                      status: 'operational', 
                      value: '410 ppm', 
                      x: 80, 
                      y: 60,
                      lastUpdate: '4s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-5-co2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* CO Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-5-co', 
                      name: 'CO Sensor 5', 
                      status: 'operational', 
                      value: '2 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO-5', 
                      name: 'CO Sensor 5', 
                      type: 'air-quality', 
                      subType: 'CO', 
                      status: 'operational', 
                      value: '2 ppm', 
                      x: 80, 
                      y: 60,
                      lastUpdate: '4s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-5-co' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* O₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-5-o2', 
                      name: 'O₂ Sensor 5', 
                      status: 'operational', 
                      value: '21.0%',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-O2-5', 
                      name: 'O₂ Sensor 5', 
                      type: 'air-quality', 
                      subType: 'O2', 
                      status: 'operational', 
                      value: '21.0%', 
                      x: 80, 
                      y: 60,
                      lastUpdate: '3s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>O₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-5-o2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Sensors 5</span>
              </div>
            </div>

            {/* Sensor Group at 10,11 - Sensors 6 */}
            <div 
              className="absolute" 
              style={{ left: '50%', top: '55%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>50%,55%</div>
              <div className="flex flex-col items-center gap-px">
                <div className="flex items-center gap-0">
                  {/* CO₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-6-co2', 
                      name: 'CO₂ Sensor 6', 
                      status: 'operational', 
                      value: '418 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO2-6', 
                      name: 'CO₂ Sensor 6', 
                      type: 'air-quality', 
                      subType: 'CO2', 
                      status: 'operational', 
                      value: '418 ppm', 
                      x: 50, 
                      y: 55,
                      lastUpdate: '2s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-6-co2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* CO Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-6-co', 
                      name: 'CO Sensor 6', 
                      status: 'operational', 
                      value: '1 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO-6', 
                      name: 'CO Sensor 6', 
                      type: 'air-quality', 
                      subType: 'CO', 
                      status: 'operational', 
                      value: '1 ppm', 
                      x: 50, 
                      y: 55,
                      lastUpdate: '2s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-6-co' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* O₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-6-o2', 
                      name: 'O₂ Sensor 6', 
                      status: 'operational', 
                      value: '20.9%',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-O2-6', 
                      name: 'O₂ Sensor 6', 
                      type: 'air-quality', 
                      subType: 'O2', 
                      status: 'operational', 
                      value: '20.9%', 
                      x: 50, 
                      y: 55,
                      lastUpdate: '1s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>O₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-6-o2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Sensors 6</span>
              </div>
            </div>

            {/* Sensor Group at 10,12 - Sensors 7 */}
            <div 
              className="absolute" 
              style={{ left: '50%', top: '62%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>50%,62%</div>
              <div className="flex flex-col items-center gap-px">
                <div className="flex items-center gap-0">
                  {/* CO₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-7-co2', 
                      name: 'CO₂ Sensor 7', 
                      status: 'operational', 
                      value: '422 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO2-7', 
                      name: 'CO₂ Sensor 7', 
                      type: 'air-quality', 
                      subType: 'CO2', 
                      status: 'operational', 
                      value: '422 ppm', 
                      x: 50, 
                      y: 60,
                      lastUpdate: '3s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-7-co2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* CO Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-7-co', 
                      name: 'CO Sensor 7', 
                      status: 'operational', 
                      value: '2 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO-7', 
                      name: 'CO Sensor 7', 
                      type: 'air-quality', 
                      subType: 'CO', 
                      status: 'operational', 
                      value: '2 ppm', 
                      x: 50, 
                      y: 60,
                      lastUpdate: '3s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-7-co' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* O₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-7-o2', 
                      name: 'O₂ Sensor 7', 
                      status: 'operational', 
                      value: '20.7%',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-O2-7', 
                      name: 'O₂ Sensor 7', 
                      type: 'air-quality', 
                      subType: 'O2', 
                      status: 'operational', 
                      value: '20.7%', 
                      x: 50, 
                      y: 60,
                      lastUpdate: '2s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>O₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-7-o2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Sensors 7</span>
              </div>
            </div>

            {/* Sensor Group at 9,7 - Sensors 8 */}
            <div 
              className="absolute" 
              style={{ left: '45%', top: '35%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>45%,35%</div>
              <div className="flex flex-col items-center gap-px">
                <div className="flex items-center gap-0">
                  {/* CO₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-8-co2', 
                      name: 'CO₂ Sensor 8', 
                      status: 'operational', 
                      value: '412 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO2-8', 
                      name: 'CO₂ Sensor 8', 
                      type: 'air-quality', 
                      subType: 'CO2', 
                      status: 'operational', 
                      value: '412 ppm', 
                      x: 45, 
                      y: 35,
                      lastUpdate: '1s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-8-co2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* CO Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-8-co', 
                      name: 'CO Sensor 8', 
                      status: 'operational', 
                      value: '1 ppm',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-CO-8', 
                      name: 'CO Sensor 8', 
                      type: 'air-quality', 
                      subType: 'CO', 
                      status: 'operational', 
                      value: '1 ppm', 
                      x: 45, 
                      y: 35,
                      lastUpdate: '1s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>CO</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-8-co' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* O₂ Sensor */}
                  <div 
                    className="w-1.5 h-1.5 bg-green-600 border border-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                      id: 'sensors-8-o2', 
                      name: 'O₂ Sensor 8', 
                      status: 'operational', 
                      value: '21.0%',
                      type: 'air-quality'
                    })}
                    onMouseLeave={() => setHoveredFloorSensor(null)}
                    onClick={() => handleSensorClick({ 
                      id: 'S-F2-FLOOR-O2-8', 
                      name: 'O₂ Sensor 8', 
                      type: 'air-quality', 
                      subType: 'O2', 
                      status: 'operational', 
                      value: '21.0%', 
                      x: 45, 
                      y: 35,
                      lastUpdate: '2s ago'
                    })}
                  >
                    <span className="text-[2px] text-gray-900 leading-none font-bold" style={{ transform: 'translateY(0.3px)' }}>O₂</span>
                    
                    {hoveredFloorSensor?.id === 'sensors-8-o2' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Sensors 8</span>
              </div>
            </div>

            {/* CBRNE Detector Group at 11,11 - CBRNE 1 */}
            <div 
              className="absolute" 
              style={{ left: '55%', top: '58.2%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>55%,58.2%</div>
              <div className="flex flex-col gap-0">
                {/* R1 - Radiological Detector */}
                <div 
                  className="w-1 h-1 bg-purple-700 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                    onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-1-r', 
                    name: 'Radiological Detector (R1)', 
                    status: 'operational', 
                    value: 'Normal - No radiation detected',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-R1-2', 
                    name: 'Radiological Detector (R1)', 
                    type: 'chemical', 
                    subType: 'R', 
                    status: 'operational', 
                    value: 'Normal', 
                    x: 55, 
                    y: 55,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">R1</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-1-r' && (
                      <div 
                        className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 99999,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 600,
                            fontSize: `${11 / zoom}px`,
                            backgroundColor: '#16a34a',
                            color: 'white'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#334155', fontWeight: 500 }}>
                          <span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>
                        </div>
                      </div>
                    )}
                </div>
                
                {/* B1 - Biological Detector */}
                <div 
                  className="w-1 h-1 bg-teal-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-1-b', 
                    name: 'Biological Detector (B1)', 
                    status: 'operational', 
                    value: 'Clear - No biological threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-B1-2', 
                    name: 'Biological Detector (B1)', 
                    type: 'chemical', 
                    subType: 'B', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 55, 
                    y: 55,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">B1</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-1-b' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* C1 - Chemical Detector */}
                <div 
                  className="w-1 h-1 bg-yellow-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-1-c', 
                    name: 'Chemical Detector (C1)', 
                    status: 'operational', 
                    value: 'Clear - No chemical threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-C1-2', 
                    name: 'Chemical Detector (C1)', 
                    type: 'chemical', 
                    subType: 'C', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 55, 
                    y: 55,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">C1</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-1-c' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CBRNE Detector Group at 11,12 - CBRNE 2 */}
            <div 
              className="absolute" 
              style={{ left: '55%', top: '65.5%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>55%,65.5%</div>
              <div className="flex flex-col gap-0">
                {/* R2 - Radiological Detector */}
                <div 
                  className="w-1 h-1 bg-purple-700 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-2-r', 
                    name: 'Radiological Detector (R2)', 
                    status: 'operational', 
                    value: 'Normal - No radiation detected',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-R2-2', 
                    name: 'Radiological Detector (R2)', 
                    type: 'chemical', 
                    subType: 'R', 
                    status: 'operational', 
                    value: 'Normal', 
                    x: 55, 
                    y: 60,
                    lastUpdate: '2s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">R2</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-2-r' && (
                      <div 
                        className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                        style={{ 
                          left: '100%',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginLeft: `${8 / zoom}px`,
                          fontSize: `${10 / zoom}px`,
                          padding: `${8 / zoom}px ${12 / zoom}px`,
                          zIndex: 1000,
                          backgroundColor: 'rgb(15, 23, 42)'
                        }}
                      >
                        <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                          <span style={{ color: '#9ca3af' }}>Status:</span>
                          <span style={{ 
                            padding: `${2 / zoom}px ${6 / zoom}px`, 
                            borderRadius: `${4 / zoom}px`,
                            fontWeight: 'bold',
                            backgroundColor: '#16a34a'
                          }}>
                            OPERATIONAL
                          </span>
                        </div>
                        <div style={{ color: '#d1d5db' }}>
                          <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                        </div>
                      </div>
                    )}
                </div>
                
                {/* B2 - Biological Detector */}
                <div 
                  className="w-1 h-1 bg-teal-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-2-b', 
                    name: 'Biological Detector (B2)', 
                    status: 'operational', 
                    value: 'Clear - No biological threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-B2-2', 
                    name: 'Biological Detector (B2)', 
                    type: 'chemical', 
                    subType: 'B', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 55, 
                    y: 60,
                    lastUpdate: '2s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">B2</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-2-b' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* C2 - Chemical Detector */}
                <div 
                  className="w-1 h-1 bg-yellow-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-2-c', 
                    name: 'Chemical Detector (C2)', 
                    status: 'operational', 
                    value: 'Clear - No chemical threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-C2-2', 
                    name: 'Chemical Detector (C2)', 
                    type: 'chemical', 
                    subType: 'C', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 55, 
                    y: 60,
                    lastUpdate: '2s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">C2</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-2-c' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CBRNE Detector Group at 14,11 - CBRNE 3 */}
            <div 
              className="absolute" 
              style={{ left: '70%', top: '52.5%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>70%,52.5%</div>
              <div className="flex flex-col gap-0">
                {/* R3 - Radiological Detector */}
                <div 
                  className="w-1 h-1 bg-purple-700 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-3-r', 
                    name: 'Radiological Detector (R3)', 
                    status: 'operational', 
                    value: 'Normal - No radiation detected',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-R3', 
                    name: 'Radiological Detector (R3)', 
                    type: 'chemical', 
                    subType: 'R', 
                    status: 'operational', 
                    value: 'Normal', 
                    x: 70, 
                    y: 55,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">R3</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-3-r' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* B3 - Biological Detector */}
                <div 
                  className="w-1 h-1 bg-teal-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-3-b', 
                    name: 'Biological Detector (B3)', 
                    status: 'operational', 
                    value: 'Clear - No biological threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-B3', 
                    name: 'Biological Detector (B3)', 
                    type: 'chemical', 
                    subType: 'B', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 70, 
                    y: 55,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">B3</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-3-b' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* C3 - Chemical Detector */}
                <div 
                  className="w-1 h-1 bg-yellow-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-3-c', 
                    name: 'Chemical Detector (C3)', 
                    status: 'operational', 
                    value: 'Clear - No chemical threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-C3', 
                    name: 'Chemical Detector (C3)', 
                    type: 'chemical', 
                    subType: 'C', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 70, 
                    y: 55,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">C3</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-3-c' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CBRNE Detector Group at 13,15 - CBRNE 4 */}
            <div 
              className="absolute" 
              style={{ left: '66.5%', top: '75%', transform: 'rotate(0deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(0deg)', whiteSpace: 'nowrap' }}>66.5%,75%</div>
              <div className="flex flex-col gap-0">
                {/* R4 - Radiological Detector */}
                <div 
                  className="w-1 h-1 bg-purple-700 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-4-r', 
                    name: 'Radiological Detector (R4)', 
                    status: 'operational', 
                    value: 'Normal - No radiation detected',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-R4', 
                    name: 'Radiological Detector (R4)', 
                    type: 'chemical', 
                    subType: 'R', 
                    status: 'operational', 
                    value: 'Normal', 
                    x: 65, 
                    y: 75,
                    lastUpdate: '3s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">R4</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-4-r' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* B4 - Biological Detector */}
                <div 
                  className="w-1 h-1 bg-teal-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-4-b', 
                    name: 'Biological Detector (B4)', 
                    status: 'operational', 
                    value: 'Clear - No biological threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-B4', 
                    name: 'Biological Detector (B4)', 
                    type: 'chemical', 
                    subType: 'B', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 65, 
                    y: 75,
                    lastUpdate: '3s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">B4</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-4-b' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* C4 - Chemical Detector */}
                <div 
                  className="w-1 h-1 bg-yellow-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-4-c', 
                    name: 'Chemical Detector (C4)', 
                    status: 'operational', 
                    value: 'Clear - No chemical threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-C4', 
                    name: 'Chemical Detector (C4)', 
                    type: 'chemical', 
                    subType: 'C', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 65, 
                    y: 75,
                    lastUpdate: '3s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">C4</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-4-c' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CBRNE Detector Group at 2,12 - CBRNE 5 */}
            <div 
              className="absolute" 
              style={{ left: '13%', top: '61%', transform: 'rotate(90deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>13%,61%</div>
              <div className="flex flex-col gap-0">
                {/* R5 - Radiological Detector */}
                <div 
                  className="w-1 h-1 bg-purple-700 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-5-r', 
                    name: 'Radiological Detector (R5)', 
                    status: 'operational', 
                    value: 'Normal - No radiation detected',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-R5', 
                    name: 'Radiological Detector (R5)', 
                    type: 'chemical', 
                    subType: 'R', 
                    status: 'operational', 
                    value: 'Normal', 
                    x: 10, 
                    y: 60,
                    lastUpdate: '2s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">R5</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-5-r' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* B5 - Biological Detector */}
                <div 
                  className="w-1 h-1 bg-teal-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-5-b', 
                    name: 'Biological Detector (B5)', 
                    status: 'operational', 
                    value: 'Clear - No biological threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-B5', 
                    name: 'Biological Detector (B5)', 
                    type: 'chemical', 
                    subType: 'B', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 10, 
                    y: 60,
                    lastUpdate: '2s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">B5</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-5-b' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* C5 - Chemical Detector */}
                <div 
                  className="w-1 h-1 bg-yellow-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-5-c', 
                    name: 'Chemical Detector (C5)', 
                    status: 'operational', 
                    value: 'Clear - No chemical threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-C5', 
                    name: 'Chemical Detector (C5)', 
                    type: 'chemical', 
                    subType: 'C', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 10, 
                    y: 60,
                    lastUpdate: '2s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">C5</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-5-c' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CBRNE Detector Group at 8,5 - CBRNE 6 */}
            <div 
              className="absolute" 
              style={{ left: '43.5%', top: '25%', transform: 'rotate(180deg)' }}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>43.5%,25%</div>
              <div className="flex flex-col gap-0">
                {/* R6 - Radiological Detector */}
                <div 
                  className="w-1 h-1 bg-purple-700 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-6-r', 
                    name: 'Radiological Detector (R6)', 
                    status: 'operational', 
                    value: 'Normal - No radiation detected',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-R6', 
                    name: 'Radiological Detector (R6)', 
                    type: 'chemical', 
                    subType: 'R', 
                    status: 'operational', 
                    value: 'Normal', 
                    x: 40, 
                    y: 25,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">R6</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-6-r' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* B6 - Biological Detector */}
                <div 
                  className="w-1 h-1 bg-teal-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-6-b', 
                    name: 'Biological Detector (B6)', 
                    status: 'operational', 
                    value: 'Clear - No biological threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-B6', 
                    name: 'Biological Detector (B6)', 
                    type: 'chemical', 
                    subType: 'B', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 40, 
                    y: 25,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">B6</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-6-b' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* C6 - Chemical Detector */}
                <div 
                  className="w-1 h-1 bg-yellow-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbrne-6-c', 
                    name: 'Chemical Detector (C6)', 
                    status: 'operational', 
                    value: 'Clear - No chemical threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-C6', 
                    name: 'Chemical Detector (C6)', 
                    type: 'chemical', 
                    subType: 'C', 
                    status: 'operational', 
                    value: 'Clear', 
                    x: 40, 
                    y: 25,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">C6</span>
                  
                  {hoveredFloorSensor?.id === 'cbrne-6-c' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Switch 3 - Left side corridor */}
            <div 
              className="absolute" 
              style={{ left: '71.5%', top: '45.5%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'switch-3', 
                  name: 'Switch 3 (Door Control)', 
                  status: 'operational', 
                  value: 'Door OPEN',
                  type: 'door'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>71.5%,45.5%</div>
              <div className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity relative">
                <div className="flex flex-col gap-0">
                  <div className="w-1 h-1 bg-red-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">OFF</span>
                  </div>
                  <div className="w-1 h-1 bg-green-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">ON</span>
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Switch 3</span>
                
                {/* Tooltip for Switch 3 */}
                {hoveredFloorSensor?.id === 'switch-3' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Switch 4 - Position 12,13 */}
            <div 
              className="absolute" 
              style={{ left: '60%', top: '70%', transform: 'rotate(0deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'switch-4', 
                  name: 'Switch 4 (Door Control)', 
                  status: 'operational', 
                  value: 'Door OPEN',
                  type: 'door'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', whiteSpace: 'nowrap' }}>60%,70%</div>
              <div className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity relative">
                <div className="flex flex-col gap-0">
                  <div className="w-1 h-1 bg-red-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">OFF</span>
                  </div>
                  <div className="w-1 h-1 bg-green-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">ON</span>
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Switch 4</span>
                
                {/* Tooltip for Switch 4 */}
                {hoveredFloorSensor?.id === 'switch-4' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Switch 5 - Position 12,15 */}
            <div 
              className="absolute" 
              style={{ left: '60%', top: '79%', transform: 'rotate(0deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'switch-5', 
                  name: 'Switch 5 (Door Control)', 
                  status: 'operational', 
                  value: 'Door OPEN',
                  type: 'door'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-12px', left: '0', whiteSpace: 'nowrap' }}>60%,79%</div>
              <div className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity relative">
                <div className="flex flex-col gap-0">
                  <div className="w-1 h-1 bg-red-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">OFF</span>
                  </div>
                  <div className="w-1 h-1 bg-green-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">ON</span>
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Switch 5</span>
                
                {/* Tooltip for Switch 5 */}
                {hoveredFloorSensor?.id === 'switch-5' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Switch 6 - Position 9,4 */}
            <div 
              className="absolute" 
              style={{ left: '48%', top: '23.5%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'switch-6', 
                  name: 'Switch 6 (Door Control)', 
                  status: 'operational', 
                  value: 'Door OPEN',
                  type: 'door'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>48%,23.5%</div>
              <div className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity relative">
                <div className="flex flex-col gap-0">
                  <div className="w-1 h-1 bg-red-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">OFF</span>
                  </div>
                  <div className="w-1 h-1 bg-green-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">ON</span>
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Switch 6</span>
                
                {hoveredFloorSensor?.id === 'switch-6' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Switch 7 - Position 9,6 */}
            <div 
              className="absolute" 
              style={{ left: '48%', top: '32.5%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'switch-7', 
                  name: 'Switch 7 (Door Control)', 
                  status: 'operational', 
                  value: 'Door OPEN',
                  type: 'door'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>48%,32.5%</div>
              <div className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity relative">
                <div className="flex flex-col gap-0">
                  <div className="w-1 h-1 bg-red-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">OFF</span>
                  </div>
                  <div className="w-1 h-1 bg-green-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">ON</span>
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Switch 7</span>
                
                {hoveredFloorSensor?.id === 'switch-7' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Switch 8 - Position 8,9 */}
            <div 
              className="absolute" 
              style={{ left: '40%', top: '45.5%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'switch-8', 
                  name: 'Switch 8 (Door Control)', 
                  status: 'operational', 
                  value: 'Door OPEN',
                  type: 'door'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>40%,45.5%</div>
              <div className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity relative">
                <div className="flex flex-col gap-0">
                  <div className="w-1 h-1 bg-red-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">OFF</span>
                  </div>
                  <div className="w-1 h-1 bg-green-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">ON</span>
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Switch 8</span>
                
                {hoveredFloorSensor?.id === 'switch-8' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Switch 9 - Position 7,9 */}
            <div 
              className="absolute" 
              style={{ left: '29.5%', top: '45.5%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'switch-9', 
                  name: 'Switch 9 (Door Control)', 
                  status: 'operational', 
                  value: 'Door OPEN',
                  type: 'door'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>29.5%,45.5%</div>
              <div className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity relative">
                <div className="flex flex-col gap-0">
                  <div className="w-1 h-1 bg-red-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">OFF</span>
                  </div>
                  <div className="w-1 h-1 bg-green-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">ON</span>
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Switch 9</span>
                
                {hoveredFloorSensor?.id === 'switch-9' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Switch 10 - Position 6,9 */}
            <div 
              className="absolute" 
              style={{ left: '18.5%', top: '45.5%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'switch-10', 
                  name: 'Switch 10 (Door Control)', 
                  status: 'operational', 
                  value: 'Door OPEN',
                  type: 'door'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>18.5%,45.5%</div>
              <div className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity relative">
                <div className="flex flex-col gap-0">
                  <div className="w-1 h-1 bg-red-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">OFF</span>
                  </div>
                  <div className="w-1 h-1 bg-green-600 border border-gray-900 flex items-center justify-center">
                    <span className="text-[2px] font-bold text-black leading-none">ON</span>
                  </div>
                </div>
                <span className="text-[3px] text-gray-900 px-0.5 rounded whitespace-nowrap">Switch 10</span>
                
                {hoveredFloorSensor?.id === 'switch-10' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Differential Pressure Sensor 1 - Position 13,15 */}
            <div 
              className="absolute" 
              style={{ left: '66%', top: '79%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'dp-1', 
                  name: 'Differential Pressure Sensor (DP1)', 
                  status: 'operational', 
                  value: '+3.2 Pa',
                  type: 'pressure'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
              onClick={() => handleSensorClick({ 
                id: 'S-F2-FLOOR-DP1', 
                name: 'Differential Pressure Sensor (DP1)', 
                type: 'pressure', 
                subType: 'DP', 
                status: 'operational', 
                value: '+3.2 Pa', 
                x: 66, 
                y: 79,
                lastUpdate: '1s ago'
              })}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>66%,79%</div>
              <div className="w-1.5 h-1 bg-orange-500 border border-gray-900 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative">
                <span className="text-[2px] font-bold text-black leading-none">DP1</span>
                
                {hoveredFloorSensor?.id === 'dp-1' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Differential Pressure Sensor 2 - Position 13,13 */}
            <div 
              className="absolute" 
              style={{ left: '66%', top: '70%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'dp-2', 
                  name: 'Differential Pressure Sensor (DP2)', 
                  status: 'operational', 
                  value: '+2.8 Pa',
                  type: 'pressure'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
              onClick={() => handleSensorClick({ 
                id: 'S-F2-FLOOR-DP2', 
                name: 'Differential Pressure Sensor (DP2)', 
                type: 'pressure', 
                subType: 'DP', 
                status: 'operational', 
                value: '+2.8 Pa', 
                x: 66, 
                y: 70,
                lastUpdate: '1s ago'
              })}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>66%,70%</div>
              <div className="w-1.5 h-1 bg-orange-500 border border-gray-900 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative">
                <span className="text-[2px] font-bold text-black leading-none">DP2</span>
                
                {hoveredFloorSensor?.id === 'dp-2' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Differential Pressure Sensor 3 - Position 6,10 */}
            <div 
              className="absolute" 
              style={{ left: '31.5%', top: '47%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'dp-3', 
                  name: 'Differential Pressure Sensor (DP3)', 
                  status: 'operational', 
                  value: '+4.1 Pa',
                  type: 'pressure'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
              onClick={() => handleSensorClick({ 
                id: 'S-F2-FLOOR-DP3', 
                name: 'Differential Pressure Sensor (DP3)', 
                type: 'pressure', 
                subType: 'DP', 
                status: 'operational', 
                value: '+4.1 Pa', 
                x: 31.5, 
                y: 47,
                lastUpdate: '1s ago'
              })}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>31.5%,47%</div>
              <div className="w-1.5 h-1 bg-orange-500 border border-gray-900 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative">
                <span className="text-[2px] font-bold text-black leading-none">DP3</span>
                
                {hoveredFloorSensor?.id === 'dp-3' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Differential Pressure Sensor 4 - Position 5,10 */}
            <div 
              className="absolute" 
              style={{ left: '20.5%', top: '47%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'dp-4', 
                  name: 'Differential Pressure Sensor (DP4)', 
                  status: 'operational', 
                  value: '+3.5 Pa',
                  type: 'pressure'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
              onClick={() => handleSensorClick({ 
                id: 'S-F2-FLOOR-DP4', 
                name: 'Differential Pressure Sensor (DP4)', 
                type: 'pressure', 
                subType: 'DP', 
                status: 'operational', 
                value: '+3.5 Pa', 
                x: 25, 
                y: 50,
                lastUpdate: '1s ago'
              })}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>20.5%,47%</div>
              <div className="w-1.5 h-1 bg-orange-500 border border-gray-900 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative">
                <span className="text-[2px] font-bold text-black leading-none">DP4</span>
                
                {hoveredFloorSensor?.id === 'dp-4' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Differential Pressure Sensor 5 - Position 8,6 */}
            <div 
              className="absolute" 
              style={{ left: '43.5%', top: '32%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'dp-5', 
                  name: 'Differential Pressure Sensor (DP5)', 
                  status: 'operational', 
                  value: '+2.9 Pa',
                  type: 'pressure'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
              onClick={() => handleSensorClick({ 
                id: 'S-F2-FLOOR-DP5', 
                name: 'Differential Pressure Sensor (DP5)', 
                type: 'pressure', 
                subType: 'DP', 
                status: 'operational', 
                value: '+2.9 Pa', 
                x: 43.5, 
                y: 32,
                lastUpdate: '1s ago'
              })}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>43.5%,32%</div>
              <div className="w-1.5 h-1 bg-orange-500 border border-gray-900 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative">
                <span className="text-[2px] font-bold text-black leading-none">DP5</span>
                
                {hoveredFloorSensor?.id === 'dp-5' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* Differential Pressure Sensor 6 - Position 8,4 */}
            <div 
              className="absolute" 
              style={{ left: '43.5%', top: '22.5%', transform: 'rotate(90deg)' }}
              onMouseEnter={(e) => {
                setHoveredFloorSensor({ 
                  id: 'dp-6', 
                  name: 'Differential Pressure Sensor (DP6)', 
                  status: 'operational', 
                  value: '+3.7 Pa',
                  type: 'pressure'
                });
                setTooltipPosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredFloorSensor(null)}
              onClick={() => handleSensorClick({ 
                id: 'S-F2-FLOOR-DP6', 
                name: 'Differential Pressure Sensor (DP6)', 
                type: 'pressure', 
                subType: 'DP', 
                status: 'operational', 
                value: '+3.7 Pa', 
                x: 43.5, 
                y: 22.5,
                lastUpdate: '1s ago'
              })}
            >
              <div className="text-[6px] text-red-500 font-bold absolute hidden" style={{ top: '-10px', left: '0', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>43.5%,22.5%</div>
              <div className="w-1.5 h-1 bg-orange-500 border border-gray-900 rounded-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative">
                <span className="text-[2px] font-bold text-black leading-none">DP6</span>
                
                {hoveredFloorSensor?.id === 'dp-6' && (
                  <div 
                    className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                    style={{ 
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: `${8 / zoom}px`,
                      fontSize: `${10 / zoom}px`,
                      padding: `${8 / zoom}px ${12 / zoom}px`,
                      zIndex: 1000,
                      backgroundColor: 'rgb(15, 23, 42)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                      <span style={{ color: '#9ca3af' }}>Status:</span>
                      <span style={{ 
                        padding: `${2 / zoom}px ${6 / zoom}px`, 
                        borderRadius: `${4 / zoom}px`,
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
            </div>

            {/* CBR Sensors - Below Switch 3 */}
            <div 
              className="absolute" 
              style={{ left: '68%', top: '44%', transform: 'rotate(90deg)' }}
            >
              <div className="flex flex-col gap-0">
                {/* R1 - Radiological Detector */}
                <div 
                  className="w-1 h-1 bg-purple-700 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbr-r1', 
                    name: 'Radiological Detector (R1)', 
                    status: 'operational', 
                    value: 'Normal - No radiation detected',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-R1', 
                    name: 'Radiological Detector (R1)', 
                    type: 'chemical', 
                    subType: 'R', 
                    status: 'operational', 
                    value: 'Normal', 
                    x: 68, 
                    y: 44,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">R1</span>
                  
                  {hoveredFloorSensor?.id === 'cbr-r1' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
                          fontWeight: 'bold',
                          backgroundColor: '#16a34a'
                        }}>
                          OPERATIONAL
                        </span>
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        <span style={{ color: '#9ca3af' }}>Reading:</span> {hoveredFloorSensor.value}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* B1 - Biological Detector */}
                <div 
                  className="w-1 h-1 bg-teal-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbr-b1', 
                    name: 'Biological Detector (B1)', 
                    status: emergencyMode ? 'critical' : 'operational', 
                    value: emergencyMode ? 'CRITICAL: Bio agents detected!' : 'Clear - No biological threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-B1', 
                    name: 'Biological Detector (B1)', 
                    type: 'chemical', 
                    subType: 'B', 
                    status: emergencyMode ? 'critical' : 'operational', 
                    value: emergencyMode ? 'DETECTED' : 'Clear', 
                    x: 68, 
                    y: 44,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">B1</span>
                  
                  {hoveredFloorSensor?.id === 'cbr-b1' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
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
                
                {/* C1 - Chemical Detector */}
                <div 
                  className="w-1 h-1 bg-yellow-600 border border-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative"
                  onMouseEnter={() => setHoveredFloorSensor({ 
                    id: 'cbr-c1', 
                    name: 'Chemical Detector (C1)', 
                    status: emergencyMode ? 'critical' : 'operational', 
                    value: emergencyMode ? 'CRITICAL: Chemical agents detected!' : 'Clear - No chemical threats',
                    type: 'chemical'
                  })}
                  onMouseLeave={() => setHoveredFloorSensor(null)}
                  onClick={() => handleSensorClick({ 
                    id: 'S-F2-FLOOR-C1', 
                    name: 'Chemical Detector (C1)', 
                    type: 'chemical', 
                    subType: 'C', 
                    status: emergencyMode ? 'critical' : 'operational', 
                    value: emergencyMode ? 'DETECTED' : 'Clear', 
                    x: 68, 
                    y: 44,
                    lastUpdate: '1s ago'
                  })}
                >
                  <span className="text-[2px] font-bold text-black leading-none">C1</span>
                  
                  {hoveredFloorSensor?.id === 'cbr-c1' && (
                    <div 
                      className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                      style={{ 
                        left: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: `${8 / zoom}px`,
                        fontSize: `${10 / zoom}px`,
                        padding: `${8 / zoom}px ${12 / zoom}px`,
                        zIndex: 1000,
                        backgroundColor: 'rgb(15, 23, 42)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: `${4 / zoom}px` }}>{hoveredFloorSensor.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: `${6 / zoom}px`, marginBottom: `${2 / zoom}px` }}>
                        <span style={{ color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                          padding: `${2 / zoom}px ${6 / zoom}px`, 
                          borderRadius: `${4 / zoom}px`,
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Divider */}
      <div 
        className="w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors relative group"
        onMouseDown={() => setIsDragging(true)}
      >
        {/* Visual indicator on hover */}
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/20" />
        
        {/* Floating Collapse Button - Positioned on the draggable border */}
        {!isRightPanelCollapsed && (
          <button
            onClick={() => {
              if (containerRef.current) {
                // Collapsing - set floor plan to full width
                setLeftPanelWidth(containerRef.current.offsetWidth);
                // Reset pan for wider panel
                setPanX(0);
                setPanY(-350);
                // Keep zoom at 100 when collapsed
                setZoom(1.0);
              }
              setIsRightPanelCollapsed(true);
            }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-all hover:scale-110 flex items-center justify-center"
            title="Collapse panel"
          >
            <ChevronRight className="size-5" />
          </button>
        )}
      </div>

      {/* Expand Button - Only visible when right panel is collapsed */}
      {isRightPanelCollapsed && (
        <div className="flex-shrink-0 relative bg-gray-100" style={{ width: '48px' }}>
          <button
            onClick={() => {
              if (containerRef.current) {
                // Expanding - restore previous width or default to half
                setLeftPanelWidth((containerRef.current.offsetWidth) / 2);
                // Reset pan for narrower panel
                setPanX(0);
                setPanY(-100);
                // Keep zoom at 100 when panel is expanded
                setZoom(1.0);
              }
              setIsRightPanelCollapsed(false);
            }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-10 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-all hover:scale-110 flex items-center justify-center"
            title="Expand panel"
          >
            <ChevronLeft className="size-5" />
          </button>
        </div>
      )}

      {/* Right Panel - Facility Overview, Sensor Details, or Incident Details */}
      <div 
        className="relative overflow-auto bg-white"
        style={{ 
          width: isRightPanelCollapsed ? '0px' : undefined,
          flex: isRightPanelCollapsed ? '0 0 0px' : '1',
          display: isRightPanelCollapsed ? 'none' : 'block'
        }}
      >
        <div className="p-6 space-y-6">
        {/* Show Sensor Details if a sensor is selected */}
        {selectedSensor ? (
          <SensorDetailPanel 
            sensor={selectedSensor} 
            onBack={() => setSelectedSensor(null)}
            generateSensorHistory={generateSensorHistory}
            emergencyMode={emergencyMode}
          />
        ) : selectedIncident ? (
          /* Simple Incident Details Panel */
          <>
            {(() => {
              const incident = incidents.find(i => i.id === selectedIncident);
              if (!incident) return null;
              
              const timeAgo = Math.floor((Date.now() - incident.timestamp.getTime()) / 60000);
              
              return (
                <div className="bg-white rounded-lg border border-gray-200">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <button
                      onClick={() => setSelectedIncident(null)}
                      className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2 text-sm font-medium"
                    >
                      ← Back to Overview
                    </button>
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold text-gray-900">{incident.title}</h2>
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {incident.severity?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600">{incident.location}</p>
                  </div>

                  {/* Key Details */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Room</div>
                        <div className="text-gray-900 font-semibold">{incident.location.split(' - ')[1] || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Sensor</div>
                        <div className="text-gray-900 font-semibold">{incident.sensorId || 'Multiple'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Time</div>
                        <div className="text-gray-900 font-semibold">{timeAgo} minutes ago</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase mb-1">Status</div>
                        <div className={`font-semibold ${
                          incident.status === 'active' ? 'text-red-600' :
                          incident.status === 'resolved' ? 'text-green-600' :
                          'text-gray-600'
                        }`}>
                          {incident.status?.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Recommended Action */}
                    {incident.suggestedAction && (
                      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-500 rounded-lg mt-0.5">
                            <AlertTriangle className="size-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2">Recommended Action</h3>
                            <p className="text-gray-700 mb-3">{incident.suggestedAction}</p>
                            <button
                              onClick={() => {
                                // Execute the action - in a real system this would trigger automation
                                alert('Executing action: ' + incident.suggestedAction);
                              }}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold text-sm"
                            >
                              Execute Action
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI Prediction if available */}
                    {incident.aiPrediction && (
                      <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-500 rounded-lg mt-0.5">
                            <Brain className="size-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-2">AI Analysis</h3>
                            <p className="text-gray-700 text-sm">{incident.aiPrediction}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </>
        ) : (
          <>
            {emergencyMode ? (
              /* Emergency Mode - Three Section Overview */
              <>
                {/* AI ASSESSMENT Section */}
                <div className="bg-red-50 rounded-lg border-2 border-red-400 shadow-lg overflow-hidden">
                  <div className="p-4">
                    {/* Top Header - Title with Icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="size-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-base font-bold text-red-900">Chemical Attack - Sector B</h2>
                        <p className="text-xs text-red-700">Chlorine Gas Release • HAZMAT Level 4</p>
                      </div>
                    </div>

                    {/* AI Assessment Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="size-4 text-purple-600" />
                      <h3 className="font-bold text-gray-900 uppercase text-xs">AI ASSESSMENT</h3>
                    </div>

                    {/* Agent Type Section */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-start justify-between">
                        <span className="text-xs text-gray-700">Agent Type:</span>
                        <span className="text-xs font-bold text-red-900 text-right">Chlorine Gas (Cl₂)</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs text-gray-700">Concentration:</span>
                        <span className="text-xs font-bold text-red-900 text-right">15.7 ppm (IDLH exceeded)</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs text-gray-700">Source Location:</span>
                        <span className="text-xs font-bold text-red-900 text-right">Sector B - Lab (F2-R6)</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs text-gray-700">Leak Source:</span>
                        <span className="text-xs font-bold text-red-900 text-right">Storage cylinder valve failure</span>
                      </div>
                    </div>

                    {/* SPREADING ANALYSIS Section */}
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase">SPREADING ANALYSIS</h4>
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-gray-700">Current Spread:</span>
                          <span className="text-xs font-bold text-orange-600 text-right">2 rooms (Sector B only)</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-gray-700">Contamination Vector:</span>
                          <span className="text-xs font-bold text-orange-600 text-right">HVAC system (active)</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-gray-700">Predicted Spread:</span>
                          <span className="text-xs font-bold text-red-600 text-right">Full floor in 8-12 min</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-gray-700">Containment Status:</span>
                          <span className="text-xs font-bold text-red-600 text-right">Not Contained</span>
                        </div>
                      </div>
                    </div>

                    {/* PERSONNEL IMPACT Section */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase">PERSONNEL IMPACT</h4>
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-gray-700">At Risk:</span>
                          <span className="text-xs font-bold text-red-900 text-right">12 personnel</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-gray-700">In Contaminated Zone:</span>
                          <span className="text-xs font-bold text-red-900 text-right">5 personnel (Sector B)</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-gray-700">Adjacent Areas:</span>
                          <span className="text-xs font-bold text-orange-600 text-right">7 personnel</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-xs text-gray-700">Survival Rate (with evac):</span>
                          <span className="text-xs font-bold text-green-600 text-right">98%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI RECOMMENDED ACTIONS Section */}
                <div className="bg-white rounded-lg border border-purple-200 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-3 flex items-center gap-2 border-b border-purple-300">
                    <Brain className="size-4 text-white" />
                    <h3 className="font-bold text-white text-sm">AI RECOMMENDED ACTIONS</h3>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-purple-700 mb-4 font-medium">
                      Based on analysis of 47 historical chemical incidents
                    </p>

                    <div className="space-y-3 mb-4">
                      {/* Action 1 */}
                      <div className="bg-red-50 border-2 border-red-600 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">1</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1.5 text-sm">IMMEDIATE EVACUATION</h4>
                            <p className="text-xs text-gray-700 mb-2">
                              Evacuate all 12 personnel from Floor 2 to Floor 1 assembly point. Deploy emergency lighting and audio guidance system.
                            </p>
                            <div className="flex items-center gap-3 text-[10px]">
                              <span className="text-gray-600">ETA: 2-3 minutes</span>
                              <span className="font-bold text-green-600">Success: 94%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action 2 */}
                      <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">2</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1.5 text-sm">SEAL HVAC SYSTEM</h4>
                            <p className="text-xs text-gray-700 mb-2">
                              Close all dampers in Floor 2. Shutdown air handlers. Activate pressure barriers to prevent contamination spread.
                            </p>
                            <div className="flex items-center gap-3 text-[10px]">
                              <span className="text-gray-600">ETA: 45 seconds</span>
                              <span className="font-bold text-green-600">Success: 91%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action 3 */}
                      <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">3</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1.5 text-sm">DEPLOY CBRN TEAM</h4>
                            <p className="text-xs text-gray-700 mb-2">
                              Dispatch hazmat response team with Level A PPE, chlorine neutralization agents, and air monitoring equipment.
                            </p>
                            <div className="flex items-center gap-3 text-[10px]">
                              <span className="text-gray-600">ETA: 2 minutes</span>
                              <span className="font-bold text-green-600">Success: 89%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Execute All Button */}
                    <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-5 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 text-sm">
                      <Sparkles className="size-4" />
                      <span>EXECUTE ALL ACTIONS</span>
                    </button>
                  </div>
                </div>

                {/* THREAT TIMELINE Section */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
                  <div className="bg-gray-900 p-3 border-b border-gray-700">
                    <h3 className="font-bold text-white text-sm">THREAT TIMELINE</h3>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Timeline Entry 1 */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0" />
                        <div className="w-0.5 h-full bg-gray-300 mt-1.5" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="mb-1">
                          <span className="font-bold text-gray-900 text-xs">14:33:12</span>
                          <span className="text-[10px] text-gray-500 ml-2">(1m 50s ago)</span>
                        </div>
                        <h4 className="font-bold text-red-800 mb-1.5 text-xs">Chemical Agent Detected</h4>
                        <p className="text-xs text-gray-700">
                          Chlorine gas sensors triggered in Sector B - Lab. Concentration: 15.7 ppm (IDLH exceeded). Automatic alert sent to command center.
                        </p>
                      </div>
                    </div>

                    {/* Timeline Entry 2 */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
                        <div className="w-0.5 h-full bg-gray-300 mt-1.5" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="mb-1">
                          <span className="font-bold text-gray-900 text-xs">14:33:45</span>
                          <span className="text-[10px] text-gray-500 ml-2">(1m 17s ago)</span>
                        </div>
                        <h4 className="font-bold text-orange-800 mb-1.5 text-xs">Contamination Spreading</h4>
                        <p className="text-xs text-gray-700">
                          Trace levels detected in adjacent Sector B - Equipment room. HVAC system identified as contamination vector.
                        </p>
                      </div>
                    </div>

                    {/* Timeline Entry 3 */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 flex-shrink-0" />
                        <div className="w-0.5 h-full bg-gray-300 mt-1.5" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="mb-1">
                          <span className="font-bold text-gray-900 text-xs">14:34:02</span>
                          <span className="text-[10px] text-gray-500 ml-2">(1m ago)</span>
                        </div>
                        <h4 className="font-bold text-purple-800 mb-1.5 text-xs">AI Analysis Completed</h4>
                        <p className="text-xs text-gray-700">
                          AI system analyzed threat parameters against 47 historical incidents. Leak source identified as storage cylinder valve failure. Response recommendations generated.
                        </p>
                      </div>
                    </div>

                    {/* Timeline Entry 4 - Current */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1">
                          <span className="font-bold text-gray-900 text-xs">14:34:18</span>
                          <span className="text-[10px] text-gray-500 ml-2">(now)</span>
                        </div>
                        <div className="bg-red-50 border-2 border-red-600 rounded-lg p-2.5">
                          <div className="flex items-center gap-2 mb-1.5">
                            <AlertTriangle className="size-3.5 text-red-600" />
                            <h4 className="font-bold text-red-900 text-xs">ACTIVE THREAT - AWAITING RESPONSE</h4>
                          </div>
                          <p className="text-xs text-gray-700">
                            Situation critical. 12 personnel at risk. Immediate action required to prevent casualties and full floor contamination.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Normal Mode - Existing Content */
              <>
            {/* Facility Overview with Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t.facilityOverview}</h2>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[10px] text-gray-600 mb-1 uppercase">{t.rooms}</div>
                  <div className="text-lg font-bold text-gray-900">19</div>
                  {emergencyMode && (
                    <div className="text-[10px] text-gray-600 mt-0.5">
                      15 OK, 2 WARN, 2 CRIT
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[10px] text-gray-600 mb-1 uppercase">{t.sensors}</div>
                  <div className="text-lg font-bold text-gray-900">42/42</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[10px] text-gray-600 mb-1 uppercase">{t.temperature}</div>
                  <div className="text-lg font-bold text-gray-900">21°C</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">{t.average}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[10px] text-gray-600 mb-1 uppercase">{t.occupancyLabel}</div>
                  <div className="text-lg font-bold text-gray-900">28</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">{t.personnel}</div>
                </div>
              </div>
            </div>

            {/* Warnings Card - Active and Recently Resolved */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">{t.warnings}</h3>
              
              {/* Active Alerts */}
              <div className="space-y-3">
            
            {/* Temperature Elevation Alert */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <div>
                    <div className="font-semibold text-gray-900">{t.commandCenter}</div>
                    <div className="text-sm text-gray-600">{t.temperatureElevationDetected}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-orange-600">26°C</div>
                  <div className="text-xs text-gray-600">+5°C {t.aboveNormal}</div>
                </div>
              </div>
              
              {/* AI Recommendation */}
              <div className="bg-white rounded-lg p-3 mb-3 border border-orange-100">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-700 mb-1">{t.aiRecommendedAction}</div>
                    <div className="text-sm text-gray-900">
                      {t.increaseHvacCoolingText}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Execute Button */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                {t.executeHvacAdjustment}
              </button>
            </div>
          </div>
              
          {/* Recently Resolved Incidents */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-600 uppercase mb-3">{t.recentlyResolved}</h4>
            
          {/* Automated Resolution Example */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div>
                    <div className="font-semibold text-gray-900">{t.serverRoomB}</div>
                    <div className="text-sm text-gray-600">{t.co2LevelSpikeResolved}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">{t.autoResolved}</div>
                  <div className="text-xs text-gray-600">14 {t.minAgo}</div>
                </div>
              </div>
              
              {/* Incident Details */}
              <div className="bg-white rounded-lg p-3 mb-3 border border-green-100 space-y-2">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1 text-sm text-gray-700">
                    <span className="font-semibold">Issue:</span> CO₂ exceeded 1200 ppm threshold (peak: 1450 ppm)
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="flex-1 text-sm text-gray-700">
                    <span className="font-semibold">Automation Rule:</span> "Air Quality Emergency Protocol"
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1 text-sm text-gray-700">
                    <span className="font-semibold">Action Taken:</span> Ventilation increased to 100%, exhaust fans activated. CO₂ normalized to 850 ppm in 12 minutes.
                  </div>
                </div>
              </div>
              
              {/* View Details Link */}
              <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold">
                View Full Incident Log →
              </button>
          </div>
        </div>
      </div>

      {/* CBRNE Threat Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">{t.cbrneThreatStatus}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.chemical}</span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${emergencyMode ? 'bg-red-600 text-white' : 'bg-green-100 text-green-700'}`}>
                {emergencyMode ? t.detected.toUpperCase() : t.clear}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.biological}</span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${emergencyMode ? 'bg-red-600 text-white' : 'bg-green-100 text-green-700'}`}>
                {emergencyMode ? t.detected.toUpperCase() : t.clear}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.radiation}</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">{t.clear}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.nuclear}</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">{t.clear}</span>
            </div>
          </div>
        </div>

        {/* Environmental Health */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">{t.environmentalHealth}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.o2Level}</span>
              <span className="text-xs font-bold text-green-600">20.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.co2Level}</span>
              <span className="text-xs font-bold text-green-600">420 ppm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.pm25}</span>
              <span className="text-xs font-bold text-green-600">12 μg/m³</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.voc}</span>
              <span className="text-xs font-bold text-green-600">220 ppb</span>
            </div>
          </div>
        </div>

        {/* Air Filtration Systems */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">{t.airFiltrationSystems}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.hepaFilters}</span>
              <span className="text-xs font-bold text-green-600">99%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.carbonFilters}</span>
              <span className="text-xs font-bold text-green-600">97%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.nbcFilters}</span>
              <span className="text-xs font-bold text-blue-600">{t.standby}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.airExchange}</span>
              <span className="text-xs font-bold text-green-600">6.2 ACH</span>
            </div>
          </div>
        </div>

        {/* Power Systems */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">{t.powerSystems}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.primaryGrid}</span>
              <div className="text-right">
                <span className="text-xs font-bold text-green-600 block">{t.online.toUpperCase()}</span>
                <span className="text-[10px] text-gray-500">450 kW</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.backupGenerator}</span>
              <div className="text-right">
                <span className="text-xs font-bold text-blue-600 block">{t.standby}</span>
                <span className="text-[10px] text-gray-500">100%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.batteryUps}</span>
              <span className="text-xs font-bold text-green-600">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.fuelReserve}</span>
              <span className="text-xs font-bold text-green-600">95%</span>
            </div>
          </div>
        </div>

        {/* Life Support Systems */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">{t.lifeSupportSystems}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.waterReserve}</span>
              <div className="text-right">
                <span className="text-xs font-bold text-green-600 block">15,800 L</span>
                <span className="text-[10px] text-gray-500">56 {t.days}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.foodSupply}</span>
              <div className="text-right">
                <span className="text-xs font-bold text-green-600 block">60 {t.days}</span>
                <span className="text-[10px] text-gray-500">{t.full}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.waterQuality}</span>
              <span className="text-xs font-bold text-green-600">99.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">{t.medicalSupplies}</span>
              <span className="text-xs font-bold text-green-600">94%</span>
            </div>
          </div>
        </div>

        {/* AI Floor Assessment */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-600 rounded-lg">
              <Brain className="size-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{t.aiFloorAssessment}</h3>
              <p className="text-[10px] text-gray-600">{t.realTimeAnalysis}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-white rounded-lg p-2 text-center">
              <div className="text-[10px] text-gray-600 mb-1">{t.healthScore}</div>
              <div className="text-lg font-bold text-green-600">94<span className="text-xs">/100</span></div>
            </div>
            <div className="bg-white rounded-lg p-2 text-center">
              <div className="text-[10px] text-gray-600 mb-1">{t.airQuality.toUpperCase()}</div>
              <div className="text-lg font-bold text-green-600">96<span className="text-xs">%</span></div>
            </div>
            <div className="bg-white rounded-lg p-2 text-center">
              <div className="text-[10px] text-gray-600 mb-1">{t.safetyIndex}</div>
              <div className="text-lg font-bold text-green-600">99<span className="text-xs">%</span></div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-xs text-gray-900">{t.aiInsights}</h4>
            <div className="flex items-start gap-2 text-xs text-gray-700">
              <AlertTriangle className="size-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>{t.utilityRoomElevatedTemp}</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-700">
              <CheckCircle className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{t.allSystemsOperational}</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-700">
              <TrendingUp className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>{t.airQualityStable}</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-700">
              <Sparkles className="size-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <span>{t.recommendedMaintenance}</span>
            </div>
          </div>
        </div>
          </>
            )}
          </>
        )}
          </div>
      </div>

      {/* Global Tooltip - Renders at top level with highest z-index */}
      {hoveredFloorSensor && (
        <div 
          ref={tooltipRef}
          className="global-sensor-tooltip fixed text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
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
      
      {/* Hide all inline tooltips - only show global tooltip */}
      <style>{`
        /* Hide ALL inline tooltips */
        .absolute.pointer-events-none.whitespace-nowrap:not(.global-sensor-tooltip),
        .absolute.pointer-events-none.whitespace-nowrap > div,
        .absolute.pointer-events-none > div.bg-white,
        .absolute.text-white.rounded-lg.shadow-xl:not(.global-sensor-tooltip) {
          display: none !important;
        }
        
        /* Ensure global tooltip is always visible */
        .global-sensor-tooltip,
        .global-sensor-tooltip > * {
          display: block !important;
        }
      `}</style>
    </div>
  );
}