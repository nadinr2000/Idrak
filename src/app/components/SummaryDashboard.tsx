import { Activity, AlertTriangle, Brain, TrendingUp, Zap, CheckCircle2, Radio, Thermometer, Droplets, Eye, Wind, Lightbulb, Lock, Sparkles, TrendingDown, AlertCircle, Lightbulb as BulbIcon, Calendar, Target, Layers, DoorOpen, LayoutGrid, Building2, ChevronDown, Shield, MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import { buildings, incidents, automationRules, floors } from '../data/mockData';
import { BuildingDiagram } from './BuildingDiagram';
import { BuildingDiagram3D } from './BuildingDiagram3D';
import { ViewMode } from './ViewToggle';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Language, translations, getIncidentTitle, getIncidentLocation } from '../translations';

interface SummaryDashboardProps {
  viewMode: ViewMode;
  onNavigateToFloors: () => void;
  onNavigateToIncidents: () => void;
  onNavigateToSensors: () => void;
  onFloorClick: (floorId: string) => void;
  onIncidentClick: (incidentId: string) => void;
  language: Language;
  emergencyMode?: boolean;
}

export function SummaryDashboard({ viewMode, onNavigateToFloors, onNavigateToIncidents, onNavigateToSensors, onFloorClick, onIncidentClick, language, emergencyMode }: SummaryDashboardProps) {
  const [incidentTimeRange, setIncidentTimeRange] = useState('30');
  const t = translations[language];

  // Sensor breakdown data
  const sensorBreakdownData = [
    { type: t.temperature, count: 156, icon: Thermometer, color: '#ef4444', status: { online: 152, offline: 4 } },
    { type: t.humidity, count: 124, icon: Droplets, color: '#3b82f6', status: { online: 120, offline: 4 } },
    { type: t.motion, count: 98, icon: Eye, color: '#8b5cf6', status: { online: 95, offline: 3 } },
    { type: t.airQuality, count: 87, icon: Wind, color: '#10b981', status: { online: 84, offline: 3 } },
    { type: t.light, count: 72, icon: Lightbulb, color: '#f59e0b', status: { online: 70, offline: 2 } },
    { type: t.access, count: 29, icon: Lock, color: '#6366f1', status: { online: 27, offline: 2 } },
  ];

  const totalSensors = sensorBreakdownData.reduce((sum, item) => sum + item.count, 0);

  // Incidents trend data - different datasets for different time ranges
  const incidentsTrendDataSets: Record<string, any[]> = {
    '7': [
      { date: 'Jan 30', ruleMatched: 3, conflict: 2, undefined: 1 },
      { date: 'Jan 31', ruleMatched: 5, conflict: 1, undefined: 2 },
      { date: 'Feb 1', ruleMatched: 2, conflict: 3, undefined: 1 },
      { date: 'Feb 2', ruleMatched: 4, conflict: 2, undefined: 2 },
      { date: 'Feb 3', ruleMatched: 6, conflict: 1, undefined: 1 },
      { date: 'Feb 4', ruleMatched: 3, conflict: 2, undefined: 3 },
      { date: 'Feb 5', ruleMatched: 5, conflict: 3, undefined: 2 },
    ],
    '30': [
      { date: 'Jan 6', ruleMatched: 5, conflict: 2, undefined: 1 },
      { date: 'Jan 9', ruleMatched: 7, conflict: 3, undefined: 2 },
      { date: 'Jan 12', ruleMatched: 4, conflict: 1, undefined: 1 },
      { date: 'Jan 15', ruleMatched: 8, conflict: 4, undefined: 3 },
      { date: 'Jan 18', ruleMatched: 6, conflict: 2, undefined: 2 },
      { date: 'Jan 21', ruleMatched: 5, conflict: 3, undefined: 1 },
      { date: 'Jan 24', ruleMatched: 7, conflict: 4, undefined: 3 },
      { date: 'Jan 27', ruleMatched: 5, conflict: 3, undefined: 3 },
      { date: 'Jan 30', ruleMatched: 3, conflict: 2, undefined: 2 },
      { date: 'Feb 2', ruleMatched: 6, conflict: 4, undefined: 3 },
    ],
    '90': [
      { date: 'Nov 10', ruleMatched: 8, conflict: 3, undefined: 2 },
      { date: 'Nov 20', ruleMatched: 6, conflict: 4, undefined: 1 },
      { date: 'Nov 30', ruleMatched: 9, conflict: 2, undefined: 3 },
      { date: 'Dec 10', ruleMatched: 7, conflict: 5, undefined: 2 },
      { date: 'Dec 20', ruleMatched: 5, conflict: 3, undefined: 2 },
      { date: 'Dec 30', ruleMatched: 6, conflict: 2, undefined: 1 },
      { date: 'Jan 10', ruleMatched: 8, conflict: 4, undefined: 3 },
      { date: 'Jan 20', ruleMatched: 7, conflict: 3, undefined: 2 },
      { date: 'Jan 30', ruleMatched: 5, conflict: 2, undefined: 2 },
      { date: 'Feb 5', ruleMatched: 6, conflict: 3, undefined: 2 },
    ],
  };

  const incidentsTrendData = incidentsTrendDataSets[incidentTimeRange];

  // Threat Classification Data
  const threatClassificationData = [
    { date: 'Jan 29', ruleMatched: 5, conflict: 2, undefined: 1 },
    { date: 'Jan 30', ruleMatched: 7, conflict: 3, undefined: 2 },
    { date: 'Jan 31', ruleMatched: 4, conflict: 2, undefined: 1 },
    { date: 'Feb 1', ruleMatched: 8, conflict: 4, undefined: 2 },
    { date: 'Feb 2', ruleMatched: 6, conflict: 2, undefined: 3 },
    { date: 'Feb 3', ruleMatched: 5, conflict: 3, undefined: 1 },
    { date: 'Feb 4', ruleMatched: 7, conflict: 4, undefined: 2 },
    { date: 'Feb 5', ruleMatched: 6, conflict: 3, undefined: 2 },
  ];

  // AI Suggestions Data
  const aiSuggestionsData = [
    { name: t.approved, value: 78, color: '#10b981' },
    { name: t.rejected, value: 22, color: '#ef4444' },
  ];

  // Energy Consumption Data
  const energyConsumptionData = [
    { system: t.hvac, consumption: 42, color: '#3b82f6' },
    { system: t.lighting, consumption: 28, color: '#f59e0b' },
    { system: t.security, consumption: 12, color: '#10b981' },
    { system: t.elevators, consumption: 10, color: '#8b5cf6' },
    { system: t.other, consumption: 8, color: '#6b7280' },
  ];

  // If in architectural view, show the building diagram
  if (viewMode === 'architectural') {
    return <BuildingDiagram3D onFloorClick={onFloorClick} language={language} emergencyMode={emergencyMode} />;
  }

  // If in 3D view, show the 3D building diagram
  if (viewMode === '3d') {
    return <BuildingDiagram3D onFloorClick={onFloorClick} language={language} emergencyMode={emergencyMode} />;
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-[2000px] mx-auto">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Incidents Metric with Breakdown - FIRST */}
          <MetricCardDetailed
            title={t.activeIncidents}
            value={incidents.filter(i => i.status === 'active').length.toString()}
            icon={AlertTriangle}
            color="red"
            onClick={onNavigateToIncidents}
            breakdown={[
              { label: t.critical, count: incidents.filter(i => i.severity === 'critical' && i.status === 'active').length, color: 'red' },
              { label: t.high, count: incidents.filter(i => i.severity === 'high' && i.status === 'active').length, color: 'orange' },
              { label: t.medium, count: incidents.filter(i => i.severity === 'medium' && i.status === 'active').length, color: 'yellow' },
              { label: t.low, count: incidents.filter(i => i.severity === 'low' && i.status === 'active').length, color: 'blue' },
            ]}
          />
          {/* Floors Metric with Breakdown */}
          <MetricCardDetailed
            title={t.totalFloors}
            value={floors.length.toString()}
            icon={Layers}
            color="blue"
            onClick={onNavigateToFloors}
            breakdown={[
              { label: t.operational, count: floors.filter(f => f.incidents === 0).length, color: 'green' },
              { label: t.withIssues, count: floors.filter(f => f.incidents > 0).length, color: 'yellow' },
            ]}
          />
          {/* Rooms Metric with Breakdown */}
          <MetricCardDetailed
            title={t.totalRooms}
            value={floors.reduce((sum, f) => sum + f.rooms, 0).toString()}
            icon={DoorOpen}
            color="indigo"
            onClick={onNavigateToFloors}
            breakdown={[
              { label: t.occupied, count: Math.floor(floors.reduce((sum, f) => sum + f.rooms, 0) * 0.65), color: 'blue' },
              { label: t.vacant, count: Math.floor(floors.reduce((sum, f) => sum + f.rooms, 0) * 0.35), color: 'gray' },
            ]}
          />
          {/* Sensors Metric with Breakdown */}
          <MetricCardDetailed
            title={t.activeSensors}
            value={totalSensors.toString()}
            icon={Radio}
            color="teal"
            onClick={onNavigateToSensors}
            breakdown={[
              { label: t.online, count: totalSensors - 18, color: 'green' },
              { label: t.offline, count: 18, color: 'red' },
            ]}
          />
          {/* Automation Rules Metric with Breakdown */}
          <MetricCardDetailed
            title={t.automationRules}
            value={automationRules.length.toString()}
            icon={Zap}
            color="yellow"
            breakdown={[
              { label: t.active, count: automationRules.filter(r => r.enabled).length, color: 'green' },
              { label: t.disabled, count: automationRules.filter(r => !r.enabled).length, color: 'gray' },
            ]}
          />
        </div>

        {/* Analytics & Trends Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Incidents Trend Chart with Dropdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="size-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{t.incidentsCountTrend}</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={incidentsTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={(data: any) => data.ruleMatched + data.conflict + data.undefined}
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name={t.totalIncidents}
                  dot={{ r: 5, fill: '#3b82f6' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.totalInPeriod}</span>
                  <span className="font-bold text-blue-600">
                    {incidentsTrendData.reduce((sum: number, item: any) => sum + item.ruleMatched + item.conflict + item.undefined, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.averagePerDay}</span>
                  <span className="font-bold text-blue-600">
                    {(incidentsTrendData.reduce((sum: number, item: any) => sum + item.ruleMatched + item.conflict + item.undefined, 0) / incidentsTrendData.length).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Threat Classification Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertCircle className="size-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{t.incidentsOverTime}</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={threatClassificationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ruleMatched" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name={t.ruleMatchedThreats}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="conflict" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name={t.conflictThreats}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="undefined" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name={t.undefinedThreats}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="size-2 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-600">{t.ruleMatched}</span>
                  </div>
                  <span className="font-bold text-green-600">48</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="size-2 rounded-full bg-orange-500" />
                    <span className="text-xs text-gray-600">{t.conflict}</span>
                  </div>
                  <span className="font-bold text-orange-600">21</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="size-2 rounded-full bg-red-500" />
                    <span className="text-xs text-gray-600">{t.undefined}</span>
                  </div>
                  <span className="font-bold text-red-600">14</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions and Energy Consumption Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* AI Suggestions Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Brain className="size-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{t.aiSuggestions}</h3>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={aiSuggestionsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {aiSuggestionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-3 rounded-full bg-green-500" />
                    <span className="text-gray-600">{t.approvedLabel}</span>
                  </div>
                  <span className="font-bold text-green-600">78</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-3 rounded-full bg-red-500" />
                    <span className="text-gray-600">{t.rejectedLabel}</span>
                  </div>
                  <span className="font-bold text-red-600">22</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-600 mb-1">{t.approvalRate}</span>
                  <span className="font-bold text-purple-600">78%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Energy Consumption Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Zap className="size-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{t.energyConsumption}</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="system" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  label={{ value: '%', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="consumption" radius={[8, 8, 0, 0]}>
                  {energyConsumptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-600 mb-1">{t.totalUsage}</span>
                  <span className="font-bold text-blue-600">12,450 kWh</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-600 mb-1">{t.vsLastMonth}</span>
                  <span className="font-bold text-green-600">-8.2%</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-600 mb-1">{t.costSavings}</span>
                  <span className="font-bold text-green-600">$245</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Incidents Preview - Moved to end */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{t.recentIncidents}</h3>
            <button
              onClick={onNavigateToIncidents}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {t.viewAll} →
            </button>
          </div>
          <div className="space-y-3">
            {incidents.slice(0, 3).map(incident => (
              <div key={incident.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <SeverityDot severity={incident.severity} />
                  <div>
                    <p className="font-medium text-gray-900">{getIncidentTitle(language, incident.title)}</p>
                    <p className="text-sm text-gray-600">{getIncidentLocation(language, incident.location)}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {Math.floor((Date.now() - incident.timestamp.getTime()) / 60000)}{t.minutes} {t.ago}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCardDetailed({ title, value, icon: Icon, color, onClick, breakdown }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    teal: 'bg-teal-50 text-teal-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  const dotColorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    gray: 'bg-gray-400',
    orange: 'bg-orange-500',
  };

  const cardClasses = onClick 
    ? 'bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 cursor-pointer transition-all hover:shadow-md hover:border-gray-300 min-w-0' 
    : 'bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 min-w-0';

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="size-5 sm:size-6" />
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">{value}</h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 truncate">{title}</p>
      {breakdown && (
        <div className="space-y-1.5 pt-2 sm:pt-3 border-t border-gray-100">
          {breakdown.map((item: any) => (
            <div key={item.label} className="flex items-center justify-between gap-2 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                <div className={`size-2 rounded-full flex-shrink-0 ${dotColorClasses[item.color]}`} />
                <span className="text-xs text-gray-600 truncate">{item.label}</span>
              </div>
              <span className="text-xs font-semibold text-gray-900 flex-shrink-0">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SeverityDot({ severity }: { severity: string }) {
  const colors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500',
  };

  return <div className={`size-3 rounded-full ${colors[severity]}`} />;
}

function AIInsightCard({ type, icon: Icon, iconColor, iconBg, title, description, confidence, action, timeframe, savings, status }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 ${iconBg} rounded-lg`}>
          <Icon className="size-5" style={{ color: iconColor }} />
        </div>
        <h4 className="font-medium text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="p-1 bg-gray-100 rounded-full">
            <CheckCircle2 className="size-3 text-gray-600" />
          </div>
          <span className="text-xs text-gray-500">Confidence: {confidence}%</span>
        </div>
        {type === 'prediction' && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
            {timeframe}
          </span>
        )}
        {type === 'suggestion' && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
            {savings}
          </span>
        )}
        {type === 'anomaly' && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
            {status}
          </span>
        )}
      </div>
      <button
        className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        {action} →
      </button>
    </div>
  );
}

function PredictionItem({ icon: Icon, title, description, probability, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 ${colorClasses[color]} rounded-lg`}>
          <Icon className="size-5" />
        </div>
        <h4 className="font-medium text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="p-1 bg-gray-100 rounded-full">
            <CheckCircle2 className="size-3 text-gray-600" />
          </div>
          <span className="text-xs text-gray-500">{probability}</span>
        </div>
      </div>
    </div>
  );
}