// Centralized room data to ensure consistency across all views
// This data is used by FloorPlanView, RoomView, FloorRoomsListView, and summary views

export interface RoomData {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'warning' | 'critical';
  temperature: number;
  humidity: number;
  occupancy: number;
  floorId: string;
  sensors?: number;
}

// Floor 2 Rooms - Military Bunker Layout
export const floor2Rooms: RoomData[] = [
  // Command and Control Area
  { id: 'F2-R1', name: 'Command Center', type: 'Control Room', status: 'operational', temperature: 21, humidity: 42, occupancy: 8, floorId: 'floor-a-2', sensors: 12 },
  { id: 'F2-R2', name: 'Communications', type: 'Comm Room', status: 'operational', temperature: 20, humidity: 41, occupancy: 4, floorId: 'floor-a-2', sensors: 8 },
  { id: 'F2-R3', name: 'Server Room', type: 'IT', status: 'operational', temperature: 18, humidity: 38, occupancy: 2, floorId: 'floor-a-2', sensors: 10 },
  
  // Sector A - Storage
  { id: 'F2-R4', name: 'Sector A - Storage 1', type: 'Storage', status: 'operational', temperature: 19, humidity: 40, occupancy: 0, floorId: 'floor-a-2', sensors: 4 },
  { id: 'F2-R5', name: 'Sector A - Storage 2', type: 'Storage', status: 'operational', temperature: 20, humidity: 41, occupancy: 0, floorId: 'floor-a-2', sensors: 4 },
  
  // Sector B - INCIDENT AREA (Chemical Agent Detection)
  { id: 'F2-R6', name: 'Sector B - Lab', type: 'Laboratory', status: 'critical', temperature: 28, humidity: 55, occupancy: 3, floorId: 'floor-a-2', sensors: 15 },
  { id: 'F2-R7', name: 'Sector B - Equipment', type: 'Equipment', status: 'warning', temperature: 25, humidity: 48, occupancy: 2, floorId: 'floor-a-2', sensors: 8 },
  { id: 'F2-R8', name: 'Storage Closet', type: 'Storage', status: 'operational', temperature: 21, humidity: 42, occupancy: 0, floorId: 'floor-a-2', sensors: 2 },
  
  // Main Corridor
  { id: 'F2-R9', name: 'Main Corridor', type: 'Hallway', status: 'operational', temperature: 22, humidity: 43, occupancy: 5, floorId: 'floor-a-2', sensors: 6 },
  
  // Medical Area
  { id: 'F2-R10', name: 'Medical Bay', type: 'Medical', status: 'operational', temperature: 22, humidity: 43, occupancy: 2, floorId: 'floor-a-2', sensors: 10 },
  { id: 'F2-R11', name: 'Pharmacy', type: 'Medical Storage', status: 'operational', temperature: 21, humidity: 42, occupancy: 1, floorId: 'floor-a-2', sensors: 6 },
  { id: 'F2-R12', name: 'Isolation Room', type: 'Medical', status: 'operational', temperature: 22, humidity: 43, occupancy: 0, floorId: 'floor-a-2', sensors: 8 },
  
  // Living Quarters
  { id: 'F2-R13', name: 'Living Quarters A', type: 'Dormitory', status: 'operational', temperature: 21, humidity: 44, occupancy: 4, floorId: 'floor-a-2', sensors: 6 },
  { id: 'F2-R14', name: 'Living Quarters B', type: 'Dormitory', status: 'operational', temperature: 22, humidity: 45, occupancy: 3, floorId: 'floor-a-2', sensors: 6 },
  { id: 'F2-R15', name: 'Bathroom', type: 'Facilities', status: 'operational', temperature: 23, humidity: 52, occupancy: 1, floorId: 'floor-a-2', sensors: 4 },
  
  // Supply and Utilities
  { id: 'F2-R16', name: 'Supply Room', type: 'Storage', status: 'operational', temperature: 19, humidity: 40, occupancy: 0, floorId: 'floor-a-2', sensors: 4 },
  { id: 'F2-R17', name: 'Utility Room', type: 'Utilities', status: 'operational', temperature: 24, humidity: 42, occupancy: 1, floorId: 'floor-a-2', sensors: 8 },
  { id: 'F2-R18', name: 'Generator Room', type: 'Power', status: 'operational', temperature: 26, humidity: 43, occupancy: 1, floorId: 'floor-a-2', sensors: 12 },
  { id: 'F2-R19', name: 'Maintenance', type: 'Workshop', status: 'operational', temperature: 22, humidity: 44, occupancy: 1, floorId: 'floor-a-2', sensors: 8 },
];

