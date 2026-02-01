import { DoorOpen, Thermometer, Droplets, Users, AlertTriangle, CheckCircle2, Activity, Search, Filter, Wind, Zap, Calendar, MapPin } from 'lucide-react';
import { allFloorPlanRooms } from '../data/roomsData';
import { useState } from 'react';
import { Language, translations } from '../translations';

interface RoomsDashboardProps {
  onRoomClick?: (roomId: string) => void;
  language?: Language;
}

type RoomStatus = 'all' | 'operational' | 'warning' | 'critical';
type SortBy = 'name' | 'temperature' | 'occupancy' | 'type';

export function RoomsDashboard({ onRoomClick, language = 'en' }: RoomsDashboardProps) {
  const [statusFilter, setStatusFilter] = useState<RoomStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const t = translations[language];

  // Get all rooms
  const allRooms = allFloorPlanRooms;

  // Filter rooms
  const filteredRooms = allRooms.filter(room => {
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || room.type === selectedType;
    return matchesStatus && matchesSearch && matchesType;
  });

  // Sort rooms
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'temperature':
        return (b.temperature || 0) - (a.temperature || 0);
      case 'occupancy':
        return (b.occupancy || 0) - (a.occupancy || 0);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  // Get unique room types
  const roomTypes = Array.from(new Set(allRooms.map(r => r.type)));

  // Calculate statistics
  const totalRooms = allRooms.length;
  const operationalRooms = allRooms.filter(r => r.status === 'operational').length;
  const warningRooms = allRooms.filter(r => r.status === 'warning').length;
  const criticalRooms = allRooms.filter(r => r.status === 'critical').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle2 className="size-4" />;
      case 'warning':
        return <AlertTriangle className="size-4" />;
      case 'critical':
        return <Activity className="size-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'الغرف' : 'Rooms'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {language === 'ar' 
                ? 'مراقبة وإدارة جميع الغرف في المنشأة'
                : 'Monitor and manage all facility rooms'
              }
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title={language === 'ar' ? 'إجمالي الغرف' : 'Total Rooms'}
              value={totalRooms.toString()}
              icon={DoorOpen}
              color="blue"
            />
            <StatCard
              title={language === 'ar' ? 'جاهز' : 'Operational'}
              value={operationalRooms.toString()}
              icon={CheckCircle2}
              color="green"
            />
            <StatCard
              title={language === 'ar' ? 'تحذير' : 'Warning'}
              value={warningRooms.toString()}
              icon={AlertTriangle}
              color="yellow"
            />
            <StatCard
              title={language === 'ar' ? 'حرج' : 'Critical'}
              value={criticalRooms.toString()}
              icon={Activity}
              color="red"
            />
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'البحث عن الغرف...' : 'Search rooms...'}
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
                <span>{language === 'ar' ? 'التصفية' : 'Filters'}</span>
              </button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as RoomStatus)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">{language === 'ar' ? 'الكل' : 'All Status'}</option>
                    <option value="operational">{language === 'ar' ? 'جاهز' : 'Operational'}</option>
                    <option value="warning">{language === 'ar' ? 'تحذير' : 'Warning'}</option>
                    <option value="critical">{language === 'ar' ? 'حرج' : 'Critical'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الترتيب حسب' : 'Sort By'}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">{language === 'ar' ? 'الاسم' : 'Name'}</option>
                    <option value="temperature">{language === 'ar' ? 'درجة الحرارة' : 'Temperature'}</option>
                    <option value="occupancy">{language === 'ar' ? 'الإشغال' : 'Occupancy'}</option>
                    <option value="type">{language === 'ar' ? 'النوع' : 'Type'}</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Rooms Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الغرفة' : 'Room'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'النوع' : 'Type'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الحالة' : 'Status'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'درجة الحرارة' : 'Temperature'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الرطوبة' : 'Humidity'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الإشغال' : 'Occupancy'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'جودة الهواء' : 'Air Quality'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedRooms.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <DoorOpen className="size-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          {language === 'ar' ? 'لا توجد غرف تطابق الفلاتر' : 'No rooms match your filters'}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    sortedRooms.map((room) => {
                      const statusColor = getStatusColor(room.status);
                      const StatusIcon = getStatusIconComponent(room.status);

                      return (
                        <tr
                          key={room.id}
                          onClick={() => onRoomClick?.(room.id)}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <DoorOpen className="size-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{room.name}</div>
                                <div className="text-xs text-gray-500">
                                  {room.sensors?.length || 0} {language === 'ar' ? 'مستشعر' : 'sensors'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{room.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                              <StatusIcon className="size-3.5" />
                              {room.status === 'operational' ? (language === 'ar' ? 'جاهز' : 'Operational') :
                               room.status === 'warning' ? (language === 'ar' ? 'تحذير' : 'Warning') :
                               (language === 'ar' ? 'حرج' : 'Critical')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {room.temperature !== undefined ? (
                              <div className="flex items-center gap-2">
                                <Thermometer className="size-4 text-orange-500" />
                                <span className="text-sm text-gray-900">{room.temperature}°C</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {room.humidity !== undefined ? (
                              <div className="flex items-center gap-2">
                                <Droplets className="size-4 text-cyan-500" />
                                <span className="text-sm text-gray-900">{room.humidity}%</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {room.occupancy !== undefined ? (
                              <div className="flex items-center gap-2">
                                <Users className="size-4 text-purple-500" />
                                <span className="text-sm text-gray-900">{room.occupancy}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {room.airQuality !== undefined ? (
                              <div className="flex items-center gap-2">
                                <Wind className="size-4 text-green-500" />
                                <span className="text-sm text-gray-900">{room.airQuality}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
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

function getStatusIconComponent(status: string) {
  switch (status) {
    case 'operational':
      return CheckCircle2;
    case 'warning':
      return AlertTriangle;
    case 'critical':
      return Activity;
    default:
      return CheckCircle2;
  }
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const bgClasses: Record<string, string> = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    red: 'bg-red-50',
    orange: 'bg-orange-50',
    cyan: 'bg-cyan-50',
    purple: 'bg-purple-50',
  };

  const iconClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    orange: 'bg-orange-100 text-orange-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-4 ${bgClasses[color]}`}>
      <div className={`p-2 rounded-lg w-fit mb-3 ${iconClasses[color]}`}>
        <Icon className="size-5" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}