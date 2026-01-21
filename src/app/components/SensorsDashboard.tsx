import { Radio, Thermometer, Droplets, Wind, Zap, Activity, CheckCircle2, AlertCircle, XCircle, Search, Filter } from 'lucide-react';
import { buildings } from '../data/mockData';
import { Filters } from './Filters';
import { useState } from 'react';

interface SensorsDashboardProps {
  onSensorClick: (sensorId: string) => void;
  onNavigateToSummary: () => void;
  onNavigateToBuildings: () => void;
  onNavigateToIncidents: () => void;
}

// Mock sensor data
const allSensors = buildings.flatMap(building =>
  Array.from({ length: building.sensors }, (_, i) => ({
    id: `${building.id}-sensor-${i + 1}`,
    buildingId: building.id,
    buildingName: building.name,
    floor: `Floor ${Math.floor(Math.random() * building.floors) + 1}`,
    room: `Room ${Math.floor(Math.random() * 20) + 100}`,
    type: ['Temperature', 'Humidity', 'Air Quality', 'Motion', 'Energy'][Math.floor(Math.random() * 5)],
    status: Math.random() > 0.05 ? 'online' : Math.random() > 0.5 ? 'offline' : 'warning',
    value: Math.floor(Math.random() * 100),
    unit: ['°C', '%', 'AQI', 'count', 'kWh'][Math.floor(Math.random() * 5)],
    lastUpdate: new Date(Date.now() - Math.random() * 3600000),
    batteryLevel: Math.floor(Math.random() * 100),
  }))
);

export function SensorsDashboard({ onSensorClick, onNavigateToSummary, onNavigateToBuildings, onNavigateToIncidents }: SensorsDashboardProps) {
  const [filters, setFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'warning'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredSensors = allSensors.filter(sensor => {
    const matchesSearch = 
      sensor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.buildingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sensor.status === statusFilter;
    const matchesType = typeFilter === 'all' || sensor.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const onlineCount = allSensors.filter(s => s.status === 'online').length;
  const offlineCount = allSensors.filter(s => s.status === 'offline').length;
  const warningCount = allSensors.filter(s => s.status === 'warning').length;
  const totalCount = allSensors.length;

  const sensorTypes = ['all', ...new Set(allSensors.map(s => s.type))];

  return (
    <div className="flex flex-col h-full">
      <Filters
        onFilterChange={handleFilterChange}
        showBuildingFilter={true}
        showStatusFilter={false}
        showSeverityFilter={false}
        showDateFilter={false}
        showSensorTypeFilter={true}
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard
              icon={Radio}
              label="Total Sensors"
              value={totalCount}
              color="blue"
            />
            <StatCard
              icon={CheckCircle2}
              label="Online"
              value={onlineCount}
              color="green"
              percentage={Math.round((onlineCount / totalCount) * 100)}
            />
            <StatCard
              icon={AlertCircle}
              label="Warning"
              value={warningCount}
              color="orange"
            />
            <StatCard
              icon={XCircle}
              label="Offline"
              value={offlineCount}
              color="red"
            />
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sensors by ID, building, room, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="size-5 text-gray-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sensorTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('online')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === 'online'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => setStatusFilter('warning')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === 'warning'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Warning
                </button>
                <button
                  onClick={() => setStatusFilter('offline')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === 'offline'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Offline
                </button>
              </div>
            </div>
          </div>

          {/* Sensors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSensors.map(sensor => (
              <div
                key={sensor.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-lg hover:border-blue-300 transition-all"
                onClick={() => onSensorClick(sensor.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <SensorTypeIcon type={sensor.type} />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{sensor.type}</p>
                      <p className="text-xs text-gray-500">{sensor.id}</p>
                    </div>
                  </div>
                  <StatusBadge status={sensor.status} />
                </div>

                {/* Current Value */}
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-gray-900">
                    {sensor.value}
                    <span className="text-lg text-gray-600 ml-1">{sensor.unit}</span>
                  </p>
                </div>

                {/* Location */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Building:</span>
                    <span className="text-gray-900 font-medium">{sensor.buildingName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Location:</span>
                    <span className="text-gray-900 font-medium">{sensor.floor}, {sensor.room}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Activity className="size-3" />
                    <span>{Math.floor((Date.now() - sensor.lastUpdate.getTime()) / 60000)}m ago</span>
                  </div>
                  <BatteryIndicator level={sensor.batteryLevel} />
                </div>
              </div>
            ))}
          </div>

          {filteredSensors.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <Radio className="size-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No sensors found matching your criteria</p>
            </div>
          )}

          {/* Results count */}
          {filteredSensors.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Showing {filteredSensors.length} of {totalCount} sensors
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, percentage }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div className={`rounded-xl border-2 p-4 ${colorClasses[color]}`}>
      <Icon className="size-6 mb-2" />
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm font-medium">{label}</p>
      {percentage !== undefined && (
        <p className="text-xs mt-1 opacity-80">{percentage}%</p>
      )}
    </div>
  );
}

function SensorTypeIcon({ type }: { type: string }) {
  const icons = {
    'Temperature': Thermometer,
    'Humidity': Droplets,
    'Air Quality': Wind,
    'Motion': Activity,
    'Energy': Zap,
  };

  const colors = {
    'Temperature': 'text-red-600 bg-red-50',
    'Humidity': 'text-blue-600 bg-blue-50',
    'Air Quality': 'text-green-600 bg-green-50',
    'Motion': 'text-purple-600 bg-purple-50',
    'Energy': 'text-yellow-600 bg-yellow-50',
  };

  const Icon = icons[type] || Radio;
  const colorClass = colors[type] || 'text-gray-600 bg-gray-50';

  return (
    <div className={`p-2 rounded-lg ${colorClass}`}>
      <Icon className="size-5" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    online: 'bg-green-100 text-green-800 border-green-200',
    offline: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-orange-100 text-orange-800 border-orange-200',
  };

  const icons = {
    online: CheckCircle2,
    offline: XCircle,
    warning: AlertCircle,
  };

  const Icon = icons[status] || Radio;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${styles[status]} uppercase`}>
      <Icon className="size-3" />
      {status}
    </span>
  );
}

function BatteryIndicator({ level }: { level: number }) {
  const getColor = () => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className={`flex items-center gap-1 ${getColor()}`}>
      <div className="relative w-6 h-3 border-2 border-current rounded-sm">
        <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-1 h-1.5 bg-current rounded-r-sm" />
        <div
          className="h-full bg-current rounded-sm"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-xs font-medium">{level}%</span>
    </div>
  );
}