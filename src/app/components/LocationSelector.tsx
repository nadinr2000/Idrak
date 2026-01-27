import { X, MapPin, Activity, Radio } from 'lucide-react';
import { Language, translations } from '../translations';
import { useState } from 'react';
import { BuildingDiagram3D } from './BuildingDiagram3D';
import floorPlanImage from 'figma:asset/a1d7c50be4149c7263d7de092815c8c8d9377172.png';

interface Sensor {
  id: string;
  type: string;
  x: number; // Position within room (percentage)
  y: number; // Position within room (percentage)
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

interface LocationSelectorProps {
  language: Language;
  onSelect: (location: string) => void;
  onClose: () => void;
  emergencyMode?: boolean;
}

const rooms: Room[] = [
  // Floor 1
  { 
    id: 'f1-r1', 
    name: 'Command Center', 
    floor: 1, 
    x: 20, 
    y: 20, 
    width: 120, 
    height: 80,
    sensors: [
      { id: 'CMD-TEMP-01', type: 'Temperature', x: 30, y: 30 },
      { id: 'CMD-MOT-01', type: 'Motion', x: 70, y: 70 },
      { id: 'CMD-AIR-01', type: 'Air Quality', x: 50, y: 50 }
    ]
  },
  { 
    id: 'f1-r2', 
    name: 'Armory', 
    floor: 1, 
    x: 160, 
    y: 20, 
    width: 80, 
    height: 40,
    sensors: [
      { id: 'ARM-MOT-01', type: 'Motion', x: 50, y: 50 },
      { id: 'ARM-TEMP-01', type: 'Temperature', x: 30, y: 30 }
    ]
  },
  { 
    id: 'f1-r3', 
    name: 'Storage A', 
    floor: 1, 
    x: 260, 
    y: 20, 
    width: 80, 
    height: 40,
    sensors: [
      { id: 'STA-HUM-01', type: 'Humidity', x: 50, y: 50 }
    ]
  },
  { 
    id: 'f1-r4', 
    name: 'Decontamination', 
    floor: 1, 
    x: 20, 
    y: 120, 
    width: 100, 
    height: 70,
    sensors: [
      { id: 'DEC-CHEM-01', type: 'Chemical', x: 30, y: 30 },
      { id: 'DEC-AIR-01', type: 'Air Quality', x: 70, y: 70 }
    ]
  },
  { 
    id: 'f1-r5', 
    name: 'Medical Bay', 
    floor: 1, 
    x: 140, 
    y: 80, 
    width: 100, 
    height: 110,
    sensors: [
      { id: 'MED-TEMP-01', type: 'Temperature', x: 30, y: 25 },
      { id: 'MED-AIR-01', type: 'Air Quality', x: 70, y: 25 },
      { id: 'MED-MOT-01', type: 'Motion', x: 50, y: 75 }
    ]
  },
  { 
    id: 'f1-r6', 
    name: 'Utility', 
    floor: 1, 
    x: 260, 
    y: 80, 
    width: 80, 
    height: 110,
    sensors: [
      { id: 'UTL-TEMP-01', type: 'Temperature', x: 50, y: 30 },
      { id: 'UTL-LEAK-01', type: 'Water Leak', x: 50, y: 70 }
    ]
  },
  
  // Floor 2
  { 
    id: 'f2-r1', 
    name: 'HVAC Control', 
    floor: 2, 
    x: 20, 
    y: 20, 
    width: 100, 
    height: 70,
    sensors: [
      { id: 'HVAC-FLOW-01', type: 'Airflow', x: 30, y: 50 },
      { id: 'HVAC-TEMP-01', type: 'Temperature', x: 70, y: 50 }
    ]
  },
  { 
    id: 'f2-r2', 
    name: 'Sector B - Room 201', 
    floor: 2, 
    x: 140, 
    y: 20, 
    width: 60, 
    height: 50,
    sensors: [
      { id: 'CHM-B-201', type: 'Chemical', x: 30, y: 30 },
      { id: 'AQ-B-201', type: 'Air Quality', x: 70, y: 70 }
    ]
  },
  { 
    id: 'f2-r3', 
    name: 'Sector B - Room 202', 
    floor: 2, 
    x: 220, 
    y: 20, 
    width: 60, 
    height: 50,
    sensors: [
      { id: 'CHM-B-202', type: 'Chemical', x: 50, y: 30 },
      { id: 'AQ-B-202', type: 'Air Quality', x: 50, y: 70 }
    ]
  },
  { 
    id: 'f2-r4', 
    name: 'Sector B - Room 203', 
    floor: 2, 
    x: 300, 
    y: 20, 
    width: 40, 
    height: 50,
    sensors: [
      { id: 'CHM-B-203', type: 'Chemical', x: 50, y: 50 }
    ]
  },
  { 
    id: 'f2-r5', 
    name: 'Sector A - Storage', 
    floor: 2, 
    x: 20, 
    y: 110, 
    width: 100, 
    height: 80,
    sensors: [
      { id: 'STA-TEMP-01', type: 'Temperature', x: 30, y: 30 },
      { id: 'STA-HUM-01', type: 'Humidity', x: 70, y: 70 }
    ]
  },
  { 
    id: 'f2-r6', 
    name: 'Sector C - Operations', 
    floor: 2, 
    x: 140, 
    y: 90, 
    width: 200, 
    height: 100,
    sensors: [
      { id: 'OPS-MOT-01', type: 'Motion', x: 25, y: 30 },
      { id: 'OPS-AIR-01', type: 'Air Quality', x: 75, y: 70 },
      { id: 'OPS-TEMP-01', type: 'Temperature', x: 50, y: 50 }
    ]
  },
  
  // Floor 3
  { 
    id: 'f3-r1', 
    name: 'Secure Wing', 
    floor: 3, 
    x: 20, 
    y: 20, 
    width: 150, 
    height: 90,
    sensors: [
      { id: 'SEC-MOT-01', type: 'Motion', x: 30, y: 30 },
      { id: 'SEC-DOOR-01', type: 'Door', x: 70, y: 70 }
    ]
  },
  { 
    id: 'f3-r2', 
    name: 'Living Quarters', 
    floor: 3, 
    x: 190, 
    y: 20, 
    width: 150, 
    height: 90,
    sensors: [
      { id: 'LIV-TEMP-01', type: 'Temperature', x: 30, y: 50 },
      { id: 'LIV-AIR-01', type: 'Air Quality', x: 70, y: 50 }
    ]
  },
  { 
    id: 'f3-r3', 
    name: 'Mess Hall', 
    floor: 3, 
    x: 20, 
    y: 130, 
    width: 140, 
    height: 60,
    sensors: [
      { id: 'MES-TEMP-01', type: 'Temperature', x: 50, y: 50 }
    ]
  },
  { 
    id: 'f3-r4', 
    name: 'Recreation', 
    floor: 3, 
    x: 180, 
    y: 130, 
    width: 160, 
    height: 60,
    sensors: [
      { id: 'REC-MOT-01', type: 'Motion', x: 50, y: 50 }
    ]
  },
];

export function LocationSelector({ language, onSelect, onClose, emergencyMode }: LocationSelectorProps) {
  const t = translations[language];
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);

