import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Activity, 
  Camera, 
  AlertTriangle,
  Flame,
  Radio,
  Video,
  Lock,
  Eye,
  Zap,
  FlaskConical,
  Wifi,
  Plus,
  Save,
  Play,
  RotateCcw,
  ChevronRight,
  Grid3x3,
  Lightbulb,
  Fan,
  X,
  Layers
} from 'lucide-react';
import { Language } from '../translations';

interface DeviceType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'sensor' | 'equipment' | 'safety';
  color: string;
}

interface PlacedDevice {
  id: string;
  deviceType: DeviceType;
  position: { x: number; y: number };
  name: string;
}

interface Room {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: 'operational' | 'warning' | 'critical';
}

interface NewFloorSetupViewProps {
  language?: Language;
  planId?: string | null;
  onBack?: () => void;
}

const DEVICE_LIBRARY: DeviceType[] = [
  // Sensors
  { id: 'temp-sensor', name: 'Temperature Sensor', icon: Thermometer, category: 'sensor', color: 'bg-blue-500' },
  { id: 'humidity-sensor', name: 'Humidity Sensor', icon: Droplets, category: 'sensor', color: 'bg-cyan-500' },
  { id: 'air-quality', name: 'Air Quality Sensor', icon: Wind, category: 'sensor', color: 'bg-green-500' },
  { id: 'chemical-detector', name: 'Chemical Detector', icon: FlaskConical, category: 'sensor', color: 'bg-purple-500' },
  { id: 'motion-sensor', name: 'Motion Sensor', icon: Activity, category: 'sensor', color: 'bg-orange-500' },
  { id: 'radiation-sensor', name: 'Radiation Sensor', icon: Radio, category: 'sensor', color: 'bg-yellow-500' },
  
  // Equipment
  { id: 'camera', name: 'Security Camera', icon: Camera, category: 'equipment', color: 'bg-gray-600' },
  { id: 'hvac', name: 'HVAC Unit', icon: Fan, category: 'equipment', color: 'bg-indigo-500' },
  { id: 'lighting', name: 'Smart Lighting', icon: Lightbulb, category: 'equipment', color: 'bg-amber-500' },
  { id: 'access-control', name: 'Access Control', icon: Lock, category: 'equipment', color: 'bg-red-600' },
  
  // Safety
  { id: 'fire-alarm', name: 'Fire Alarm', icon: Flame, category: 'safety', color: 'bg-red-500' },
  { id: 'emergency-light', name: 'Emergency Light', icon: Zap, category: 'safety', color: 'bg-yellow-600' },
  { id: 'gas-shutoff', name: 'Gas Shutoff Valve', icon: AlertTriangle, category: 'safety', color: 'bg-orange-600' },
];

const FLOORS = [
  { id: 'floor-a-1', name: 'Ground Level', rooms: 18 },
  { id: 'floor-a-2', name: 'Operations', rooms: 19 },
  { id: 'floor-a-3', name: 'Storage', rooms: 12 },
  { id: 'floor-b-1', name: 'Utilities', rooms: 10 },
];

