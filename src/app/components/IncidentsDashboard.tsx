import { AlertTriangle, AlertCircle, Brain, CheckCircle2, Clock, Filter as FilterIcon, Search, XCircle, Activity, Zap } from 'lucide-react';
import { incidents } from '../data/mockData';
import { Filters } from './Filters';
import { useState } from 'react';
import { Language, translations } from '../translations';

interface IncidentsDashboardProps {
  onIncidentClick: (incidentId: string) => void;
  onNavigateToSummary: () => void;
  onNavigateToBuildings: () => void;
  language?: Language;
}

export function IncidentsDashboard({ onIncidentClick, onNavigateToSummary, onNavigateToBuildings, language = 'en' }: IncidentsDashboardProps) {
  const t = translations[language];
  const [filters, setFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = incidents.filter(i => i.status === 'active').length;
  const resolvedCount = incidents.filter(i => i.status === 'resolved').length;
  const criticalCount = incidents.filter(i => i.severity === 'critical').length;
  const ruleResolvedCount = incidents.filter(i => i.matchedRule).length;

  return (
    <div className="flex flex-col h-full">
      <Filters
        onFilterChange={handleFilterChange}
        showBuildingFilter={true}
        showStatusFilter={false}
        showSeverityFilter={true}
        showDateFilter={true}
        showSensorTypeFilter={true}
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {language === 'en' ? 'Incidents' : 'الحوادث'}
            </h2>
            <p className="text-gray-600 mt-1">
              {language === 'en' ? 'Monitor and manage active facility incidents' : 'مراقبة وإدارة حوادث المنشأة النشطة'}
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <StatCard
              icon={Activity}
              label={t.totalIncidents}
              value={incidents.length}
              color="blue"
            />
            <StatCard
              icon={AlertTriangle}
              label={language === 'en' ? 'Active Incidents' : 'حوادث نشطة'}
              value={activeCount}
              color="red"
            />
            <StatCard
              icon={CheckCircle2}
              label={language === 'en' ? 'Resolved Today' : 'تم حلها اليوم'}
              value={resolvedCount}
              color="green"
            />
            <StatCard
              icon={AlertCircle}
              label={language === 'en' ? 'Critical' : 'حرج'}
              value={criticalCount}
              color="orange"
            />
            <StatCard
              icon={Brain}
              label={language === 'en' ? 'AI-Assisted Resolution' : 'حل بمساعدة الذكاء الاصطناعي'}
              value={ruleResolvedCount}
              color="purple"
            />
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'resolved'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>

          {/* Incidents List */}
          <div className="space-y-4">
            {filteredIncidents.map(incident => (
              <button
                key={incident.id}
                onClick={() => onIncidentClick(incident.id)}
                className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  {/* Severity Indicator */}
                  <div className="flex-shrink-0">
                    <SeverityIcon severity={incident.severity} />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {incident.title}
                        </h3>
                        <p className="text-sm text-gray-600">{incident.location}</p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        {incident.matchedRule ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-green-100 text-green-800 border-green-200">
                            <Zap className="size-3" />
                            {language === 'en' ? 'Rule Matched' : 'تطابق قاعدة'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-purple-100 text-purple-800 border-purple-200">
                            <Brain className="size-3" />
                            {language === 'en' ? 'AI Suggested' : 'اقتراح الذكاء الاصطناعي'}
                          </span>
                        )}
                        <StatusBadge status={incident.status} language={language} />
                        <SeverityBadge severity={incident.severity} />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>
                          {Math.floor((Date.now() - incident.timestamp.getTime()) / 60000)}m ago
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Sensor: {incident.sensorId}</span>
                      </div>
                    </div>

                    {/* AI Prediction */}
                    {incident.matchedRule ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Zap className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-900 mb-1">
                              {language === 'en' ? 'Automation Rule Matched' : 'تطابق قاعدة الأتمتة'}
                            </p>
                            <p className="text-sm text-green-700 mb-1">
                              <span className="font-semibold">{incident.matchedRule}</span>
                            </p>
                            <p className="text-sm text-green-600">
                              {language === 'en' ? 'Action: ' : 'الإجراء: '}{incident.ruleAction}
                            </p>
                            <div className="mt-2 flex items-center gap-1 text-sm text-green-700">
                              <CheckCircle2 className="size-4" />
                              <span className="font-medium">
                                {language === 'en' ? 'Automated action applied' : 'تم تطبيق الإجراء التلقائي'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : incident.aiPrediction ? (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Brain className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-purple-900 mb-1">
                              {language === 'en' ? 'AI Analysis' : 'تحليل الذكاء الاصطناعي'}
                            </p>
                            <p className="text-sm text-purple-700">{incident.aiPrediction}</p>
                            {incident.autoActionApplied && (
                              <div className="mt-2 flex items-center gap-1 text-sm text-green-700">
                                <CheckCircle2 className="size-4" />
                                <span className="font-medium">
                                  {language === 'en' ? 'Automated action applied' : 'تم تطبيق الإجراء التلقائي'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredIncidents.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="size-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No incidents found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colorClasses = {
    red: 'bg-red-50 text-red-600 border-red-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
  };

  return (
    <div className={`rounded-xl border-2 p-4 ${colorClasses[color]}`}>
      <Icon className="size-6 mb-2" />
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm font-medium">{label}</p>
    </div>
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
    <div className={`p-3 rounded-lg ${styles[severity]}`}>
      <AlertCircle className="size-6" />
    </div>
  );
}

function StatusBadge({ status, language }: { status: string, language: Language }) {
  const styles = {
    active: 'bg-red-100 text-red-800 border-red-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    investigating: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  const icons = {
    active: AlertCircle,
    resolved: CheckCircle2,
    investigating: Clock,
  };

  const Icon = icons[status] || AlertCircle;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]} uppercase`}>
      <Icon className="size-3" />
      {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[severity]} uppercase`}>
      {severity}
    </span>
  );
}