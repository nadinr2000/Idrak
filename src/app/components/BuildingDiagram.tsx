import { useState } from 'react';
import { Thermometer, Droplets, Wind, AlertTriangle, CheckCircle2, ChevronLeft, ZapOff, Activity, DoorOpen, Users, ChevronDown, ChevronUp, ExternalLink, X } from 'lucide-react';
import { floors as floorData, rooms as roomData } from '../data/mockData';
import { Language, translations, getRoomName, getRoomType, getEquipmentType } from '../translations';

// BuildingDiagram - Facility level view with floor selection and insights
interface BuildingDiagramProps {
  onFloorClick: (floorId: string) => void;
  language: Language;
  emergencyMode?: boolean;
}

export function BuildingDiagram({ onFloorClick, language, emergencyMode }: BuildingDiagramProps) {
  const t = translations[language];
  const isRTL = language === 'ar';
  const [hoveredRoom, setHoveredRoom] = useState<any | null>(null);
  const [expandedFloor, setExpandedFloor] = useState<string | null>(null);
  const [selectedRoomInFloor, setSelectedRoomInFloor] = useState<string | null>(null);

  // Use actual floor data from mockData
  const floors = floorData.map(floor => {
    const floorRooms = roomData.filter(room => room.floorId === floor.id);
    const avgTemp = floorRooms.length > 0 
      ? floorRooms.reduce((sum, r) => sum + r.temperature, 0) / floorRooms.length 
      : 22;
    
    const floorNumber = parseInt(floor.name.split(' ')[1]); // Extract number from "Floor 1"
    
    // Determine floor status - if in emergency mode and this is Floor 2, mark as critical
    let floorStatus: 'operational' | 'warning' | 'critical' = 'operational';
    if (emergencyMode && floor.id === 'floor-a-2') {
      floorStatus = 'critical'; // Floor 2 has chemical threat
    } else if (floor.incidents > 0) {
      floorStatus = 'warning';
    }
    
    return {
      id: floor.id,
      name: `${t.floorLabel} ${floorNumber}`, // Use translated floor label
      number: floorNumber,
      status: floorStatus,
      sensorCount: floor.sensors,
      rooms: floor.rooms,
      floorRooms: floorRooms,
      temperature: avgTemp,
      incidents: floor.incidents,
    };
  }).reverse(); // Reverse to show Floor 5 at top, Floor 1 at bottom

  const handleFloorClick = (floor: any) => {
    // Toggle expanded state
    if (expandedFloor === floor.id) {
      setExpandedFloor(null);
      setSelectedRoomInFloor(null);
    } else {
      setExpandedFloor(floor.id);
      setSelectedRoomInFloor(null);
    }
  };

  const handleNavigateToFloorPage = (floorId: string) => {
    onFloorClick(floorId);
  };

  return (
    <div className="h-full bg-gray-50 flex">
      {/* Left Panel - Building Diagram */}
      <div className="w-[600px] flex-shrink-0 bg-white border-r-4 border-gray-300 overflow-auto">
        <div className="p-6">
          {/* Room Hover Tooltip */}
          {hoveredRoom && (
            <div
              className="fixed z-50 pointer-events-none"
              style={{
                left: hoveredRoom.position.x + 15,
                top: hoveredRoom.position.y - 80,
              }}
            >
              <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-3 min-w-[200px] border border-gray-700">
                <div className="font-semibold text-sm mb-2">{hoveredRoom.room.name}</div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t.type}:</span>
                    <span className="font-medium">{hoveredRoom.room.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t.status}:</span>
                    <span className={`font-medium ${
                      hoveredRoom.room.status === 'operational' ? 'text-green-400' :
                      hoveredRoom.room.status === 'warning' ? 'text-orange-400' :
                      'text-red-400'
                    }`}>
                      {hoveredRoom.room.status.charAt(0).toUpperCase() + hoveredRoom.room.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t.temp}:</span>
                    <span className="font-medium">{hoveredRoom.room.temperature}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t.humidity}:</span>
                    <span className="font-medium">{hoveredRoom.room.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{t.occupancyLabel}:</span>
                    <span className="font-medium">{hoveredRoom.room.occupancy}</span>
                  </div>
                </div>
                {/* Arrow pointer */}
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 border-r border-b border-gray-700 transform rotate-45"></div>
              </div>
            </div>
          )}

          {/* Building Diagram Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6 lg:p-8">
            {/* Architectural Grid Background */}
            <div className="relative overflow-hidden">
              {/* Grid Pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <pattern id="architectural-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#architectural-grid)" />
              </svg>

              <div className="relative space-y-2">
                {/* Roof */}
                <div className="relative mb-4">
                  <div className="h-10 lg:h-12 bg-gradient-to-b from-slate-700 to-slate-600 rounded-t-xl border-2 border-slate-700 shadow-md relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent"></div>
                    <div className="relative text-xs lg:text-sm font-semibold text-white tracking-widest">
                      {t.facilityRoof}
                    </div>
                  </div>
                </div>

                {/* Floor Stack */}
                <div className="space-y-3">
                  {floors.map((floor, index) => (
                    <div key={floor.id} className="relative">
                      <div
                        onClick={() => handleFloorClick(floor)}
                        className="group cursor-pointer transition-all hover:scale-[1.01] relative"
                      >
                        {/* Floor Container */}
                        <div className={`relative rounded-lg border-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
                          floor.status === 'critical'
                            ? 'border-red-600 bg-red-50 animate-pulse'
                            : expandedFloor === floor.id 
                              ? 'border-blue-500 bg-blue-50'
                              : floor.status === 'warning'
                                ? 'border-orange-500 bg-white'
                                : 'border-green-500 bg-white'
                        }`}>
                          
                          {/* Emergency Threat Hazard Stripes - Only for critical status */}
                          {floor.status === 'critical' && (
                            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                              <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #dc2626 10px, #dc2626 20px)',
                              }}></div>
                            </div>
                          )}
                          
                          {/* Emergency Badge - Only for critical status */}
                          {floor.status === 'critical' && (
                            <div className={`absolute top-3 ${isRTL ? 'left-24' : 'right-3'} z-20`}>
                              <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full shadow-lg border-2 border-white animate-pulse">
                                <AlertTriangle className="size-4 fill-white" />
                                <span className="text-xs font-bold uppercase tracking-wide">{t.emergency}</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Floor number label - left for English, right for Arabic */}
                          <div className={`absolute ${isRTL ? 'right-0 rounded-l-lg' : 'left-0 rounded-r-lg'} top-0 bottom-0 w-16 lg:w-20 flex flex-col items-center justify-center gap-2 ${
                            floor.status === 'critical' 
                              ? 'bg-red-600' 
                              : expandedFloor === floor.id
                                ? 'bg-blue-500'
                                : floor.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'
                          } shadow-md z-10`}>
                            <div className="text-white text-center">
                              <div className="text-2xl lg:text-3xl font-bold">{floor.number}</div>
                              <div className="text-xs uppercase tracking-wide whitespace-nowrap">{t.floorLabel}</div>
                            </div>
                            {/* Expand/Collapse icon */}
                            <div className="text-white">
                              {expandedFloor === floor.id ? (
                                <ChevronUp className="size-5" />
                              ) : (
                                <ChevronDown className="size-5" />
                              )}
                            </div>
                          </div>

                          {/* Floor Content Area - margin on left for English, margin on right for Arabic */}
                          <div className={`${isRTL ? 'mr-20 lg:mr-24' : 'ml-20 lg:ml-24'} px-4 lg:px-6 py-4 lg:py-5`}>
                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                              {/* Floor info */}
                              <div className="lg:w-48">
                                <h3 className="font-semibold text-gray-900 text-base lg:text-lg mb-1">{floor.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {floor.rooms} {t.rooms} · {floor.sensorCount} {t.sensorsLabel}
                                </p>
                              </div>

                              {/* Floor Stats */}
                              <div className="flex-1 grid grid-cols-3 gap-4">
                                <div className="flex items-center gap-2">
                                  <Users className="size-5 text-blue-600" />
                                  <div>
                                    <div className="text-xs text-gray-600">{t.occupancyLabel}</div>
                                    <div className="font-bold text-gray-900">
                                      {floor.floorRooms.reduce((sum: number, r: any) => sum + r.occupancy, 0)}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Activity className="size-5 text-green-600" />
                                  <div>
                                    <div className="text-xs text-gray-600">{t.health}</div>
                                    <div className="font-bold text-gray-900">
                                      {floor.floorRooms.filter((r: any) => r.status === 'operational').length}/{floor.floorRooms.length}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="size-5 text-orange-600" />
                                  <div>
                                    <div className="text-xs text-gray-600">{t.alerts}</div>
                                    <div className="font-bold text-gray-900">
                                      {floor.floorRooms.filter((r: any) => r.status !== 'operational').length}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Floor Metrics */}
                              <div className="flex items-center gap-3 lg:gap-4 text-sm">
                                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                  <Thermometer className="size-4 text-blue-600" />
                                  <div>
                                    <div className="text-xs text-gray-500">{t.temp}</div>
                                    <div className="font-bold text-gray-900">{floor.temperature.toFixed(1)}°C</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Hover glow effect */}
                          <div className={`absolute inset-0 ${expandedFloor === floor.id ? 'bg-blue-500' : 'bg-blue-500'} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none rounded-lg`}></div>
                        </div>
                      </div>

                      {/* Expanded Floor Plan */}
                      {expandedFloor === floor.id && (
                        <div className="mt-4 mb-4 animate-in slide-in-from-top duration-300">
                          <FloorPlanExpanded 
                            floor={floor}
                            selectedRoom={selectedRoomInFloor}
                            onRoomSelect={setSelectedRoomInFloor}
                            onNavigate={handleNavigateToFloorPage}
                            language={language}
                          />
                        </div>
                      )}

                      {/* Floor separation line */}
                      {index < floors.length - 1 && (
                        <div className="h-3 flex items-center justify-center">
                          <div className="w-full h-px bg-gray-400"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Foundation */}
                <div className="relative mt-4">
                  <div className="h-6 lg:h-8 bg-gradient-to-b from-slate-700 to-slate-800 border-2 border-slate-800 shadow-xl rounded-b-xl"></div>
                  <div className="h-3 lg:h-4 bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-t-0 border-slate-900"></div>
                  {/* Ground level indicator */}
                  <div className="mt-3 flex items-center">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-slate-400"></div>
                    <span className="px-3 lg:px-4 py-1 text-xs font-mono text-white bg-slate-800 rounded-full border border-slate-600 whitespace-nowrap">{t.groundLevelLabel}</span>
                    <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-slate-400 to-slate-400"></div>
                  </div>
                </div>
              </div>

              {/* Architectural annotation footer */}
              <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0 text-xs text-slate-500 font-mono border-t border-slate-200 pt-4">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div>{t.scale}: 1:500</div>
                  <div className="hidden lg:block">{t.elevation}: {t.north}</div>
                </div>
                <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-sky-200 to-sky-400 border border-sky-500 rounded-sm"></div>
                    <span>{t.operational.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-orange-200 to-orange-400 border border-orange-500 rounded-sm"></div>
                    <span>{t.incident.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-red-200 to-red-400 border border-red-500 rounded-sm animate-pulse"></div>
                    <span className="font-bold text-red-600">{t.emergency.toUpperCase()}</span>
                  </div>
                </div>
                <div className="hidden lg:block">{new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Facility Level Insights */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Facility Level Insights</h2>
          <p className="text-xs text-gray-500 mb-4">
            Click on any floor to view detailed floor plans and room information.
          </p>

          <div className="space-y-4">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-5 gap-4">
              {/* Total Floors */}
              <div className="text-center">
                <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Floors</p>
                <p className="text-2xl font-bold text-gray-900">{floors.length}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Active</p>
              </div>

              {/* Total Rooms */}
              <div className="text-center">
                <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Rooms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {floors.reduce((total, floor) => total + floor.rooms, 0)}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">Total</p>
              </div>

              {/* Total Sensors */}
              <div className="text-center">
                <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Sensors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {floors.reduce((total, floor) => total + floor.sensorCount, 0)}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">Active</p>
              </div>

              {/* Total Occupancy */}
              <div className="text-center">
                <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Personnel</p>
                <p className="text-2xl font-bold text-blue-600">
                  {floors.reduce((total, floor) => total + floor.floorRooms.reduce((sum: number, r: any) => sum + r.occupancy, 0), 0)}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">Current</p>
              </div>

              {/* Total Alerts */}
              <div className="text-center">
                <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Alerts</p>
                <p className={`text-2xl font-bold ${
                  floors.some(f => f.status === 'critical') ? 'text-red-600' : 
                  floors.some(f => f.status === 'warning') ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {floors.reduce((total, floor) => total + floor.floorRooms.filter((r: any) => r.status !== 'operational').length, 0)}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  {floors.some(f => f.status === 'critical' || f.status === 'warning') ? 'Active' : 'Clear'}
                </p>
              </div>
            </div>

            {/* Floor Status Distribution */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-700 mb-2">Floor Status Distribution</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-[10px] text-green-700 font-medium mb-0.5">Operational</p>
                  <p className="text-xl font-bold text-green-800">
                    {floors.filter(f => f.status === 'operational').length}
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                  <p className="text-[10px] text-yellow-700 font-medium mb-0.5">Warning</p>
                  <p className="text-xl font-bold text-yellow-800">
                    {floors.filter(f => f.status === 'warning').length}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-[10px] text-red-700 font-medium mb-0.5">Critical</p>
                  <p className="text-xl font-bold text-red-800">
                    {floors.filter(f => f.status === 'critical').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Temperature Range */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-700 mb-2">Facility Temperature Range</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] text-gray-500 mb-0.5">Minimum</p>
                  <p className="text-lg font-bold text-blue-600">
                    {Math.min(...floors.map(f => f.temperature)).toFixed(1)}°C
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 mb-0.5">Average</p>
                  <p className="text-lg font-bold text-gray-900">
                    {(floors.reduce((sum, f) => sum + f.temperature, 0) / floors.length).toFixed(1)}°C
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 mb-0.5">Maximum</p>
                  <p className="text-lg font-bold text-orange-600">
                    {Math.max(...floors.map(f => f.temperature)).toFixed(1)}°C
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Alert Section */}
            {emergencyMode && floors.some(f => f.status === 'critical') && (
              <div className="pt-4 border-t border-gray-200">
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="size-6 text-red-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-900">Active Chemical Threat</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Chemical agent detected on Floor 2 - Sector B. Area sealed and emergency protocols active. All personnel evacuated.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Floor-by-Floor Summary */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-700 mb-3">Floor-by-Floor Summary</h3>
              <div className="space-y-2">
                {floors.slice().reverse().map(floor => (
                  <div 
                    key={floor.id} 
                    className={`p-3 rounded-lg border-2 ${
                      floor.status === 'critical' ? 'bg-red-50 border-red-300' :
                      floor.status === 'warning' ? 'bg-yellow-50 border-yellow-300' :
                      'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{floor.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        floor.status === 'critical' ? 'bg-red-200 text-red-800' :
                        floor.status === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {floor.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <p className="text-gray-600">Rooms</p>
                        <p className="font-bold text-gray-900">{floor.rooms}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Personnel</p>
                        <p className="font-bold text-gray-900">
                          {floor.floorRooms.reduce((sum: number, r: any) => sum + r.occupancy, 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Temp</p>
                        <p className="font-bold text-gray-900">{floor.temperature.toFixed(1)}°C</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Alerts</p>
                        <p className={`font-bold ${
                          floor.floorRooms.some((r: any) => r.status === 'critical') ? 'text-red-600' :
                          floor.floorRooms.some((r: any) => r.status === 'warning') ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {floor.floorRooms.filter((r: any) => r.status !== 'operational').length}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floor Plan Expanded Component
interface FloorPlanExpandedProps {
  floor: any;
  selectedRoom: string | null;
  onRoomSelect: (roomId: string) => void;
  onNavigate: (floorId: string) => void;
  language: Language;
}

function FloorPlanExpanded({ floor, selectedRoom, onRoomSelect, onNavigate, language }: FloorPlanExpandedProps) {
  const t = translations[language];
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  const [hoveredEquipmentId, setHoveredEquipmentId] = useState<string | null>(null);
  const [selectedRoomDetail, setSelectedRoomDetail] = useState<any | null>(null);
  const [selectedEquipmentDetail, setSelectedEquipmentDetail] = useState<any | null>(null);
  const [showStaticOverlay, setShowStaticOverlay] = useState(true); // Static overlay for demo

  // Create more realistic architectural room layout
  const createRoomLayout = () => {
    const floorRooms = floor.floorRooms;
    const totalRooms = floorRooms.length;
    
    // Distribute rooms with spaces for hallways
    const topRowCount = Math.ceil(totalRooms * 0.25);
    const bottomRowCount = Math.ceil(totalRooms * 0.25);
    const middleRowCount = totalRooms - topRowCount - bottomRowCount;
    
    const rooms: any[] = [];
    
    // Top row - smaller utility rooms
    for (let i = 0; i < topRowCount && i < floorRooms.length; i++) {
      const room = floorRooms[i];
      const roomWidth = 40 / topRowCount; // Reduced from 90 to leave space for hallway
      rooms.push({
        ...room,
        x: 5 + (i * roomWidth),
        y: 5,
        width: roomWidth - 1,
        height: 12,
      });
    }
    
    // Middle row - larger rooms (data halls, operations rooms, etc.)
    for (let i = 0; i < middleRowCount && (topRowCount + i) < floorRooms.length; i++) {
      const room = floorRooms[topRowCount + i];
      const roomWidth = 40 / Math.max(middleRowCount, 2);
      rooms.push({
        ...room,
        x: 5 + (i * roomWidth),
        y: 20,
        width: roomWidth - 1,
        height: 30,
      });
    }
    
    // Bottom row - smaller utility rooms
    for (let i = 0; i < bottomRowCount && (topRowCount + middleRowCount + i) < floorRooms.length; i++) {
      const room = floorRooms[topRowCount + middleRowCount + i];
      const roomWidth = 40 / bottomRowCount;
      rooms.push({
        ...room,
        x: 5 + (i * roomWidth),
        y: 70,
        width: roomWidth - 1,
        height: 12,
      });
    }
    
    return rooms;
  };

  // Define hallways/corridors
  const hallways = [
    { x: 45, y: 5, width: 6, height: 77, orientation: 'vertical' }, // Main vertical corridor
    { x: 5, y: 50, width: 40, height: 6, orientation: 'horizontal' }, // Horizontal corridor
    { x: 5, y: 17, width: 40, height: 3, orientation: 'horizontal' }, // Upper horizontal corridor
  ];

  // Define equipment placed on floor
  const equipment = [
    {
      id: 'chiller-01',
      name: 'Chiller 01',
      type: 'Cooling System',
      x: 55,
      y: 20,
      width: 18,
      height: 12,
      status: 'operational',
      details: {
        model: 'CH-5000X',
        capacity: '500 kW',
        temperature: '7°C',
        flow: '120 L/min',
        power: '85 kW',
        efficiency: '92%',
      }
    },
    {
      id: 'ahu-01',
      name: 'AHU 01',
      type: 'Air Handling Unit',
      x: 75,
      y: 35,
      width: 15,
      height: 18,
      status: 'operational',
      details: {
        model: 'AHU-3000',
        airflow: '15000 CFM',
        temperature: '22°C',
        humidity: '45%',
        filterStatus: 'Good',
        efficiency: '88%',
      }
    },
  ];

  const rooms = createRoomLayout();
  const hoveredRoomData = hoveredRoomId ? rooms.find((r: any) => r.id === hoveredRoomId) : null;
  const hoveredEquipmentData = hoveredEquipmentId ? equipment.find((e: any) => e.id === hoveredEquipmentId) : null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">{floor.name} - {t.floorPlan}</h3>
        <p className="text-sm text-gray-600">{t.hoverRoomsEquipment}</p>
      </div>

      {/* Floor Plan - Full Width */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-300 p-4">
        <div className="relative aspect-[16/9] bg-gray-50 rounded-lg border-2 border-gray-200 overflow-hidden">
          {/* Grid Background */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="floor-grid-expanded" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floor-grid-expanded)" />
          </svg>

          {/* Outer walls */}
          <div className="absolute inset-0 border-8 border-gray-700 rounded-lg pointer-events-none"></div>

          {/* Hallways/Corridors */}
          {hallways.map((hallway, index) => (
            <div
              key={`hallway-${index}`}
              className="absolute bg-gray-200 border-2 border-gray-400"
              style={{
                left: `${hallway.x}%`,
                top: `${hallway.y}%`,
                width: `${hallway.width}%`,
                height: `${hallway.height}%`,
              }}
            >
              {/* Hallway stripe pattern */}
              <div className="w-full h-full opacity-20">
                {hallway.orientation === 'horizontal' ? (
                  <div className="h-full flex items-center justify-around">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-px h-4 bg-gray-500" />
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center justify-around h-full">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="h-px w-4 bg-gray-500" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Rooms */}
          {rooms.map((room: any) => {
            const isHovered = hoveredRoomId === room.id;
            const statusColors = {
              operational: 'bg-gradient-to-br from-green-100 to-green-200 border-green-500',
              warning: 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-500',
              critical: 'bg-gradient-to-br from-red-100 to-red-200 border-red-500',
            };

            return (
              <button
                key={room.id}
                onMouseEnter={() => setHoveredRoomId(room.id)}
                onMouseLeave={() => setHoveredRoomId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoomDetail(room);
                }}
                className={`absolute border-4 transition-all ${statusColors[room.status]} ${
                  isHovered ? 'ring-4 ring-blue-500 z-20 shadow-2xl' : 'hover:shadow-xl'
                }`}
                style={{
                  left: `${room.x}%`,
                  top: `${room.y}%`,
                  width: `${room.width}%`,
                  height: `${room.height}%`,
                }}
              >
                {/* Alert icon badge in top-right corner */}
                {room.status !== 'operational' && (
                  <div className="absolute -top-2 -right-2 size-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10">
                    <AlertTriangle className="size-3 text-white" />
                  </div>
                )}
                <div className="w-full h-full p-1 flex flex-col justify-center items-center overflow-hidden">
                  <p className="font-bold text-gray-900 text-xs leading-tight truncate w-full text-center">{getRoomName(language, room.name)}</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wide truncate w-full text-center">{getRoomType(language, room.type)}</p>
                </div>
              </button>
            );
          })}

          {/* Equipment on floor */}
          {equipment.map((equip: any) => {
            const isHovered = hoveredEquipmentId === equip.id;
            const statusColor = equip.status === 'operational' 
              ? 'bg-gradient-to-br from-slate-700 to-slate-900 border-slate-600' 
              : 'bg-gradient-to-br from-red-700 to-red-900 border-red-600';

            return (
              <button
                key={equip.id}
                onMouseEnter={() => setHoveredEquipmentId(equip.id)}
                onMouseLeave={() => setHoveredEquipmentId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEquipmentDetail(equip);
                }}
                className={`absolute border-3 transition-all ${statusColor} ${
                  isHovered ? 'ring-4 ring-yellow-500 z-20 shadow-2xl' : 'hover:shadow-xl'
                }`}
                style={{
                  left: `${equip.x}%`,
                  top: `${equip.y}%`,
                  width: `${equip.width}%`,
                  height: `${equip.height}%`,
                }}
              >
                <div className="w-full h-full p-1 flex flex-col justify-center items-center overflow-hidden">
                  <p className="font-bold text-white text-xs leading-tight truncate w-full text-center">{equip.name}</p>
                  <p className="text-[10px] text-gray-300 uppercase tracking-wide truncate w-full text-center">{getEquipmentType(language, equip.type)}</p>
                  {equip.status === 'operational' && (
                    <div className="mt-0.5">
                      <div className="size-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}

          {/* Room Hover Overlay */}
          {hoveredRoomData && !hoveredEquipmentData && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-2xl border-2 border-blue-500 p-6 max-w-md animate-in fade-in zoom-in duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${
                    hoveredRoomData.status === 'operational' ? 'bg-green-100 text-green-600' :
                    hoveredRoomData.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <DoorOpen className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{getRoomName(language, hoveredRoomData.name)}</h3>
                    <p className="text-sm text-gray-500">{getRoomType(language, hoveredRoomData.type)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <StatusBadge status={hoveredRoomData.status} language={language} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="size-4 text-orange-600" />
                      <span className="text-xs font-medium text-gray-700">{t.temperature}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{hoveredRoomData.temperature}°C</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="size-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-700">{t.humidity}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{hoveredRoomData.humidity}%</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="size-4 text-green-600" />
                      <span className="text-xs font-medium text-gray-700">{t.occupancyLabel}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{hoveredRoomData.occupancy}</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="size-4 text-purple-600" />
                      <span className="text-xs font-medium text-gray-700">{t.airQuality}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{t.good}</span>
                  </div>
                </div>

                {hoveredRoomData.status !== 'operational' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="size-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900">{t.alertActive}</p>
                        <p className="text-xs text-red-700 mt-1">
                          {hoveredRoomData.status === 'critical' 
                            ? t.criticalTempExceeded
                            : t.tempApproachingThreshold}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Equipment Hover Overlay */}
          {hoveredEquipmentData && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-2xl border-2 border-yellow-500 p-6 max-w-md animate-in fade-in zoom-in duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-slate-100 text-slate-700">
                    <Activity className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{hoveredEquipmentData.name}</h3>
                    <p className="text-sm text-gray-500">{getEquipmentType(language, hoveredEquipmentData.type)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <StatusBadge status={hoveredEquipmentData.status} language={language} />
                </div>

                <div className="space-y-2">
                  {Object.entries(hoveredEquipmentData.details).map(([key, value]) => {
                    // Translate the keys
                    const translationKeyMap: { [key: string]: keyof typeof translations.en } = {
                      'model': 'model',
                      'capacity': 'capacity',
                      'flow': 'flow',
                      'power': 'power',
                      'efficiency': 'efficiency',
                      'airflow': 'airflow',
                      'temperature': 'temperature',
                      'humidity': 'humidity',
                      'filterStatus': 'filterStatus',
                    };
                    const translatedLabel = translationKeyMap[key] ? t[translationKeyMap[key]] : key.replace(/([A-Z])/g, ' $1').trim();
                    
                    return (
                      <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-xs font-medium text-gray-600 capitalize">
                          {translatedLabel}
                        </span>
                        <span className="text-sm font-bold text-gray-900">{key === 'filterStatus' && value === 'Good' ? t.good : value}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">{t.systemOperational}</p>
                      <p className="text-xs text-green-700 mt-1">
                        {t.allParamsNormal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compass */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md border border-gray-300 p-2 z-10">
            <div className="text-center">
              <div className="text-xs font-bold text-gray-900">N</div>
              <div className="size-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-1 bg-gray-900 rounded-full" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600" />
              </div>
            </div>
          </div>

          {/* Scale */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md border border-gray-300 px-3 py-2 z-10">
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 bg-gray-900" />
              <span className="text-xs font-medium text-gray-900">10m</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-500 rounded" />
            <span className="text-gray-700">{t.operational}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-500 rounded" />
            <span className="text-gray-700">{t.warning}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-500 rounded" />
            <span className="text-gray-700">{t.critical}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, language }: { status: string, language?: Language }) {
  const t = language ? translations[language] : translations['en'];
  const styles = {
    operational: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusTranslationKey = status as keyof typeof translations.en;
  const translatedStatus = t[statusTranslationKey] || status;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]} uppercase`}>
      {translatedStatus}
    </span>
  );
}