// Floor 1 Rooms - Entry & Security Level
export const floor1Rooms: RoomData[] = [
  // Entry area - CBRNe Protection
  { id: 'F1-R1', name: 'Security Checkpoint', type: 'Security', status: 'operational', temperature: 20, humidity: 43, occupancy: 3, floorId: 'floor-a-1', sensors: 8 },
  { id: 'F1-R2', name: 'Airlock Entry', type: 'Airlock', status: 'operational', temperature: 21, humidity: 42, occupancy: 0, floorId: 'floor-a-1', sensors: 6 },
  { id: 'F1-R3', name: 'Decontamination', type: 'Decon Chamber', status: 'operational', temperature: 22, humidity: 44, occupancy: 1, floorId: 'floor-a-1', sensors: 10 },
  
  // Command & Control
  { id: 'F1-R4', name: 'Watch Center', type: 'Operations', status: 'operational', temperature: 21, humidity: 42, occupancy: 6, floorId: 'floor-a-1', sensors: 12 },
  { id: 'F1-R5', name: 'Tactical Planning', type: 'Planning Room', status: 'operational', temperature: 21, humidity: 43, occupancy: 4, floorId: 'floor-a-1', sensors: 8 },
  { id: 'F1-R6', name: 'Intelligence Center', type: 'Intel Analysis', status: 'operational', temperature: 20, humidity: 40, occupancy: 5, floorId: 'floor-a-1', sensors: 10 },
  { id: 'F1-R7', name: 'Communications Hub', type: 'Comm Center', status: 'operational', temperature: 19, humidity: 38, occupancy: 3, floorId: 'floor-a-1', sensors: 12 },
  { id: 'F1-R8', name: 'Briefing Room', type: 'Briefing', status: 'operational', temperature: 21, humidity: 42, occupancy: 12, floorId: 'floor-a-1', sensors: 8 },
  
  // Main corridor
  { id: 'F1-R9', name: 'Main Hallway', type: 'Hallway', status: 'operational', temperature: 21, humidity: 43, occupancy: 4, floorId: 'floor-a-1', sensors: 6 },
  
  // Weapons & Equipment
  { id: 'F1-R10', name: 'Armory', type: 'Weapons Storage', status: 'operational', temperature: 20, humidity: 40, occupancy: 2, floorId: 'floor-a-1', sensors: 12 },
  { id: 'F1-R11', name: 'Ammunition Storage', type: 'Ammo Vault', status: 'operational', temperature: 20, humidity: 40, occupancy: 0, floorId: 'floor-a-1', sensors: 10 },
  { id: 'F1-R12', name: 'NBC Equipment', type: 'CBRN Storage', status: 'operational', temperature: 19, humidity: 38, occupancy: 1, floorId: 'floor-a-1', sensors: 10 },
  
  // Support Areas
  { id: 'F1-R13', name: 'Equipment Lockers', type: 'Gear Storage', status: 'operational', temperature: 21, humidity: 44, occupancy: 3, floorId: 'floor-a-1', sensors: 6 },
  { id: 'F1-R14', name: 'Rations Supply', type: 'Supply Depot', status: 'operational', temperature: 18, humidity: 40, occupancy: 1, floorId: 'floor-a-1', sensors: 6 },
  { id: 'F1-R15', name: 'Hazmat Storage', type: 'Hazmat Vault', status: 'operational', temperature: 19, humidity: 38, occupancy: 0, floorId: 'floor-a-1', sensors: 12 },
  { id: 'F1-R16', name: 'Emergency Response', type: 'Staging Area', status: 'operational', temperature: 21, humidity: 42, occupancy: 4, floorId: 'floor-a-1', sensors: 8 },
  
  // Technical Infrastructure
  { id: 'F1-R17', name: 'Data Center', type: 'IT Infrastructure', status: 'operational', temperature: 18, humidity: 35, occupancy: 1, floorId: 'floor-a-1', sensors: 12 },
  { id: 'F1-R18', name: 'Electrical Room', type: 'Power Distribution', status: 'operational', temperature: 25, humidity: 42, occupancy: 0, floorId: 'floor-a-1', sensors: 10 },
];

// Combined room data for easy lookup
export const allFloorPlanRooms: RoomData[] = [...floor2Rooms, ...floor1Rooms];

// Helper function to get room by ID
export const getRoomById = (roomId: string): RoomData | undefined => {
  return allFloorPlanRooms.find(room => room.id === roomId);
};

// Helper function to get rooms by floor
export const getRoomsByFloor = (floorId: string): RoomData[] => {
  return allFloorPlanRooms.filter(room => room.floorId === floorId);
};

// Helper function to calculate floor statistics
export const getFloorStats = (floorId: string) => {
  const rooms = getRoomsByFloor(floorId);
  const criticalCount = rooms.filter(r => r.status === 'critical').length;
  const warningCount = rooms.filter(r => r.status === 'warning').length;
  const avgTemp = rooms.reduce((sum, r) => sum + r.temperature, 0) / rooms.length;
  const totalOccupancy = rooms.reduce((sum, r) => sum + r.occupancy, 0);
  const totalSensors = rooms.reduce((sum, r) => sum + (r.sensors || 0), 0);
  
  return {
    totalRooms: rooms.length,
    criticalCount,
    warningCount,
    avgTemperature: Math.round(avgTemp * 10) / 10,
    totalOccupancy,
    totalSensors,
    status: criticalCount > 0 ? 'critical' : warningCount > 0 ? 'warning' : 'operational'
  };
};