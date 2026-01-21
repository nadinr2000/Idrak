import { AlertCircle, Thermometer, Activity, Shield, ArrowLeft, X, ChevronRight, CheckCircle, Brain, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';

// FloorPlanView - Room details with incident tracking

interface FloorPlanViewProps {
  floorId: string;
  onRoomClick: (roomId: string) => void;
  onIncidentClick: (incidentId: string) => void;
  onBack?: () => void;
  emergencyMode?: boolean;
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
  status: 'operational' | 'warning' | 'critical';
  value: string;
  x: number; // Position within room (percentage)
  y: number; // Position within room (percentage)
  lastUpdate?: string;
}

export function FloorPlanView({ floorId, onRoomClick, onIncidentClick, onBack, emergencyMode }: FloorPlanViewProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

  // Helper function to get sensors for each room
  const getSensorsForRoom = (roomId: string, hasIncident?: boolean): Sensor[] => {
    const baseSensors: Record<string, Sensor[]> = {
      'F2-R1': [ // Command Center
        { id: 'S-F2-R1-01', name: 'Temp Sensor North', type: 'temperature', status: 'operational', value: '21.2°C', x: 20, y: 20, lastUpdate: '2s ago' },
        { id: 'S-F2-R1-02', name: 'Temp Sensor South', type: 'temperature', status: 'operational', value: '21.4°C', x: 80, y: 80, lastUpdate: '2s ago' },
        { id: 'S-F2-R1-03', name: 'Motion Detector', type: 'motion', status: 'operational', value: 'Active', x: 50, y: 10, lastUpdate: '1s ago' },
        { id: 'S-F2-R1-04', name: 'Air Quality Monitor', type: 'air-quality', status: 'operational', value: 'Good', x: 50, y: 90, lastUpdate: '3s ago' },
      ],
      'F2-R6': [ // Sector B - Lab (CRITICAL - Has incident)
        { id: 'S-F2-R6-01', name: 'Chemical Detector A', type: 'chemical', status: 'critical', value: 'AGENT DETECTED', x: 25, y: 30, lastUpdate: '1s ago' },
        { id: 'S-F2-R6-02', name: 'Chemical Detector B', type: 'chemical', status: 'critical', value: 'AGENT DETECTED', x: 75, y: 30, lastUpdate: '1s ago' },
        { id: 'S-F2-R6-03', name: 'Temp Sensor', type: 'temperature', status: 'warning', value: '28.1°C', x: 50, y: 70, lastUpdate: '2s ago' },
        { id: 'S-F2-R6-04', name: 'Air Pressure Monitor', type: 'pressure', status: 'warning', value: '-12 Pa', x: 85, y: 85, lastUpdate: '2s ago' },
        { id: 'S-F2-R6-05', name: 'Smoke Detector', type: 'smoke', status: 'operational', value: 'Clear', x: 15, y: 85, lastUpdate: '3s ago' },
      ],
      'F2-R7': [ // Sector B - Equipment (WARNING)
        { id: 'S-F2-R7-01', name: 'Chemical Detector', type: 'chemical', status: 'warning', value: 'Trace Detected', x: 30, y: 40, lastUpdate: '2s ago' },
        { id: 'S-F2-R7-02', name: 'Temp Sensor', type: 'temperature', status: 'warning', value: '25.3°C', x: 70, y: 60, lastUpdate: '2s ago' },
        { id: 'S-F2-R7-03', name: 'Air Quality', type: 'air-quality', status: 'warning', value: 'Fair', x: 50, y: 80, lastUpdate: '3s ago' },
      ],
      'F2-R10': [ // Medical Bay
        { id: 'S-F2-R10-01', name: 'Medical Monitor', type: 'air-quality', status: 'operational', value: 'Sterile', x: 30, y: 30, lastUpdate: '2s ago' },
        { id: 'S-F2-R10-02', name: 'Temp Control', type: 'temperature', status: 'operational', value: '22.0°C', x: 70, y: 30, lastUpdate: '2s ago' },
        { id: 'S-F2-R10-03', name: 'Motion Sensor', type: 'motion', status: 'operational', value: 'Active', x: 50, y: 15, lastUpdate: '1s ago' },
        { id: 'S-F2-R10-04', name: 'Pressure Monitor', type: 'pressure', status: 'operational', value: '+5 Pa', x: 50, y: 85, lastUpdate: '2s ago' },
      ],
    };

    // Return sensors for the room if defined, otherwise return default sensors
    if (baseSensors[roomId]) {
      return baseSensors[roomId];
    }

    // Default sensors for other rooms
    return [
      { id: `S-${roomId}-01`, name: 'Temperature Sensor', type: 'temperature', status: 'operational', value: '21.0°C', x: 30, y: 30, lastUpdate: '2s ago' },
      { id: `S-${roomId}-02`, name: 'Motion Detector', type: 'motion', status: 'operational', value: 'Active', x: 70, y: 70, lastUpdate: '1s ago' },
    ];
  };

  // Define rooms for Floor 2 (chemical incident floor) and Floor 1
  const floor2Rooms: Room[] = [
    // Top left - Command and control area
    { id: 'F2-R1', name: 'Command Center', type: 'Control Room', x: 60, y: 60, width: 240, height: 130, status: 'operational', temp: 21, sensors: getSensorsForRoom('F2-R1') },
    { id: 'F2-R2', name: 'Communications', type: 'Comm Room', x: 310, y: 60, width: 140, height: 80, status: 'operational', temp: 20, sensors: getSensorsForRoom('F2-R2') },
    { id: 'F2-R3', name: 'Server Room', type: 'IT', x: 310, y: 150, width: 140, height: 100, status: 'operational', temp: 18, sensors: getSensorsForRoom('F2-R3') },
    
    // Top right - Sector A (Storage area)
    { id: 'F2-R4', name: 'Sector A - Storage 1', type: 'Storage', x: 470, y: 60, width: 110, height: 95, status: 'operational', temp: 19 },
    { id: 'F2-R5', name: 'Sector A - Storage 2', type: 'Storage', x: 470, y: 165, width: 110, height: 85, status: 'operational', temp: 20 },
    
    // Top far right - Sector B (INCIDENT AREA - status changes based on emergency mode)
    { id: 'F2-R6', name: 'Sector B - Lab', type: 'Laboratory', x: 600, y: 60, width: 250, height: 115, status: 'warning', temp: 28, hasIncident: false, sensors: getSensorsForRoom('F2-R6', true) },
    { id: 'F2-R7', name: 'Sector B - Equipment', type: 'Equipment', x: 600, y: 185, width: 160, height: 95, status: 'warning', temp: 25, hasIncident: false, sensors: getSensorsForRoom('F2-R7', true) },
    { id: 'F2-R8', name: 'Storage Closet', type: 'Storage', x: 770, y: 185, width: 80, height: 95, status: 'operational', temp: 21 },
    
    // Main corridor
    { id: 'F2-R9', name: 'Main Corridor', type: 'Hallway', x: 60, y: 260, width: 790, height: 65, status: 'operational' },
    
    // Bottom left - Medical and living
    { id: 'F2-R10', name: 'Medical Bay', type: 'Medical', x: 60, y: 335, width: 190, height: 175, status: 'operational', temp: 22, sensors: getSensorsForRoom('F2-R10') },
    { id: 'F2-R11', name: 'Pharmacy', type: 'Medical Storage', x: 260, y: 335, width: 90, height: 85, status: 'operational', temp: 21 },
    { id: 'F2-R12', name: 'Isolation Room', type: 'Medical', x: 260, y: 430, width: 90, height: 80, status: 'operational', temp: 22 },
    
    // Bottom middle - Living quarters
    { id: 'F2-R13', name: 'Living Quarters A', type: 'Dormitory', x: 360, y: 335, width: 155, height: 85, status: 'operational', temp: 21 },
    { id: 'F2-R14', name: 'Living Quarters B', type: 'Dormitory', x: 360, y: 430, width: 155, height: 80, status: 'operational', temp: 22 },
    { id: 'F2-R15', name: 'Bathroom', type: 'Facilities', x: 525, y: 335, width: 75, height: 85, status: 'operational', temp: 23 },
    
    // Bottom right - Supply and utilities
    { id: 'F2-R16', name: 'Supply Room', type: 'Storage', x: 610, y: 335, width: 130, height: 90, status: 'operational', temp: 19 },
    { id: 'F2-R17', name: 'Utility Room', type: 'Utilities', x: 750, y: 335, width: 100, height: 90, status: 'operational', temp: 24 },
    { id: 'F2-R18', name: 'Generator Room', type: 'Power', x: 610, y: 435, width: 140, height: 75, status: 'operational', temp: 26 },
    { id: 'F2-R19', name: 'Maintenance', type: 'Workshop', x: 760, y: 435, width: 90, height: 75, status: 'operational', temp: 22 },
  ];

  const floor1Rooms: Room[] = [
    // Entry area - CBRNe Protection
    { id: 'F1-R1', name: 'Security Checkpoint', type: 'Security', x: 60, y: 60, width: 180, height: 110, status: 'operational', temp: 20 },
    { id: 'F1-R2', name: 'Airlock Entry', type: 'Airlock', x: 250, y: 60, width: 100, height: 110, status: 'operational', temp: 21 },
    { id: 'F1-R3', name: 'Decontamination', type: 'Decon Chamber', x: 360, y: 60, width: 160, height: 110, status: 'operational', temp: 22 },
    
    // Command & Control
    { id: 'F1-R4', name: 'Watch Center', type: 'Operations', x: 530, y: 60, width: 140, height: 75, status: 'operational', temp: 21 },
    { id: 'F1-R5', name: 'Tactical Planning', type: 'Planning Room', x: 680, y: 60, width: 170, height: 75, status: 'operational', temp: 21 },
    { id: 'F1-R6', name: 'Intelligence Center', type: 'Intel Analysis', x: 530, y: 145, width: 140, height: 85, status: 'operational', temp: 20 },
    { id: 'F1-R7', name: 'Communications Hub', type: 'Comm Center', x: 680, y: 145, width: 90, height: 85, status: 'operational', temp: 19 },
    { id: 'F1-R8', name: 'Briefing Room', type: 'Briefing', x: 780, y: 145, width: 70, height: 85, status: 'operational', temp: 21 },
    
    // Main corridor
    { id: 'F1-R9', name: 'Main Hallway', type: 'Hallway', x: 60, y: 240, width: 790, height: 70, status: 'operational' },
    
    // Weapons & Equipment
    { id: 'F1-R10', name: 'Armory', type: 'Weapons Storage', x: 60, y: 320, width: 120, height: 95, status: 'operational', temp: 20 },
    { id: 'F1-R11', name: 'Ammunition Storage', type: 'Ammo Vault', x: 190, y: 320, width: 90, height: 95, status: 'operational', temp: 20 },
    { id: 'F1-R12', name: 'NBC Equipment', type: 'CBRN Storage', x: 290, y: 320, width: 140, height: 95, status: 'warning', temp: 24 },
    
    // Support Areas
    { id: 'F1-R13', name: 'Equipment Lockers', type: 'Gear Storage', x: 60, y: 425, width: 120, height: 85, status: 'operational', temp: 21 },
    { id: 'F1-R14', name: 'Rations Supply', type: 'Supply Depot', x: 190, y: 425, width: 90, height: 85, status: 'operational', temp: 18 },
    { id: 'F1-R15', name: 'Hazmat Storage', type: 'Hazmat Vault', x: 290, y: 425, width: 140, height: 85, status: 'operational', temp: 19 },
    { id: 'F1-R16', name: 'Emergency Response', type: 'Staging Area', x: 440, y: 320, width: 180, height: 190, status: 'operational', temp: 21 },
    
    // Technical Infrastructure
    { id: 'F1-R17', name: 'Data Center', type: 'IT Infrastructure', x: 630, y: 320, width: 120, height: 95, status: 'operational', temp: 18 },
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

  const handleSensorClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  };

  const selectedRoomData = adjustedRooms.find(r => r.id === selectedRoom);

  return (
    <div className="h-full bg-gray-50 flex">
      {/* Left Panel - Floor Plan */}
      <div className="w-[600px] flex-shrink-0 bg-white border-r-4 border-gray-300 overflow-auto">
        <div className="p-6 pb-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6 text-sm">
            <button 
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
            >
              Facility Floors
            </button>
            <ChevronRight className="size-4 text-gray-400" />
            <span className="text-gray-900 font-semibold">{floorId}</span>
            {selectedRoomData && selectedRoomData.type !== 'Hallway' && (
              <>
                <ChevronRight className="size-4 text-gray-400" />
                <span className="text-gray-900 font-semibold">{selectedRoomData.name}</span>
              </>
            )}
          </nav>

          {/* Legend */}
          <div className="mb-3 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white border-2 border-gray-700 rounded"></div>
                <span>Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-600 rounded"></div>
                <span>Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border-2 border-red-600 rounded"></div>
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 border-2 border-gray-600 rounded"></div>
                <span>Corridor</span>
              </div>
            </div>
          </div>


        </div>

        {/* SVG Floor Plan - Full Width */}
        <div className="w-full">
          <svg 
            viewBox="0 0 920 570" 
            className="w-full h-auto"
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
              stroke="#1a1a1a"
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
              let strokeWidth = 2;
              if (room.status === 'critical') {
                strokeColor = '#dc2626';
                strokeWidth = 5;
              } else if (room.status === 'warning') {
                strokeColor = '#f97316';
                strokeWidth = 5;
              } else if (isSelected) {
                strokeColor = '#3b82f6';
                strokeWidth = 3;
              } else if (isHovered) {
                strokeColor = '#6366f1';
                strokeWidth = 2.5;
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

                  {/* Room label */}
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2 - 10}
                    textAnchor="middle"
                    className="text-sm font-bold pointer-events-none"
                    fill="#1f2937"
                    fontSize={room.width < 100 ? "9" : room.width < 150 ? "11" : "13"}
                  >
                    {room.width < 100 ? room.name.split(' ').slice(-1)[0] : room.name}
                  </text>
                  
                  {/* Room type - only show if room is large enough */}
                  {room.width >= 70 && (
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2 + 5}
                      textAnchor="middle"
                      className="text-xs pointer-events-none"
                      fill="#6b7280"
                      fontSize={room.width < 150 ? "9" : "11"}
                    >
                      {room.type}
                    </text>
                  )}

                  {/* Room temp - only show if room is large enough */}
                  {room.temp && room.width >= 70 && (
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2 + 20}
                      textAnchor="middle"
                      className="text-xs pointer-events-none"
                      fill={room.status === 'critical' ? '#dc2626' : room.status === 'warning' ? '#f97316' : '#10b981'}
                      fontSize="12"
                      fontWeight="600"
                    >
                      🌡️ {room.temp}°C
                    </text>
                  )}

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
          </svg>
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="flex-1 overflow-auto p-6">
        {!selectedRoomData || selectedRoomData.type === 'Hallway' ? (
          <div className="max-w-3xl">
            {/* Floor Level Insights */}
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {(isFloor2 && emergencyMode) ? 'Floor Insights - Emergency Mode' : 'Floor Level Insights'}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              {(isFloor2 && emergencyMode)
                ? 'AI-powered analysis and predictions for the current emergency situation on this floor.'
                : 'Click on any room in the floor plan to view detailed information, sensors, and device status.'}
            </p>

            <div className="space-y-4">
              {/* Normal Statistics - Hide in emergency mode on Floor 2 */}
              {!(isFloor2 && emergencyMode) && (
                <>
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-5 gap-4">
                {/* Total Rooms */}
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Rooms</p>
                  <p className="text-2xl font-bold text-gray-900">{adjustedRooms.filter(r => r.type !== 'Hallway').length}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">Active</p>
                </div>

                {/* Total Devices */}
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Devices</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {adjustedRooms.reduce((total, room) => total + (room.sensors?.length || 0), 0)}
                  </p>
                  <p className="text-[10px] text-gray-600 mt-0.5">Sensors</p>
                </div>

                {/* Occupancy */}
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Occupancy</p>
                  <p className="text-2xl font-bold text-blue-600">{isFloor2 ? '12' : '8'}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">Personnel</p>
                </div>

                {/* Avg Temperature */}
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Avg Temp</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(
                      adjustedRooms.filter(r => r.temp).reduce((sum, r) => sum + (r.temp || 0), 0) / 
                      adjustedRooms.filter(r => r.temp).length
                    )}°C
                  </p>
                  <p className="text-[10px] text-gray-600 mt-0.5">Normal</p>
                </div>

                {/* Total Alerts */}
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Alerts</p>
                  <p className={`text-2xl font-bold ${
                    adjustedRooms.filter(r => r.status === 'critical' || r.status === 'warning').length > 0 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {adjustedRooms.filter(r => r.status === 'critical' || r.status === 'warning').length}
                  </p>
                  <p className="text-[10px] text-gray-600 mt-0.5">
                    {adjustedRooms.filter(r => r.status === 'critical' || r.status === 'warning').length === 0 ? 'Clear' : 'Active'}
                  </p>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">Room Status Distribution</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-[10px] text-green-700 font-medium mb-0.5">Operational</p>
                    <p className="text-xl font-bold text-green-800">
                      {adjustedRooms.filter(r => r.status === 'operational' && r.type !== 'Hallway').length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <p className="text-[10px] text-yellow-700 font-medium mb-0.5">Warning</p>
                    <p className="text-xl font-bold text-yellow-800">
                      {adjustedRooms.filter(r => r.status === 'warning').length}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <p className="text-[10px] text-red-700 font-medium mb-0.5">Critical</p>
                    <p className="text-xl font-bold text-red-800">
                      {adjustedRooms.filter(r => r.status === 'critical').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Temperature Range */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">Temperature Range</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Minimum</p>
                    <p className="text-lg font-bold text-blue-600">
                      {Math.min(...adjustedRooms.filter(r => r.temp).map(r => r.temp || 0))}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Average</p>
                    <p className="text-lg font-bold text-gray-900">
                      {Math.round(
                        adjustedRooms.filter(r => r.temp).reduce((sum, r) => sum + (r.temp || 0), 0) / 
                        adjustedRooms.filter(r => r.temp).length
                      )}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Maximum</p>
                    <p className="text-lg font-bold text-orange-600">
                      {Math.max(...adjustedRooms.filter(r => r.temp).map(r => r.temp || 0))}°C
                    </p>
                  </div>
                </div>
              </div>
                </>
              )}

              {/* Emergency Floor Insights for Floor 2 - ONLY IN EMERGENCY MODE */}
              {(isFloor2 && emergencyMode) && (
                <div className="space-y-6">
                  {/* Section 1: Threat Details */}
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-red-600 rounded-full p-2">
                        <AlertCircle className="size-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-red-900">Chemical Attack - Sector B</h3>
                        <p className="text-sm text-red-700">Chlorine Gas Release • HAZMAT Level 4</p>
                      </div>
                    </div>

                    {/* AI Assessment */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="size-4 text-purple-600" />
                        <h4 className="text-sm font-bold text-gray-900">AI ASSESSMENT</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Agent Type:</span>
                          <span className="font-bold text-red-900">Chlorine Gas (Cl₂)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Concentration:</span>
                          <span className="font-bold text-red-900">15.7 ppm (IDLH exceeded)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Source Location:</span>
                          <span className="font-bold text-red-900">Sector B - Lab (F2-R6)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Leak Source:</span>
                          <span className="font-bold text-red-900">Storage cylinder valve failure</span>
                        </div>
                      </div>
                    </div>

                    {/* Spreading & Impact */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">SPREADING ANALYSIS</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Current Spread:</span>
                          <span className="font-bold text-orange-600">2 rooms (Sector B only)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Contamination Vector:</span>
                          <span className="font-bold text-orange-600">HVAC system (active)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Predicted Spread:</span>
                          <span className="font-bold text-red-600">Full floor in 8-12 min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Containment Status:</span>
                          <span className="font-bold text-red-600">Not Contained</span>
                        </div>
                      </div>
                    </div>

                    {/* Personnel Impact */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2">PERSONNEL IMPACT</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">At Risk:</span>
                          <span className="font-bold text-red-900">12 personnel</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">In Contaminated Zone:</span>
                          <span className="font-bold text-red-900">5 personnel (Sector B)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Adjacent Areas:</span>
                          <span className="font-bold text-orange-600">7 personnel</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Survival Rate (with evac):</span>
                          <span className="font-bold text-green-600">98%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Recommended Actions */}
                  <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="size-5 text-purple-600" />
                      <h3 className="text-base font-bold text-purple-900">AI RECOMMENDED ACTIONS</h3>
                    </div>
                    <p className="text-xs text-purple-700 mb-4">
                      Based on analysis of 47 historical chemical incidents
                    </p>

                    <div className="space-y-3 mb-4">
                      {/* Action 1 */}
                      <div className="bg-white border-2 border-red-500 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="flex items-center justify-center size-6 bg-red-600 text-white rounded-full font-bold text-sm flex-shrink-0">1</div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">IMMEDIATE EVACUATION</h4>
                            <p className="text-xs text-gray-700 mt-1">
                              Evacuate all 12 personnel from Floor 2 to Floor 1 assembly point. Deploy emergency lighting and audio guidance system.
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs">
                              <span className="text-gray-600">ETA: 2-3 minutes</span>
                              <span className="text-green-600 font-semibold">Success: 94%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action 2 */}
                      <div className="bg-white border-2 border-orange-500 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="flex items-center justify-center size-6 bg-orange-600 text-white rounded-full font-bold text-sm flex-shrink-0">2</div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">SEAL HVAC SYSTEM</h4>
                            <p className="text-xs text-gray-700 mt-1">
                              Close all dampers in Floor 2. Shutdown air handlers. Activate pressure barriers to prevent contamination spread.
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs">
                              <span className="text-gray-600">ETA: 45 seconds</span>
                              <span className="text-green-600 font-semibold">Success: 91%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action 3 */}
                      <div className="bg-white border-2 border-yellow-500 rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="flex items-center justify-center size-6 bg-yellow-600 text-white rounded-full font-bold text-sm flex-shrink-0">3</div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">DEPLOY CBRN TEAM</h4>
                            <p className="text-xs text-gray-700 mt-1">
                              Dispatch hazmat response team with Level A PPE, chlorine neutralization agents, and air monitoring equipment.
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs">
                              <span className="text-gray-600">ETA: 2 minutes</span>
                              <span className="text-green-600 font-semibold">Success: 89%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Execute Button */}
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Sparkles className="size-5" />
                      EXECUTE ALL ACTIONS
                    </button>

                    {/* AI Confidence */}
                    <div className="mt-3 text-center">
                      <span className="text-xs text-purple-700">AI Confidence: </span>
                      <span className="text-sm font-bold text-purple-900">97%</span>
                    </div>
                  </div>

                  {/* Section 3: Threat Timeline */}
                  <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-4">THREAT TIMELINE</h3>
                    
                    <div className="space-y-4">
                      {/* Event 1: Detection */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="size-3 bg-red-600 rounded-full"></div>
                          <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">14:33:12</span>
                            <span className="text-xs text-gray-500">(1m 50s ago)</span>
                          </div>
                          <h4 className="text-sm font-bold text-red-900 mb-1">Chemical Agent Detected</h4>
                          <p className="text-xs text-gray-700">
                            Chlorine gas sensors triggered in Sector B - Lab. Concentration: 15.7 ppm (IDLH exceeded). Automatic alert sent to command center.
                          </p>
                        </div>
                      </div>

                      {/* Event 2: Spread Detection */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="size-3 bg-orange-600 rounded-full"></div>
                          <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">14:33:45</span>
                            <span className="text-xs text-gray-500">(1m 17s ago)</span>
                          </div>
                          <h4 className="text-sm font-bold text-orange-900 mb-1">Contamination Spreading</h4>
                          <p className="text-xs text-gray-700">
                            Trace levels detected in adjacent Sector B - Equipment room. HVAC system identified as contamination vector.
                          </p>
                        </div>
                      </div>

                      {/* Event 3: AI Analysis */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="size-3 bg-purple-600 rounded-full"></div>
                          <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">14:34:02</span>
                            <span className="text-xs text-gray-500">(1m ago)</span>
                          </div>
                          <h4 className="text-sm font-bold text-purple-900 mb-1">AI Analysis Completed</h4>
                          <p className="text-xs text-gray-700">
                            AI system analyzed threat parameters against 47 historical incidents. Leak source identified as storage cylinder valve failure. Response recommendations generated.
                          </p>
                        </div>
                      </div>

                      {/* Event 4: Alert Status */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="size-3 bg-red-600 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">14:34:18</span>
                            <span className="text-xs text-gray-500">(now)</span>
                          </div>
                          <h4 className="text-sm font-bold text-red-900 mb-1">⚠️ ACTIVE THREAT - AWAITING RESPONSE</h4>
                          <p className="text-xs text-gray-700">
                            Situation critical. 12 personnel at risk. Immediate action required to prevent casualties and full floor contamination.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl">
            {/* Room Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-gray-300">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedRoomData.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedRoomData.type} • {selectedRoomData.id}</p>
              </div>
              <button 
                onClick={() => setSelectedRoom(null)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="mb-6">
              <div className="grid grid-cols-5 gap-5">
                {/* Status */}
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Status</p>
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase whitespace-nowrap ${
                    selectedRoomData.status === 'operational' ? 'bg-green-100 text-green-800' :
                    selectedRoomData.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedRoomData.status}
                  </span>
                </div>

                {/* Temperature */}
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Temperature</p>
                  <p className="text-base font-bold text-orange-600 whitespace-nowrap">
                    {selectedRoomData.temp ? `${selectedRoomData.temp}°C` : '-'}
                  </p>
                </div>

                {/* Devices */}
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Devices</p>
                  <p className="text-base font-bold text-gray-900">{selectedRoomData.sensors?.length || 0}</p>
                </div>

                {/* Occupancy */}
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Occupancy</p>
                  <p className="text-base font-bold text-blue-600">
                    {selectedRoomData.status === 'critical' ? '0' : 
                     selectedRoomData.type === 'Command Center' ? '8' :
                     selectedRoomData.type === 'Laboratory' ? '4' :
                     selectedRoomData.type === 'Medical' ? '2' : '1'}
                  </p>
                </div>

                {/* Last Updated */}
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Last Update</p>
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">2s ago</p>
                </div>
              </div>
            </div>

            {/* Threat Alert - ONLY IN EMERGENCY MODE */}
            {selectedRoomData.hasIncident && selectedRoomData.status === 'critical' && emergencyMode && (
              <div className="mb-6 space-y-4">
                {/* AI Assessment Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <Brain className="size-5 text-purple-600" />
                  <h4 className="font-bold text-gray-900">AI THREAT ASSESSMENT</h4>
                  <span className="ml-auto text-xs text-gray-500">Updated: 14:34:18</span>
                </div>

                {/* Chemical Detection Event */}
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-gray-900">14:33:12</span>
                    <span className="text-xs text-gray-600">1m 50s ago</span>
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="font-bold text-red-900 mb-1">Chemical Agent Detected</h5>
                      <p className="text-xs text-red-700 mb-2">
                        {selectedRoomData.id === 'F2-R6' 
                          ? 'High concentration of chlorine gas (15.7 ppm) detected in laboratory. IDLH threshold exceeded. Immediate evacuation required.'
                          : 'Trace chemical agents detected near incident area. Elevated contamination levels. Enhanced monitoring active.'}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded border border-red-300">
                          CRITICAL
                        </span>
                        <span className="text-xs text-red-800">
                          {selectedRoomData.id === 'F2-R6' ? '12 personnel at risk' : '8 adjacent zones affected'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recommended Actions */}
                <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <Brain className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="font-bold text-purple-900 mb-1">AI RECOMMENDED ACTIONS</h5>
                      <p className="text-xs text-purple-700 mb-3">
                        Based on analysis of 47 historical chemical incidents and current threat parameters
                      </p>

                      {/* Action 1: Evacuation */}
                      <div className="bg-white border border-purple-200 rounded-lg p-3 mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center justify-center size-5 bg-red-600 text-white rounded-full font-bold text-[10px]">1</div>
                          <span className="text-xs font-bold text-gray-900">Immediate Evacuation</span>
                          <span className="ml-auto text-[10px] text-green-600 font-semibold">94% success</span>
                        </div>
                        <p className="text-[11px] text-gray-700 mb-2 pl-7">
                          Evacuate all personnel from {selectedRoomData.name} to Floor 1 assembly point. Deploy emergency lighting and audio guidance.
                        </p>
                        <div className="flex items-center gap-2 pl-7">
                          <span className="text-[10px] text-gray-600">ETA: 2-3 min</span>
                        </div>
                      </div>

                      {/* Action 2: Seal HVAC */}
                      <div className="bg-white border border-purple-200 rounded-lg p-3 mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center justify-center size-5 bg-orange-600 text-white rounded-full font-bold text-[10px]">2</div>
                          <span className="text-xs font-bold text-gray-900">Seal HVAC System</span>
                          <span className="ml-auto text-[10px] text-green-600 font-semibold">91% success</span>
                        </div>
                        <p className="text-[11px] text-gray-700 mb-2 pl-7">
                          Close all dampers in Sector B. Shutdown air handlers. Activate positive pressure barriers to prevent spread.
                        </p>
                        <div className="flex items-center gap-2 pl-7">
                          <span className="text-[10px] text-gray-600">ETA: 45 sec</span>
                        </div>
                      </div>

                      {/* Action 3: Deploy CBRN Team */}
                      <div className="bg-white border border-purple-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center justify-center size-5 bg-yellow-600 text-white rounded-full font-bold text-[10px]">3</div>
                          <span className="text-xs font-bold text-gray-900">Deploy CBRN Response Team</span>
                          <span className="ml-auto text-[10px] text-green-600 font-semibold">89% success</span>
                        </div>
                        <p className="text-[11px] text-gray-700 mb-2 pl-7">
                          Dispatch hazmat team with Level A PPE, chlorine neutralization agents, and air monitoring equipment.
                        </p>
                        <div className="flex items-center gap-2 pl-7">
                          <span className="text-[10px] text-gray-600">ETA: 2 min</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-4">
                        <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded transition-colors">
                          Approve All Actions
                        </button>
                        <button className="px-3 py-1.5 bg-white hover:bg-purple-50 text-purple-700 border border-purple-300 text-xs font-bold rounded transition-colors">
                          Customize
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Warning Alert */}
            {selectedRoomData.status === 'warning' && (
              <div className="mb-6 bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-bold text-yellow-900 mb-1">⚠️ WARNING CONDITION DETECTED</h4>
                    <p className="text-xs text-yellow-800 mb-3">
                      {selectedRoomData.id === 'F2-R6' && 
                        'Temperature anomaly detected. Sensor calibration recommended. HVAC system compensating. No personnel safety concerns at this time.'
                      }
                      {selectedRoomData.id === 'F2-R7' && 
                        'Elevated temperature detected near equipment storage. Ventilation operating at increased capacity. Equipment integrity being monitored.'
                      }
                      {selectedRoomData.id === 'F1-R12' && 
                        'Elevated temperature in NBC Equipment storage area. Temperature threshold exceeded. Equipment integrity being monitored. Ventilation systems operating at increased capacity.'
                      }
                      {selectedRoomData.id !== 'F2-R6' && selectedRoomData.id !== 'F2-R7' && selectedRoomData.id !== 'F1-R12' &&
                        'Abnormal environmental conditions detected. Monitoring systems active. No immediate threat to personnel. Continuous assessment in progress.'
                      }
                    </p>
                    
                    {/* AI Recommended Action */}
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xs font-bold text-gray-800">🤖 AI RECOMMENDED ACTION:</span>
                      </div>
                      <p className="text-xs text-gray-900 mb-3">
                        {selectedRoomData.id === 'F2-R7' && 
                          'Restrict access to authorized personnel only with Level C protection. Increase air sampling frequency to every 30 seconds. Prepare evacuation plan if trace levels increase. Monitor personnel for exposure symptoms.'
                        }
                        {selectedRoomData.id === 'F1-R12' && 
                          'Increase ventilation system output by 40%. Deploy cooling units to NBC Equipment storage. Inspect equipment seals for integrity. Prepare for equipment relocation if temperature exceeds 26°C.'
                        }
                        {selectedRoomData.id !== 'F2-R7' && selectedRoomData.id !== 'F1-R12' &&
                          'Increase monitoring frequency for all environmental sensors. Dispatch maintenance team for inspection. Review recent activity logs. Prepare contingency protocols.'
                        }
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold rounded transition-colors">
                          Approve Action
                        </button>
                        <button className="px-3 py-1.5 bg-white hover:bg-yellow-50 text-yellow-700 border border-yellow-300 text-xs font-bold rounded transition-colors">
                          Override
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Thermometer className="size-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Temp: {selectedRoomData.temp}°C</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="size-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Status: Monitoring</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="size-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Personnel: Caution Advised</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Critical Alert (for rooms without hasIncident flag) */}
            {selectedRoomData.status === 'critical' && !selectedRoomData.hasIncident && (
              <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-bold text-red-900 mb-1">🚨 CRITICAL CONDITION</h4>
                    <p className="text-xs text-red-700 mb-3">
                      {selectedRoomData.id === 'F1-R18' && 
                        'Critical temperature detected in Electrical Room. Overheating condition detected at 29°C. Fire suppression system on standby. Maintenance team dispatched immediately. Area access restricted.'
                      }
                      {selectedRoomData.id !== 'F1-R18' &&
                        'Critical environmental conditions detected. Immediate attention required. Emergency protocols may be necessary. Personnel should evacuate if directed.'
                      }
                    </p>
                    
                    {/* AI Recommended Action */}
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xs font-bold text-gray-800">🤖 AI RECOMMENDED ACTION:</span>
                      </div>
                      <p className="text-xs text-gray-900 mb-3">
                        {selectedRoomData.id === 'F1-R18' && 
                          'Emergency cooling protocol: (1) Activate emergency HVAC override for maximum cooling, (2) Power down non-essential electrical systems to reduce heat load, (3) Deploy portable cooling units, (4) Prepare for emergency power system shutdown if temperature reaches 32°C.'
                        }
                        {selectedRoomData.id !== 'F1-R18' &&
                          'Initiate emergency response: (1) Evacuate non-essential personnel, (2) Deploy emergency response team, (3) Activate emergency ventilation protocols, (4) Prepare emergency medical support.'
                        }
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-colors">
                          Approve Action
                        </button>
                        <button className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-700 border border-red-300 text-xs font-bold rounded transition-colors">
                          Override
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Thermometer className="size-4 text-red-600" />
                        <span className="font-semibold text-red-800">Temp: {selectedRoomData.temp}°C</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="size-4 text-red-600" />
                        <span className="font-semibold text-red-800">Status: Critical</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="size-4 text-red-600" />
                        <span className="font-semibold text-red-800">Action: Immediate Response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Environmental Conditions */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Environmental Conditions</h3>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-gray-500 mb-1">Air Pressure</p>
                  <p className="text-base font-bold text-gray-900">
                    {selectedRoomData.status === 'critical' ? '-12 Pa' : '+5 Pa'}
                  </p>
                  <p className="text-[10px] text-gray-600">
                    {selectedRoomData.status === 'critical' ? 'Negative' : 'Positive'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 mb-1">Humidity</p>
                  <p className="text-base font-bold text-gray-900">
                    {selectedRoomData.status === 'critical' ? '68%' : '45%'}
                  </p>
                  <p className="text-[10px] text-gray-600">
                    {selectedRoomData.status === 'critical' ? 'High' : 'Normal'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 mb-1">Air Quality</p>
                  <p className={`text-base font-bold ${
                    selectedRoomData.status === 'critical' ? 'text-red-600' :
                    selectedRoomData.status === 'warning' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {selectedRoomData.status === 'critical' ? 'Critical' :
                     selectedRoomData.status === 'warning' ? 'Fair' : 'Good'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 mb-1">Ventilation</p>
                  <p className={`text-base font-bold ${
                    selectedRoomData.status === 'critical' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {selectedRoomData.status === 'critical' ? 'Sealed' : 'Active'}
                  </p>
                </div>
              </div>
            </div>

            {/* Room Details */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Room Details</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room ID:</span>
                  <span className="font-medium text-gray-900">{selectedRoomData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium text-gray-900">{selectedRoomData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Floor:</span>
                  <span className="font-medium text-gray-900">{floorId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium text-gray-900">
                    {(selectedRoomData.width * selectedRoomData.height / 100).toFixed(1)} m²
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Access Level:</span>
                  <span className="font-medium text-gray-900">
                    {selectedRoomData.type === 'Laboratory' || selectedRoomData.type === 'Command Center' ? 'Restricted' :
                     selectedRoomData.type === 'Medical' ? 'Medical Only' : 'Standard'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Door Status:</span>
                  <span className={`font-medium ${
                    selectedRoomData.status === 'critical' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {selectedRoomData.status === 'critical' ? 'SEALED' : 'Unlocked'}
                  </span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-3">System Status</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-xs text-gray-700">HVAC System</span>
                  <span className={`text-xs font-bold ${
                    selectedRoomData.status === 'critical' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {selectedRoomData.status === 'critical' ? 'ISOLATED' : 'ACTIVE'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-xs text-gray-700">Lighting</span>
                  <span className="text-xs font-bold text-green-600">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-xs text-gray-700">Power</span>
                  <span className="text-xs font-bold text-green-600">NOMINAL</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-xs text-gray-700">Security</span>
                  <span className={`text-xs font-bold ${
                    selectedRoomData.status === 'critical' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {selectedRoomData.status === 'critical' ? 'LOCKDOWN' : 'NORMAL'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-xs text-gray-700">Fire Suppression</span>
                  <span className="text-xs font-bold text-green-600">STANDBY</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-xs text-gray-700">Emergency Lights</span>
                  <span className="text-xs font-bold text-green-600">READY</span>
                </div>
              </div>
            </div>

            {/* Sensors Section */}
            {selectedRoomData.sensors && selectedRoomData.sensors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  Sensors & Devices ({selectedRoomData.sensors.length})
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedRoomData.sensors.map((sensor) => (
                    <div 
                      key={sensor.id} 
                      className={`bg-white border-2 rounded-lg p-3 transition-all cursor-pointer hover:shadow-md ${
                        selectedSensor?.id === sensor.id ? 'border-blue-500 ring-2 ring-blue-200' :
                        sensor.status === 'critical' ? 'border-red-500' :
                        sensor.status === 'warning' ? 'border-yellow-500' :
                        'border-gray-300'
                      }`}
                      onClick={() => handleSensorClick(sensor)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            sensor.status === 'critical' ? 'bg-red-600' :
                            sensor.status === 'warning' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}></div>
                          <h4 className="text-sm font-bold text-gray-900">{sensor.name}</h4>
                        </div>
                        <span className="text-[10px] text-gray-500">{sensor.id}</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium text-gray-900 uppercase">{sensor.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Value:</span>
                          <span className={`font-bold ${
                            sensor.status === 'critical' ? 'text-red-600' :
                            sensor.status === 'warning' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>{sensor.value}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Update:</span>
                          <span className="font-medium text-gray-700">{sensor.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Incidents Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-3">
                Recent Incidents
              </h3>
              
              <div className="space-y-3">
                {/* Generate incidents based on room */}
                {selectedRoomData.id === 'F2-R1' && selectedRoomData.hasIncident && (
                  <>
                    {/* Current Active Incident */}
                    <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <h4 className="text-sm font-bold text-red-900">Chemical Agent Detection</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-red-200 text-red-800 text-[9px] font-bold rounded uppercase">Active</span>
                      </div>
                      <p className="text-xs text-red-800 mb-2">
                        Chlorine gas detected at 15.7 ppm. Emergency containment protocols activated.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-red-700">Detected:</span>
                          <span className="font-bold text-red-900 ml-1">14:23:18</span>
                        </div>
                        <div>
                          <span className="text-red-700">Severity:</span>
                          <span className="font-bold text-red-900 ml-1">Critical</span>
                        </div>
                      </div>
                    </div>

                    {/* Auto-resolved temperature spike */}
                    <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="size-4 text-green-600" />
                          <h4 className="text-sm font-bold text-green-900">Temperature Spike</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-green-200 text-green-800 text-[9px] font-bold rounded uppercase">Auto-Resolved</span>
                      </div>
                      <p className="text-xs text-green-800 mb-2">
                        Temperature exceeded 26°C threshold. System automatically increased HVAC output by 35%.
                      </p>
                      <div className="bg-green-100 border border-green-200 rounded p-2 mb-2">
                        <p className="text-[10px] font-bold text-green-800 mb-1">🤖 AUTO-RESOLUTION RULE:</p>
                        <p className="text-[10px] text-green-700">
                          RULE-HVAC-023: "If room temp exceeds 26°C → increase HVAC output by 30-40% + notify facility ops"
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-green-700">Detected:</span>
                          <span className="font-bold text-green-900 ml-1 block">13:45:22</span>
                        </div>
                        <div>
                          <span className="text-green-700">Resolved:</span>
                          <span className="font-bold text-green-900 ml-1 block">13:47:18</span>
                        </div>
                        <div>
                          <span className="text-green-700">Duration:</span>
                          <span className="font-bold text-green-900 ml-1 block">1m 56s</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedRoomData.id === 'F2-R7' && (
                  <>
                    {/* Auto-resolved air quality issue */}
                    <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="size-4 text-green-600" />
                          <h4 className="text-sm font-bold text-green-900">Air Quality Degradation</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-green-200 text-green-800 text-[9px] font-bold rounded uppercase">Auto-Resolved</span>
                      </div>
                      <p className="text-xs text-green-800 mb-2">
                        CO2 levels reached 1200 ppm. System automatically activated emergency ventilation protocol.
                      </p>
                      <div className="bg-green-100 border border-green-200 rounded p-2 mb-2">
                        <p className="text-[10px] font-bold text-green-800 mb-1">🤖 AUTO-RESOLUTION RULE:</p>
                        <p className="text-[10px] text-green-700">
                          RULE-VENT-015: &quot;If CO2 &gt; 1000 ppm → activate emergency ventilation + increase fresh air intake to 100%&quot;
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-green-700">Detected:</span>
                          <span className="font-bold text-green-900 ml-1 block">12:18:45</span>
                        </div>
                        <div>
                          <span className="text-green-700">Resolved:</span>
                          <span className="font-bold text-green-900 ml-1 block">12:23:12</span>
                        </div>
                        <div>
                          <span className="text-green-700">Duration:</span>
                          <span className="font-bold text-green-900 ml-1 block">4m 27s</span>
                        </div>
                      </div>
                    </div>

                    {/* Manual intervention */}
                    <div className="bg-blue-50 border border-blue-300 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="size-4 text-blue-600" />
                          <h4 className="text-sm font-bold text-blue-900">Door Access Anomaly</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-[9px] font-bold rounded uppercase">Manual Resolution</span>
                      </div>
                      <p className="text-xs text-blue-800 mb-2">
                        Unauthorized access attempt detected. Security team verified and cleared.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-blue-700">Detected:</span>
                          <span className="font-bold text-blue-900 ml-1 block">11:32:08</span>
                        </div>
                        <div>
                          <span className="text-blue-700">Resolved:</span>
                          <span className="font-bold text-blue-900 ml-1 block">11:38:45</span>
                        </div>
                        <div>
                          <span className="text-blue-700">Resolved By:</span>
                          <span className="font-bold text-blue-900 ml-1 block">Sec Team</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedRoomData.id === 'F1-R12' && (
                  <>
                    {/* Auto-resolved humidity issue */}
                    <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="size-4 text-green-600" />
                          <h4 className="text-sm font-bold text-green-900">High Humidity Alert</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-green-200 text-green-800 text-[9px] font-bold rounded uppercase">Auto-Resolved</span>
                      </div>
                      <p className="text-xs text-green-800 mb-2">
                        Humidity exceeded 65% in NBC equipment storage. System activated dehumidifier units.
                      </p>
                      <div className="bg-green-100 border border-green-200 rounded p-2 mb-2">
                        <p className="text-[10px] font-bold text-green-800 mb-1">🤖 AUTO-RESOLUTION RULE:</p>
                        <p className="text-[10px] text-green-700">
                          RULE-HUM-008: &quot;If humidity &gt; 60% in NBC storage → activate dehumidifiers + reduce HVAC moisture&quot;
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-green-700">Detected:</span>
                          <span className="font-bold text-green-900 ml-1 block">10:15:33</span>
                        </div>
                        <div>
                          <span className="text-green-700">Resolved:</span>
                          <span className="font-bold text-green-900 ml-1 block">10:28:41</span>
                        </div>
                        <div>
                          <span className="text-green-700">Duration:</span>
                          <span className="font-bold text-green-900 ml-1 block">13m 8s</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedRoomData.id === 'F1-R18' && (
                  <>
                    {/* Auto-resolved power fluctuation */}
                    <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="size-4 text-green-600" />
                          <h4 className="text-sm font-bold text-green-900">Power Surge Detected</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-green-200 text-green-800 text-[9px] font-bold rounded uppercase">Auto-Resolved</span>
                      </div>
                      <p className="text-xs text-green-800 mb-2">
                        Voltage spike detected at 248V. System automatically engaged surge protection and load balancing.
                      </p>
                      <div className="bg-green-100 border border-green-200 rounded p-2 mb-2">
                        <p className="text-[10px] font-bold text-green-800 mb-1">🤖 AUTO-RESOLUTION RULE:</p>
                        <p className="text-[10px] text-green-700">
                          RULE-PWR-042: &quot;If voltage &gt; 245V → engage surge protection + redistribute load + switch to UPS if needed&quot;
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-green-700">Detected:</span>
                          <span className="font-bold text-green-900 ml-1 block">09:42:17</span>
                        </div>
                        <div>
                          <span className="text-green-700">Resolved:</span>
                          <span className="font-bold text-green-900 ml-1 block">09:42:24</span>
                        </div>
                        <div>
                          <span className="text-green-700">Duration:</span>
                          <span className="font-bold text-green-900 ml-1 block">7s</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Default incidents for rooms without specific ones */}
                {!['F2-R1', 'F2-R7', 'F1-R12', 'F1-R18'].includes(selectedRoomData.id) && (
                  <>
                    {/* Auto-resolved lighting flicker */}
                    <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="size-4 text-green-600" />
                          <h4 className="text-sm font-bold text-green-900">Lighting Fluctuation</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-green-200 text-green-800 text-[9px] font-bold rounded uppercase">Auto-Resolved</span>
                      </div>
                      <p className="text-xs text-green-800 mb-2">
                        Brief lighting flicker detected. System automatically switched to backup circuit.
                      </p>
                      <div className="bg-green-100 border border-green-200 rounded p-2 mb-2">
                        <p className="text-[10px] font-bold text-green-800 mb-1">🤖 AUTO-RESOLUTION RULE:</p>
                        <p className="text-[10px] text-green-700">
                          RULE-LIGHT-019: "If lighting flicker detected → switch to backup circuit + log event"
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-green-700">Detected:</span>
                          <span className="font-bold text-green-900 ml-1 block">08:22:55</span>
                        </div>
                        <div>
                          <span className="text-green-700">Resolved:</span>
                          <span className="font-bold text-green-900 ml-1 block">08:22:57</span>
                        </div>
                        <div>
                          <span className="text-green-700">Duration:</span>
                          <span className="font-bold text-green-900 ml-1 block">2s</span>
                        </div>
                      </div>
                    </div>

                    {/* Scheduled maintenance */}
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="size-4 text-gray-600" />
                          <h4 className="text-sm font-bold text-gray-900">Scheduled Sensor Calibration</h4>
                        </div>
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-800 text-[9px] font-bold rounded uppercase">Completed</span>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        Routine sensor calibration completed. All readings within normal parameters.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Started:</span>
                          <span className="font-bold text-gray-900 ml-1 block">07:00:00</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-bold text-gray-900 ml-1 block">07:12:30</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="font-bold text-gray-900 ml-1 block">Scheduled</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
