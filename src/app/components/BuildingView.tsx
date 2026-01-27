import { Building2, TrendingUp, AlertCircle, Activity, Thermometer, Droplets, Wind, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { incidents } from '../data/mockData';
import { Filters } from './Filters';
import { useState } from 'react';

interface BuildingViewProps {
  buildingId: string;
  onFloorClick: (floorId: string) => void;
  onIncidentClick: (incidentId: string) => void;
}

export function BuildingView({ buildingId, onFloorClick, onIncidentClick }: BuildingViewProps) {
  const [filters, setFilters] = useState<any>({});

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col h-full">      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Floor Map Visualization */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Building Floor Map</h3>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => {
                const floorIncidents = incidents.filter(i => i.floorId === `floor-${index + 1}`);
                const hasIssues = floorIncidents.length > 0;
                
                return (
                  <button
                    key={`floor-${index + 1}`}
                    onClick={() => onFloorClick(`floor-${index + 1}`)}
                    className={`w-full border-2 rounded-lg p-6 transition-all hover:shadow-lg ${
                      hasIssues ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${hasIssues ? 'bg-red-100' : 'bg-blue-100'}`}>
                          <Building2 className={`size-6 ${hasIssues ? 'text-red-600' : 'text-blue-600'}`} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900">Floor {index + 1}</h4>
                          <p className="text-sm text-gray-600">20 rooms • 24 sensors</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        {/* Environmental Metrics */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Thermometer className="size-4 text-gray-400" />
                            <span className="text-gray-600">22.5°C</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Droplets className="size-4 text-gray-400" />
                            <span className="text-gray-600">45%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Wind className="size-4 text-gray-400" />
                            <span className="text-gray-600">Good</span>
                          </div>
                        </div>
                        
                        {hasIssues && (
                          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <AlertCircle className="size-4" />
                            {floorIncidents.length} {floorIncidents.length === 1 ? 'incident' : 'incidents'}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Room Grid Visualization */}
                    <div className="mt-4 grid grid-cols-12 gap-2">
                      {Array.from({ length: 20 }).map((_, roomIndex) => {
                        const hasRoomIssue = roomIndex === 0 && hasIssues;
                        return (
                          <div
                            key={roomIndex}
                            className={`h-12 rounded border-2 transition-colors ${
                              hasRoomIssue
                                ? 'bg-red-200 border-red-400'
                                : 'bg-green-100 border-green-300 hover:bg-green-200'
                            }`}
                            title={`Room ${(5 - index) * 100 + roomIndex + 1}`}
                          />
                        );
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Building Incidents */}
          {incidents.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Active Incidents in This Building</h3>
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
                        <p className="text-xs text-gray-500 mt-2">
                          {Math.floor((Date.now() - incident.timestamp.getTime()) / 60000)}m ago
                        </p>
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