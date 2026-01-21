import { DoorOpen, Thermometer, Droplets, Users, AlertTriangle, CheckCircle2, Activity, Search, Filter } from 'lucide-react';
import { rooms as allRooms, floors } from '../data/mockData';
import { getRoomsByFloor, allFloorPlanRooms } from '../data/roomsData';
import { useState } from 'react';

interface FloorRoomsListViewProps {
  floorId: string;
  onRoomClick: (roomId: string) => void;
}

type RoomStatus = 'all' | 'operational' | 'warning' | 'critical';
type SortBy = 'name' | 'temperature' | 'occupancy' | 'type';

export function FloorRoomsListView({ floorId, onRoomClick }: FloorRoomsListViewProps) {
  const [statusFilter, setStatusFilter] = useState<RoomStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [searchQuery, setSearchQuery] = useState('');

  // Get current floor info
  const currentFloor = floors.find(f => f.id === floorId);
  
  // Get rooms for this floor
  let floorRooms = getRoomsByFloor(floorId);

  // Apply search filter
  if (searchQuery) {
    floorRooms = floorRooms.filter(room => 
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply status filter
  if (statusFilter !== 'all') {
    floorRooms = floorRooms.filter(room => room.status === statusFilter);
  }

  // Sort rooms
  floorRooms = [...floorRooms].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'temperature':
        return b.temperature - a.temperature;
      case 'occupancy':
        return b.occupancy - a.occupancy;
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  // Calculate statistics
  const totalRooms = allFloorPlanRooms.filter(r => r.floorId === floorId).length;
  const operationalRooms = allFloorPlanRooms.filter(r => r.floorId === floorId && r.status === 'operational').length;
  const roomsWithIssues = allFloorPlanRooms.filter(r => r.floorId === floorId && r.status !== 'operational').length;
  const avgTemp = floorRooms.length > 0 
    ? (floorRooms.reduce((sum, r) => sum + r.temperature, 0) / floorRooms.length).toFixed(1)
    : '0';
  const totalOccupancy = floorRooms.reduce((sum, r) => sum + r.occupancy, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentFloor?.name || floorId}</h2>
            <p className="text-gray-600">Room overview and status monitoring</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <StatCard
              label="Total Rooms"
              value={totalRooms}
              icon={DoorOpen}
              color="blue"
            />
            <StatCard
              label="Avg Temperature"
              value={`${avgTemp}°C`}
              icon={Thermometer}
              color="orange"
            />
            <StatCard
              label="Total Occupancy"
              value={totalOccupancy}
              icon={Users}
              color="green"
            />
            <StatCard
              label="Operational"
              value={operationalRooms}
              icon={CheckCircle2}
              color="teal"
            />
            <StatCard
              label="With Issues"
              value={roomsWithIssues}
              icon={AlertTriangle}
              color="red"
            />
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms by name or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter and Sort Bar */}
          <div className="mb-6 flex flex-wrap gap-4">
            {/* Status Filter */}
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    statusFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({totalRooms})
                </button>
                <button
                  onClick={() => setStatusFilter('operational')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    statusFilter === 'operational'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Operational ({operationalRooms})
                </button>
                <button
                  onClick={() => setStatusFilter('warning')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    statusFilter === 'warning'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Warning
                </button>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name</option>
                <option value="type">Type</option>
                <option value="temperature">Temperature</option>
                <option value="occupancy">Occupancy</option>
              </select>
            </div>
          </div>

          {/* Rooms List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {floorRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onRoomClick(room.id)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform ${
                      room.status === 'operational' ? 'bg-green-50' :
                      room.status === 'warning' ? 'bg-yellow-50' :
                      'bg-red-50'
                    }`}>
                      <DoorOpen className={`size-6 ${
                        room.status === 'operational' ? 'text-green-600' :
                        room.status === 'warning' ? 'text-yellow-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-500">{room.type}</p>
                    </div>
                  </div>
                  {room.status === 'operational' ? (
                    <CheckCircle2 className="size-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="size-5 text-yellow-600" />
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="size-4 text-orange-600" />
                      <p className="text-xs text-gray-600">Temperature</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{room.temperature}°C</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="size-4 text-blue-600" />
                      <p className="text-xs text-gray-600">Humidity</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{room.humidity}%</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="size-4 text-green-600" />
                      <p className="text-xs text-gray-600">Occupancy</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{room.occupancy}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="size-4 text-purple-600" />
                      <p className="text-xs text-gray-600">Sensors</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{room.sensors}</p>
                  </div>
                </div>

                {/* Status Footer */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`text-sm font-medium ${
                      room.status === 'operational' ? 'text-green-700' :
                      room.status === 'warning' ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {room.status === 'operational' ? 'Operational' :
                       room.status === 'warning' ? 'Warning' :
                       'Critical'}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            {floorRooms.length === 0 && (
              <div className="text-center py-12">
                <DoorOpen className="size-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">No Rooms Found</h3>
                <p className="text-sm text-gray-600">No rooms match your current filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: any;
  color: 'blue' | 'orange' | 'green' | 'red' | 'teal';
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    teal: 'bg-teal-50 text-teal-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
          <Icon className="size-5" />
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}