// Define rooms for each floor (same as FloorPlanView)
const FLOOR_ROOMS: Record<string, Room[]> = {
  'floor-a-2': [
    { id: 'F2-R1', name: 'Command Center', type: 'Control Room', x: 60, y: 60, width: 240, height: 130, status: 'operational' },
    { id: 'F2-R2', name: 'Communications', type: 'Comm Room', x: 310, y: 60, width: 140, height: 80, status: 'operational' },
    { id: 'F2-R3', name: 'Server Room', type: 'IT', x: 310, y: 150, width: 140, height: 100, status: 'operational' },
    { id: 'F2-R4', name: 'Sector A - Storage 1', type: 'Storage', x: 470, y: 60, width: 110, height: 95, status: 'operational' },
    { id: 'F2-R5', name: 'Sector A - Storage 2', type: 'Storage', x: 470, y: 165, width: 110, height: 85, status: 'operational' },
    { id: 'F2-R6', name: 'Sector B - Lab', type: 'Laboratory', x: 600, y: 60, width: 250, height: 115, status: 'operational' },
    { id: 'F2-R7', name: 'Sector B - Equipment', type: 'Equipment', x: 600, y: 185, width: 160, height: 95, status: 'operational' },
    { id: 'F2-R8', name: 'Storage Closet', type: 'Storage', x: 770, y: 185, width: 80, height: 95, status: 'operational' },
    { id: 'F2-R9', name: 'Main Corridor', type: 'Hallway', x: 60, y: 260, width: 790, height: 65, status: 'operational' },
    { id: 'F2-R10', name: 'Medical Bay', type: 'Medical', x: 60, y: 335, width: 190, height: 175, status: 'operational' },
    { id: 'F2-R11', name: 'Pharmacy', type: 'Medical Storage', x: 260, y: 335, width: 90, height: 85, status: 'operational' },
    { id: 'F2-R12', name: 'Isolation Room', type: 'Medical', x: 260, y: 430, width: 90, height: 80, status: 'operational' },
    { id: 'F2-R13', name: 'Living Quarters A', type: 'Dormitory', x: 360, y: 335, width: 155, height: 85, status: 'operational' },
    { id: 'F2-R14', name: 'Living Quarters B', type: 'Dormitory', x: 360, y: 430, width: 155, height: 80, status: 'operational' },
    { id: 'F2-R15', name: 'Bathroom', type: 'Facilities', x: 525, y: 335, width: 75, height: 85, status: 'operational' },
    { id: 'F2-R16', name: 'Supply Room', type: 'Storage', x: 610, y: 335, width: 130, height: 90, status: 'operational' },
    { id: 'F2-R17', name: 'Utility Room', type: 'Utilities', x: 750, y: 335, width: 100, height: 90, status: 'operational' },
    { id: 'F2-R18', name: 'Generator Room', type: 'Power', x: 610, y: 435, width: 140, height: 75, status: 'operational' },
    { id: 'F2-R19', name: 'Maintenance', type: 'Workshop', x: 760, y: 435, width: 90, height: 75, status: 'operational' },
  ],
  'floor-a-1': [
    { id: 'F1-R1', name: 'Security Checkpoint', type: 'Security', x: 60, y: 60, width: 180, height: 110, status: 'operational' },
    { id: 'F1-R2', name: 'Airlock Entry', type: 'Airlock', x: 250, y: 60, width: 100, height: 110, status: 'operational' },
    { id: 'F1-R3', name: 'Decontamination', type: 'Decon Chamber', x: 360, y: 60, width: 160, height: 110, status: 'operational' },
    { id: 'F1-R4', name: 'Watch Center', type: 'Operations', x: 530, y: 60, width: 140, height: 75, status: 'operational' },
    { id: 'F1-R5', name: 'Tactical Planning', type: 'Planning Room', x: 680, y: 60, width: 170, height: 75, status: 'operational' },
    { id: 'F1-R6', name: 'Intelligence Center', type: 'Intel Analysis', x: 530, y: 145, width: 140, height: 85, status: 'operational' },
    { id: 'F1-R7', name: 'Communications Hub', type: 'Comm Center', x: 680, y: 145, width: 90, height: 85, status: 'operational' },
    { id: 'F1-R8', name: 'Briefing Room', type: 'Briefing', x: 780, y: 145, width: 70, height: 85, status: 'operational' },
    { id: 'F1-R9', name: 'Main Hallway', type: 'Hallway', x: 60, y: 240, width: 790, height: 70, status: 'operational' },
    { id: 'F1-R10', name: 'Armory', type: 'Weapons Storage', x: 60, y: 320, width: 120, height: 95, status: 'operational' },
    { id: 'F1-R11', name: 'Ammunition Storage', type: 'Ammo Vault', x: 190, y: 320, width: 90, height: 95, status: 'operational' },
    { id: 'F1-R12', name: 'NBC Equipment', type: 'CBRN Storage', x: 290, y: 320, width: 140, height: 95, status: 'operational' },
    { id: 'F1-R13', name: 'Equipment Lockers', type: 'Gear Storage', x: 60, y: 425, width: 120, height: 85, status: 'operational' },
    { id: 'F1-R14', name: 'Rations Supply', type: 'Supply Depot', x: 190, y: 425, width: 90, height: 85, status: 'operational' },
    { id: 'F1-R15', name: 'Hazmat Storage', type: 'Hazmat Vault', x: 290, y: 425, width: 140, height: 85, status: 'operational' },
    { id: 'F1-R16', name: 'Emergency Response', type: 'Staging Area', x: 440, y: 320, width: 180, height: 190, status: 'operational' },
    { id: 'F1-R17', name: 'Data Center', type: 'IT Infrastructure', x: 630, y: 320, width: 120, height: 95, status: 'operational' },
    { id: 'F1-R18', name: 'Electrical Room', type: 'Power Distribution', x: 630, y: 425, width: 220, height: 85, status: 'operational' },
  ],
};

