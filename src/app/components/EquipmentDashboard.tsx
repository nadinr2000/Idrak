import { Wrench, Fan, Zap, ThermometerSun, Wind, Droplets, Radio, CheckCircle2, AlertCircle, XCircle, Search, Filter } from 'lucide-react';
import { buildings } from '../data/mockData';
import { Filters } from './Filters';
import { useState } from 'react';
import { Language } from '../translations';

interface EquipmentDashboardProps {
  onEquipmentClick?: (equipmentId: string) => void;
  onNavigateToSummary?: () => void;
  onNavigateToBuildings?: () => void;
  language: Language;
}

// Mock equipment data
const allEquipment = buildings.flatMap(building =>
  Array.from({ length: Math.floor(building.sensors * 0.4) }, (_, i) => {
    const equipmentNumber = (buildings.indexOf(building) * 500) + i + 1;
    return {
      id: `EQP-${String(equipmentNumber).padStart(4, '0')}`,
      buildingId: building.id,
      buildingName: building.name,
      floor: `Floor ${Math.floor(Math.random() * building.floors) + 1}`,
      room: `Room ${Math.floor(Math.random() * 20) + 100}`,
      type: ['HVAC Unit', 'Generator', 'Water Pump', 'Air Filter', 'Cooling System', 'Ventilation Fan'][Math.floor(Math.random() * 6)],
      status: Math.random() > 0.08 ? 'operational' : Math.random() > 0.5 ? 'offline' : 'maintenance',
      model: ['Model-A2X', 'Model-B7K', 'Model-C3M', 'Model-D9P'][Math.floor(Math.random() * 4)],
      lastMaintenance: new Date(Date.now() - Math.random() * 7776000000), // Random within ~90 days
      nextMaintenance: new Date(Date.now() + Math.random() * 7776000000),
      operatingHours: Math.floor(Math.random() * 10000),
      efficiency: 70 + Math.floor(Math.random() * 30), // 70-100%
    };
  })
);

export function EquipmentDashboard({ onEquipmentClick, onNavigateToSummary, onNavigateToBuildings, language }: EquipmentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case 'HVAC Unit':
        return Fan;
      case 'Generator':
        return Zap;
      case 'Water Pump':
        return Droplets;
      case 'Air Filter':
        return Wind;
      case 'Cooling System':
        return ThermometerSun;
      case 'Ventilation Fan':
        return Wind;
      default:
        return Wrench;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return CheckCircle2;
      case 'offline':
        return XCircle;
      case 'maintenance':
        return AlertCircle;
      default:
        return Radio;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50';
      case 'offline':
        return 'text-red-600 bg-red-50';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredEquipment = allEquipment.filter(eq => {
    const matchesSearch = eq.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || eq.status === statusFilter;
    const matchesType = typeFilter === 'all' || eq.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: allEquipment.length,
    operational: allEquipment.filter(eq => eq.status === 'operational').length,
    offline: allEquipment.filter(eq => eq.status === 'offline').length,
    maintenance: allEquipment.filter(eq => eq.status === 'maintenance').length,
  };

  const equipmentTypes = Array.from(new Set(allEquipment.map(eq => eq.type)));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full overflow-auto p-6 bg-gray-50 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Facility Equipment' : 'معدات المنشأة'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {language === 'en' ? 'Monitor and manage all facility equipment' : 'مراقبة وإدارة جميع معدات المنشأة'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Wrench}
          label={language === 'en' ? 'Total Equipment' : 'إجمالي المعدات'}
          value={stats.total}
          color="blue"
        />
        <StatCard
          icon={CheckCircle2}
          label={language === 'en' ? 'Operational' : '<|im_start|> تشغيلي'}
          value={stats.operational}
          color="green"
        />
        <StatCard
          icon={AlertCircle}
          label={language === 'en' ? 'Maintenance' : 'صيانة'}
          value={stats.maintenance}
          color="yellow"
        />
        <StatCard
          icon={XCircle}
          label={language === 'en' ? 'Offline' : 'غير متصل'}
          value={stats.offline}
          color="silver"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search equipment...' : 'البحث عن المعدات...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              showFilters ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <Filter className="size-5" />
            <span>{language === 'en' ? 'Filters' : 'التصفية'}</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Status' : 'الحالة'}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{language === 'en' ? 'All Status' : 'جميع الحالات'}</option>
                <option value="operational">{language === 'en' ? 'Operational' : 'تشغيلي'}</option>
                <option value="maintenance">{language === 'en' ? 'Maintenance' : 'صيانة'}</option>
                <option value="offline">{language === 'en' ? 'Offline' : 'غير متصل'}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Equipment Type' : 'نوع المعدات'}
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{language === 'en' ? 'All Types' : 'جميع الأنواع'}</option>
                {equipmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Equipment List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Equipment' : 'المعدات'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Status' : 'الحالة'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Efficiency' : 'الكفاءة'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Last Maintenance' : 'آخر صيانة'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Next Maintenance' : 'الصيانة القادمة'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEquipment.map((equipment) => {
                const Icon = getEquipmentIcon(equipment.type);
                const StatusIcon = getStatusIcon(equipment.status);
                const statusColor = getStatusColor(equipment.status);

                return (
                  <tr
                    key={equipment.id}
                    onClick={() => onEquipmentClick?.(equipment.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Icon className="size-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{equipment.type}</div>
                          <div className="text-xs text-gray-500">{equipment.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        <StatusIcon className="size-3.5" />
                        {equipment.status === 'operational' ? (language === 'en' ? 'Operational' : 'تشغيلي') :
                         equipment.status === 'maintenance' ? (language === 'en' ? 'Maintenance' : 'صيانة') :
                         (language === 'en' ? 'Offline' : 'غير متصل')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              equipment.efficiency >= 85 ? 'bg-green-500' :
                              equipment.efficiency >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${equipment.efficiency}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-10">{equipment.efficiency}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(equipment.lastMaintenance)}</div>
                      <div className="text-xs text-gray-500">
                        {equipment.operatingHours.toLocaleString()} {language === 'en' ? 'hrs' : 'ساعة'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(equipment.nextMaintenance)}</div>
                      <div className="text-xs text-gray-500">
                        {Math.ceil((equipment.nextMaintenance.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} {language === 'en' ? 'days' : 'يوم'}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredEquipment.length === 0 && (
          <div className="p-8 text-center">
            <Wrench className="size-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">{language === 'en' ? 'No equipment found' : 'لم يتم العثور على معدات'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// StatCard component
function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: number, color: 'blue' | 'green' | 'yellow' | 'silver' }) {
  const bgClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    silver: 'bg-gray-100',
  };

  const iconClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    silver: 'bg-gray-200 text-gray-600',
  };

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-4 ${bgClasses[color]}`}>
      <div className={`p-2 rounded-lg w-fit mb-3 ${iconClasses[color]}`}>
        <Icon className="size-5" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
}