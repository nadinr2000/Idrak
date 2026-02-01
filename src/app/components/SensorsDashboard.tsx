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
  Array.from({ length: building.sensors }, (_, i) => {
    const sensorNumber = (buildings.indexOf(building) * 1000) + i + 1;
    return {
      id: `SNS-${String(sensorNumber).padStart(4, '0')}`,
      buildingId: building.id,
      buildingName: building.name,
      floor: `Floor ${Math.floor(Math.random() * building.floors) + 1}`,
      room: `Room ${Math.floor(Math.random() * 20) + 100}`,
      type: ['Temperature', 'Humidity', 'Air Quality', 'Motion', 'Energy'][Math.floor(Math.random() * 5)],
      status: Math.random() > 0.05 ? 'online' : Math.random() > 0.5 ? 'offline' : 'warning',
      value: Math.floor(Math.random() * 100),
      unit: ['°C', '%', 'AQI', 'count', 'kWh'][Math.floor(Math.random() * 5)],
      batteryLevel: Math.floor(Math.random() * 100),
      lastUpdate: new Date(Date.now() - Math.random() * 86400000), // Random within last 24 hours
    };
  })
);

export function SensorsDashboard({ onSensorClick, onNavigateToSummary, onNavigateToBuildings, onNavigateToIncidents }: SensorsDashboardProps) {
  const [filters, setFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'warning'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

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
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Facility Sensors</h1>
            <p className="text-sm text-gray-600 mt-1">
              Monitor and manage all facility sensors
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
              color="silver"
            />
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sensors by ID, room, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  showFilters ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                <Filter className="size-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="warning">Warning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sensor Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sensorTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Sensors Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sensor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Battery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSensors.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <Radio className="size-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No sensors match your filters</p>
                      </td>
                    </tr>
                  ) : (
                    filteredSensors.map((sensor) => {
                      const Icon = getSensorIcon(sensor.type);
                      const StatusIcon = getStatusIcon(sensor.status);
                      const statusColor = getStatusColor(sensor.status);

                      return (
                        <tr
                          key={sensor.id}
                          onClick={() => onSensorClick(sensor.id)}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Icon className="size-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{sensor.type}</div>
                                <div className="text-xs text-gray-500">{sensor.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{sensor.room}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                              <StatusIcon className="size-3.5" />
                              {sensor.status === 'online' ? 'Online' :
                               sensor.status === 'offline' ? 'Offline' :
                               'Warning'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">
                              {sensor.value} <span className="text-gray-600 font-normal">{sensor.unit}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-20">
                                <div
                                  className={`h-full ${
                                    sensor.batteryLevel >= 70 ? 'bg-green-500' :
                                    sensor.batteryLevel >= 30 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${sensor.batteryLevel}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">{sensor.batteryLevel}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatTime(sensor.lastUpdate)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(sensor.lastUpdate)}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getSensorIcon(type: string) {
  switch (type) {
    case 'Temperature':
      return Thermometer;
    case 'Humidity':
      return Droplets;
    case 'Air Quality':
      return Wind;
    case 'Motion':
      return Activity;
    case 'Energy':
      return Zap;
    default:
      return Radio;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'online':
      return CheckCircle2;
    case 'offline':
      return XCircle;
    case 'warning':
      return AlertCircle;
    default:
      return CheckCircle2;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'online':
      return 'bg-green-100 text-green-800';
    case 'offline':
      return 'bg-gray-100 text-gray-600';
    case 'warning':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
}

function StatCard({ icon: Icon, label, value, color, percentage }: any) {
  const bgClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    red: 'bg-red-50',
    silver: 'bg-gray-100',
  };

  const iconClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    silver: 'bg-gray-200 text-gray-600',
  };

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-4 ${bgClasses[color]}`}>
      <div className={`p-2 rounded-lg w-fit mb-3 ${iconClasses[color]}`}>
        <Icon className="size-5" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
      {percentage !== undefined && (
        <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
      )}
    </div>
  );
}