// Mock existing devices for each floor
const EXISTING_DEVICES: Record<string, PlacedDevice[]> = {
  'floor-a-2': [
    { id: 'existing-1', deviceType: DEVICE_LIBRARY[0], position: { x: 150, y: 110 }, name: 'Temp Sensor 1' },
    { id: 'existing-2', deviceType: DEVICE_LIBRARY[3], position: { x: 720, y: 110 }, name: 'Chemical Detector 1' },
    { id: 'existing-3', deviceType: DEVICE_LIBRARY[6], position: { x: 180, y: 120 }, name: 'Security Camera 1' },
    { id: 'existing-4', deviceType: DEVICE_LIBRARY[4], position: { x: 380, y: 110 }, name: 'Motion Sensor 1' },
    { id: 'existing-5', deviceType: DEVICE_LIBRARY[10], position: { x: 200, y: 400 }, name: 'Fire Alarm 1' },
  ],
  'floor-a-1': [
    { id: 'existing-1', deviceType: DEVICE_LIBRARY[6], position: { x: 150, y: 110 }, name: 'Security Camera 1' },
    { id: 'existing-2', deviceType: DEVICE_LIBRARY[9], position: { x: 260, y: 110 }, name: 'Access Control 1' },
    { id: 'existing-3', deviceType: DEVICE_LIBRARY[0], position: { x: 600, y: 100 }, name: 'Temp Sensor 1' },
  ],
};

