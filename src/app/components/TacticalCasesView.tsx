import { useState } from 'react';
import { Search, Plus, X, MapPin, Clock, AlertTriangle, ChevronRight, Calendar, Filter, Shield, ArrowLeft, Check, Save, Play, Building2, Layers, FileText, CheckCircle } from 'lucide-react';
import { Language, translations } from '../translations';
import { EnhancedLocationSelector } from './EnhancedLocationSelector';
import { ThreatTimeline } from './ThreatTimeline';

interface ThreatType {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface Threat {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timeOccurrence?: string; // When this threat occurs in the timeline (e.g., "0h", "2h 30m", "1d 12h")
  timeValue?: number; // Numeric value for timeline positioning (e.g., 2.5 for 2h 30m, or 1.5 for 1d 12h in days)
  // Threat-specific parameters
  specificType?: string; // Gas type, agent type, source type, etc.
  threshold?: string; // Concentration, exposure, radiation level, etc.
}

interface TacticalCase {
  id: string;
  name: string;
  description: string;
  threats: Threat[];
  status: 'draft' | 'active' | 'completed' | 'archived';
  createdAt: string;
  createdBy: string;
  duration?: string;
  totalDuration?: string; // Total case duration (e.g., "72h", "30d")
  results?: string;
}

interface TacticalCasesViewProps {
  language: Language;
  onDrillClick: (drillId: string) => void;
  caseStatuses?: { [caseId: string]: 'draft' | 'active' | 'completed' | 'archived' };
  onCaseStatusUpdate?: (caseId: string, newStatus: 'draft' | 'active' | 'completed' | 'archived') => void;
  emergencyMode?: boolean;
  onStartSimulation?: (caseId: string, caseName: string) => void;
}

const threatTypes: ThreatType[] = [
  { id: 'chemical', name: 'Chemical', icon: AlertTriangle, color: 'text-green-600' },
  { id: 'biological', name: 'Biological', icon: AlertTriangle, color: 'text-emerald-600' },
  { id: 'radiological', name: 'Radiological', icon: AlertTriangle, color: 'text-yellow-600' },
  { id: 'nuclear', name: 'Nuclear', icon: AlertTriangle, color: 'text-orange-600' },
  { id: 'explosive', name: 'Explosive', icon: AlertTriangle, color: 'text-red-600' },
];

// Mock data
const mockTacticalCases: TacticalCase[] = [
  {
    id: '1',
    name: 'Extended Duration Scenario',
    description: 'Prolonged hostile force containment with resource management protocols',
    threats: [
      { type: 'hostileForce', severity: 'critical', location: 'Perimeter - All Sectors' },
      { type: 'cyber', severity: 'high', location: 'Floor 1 - Command Center' },
      { type: 'structuralFailure', severity: 'medium', location: 'Floor 2' },
    ],
    status: 'completed',
    createdAt: '2024-12-20T08:00:00',
    createdBy: 'Facility Commander',
    duration: '72 hours',
    results: 'All defensive systems operational. Supply reserves at 72%',
  },
  {
    id: '2',
    name: 'VIP Evacuation Protocol',
    description: 'Emergency extraction of high-value personnel under threat conditions',
    threats: [
      { type: 'hostileForce', severity: 'critical', location: 'Floor 3 - Secure Wing' },
      { type: 'explosive', severity: 'high', location: 'Floor 1 - Exit Route Alpha' },
    ],
    status: 'active',
    createdAt: '2025-01-06T14:20:00',
    createdBy: 'Facility Commander',
  },
  {
    id: '3',
    name: 'Chemical Agent Attack Response',
    description: 'Chlorine gas breach in HVAC system - Floor 2 Sector B',
    threats: [
      { type: 'chemical', severity: 'critical', location: 'Floor 2 - Sector B' },
    ],
    status: 'draft',
    createdAt: '2025-01-07T09:15:00',
    createdBy: 'Facility Commander',
    duration: '18 minutes',
    results: 'HVAC breach sealed. Contamination contained. Air quality restored in 18 minutes',
  },
];

export function TacticalCasesView({ language, onDrillClick, caseStatuses, onCaseStatusUpdate, emergencyMode, onStartSimulation }: TacticalCasesViewProps) {
  const t = translations[language];
  const [cases, setCases] = useState<TacticalCase[]>(mockTacticalCases);
  const [filteredCases, setFilteredCases] = useState<TacticalCase[]>(mockTacticalCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddPage, setShowAddPage] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'threats'>('general');
  const [currentStep, setCurrentStep] = useState(1); // 1 = general, 2 = threats
  
  // New case form state
  const [newCaseName, setNewCaseName] = useState('');
  const [newCaseDescription, setNewCaseDescription] = useState('');
  const [newCaseDuration, setNewCaseDuration] = useState('');
  const [durationValue, setDurationValue] = useState('');
  const [durationType, setDurationType] = useState<'hours' | 'days' | 'months'>('hours');
  const [selectedThreats, setSelectedThreats] = useState<Threat[]>([]);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [activeLocationThreatIndex, setActiveLocationThreatIndex] = useState<number | null>(null);
  const [newThreatLocationCallback, setNewThreatLocationCallback] = useState<((location: string) => void) | null>(null);
  const [floorSelectionMode, setFloorSelectionMode] = useState<'real' | 'conceptual'>('real');
  // Always use 'detailed' mode - complexity selector has been removed
  const scenarioComplexity = 'detailed';
  
  // Simulation state
  const [showSimulation, setShowSimulation] = useState(false);
  const [simulatingScenarioId, setSimulatingScenarioId] = useState<string | null>(null);
  const [simulatingScenarioName, setSimulatingScenarioName] = useState<string>('');

  // Handle filtering
  const handleFilter = (search: string, status: string) => {
    let filtered = cases;
    
    if (search) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }
    
    setFilteredCases(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    handleFilter(value, statusFilter);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    handleFilter(searchQuery, value);
  };

  const addThreat = (type: string) => {
    const newThreat: Threat = {
      type,
      severity: 'medium',
      location: '',
    };
    setSelectedThreats([...selectedThreats, newThreat]);
  };

  const removeThreat = (index: number) => {
    setSelectedThreats(selectedThreats.filter((_, i) => i !== index));
  };

  const updateThreat = (index: number, field: keyof Threat, value: any) => {
    const updated = [...selectedThreats];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedThreats(updated);
  };

  const handleSaveNewCase = () => {
    if (!newCaseName || selectedThreats.length === 0) return;

    const newCase: TacticalCase = {
      id: String(cases.length + 1),
      name: newCaseName,
      description: newCaseDescription,
      threats: selectedThreats,
      status: 'draft',
      createdAt: new Date().toISOString(),
      createdBy: 'Facility Commander',
      duration: newCaseDuration,
    };

    setCases([newCase, ...cases]);
    setFilteredCases([newCase, ...filteredCases]);
    
    // Reset form
    setNewCaseName('');
    setNewCaseDescription('');
    setNewCaseDuration('');
    setSelectedThreats([]);
    setShowAddPage(false);
    setActiveTab('general');
  };

  const handleSaveAndActivate = () => {
    if (!newCaseName || selectedThreats.length === 0) return;

    const newCase: TacticalCase = {
      id: String(cases.length + 1),
      name: newCaseName,
      description: newCaseDescription,
      threats: selectedThreats,
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: 'Facility Commander',
      duration: newCaseDuration,
    };

    setCases([newCase, ...cases]);
    setFilteredCases([newCase, ...filteredCases]);
    
    // Start simulation via callback to App.tsx
    if (onStartSimulation) {
      onStartSimulation(newCase.id, newCase.name);
    }
    
    // Reset form
    setNewCaseName('');
    setNewCaseDescription('');
    setNewCaseDuration('');
    setSelectedThreats([]);
    setShowAddPage(false);
    setActiveTab('general');
  };

  const handleCancelNewCase = () => {
    setNewCaseName('');
    setNewCaseDescription('');
    setNewCaseDuration('');
    setSelectedThreats([]);
    setShowAddPage(false);
    setActiveTab('general');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'archived': return 'bg-slate-100 text-slate-600 border-slate-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getThreatIcon = (type: string) => {
    const threat = threatTypes.find(t => t.id === type);
    return threat ? { Icon: threat.icon, color: threat.color } : { Icon: AlertTriangle, color: 'text-gray-600' };
  };

  const getThreatName = (type: string) => {
    const nameMap: { [key: string]: keyof typeof translations.en } = {
      'chemical': 'chemical',
      'biological': 'biological',
      'radiological': 'radiological',
      'nuclear': 'nuclear',
      'explosive': 'explosive',
      'cyber': 'cyber',
      'structuralFailure': 'structuralFailure',
      'hostileForce': 'hostileForce',
    };
    
    const key = nameMap[type];
    return key ? t[key] : type;
  };

  const getCaseName = (caseId: string) => {
    const nameMap: { [key: string]: keyof typeof translations.en } = {
      '1': 'case1Name',
      '2': 'case2Name',
      '3': 'case3Name',
    };
    const key = nameMap[caseId];
    return key ? t[key] : '';
  };

  const getCaseDescription = (caseId: string) => {
    const descMap: { [key: string]: keyof typeof translations.en } = {
      '1': 'case1Desc',
      '2': 'case2Desc',
      '3': 'case3Desc',
    };
    const key = descMap[caseId];
    return key ? t[key] : '';
  };

  const getCaseLocation = (caseId: string, threatIndex: number) => {
    const locationKey = `case${caseId}Location${threatIndex + 1}` as keyof typeof translations.en;
    return t[locationKey] || '';
  };

  const getCaseResults = (caseId: string) => {
    const resultKey = `case${caseId}Results` as keyof typeof translations.en;
    return t[resultKey] || '';
  };

  const getSeverityText = (severity: string) => {
    const severityMap: { [key: string]: keyof typeof translations.en } = {
      'low': 'low',
      'medium': 'medium',
      'high': 'high',
      'critical': 'critical',
    };
    const key = severityMap[severity];
    return key ? t[key] : severity;
  };

  const getDurationText = (duration: string) => {
    if (language === 'en') return duration;
    
    // Extract number and unit from duration strings
    const minutesMatch = duration.match(/(\d+)\s+minutes?/);
    if (minutesMatch) {
      return `${minutesMatch[1]} ${t.minutes}`;
    }
    
    const hoursMatch = duration.match(/(\d+)\s+hours?/);
    if (hoursMatch) {
      return `${hoursMatch[1]} ${t.hours}`;
    }
    
    const daysMatch = duration.match(/(\d+)\s+days?/);
    if (daysMatch) {
      return `${daysMatch[1]} ${t.days}`;
    }
    
    return duration;
  };

  // Generate timeline points based on duration
  const generateTimelinePoints = () => {
    if (!durationValue) return [];
    const value = parseInt(durationValue);
    const points: number[] = [];
    
    if (durationType === 'hours') {
      // For hours, create points at each hour
      for (let i = 0; i <= value; i++) {
        points.push(i);
      }
    } else if (durationType === 'days') {
      // For days, create points at each day
      for (let i = 0; i <= value; i++) {
        points.push(i);
      }
    } else if (durationType === 'months') {
      // For months, create points at each month
      for (let i = 0; i <= value; i++) {
        points.push(i);
      }
    }
    
    return points;
  };

  // Format timepoint label
  const formatTimepoint = (point: number) => {
    if (durationType === 'hours') {
      return language === 'ar' ? `${point}س` : `${point}h`;
    } else if (durationType === 'days') {
      return language === 'ar' ? `${point}ي` : `${point}d`;
    } else {
      return language === 'ar' ? `${point}ش` : `${point}m`;
    }
  };

  // Add threat at specific timepoint
  const addThreatAtTime = (threatType: string, timeValue: number) => {
    const newThreat: Threat = {
      type: threatType,
      severity: 'medium',
      location: '',
      timeValue,
      timeOccurrence: formatTimepoint(timeValue),
    };
    setSelectedThreats([...selectedThreats, newThreat]);
    setShowThreatModal(false);
  };

  // Get threat-specific parameter options
  const getThreatSpecificOptions = (threatType: string) => {
    switch (threatType) {
      case 'chemical':
        return {
          typeLabel: t.gasType,
          typeOptions: [
            { value: '', label: language === 'ar' ? 'اختر نوع الغاز' : 'Select gas type' },
            { value: 'chlorine', label: t.chlorine },
            { value: 'sarin', label: t.sarin },
            { value: 'vxGas', label: t.vxGas },
            { value: 'mustardGas', label: t.mustardGas },
            { value: 'phosgene', label: t.phosgene },
          ],
          thresholdLabel: t.concentrationLevel,
          thresholdOptions: [
            { value: '', label: language === 'ar' ? 'اختر مستوى التركيز' : 'Select concentration' },
            { value: 'trace', label: language === 'ar' ? 'أثر (< 1 ppm)' : 'Trace (< 1 ppm)' },
            { value: 'low', label: language === 'ar' ? 'منخفض (1-10 ppm)' : 'Low (1-10 ppm)' },
            { value: 'medium', label: language === 'ar' ? 'متوسط (10-50 ppm)' : 'Medium (10-50 ppm)' },
            { value: 'high', label: language === 'ar' ? 'عالي (50-100 ppm)' : 'High (50-100 ppm)' },
            { value: 'lethal', label: language === 'ar' ? 'قاتل (> 100 ppm)' : 'Lethal (> 100 ppm)' },
          ],
        };
      case 'biological':
        return {
          typeLabel: t.agentType,
          typeOptions: [
            { value: '', label: language === 'ar' ? 'اختر نوع العامل' : 'Select agent type' },
            { value: 'anthrax', label: t.anthrax },
            { value: 'smallpox', label: t.smallpox },
            { value: 'plague', label: t.plague },
            { value: 'ricin', label: t.ricin },
            { value: 'botulinum', label: t.botulinum },
          ],
          thresholdLabel: t.exposureLevel,
          thresholdOptions: [
            { value: '', label: language === 'ar' ? 'اختر مستوى التعرض' : 'Select exposure level' },
            { value: 'minimal', label: language === 'ar' ? 'الحد الأدنى' : 'Minimal' },
            { value: 'moderate', label: language === 'ar' ? 'متوسط' : 'Moderate' },
            { value: 'severe', label: language === 'ar' ? 'شديد' : 'Severe' },
            { value: 'critical', label: language === 'ar' ? 'حرج' : 'Critical' },
          ],
        };
      case 'radiological':
        return {
          typeLabel: t.sourceType,
          typeOptions: [
            { value: '', label: language === 'ar' ? 'اختر نوع المصدر' : 'Select source type' },
            { value: 'cesium137', label: t.cesium137 },
            { value: 'cobalt60', label: t.cobalt60 },
            { value: 'iridium192', label: t.iridium192 },
            { value: 'strontium90', label: t.strontium90 },
          ],
          thresholdLabel: t.radiationLevel,
          thresholdOptions: [
            { value: '', label: language === 'ar' ? 'اختر مستوى الإشعاع' : 'Select radiation level' },
            { value: 'background', label: language === 'ar' ? 'خلفية (< 0.1 mSv/h)' : 'Background (< 0.1 mSv/h)' },
            { value: 'elevated', label: language === 'ar' ? 'مرتفع (0.1-1 mSv/h)' : 'Elevated (0.1-1 mSv/h)' },
            { value: 'dangerous', label: language === 'ar' ? 'خطير (1-10 mSv/h)' : 'Dangerous (1-10 mSv/h)' },
            { value: 'lethal', label: language === 'ar' ? 'قاتل (> 10 mSv/h)' : 'Lethal (> 10 mSv/h)' },
          ],
        };
      case 'nuclear':
        return {
          typeLabel: t.deviceType,
          typeOptions: [
            { value: '', label: language === 'ar' ? 'اختر نوع الجهاز' : 'Select device type' },
            { value: 'tactical', label: language === 'ar' ? 'تكتيكي (< 1 kt)' : 'Tactical (< 1 kt)' },
            { value: 'strategic', label: language === 'ar' ? 'استراتيجي (1-100 kt)' : 'Strategic (1-100 kt)' },
            { value: 'thermonuclear', label: language === 'ar' ? 'نووي حراري (> 100 kt)' : 'Thermonuclear (> 100 kt)' },
          ],
          thresholdLabel: t.blastYield,
          thresholdOptions: [
            { value: '', label: language === 'ar' ? 'اختر قوة الانفجار' : 'Select blast yield' },
            { value: 'sub1kt', label: language === 'ar' ? '< 1 كيلوطن' : '< 1 kiloton' },
            { value: '1-10kt', label: language === 'ar' ? '1-10 كيلوطن' : '1-10 kilotons' },
            { value: '10-100kt', label: language === 'ar' ? '10-100 كيلوطن' : '10-100 kilotons' },
            { value: 'over100kt', label: language === 'ar' ? '> 100 كيلوطن' : '> 100 kilotons' },
          ],
        };
      case 'explosive':
        return {
          typeLabel: t.deviceType,
          typeOptions: [
            { value: '', label: language === 'ar' ? 'اختر نوع الجهاز' : 'Select device type' },
            { value: 'ied', label: t.ied },
            { value: 'mine', label: t.mine },
            { value: 'rpg', label: t.rpg },
            { value: 'mortar', label: t.mortar },
            { value: 'grenade', label: t.grenade },
          ],
          thresholdLabel: t.blastYield,
          thresholdOptions: [
            { value: '', label: language === 'ar' ? 'اختر قوة الانفجار' : 'Select blast yield' },
            { value: 'small', label: language === 'ar' ? 'صغير (< 1 كجم)' : 'Small (< 1 kg)' },
            { value: 'medium', label: language === 'ar' ? 'متوسط (1-10 كجم)' : 'Medium (1-10 kg)' },
            { value: 'large', label: language === 'ar' ? 'كبير (10-100 كجم)' : 'Large (10-100 kg)' },
            { value: 'massive', label: language === 'ar' ? 'هائل (> 100 كجم)' : 'Massive (> 100 kg)' },
          ],
        };
      default:
        return null;
    }
  };

  // If showing add page
  if (showAddPage) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCancelNewCase();
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="size-5" />
            <span>{t.backToCases}</span>
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900">{t.addNewTacticalCase}</h2>
          </div>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center flex-1 text-left ${currentStep >= 1 ? 'cursor-pointer hover:opacity-80' : ''} transition-opacity`}
            >
              <div className={`flex items-center justify-center size-10 rounded-full font-semibold ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > 1 ? <Check className="size-5" /> : '1'}
              </div>
              <div className={`ml-3 ${language === 'ar' ? 'mr-3 ml-0' : ''}`}>
                <div className={`font-medium ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                  {t.step} 1
                </div>
                <div className="text-sm text-gray-600">{t.generalInfo}</div>
              </div>
            </button>

            {/* Connector Line */}
            <div className="flex-1 mx-4">
              <div className={`h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            </div>

            {/* Step 2 */}
            <div className="flex items-center flex-1 justify-end">
              <div className={`${language === 'ar' ? 'order-2 mr-3' : 'order-1'}`}>
                <div className={`font-medium text-right ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                  {t.step} 2
                </div>
                <div className="text-sm text-gray-600 text-right">{t.threatConfiguration}</div>
              </div>
              <div className={`flex items-center justify-center size-10 rounded-full font-semibold ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              } ${language === 'ar' ? 'order-1 mr-0' : 'order-2 ml-3'}`}>
                2
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[500px]">
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Basic Information Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-blue-600 text-white">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {language === 'ar' ? 'معلومات أساسية' : 'Basic Information'}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'تفاصيل الحالة التكتيكية' : 'Tactical case details'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Case Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Shield className="size-4 text-blue-600" />
                      {t.caseName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newCaseName}
                      onChange={(e) => setNewCaseName(e.target.value)}
                      placeholder={t.enterCaseName}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Case Description */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="size-4 text-blue-600" />
                      {t.description}
                    </label>
                    <textarea
                      value={newCaseDescription}
                      onChange={(e) => setNewCaseDescription(e.target.value)}
                      placeholder={t.describeScenario}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium text-gray-900 placeholder:text-gray-400 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Duration Configuration Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-purple-600 text-white">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {language === 'ar' ? 'مدة الحالة' : 'Case Duration'}
                      <span className="text-red-500 ml-1">*</span>
                    </h3>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'كم من الوقت ستستمر هذه الحالة' : 'How long will this case run'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      {language === 'ar' ? 'نوع المدة' : 'Duration Type'}
                    </label>
                    <select
                      value={durationType}
                      onChange={(e) => setDurationType(e.target.value as 'hours' | 'days' | 'months')}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-semibold text-gray-900"
                    >
                      <option value="hours">{t.hours}</option>
                      <option value="days">{t.days}</option>
                      <option value="months">{t.months}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      {language === 'ar' ? 'القيمة' : 'Value'}
                    </label>
                    <input
                      type="number"
                      value={durationValue}
                      onChange={(e) => setDurationValue(e.target.value)}
                      placeholder={language === 'ar' ? 'أدخل القيمة' : 'Enter value'}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-semibold text-gray-900 placeholder:text-gray-400"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Floor Selection Mode Card - Only show for detailed scenarios */}
              {scenarioComplexity === 'detailed' && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-amber-600 text-white">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">
                        {language === 'ar' ? 'نوع الطابق للتهديدات' : 'Floor Type for Threats'}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {language === 'ar' 
                          ? 'اختر ما إذا كانت التهديدات ستُوضع على الطوابق الحقيقية أو المخططات المفاهيمية'
                          : 'Choose whether threats will be placed on real facility floors or conceptual floor plans'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setFloorSelectionMode('real')}
                      className={`group relative overflow-hidden px-5 py-6 rounded-xl font-bold text-sm transition-all ${
                        floorSelectionMode === 'real'
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className={`flex items-center justify-center size-14 rounded-full transition-colors ${
                          floorSelectionMode === 'real' 
                            ? 'bg-white/20' 
                            : 'bg-blue-50 group-hover:bg-blue-100'
                        }`}>
                          <Building2 className={`size-7 ${
                            floorSelectionMode === 'real' ? 'text-white' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-base mb-1">
                            {language === 'ar' ? 'الطوابق الحقيقية' : 'Facility Floors'}
                          </div>
                          <div className={`text-xs leading-relaxed ${
                            floorSelectionMode === 'real' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {language === 'ar' 
                              ? 'استخدم الطوابق الموجودة في المنشأة'
                              : 'Use existing facility floors'}
                          </div>
                        </div>
                        {floorSelectionMode === 'real' && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle className="size-5 text-white" />
                          </div>
                        )}
                      </div>
                    </button>

                    <button
                      onClick={() => setFloorSelectionMode('conceptual')}
                      className={`group relative overflow-hidden px-5 py-6 rounded-xl font-bold text-sm transition-all ${
                        floorSelectionMode === 'conceptual'
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className={`flex items-center justify-center size-14 rounded-full transition-colors ${
                          floorSelectionMode === 'conceptual' 
                            ? 'bg-white/20' 
                            : 'bg-indigo-50 group-hover:bg-indigo-100'
                        }`}>
                          <Layers className={`size-7 ${
                            floorSelectionMode === 'conceptual' ? 'text-white' : 'text-indigo-600'
                          }`} />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-base mb-1">
                            {language === 'ar' ? 'المخططات المفاهيمية' : 'Conceptual Floors'}
                          </div>
                          <div className={`text-xs leading-relaxed ${
                            floorSelectionMode === 'conceptual' ? 'text-indigo-100' : 'text-gray-500'
                          }`}>
                            {language === 'ar' 
                              ? 'استخدم المخططات المقترحة للمنشأة'
                              : 'Use proposed floor plans'}
                          </div>
                        </div>
                        {floorSelectionMode === 'conceptual' && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle className="size-5 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <ThreatTimeline
              language={language}
              threats={selectedThreats}
              durationValue={durationValue}
              durationType={durationType}
              threatTypes={threatTypes}
              onAddThreat={(threat) => setSelectedThreats([...selectedThreats, threat])}
              onRemoveThreat={removeThreat}
              onUpdateThreat={updateThreat}
              onOpenLocationSelector={(index) => {
                setActiveLocationThreatIndex(index);
                setShowLocationSelector(true);
              }}
              onOpenLocationSelectorForNew={(callback) => {
                setNewThreatLocationCallback(() => callback);
                setActiveLocationThreatIndex(null); // Mark as new threat mode
                setShowLocationSelector(true);
              }}
              getThreatIcon={getThreatIcon}
              getThreatName={getThreatName}
              getSeverityColor={getSeverityColor}
              getSeverityText={getSeverityText}
              getThreatSpecificOptions={getThreatSpecificOptions}
              scenarioComplexity={scenarioComplexity}
            />
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            {currentStep === 1 && (!newCaseName ||  !durationValue) && (
              <p className="text-sm text-yellow-600 flex items-center gap-2">
                <AlertTriangle className="size-4" />
                {t.fillRequiredFields}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
              >
                <ArrowLeft className="size-4" />
                {t.previous}
              </button>
            )}
            
            <button
              onClick={handleCancelNewCase}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t.cancel}
            </button>
            
            {currentStep === 1 ? (
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!newCaseName || !durationValue}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.next}
                <ChevronRight className="size-4" />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveNewCase}
                  disabled={selectedThreats.length === 0}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="size-5" />
                  {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
                </button>
                <button
                  onClick={handleSaveAndActivate}
                  disabled={selectedThreats.length === 0}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="size-5" />
                  {language === 'ar' ? 'حفظ وتفعيل' : 'Save and Activate'}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Location Selector Popup */}
        {showLocationSelector && (
          <EnhancedLocationSelector
            language={language}
            emergencyMode={emergencyMode}
            initialMode={floorSelectionMode}
            onSelect={(location) => {
              if (activeLocationThreatIndex !== null) {
                // Updating existing threat
                updateThreat(activeLocationThreatIndex, 'location', location);
              } else if (newThreatLocationCallback) {
                // Updating new threat being configured
                newThreatLocationCallback(location);
                setNewThreatLocationCallback(null);
              }
              setShowLocationSelector(false);
              setActiveLocationThreatIndex(null);
            }}
            onClose={() => {
              setShowLocationSelector(false);
              setActiveLocationThreatIndex(null);
              setNewThreatLocationCallback(null);
            }}
          />
        )}
      </div>
    );
  }

  // Main list view
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? 'Situation Simulations' : 'محاكاة الحالات'}
          </h2>
          <p className="text-gray-600 mt-1">
            {language === 'en' ? 'Simulate emergency situations' : 'محاكاة حالات الطوارئ'}
          </p>
        </div>
        <button
          onClick={() => setShowAddPage(true)}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <Plus className="size-5" />
          {t.newCase}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchCases}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="size-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t.allStatus}</option>
              <option value="draft">{t.draft}</option>
              <option value="active">{t.active}</option>
              <option value="completed">{t.completed}</option>
              <option value="archived">{t.archived}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCases.map((tacticalCase) => (
          <div
            key={tacticalCase.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onDrillClick && onDrillClick(tacticalCase.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{getCaseName(tacticalCase.id)}</h3>
                <p className="text-sm text-gray-600">{getCaseDescription(tacticalCase.id)}</p>
              </div>
              <Shield className="size-6 text-blue-600 flex-shrink-0 ml-2" />
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(caseStatuses?.[tacticalCase.id] || tacticalCase.status)} uppercase`}>
                {language === 'ar' 
                  ? ((caseStatuses?.[tacticalCase.id] || tacticalCase.status) === 'draft' ? t.draft : 
                     (caseStatuses?.[tacticalCase.id] || tacticalCase.status) === 'active' ? t.active : 
                     (caseStatuses?.[tacticalCase.id] || tacticalCase.status) === 'completed' ? t.completed : t.archived)
                  : (caseStatuses?.[tacticalCase.id] || tacticalCase.status)}
              </span>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  <span>{new Date(tacticalCase.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                </div>
                {tacticalCase.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="size-3" />
                    <span>{getDurationText(tacticalCase.duration)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <Shield className="size-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t.noCasesFound}
          </h3>
          <p className="text-gray-600">
            {t.adjustSearchFilter}
          </p>
        </div>
      )}
    </div>
  );
}