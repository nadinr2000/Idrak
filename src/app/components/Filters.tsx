import { Filter, X, Calendar, Building2, AlertTriangle, Activity, ChevronDown, Clock, Download, FileText, Table } from 'lucide-react';
import { useState } from 'react';

interface FiltersProps {
  onFilterChange?: (filters: any) => void;
  showBuildingFilter?: boolean;
  showStatusFilter?: boolean;
  showSeverityFilter?: boolean;
  showDateFilter?: boolean;
  showSensorTypeFilter?: boolean;
}

export function Filters({
  onFilterChange,
  showBuildingFilter = true,
  showStatusFilter = true,
  showSeverityFilter = true,
  showDateFilter = true,
  showSensorTypeFilter = false,
}: FiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);
  const [selectedSensorTypes, setSelectedSensorTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [quickTimeFilter, setQuickTimeFilter] = useState<string>('');

  const buildings = ['Building A', 'Building B', 'Building C', 'Building D'];
  const statuses = ['Operational', 'Warning', 'Critical'];
  const severities = ['Low', 'Medium', 'High', 'Critical'];
  const sensorTypes = ['Temperature', 'Humidity', 'CO2', 'Motion', 'Smoke'];

  const quickTimeOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: 'last7days' },
    { label: 'Last 30 Days', value: 'last30days' },
    { label: 'This Month', value: 'thismonth' },
    { label: 'Last Month', value: 'lastmonth' },
  ];

  const applyQuickTimeFilter = (option: string) => {
    setQuickTimeFilter(option);
    const today = new Date();
    let start = '';
    let end = today.toISOString().split('T')[0];

    switch (option) {
      case 'today':
        start = end;
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        start = yesterday.toISOString().split('T')[0];
        end = start;
        break;
      case 'last7days':
        const last7 = new Date(today);
        last7.setDate(last7.getDate() - 7);
        start = last7.toISOString().split('T')[0];
        break;
      case 'last30days':
        const last30 = new Date(today);
        last30.setDate(last30.getDate() - 30);
        start = last30.toISOString().split('T')[0];
        break;
      case 'thismonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        break;
      case 'lastmonth':
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        start = lastMonthStart.toISOString().split('T')[0];
        end = lastMonthEnd.toISOString().split('T')[0];
        break;
    }

    const newRange = { start, end };
    setDateRange(newRange);
    notifyChange({ 
      buildings: selectedBuildings, 
      statuses: selectedStatuses, 
      severities: selectedSeverities, 
      sensorTypes: selectedSensorTypes, 
      dateRange: newRange 
    });
  };

  const toggleFilter = (value: string, current: string[], setter: (val: string[]) => void) => {
    const newValues = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setter(newValues);
    notifyChange({ buildings: selectedBuildings, statuses: selectedStatuses, severities: selectedSeverities, sensorTypes: selectedSensorTypes, dateRange });
  };

  const notifyChange = (filters: any) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const clearAll = () => {
    setSelectedBuildings([]);
    setSelectedStatuses([]);
    setSelectedSeverities([]);
    setSelectedSensorTypes([]);
    setDateRange({ start: '', end: '' });
    setQuickTimeFilter('');
    notifyChange({ buildings: [], statuses: [], severities: [], sensorTypes: [], dateRange: { start: '', end: '' } });
  };

  const activeFilterCount = selectedBuildings.length + selectedStatuses.length + selectedSeverities.length + selectedSensorTypes.length + (dateRange.start || dateRange.end ? 1 : 0);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      {/* Main Filter Row - Time Filter Always Visible */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Time Filter Section */}
        {showDateFilter && (
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Clock className="size-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Time:</span>
            
            {/* Quick Time Buttons */}
            <div className="flex items-center gap-1">
              {quickTimeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => applyQuickTimeFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    quickTimeFilter === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Custom Date Range */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-300">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => {
                  setQuickTimeFilter('');
                  const newRange = { ...dateRange, start: e.target.value };
                  setDateRange(newRange);
                  notifyChange({ 
                    buildings: selectedBuildings, 
                    statuses: selectedStatuses, 
                    severities: selectedSeverities, 
                    sensorTypes: selectedSensorTypes, 
                    dateRange: newRange 
                  });
                }}
                className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="From"
              />
              <span className="text-gray-400">→</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => {
                  setQuickTimeFilter('');
                  const newRange = { ...dateRange, end: e.target.value };
                  setDateRange(newRange);
                  notifyChange({ 
                    buildings: selectedBuildings, 
                    statuses: selectedStatuses, 
                    severities: selectedSeverities, 
                    sensorTypes: selectedSensorTypes, 
                    dateRange: newRange 
                  });
                }}
                className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="To"
              />
            </div>
          </div>
        )}

        {/* Advanced Filters Button */}
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-gray-700"
        >
          <Filter className="size-5" />
          <span>Advanced Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`size-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Clear All Button */}
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="size-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Advanced Filters Dropdown */}
      {isAdvancedOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Building Filter */}
          {showBuildingFilter && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="size-4 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Buildings</label>
              </div>
              <div className="space-y-2">
                {buildings.map(building => (
                  <label key={building} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBuildings.includes(building)}
                      onChange={() => toggleFilter(building, selectedBuildings, setSelectedBuildings)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{building}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Status Filter */}
          {showStatusFilter && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="size-4 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Status</label>
              </div>
              <div className="space-y-2">
                {statuses.map(status => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status)}
                      onChange={() => toggleFilter(status, selectedStatuses, setSelectedStatuses)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-2">
                      <span className={`size-2 rounded-full ${
                        status === 'Operational' ? 'bg-green-500' :
                        status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Severity Filter */}
          {showSeverityFilter && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="size-4 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Incident Severity</label>
              </div>
              <div className="space-y-2">
                {severities.map(severity => (
                  <label key={severity} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSeverities.includes(severity)}
                      onChange={() => toggleFilter(severity, selectedSeverities, setSelectedSeverities)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className={`text-sm font-medium ${
                      severity === 'Critical' ? 'text-red-600' :
                      severity === 'High' ? 'text-orange-600' :
                      severity === 'Medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      {severity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Sensor Type Filter */}
          {showSensorTypeFilter && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="size-4 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Sensor Types</label>
              </div>
              <div className="space-y-2">
                {sensorTypes.map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSensorTypes.includes(type)}
                      onChange={() => toggleFilter(type, selectedSensorTypes, setSelectedSensorTypes)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}