  const currentFloorRooms = rooms.filter(r => r.floor === selectedFloor);

  const handleRoomClick = (room: Room) => {
    const location = `Floor ${room.floor} - ${room.name}`;
    onSelect(location);
  };

  const handleSensorClick = (room: Room, sensor: Sensor) => {
    const location = `Floor ${room.floor} - ${room.name} - ${sensor.id}`;
    onSelect(location);
    onClose();
  };

  const getSensorColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Temperature': '#ef4444',
      'Motion': '#8b5cf6',
      'Air Quality': '#10b981',
      'Humidity': '#3b82f6',
      'Chemical': '#f59e0b',
      'Water Leak': '#06b6d4',
      'Airflow': '#6366f1',
      'Door': '#ec4899',
    };
    return colors[type] || '#6b7280';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Activity className="size-6 text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{t.selectDevice}</h3>
              <p className="text-sm text-gray-600">{t.clickToSelectDevice}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Floor Selector */}
        <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-200">
          {[1, 2, 3].map(floor => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedFloor === floor
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {language === 'ar' ? `الطابق ${floor}` : `Floor ${floor}`}
            </button>
          ))}
        </div>

        {/* 3D Building View */}
        <div className="px-6 pt-6 pb-4">
          <BuildingDiagram3D 
            onFloorClick={(floorId) => {
              // Extract floor number from floorId (e.g., "floor-a-2" -> 2)
              const floorNum = parseInt(floorId.split('-')[2]);
              setSelectedFloor(floorNum);
            }}
            language={language}
            emergencyMode={emergencyMode}
          />
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-3 gap-6">
          {/* Floor Plan */}
          <div className="col-span-2">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-300">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">
                  {language === 'ar' ? `خطة الطابق ${selectedFloor}` : `Floor ${selectedFloor} Plan`}
                </h4>
              </div>
              
              {/* Floor Plan Image from Screenshot */}
              <div className="bg-white rounded border border-gray-300 overflow-hidden">
                <img 
                  src={floorPlanImage} 
                  alt="Military Bunker Floor Plan" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Room & Sensor List */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3">
              {language === 'ar' ? 'الغرف والأجهزة' : 'Rooms & Devices'}
            </h4>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {currentFloorRooms.map(room => (
                <div
                  key={room.id}
                  className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
                    hoveredRoom === room.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => handleRoomClick(room)}
                >
                  {/* Room Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-blue-600 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-sm">{room.name}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-100 px-2 py-0.5 rounded-full">
                      <Activity className="size-3 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600">{room.sensors.length}</span>
                    </div>
                  </div>
                  
                  {/* Sensors */}
                  <div className="space-y-1 pl-6">
                    {room.sensors.map(sensor => (
                      <button
                        key={sensor.id}
                        className={`w-full text-left text-xs p-2 rounded transition-all flex items-center gap-2 ${
                          hoveredSensor === sensor.id
                            ? 'bg-white shadow-sm border border-gray-200'
                            : 'hover:bg-gray-50'
                        }`}
                        onMouseEnter={() => setHoveredSensor(sensor.id)}
                        onMouseLeave={() => setHoveredSensor(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSensorClick(room, sensor);
                        }}
                      >
                        <div
                          className="size-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getSensorColor(sensor.type) }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{sensor.id}</div>
                          <div className="text-gray-500">{sensor.type}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}