import { useState, useEffect } from 'react';
import { Building2, MapPin, Layers, Activity, X, Info, CheckCircle } from 'lucide-react';
import { Language, translations } from '../translations';
import floorPlanImage from 'figma:asset/34666554759c5e69511808d799c27ec98a1ed980.png';
import { allFloorPlanSensors, FloorPlanSensor } from './EnhancedLocationSelectorSensorData';

// Use a placeholder for the floor plan image
const floorPlanImagePlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZjhmYWZjIi8+PC9zdmc+';

// Legend Component
function SensorLegend({ language }: { language: Language }) {
  const legendItems = [
    { symbol: 'DP', label: language === 'ar' ? 'الضغط التفاضلي' : 'Differential Pressure', color: '#139B48', shape: 'circle' },
    { symbol: 'R', label: language === 'ar' ? 'كواشف إشعاعية' : 'Radiological Detectors', color: '#139B48', shape: 'triangle' },
    { symbol: 'B', label: language === 'ar' ? 'كواشف بيولوجية' : 'Biological Detectors', color: '#139B48', shape: 'triangle' },
    { symbol: 'C', label: language === 'ar' ? 'كواشف كيميائية' : 'Chemical Detectors', color: '#139B48', shape: 'triangle' },
    { symbol: 'CO₂', label: language === 'ar' ? 'مستشعرات CO₂' : 'CO₂ Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'CO', label: language === 'ar' ? 'مستشعرات CO' : 'CO Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'O₂', label: language === 'ar' ? 'مستشعرات O₂' : 'O₂ Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'T', label: language === 'ar' ? 'مستشعرات الحرارة' : 'Temperature Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'H', label: language === 'ar' ? 'مستشعرات الرطوبة' : 'Humidity Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'W', label: language === 'ar' ? 'مستشعرات مستوى الماء' : 'Water Level Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'AF', label: language === 'ar' ? 'مستشعرات تدفق الهواء' : 'Airflow Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'F', label: language === 'ar' ? 'مستشعرات الفلتر' : 'Filter Sensors', color: '#139B48', shape: 'circle' },
    { symbol: 'GTV', label: language === 'ar' ? 'صمامات محكمة الغاز' : 'Gastight Valve Sensors', color: '#16a34a', shape: 'rectangle' },
    { symbol: 'Door', label: language === 'ar' ? 'حالة الباب' : 'Door Status', color: '#16a34a', shape: 'rectangle' },
  ];

  const renderShape = (item: typeof legendItems[0]) => {
    const baseClasses = "flex items-center justify-center text-[6px] font-bold text-white border border-black/20";
    
    if (item.shape === 'circle') {
      return (
        <div 
          className={`w-3.5 h-3.5 rounded-full ${baseClasses} flex-shrink-0`}
          style={{ backgroundColor: item.color }}
        >
          <span className="text-[5px]">{item.symbol}</span>
        </div>
      );
    } else if (item.shape === 'triangle') {
      return (
        <div className="w-3.5 h-3.5 relative flex items-center justify-center flex-shrink-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 16 16" fill="none">
            <path 
              d="M8 2 L14 14 L2 14 Z" 
              fill={item.color} 
              stroke="black" 
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          </svg>
          <span className="relative z-10 text-[5px] font-bold text-white mt-0.5">{item.symbol}</span>
        </div>
      );
    } else {
      // rectangle
      return (
        <div 
          className={`w-5 h-2.5 rounded-sm ${baseClasses} flex-shrink-0`}
          style={{ backgroundColor: item.color }}
        >
          <span className="text-[5px]">{item.symbol}</span>
        </div>
      );
    }
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-3">
      <h3 className="text-[10px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
        {language === 'ar' ? 'وسيلة الإيضاح' : 'Legend'}
      </h3>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            {renderShape(item)}
            <span className="text-[9px] text-gray-700 leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sensor Marker Component
const SensorMarker = ({ 
  displayInfo,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave
}: { 
  displayInfo: { subType: string; shape: 'circle' | 'triangle' | 'rectangle'; label: string; color: string };
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const bgColor = isSelected ? '#dc2626' : isHovered ? '#f97316' : displayInfo.color;
  const baseClasses = "border border-black/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all";
  
  if (displayInfo.shape === 'circle') {
    return (
      <div 
        className={`w-2.5 h-2.5 rounded-full ${baseClasses}`}
        style={{ backgroundColor: bgColor }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <span className="text-white text-[5px] font-bold leading-none">{displayInfo.label}</span>
      </div>
    );
  } else if (displayInfo.shape === 'triangle') {
    return (
      <div 
        className="w-3 h-3 relative flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 16 16" fill="none">
          <path 
            d="M8 2 L14 14 L2 14 Z" 
            fill={bgColor}
            stroke="black" 
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
        </svg>
        <span className="relative z-10 text-[6px] font-bold text-white mt-0.5">{displayInfo.label}</span>
      </div>
    );
  } else {
    // rectangle (Door and GTV)
    return (
      <div 
        className={`w-3.5 h-1.5 rounded-sm ${baseClasses}`}
        style={{ backgroundColor: bgColor }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <span className="text-[5px] text-white font-bold leading-none">{displayInfo.label}</span>
      </div>
    );
  }
};

interface Sensor {
  id: string;
  type: string;
  x: number;
  y: number;
}

interface Room {
  id: string;
  name: string;
  floor: number;
  x: number;
  y: number;
  width: number;
  height: number;
  sensors: Sensor[];
}

interface ConceptualFloor {
  id: string;
  name: string;
  description: string;
  floorId: string;
  floorName: string;
  deviceCount: number;
  status: 'draft' | 'active' | 'tested';
}

interface EnhancedLocationSelectorProps {
  language: Language;
  onSelect: (location: string) => void;
  onClose: () => void;
  emergencyMode?: boolean;
  initialMode?: 'real' | 'conceptual';
}

// Real facility floors data
const rooms: Room[] = [
  // FLOOR 2 - Operations (19 rooms) - matches FloorPlanView layout exactly
  // Top left - Command and control area
  { id: 'F2-R1', name: 'Command Center', floor: 2, x: 60, y: 60, width: 240, height: 130,
    sensors: [
      { id: 'S-F2-R1-01', type: 'Temperature', x: 20, y: 20 },
      { id: 'S-F2-R1-02', type: 'Temperature', x: 80, y: 80 },
      { id: 'S-F2-R1-03', type: 'Motion', x: 50, y: 10 },
      { id: 'S-F2-R1-04', type: 'Air Quality', x: 50, y: 90 },
    ]
  },
  { id: 'F2-R2', name: 'Communications', floor: 2, x: 310, y: 60, width: 140, height: 80,
    sensors: [
      { id: 'S-F2-R2-01', type: 'Temperature', x: 50, y: 50 },
      { id: 'S-F2-R2-02', type: 'Motion', x: 30, y: 30 },
    ]
  },
  { id: 'F2-R3', name: 'Server Room', floor: 2, x: 310, y: 150, width: 140, height: 100,
    sensors: [
      { id: 'S-F2-R3-01', type: 'Temperature', x: 50, y: 30 },
      { id: 'S-F2-R3-02', type: 'Humidity', x: 50, y: 70 },
    ]
  },
  
  // Top right - Sector A (Storage area)
  { id: 'F2-R4', name: 'Sector A - Storage 1', floor: 2, x: 470, y: 60, width: 110, height: 95,
    sensors: [
      { id: 'S-F2-R4-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  { id: 'F2-R5', name: 'Sector A - Storage 2', floor: 2, x: 470, y: 165, width: 110, height: 85,
    sensors: [
      { id: 'S-F2-R5-01', type: 'Humidity', x: 50, y: 50 },
    ]
  },
  
  // Top far right - Sector B (INCIDENT AREA - Chemical threat location)
  { id: 'F2-R6', name: 'Sector B - Lab', floor: 2, x: 600, y: 60, width: 250, height: 115,
    sensors: [
      { id: 'S-F2-R6-01', type: 'Chemical', x: 25, y: 30 },
      { id: 'S-F2-R6-02', type: 'Chemical', x: 75, y: 30 },
      { id: 'S-F2-R6-03', type: 'Temperature', x: 50, y: 70 },
      { id: 'S-F2-R6-04', type: 'Pressure', x: 85, y: 85 },
      { id: 'S-F2-R6-05', type: 'Smoke', x: 15, y: 85 },
    ]
  },
  { id: 'F2-R7', name: 'Sector B - Equipment', floor: 2, x: 600, y: 185, width: 160, height: 95,
    sensors: [
      { id: 'S-F2-R7-01', type: 'Chemical', x: 30, y: 40 },
      { id: 'S-F2-R7-02', type: 'Temperature', x: 70, y: 60 },
      { id: 'S-F2-R7-03', type: 'Air Quality', x: 50, y: 80 },
    ]
  },
  { id: 'F2-R8', name: 'Storage Closet', floor: 2, x: 770, y: 185, width: 80, height: 95,
    sensors: [
      { id: 'S-F2-R8-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  
  // Main corridor
  { id: 'F2-R9', name: 'Main Corridor', floor: 2, x: 60, y: 260, width: 790, height: 65,
    sensors: []
  },
  
  // Bottom left - Medical and living
  { id: 'F2-R10', name: 'Medical Bay', floor: 2, x: 60, y: 335, width: 190, height: 175,
    sensors: [
      { id: 'S-F2-R10-01', type: 'Air Quality', x: 30, y: 30 },
      { id: 'S-F2-R10-02', type: 'Temperature', x: 70, y: 30 },
      { id: 'S-F2-R10-03', type: 'Motion', x: 50, y: 15 },
      { id: 'S-F2-R10-04', type: 'Pressure', x: 50, y: 85 },
    ]
  },
  { id: 'F2-R11', name: 'Pharmacy', floor: 2, x: 260, y: 335, width: 90, height: 85,
    sensors: [
      { id: 'S-F2-R11-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  { id: 'F2-R12', name: 'Isolation Room', floor: 2, x: 260, y: 430, width: 90, height: 80,
    sensors: [
      { id: 'S-F2-R12-01', type: 'Pressure', x: 50, y: 50 },
    ]
  },
  
  // Bottom middle - Living quarters
  { id: 'F2-R13', name: 'Living Quarters A', floor: 2, x: 360, y: 335, width: 155, height: 85,
    sensors: [
      { id: 'S-F2-R13-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  { id: 'F2-R14', name: 'Living Quarters B', floor: 2, x: 360, y: 430, width: 155, height: 80,
    sensors: [
      { id: 'S-F2-R14-01', type: 'Motion', x: 50, y: 50 },
    ]
  },
  { id: 'F2-R15', name: 'Bathroom', floor: 2, x: 525, y: 335, width: 75, height: 85,
    sensors: []
  },
  
  // Bottom right - Supply and utilities
  { id: 'F2-R16', name: 'Supply Room', floor: 2, x: 610, y: 335, width: 130, height: 90,
    sensors: [
      { id: 'S-F2-R16-01', type: 'Humidity', x: 50, y: 50 },
    ]
  },
  { id: 'F2-R17', name: 'Utility Room', floor: 2, x: 750, y: 335, width: 100, height: 90,
    sensors: [
      { id: 'S-F2-R17-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  { id: 'F2-R18', name: 'Generator Room', floor: 2, x: 610, y: 435, width: 140, height: 75,
    sensors: [
      { id: 'S-F2-R18-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  { id: 'F2-R19', name: 'Maintenance', floor: 2, x: 760, y: 435, width: 90, height: 75,
    sensors: [
      { id: 'S-F2-R19-01', type: 'Motion', x: 50, y: 50 },
    ]
  },
  
  // FLOOR 1 - Ground Level (18 rooms) - matches FloorPlanView layout exactly
  // Entry area - CBRNe Protection
  { id: 'F1-R1', name: 'Security Checkpoint', floor: 1, x: 60, y: 60, width: 180, height: 110,
    sensors: [
      { id: 'S-F1-R1-01', type: 'Motion', x: 30, y: 50 },
      { id: 'S-F1-R1-02', type: 'Door', x: 70, y: 50 },
    ]
  },
  { id: 'F1-R2', name: 'Airlock Entry', floor: 1, x: 250, y: 60, width: 100, height: 110,
    sensors: [
      { id: 'S-F1-R2-01', type: 'Pressure', x: 50, y: 50 },
    ]
  },
  { id: 'F1-R3', name: 'Decontamination', floor: 1, x: 360, y: 60, width: 160, height: 110,
    sensors: [
      { id: 'S-F1-R3-01', type: 'Chemical', x: 30, y: 50 },
      { id: 'S-F1-R3-02', type: 'Air Quality', x: 70, y: 50 },
    ]
  },
  
  // Command & Control
  { id: 'F1-R4', name: 'Watch Center', floor: 1, x: 530, y: 60, width: 140, height: 75,
    sensors: [
      { id: 'S-F1-R4-01', type: 'Motion', x: 50, y: 50 },
    ]
  },
  { id: 'F1-R5', name: 'Tactical Planning', floor: 1, x: 680, y: 60, width: 170, height: 75,
    sensors: [
      { id: 'S-F1-R5-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  { id: 'F1-R6', name: 'Intelligence Center', floor: 1, x: 530, y: 145, width: 140, height: 85,
    sensors: [
      { id: 'S-F1-R6-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  { id: 'F1-R7', name: 'Communications Hub', floor: 1, x: 680, y: 145, width: 90, height: 85,
    sensors: [
      { id: 'S-F1-R7-01', type: 'Motion', x: 50, y: 50 },
    ]
  },
  { id: 'F1-R8', name: 'Briefing Room', floor: 1, x: 780, y: 145, width: 70, height: 85,
    sensors: [
      { id: 'S-F1-R8-01', type: 'Motion', x: 50, y: 50 },
    ]
  },
  
  // Main corridor
  { id: 'F1-R9', name: 'Main Hallway', floor: 1, x: 60, y: 240, width: 790, height: 70,
    sensors: []
  },
  
  // Weapons & Equipment
  { id: 'F1-R10', name: 'Armory', floor: 1, x: 60, y: 320, width: 120, height: 95,
    sensors: [
      { id: 'S-F1-R10-01', type: 'Motion', x: 50, y: 50 },
      { id: 'S-F1-R10-02', type: 'Door', x: 30, y: 30 },
    ]
  },
  { id: 'F1-R11', name: 'Ammunition Storage', floor: 1, x: 190, y: 320, width: 90, height: 95,
    sensors: [
      { id: 'S-F1-R11-01', type: 'Temperature', x: 50, y: 50 },
      { id: 'S-F1-R11-02', type: 'Humidity', x: 70, y: 70 },
    ]
  },
  { id: 'F1-R12', name: 'NBC Equipment', floor: 1, x: 290, y: 320, width: 140, height: 95,
    sensors: [
      { id: 'S-F1-R12-01', type: 'Chemical', x: 50, y: 50 },
      { id: 'S-F1-R12-02', type: 'Temperature', x: 30, y: 70 },
    ]
  },
  
  // Support Areas
  { id: 'F1-R13', name: 'Equipment Lockers', floor: 1, x: 60, y: 425, width: 120, height: 85,
    sensors: [
      { id: 'S-F1-R13-01', type: 'Motion', x: 50, y: 50 },
    ]
  },
  { id: 'F1-R14', name: 'Rations Supply', floor: 1, x: 190, y: 425, width: 90, height: 85,
    sensors: [
      { id: 'S-F1-R14-01', type: 'Temperature', x: 50, y: 50 },
    ]
  },
  { id: 'F1-R15', name: 'Hazmat Storage', floor: 1, x: 290, y: 425, width: 140, height: 85,
    sensors: [
      { id: 'S-F1-R15-01', type: 'Chemical', x: 50, y: 50 },
      { id: 'S-F1-R15-02', type: 'Leak', x: 70, y: 30 },
    ]
  },
  { id: 'F1-R16', name: 'Emergency Response', floor: 1, x: 440, y: 320, width: 180, height: 190,
    sensors: [
      { id: 'S-F1-R16-01', type: 'Motion', x: 50, y: 30 },
      { id: 'S-F1-R16-02', type: 'Temperature', x: 50, y: 70 },
    ]
  },
  
  // Technical Infrastructure
  { id: 'F1-R17', name: 'Data Center', floor: 1, x: 630, y: 320, width: 120, height: 95,
    sensors: [
      { id: 'S-F1-R17-01', type: 'Temperature', x: 30, y: 50 },
      { id: 'S-F1-R17-02', type: 'Humidity', x: 70, y: 50 },
    ]
  },
  { id: 'F1-R18', name: 'Electrical Room', floor: 1, x: 630, y: 425, width: 220, height: 85,
    sensors: [
      { id: 'S-F1-R18-01', type: 'Temperature', x: 30, y: 50 },
      { id: 'S-F1-R18-02', type: 'Smoke', x: 70, y: 50 },
    ]
  },
];

// Conceptual floor plans data
const conceptualFloors: ConceptualFloor[] = [
  {
    id: 'plan-1',
    name: 'Enhanced Chemical Detection - Floor 2',
    description: 'Added 8 additional chemical detectors to Sector B',
    floorId: 'floor-a-2',
    floorName: 'Floor 2 - Operations',
    deviceCount: 13,
    status: 'tested',
  },
  {
    id: 'plan-2',
    name: 'Ground Floor Security Upgrade',
    description: 'Comprehensive security enhancement',
    floorId: 'floor-a-1',
    floorName: 'Floor 1 - Ground Level',
    deviceCount: 15,
    status: 'active',
  },
  {
    id: 'plan-3',
    name: 'Medical Bay Air Quality Monitoring',
    description: 'Medical-grade air quality sensors',
    floorId: 'floor-a-2',
    floorName: 'Floor 2 - Operations',
    deviceCount: 8,
    status: 'draft',
  },
  {
    id: 'plan-4',
    name: 'Emergency Lighting & Alarms - All Corridors',
    description: 'Strategic placement of emergency lighting',
    floorId: 'floor-a-2',
    floorName: 'Floor 2 - Operations',
    deviceCount: 12,
    status: 'tested',
  },
];

export function EnhancedLocationSelector({ language, onSelect, onClose, emergencyMode, initialMode }: EnhancedLocationSelectorProps) {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);
  const [mode, setMode] = useState<'real' | 'conceptual'>(initialMode || 'real');
  const [selectedConceptualPlan, setSelectedConceptualPlan] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<{ sensor: Sensor; roomName: string } | null>(null);

  const floorsAvailable = [1, 2, 3, 4, 5];
  const currentFloorRooms = rooms.filter(room => room.floor === selectedFloor);
  
  // Check if selected floor has detailed layout
  const hasDetailedLayout = selectedFloor === 1 || selectedFloor === 2;

  // Get the selected conceptual plan details
  const selectedPlan = conceptualFloors.find(p => p.id === selectedConceptualPlan);
  const conceptualPlanFloor = selectedPlan ? parseInt(selectedPlan.floorId.split('-')[2]) : 1;
  const conceptualPlanRooms = selectedPlan ? rooms.filter(room => room.floor === conceptualPlanFloor) : [];
  const conceptualHasDetailedLayout = conceptualPlanFloor === 1 || conceptualPlanFloor === 2;

  // Lock mode to initialMode if provided
  const isModeLocked = !!initialMode;

  const handleSensorClick = (sensor: Sensor, room: Room) => {
    setSelectedRoom(room);
    setSelectedSensor({ sensor, roomName: room.name });
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setSelectedSensor(null);
  };

  const handleSelectDevice = () => {
    if (selectedSensor) {
      onSelect(`${selectedSensor.roomName} - ${selectedSensor.sensor.id}`);
    }
  };

  const handleConceptualPlanSelect = (plan: ConceptualFloor) => {
    onSelect(`${plan.name} (Conceptual)`);
  };

  const getStatusBadge = (status: 'draft' | 'active' | 'tested') => {
    const statusConfig = {
      draft: { icon: Info, color: 'bg-gray-100 text-gray-700 border-gray-300', label: 'Draft' },
      active: { icon: CheckCircle, color: 'bg-green-100 text-green-700 border-green-300', label: 'Active' },
      tested: { icon: CheckCircle, color: 'bg-blue-100 text-blue-700 border-blue-300', label: 'Tested' },
    };
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="size-3" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'ar' ? 'اختر موقع الجهاز' : 'Select Device Location'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-600" />
          </button>
        </div>

        {/* Mode Selector */}
        {!isModeLocked && (
          <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex gap-2">
              <button
                onClick={() => setMode('real')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'real'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                }`}
              >
                <Building2 className="size-4" />
                <div>
                  <div className="font-bold">{language === 'ar' ? 'الطوابق الحقيقية' : 'Real Floors'}</div>
                </div>
              </button>
              <button
                onClick={() => setMode('conceptual')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  mode === 'conceptual'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-400'
                }`}
              >
                <Layers className="size-4" />
                <div>
                  <div className="font-bold">{language === 'ar' ? 'المخططات المفاهيمية' : 'Conceptual Plans'}</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Mode indicator badge when locked */}
        {isModeLocked && (
          <div className="px-5 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-center gap-2">
              {mode === 'real' ? (
                <>
                  <Building2 className="size-5 text-blue-600" />
                  <span className="font-bold text-sm text-gray-900">
                    {language === 'ar' ? 'الطوابق الحقيقية' : 'Actual Facility Mode'}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {language === 'ar' ? 'محدد' : 'Selected'}
                  </span>
                </>
              ) : (
                <>
                  <Layers className="size-5 text-indigo-600" />
                  <span className="font-bold text-sm text-gray-900">
                    {language === 'ar' ? 'المخططات المفاهيمية' : 'Conceptual Floors Mode'}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    {language === 'ar' ? 'محدد' : 'Selected'}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {mode === 'real' ? (
            <div className="space-y-4">
              {/* Floor Plan Visualization */}
              <div className="grid grid-cols-2 gap-4">
                {/* LEFT: Floor Plan */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  {!hasDetailedLayout ? (
                    // Show message for floors without detailed layout
                    <div className="w-full h-[400px] border border-gray-300 rounded-lg bg-white flex items-center justify-center">
                      <div className="text-center p-8">
                        <Building2 className="size-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          {language === 'ar' ? 'المخطط التفصيلي غير متوفر' : 'Detailed Layout Not Available'}
                        </p>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto">
                          {language === 'ar' 
                            ? `الطابق ${selectedFloor} موجود في المنشأة ولكن المخطط التفصيل قيد الإنشاء`
                            : `Floor ${selectedFloor} exists in the facility but detailed layout is under construction`}
                        </p>
                        <div className="mt-4 text-xs text-gray-600">
                          {language === 'ar' 
                            ? 'استخدم المخططات المفاهيمية للوصول إلى هذا الطابق'
                            : 'Use Conceptual Plans to access this floor'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[400px] border border-gray-300 rounded-lg bg-white overflow-hidden relative">
                      {/* Floor Plan Image */}
                      <img 
                        src={floorPlanImage}
                        alt="Floor Plan"
                        className="w-full h-full object-contain"
                      />
                      
                      {/* Sensor Overlays */}
                      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
                        {(() => {
                          // Group sensors by position
                          const sensorGroups = new Map<string, FloorPlanSensor[]>();
                          allFloorPlanSensors.forEach(sensor => {
                            const key = `${sensor.left}-${sensor.top}`;
                            if (!sensorGroups.has(key)) {
                              sensorGroups.set(key, []);
                            }
                            sensorGroups.get(key)!.push(sensor);
                          });
                          
                          return Array.from(sensorGroups.entries()).map(([posKey, sensors]) => {
                            const firstSensor = sensors[0];
                            const isTriangleGroup = firstSensor.shape === 'triangle';
                            const isCircleGroup = firstSensor.shape === 'circle' && sensors.length > 1;
                            
                            return (
                              <div
                                key={posKey}
                                className={`absolute flex items-center ${isTriangleGroup ? '-space-x-1' : isCircleGroup ? 'gap-0' : ''}`}
                                style={{ 
                                  left: firstSensor.left, 
                                  top: firstSensor.top,
                                  transform: 'translate(-50%, -50%)',
                                  pointerEvents: 'auto'
                                }}
                              >
                                {sensors.map((sensor) => {
                                  const isHovered = hoveredSensor === sensor.id;
                                  const isSensorSelected = selectedSensor?.sensor.id === sensor.id;
                                  
                                  return (
                                    <div
                                      key={sensor.id}
                                      onMouseEnter={() => setHoveredSensor(sensor.id)}
                                      onMouseLeave={() => setHoveredSensor(null)}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSensorClick({ 
                                          id: sensor.id, 
                                          type: sensor.subType, 
                                          x: 0, 
                                          y: 0 
                                        }, { 
                                          id: 'floor-plan', 
                                          name: sensor.name, 
                                          floor: 2, 
                                          x: 0, 
                                          y: 0, 
                                          width: 0, 
                                          height: 0, 
                                          sensors: [] 
                                        });
                                      }}
                                    >
                                      <SensorMarker
                                        displayInfo={{
                                          subType: sensor.subType,
                                          shape: sensor.shape,
                                          label: sensor.label,
                                          color: sensor.color
                                        }}
                                        isSelected={isSensorSelected}
                                        isHovered={isHovered}
                                        onClick={() => handleSensorClick({ 
                                          id: sensor.id, 
                                          type: sensor.subType, 
                                          x: 0, 
                                          y: 0 
                                        }, { 
                                          id: 'floor-plan', 
                                          name: sensor.name, 
                                          floor: 2, 
                                          x: 0, 
                                          y: 0, 
                                          width: 0, 
                                          height: 0, 
                                          sensors: [] 
                                        })}
                                        onMouseEnter={() => setHoveredSensor(sensor.id)}
                                        onMouseLeave={() => setHoveredSensor(null)}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT: Device Details Card Only */}
                {hasDetailedLayout && (
                  <div className="space-y-4">
                    {/* Legend */}
                    <SensorLegend language={language} />
                    
                    {/* Device Details Card */}
                    <div className={`rounded-lg p-4 border-2 ${selectedSensor ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300' : 'bg-white border-gray-300'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className={`size-5 ${selectedSensor ? 'text-blue-600' : 'text-gray-600'}`} />
                        <div>
                          <div className="text-xs text-gray-600">{language === 'ar' ? 'جهاز' : 'Device'}</div>
                          <div className="font-bold text-gray-900 text-sm">
                            {selectedSensor ? selectedSensor.sensor.id : (language === 'ar' ? 'لم يتم تحديد' : 'Not selected')}
                          </div>
                        </div>
                      </div>
                      
                      {selectedSensor ? (
                        <>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">{language === 'ar' ? 'النوع' : 'Type'}:</span>
                              <span className="font-semibold text-gray-900">{selectedSensor.sensor.type}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">{language === 'ar' ? 'الموقع' : 'Location'}:</span>
                              <span className="font-semibold text-gray-900 text-right">{selectedSensor.roomName}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">{language === 'ar' ? 'الطابق' : 'Floor'}:</span>
                              <span className="font-semibold text-gray-900">
                                {language === 'ar' ? `الطابق ${selectedFloor}` : `Floor ${selectedFloor}`}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={handleSelectDevice}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <CheckCircle className="size-4" />
                            {language === 'ar' ? 'اختر هذا الجهاز' : 'Select This Device'}
                          </button>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <Activity className="size-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">
                            {language === 'ar' ? 'انقر على جهاز في المخطط' : 'Click on a device in the floor plan'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Conceptual Plan Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'اختر المخطط:' : 'Select Plan:'}
                </label>
                <select
                  value={selectedConceptualPlan || ''}
                  onChange={(e) => {
                    setSelectedConceptualPlan(e.target.value);
                    setSelectedRoom(null);
                    setSelectedSensor(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg font-semibold text-sm text-gray-900 hover:border-indigo-400 focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  <option value="">
                    {language === 'ar' ? 'اختر مخطط مفاهيمي...' : 'Select a conceptual plan...'}
                  </option>
                  {conceptualFloors.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Floor Plan Visualization (same as Real Floors) */}
              {selectedPlan && (
                <div className="grid grid-cols-2 gap-4">
                  {/* LEFT: Floor Plan */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-indigo-600 font-medium">
                        {selectedPlan.name}
                      </p>
                      {conceptualHasDetailedLayout && (
                        <div className="flex items-center gap-2 text-[10px] text-gray-600">
                          <div className="flex items-center gap-1">
                            <div className="size-2 rounded-full bg-blue-600 border border-white" />
                            <span>{language === 'ar' ? 'جهاز' : 'Device'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="size-2 rounded-full bg-red-600 border border-white" />
                            <span>{language === 'ar' ? 'محدد' : 'Selected'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!conceptualHasDetailedLayout ? (
                      // Show message for floors without detailed layout
                      <div className="w-full h-[400px] border border-gray-300 rounded-lg bg-white flex items-center justify-center">
                        <div className="text-center p-8">
                          <Layers className="size-16 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            {language === 'ar' ? 'المخطط التفصيلي غير متوفر' : 'Detailed Layout Not Available'}
                          </p>
                          <p className="text-xs text-gray-500 max-w-xs mx-auto">
                            {language === 'ar' 
                              ? `الطابق ${conceptualPlanFloor} موجود في المنشأة ولكن المخطط التفصيلي قيد الإنشاء`
                              : `Floor ${conceptualPlanFloor} exists in the facility but detailed layout is under construction`}
                          </p>
                          <div className="mt-4 text-xs text-indigo-600 font-medium">
                            {language === 'ar' 
                              ? 'سيتم عرض هذا المخطط المفاهيمي هنا بعد الموافقة عليه'
                              : 'This conceptual plan will be displayed here after approval'}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[400px] border border-gray-300 rounded-lg bg-white overflow-hidden relative">
                        {/* Floor Plan Image */}
                        <img 
                          src={floorPlanImage}
                          alt="Floor Plan"
                          className="w-full h-full object-contain"
                        />
                        
                        {/* Sensor Overlays */}
                        <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
                          {(() => {
                            // Group sensors by position
                            const sensorGroups = new Map<string, FloorPlanSensor[]>();
                            allFloorPlanSensors.forEach(sensor => {
                              const key = `${sensor.left}-${sensor.top}`;
                              if (!sensorGroups.has(key)) {
                                sensorGroups.set(key, []);
                              }
                              sensorGroups.get(key)!.push(sensor);
                            });
                            
                            return Array.from(sensorGroups.entries()).map(([posKey, sensors]) => {
                              const firstSensor = sensors[0];
                              const isTriangleGroup = firstSensor.shape === 'triangle';
                              const isCircleGroup = firstSensor.shape === 'circle' && sensors.length > 1;
                              
                              return (
                                <div
                                  key={posKey}
                                  className={`absolute flex items-center ${isTriangleGroup ? '-space-x-1' : isCircleGroup ? 'gap-0' : ''}`}
                                  style={{ 
                                    left: firstSensor.left, 
                                    top: firstSensor.top,
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'auto'
                                  }}
                                >
                                  {sensors.map((sensor) => {
                                    const isHovered = hoveredSensor === sensor.id;
                                    const isSensorSelected = selectedSensor?.sensor.id === sensor.id;
                                    
                                    return (
                                      <div
                                        key={sensor.id}
                                        onMouseEnter={() => setHoveredSensor(sensor.id)}
                                        onMouseLeave={() => setHoveredSensor(null)}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSensorClick({ 
                                            id: sensor.id, 
                                            type: sensor.subType, 
                                            x: 0, 
                                            y: 0 
                                          }, { 
                                            id: 'floor-plan', 
                                            name: sensor.name, 
                                            floor: 2, 
                                            x: 0, 
                                            y: 0, 
                                            width: 0, 
                                            height: 0, 
                                            sensors: [] 
                                          });
                                        }}
                                      >
                                        <SensorMarker
                                          displayInfo={{
                                            subType: sensor.subType,
                                            shape: sensor.shape,
                                            label: sensor.label,
                                            color: sensor.color
                                          }}
                                          isSelected={isSensorSelected}
                                          isHovered={isHovered}
                                          onClick={() => handleSensorClick({ 
                                            id: sensor.id, 
                                            type: sensor.subType, 
                                            x: 0, 
                                            y: 0 
                                          }, { 
                                            id: 'floor-plan', 
                                            name: sensor.name, 
                                            floor: 2, 
                                            x: 0, 
                                            y: 0, 
                                            width: 0, 
                                            height: 0, 
                                            sensors: [] 
                                          })}
                                          onMouseEnter={() => setHoveredSensor(sensor.id)}
                                          onMouseLeave={() => setHoveredSensor(null)}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RIGHT: Device Details Card Only */}
                  {conceptualHasDetailedLayout && (
                    <div className="space-y-4">
                      {/* Legend */}
                      <SensorLegend language={language} />
                      
                      {/* Device Details Card */}
                      <div className={`rounded-lg p-4 border-2 ${selectedSensor ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300' : 'bg-white border-gray-300'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <Activity className={`size-5 ${selectedSensor ? 'text-indigo-600' : 'text-gray-600'}`} />
                          <div>
                            <div className="text-xs text-gray-600">{language === 'ar' ? 'جهاز' : 'Device'}</div>
                            <div className="font-bold text-gray-900 text-sm">
                              {selectedSensor ? selectedSensor.sensor.id : (language === 'ar' ? 'لم يتم تحديد' : 'Not selected')}
                            </div>
                          </div>
                        </div>
                        
                        {selectedSensor ? (
                          <>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{language === 'ar' ? 'النوع' : 'Type'}:</span>
                                <span className="font-semibold text-gray-900">{selectedSensor.sensor.type}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{language === 'ar' ? 'الموقع' : 'Location'}:</span>
                                <span className="font-semibold text-gray-900 text-right">{selectedSensor.roomName}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{language === 'ar' ? 'الطابق' : 'Floor'}:</span>
                                <span className="font-semibold text-gray-900">
                                  {language === 'ar' ? `الطابق ${conceptualPlanFloor}` : `Floor ${conceptualPlanFloor}`}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">{language === 'ar' ? 'المخطط' : 'Plan'}:</span>
                                <span className="font-semibold text-indigo-600 text-right text-[10px]">{selectedPlan.name}</span>
                              </div>
                            </div>

                            <button
                              onClick={handleSelectDevice}
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                              <CheckCircle className="size-4" />
                              {language === 'ar' ? 'اختر هذا الجهاز' : 'Select This Device'}
                            </button>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <Activity className="size-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">
                              {language === 'ar' ? 'انقر على جهاز في المخطط' : 'Click on a device in the floor plan'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* No Plan Selected State */}
              {!selectedPlan && (
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Layers className="size-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    {language === 'ar' ? 'لم يتم اختيار مخطط' : 'No Conceptual Plan Selected'}
                  </p>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    {language === 'ar' 
                      ? 'اختر مخطط مفاهيمي من القائمة المنسدلة أعلاه لعرض مخطط الطابق والأجهزة' 
                      : 'Select a conceptual plan from the dropdown above to view the floor layout and devices'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}