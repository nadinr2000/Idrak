import { Shield, Calendar, MapPin, Clock, AlertTriangle, CheckCircle, XCircle, Users, FileText, Download, Eye, TrendingUp, Activity, Search, Filter } from 'lucide-react';
import { Language, translations } from '../translations';
import { Filters } from './Filters';
import { useState } from 'react';

interface CBRNeThreatsViewProps {
  language?: Language;
}

interface ThreatReport {
  id: string;
  date: Date;
  type: 'Chemical' | 'Biological' | 'Radiological' | 'Nuclear' | 'Explosive';
  agent: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'contained' | 'mitigated' | 'resolved';
  casualties: number;
  responseTime: string;
  duration: string;
  affectedAreas: string[];
  responsibleUnit: string;
  decontaminationStatus: 'complete' | 'in-progress' | 'pending';
  reportGenerated: boolean;
}

const mockThreatReports: ThreatReport[] = [
  {
    id: 'THR-2025-001',
    date: new Date('2025-12-15T14:30:00'),
    type: 'Chemical',
    agent: 'Sarin Gas (GB)',
    location: 'Sector B',
    severity: 'critical',
    status: 'resolved',
    casualties: 0,
    responseTime: '4 minutes',
    duration: '2 hours 15 minutes',
    affectedAreas: ['Sector B', 'Corridor East'],
    responsibleUnit: 'CBRN Response Team Alpha',
    decontaminationStatus: 'complete',
    reportGenerated: true,
  },
  {
    id: 'THR-2025-002',
    date: new Date('2025-11-08T09:15:00'),
    type: 'Chemical',
    agent: 'Chlorine Gas (CL)',
    location: 'Ventilation System',
    severity: 'high',
    status: 'resolved',
    casualties: 2,
    responseTime: '6 minutes',
    duration: '3 hours 45 minutes',
    affectedAreas: ['All Sectors', 'North Wing'],
    responsibleUnit: 'CBRN Response Team Bravo',
    decontaminationStatus: 'complete',
    reportGenerated: true,
  },
  {
    id: 'THR-2024-018',
    date: new Date('2024-08-22T16:45:00'),
    type: 'Biological',
    agent: 'Anthrax Spores',
    location: 'Command Center',
    severity: 'critical',
    status: 'resolved',
    casualties: 1,
    responseTime: '8 minutes',
    duration: '6 hours 30 minutes',
    affectedAreas: ['Command Center', 'Medical Bay'],
    responsibleUnit: 'CBRN Response Team Alpha',
    decontaminationStatus: 'complete',
    reportGenerated: true,
  },
  {
    id: 'THR-2024-012',
    date: new Date('2024-05-10T11:20:00'),
    type: 'Radiological',
    agent: 'Cesium-137 (Cs-137)',
    location: 'Research Lab',
    severity: 'high',
    status: 'resolved',
    casualties: 0,
    responseTime: '5 minutes',
    duration: '12 hours 15 minutes',
    affectedAreas: ['Research Lab', 'Storage Area'],
    responsibleUnit: 'Radiological Hazmat Team',
    decontaminationStatus: 'complete',
    reportGenerated: true,
  },
  {
    id: 'THR-2023-031',
    date: new Date('2023-11-03T03:30:00'),
    type: 'Chemical',
    agent: 'VX Nerve Agent',
    location: 'Storage Facility',
    severity: 'critical',
    status: 'resolved',
    casualties: 3,
    responseTime: '7 minutes',
    duration: '4 hours 20 minutes',
    affectedAreas: ['Storage Facility', 'Equipment Room'],
    responsibleUnit: 'CBRN Response Team Alpha',
    decontaminationStatus: 'complete',
    reportGenerated: true,
  },
];