// Draggable device from library
function DraggableDevice({ device }: { device: DeviceType }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'device',
    item: { device },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const IconComponent = device.icon;

  return (
    <div
      ref={drag}
      className={`flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg cursor-move hover:border-purple-400 hover:shadow-md transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className={`${device.color} text-white p-2 rounded-lg flex-shrink-0`}>
        <IconComponent className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{device.name}</p>
        <p className="text-xs text-gray-500 capitalize">{device.category}</p>
      </div>
    </div>
  );
}

// Placed device on floor plan
function PlacedDeviceComponent({ 
  device, 
  onRemove,
  isSelected,
  onClick
}: { 
  device: PlacedDevice;
  onRemove: () => void;
  isSelected: boolean;
  onClick: () => void;
}) {
  const IconComponent = device.deviceType.icon;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'placed-device',
    item: { deviceId: device.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <g>
      <g
        ref={drag}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <circle
          cx={device.position.x}
          cy={device.position.y}
          r={isSelected ? 18 : 16}
          fill="white"
          stroke={isSelected ? '#9333ea' : '#374151'}
          strokeWidth={isSelected ? 3 : 2}
          className="transition-all"
        />
        <foreignObject
          x={device.position.x - 12}
          y={device.position.y - 12}
          width={24}
          height={24}
          className="pointer-events-none"
        >
          <div className={`${device.deviceType.color} text-white rounded-full p-1 flex items-center justify-center`}>
            <IconComponent className="size-4" />
          </div>
        </foreignObject>
        
        {/* Device label */}
        <text
          x={device.position.x}
          y={device.position.y + 30}
          fontSize="10"
          fontWeight="600"
          fill={isSelected ? '#9333ea' : '#1f2937'}
          textAnchor="middle"
          className="pointer-events-none"
        >
          {device.name}
        </text>
      </g>

      {/* Delete button when selected */}
      {isSelected && (
        <g>
          <circle
            cx={device.position.x + 20}
            cy={device.position.y - 20}
            r="12"
            fill="#dc2626"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          />
          <foreignObject
            x={device.position.x + 20 - 8}
            y={device.position.y - 20 - 8}
            width={16}
            height={16}
            className="pointer-events-none"
          >
            <div className="text-white flex items-center justify-center">
              <X className="size-3" />
            </div>
          </foreignObject>
        </g>
      )}
    </g>
  );
}

// Floor plan canvas with drop zone
function FloorPlanCanvas({ 
  floorId,
  placedDevices, 
  onDeviceDrop,
  onDeviceRemove,
  onDeviceMove,
  selectedDevice,
  onDeviceSelect
}: { 
  floorId: string;
  placedDevices: PlacedDevice[];
  onDeviceDrop: (device: DeviceType, position: { x: number; y: number }) => void;
  onDeviceRemove: (id: string) => void;
  onDeviceMove: (deviceId: string, position: { x: number; y: number }) => void;
  selectedDevice: string | null;
  onDeviceSelect: (deviceId: string | null) => void;
}) {
  const rooms = FLOOR_ROOMS[floorId] || [];
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['device', 'placed-device'],
    drop: (item: { device?: DeviceType; deviceId?: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const dropZone = document.getElementById('floor-canvas-svg');
      if (offset && dropZone) {
        const rect = dropZone.getBoundingClientRect();
        const svgX = ((offset.x - rect.left) / rect.width) * 920;
        const svgY = ((offset.y - rect.top) / rect.height) * 570;
        
        if (item.device) {
          // New device from library
          onDeviceDrop(item.device, { x: svgX, y: svgY });
        } else if (item.deviceId) {
          // Moving existing device
          onDeviceMove(item.deviceId, { x: svgX, y: svgY });
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getRoomFill = (room: Room) => {
    if (room.type === 'Hallway') return '#e5e7eb';
    if (hoveredRoom === room.id) return '#faf5ff';
    return '#ffffff';
  };

  const getRoomStroke = (room: Room) => {
    if (room.type === 'Hallway') return '#9ca3af';
    if (hoveredRoom === room.id) return '#9333ea';
    return '#374151';
  };

  return (
    <div 
      ref={drop}
      className={`relative w-full h-full flex items-center justify-center ${isOver ? 'bg-purple-50' : 'bg-gray-50'}`}
    >
      <svg 
        id="floor-canvas-svg"
        viewBox="0 0 920 570" 
        className="w-full h-full"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
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

        {/* Outer walls */}
        <path
          d="M 50 50 L 860 50 L 860 520 L 50 520 Z"
          fill="none"
          stroke="#64748b"
          strokeWidth="4"
        />

        {/* Rooms */}
        {rooms.map((room) => (
          <g 
            key={room.id}
            onMouseEnter={() => setHoveredRoom(room.id)}
            onMouseLeave={() => setHoveredRoom(null)}
          >
            <rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              fill={getRoomFill(room)}
              stroke={getRoomStroke(room)}
              strokeWidth={room.type === 'Hallway' ? 2 : 2}
              className="transition-all"
            />
            
            {/* Room label */}
            <text
              x={room.x + room.width / 2}
              y={room.y + room.height / 2 - 8}
              fontSize="11"
              fontWeight="600"
              fill="#374151"
              textAnchor="middle"
              className="pointer-events-none"
            >
              {room.name}
            </text>
            <text
              x={room.x + room.width / 2}
              y={room.y + room.height / 2 + 6}
              fontSize="9"
              fill="#6b7280"
              textAnchor="middle"
              className="pointer-events-none"
            >
              {room.type}
            </text>
          </g>
        ))}

        {/* Placed devices */}
        {placedDevices.map((device) => (
          <PlacedDeviceComponent
            key={device.id}
            device={device}
            onRemove={() => onDeviceRemove(device.id)}
            isSelected={selectedDevice === device.id}
            onClick={() => onDeviceSelect(device.id === selectedDevice ? null : device.id)}
          />
        ))}

        {/* Drop hint overlay */}
        {isOver && (
          <g>
            <rect x="0" y="0" width="920" height="570" fill="#9333ea" fillOpacity="0.1" />
            <text
              x="460"
              y="285"
              fontSize="20"
              fontWeight="700"
              fill="#9333ea"
              textAnchor="middle"
            >
              Drop device here
            </text>
          </g>
        )}
      </svg>

      {/* Device count badge */}
      <div className="absolute top-4 right-4 bg-white border-2 border-gray-300 rounded-lg px-3 py-2 shadow-md">
        <p className="text-xs text-gray-600">Devices Placed</p>
        <p className="text-2xl font-bold text-gray-900">{placedDevices.length}</p>
      </div>
    </div>
  );
}

export function NewFloorSetupView({ language = 'en', planId = null, onBack = () => {} }: NewFloorSetupViewProps) {
  const [selectedFloor, setSelectedFloor] = useState<string>('floor-a-2'); // Default to Operations floor
  const [placedDevices, setPlacedDevices] = useState<PlacedDevice[]>(EXISTING_DEVICES['floor-a-2'] || []);
  const [deviceCounter, setDeviceCounter] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sensor' | 'equipment' | 'safety'>('all');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [layoutName, setLayoutName] = useState('');
  const [layoutDescription, setLayoutDescription] = useState('');

  // Load existing devices when floor changes
  const handleFloorSelect = (floorId: string) => {
    setSelectedFloor(floorId);
    setPlacedDevices(EXISTING_DEVICES[floorId] || []);
    setDeviceCounter(1);
    setSelectedDevice(null);
  };

  const handleDeviceDrop = (device: DeviceType, position: { x: number; y: number }) => {
    const newDevice: PlacedDevice = {
      id: `placed-${Date.now()}-${deviceCounter}`,
      deviceType: device,
      position,
      name: `${device.name} ${deviceCounter}`,
    };
    setPlacedDevices([...placedDevices, newDevice]);
    setDeviceCounter(deviceCounter + 1);
    setSelectedDevice(newDevice.id);
  };

  const handleDeviceMove = (deviceId: string, position: { x: number; y: number }) => {
    setPlacedDevices(placedDevices.map(d => 
      d.id === deviceId ? { ...d, position } : d
    ));
  };

  const handleDeviceRemove = (id: string) => {
    setPlacedDevices(placedDevices.filter(d => d.id !== id));
    if (selectedDevice === id) {
      setSelectedDevice(null);
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to remove all devices from this floor?')) {
      setPlacedDevices([]);
      setDeviceCounter(1);
      setSelectedDevice(null);
    }
  };

  const handleSave = () => {
    alert(`Floor setup saved successfully!\n\nFloor: ${FLOORS.find(f => f.id === selectedFloor)?.name}\nDevices: ${placedDevices.length}`);
    onBack();
  };

  const handleRunDrill = () => {
    if (placedDevices.length === 0) {
      alert('Please add at least one device to the floor before running a drill.');
      return;
    }
    alert(`Running tactical drill with ${placedDevices.length} devices on ${FLOORS.find(f => f.id === selectedFloor)?.name}...\n\nThis will launch the Live Tactical Simulation System with your custom floor configuration.`);
  };

  const filteredDevices = selectedCategory === 'all' 
    ? DEVICE_LIBRARY 
    : DEVICE_LIBRARY.filter(d => d.category === selectedCategory);

  const selectedDeviceData = selectedDevice ? placedDevices.find(d => d.id === selectedDevice) : null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b-2 border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Device Configuration Testing - Editor</h1>
              <p className="text-sm text-gray-600 mt-1">
                Design and test conceptual floor plans with virtual device layouts before deployment
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleClear}
                disabled={!selectedFloor || placedDevices.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RotateCcw className="size-4" />
                Clear
              </button>
              <button
                onClick={handleSave}
                disabled={!selectedFloor || placedDevices.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="size-4" />
                Save Setup
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left Panel - Floor Selection & Device Library */}
          <div className="w-80 bg-white border-r-2 border-gray-200 flex flex-col overflow-y-auto">
            {/* Layout Information */}
            <div className="p-4 border-b-2 border-gray-200">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
                Layout Information
              </h3>
              
              {/* Layout Name */}
              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Layout Name
                </label>
                <input
                  type="text"
                  value={layoutName}
                  onChange={(e) => setLayoutName(e.target.value)}
                  placeholder="e.g., Enhanced Chemical Detection"
                  className="w-full p-2.5 border-2 border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>
              
              {/* Layout Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={layoutDescription}
                  onChange={(e) => setLayoutDescription(e.target.value)}
                  placeholder="Describe the purpose of this device layout..."
                  rows={3}
                  className="w-full p-2.5 border-2 border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                />
              </div>
            </div>

            {/* Device Library Header */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
                Device Library
              </h3>
              
              {/* Drag & Drop Instructions */}
              <p className="text-xs text-gray-500 mb-3">
                Drag devices from library to floor plan. Click existing devices to select and delete.
              </p>
              
              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory('sensor')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    selectedCategory === 'sensor'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sensors
                </button>
                <button
                  onClick={() => setSelectedCategory('equipment')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    selectedCategory === 'equipment'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Equipment
                </button>
                <button
                  onClick={() => setSelectedCategory('safety')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    selectedCategory === 'safety'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Safety
                </button>
              </div>
            </div>

            {/* Device List */}
            <div className="p-4 pb-6">
              <div className="space-y-2">
                {filteredDevices.map((device) => (
                  <DraggableDevice key={device.id} device={device} />
                ))}
              </div>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 p-6 flex flex-col">
            {selectedFloor ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {selectedDeviceData 
                        ? `Selected: ${selectedDeviceData.name} - Click and drag to move, or click Remove button`
                        : 'Drag devices from the library to place them on the floor plan'
                      }
                    </p>
                  </div>
                  
                  {placedDevices.length > 0 && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg px-4 py-2">
                      <p className="text-xs text-green-700 font-semibold">
                        ✓ {placedDevices.length} device{placedDevices.length !== 1 ? 's' : ''} configured
                      </p>
                    </div>
                  )}
                </div>

                <FloorPlanCanvas
                  floorId={selectedFloor}
                  placedDevices={placedDevices}
                  onDeviceDrop={handleDeviceDrop}
                  onDeviceRemove={handleDeviceRemove}
                  onDeviceMove={handleDeviceMove}
                  selectedDevice={selectedDevice}
                  onDeviceSelect={setSelectedDevice}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
                <div className="text-center">
                  <Grid3x3 className="size-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">No Floor Selected</p>
                  <p className="text-sm text-gray-600">Select a floor from the left panel to begin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}