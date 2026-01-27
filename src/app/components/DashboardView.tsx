import { Building2, Zap, TrendingUp, AlertTriangle, Activity, Users, Calendar, ArrowUpRight, Brain, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { buildings, incidents, automationRules } from '../data/mockData';
import { Filters } from './Filters';
import { useState } from 'react';

interface DashboardViewProps {
  onBuildingClick: (buildingId: string) => void;
  onIncidentClick: (incidentId: string) => void;
}

export function DashboardView({ onBuildingClick, onIncidentClick }: DashboardViewProps) {
  const [filters, setFilters] = useState<any>({});

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Here you would apply the filters to your data
    console.log('Filters applied:', newFilters);
  };

  return (
    <div className="flex flex-col h-full">      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard
              title="Total Buildings"
              value={buildings.length.toString()}
              icon={Activity}
              color="blue"
              subtitle={`${buildings.reduce((sum, b) => sum + b.sensors, 0)} sensors active`}
            />
            <MetricCard
              title="Active Incidents"
              value={incidents.filter(i => i.status === 'active').length.toString()}
              icon={AlertTriangle}
              color="red"
              subtitle={`${incidents.filter(i => i.severity === 'critical').length} critical`}
              trend="-12%"
            />
            <MetricCard
              title="Sensor Health"
              value="96.8%"
              icon={Activity}
              color="green"
              subtitle="548/566 sensors online"
              trend="+2.3%"
            />
            <MetricCard
              title="AI Actions Today"
              value="47"
              icon={Brain}
              color="purple"
              subtitle="32 auto-resolved"
              trend="+8%"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Building Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Building Status Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Operational', value: buildings.filter(b => b.status === 'operational').length, color: '#10b981' },
                      { name: 'Warning', value: buildings.filter(b => b.status === 'warning').length, color: '#f59e0b' },
                      { name: 'Critical', value: buildings.filter(b => b.status === 'critical').length, color: '#ef4444' },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Operational', value: buildings.filter(b => b.status === 'operational').length, color: '#10b981' },
                      { name: 'Warning', value: buildings.filter(b => b.status === 'warning').length, color: '#f59e0b' },
                      { name: 'Critical', value: buildings.filter(b => b.status === 'critical').length, color: '#ef4444' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Incident Severity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Incidents by Severity</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { name: 'Critical', count: incidents.filter(i => i.severity === 'critical').length },
                  { name: 'High', count: incidents.filter(i => i.severity === 'high').length },
                  { name: 'Medium', count: incidents.filter(i => i.severity === 'medium').length },
                  { name: 'Low', count: incidents.filter(i => i.severity === 'low').length },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Temperature Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Temperature Trends (24h)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[
                { time: '00:00', value: 22, threshold: 25 },
                { time: '01:00', value: 23, threshold: 25 },
                { time: '02:00', value: 24, threshold: 25 },
                { time: '03:00', value: 25, threshold: 25 },
                { time: '04:00', value: 26, threshold: 25 },
                { time: '05:00', value: 27, threshold: 25 },
                { time: '06:00', value: 28, threshold: 25 },
                { time: '07:00', value: 29, threshold: 25 },
                { time: '08:00', value: 30, threshold: 25 },
                { time: '09:00', value: 31, threshold: 25 },
                { time: '10:00', value: 32, threshold: 25 },
                { time: '11:00', value: 33, threshold: 25 },
                { time: '12:00', value: 34, threshold: 25 },
                { time: '13:00', value: 35, threshold: 25 },
                { time: '14:00', value: 36, threshold: 25 },
                { time: '15:00', value: 37, threshold: 25 },
                { time: '16:00', value: 38, threshold: 25 },
                { time: '17:00', value: 39, threshold: 25 },
                { time: '18:00', value: 40, threshold: 25 },
                { time: '19:00', value: 41, threshold: 25 },
                { time: '20:00', value: 42, threshold: 25 },
                { time: '21:00', value: 43, threshold: 25 },
                { time: '22:00', value: 44, threshold: 25 },
                { time: '23:00', value: 45, threshold: 25 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Temperature (°C)" strokeWidth={2} />
                <Line type="monotone" dataKey="threshold" stroke="#ef4444" name="Threshold" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Active Incidents */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Active Incidents</h3>
              <span className="text-sm text-gray-500">{incidents.filter(i => i.status === 'active').length} active</span>
            </div>
            <div className="space-y-3">
              {incidents.filter(i => i.status === 'active').slice(0, 5).map(incident => (
                <button
                  key={incident.id}
                  onClick={() => onIncidentClick(incident.id)}
                  className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <SeverityIcon severity={incident.severity} />
                      <div>
                        <h4 className="font-medium text-gray-900">{incident.title}</h4>
                        <p className="text-sm text-gray-600">{incident.location}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {Math.floor((Date.now() - incident.timestamp.getTime()) / 60000)}m ago
                    </span>
                  </div>
                  {incident.aiPrediction && (
                    <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Brain className="size-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-purple-900 font-medium">AI Analysis</p>
                          <p className="text-sm text-purple-700 mt-1">{incident.aiPrediction}</p>
                        </div>
                      </div>
                      {incident.autoActionApplied && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-green-700">
                          <CheckCircle2 className="size-3" />
                          <span>Automated action applied</span>
                        </div>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* AI Predictions */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">AI Predictions & Insights</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {buildings.map(building => (
                <div key={building.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Brain className="size-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Potential Issue in {building.name}</h4>
                      <p className="text-sm text-gray-600">Building {building.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">AI predicts a potential issue in the building's HVAC system.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Confidence: 85%</span>
                    <SeverityBadge severity="high" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Rules Summary */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Active Automation Rules</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Executions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {automationRules.map(rule => (
                    <tr key={rule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Zap className="size-4 text-yellow-600" />
                          <span className="text-sm font-medium text-gray-900">{rule.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rule.trigger}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rule.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{rule.executions}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {rule.enabled ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="size-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <XCircle className="size-3" />
                            Disabled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, subtitle, trend }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="size-6" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
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

function SeverityIcon({ severity }: { severity: string }) {
  const styles = {
    critical: 'text-red-600 bg-red-100',
    high: 'text-orange-600 bg-orange-100',
    medium: 'text-yellow-600 bg-yellow-100',
    low: 'text-blue-600 bg-blue-100',
  };

  return (
    <div className={`p-2 rounded-lg ${styles[severity]}`}>
      <AlertCircle className="size-5" />
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
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[severity]}`}>
      {severity}
    </span>
  );
}