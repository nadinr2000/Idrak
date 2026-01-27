import { AlertCircle, Thermometer, Activity, Shield, ArrowLeft, X, ChevronRight, CheckCircle, Brain, TrendingUp, Sparkles, ZoomIn, ZoomOut, Maximize2, Wind, Radio, Lock, Eye, Zap, Droplets, Building2, Clock, AlertTriangle, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { incidents } from '../data/mockData';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RoomDetailPanel } from './RoomDetailPanel';
import { SensorDetailPanel } from './SensorDetailPanel';
import { FloorOverview } from './FloorOverview';

// FloorPlanView - Room details with incident tracking

interface FloorPlanViewProps {
  floorId: string;
  onRoomClick: (roomId: string) => void;
  onIncidentClick: (incidentId: string) => void;
  onBack?: () => void;
  emergencyMode?: boolean;
  hideBreadcrumbs?: boolean;
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

export function FloorPlanView({ floorId, onRoomClick, onIncidentClick, onBack, emergencyMode, hideBreadcrumbs }: FloorPlanViewProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(600);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Handle dragging for resizing panels
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newWidth = e.clientX;
        if (newWidth >= 400 && newWidth <= 900) {
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

  // Zoom functions
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  // Start panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
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
    // Find which room this sensor belongs to
    const room = rooms.find(r => 
      r.sensors?.some(s => s.id === sensor.id)
    );
    if (room) {
      setSelectedRoom(room.id);
    }
  };

  const selectedRoomData = adjustedRooms.find(r => r.id === selectedRoom);

  // Helper function to generate historical data for sensors
  const generateSensorHistory = (sensor: Sensor) => {
    const hours = 24;
    const data = [];
    
    for (let i = hours; i >= 0; i--) {
      const timestamp = `${i}h`;
      let value = 0;
      
      if (sensor.subType === 'CO2') {
        const base = sensor.status === 'warning' ? 850 : 420;
        value = base + (Math.random() * 50 - 25);
      } else if (sensor.subType === 'O2') {
        const base = sensor.status === 'warning' ? 19.2 : 20.9;
        value = base + (Math.random() * 0.5 - 0.25);
      } else if (sensor.subType === 'CO') {
        const base = sensor.status === 'warning' ? 12 : 2;
        value = base + (Math.random() * 3 - 1.5);
      } else if (sensor.subType === 'DP') {
        const base = sensor.status === 'warning' ? -12 : 8;
        value = base + (Math.random() * 4 - 2);
      }
      
      data.push({ time: timestamp, value: Math.max(0, value) });
    }
    
    return data.reverse();
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
    <div className="h-full bg-gray-50 flex">
      {/* Left Panel - Floor Plan */}
      <div 
        className="flex-shrink-0 bg-white overflow-auto"
        style={{ width: `${leftPanelWidth}px` }}
      >
        <div className="p-6 pb-0">
          {/* Legend */}
          <div className="mb-3 pb-3 border-b border-gray-200">
            <div className="border border-gray-300 rounded-lg bg-white px-3 py-2">
              <div className="flex items-center justify-between gap-4">
                {/* Differential Pressure */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-5 bg-orange-500 border border-gray-700 rounded flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">DP</span>
                  </div>
                  <span className="text-[9px] font-medium text-gray-700 text-center leading-tight">Differential<br/>Pressure</span>
                </div>

                {/* CBRN Detectors */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    <div className="w-5 h-5 bg-purple-700 border border-gray-700 rounded flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">R</span>
                    </div>
                    <div className="w-5 h-5 bg-teal-600 border border-gray-700 rounded flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">B</span>
                    </div>
                    <div className="w-5 h-5 bg-yellow-600 border border-gray-700 rounded flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">C</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-medium text-gray-700">CBRN Detectors</div>
                    <div className="text-[7px] text-gray-500">Radiological · Biological · Chemical</div>
                  </div>
                </div>

                {/* CO2 Sensors */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-6 bg-green-600 border-2 border-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">CO₂</span>
                  </div>
                  <span className="text-[9px] font-medium text-gray-700">CO₂ Sensors</span>
                </div>

                {/* CO Sensors */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-6 bg-green-600 border-2 border-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">CO</span>
                  </div>
                  <span className="text-[9px] font-medium text-gray-700">CO Sensors</span>
                </div>

                {/* O2 Sensors */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-6 bg-green-600 border-2 border-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">O₂</span>
                  </div>
                  <span className="text-[9px] font-medium text-gray-700">O₂ Sensors</span>
                </div>

                {/* Door Status */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <div className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-bold rounded border border-gray-700">
                      OFF
                    </div>
                    <span className="text-[9px] font-medium">/</span>
                    <div className="px-2 py-0.5 bg-green-600 text-white text-[8px] font-bold rounded border border-gray-700">
                      ON
                    </div>
                  </div>
                  <span className="text-[9px] font-medium text-gray-700">Door Status</span>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Zoom Controls */}
        <div className="flex items-center justify-end gap-1.5 px-6 pb-4 mb-2 bg-white">
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
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* SVG Floor Plan - Full Width */}
        <div 
          className="w-full overflow-hidden px-6 pb-6"
          style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
        >
          <svg 
            viewBox="0 0 920 570" 
            className="w-full h-auto"
            style={{
              transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isPanning ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            {/* Background */}
            <rect x="0" y="0" width="920" height="570" fill="#f8fafc" />
            
            {/* Grid pattern */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="920" height="570" fill="url(#grid)" />

            {/* Irregular outer walls */}
            <path
              d="M 40 80 
                 L 40 50 
                 L 280 50 
                 L 280 40 
                 L 520 40 
                 L 520 50 
                 L 720 50 
                 L 750 60 
                 L 870 60 
                 L 870 240 
                 L 880 240 
                 L 880 380 
                 L 870 380 
                 L 870 530 
                 L 860 540 
                 L 720 540 
                 L 700 550 
                 L 480 550 
                 L 480 540 
                 L 280 540 
                 L 280 530 
                 L 60 530 
                 L 50 520 
                 L 40 520 
                 L 40 340 
                 L 30 340 
                 L 30 240 
                 L 40 240 
                 Z"
              fill="none"
              stroke={emergencyMode ? "#ef4444" : "#10b981"}
              strokeWidth="8"
              strokeLinejoin="miter"
            />

            {/* Draw all rooms */}
            {adjustedRooms.map((room) => {
              const isHovered = hoveredRoom === room.id;
              const isSelected = selectedRoom === room.id;
              const isHallway = room.type === 'Hallway';
              
              let fillColor = '#ffffff';
              if (isHallway) {
                fillColor = '#e5e7eb';
              } else if (room.status === 'critical') {
                fillColor = '#fecaca';
              } else if (room.status === 'warning') {
                fillColor = '#fde68a';
              }

              let strokeColor = '#374151';
              let strokeWidth = 1;
              if (room.status === 'critical') {
                strokeColor = '#dc2626';
                strokeWidth = 2.5;
              } else if (room.status === 'warning') {
                strokeColor = '#f97316';
                strokeWidth = 2.5;
              } else if (isSelected) {
                strokeColor = '#3b82f6';
                strokeWidth = 2;
              } else if (isHovered) {
                strokeColor = '#6366f1';
                strokeWidth = 1.5;
              }

              return (
                <g key={room.id}>
                  {/* Glow for alert rooms */}
                  {(room.status === 'critical' || room.status === 'warning') && (
                    <rect
                      x={room.x - 4}
                      y={room.y - 4}
                      width={room.width + 8}
                      height={room.height + 8}
                      fill="none"
                      stroke={room.status === 'critical' ? '#dc2626' : '#f97316'}
                      strokeWidth="8"
                      opacity="0.5"
                      className="pointer-events-none"
                    />
                  )}

                  {/* Room fill */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    onClick={() => handleRoomClick(room)}
                    style={{ 
                      opacity: isHovered || isSelected ? 0.95 : 0.9,
                    }}
                  />

                  {/* Sensor icons */}
                  {room.sensors && room.sensors.map((sensor, idx) => {
                    const sensorX = room.x + (room.width * sensor.x / 100);
                    const sensorY = room.y + (room.height * sensor.y / 100);
                    const isHoveredSensor = hoveredSensor === sensor.id;
                    
                    // Render icons based on subType (legend icons)
                    let icon = null;
                    
                    if (sensor.subType === 'DP') {
                      // Differential Pressure - Orange square
                      icon = (
                        <g>
                          <rect
                            x={sensorX - 8}
                            y={sensorY - 7}
                            width="16"
                            height="14"
                            fill="#f97316"
                            stroke="#374151"
                            strokeWidth={isHoveredSensor ? "2" : "1"}
                            rx="2"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredSensor(sensor.id)}
                            onMouseLeave={() => setHoveredSensor(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSensorClick(sensor);
                            }}
                          />
                          <text
                            x={sensorX}
                            y={sensorY + 3}
                            textAnchor="middle"
                            fill="white"
                            fontSize="8"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            DP
                          </text>
                        </g>
                      );
                    } else if (sensor.subType === 'R') {
                      // Radiological - Purple square
                      icon = (
                        <g>
                          <rect
                            x={sensorX - 7}
                            y={sensorY - 7}
                            width="14"
                            height="14"
                            fill="#7c3aed"
                            stroke="#374151"
                            strokeWidth={isHoveredSensor ? "2" : "1"}
                            rx="2"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredSensor(sensor.id)}
                            onMouseLeave={() => setHoveredSensor(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSensorClick(sensor);
                            }}
                          />
                          <text
                            x={sensorX}
                            y={sensorY + 3}
                            textAnchor="middle"
                            fill="white"
                            fontSize="8"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            R
                          </text>
                        </g>
                      );
                    } else if (sensor.subType === 'B') {
                      // Biological - Teal square
                      icon = (
                        <g>
                          <rect
                            x={sensorX - 7}
                            y={sensorY - 7}
                            width="14"
                            height="14"
                            fill="#0d9488"
                            stroke="#374151"
                            strokeWidth={isHoveredSensor ? "2" : "1"}
                            rx="2"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredSensor(sensor.id)}
                            onMouseLeave={() => setHoveredSensor(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSensorClick(sensor);
                            }}
                          />
                          <text
                            x={sensorX}
                            y={sensorY + 3}
                            textAnchor="middle"
                            fill="white"
                            fontSize="8"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            B
                          </text>
                        </g>
                      );
                    } else if (sensor.subType === 'C') {
                      // Chemical - Yellow square
                      icon = (
                        <g>
                          <rect
                            x={sensorX - 7}
                            y={sensorY - 7}
                            width="14"
                            height="14"
                            fill="#ca8a04"
                            stroke="#374151"
                            strokeWidth={isHoveredSensor ? "2" : "1"}
                            rx="2"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredSensor(sensor.id)}
                            onMouseLeave={() => setHoveredSensor(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSensorClick(sensor);
                            }}
                          />
                          <text
                            x={sensorX}
                            y={sensorY + 3}
                            textAnchor="middle"
                            fill="white"
                            fontSize="8"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            C
                          </text>
                        </g>
                      );
                    } else if (sensor.subType === 'CO2') {
                      // CO2 - Green circle
                      icon = (
                        <g>
                          <circle
                            cx={sensorX}
                            cy={sensorY}
                            r="9"
                            fill="#16a34a"
                            stroke="#374151"
                            strokeWidth={isHoveredSensor ? "2.5" : "1.5"}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredSensor(sensor.id)}
                            onMouseLeave={() => setHoveredSensor(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSensorClick(sensor);
                            }}
                          />
                          <text
                            x={sensorX}
                            y={sensorY + 3}
                            textAnchor="middle"
                            fill="white"
                            fontSize="7"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            CO₂
                          </text>
                        </g>
                      );
                    } else if (sensor.subType === 'CO') {
                      // CO - Green circle
                      icon = (
                        <g>
                          <circle
                            cx={sensorX}
                            cy={sensorY}
                            r="9"
                            fill="#16a34a"
                            stroke="#374151"
                            strokeWidth={isHoveredSensor ? "2.5" : "1.5"}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredSensor(sensor.id)}
                            onMouseLeave={() => setHoveredSensor(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSensorClick(sensor);
                            }}
                          />
                          <text
                            x={sensorX}
                            y={sensorY + 3}
                            textAnchor="middle"
                            fill="white"
                            fontSize="7"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            CO
                          </text>
                        </g>
                      );
                    } else if (sensor.subType === 'O2') {
                      // O2 - Green circle
                      icon = (
                        <g>
                          <circle
                            cx={sensorX}
                            cy={sensorY}
                            r="9"
                            fill="#16a34a"
                            stroke="#374151"
                            strokeWidth={isHoveredSensor ? "2.5" : "1.5"}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredSensor(sensor.id)}
                            onMouseLeave={() => setHoveredSensor(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSensorClick(sensor);
                            }}
                          />
                          <text
                            x={sensorX}
                            y={sensorY + 3}
                            textAnchor="middle"
                            fill="white"
                            fontSize="7"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            O₂
                          </text>
                        </g>
                      );
                    }
                    
                    return icon ? (
                      <g key={sensor.id}>
                        {icon}
                      </g>
                    ) : null;
                  })}

                  {/* Alert icon for critical/warning rooms */}
                  {(room.status === 'critical' || room.status === 'warning') && (
                    <g>
                      {/* Background circle */}
                      <circle 
                        cx={room.x + room.width - 20} 
                        cy={room.y + 20} 
                        r="18" 
                        fill={room.status === 'critical' ? '#dc2626' : '#f97316'}
                        opacity="0.3"
                      />
                      {/* Solid circle */}
                      <circle 
                        cx={room.x + room.width - 20} 
                        cy={room.y + 20} 
                        r="14" 
                        fill={room.status === 'critical' ? '#dc2626' : '#f97316'}
                      />
                      <text
                        x={room.x + room.width - 20}
                        y={room.y + 26}
                        textAnchor="middle"
                        className="pointer-events-none"
                        fill="white"
                        fontSize="18"
                        fontWeight="bold"
                      >
                        ⚠
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Interior walls */}
            <g stroke="#2d3748" strokeWidth="2.5" fill="none" strokeLinecap="square">
              {isFloor2 ? (
                <>
                  <line x1="60" y1="190" x2="300" y2="190" />
                  <line x1="310" y1="140" x2="450" y2="140" />
                  <line x1="310" y1="250" x2="450" y2="250" />
                  <line x1="470" y1="155" x2="580" y2="155" />
                  <line x1="600" y1="175" x2="850" y2="175" />
                  <line x1="760" y1="185" x2="760" y2="280" />
                  <line x1="300" y1="60" x2="300" y2="250" />
                  <line x1="450" y1="60" x2="450" y2="250" />
                  <line x1="580" y1="60" x2="580" y2="250" />
                  <line x1="770" y1="60" x2="770" y2="185" />
                  <line x1="60" y1="260" x2="850" y2="260" />
                  <line x1="60" y1="325" x2="850" y2="325" />
                  <line x1="60" y1="420" x2="250" y2="420" />
                  <line x1="260" y1="420" x2="350" y2="420" />
                  <line x1="360" y1="420" x2="515" y2="420" />
                  <line x1="610" y1="425" x2="850" y2="425" />
                  <line x1="250" y1="335" x2="250" y2="510" />
                  <line x1="350" y1="335" x2="350" y2="510" />
                  <line x1="515" y1="335" x2="515" y2="510" />
                  <line x1="600" y1="335" x2="600" y2="510" />
                  <line x1="740" y1="335" x2="740" y2="510" />
                  <line x1="750" y1="425" x2="750" y2="510" />
                </>
              ) : (
                <>
                  <line x1="240" y1="60" x2="240" y2="170" />
                  <line x1="350" y1="60" x2="350" y2="170" />
                  <line x1="520" y1="60" x2="520" y2="230" />
                  <line x1="670" y1="60" x2="670" y2="135" />
                  <line x1="770" y1="145" x2="770" y2="230" />
                  <line x1="520" y1="135" x2="850" y2="135" />
                  <line x1="670" y1="230" x2="850" y2="230" />
                  <line x1="60" y1="240" x2="850" y2="240" />
                  <line x1="60" y1="310" x2="850" y2="310" />
                  <line x1="280" y1="320" x2="280" y2="510" />
                  <line x1="430" y1="320" x2="430" y2="510" />
                  <line x1="620" y1="320" x2="620" y2="510" />
                  <line x1="750" y1="320" x2="750" y2="415" />
                  <line x1="280" y1="415" x2="430" y2="415" />
                  <line x1="60" y1="430" x2="280" y2="430" />
                  <line x1="630" y1="415" x2="750" y2="415" />
                </>
              )}
            </g>

            {/* Render all sensor tooltips at the end so they appear above everything */}
            {adjustedRooms.map(room => 
              room.sensors?.map(sensor => {
                const sensorX = room.x + (room.width * sensor.x / 100);
                const sensorY = room.y + (room.height * sensor.y / 100);
                const isHoveredSensor = hoveredSensor === sensor.id;
                
                if (!isHoveredSensor) return null;
                
                return (
                  <g key={`tooltip-${sensor.id}`}>
                    {/* Shadow for depth */}
                    <rect
                      x={sensorX + 16}
                      y={sensorY - 34}
                      width="200"
                      height="64"
                      fill="rgba(0,0,0,0.1)"
                      rx="8"
                      className="pointer-events-none"
                    />
                    {/* Tooltip background */}
                    <rect
                      x={sensorX + 14}
                      y={sensorY - 36}
                      width="200"
                      height="64"
                      fill="white"
                      stroke="#1f2937"
                      strokeWidth="2.5"
                      rx="8"
                      className="pointer-events-none"
                    />
                    {/* Sensor name */}
                    <text
                      x={sensorX + 114}
                      y={sensorY - 14}
                      textAnchor="middle"
                      fill="#1f2937"
                      fontSize="14"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {sensor.name}
                    </text>
                    {/* Sensor value */}
                    <text
                      x={sensorX + 114}
                      y={sensorY + 8}
                      textAnchor="middle"
                      fill={sensor.status === 'critical' ? '#dc2626' : sensor.status === 'warning' ? '#f97316' : '#16a34a'}
                      fontSize="16"
                      fontWeight="700"
                      className="pointer-events-none"
                    >
                      {sensor.value}
                    </text>
                  </g>
                );
              })
            )}
          </svg>
        </div>
      </div>

      {/* Draggable Divider */}
      <div 
        className="w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors relative group"
        onMouseDown={() => setIsDragging(true)}
      >
        {/* Visual indicator on hover */}
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/20" />
      </div>

      {/* Right Panel - Room and floor overview only */}
      <div className="flex-1 overflow-auto p-6">
        {selectedSensor ? (
          <SensorDetailPanel 
            sensor={selectedSensor} 
            roomName={selectedRoomData?.name || 'Unknown Room'}
            onClose={() => {
              setSelectedSensor(null);
              setSelectedRoom(null);
            }} 
          />
        ) : selectedRoomData && selectedRoomData.type !== 'Hallway' ? (
          <RoomDetailPanel room={selectedRoomData} onClose={() => setSelectedRoom(null)} />
        ) : (
          <FloorOverview floorId={floorId} emergencyMode={emergencyMode} />
        )}
      </div>
    </div>
  );
}