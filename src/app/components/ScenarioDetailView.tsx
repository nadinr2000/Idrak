import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, XCircle, TrendingUp, Shield, Users, Skull, Wifi, Building2, Brain, ListChecks, Wrench, Calendar, MapPin, ChevronRight, Zap, Activity, FileText, BarChart3, Play } from 'lucide-react';
import { Language, translations } from '../translations';

interface ThreatEvent {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  time: string;
  timeValue: number;
  description: string;
}

interface TacticalRecommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium';
  action: string;
  reason: string;
  applied: boolean;
  effect?: string;
}

interface AssessmentCheckpoint {
  time: string;
  timeValue: number;
  trigger: string;
  prediction: 'success' | 'partial' | 'failure';
  confidence: number;
  situationSummary: string;
  keyChanges: string[];
  recommendations: TacticalRecommendation[];
  relatedThreats: ThreatEvent[];
}

interface StrategicRecommendation {
  id: string;
  category: 'infrastructure' | 'equipment' | 'personnel' | 'protocol';
  recommendation: string;
  impact: string;
  estimatedCost: string;
  estimatedTime: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface ScenarioData {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'failed';
  startTime: string;
  endTime?: string;
  duration: string;
  threatEvents: ThreatEvent[];
  assessmentCheckpoints: AssessmentCheckpoint[];
  strategicRecommendations: StrategicRecommendation[];
  finalOutcome: string;
}

interface ScenarioDetailViewProps {
  scenarioId: string;
  language: Language;
  onBack: () => void;
  onEmergencyModeChange?: (emergencyMode: boolean) => void;
  onSimulationStateChange?: (state: {
    scenarioName: string;
    isRunning: boolean;
    isPaused: boolean;
    currentTime: number;
    speed: 1 | 2 | 4;
  } | null) => void;
  caseStatus?: 'draft' | 'active' | 'completed' | 'archived';
}

type TabType = 'summary' | 'details';

// Mock data for Extended Siege Scenario
const mockScenarioData: { [key: string]: ScenarioData } = {
  '1': {
    id: '1',
    name: 'Extended Siege Scenario',
    description: 'Prolonged hostile force containment with resource management protocols',
    status: 'failed',
    startTime: '2024-12-20T08:00:00',
    endTime: '2024-12-23T08:00:00',
    duration: '72 hours',
    threatEvents: [],
    assessmentCheckpoints: [
      {
        time: '24h',
        timeValue: 24,
        trigger: 'First Reassessment - Power Concerns',
        prediction: 'partial',
        confidence: 78,
        situationSummary: 'Siege conditions continuing. Power consumption 15% higher than projected. Backup fuel reserves being monitored closely.',
        keyChanges: ['Fuel consumption rate elevated', 'Load-shedding protocols initiated', 'Non-essential systems powered down'],
        recommendations: [
          {
            id: 'rec-24h-1',
            priority: 'high',
            action: 'Implement aggressive power conservation measures',
            reason: 'Current fuel consumption rate will exhaust reserves in 52 hours instead of projected 72 hours',
            applied: true,
            effect: 'Reduced consumption by 8%, extending reserves to approximately 60 hours'
          },
          {
            id: 'rec-24h-2',
            priority: 'critical',
            action: 'Activate emergency generator rotation protocol',
            reason: 'Continuous operation causing thermal stress on primary generator',
            applied: true,
            effect: 'Generator temperature stabilized, but fuel efficiency decreased by 3%'
          },
          {
            id: 'rec-24h-3',
            priority: 'medium',
            action: 'Reduce HVAC capacity to occupied zones only',
            reason: 'Life support systems consuming 40% of total power budget',
            applied: false
          }
        ],
        relatedThreats: []
      },
      {
        time: '48h',
        timeValue: 48,
        trigger: 'Critical Reassessment - System Degradation',
        prediction: 'partial',
        confidence: 65,
        situationSummary: 'Multiple system failures emerging. Primary power grid showing instability. Backup generators operating beyond recommended duty cycle. Fuel reserves at 35% - critical threshold approaching.',
        keyChanges: ['Primary grid voltage fluctuations detected', 'Generator #2 temperature warning', 'Fuel reserves below 40%', 'Personnel fatigue increasing'],
        recommendations: [
          {
            id: 'rec-48h-1',
            priority: 'critical',
            action: 'Prepare for emergency evacuation procedures',
            reason: 'Fuel reserves will be exhausted in approximately 20 hours at current consumption rate',
            applied: false
          },
          {
            id: 'rec-48h-2',
            priority: 'critical',
            action: 'Shut down secondary HVAC systems immediately',
            reason: 'Life support power consumption must be reduced to extend fuel reserves',
            applied: true,
            effect: 'Power consumption reduced 12%, but atmospheric quality declining in non-essential zones'
          },
          {
            id: 'rec-48h-3',
            priority: 'high',
            action: 'Initiate manual load management override',
            reason: 'Automated load-shedding system prioritizing incorrectly, causing cascade risks',
            applied: true,
            effect: 'Stabilized critical systems temporarily but required continuous manual intervention'
          }
        ],
        relatedThreats: []
      },
      {
        time: '68h',
        timeValue: 68,
        trigger: 'Catastrophic Failure - Life Support Collapse',
        prediction: 'failure',
        confidence: 92,
        situationSummary: 'Primary power grid failure. Backup generator fuel exhausted. Life support systems offline. Emergency evacuation initiated under degraded atmospheric conditions.',
        keyChanges: ['Primary power grid total failure', 'Backup generator fuel depleted', 'Life support systems offline', 'Emergency battery power - 4 hours remaining', 'Emergency evacuation initiated'],
        recommendations: [
          {
            id: 'rec-68h-1',
            priority: 'critical',
            action: 'Execute immediate emergency evacuation',
            reason: 'Life support systems failed, atmospheric conditions degrading rapidly',
            applied: true,
            effect: 'All personnel evacuated, 23 required medical treatment for heat exhaustion and respiratory distress'
          },
          {
            id: 'rec-68h-2',
            priority: 'critical',
            action: 'Activate emergency ventilation on battery power',
            reason: 'Maintain minimal air circulation during evacuation',
            applied: true,
            effect: 'Prevented complete atmospheric failure, enabled safe evacuation corridor'
          }
        ],
        relatedThreats: []
      }
    ],
    strategicRecommendations: [
      {
        id: 'siege-crit-1',
        category: 'infrastructure',
        recommendation: 'Critical Power Infrastructure Upgrade Required',
        impact: 'Primary power systems failed after 68 hours under siege conditions. Backup generators proved insufficient for extended operations beyond 48 hours. Fuel reserves depleted 24 hours earlier than specifications indicated. Immediate infrastructure overhaul required to prevent catastrophic failure in future extended scenarios.',
        priority: 'critical',
        estimatedCost: '$2.8M - $4.2M',
        estimatedTime: '8-12 months'
      },
      {
        id: 'siege-crit-2',
        category: 'equipment',
        recommendation: 'Life Support System Redundancy Enhancement',
        impact: 'Air filtration and oxygen generation systems showed single-point failure vulnerabilities. When primary HVAC failed, backup systems could not maintain safe atmospheric conditions for full facility occupancy. 40% capacity reduction required to preserve breathable air. Triple-redundant life support architecture essential.',
        priority: 'critical',
        estimatedCost: '$1.5M - $2.1M',
        estimatedTime: '6-9 months'
      },
      {
        id: 'siege-crit-3',
        category: 'infrastructure',
        recommendation: 'Emergency Fuel Reserve Expansion',
        impact: 'Backup generator fuel reserves exhausted 24 hours ahead of projected timeline. Actual consumption rate under full defensive posture exceeded planning assumptions by 35%. Current 48-hour fuel capacity inadequate. Minimum 120-hour reserve capacity required for extended siege scenarios.',
        priority: 'critical',
        estimatedCost: '$850K - $1.2M',
        estimatedTime: '4-6 months'
      },
      {
        id: 'siege-crit-4',
        category: 'equipment',
        recommendation: 'Power Management System Modernization',
        impact: 'Automated load-shedding protocols failed to prioritize critical systems appropriately. Manual intervention required but communication delays caused cascade failures. Smart power management with AI-driven load optimization needed to prevent similar failures.',
        priority: 'critical',
        estimatedCost: '$680K - $920K',
        estimatedTime: '5-7 months'
      },
      {
        id: 'siege-crit-5',
        category: 'personnel',
        recommendation: 'Extended Operations Training Protocol',
        impact: 'Personnel performance degraded significantly after 60 hours of continuous operations. Fatigue management protocols proved inadequate. Critical decision-making errors observed in final 12 hours. Comprehensive extended-duration training program required with focus on high-stress endurance scenarios.',
        priority: 'high',
        estimatedCost: '$180K - $250K',
        estimatedTime: '3-4 months'
      },
      {
        id: 'siege-crit-6',
        category: 'protocol',
        recommendation: 'Emergency Evacuation Procedure Revision',
        impact: 'Evacuation protocols executed under degraded life support conditions revealed critical gaps. Personnel accountability systems failed when primary power was lost. Evacuation completion time exceeded acceptable parameters by 40%. Complete protocol revision and drill program required.',
        priority: 'high',
        estimatedCost: '$120K - $180K',
        estimatedTime: '2-3 months'
      }
    ],
    finalOutcome: 'SCENARIO FAILURE - Life support systems collapsed after 68 hours of continuous siege operations due to cascading power infrastructure failures. Primary power grid and backup generators exhausted fuel reserves 24 hours ahead of projections. Emergency evacuation initiated under degraded atmospheric conditions. 23 personnel required medical treatment for heat exhaustion and respiratory distress. No fatalities, but facility mission capability compromised. Critical infrastructure vulnerabilities identified requiring immediate remediation.'
  },
  '2': {
    id: '2',
    name: 'Coordinated Multi-Threat Response',
    description: 'Complex scenario combining chemical, structural, and cyber threats',
    status: 'completed',
    startTime: '2025-01-06T14:20:00',
    duration: '2h 30m',
    threatEvents: [],
    assessmentCheckpoints: [{
      time: '0h',
      timeValue: 0,
      trigger: 'Active Response',
      prediction: 'success',
      confidence: 85,
      situationSummary: 'Actively managing multiple threat vectors.',
      keyChanges: ['Threats being monitored'],
      recommendations: [],
      relatedThreats: []
    }],
    strategicRecommendations: [
      {
        id: 'perf-1',
        category: 'infrastructure',
        recommendation: 'HVAC System Performance Validation',
        impact: 'The facility\'s HVAC isolation system performed flawlessly during the chemical threat, achieving complete zone containment within 45 seconds. Air filtration maintained 99.97% efficiency throughout the incident.',
        priority: 'high',
        estimatedCost: 'N/A - Operational',
        estimatedTime: 'Validated'
      },
      {
        id: 'perf-2',
        category: 'equipment',
        recommendation: 'Chemical Detection Array Reliability',
        impact: 'All 12 chemical sensors in Sector B responded within acceptable parameters (< 2 seconds). Zero false positives or missed detections. Equipment exceeds military specifications.',
        priority: 'high',
        estimatedCost: 'N/A - Operational',
        estimatedTime: 'Validated'
      },
      {
        id: 'perf-3',
        category: 'personnel',
        recommendation: 'Personnel Response Excellence',
        impact: 'All facility personnel executed evacuation protocols perfectly. Complete zone evacuation achieved in 3 minutes 12 seconds, 18 seconds ahead of target. Zero injuries or exposure incidents.',
        priority: 'high',
        estimatedCost: 'N/A - Operational',
        estimatedTime: 'Validated'
      },
      {
        id: 'perf-4',
        category: 'protocol',
        recommendation: 'Emergency Protocol Effectiveness',
        impact: 'Containment protocols executed with 100% accuracy. Communication systems maintained full operational capacity. Command and control structure responded optimally under pressure.',
        priority: 'medium',
        estimatedCost: 'N/A - Operational',
        estimatedTime: 'Validated'
      }
    ],
    finalOutcome: 'Scenario completed successfully with zero casualties. All facility systems performed within or above specifications. Infrastructure, equipment, and personnel response demonstrated exceptional readiness. No system failures or protocol deviations observed.'
  },
  '3': {
    id: '3',
    name: 'Chemical Agent Attack Response',
    description: 'Tactical response to chemical agent detection and containment',
    status: 'completed',
    startTime: '2026-01-11T09:00:00',
    endTime: '2026-01-11T09:45:00',
    duration: '45 minutes',
    threatEvents: [],
    assessmentCheckpoints: [
      {
        time: '0m',
        timeValue: 0,
        trigger: 'Chemical Agent Detected',
        prediction: 'partial',
        confidence: 72,
        situationSummary: 'Chemical agent detected at Floor 2 - Sector B. Immediate containment protocols activated. Situation developing.',
        keyChanges: ['HVAC isolation engaged', 'Personnel evacuation initiated', 'Chemical sensors confirming agent presence'],
        recommendations: [
          {
            id: 'chem-rec-1',
            priority: 'critical',
            action: 'Activate HVAC zone isolation for Sector B',
            reason: 'Prevent chemical agent spread to adjacent sectors',
            applied: true,
            effect: 'Complete containment achieved within 45 seconds, zero cross-contamination'
          },
          {
            id: 'chem-rec-2',
            priority: 'critical',
            action: 'Initiate emergency evacuation of Sector B personnel',
            reason: 'Remove all personnel from contaminated zone',
            applied: true,
            effect: 'All 47 personnel evacuated in 2 minutes 58 seconds, zero exposure incidents'
          },
          {
            id: 'chem-rec-3',
            priority: 'high',
            action: 'Deploy CBRN decontamination team to staging area',
            reason: 'Prepare for potential exposure treatment',
            applied: true,
            effect: 'Team deployed and ready within 4 minutes, no treatment required'
          },
          {
            id: 'chem-rec-4',
            priority: 'medium',
            action: 'Increase ventilation in adjacent Sectors A and C',
            reason: 'Maintain positive pressure differential to prevent any potential seepage',
            applied: false
          }
        ],
        relatedThreats: []
      },
      {
        time: '25m',
        timeValue: 25,
        trigger: 'Containment Success Confirmation',
        prediction: 'success',
        confidence: 88,
        situationSummary: 'Chemical agent fully contained in Sector B. Atmospheric monitoring confirms zero agent presence in adjacent sectors. All personnel accounted for and safe.',
        keyChanges: ['Agent concentration declining in sealed zone', 'All personnel confirmed safe', 'Decontamination protocols ready for deployment'],
        recommendations: [
          {
            id: 'chem-rec-5',
            priority: 'high',
            action: 'Maintain HVAC isolation until agent concentration reaches safe levels',
            reason: 'Ensure complete neutralization before reopening sector',
            applied: true,
            effect: 'Sector remained sealed, agent concentration reduced to safe levels by 45-minute mark'
          },
          {
            id: 'chem-rec-6',
            priority: 'medium',
            action: 'Conduct full atmospheric scan of surrounding sectors',
            reason: 'Verify zero contamination spread',
            applied: true,
            effect: 'All surrounding sectors confirmed clear, no trace contamination detected'
          },
          {
            id: 'chem-rec-7',
            priority: 'medium',
            action: 'Prepare detailed incident report for post-action review',
            reason: 'Document response effectiveness for future training',
            applied: true,
            effect: 'Comprehensive report completed documenting 100% protocol compliance'
          }
        ],
        relatedThreats: []
      }
    ],
    strategicRecommendations: [
      {
        id: 'chem-perf-1',
        category: 'infrastructure',
        recommendation: 'HVAC Isolation System Performance',
        impact: 'The bunker\'s HVAC isolation system successfully contained the chemical threat to Sector B within 45 seconds of detection. Zero cross-contamination to adjacent sectors. Air pressure differentials maintained at optimal levels throughout the incident.',
        priority: 'high',
        estimatedCost: 'N/A - Operational',
        estimatedTime: 'Validated'
      },
      {
        id: 'chem-perf-2',
        category: 'equipment',
        recommendation: 'Chemical Detection Sensor Array Accuracy',
        impact: 'All chemical sensors in Sector B triggered within 1.8 seconds of agent release. Detection accuracy confirmed at 100% with zero false readings. Equipment performance exceeds NATO STANAG 4701 specifications.',
        priority: 'high',
        estimatedCost: 'N/A - Operational',
        estimatedTime: 'Validated'
      },
      {
        id: 'chem-perf-3',
        category: 'personnel',
        recommendation: 'Rapid Evacuation Protocol Execution',
        impact: 'All 47 personnel in affected zone evacuated within 2 minutes 58 seconds. Zero casualties, zero contamination exposure. Personnel demonstrated exceptional discipline under chemical threat conditions.',
        priority: 'high',
        estimatedCost: 'N/A - Operational',
        estimatedTime: 'Validated'
      },
      {
        id: 'chem-perf-4',
        category: 'protocol',
        recommendation: 'Chemical Response Protocol Effectiveness',
        impact: 'All CBRNe protocols executed with 100% compliance. Communication channels remained operational. Command structure maintained full situational awareness throughout containment operations. Zero protocol deviations recorded.',
        priority: 'medium',
        estimatedCost: 'N/A - Operational',
        estimatedTime: 'Validated'
      }
    ],
    finalOutcome: 'Chemical threat successfully contained with zero casualties and zero contamination spread. All facility systems operated within specifications. HVAC isolation, detection equipment, and personnel response exceeded performance standards. Facility infrastructure validated for chemical threat scenarios. Mission-critical readiness confirmed.'
  }
};

export function ScenarioDetailView({ scenarioId, language, onBack, onEmergencyModeChange, onSimulationStateChange, caseStatus }: ScenarioDetailViewProps) {
  const t = translations[language];
  const scenario = mockScenarioData[scenarioId];
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [selectedCheckpointIndex, setSelectedCheckpointIndex] = useState(0);

  // Automatically navigate back if scenario not found
  useEffect(() => {
    if (!scenario) {
      onBack();
    }
  }, [scenario, onBack]);

  // Update emergency mode when simulation state changes
  const handleSimulationStart = () => {
    onEmergencyModeChange?.(true);
    onSimulationStateChange?.({
      scenarioName: scenario.name,
      isRunning: true,
      isPaused: false,
      currentTime: 0,
      speed: 1
    });
    // Navigate back will be handled by App.tsx
  };

  if (!scenario) {
    return null;
  }

  const selectedCheckpoint = scenario.assessmentCheckpoints[selectedCheckpointIndex];

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'partial': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failure': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'success': return CheckCircle2;
      case 'partial': return AlertTriangle;
      case 'failure': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'hostileForce': return Users;
      case 'cyber': return Wifi;
      case 'structuralFailure': return Building2;
      case 'chemical': return Skull;
      default: return AlertTriangle;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'infrastructure': return Building2;
      case 'equipment': return Wrench;
      case 'personnel': return Users;
      case 'protocol': return ListChecks;
      default: return TrendingUp;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const PredictionIcon = getPredictionIcon(selectedCheckpoint.prediction);

  // Calculate statistics for summary
  const totalRecommendations = scenario.assessmentCheckpoints.reduce(
    (sum, cp) => sum + cp.recommendations.length,
    0
  );
  const appliedRecommendations = scenario.assessmentCheckpoints.reduce(
    (sum, cp) => sum + cp.recommendations.filter(r => r.applied).length,
    0
  );
  const adoptionRate = Math.round((appliedRecommendations / totalRecommendations) * 100);

  // Determine if case is currently active (running)
  const isActiveCase = caseStatus === 'active';
  const isCompletedCase = caseStatus === 'completed' || scenario.status === 'completed';

  // Calculate elapsed time for active cases (hardcoded for demo)
  const getElapsedTime = () => {
    if (!isActiveCase) return scenario.duration;
    
    // For active chemical agent case (45 min total), show realistic in-progress time
    if (scenario.id === '3') {
      return '18 minutes';
    }
    
    // For other active cases
    return '2h 15m';
  };

  const elapsedTime = getElapsedTime();
  
  // Calculate progress percentage for active cases (hardcoded for demo)
  const getProgressPercentage = () => {
    if (!isActiveCase) return 100;
    
    // For chemical agent case: 18 minutes elapsed out of 45 total = 40%
    if (scenario.id === '3') {
      return 40;
    }
    
    // For other active cases
    return 65;
  };

  const progressPercentage = getProgressPercentage();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`p-6 border-b ${isActiveCase ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-red-50' : 'border-gray-200 bg-white'}`}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className={`size-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
          <span>{t.backToCases}</span>
        </button>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {language === 'ar' ? t.case1Name : scenario.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {language === 'ar' ? t.case1Desc : scenario.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{formatDateTime(scenario.startTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{scenario.duration}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                // Use caseStatus if provided, otherwise fall back to scenario.status
                (caseStatus === 'completed' || (!caseStatus && scenario.status === 'completed')) ? 'bg-green-100 text-green-700' :
                (caseStatus === 'active' || (!caseStatus && scenario.status === 'active')) ? 'bg-blue-100 text-blue-700' :
                (caseStatus === 'archived') ? 'bg-slate-100 text-slate-600' :
                'bg-red-100 text-red-700'
              }`}>
                {/* Display status text based on caseStatus */}
                {(caseStatus === 'completed' || (!caseStatus && scenario.status === 'completed')) ? t.completed :
                 (caseStatus === 'active' || (!caseStatus && scenario.status === 'active')) ? t.active :
                 (caseStatus === 'archived') ? t.archived :
                 t.failed}
              </div>
            </div>
          </div>
          {/* Start Simulation Button - Only for non-completed and non-failed cases */}
          {!isCompletedCase && scenario.status !== 'failed' && (
            <button
              onClick={() => handleSimulationStart()}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Play className="size-5" />
              <span>{t.runSimulation || 'Run Simulation'}</span>
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'summary'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="size-4" />
            <span>{t.summaryTab || 'Summary'}</span>
            {activeTab === 'summary' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'details'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="size-4" />
            <span>{t.detailsTab || 'Details'}</span>
            {activeTab === 'details' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'summary' ? (
        // Summary Tab
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {isActiveCase ? (
              // ACTIVE CASE VIEW - Live Monitoring
              <>
                {/* Active Status Header */}
                <div className="bg-white rounded-lg shadow border-l-4 border-orange-600 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded bg-orange-100 flex items-center justify-center">
                        <Activity className="size-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm text-orange-700 font-medium mb-1">ACTIVE RESPONSE</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Tactical Case In Progress</h2>
                        <p className="text-sm text-gray-600">Real-time monitoring and response coordination</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-600 mb-1">Elapsed Time</div>
                      <div className="text-2xl font-semibold text-gray-900 font-mono">{elapsedTime}</div>
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="bg-gray-100 rounded h-2 overflow-hidden">
                    <div className="bg-orange-600 h-full" style={{width: `${progressPercentage}%`}} />
                  </div>
                  <div className="text-xs text-gray-600 mt-2">Response Protocol Completion: {progressPercentage}%</div>
                </div>

                {/* Threat Assessment */}
                <div className="bg-white rounded-lg shadow border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Threat Assessment</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="size-10 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                        <Skull className="size-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-semibold text-gray-900">Chemical Agent Detected</span>
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">CRITICAL</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">Location: Floor 2 - Sector B</div>
                        <p className="text-sm text-gray-700">{selectedCheckpoint.situationSummary}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Threat Classification</div>
                        <div className="text-sm font-semibold text-gray-900">Chemical Agent</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">AI Confidence Level</div>
                        <div className="text-sm font-semibold text-gray-900">{selectedCheckpoint.confidence}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Actions */}
                <div className="bg-white rounded-lg shadow border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Response Actions Executed</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {selectedCheckpoint.keyChanges.map((change, idx) => (
                        <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                          <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{change}</div>
                            <div className="text-xs text-gray-600 mt-1">Status: Completed</div>
                          </div>
                          <div className="text-xs text-gray-500">Active</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-white rounded-lg shadow border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">AI Predictive Analysis</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="size-10 rounded bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <Brain className="size-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-semibold text-gray-900">Successful Containment Predicted</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">HIGH CONFIDENCE</span>
                        </div>
                        <p className="text-sm text-gray-700">{scenario.finalOutcome}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Prediction Confidence</span>
                        <span className="text-sm font-semibold text-gray-900">{selectedCheckpoint.confidence}%</span>
                      </div>
                      <div className="bg-gray-100 rounded h-2 overflow-hidden">
                        <div className="bg-indigo-600 h-full" style={{width: `${selectedCheckpoint.confidence}%`}} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Shield className="size-6 text-blue-600" />
                      <div className="size-2 bg-green-500 rounded-full" />
                    </div>
                    <div className="text-xs text-gray-600 mb-1">Containment Systems</div>
                    <div className="text-lg font-semibold text-gray-900">Operational</div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Users className="size-6 text-green-600" />
                      <div className="size-2 bg-green-500 rounded-full" />
                    </div>
                    <div className="text-xs text-gray-600 mb-1">Personnel Status</div>
                    <div className="text-lg font-semibold text-gray-900">All Safe</div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Brain className="size-6 text-indigo-600" />
                      <div className="size-2 bg-blue-500 rounded-full" />
                    </div>
                    <div className="text-xs text-gray-600 mb-1">AI Monitoring</div>
                    <div className="text-lg font-semibold text-gray-900">Active</div>
                  </div>
                </div>
              </>
            ) : (
              // COMPLETED CASE VIEW - Historical Data
              <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`rounded-lg p-4 border ${
                scenario.status === 'failed' 
                  ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
                  : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
              }`}>
                <div className={`text-sm mb-1 ${
                  scenario.status === 'failed' ? 'text-red-700' : 'text-green-700'
                }`}>{t.scenarioOutcome || 'Scenario Outcome'}</div>
                <div className={`text-2xl font-bold ${
                  scenario.status === 'failed' ? 'text-red-900' : 'text-green-900'
                }`}>{scenario.status === 'failed' ? 'Failure' : 'Success'}</div>
                <div className={`text-xs mt-1 ${
                  scenario.status === 'failed' ? 'text-red-600' : 'text-green-600'
                }`}>{scenario.status === 'failed' ? '23 injuries' : 'Zero casualties'}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-blue-700 mb-1">{t.aiRecommendations || 'AI Recommendations'}</div>
                <div className="text-2xl font-bold text-blue-900">{totalRecommendations}</div>
                <div className="text-xs text-blue-600 mt-1">{appliedRecommendations} applied ({adoptionRate}%)</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-purple-700 mb-1">{t.reassessments || 'Reassessments'}</div>
                <div className="text-2xl font-bold text-purple-900">{scenario.assessmentCheckpoints.length}</div>
                <div className="text-xs text-purple-600 mt-1">Over {scenario.duration}</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                <div className="text-sm text-orange-700 mb-1">{t.threatsDetected || 'Threats Detected'}</div>
                <div className="text-2xl font-bold text-orange-900">{scenario.threatEvents.length}</div>
                <div className="text-xs text-orange-600 mt-1">All neutralized</div>
              </div>
            </div>

            {/* Final Outcome */}
            <div className={`rounded-xl shadow-sm p-6 ${
              scenario.status === 'failed'
                ? 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300'
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {scenario.status === 'failed' ? (
                  <XCircle className="size-7 text-red-600" />
                ) : (
                  <Shield className="size-7 text-green-600" />
                )}
                <h2 className="text-xl font-semibold text-gray-900">{t.finalOutcome}</h2>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{scenario.finalOutcome}</p>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {scenario.status === 'failed' ? (
                  <AlertTriangle className="size-6 text-red-600" />
                ) : (
                  <TrendingUp className="size-6 text-emerald-600" />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {scenario.status === 'failed' ? 'Critical Remediation Required' : t.strategicRecommendations}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {scenario.status === 'failed' 
                      ? 'Infrastructure failures identified - immediate action required'
                      : t.strategicRecommendationsSubtitle
                    }
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenario.strategicRecommendations.map((rec) => {
                  const CategoryIcon = getCategoryIcon(rec.category);
                  return (
                    <div
                      key={rec.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center justify-center size-10 rounded-lg bg-blue-50">
                          <CategoryIcon className="size-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="text-xs text-gray-600 uppercase tracking-wide">
                              {rec.category === 'infrastructure' ? t.infrastructure :
                               rec.category === 'equipment' ? t.equipment :
                               rec.category === 'personnel' ? t.personnel :
                               t.protocol}
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                              {rec.priority === 'critical' ? t.critical :
                               rec.priority === 'high' ? t.high :
                               rec.priority === 'medium' ? t.medium :
                               t.low}
                            </div>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm">{rec.recommendation}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-3">{rec.impact}</p>
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">{t.estimatedCost}</div>
                          <div className="font-medium text-gray-900 text-xs">{rec.estimatedCost}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">{t.estimatedTime}</div>
                          <div className="font-medium text-gray-900 text-xs">{rec.estimatedTime}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
            )}
          </div>
        </div>
      ) : (
        // Details Tab
        <div className="flex-1 flex overflow-hidden">
          {/* Timeline Sidebar */}
          <div className={`w-80 border-${language === 'ar' ? 'l' : 'r'} border-gray-200 bg-gray-50 p-6 overflow-y-auto`}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="size-5 text-blue-600" />
              {t.scenarioTimeline}
            </h2>

            {/* Vertical Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className={`absolute top-0 ${language === 'ar' ? 'right-[23px]' : 'left-[23px]'} bottom-0 w-0.5 bg-gray-300`} />

              {/* Timeline Items */}
              <div className="space-y-6">
                {scenario.assessmentCheckpoints.map((checkpoint, index) => {
                  const isSelected = index === selectedCheckpointIndex;
                  const PIcon = getPredictionIcon(checkpoint.prediction);

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedCheckpointIndex(index)}
                      className={`relative flex gap-3 w-full text-left ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Time Marker */}
                      <div className="flex flex-col items-center">
                        <div className={`flex items-center justify-center size-12 rounded-full border-2 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-600 shadow-lg scale-110'
                            : 'bg-white border-gray-300 hover:border-indigo-400'
                        } z-10`}>
                          {isSelected ? (
                            <Brain className="size-6 text-white" />
                          ) : (
                            <Clock className="size-5 text-gray-600" />
                          )}
                        </div>
                      </div>

                      {/* Checkpoint Info */}
                      <div className="flex-1 pb-4">
                        <div className={`px-3 py-1.5 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-indigo-100 border-2 border-indigo-300'
                            : 'bg-white border border-gray-200 hover:border-indigo-300'
                        }`}>
                          <div className="font-semibold text-gray-900 text-sm mb-1">
                            {checkpoint.time}
                          </div>
                          <div className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {checkpoint.trigger}
                          </div>
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                            isSelected ? 'font-semibold' : ''
                          } ${getPredictionColor(checkpoint.prediction)}`}>
                            <PIcon className="size-3" />
                            <span>{checkpoint.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-[1200px] mx-auto space-y-6">
              {/* Related Threats */}
              {selectedCheckpoint.relatedThreats.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="size-5 text-red-600" />
                    {t.threatDetected}
                  </h3>
                  <div className="space-y-3">
                    {selectedCheckpoint.relatedThreats.map((threat) => {
                      const Icon = getThreatIcon(threat.type);
                      return (
                        <div key={threat.id} className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-3">
                              <Icon className="size-6 text-red-600" />
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {threat.type === 'hostileForce' ? t.hostileForce :
                                   threat.type === 'cyber' ? t.cyber :
                                   threat.type === 'structuralFailure' ? t.structuralFailure :
                                   threat.type}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <MapPin className="size-3" />
                                  <span>{threat.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                              {threat.severity === 'critical' ? t.critical :
                               threat.severity === 'high' ? t.high :
                               threat.severity === 'medium' ? t.medium :
                               t.low}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{threat.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selected Checkpoint Details */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Brain className="size-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700 mb-2">
                      <Zap className="size-4" />
                      <span>{selectedCheckpoint.time} - {t.aiReassessment}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedCheckpoint.trigger}</h2>
                  </div>
                </div>

                {/* Prediction Badge */}
                <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-lg border-2 mb-4 ${getPredictionColor(selectedCheckpoint.prediction)}`}>
                  <PredictionIcon className="size-6" />
                  <div>
                    <div className="font-semibold text-lg">
                      {selectedCheckpoint.prediction === 'success' ? t.predictionSuccess :
                       selectedCheckpoint.prediction === 'partial' ? t.predictionPartial :
                       t.predictionFailure}
                    </div>
                    <div className="text-sm opacity-80">
                      {t.confidence}: {selectedCheckpoint.confidence}%
                    </div>
                  </div>
                </div>

                {/* Situation Summary */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-indigo-200">
                  <div className="text-sm font-semibold text-indigo-700 mb-2">{t.situationSummary}</div>
                  <p className="text-sm text-gray-700">{selectedCheckpoint.situationSummary}</p>
                </div>

                {/* Key Changes */}
                <div className="bg-white rounded-lg p-4 border border-indigo-200">
                  <div className="text-sm font-semibold text-indigo-700 mb-3">{t.keyChanges}</div>
                  <ul className="space-y-2">
                    {selectedCheckpoint.keyChanges.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className={`size-4 mt-0.5 text-indigo-600 flex-shrink-0 ${language === 'ar' ? 'rotate-180' : ''}`} />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ListChecks className="size-5 text-purple-600" />
                  {t.aiRecommendations}
                </h3>
                <div className="space-y-3">
                  {selectedCheckpoint.recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className={`rounded-lg p-4 border-2 ${
                        rec.applied
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${rec.applied ? 'text-green-600' : 'text-gray-400'}`}>
                          {rec.applied ? (
                            <CheckCircle2 className="size-6" />
                          ) : (
                            <XCircle className="size-6" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="font-semibold text-gray-900">{rec.action}</div>
                            <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                              {rec.priority === 'critical' ? t.critical :
                               rec.priority === 'high' ? t.high :
                               t.medium}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
                          {rec.applied && rec.effect && (
                            <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                              <div className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1">
                                <Zap className="size-3" />
                                {t.effectOfAction}:
                              </div>
                              <p className="text-sm text-gray-700">{rec.effect}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}