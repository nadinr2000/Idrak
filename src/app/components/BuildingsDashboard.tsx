import { Layers, Activity, AlertTriangle, TrendingUp, Search, Radio, DoorOpen, Thermometer, Users, CheckCircle2, AlertCircle, XCircle, Filter, X } from 'lucide-react';
import { floors, incidents } from '../data/mockData';
import { getFloorStats } from '../data/roomsData';
import { useState } from 'react';
import { Language } from '../translations';

interface BuildingsDashboardProps {
  onBuildingClick: (floorId: string) => void;
  language: Language;
}

type FloorStatus = 'all' | 'operational' | 'with-issues';
type SortBy = 'name' | 'rooms' | 'sensors' | 'incidents';

export function BuildingsDashboard({ onBuildingClick, language }: BuildingsDashboardProps) {
  const [statusFilter, setStatusFilter] = useState<FloorStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');

  // Filter floors based on status
  let filteredFloors = floors;
  
  if (statusFilter === 'operational') {
    filteredFloors = floors.filter(f => f.incidents === 0);
  } else if (statusFilter === 'with-issues') {
    filteredFloors = floors.filter(f => f.incidents > 0);
  }

  // Sort floors
  filteredFloors = [...filteredFloors].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rooms':
        return b.rooms - a.rooms;
      case 'sensors':
        return b.sensors - a.sensors;
      case 'incidents':
        return b.incidents - a.incidents;
      default:
        return 0;
    }
  });

  // Calculate floor statistics
  const totalFloors = floors.length;
  const operationalFloors = floors.filter(f => f.incidents === 0).length;
  const floorsWithIncidents = floors.filter(f => f.incidents > 0).length;
  const totalRooms = floors.reduce((sum, f) => sum + f.rooms, 0);
  const totalSensors = floors.reduce((sum, f) => sum + f.sensors, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <StatCard
              label="Total Floors"
              value={totalFloors}
              icon={Layers}
              color="blue"
            />
            <StatCard
              label="Total Rooms"
              value={totalRooms}
              icon={DoorOpen}
              color="indigo"
            />
            <StatCard
              label="Total Sensors"
              value={totalSensors}
              icon={Radio}
              color="teal"
            />
            <StatCard
              label="Operational"
              value={operationalFloors}
              icon={CheckCircle2}
              color="green"
            />
            <StatCard
              label="With Issues"
              value={floorsWithIncidents}
              icon={AlertTriangle}
              color="red"
            />
          </div>

          {/* Filter and Sort Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              {/* Status Filter */}
              <div className="flex-1">
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
                    All Floors ({floors.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('operational')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      statusFilter === 'operational'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Operational ({operationalFloors})
                  </button>
                  <button
                    onClick={() => setStatusFilter('with-issues')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      statusFilter === 'with-issues'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    With Issues ({floorsWithIncidents})
                  </button>
                </div>
              </div>

              {/* Sort By */}
              <div className="w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="rooms">Most Rooms</option>
                  <option value="sensors">Most Sensors</option>
                  <option value="incidents">Most Incidents</option>
                </select>
              </div>
            </div>
          </div>

          {/* Floors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFloors.map((floor, index) => {
              const floorIncidents = incidents.filter(i => i.floorId === floor.id);
              const hasIssues = floor.incidents > 0;
              const status = hasIssues ? 'warning' : 'operational';
              
              return (
                <button
                  key={floor.id}
                  onClick={() => onBuildingClick(floor.id)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <Layers className="size-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{floor.name}</h3>
                        <p className="text-sm text-gray-500">Level {index + 1}</p>
                      </div>
                    </div>
                    <StatusBadge status={status} />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <DoorOpen className="size-4 text-gray-600" />
                        <p className="text-xs text-gray-600">Rooms</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">{floor.rooms}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Radio className="size-4 text-gray-600" />
                        <p className="text-xs text-gray-600">Sensors</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">{floor.sensors}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="size-4 text-gray-600" />
                        <p className="text-xs text-gray-600">Avg Temp</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {(22 + Math.random() * 2).toFixed(1)}°C
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="size-4 text-gray-600" />
                        <p className="text-xs text-gray-600">Occupancy</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {Math.floor(40 + Math.random() * 40)}%
                      </p>
                    </div>
                  </div>

                  {/* Active Incidents */}
                  {floor.incidents > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <AlertTriangle className="size-4" />
                        <span className="font-medium">
                          {floor.incidents} active {floor.incidents === 1 ? 'incident' : 'incidents'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Health Score */}
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Floor Health</span>
                      <span className="text-sm font-medium text-gray-900">
                        {hasIssues ? '75%' : '95%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          hasIssues ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{
                          width: hasIssues ? '75%' : '95%'
                        }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    teal: 'bg-teal-50 text-teal-600 border-teal-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  };

  return (
    <div className={`rounded-xl border-2 p-4 ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="size-5" />
        <p className="text-sm font-medium">{label}</p>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    operational: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]} uppercase`}>
      {status}
    </span>
  );
}