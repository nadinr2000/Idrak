import { AlertTriangle, CheckCircle2, DoorOpen, Radio, Thermometer } from 'lucide-react';
import { floors, rooms, incidents } from '../data/mockData';
import { Language, translations } from '../translations';

interface FloorsArchitecturalViewProps {
  onFloorClick: (floorId: string) => void;
  language: Language;
}

export function FloorsArchitecturalView({ onFloorClick, language }: FloorsArchitecturalViewProps) {
  const t = translations[language];
  
  // Get room and incident counts for each floor
  const getFloorData = (floorId: string) => {
    const floorRooms = rooms.filter(r => r.floorId === floorId);
    const floorIncidents = incidents.filter(i => i.floorId === floorId);
    
    const operationalRooms = floorRooms.filter(r => r.status === 'operational').length;
    const warningRooms = floorRooms.filter(r => r.status === 'warning').length;
    const criticalRooms = floorRooms.filter(r => r.status === 'critical').length;
    
    return {
      rooms: floorRooms,
      totalRooms: floorRooms.length,
      operational: operationalRooms,
      warning: warningRooms,
      critical: criticalRooms,
      incidents: floorIncidents.length,
    };
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className={`mb-8 ${language === 'ar' ? 'text-right' : ''}`}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t.buildingCrossSection}</h2>
          <p className="text-gray-600">{t.architecturalViewDesc}</p>
        </div>

        {/* Building structure - floors stacked vertically */}
        <div className="relative">
          {/* Building outline */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 rounded-lg opacity-20"></div>
          
          <div className="relative space-y-4 p-6">
            {floors.slice().reverse().map((floor, index) => {
              const data = getFloorData(floor.id);
              const reversedIndex = floors.length - 1 - index;
              
              // Determine floor status color
              let statusColor = 'bg-green-500';
              let statusBorder = 'border-green-600';
              if (data.critical > 0) {
                statusColor = 'bg-red-500';
                statusBorder = 'border-red-600';
              } else if (data.warning > 0 || data.incidents > 0) {
                statusColor = 'bg-yellow-500';
                statusBorder = 'border-yellow-600';
              }

              return (
                <div
                  key={floor.id}
                  onClick={() => onFloorClick(floor.id)}
                  className="relative group cursor-pointer"
                >
                  {/* Floor slab */}
                  <div className={`relative bg-white border-2 ${statusBorder} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                    {/* Floor number label on the left */}
                    <div className={`absolute left-0 top-0 bottom-0 w-24 ${statusColor} flex items-center justify-center`}>
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold">{reversedIndex + 1}</div>
                        <div className="text-xs uppercase tracking-wide">{t.floorLabel}</div>
                      </div>
                    </div>

                    {/* Floor content */}
                    <div className="ml-24 p-6 grid grid-cols-12 gap-6 items-center">
                      {/* Floor name and info */}
                      <div className="col-span-3">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{floor.name}</h3>
                        <p className="text-sm text-gray-600">
                          {data.totalRooms} {t.rooms} · {floor.sensors} {t.sensorsLabel}
                        </p>
                      </div>

                      {/* Room status visualization */}
                      <div className="col-span-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-600">{t.roomStatus}:</span>
                        </div>
                        <div className="flex gap-1 h-8">
                          {data.rooms.map((room) => {
                            let roomColor = 'bg-green-400 border-green-500';
                            if (room.status === 'critical') {
                              roomColor = 'bg-red-400 border-red-500';
                            } else if (room.status === 'warning') {
                              roomColor = 'bg-yellow-400 border-yellow-500';
                            }

                            return (
                              <div
                                key={room.id}
                                className={`flex-1 ${roomColor} border rounded hover:scale-105 transition-transform cursor-pointer`}
                                title={`${room.name} - ${room.status}`}
                              ></div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="col-span-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-5 text-green-600" />
                          <div>
                            <div className="text-sm text-gray-600">{t.operational}</div>
                            <div className="font-semibold text-gray-900">{data.operational} {t.rooms}</div>
                          </div>
                        </div>
                        
                        {data.warning > 0 && (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="size-5 text-yellow-600" />
                            <div>
                              <div className="text-sm text-gray-600">{language === 'en' ? 'Warning' : 'تحذير'}</div>
                              <div className="font-semibold text-gray-900">{data.warning} {t.rooms}</div>
                            </div>
                          </div>
                        )}

                        {data.critical > 0 && (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="size-5 text-red-600" />
                            <div>
                              <div className="text-sm text-gray-600">{t.critical}</div>
                              <div className="font-semibold text-gray-900">{data.critical} {t.rooms}</div>
                            </div>
                          </div>
                        )}

                        {data.incidents > 0 && (
                          <div className="flex items-center gap-2">
                            <Radio className="size-5 text-orange-600" />
                            <div>
                              <div className="text-sm text-gray-600">{t.incidents}</div>
                              <div className="font-semibold text-gray-900">{data.incidents}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  </div>

                  {/* Floor separation line (foundation/ceiling) */}
                  {index < floors.length - 1 && (
                    <div className="h-3 flex items-center justify-center">
                      <div className="w-full h-px bg-gray-400"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ground level */}
          <div className="mt-4 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg flex items-center justify-center">
            <span className="text-white text-sm font-medium">{t.groundLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}