export function CBRNeAttacksView({ language = 'en' }: CBRNeThreatsViewProps) {
  const t = translations[language];
  const [filters, setFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Chemical' | 'Biological' | 'Radiological' | 'Nuclear' | 'Explosive'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // Filter reports based on search, type, severity, and date
  const filteredReports = mockThreatReports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
    
    // Date filter
    let matchesDate = true;
    if (filters.dateRange?.start || filters.dateRange?.end) {
      const reportDate = report.date.toISOString().split('T')[0];
      if (filters.dateRange.start && reportDate < filters.dateRange.start) matchesDate = false;
      if (filters.dateRange.end && reportDate > filters.dateRange.end) matchesDate = false;
    }
    
    return matchesSearch && matchesType && matchesSeverity && matchesDate;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Chemical': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Biological': return 'bg-green-100 text-green-800 border-green-200';
      case 'Radiological': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Nuclear': return 'bg-red-100 text-red-800 border-red-200';
      case 'Explosive': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="size-4 text-green-600" />;
      case 'mitigated': return <Activity className="size-4 text-blue-600" />;
      case 'contained': return <Shield className="size-4 text-orange-600" />;
      default: return <AlertTriangle className="size-4 text-gray-600" />;
    }
  };

  const totalAttacks = filteredReports.length;
  const chemicalAttacks = filteredReports.filter(r => r.type === 'Chemical').length;
  const biologicalAttacks = filteredReports.filter(r => r.type === 'Biological').length;
  const radiologicalAttacks = filteredReports.filter(r => r.type === 'Radiological').length;
  const totalCasualties = filteredReports.reduce((sum, r) => sum + r.casualties, 0);
  const avgResponseTime = '6 minutes';

  return (
    <div className="flex flex-col h-full">
      <Filters
        onFilterChange={handleFilterChange}
        showBuildingFilter={false}
        showStatusFilter={false}
        showSeverityFilter={true}
        showDateFilter={true}
        showSensorTypeFilter={false}
      />
      
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-red-100 rounded-xl">
                <Shield className="size-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'CBRNe Threat Reports' : 'تقارير تهديدات CBRNe'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Historical records of Chemical, Biological, Radiological, Nuclear, and Explosive incidents'
                    : 'السجلات التاريخية للحوادث الكيميائية والبيولوجية والإشعاعية والنووية والمتفجرات'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <StatCard
              title={language === 'en' ? 'Total Threats' : 'إجمالي التهديدات'}
              value={totalAttacks.toString()}
              icon={AlertTriangle}
              color="red"
            />
            <StatCard
              title={language === 'en' ? 'Chemical' : 'كيميائي'}
              value={chemicalAttacks.toString()}
              icon={Activity}
              color="purple"
            />
            <StatCard
              title={language === 'en' ? 'Biological' : 'بيولوجي'}
              value={biologicalAttacks.toString()}
              icon={Activity}
              color="green"
            />
            <StatCard
              title={language === 'en' ? 'Radiological' : 'إشعاعي'}
              value={radiologicalAttacks.toString()}
              icon={Activity}
              color="yellow"
            />
            <StatCard
              title={language === 'en' ? 'Total Casualties' : 'إجمالي الإصابات'}
              value={totalCasualties.toString()}
              icon={Users}
              color="orange"
            />
            <StatCard
              title={language === 'en' ? 'Avg Response' : 'متوسط الاستجابة'}
              value={avgResponseTime}
              icon={Clock}
              color="blue"
            />
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search threats by ID, agent, or location...' : 'البحث عن التهديدات بالمعرف أو العامل أو الموقع...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? 'All' : 'الكل'}
              </button>
              <button
                onClick={() => setTypeFilter('Chemical')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'Chemical'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? 'Chemical' : 'كيميائي'}
              </button>
              <button
                onClick={() => setTypeFilter('Biological')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'Biological'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? 'Biological' : 'بيولوجي'}
              </button>
              <button
                onClick={() => setTypeFilter('Radiological')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'Radiological'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? 'Radiological' : 'إشعاعي'}
              </button>
            </div>
          </div>

          {/* Severity Filter Bar */}
          <div className="mb-6 flex gap-2">
            <span className="text-sm font-medium text-gray-700 py-2">
              {language === 'en' ? 'Severity:' : 'الخطورة:'}
            </span>
            <button
              onClick={() => setSeverityFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? 'All' : 'الكل'}
            </button>
            <button
              onClick={() => setSeverityFilter('critical')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === 'critical'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? 'Critical' : 'حرج'}
            </button>
            <button
              onClick={() => setSeverityFilter('high')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === 'high'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? 'High' : 'مرتفع'}
            </button>
            <button
              onClick={() => setSeverityFilter('medium')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === 'medium'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? 'Medium' : 'متوسط'}
            </button>
            <button
              onClick={() => setSeverityFilter('low')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === 'low'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? 'Low' : 'منخفض'}
            </button>
          </div>

          {/* Threat Reports List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {language === 'en' ? `Threat History (${filteredReports.length} ${filteredReports.length === 1 ? 'result' : 'results'})` : `سجل التهديدات (${filteredReports.length} ${filteredReports.length === 1 ? 'نتيجة' : 'نتائج'})`}
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredReports.length === 0 ? (
                <div className="p-12 text-center">
                  <Shield className="size-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {language === 'en' ? 'No threat reports match your filters' : 'لا توجد تقارير تهديدات تطابق الفلاتر'}
                  </p>
                </div>
              ) : (
                filteredReports.map((report) => (
                  <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <Shield className="size-6 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{report.id}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(report.type)}`}>
                              {report.type}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(report.severity)}`}>
                              {report.severity.toUpperCase()}
                            </span>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              <span className="text-xs font-medium text-gray-700 capitalize">{report.status}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="size-4" />
                              <span>{report.date.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="size-4" />
                              <span>{report.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="size-4" />
                              <span>{language === 'en' ? 'Response' : 'الاستجابة'}: {report.responseTime}</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {language === 'en' ? 'Agent' : 'العامل'}: <span className="text-red-600">{report.agent}</span>
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">{language === 'en' ? 'Duration' : 'المدة'}:</span>
                              <p className="font-medium text-gray-900">{report.duration}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">{language === 'en' ? 'Casualties' : 'الإصابات'}:</span>
                              <p className="font-medium text-gray-900">{report.casualties}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">{language === 'en' ? 'Response Unit' : 'وحدة الاستجابة'}:</span>
                              <p className="font-medium text-gray-900">{report.responsibleUnit}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">{language === 'en' ? 'Decontamination' : 'إزالة التلوث'}:</span>
                              <p className="font-medium text-gray-900 capitalize">{report.decontaminationStatus}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className="text-sm text-gray-500">{language === 'en' ? 'Affected Areas' : 'المناطق المتضررة'}:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {report.affectedAreas.map((area, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-200">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Report">
                          <Eye className="size-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download Report">
                          <Download className="size-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FileText className="size-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  {language === 'en' ? 'Report Documentation' : 'توثيق التقارير'}
                </h3>
                <p className="text-sm text-blue-800">
                  {language === 'en'
                    ? 'All CBRNe threat reports are archived and available for review. Detailed incident analysis, response procedures, and lessons learned are documented for each event.'
                    : 'جميع تقارير تهديدات CBRNe مؤرشفة ومتاحة للمراجعة. يتم توثيق تحليل تفصيلي للحادث وإجراءات الاستجابة والدروس المستفادة لكل حدث.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const colorClasses = {
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className={`p-2 rounded-lg w-fit mb-3 ${colorClasses[color]}`}>
        <Icon className="size-5" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}