import { Building2, MapPin, X, Activity, AlertTriangle } from 'lucide-react';
import { buildings } from '../data/mockData';
import { useState } from 'react';

interface MapViewProps {
  onBuildingClick: (buildingId: string) => void;
  onClose: () => void;
}

export function MapView({ onBuildingClick, onClose }: MapViewProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  // Position buildings on the map (simulated coordinates)
  const buildingPositions = {
    'bldg-001': { x: 20, y: 30 },
    'bldg-002': { x: 60, y: 25 },
    'bldg-003': { x: 35, y: 60 },
    'bldg-004': { x: 75, y: 70 },
  };

  const selectedBuildingData = selectedBuilding 
    ? buildings.find(b => b.id === selectedBuilding)
    : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Buildings Map View</h2>
          <p className="text-sm text-gray-600">Click on a building to view details</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="size-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Area */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-gray-300 aspect-video relative overflow-hidden">
                {/* Map Grid Background */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .05) 25%, rgba(59, 130, 246, .05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .05) 75%, rgba(59, 130, 246, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .05) 25%, rgba(59, 130, 246, .05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .05) 75%, rgba(59, 130, 246, .05) 76%, transparent 77%, transparent)',
                  backgroundSize: '50px 50px'
                }} />

                {/* Decorative Map Features */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <path d="M 50 100 Q 150 50 300 100" stroke="#94a3b8" strokeWidth="3" fill="none" />
                  <path d="M 400 80 Q 500 120 600 90" stroke="#94a3b8" strokeWidth="3" fill="none" />
                  <circle cx="100" cy="300" r="40" fill="#86efac" opacity="0.3" />
                  <circle cx="500" cy="200" r="60" fill="#86efac" opacity="0.3" />
                </svg>

                {/* Buildings */}
                {buildings.map((building) => {
                  const position = buildingPositions[building.id] || { x: 50, y: 50 };
                  const isSelected = selectedBuilding === building.id;

                  return (
                    <button
                      key={building.id}
                      onClick={() => setSelectedBuilding(building.id)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                      }}
                    >
                      {/* Building Pin */}
                      <div className={`relative transition-transform ${isSelected ? 'scale-125' : 'group-hover:scale-110'}`}>
                        <MapPin
                          className={`size-10 ${
                            building.status === 'operational' ? 'text-green-600' :
                            building.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                          } filter drop-shadow-lg`}
                          fill="currentColor"
                        />
                        <Building2 className="size-5 text-white absolute top-2 left-1/2 -translate-x-1/2" />
                        
                        {/* Building Name Label */}
                        <div className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'opacity-100' : ''}`}>
                          {building.name}
                        </div>

                        {/* Incident Badge */}
                        {building.incidents > 0 && (
                          <div className="absolute -top-1 -right-1 size-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                            {building.incidents}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-900 mb-2">Status</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="size-3 bg-green-600 rounded-full" />
                      <span className="text-xs text-gray-700">Operational</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 bg-yellow-600 rounded-full" />
                      <span className="text-xs text-gray-700">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 bg-red-600 rounded-full" />
                      <span className="text-xs text-gray-700">Critical</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Building Details Panel */}
            <div className="lg:col-span-1">
              {selectedBuildingData ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        selectedBuildingData.status === 'operational' ? 'bg-green-100 text-green-600' :
                        selectedBuildingData.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <Building2 className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{selectedBuildingData.name}</h3>
                        <p className="text-sm text-gray-500">{selectedBuildingData.id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedBuilding(null)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="size-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <StatusBadge status={selectedBuildingData.status} />
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Total Floors</span>
                      <span className="font-bold text-gray-900">{selectedBuildingData.floors}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Active Sensors</span>
                      <span className="font-bold text-gray-900">{selectedBuildingData.sensors}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Active Incidents</span>
                      <span className={`font-bold ${selectedBuildingData.incidents > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedBuildingData.incidents}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Occupancy</span>
                      <span className="font-bold text-gray-900">{Math.floor(Math.random() * 100)}%</span>
                    </div>
                  </div>

                  {/* Alerts */}
                  {selectedBuildingData.incidents > 0 && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="size-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900">Active Alerts</p>
                          <p className="text-xs text-red-700 mt-1">
                            {selectedBuildingData.incidents} incident{selectedBuildingData.incidents !== 1 ? 's' : ''} require attention
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => onBuildingClick(selectedBuildingData.id)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View Building Details
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                  <MapPin className="size-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Select a Building</h3>
                  <p className="text-sm text-gray-600">Click on any building marker on the map to view its details</p>
                </div>
              )}
            </div>
          </div>

          {/* Buildings List */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">All Buildings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {buildings.map(building => (
                <button
                  key={building.id}
                  onClick={() => setSelectedBuilding(building.id)}
                  className={`bg-white rounded-lg border-2 p-4 text-left transition-all ${
                    selectedBuilding === building.id
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{building.name}</h4>
                    <StatusDot status={building.status} />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{building.floors} floors</p>
                    <p>{building.sensors} sensors</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
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
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]} uppercase`}>
      {status}
    </span>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors = {
    operational: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500',
  };

  return <div className={`size-3 rounded-full ${colors[status]}`} />;
}
