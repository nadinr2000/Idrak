import { MapPin, Thermometer, Droplets, Wind, Users, AlertCircle, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { incidents } from '../data/mockData';
import { Filters } from './Filters';
import { useState } from 'react';

interface FloorViewProps {
  floorId: string;
  buildingId: string;
  onRoomClick: (roomId: string) => void;
  onIncidentClick: (incidentId: string) => void;
}

export function FloorView({ floorId, buildingId, onRoomClick, onIncidentClick }: FloorViewProps) {
  const [filters, setFilters] = useState<any>({});

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col h-full">
      <Filters
        onFilterChange={handleFilterChange}
        showBuildingFilter={false}
        showStatusFilter={true}
        showSeverityFilter={true}
        showDateFilter={true}
        showSensorTypeFilter={true}
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Floor Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Floor Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="size-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Total Rooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="size-5 text-green-600" />
                  <span className="text-sm text-gray-600">Active Sensors</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="size-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Total Occupancy</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="size-5 text-red-600" />
                  <span className="text-sm text-gray-600">Incidents</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
              </div>
            </div>
          </div>

          {/* Floor Plan Visualization */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Floor Plan</h3>
            <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] relative">
              {/* Simulated floor plan layout */}
              <div className="grid grid-cols-3 gap-4 h-full">
                {/* Add room buttons here if needed */}
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                <div className="text-xs font-medium text-gray-700 mb-2">Status</div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="size-3 bg-white border-2 border-gray-300 rounded" />
                    <span className="text-gray-600">Normal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-3 bg-red-50 border-2 border-red-400 rounded" />
                    <span className="text-gray-600">Alert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Details Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Room Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Temperature</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Humidity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Occupancy</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sensors</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Add room details here if needed */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Floor Incidents */}
          {incidents.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Active Incidents on This Floor</h3>
              <div className="space-y-3">
                {incidents.map(incident => (
                  <button
                    key={incident.id}
                    onClick={() => onIncidentClick(incident.id)}
                    className="w-full bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors text-left border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{incident.title}</h4>
                        <p className="text-sm text-gray-600">{incident.location}</p>
                        {incident.suggestedAction && (
                          <p className="text-sm text-blue-600 mt-2">→ {incident.suggestedAction}</p>
                        )}
                      </div>
                      <SeverityBadge severity={incident.severity} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    operational: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[severity]}`}>
      {severity}
    </span>
  );
}