import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, XCircle, TrendingUp, Shield, Users, Skull, Wifi, Building2, Brain, ListChecks, Wrench, Calendar, MapPin, ChevronRight, Zap, Activity, FileText, BarChart3, Play, Edit2, Eye, Wind, Airplay, CloudRain, Filter, FlaskConical, Radio } from 'lucide-react';
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

interface ScenarioRun {
  id: string;
  runNumber: number;
  startTime: string;
  endTime?: string;
  duration?: string;
  status: 'success' | 'failed' | 'in-progress';
  outcome?: string;
}

interface ScenarioSetup {
  id: string;
  name: string;
  description: string;
  threats: ThreatEvent[];
}

interface ScenarioData {
  setup: ScenarioSetup;
  runs: ScenarioRun[];
}

interface ReportData {
  runId: string;
  scenarioName: string;
  scenarioDescription: string;
  startTime: string;
  endTime?: string;
  duration: string;
  status: 'success' | 'failed';
  assessmentCheckpoints: AssessmentCheckpoint[];
  outcomeSummaryPoints?: Array<{ title: string; description: string }>;
  strategicRecommendations: StrategicRecommendation[];
  finalOutcome: string;
}

interface ScenarioDetailViewProps {
  scenarioId: string;
  language: Language;
  onBack: () => void;
  onEmergencyModeChange?: (emergencyMode: false | 'incident' | 'emergency') => void;
  onSimulationStateChange?: (state: {
    drillName: string;
    scenarioId: string;
    isRunning: boolean;
    isPaused: boolean;
    currentTime: number;
    speed: 1 | 2 | 4;
  } | null) => void;
  caseStatus?: 'draft' | 'active' | 'completed' | 'archived';
}

type ViewMode = 'setup' | 'report';

// Mock scenario data with setup and runs
const mockScenarioData: { [key: string]: ScenarioData } = {
  '1': {
    setup: {
      id: '1',
      name: 'Extended Duration Scenario',
      description: 'Prolonged hostile force containment with resource management protocols',
      threats: [
        {
          id: 't3',
          type: 'structuralFailure',
          severity: 'medium',
          location: 'Infrastructure',
          time: '48h',
          timeValue: 48,
          description: 'Structural integrity concerns'
        },
      ]
    },
    runs: [
      {
        id: 'run-1-2',
        runNumber: 2,
        startTime: '2025-01-10T14:00:00',
        endTime: '2025-01-12T18:30:00',
        duration: '52h 30m',
        status: 'success',
        outcome: 'All systems operational. Personnel performance excellent. Mission success achieved.'
      },
      {
        id: 'run-1-1',
        runNumber: 1,
        startTime: '2024-12-20T08:00:00',
        endTime: '2024-12-23T08:00:00',
        duration: '72h',
        status: 'failed',
        outcome: 'Life support systems collapsed. Emergency evacuation required. Critical infrastructure failures.'
      },
    ]
  },
  '2': {
    setup: {
      id: '2',
      name: 'Evacuation Scenario',
      description: 'Emergency extraction of high-value personnel under threat conditions',
      threats: [
        {
          id: 't1',
          type: 'hostileForce',
          severity: 'critical',
          location: 'Floor 3 - Secure Wing',
          time: '0m',
          timeValue: 0,
          description: 'Hostile force breach in secure wing'
        },
        {
          id: 't2',
          type: 'explosive',
          severity: 'high',
          location: 'Floor 1 - Exit Route Alpha',
          time: '15m',
          timeValue: 15,
          description: 'Explosive device detected on evacuation route'
        },
      ]
    },
    runs: [
      {
        id: 'run-2-2',
        runNumber: 2,
        startTime: '2025-01-06T14:20:00',
        endTime: '2025-01-06T16:50:00',
        duration: '2h 30m',
        status: 'success',
        outcome: 'Evacuation completed successfully. Zero casualties. All systems performed within specifications.'
      },
      {
        id: 'run-2-1',
        runNumber: 1,
        startTime: '2024-12-28T09:00:00',
        endTime: '2024-12-28T11:15:00',
        duration: '2h 15m',
        status: 'success',
        outcome: 'Primary evacuation successful. Minor delays in secondary routes. All personnel evacuated safely.'
      },
    ]
  },
  '3': {
    setup: {
      id: '3',
      name: 'Chemical Threat Scenario',
      description: 'Chlorine gas breach in HVAC system - Floor 2 Sector B',
      threats: [
        {
          id: 't1',
          type: 'chemical',
          severity: 'critical',
          location: 'Chemical Detector 12',
          time: '0m',
          timeValue: 0,
          description: 'Chlorine gas detected in HVAC system'
        },
        {
          id: 't2',
          type: 'chemical',
          severity: 'high',
          location: 'Chemical Detector 7',
          time: '15m',
          timeValue: 15,
          description: 'Secondary chemical leak detected in adjacent zone'
        },
      ]
    },
    runs: [
      {
        id: 'run-3-2',
        runNumber: 2,
        startTime: '2026-01-11T09:00:00',
        endTime: '2026-01-11T09:45:00',
        duration: '45m',
        status: 'success',
        outcome: 'Chemical threat successfully contained. Zero casualties. All containment protocols executed perfectly.'
      },
      {
        id: 'run-3-1',
        runNumber: 1,
        startTime: '2025-11-18T14:00:00',
        endTime: '2025-11-18T15:30:00',
        duration: '1h 30m',
        status: 'failed',
        outcome: 'HVAC isolation delayed. Chemical spread to adjacent sectors. 12 personnel required medical treatment.'
      },
    ]
  },
};

// Mock report data for completed runs
const mockReportData: { [runId: string]: ReportData } = {
  'run-1-1': {
    runId: 'run-1-1',
    scenarioName: 'Extended Duration Scenario',
    scenarioDescription: 'Prolonged hostile force containment with resource management protocols',
    startTime: '2024-12-20T08:00:00',
    endTime: '2024-12-23T08:00:00',
    duration: '72h',
    status: 'failed',
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
    outcomeSummaryPoints: [
      {
        title: 'Power System Failure - 68 Hours',
        description: 'Primary power systems failed after 68 hours under siege conditions. Backup generators proved insufficient for extended operations beyond 48 hours.'
      },
      {
        title: 'Fuel Depletion - 24 Hours Early',
        description: 'Fuel reserves depleted 24 hours earlier than specifications indicated. Actual consumption rate under full defensive posture exceeded planning assumptions by 35%.'
      },
      {
        title: 'Life Support Vulnerabilities',
        description: 'Air filtration and oxygen generation systems showed single-point failure vulnerabilities. When primary HVAC failed, backup systems could not maintain safe atmospheric conditions for full facility occupancy. 40% capacity reduction required to preserve breathable air.'
      },
      {
        title: 'Automated Systems Override',
        description: 'Automated load-shedding protocols failed to prioritize critical systems appropriately. Manual intervention required but communication delays caused cascade failures.'
      },
      {
        title: 'Personnel Fatigue - Critical',
        description: 'Personnel performance degraded significantly after 60 hours of continuous operations. Fatigue management protocols proved inadequate. Critical decision-making errors observed in final 12 hours.'
      },
      {
        title: 'Evacuation Delays - 40% Over Target',
        description: 'Evacuation protocols executed under degraded life support conditions revealed critical gaps. Personnel accountability systems failed when primary power was lost. Evacuation completion time exceeded acceptable parameters by 40%.'
      },
      {
        title: 'Medical Response',
        description: '23 personnel required medical treatment for heat exhaustion and respiratory distress. No fatalities recorded. All injuries classified as moderate severity.'
      }
    ],
    strategicRecommendations: [
      {
        id: 'siege-crit-1',
        category: 'infrastructure',
        recommendation: 'Critical Power Infrastructure Upgrade',
        impact: 'Immediate infrastructure overhaul required to prevent catastrophic failure in future extended scenarios. Enhanced backup generator capacity and fuel storage systems essential.',
        priority: 'critical',
        estimatedCost: '$2.8M - $4.2M',
        estimatedTime: '8-12 months'
      },
      {
        id: 'siege-crit-2',
        category: 'equipment',
        recommendation: 'Life Support System Redundancy Enhancement',
        impact: 'Triple-redundant life support architecture essential to prevent single-point failures in air filtration and oxygen generation.',
        priority: 'critical',
        estimatedCost: '$1.5M - $2.1M',
        estimatedTime: '6-9 months'
      },
      {
        id: 'siege-crit-3',
        category: 'infrastructure',
        recommendation: 'Emergency Fuel Reserve Expansion',
        impact: 'Expand fuel storage capacity from 48-hour to minimum 120-hour reserve for extended siege scenarios.',
        priority: 'critical',
        estimatedCost: '$850K - $1.2M',
        estimatedTime: '4-6 months'
      },
      {
        id: 'siege-crit-4',
        category: 'equipment',
        recommendation: 'Power Management System Modernization',
        impact: 'Deploy smart power management with AI-driven load optimization to prevent cascade failures.',
        priority: 'critical',
        estimatedCost: '$680K - $920K',
        estimatedTime: '5-7 months'
      },
      {
        id: 'siege-crit-5',
        category: 'personnel',
        recommendation: 'Extended Operations Training Protocol',
        impact: 'Develop comprehensive extended-duration training program with focus on high-stress endurance scenarios and fatigue management.',
        priority: 'high',
        estimatedCost: '$180K - $250K',
        estimatedTime: '3-4 months'
      },
      {
        id: 'siege-crit-6',
        category: 'protocol',
        recommendation: 'Emergency Evacuation Procedure Revision',
        impact: 'Complete protocol revision addressing degraded conditions and personnel accountability backup systems.',
        priority: 'high',
        estimatedCost: '$120K - $180K',
        estimatedTime: '2-3 months'
      }
    ],
    finalOutcome: 'SCENARIO FAILURE - Life support systems collapsed after 68 hours of continuous siege operations due to cascading power infrastructure failures. Emergency evacuation initiated under degraded atmospheric conditions. Critical infrastructure vulnerabilities identified requiring immediate remediation.'
  },
  'run-1-2': {
    runId: 'run-1-2',
    scenarioName: 'Extended Duration Scenario',
    scenarioDescription: 'Prolonged hostile force containment with resource management protocols',
    startTime: '2025-01-10T14:00:00',
    endTime: '2025-01-12T18:30:00',
    duration: '52h 30m',
    status: 'success',
    assessmentCheckpoints: [
      {
        time: '12h',
        timeValue: 12,
        trigger: 'First Reassessment - Systems Stable',
        prediction: 'success',
        confidence: 85,
        situationSummary: 'All infrastructure systems operating within normal parameters. Resource consumption tracking projections. Structural integrity monitoring active.',
        keyChanges: ['Automated monitoring systems engaged', 'Backup systems on standby', 'Resource consumption at expected levels'],
        recommendations: [
          {
            id: 'rec-12h-1',
            priority: 'medium',
            action: 'Continue current monitoring protocols',
            reason: 'All systems performing as expected',
            applied: true,
            effect: 'Maintained operational stability'
          }
        ],
        relatedThreats: []
      },
      {
        time: '36h',
        timeValue: 36,
        trigger: 'Mid-Point Assessment',
        prediction: 'success',
        confidence: 88,
        situationSummary: 'Infrastructure systems maintaining stability. Minor structural stress indicators detected but within acceptable parameters. All defensive systems operational.',
        keyChanges: ['Structural integrity at 98%', 'All life support systems nominal', 'Resource reserves at 65%'],
        recommendations: [
          {
            id: 'rec-36h-1',
            priority: 'low',
            action: 'Schedule post-scenario structural inspection',
            reason: 'Preventive maintenance for detected stress points',
            applied: true,
            effect: 'Maintenance scheduled for completion'
          }
        ],
        relatedThreats: []
      }
    ],
    outcomeSummaryPoints: [
      {
        title: 'System Reliability - 100% Uptime',
        description: 'All infrastructure systems maintained operational status throughout the 52.5-hour duration. Zero system failures recorded. All defensive systems remained operational with 100% uptime.'
      },
      {
        title: 'Structural Integrity Monitoring',
        description: 'Structural integrity monitoring detected all stress indicators successfully. All stress points remained within acceptable parameters throughout the scenario. Structural integrity maintained at 98%.'
      },
      {
        title: 'Resource Management - 15% Surplus',
        description: 'Resource management protocols performed as designed with 15% reserves remaining at completion. Actual consumption tracking projections with 98.5% accuracy. Fuel reserves exceeded minimum requirements by 22%.'
      },
      {
        title: 'Power Efficiency - 87%',
        description: 'Power systems operated at 87% efficiency throughout the duration. Backup systems maintained ready status with zero activations required.'
      },
      {
        title: 'Life Support Performance',
        description: 'Life support systems maintained optimal atmospheric conditions. Air quality parameters remained in green zone for entire duration. Temperature control within ±0.5°C variance.'
      },
      {
        title: 'Personnel Performance - Optimal',
        description: 'Personnel performance remained at operational standards throughout. Zero fatigue-related incidents reported. Decision-making efficiency maintained above 95%.'
      },
      {
        title: 'Safety Record - Zero Incidents',
        description: 'No personnel injuries recorded. All safety protocols executed successfully. Zero security breaches or system anomalies detected.'
      }
    ],
    strategicRecommendations: [
      {
        id: 'success-rec-1',
        category: 'optimization',
        recommendation: 'Temperature Adjustment Protocol',
        impact: 'Increase air temperature from 22°C to 24°C to reduce compressor usage - increase generator lifetime by 5 hours.',
        priority: 'high',
        estimatedCost: '$5K - $10K',
        estimatedTime: '2-4 weeks'
      },
      {
        id: 'success-rec-2',
        category: 'personnel',
        recommendation: 'Zone Occupancy Restriction',
        impact: 'Minimize personnel occupancy in Zone 1 to reduce resource consumption and extend operational capacity.',
        priority: 'high',
        estimatedCost: '$2K - $5K',
        estimatedTime: '1-2 weeks'
      },
      {
        id: 'success-rec-3',
        category: 'environmental',
        recommendation: 'Ventilation Optimization',
        impact: 'Open room doors to optimize CO2 levels and improve air circulation without additional energy consumption.',
        priority: 'medium',
        estimatedCost: '$0',
        estimatedTime: 'Immediate'
      },
      {
        id: 'success-rec-4',
        category: 'policy',
        recommendation: 'Resource Rationing Policy',
        impact: 'Enforce policy to rational use of water and food supply to extend duration capacity during prolonged scenarios.',
        priority: 'high',
        estimatedCost: '$15K - $25K',
        estimatedTime: '1-2 months'
      },
      {
        id: 'success-rec-5',
        category: 'power',
        recommendation: 'Non-Essential Lighting Shutdown',
        impact: 'Switch off lights in non-critical areas - reduce fuel consumption of generator and reduce load to increase operational lifetime.',
        priority: 'medium',
        estimatedCost: '$0',
        estimatedTime: 'Immediate'
      }
    ],
    finalOutcome: 'SCENARIO SUCCESS - All infrastructure systems maintained operational status throughout the 52.5-hour duration. Resource management protocols performed as designed. All defensive systems operational. Mission objectives achieved successfully.'
  },
  'run-3-2': {
    runId: 'run-3-2',
    scenarioName: 'Chemical Threat Scenario',
    scenarioDescription: 'Chlorine gas breach in HVAC system - Floor 2 Sector B',
    startTime: '2026-01-11T09:00:00',
    endTime: '2026-01-11T09:45:00',
    duration: '45m',
    status: 'success',
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
    outcomeSummaryPoints: [
      {
        title: 'Chemical Detection - 1.8 Seconds',
        description: 'All chemical sensors in Sector B triggered within 1.8 seconds of agent release. Detection accuracy confirmed at 100% with zero false readings. Equipment performance exceeds NATO STANAG 4701 specifications.'
      },
      {
        title: 'Evacuation Time - 2 Minutes 58 Seconds',
        description: 'All 47 personnel in affected zone evacuated within 2 minutes 58 seconds. Zero casualties, zero contamination exposure recorded. Personnel demonstrated exceptional discipline under chemical threat conditions.'
      },
      {
        title: 'CBRN Team Deployment - 4 Minutes',
        description: 'CBRN decontamination team deployed and ready within 4 minutes of initial detection. Equipment staging completed in optimal time. No treatment required due to successful containment and zero exposure incidents.'
      },
      {
        title: 'Atmospheric Clearance - 45 Minutes',
        description: 'Agent concentration reduced to safe levels within 45 minutes of initial detection. Complete atmospheric clearance confirmed across all facility zones. Zero trace contamination detected in adjacent sectors.'
      },
      {
        title: 'Protocol Compliance - 100%',
        description: 'All CBRNe protocols executed with 100% compliance. Communication channels remained operational throughout. Zero protocol deviations recorded. Command structure maintained full situational awareness.'
      },
      {
        title: 'Decision Efficiency - 98.7%',
        description: 'Command structure decision-making efficiency validated at 98.7%. Real-time threat assessment and response coordination performed within optimal parameters. Zero command delays recorded.'
      }
    ],
    strategicRecommendations: [
      {
        id: 'chem-enhance-1',
        category: 'training',
        recommendation: 'Personnel Evacuation Time Improvement',
        impact: 'Further training required for personnel to improve evacuation time from current 2 minutes 58 seconds to target 2 minutes or less.',
        priority: 'high',
        estimatedCost: '$45K - $75K',
        estimatedTime: '1-2 months'
      }
    ],
    finalOutcome: 'SCENARIO SUCCESS - Chemical threat successfully contained with zero casualties and zero contamination spread. All facility systems operated within specifications. HVAC isolation, detection equipment, and personnel response exceeded performance standards.'
  },
  'run-3-1': {
    runId: 'run-3-1',
    scenarioName: 'Chemical Threat Scenario',
    scenarioDescription: 'Chlorine gas breach in HVAC system - Floor 2 Sector B',
    startTime: '2025-11-18T14:00:00',
    endTime: '2025-11-18T15:30:00',
    duration: '1h 30m',
    status: 'failed',
    assessmentCheckpoints: [
      {
        time: '5m',
        timeValue: 5,
        trigger: 'Initial Chemical Detection',
        prediction: 'success',
        confidence: 92,
        situationSummary: 'Chlorine gas detected by Chemical Detector C12 in Floor 2 Sector B. Automatic HVAC isolation protocols initiated.',
        keyChanges: ['Chemical detection confirmed', 'HVAC system isolation initiated', 'Personnel alert system activated'],
        recommendations: [
          {
            id: 'chem-f-rec-1',
            priority: 'critical',
            action: 'Immediately isolate HVAC zone for Sector B',
            reason: 'Prevent contamination spread to adjacent sectors',
            applied: false,
            effect: 'HVAC isolation delayed by 8 minutes - critical protocol failure'
          },
          {
            id: 'chem-f-rec-2',
            priority: 'critical',
            action: 'Evacuate all personnel from Sector B immediately',
            reason: 'Chlorine exposure risk exceeds safe thresholds',
            applied: true,
            effect: 'Evacuation initiated but delayed due to communication failures'
          },
          {
            id: 'chem-f-rec-3',
            priority: 'high',
            action: 'Deploy emergency response team with NBC equipment',
            reason: 'Contain chemical source and prevent further release',
            applied: true,
            effect: 'Response team deployed but equipment access delayed'
          }
        ],
        relatedThreats: []
      },
      {
        time: '15m',
        timeValue: 15,
        trigger: 'Secondary Leak Detection',
        prediction: 'partial',
        confidence: 68,
        situationSummary: 'Secondary chemical leak detected at Chemical Detector C7. HVAC isolation incomplete. Gas spreading to adjacent zones through ventilation system.',
        keyChanges: ['Secondary contamination detected', 'HVAC isolation failure confirmed', '12 personnel reporting exposure symptoms', 'Emergency medical response activated'],
        recommendations: [
          {
            id: 'chem-f-rec-4',
            priority: 'critical',
            action: 'Override HVAC control system and manually shut all air handlers',
            reason: 'Automated isolation has failed - manual intervention required immediately',
            applied: true,
            effect: 'Manual shutdown successful after 12 minutes total delay'
          },
          {
            id: 'chem-f-rec-5',
            priority: 'critical',
            action: 'Deploy medical teams to staging area for contaminated personnel',
            reason: '12 personnel showing chlorine exposure symptoms - immediate treatment required',
            applied: true,
            effect: 'Medical treatment initiated for all affected personnel'
          },
          {
            id: 'chem-f-rec-6',
            priority: 'high',
            action: 'Seal all doors between Sector B and adjacent areas',
            reason: 'Prevent personnel movement through contaminated zones',
            applied: true,
            effect: 'Physical barriers established successfully'
          },
          {
            id: 'chem-f-rec-7',
            priority: 'high',
            action: 'Activate backup ventilation in unaffected sectors',
            reason: 'Maintain air quality in safe zones while HVAC offline',
            applied: false,
            effect: 'Backup ventilation not activated - air quality degraded in safe zones'
          }
        ],
        relatedThreats: []
      },
      {
        time: '45m',
        timeValue: 45,
        trigger: 'Containment Assessment',
        prediction: 'failed',
        confidence: 45,
        situationSummary: 'Chemical threat partially contained. All HVAC systems manually shut down. 12 personnel undergoing medical treatment for chlorine exposure. Source leak isolated but decontamination required before normal operations can resume.',
        keyChanges: ['HVAC fully offline', 'Chemical source isolated', 'Decontamination teams deployed', 'All affected personnel receiving medical care'],
        recommendations: [
          {
            id: 'chem-f-rec-8',
            priority: 'critical',
            action: 'Initiate full decontamination protocol for Sector B',
            reason: 'Chlorine residue presents ongoing exposure risk',
            applied: true,
            effect: 'Decontamination in progress - estimated 4-6 hours for completion'
          },
          {
            id: 'chem-f-rec-9',
            priority: 'high',
            action: 'Conduct air quality monitoring in all adjacent sectors',
            reason: 'Verify no contamination spread beyond identified zones',
            applied: true,
            effect: 'Air quality monitoring ongoing - trace contamination detected in 2 adjacent zones'
          },
          {
            id: 'chem-f-rec-10',
            priority: 'high',
            action: 'Review HVAC automation failure and implement emergency manual override procedures',
            reason: 'Critical system failure allowed contamination spread',
            applied: true,
            effect: 'System failure investigation initiated - preliminary findings indicate sensor malfunction'
          },
          {
            id: 'chem-f-rec-11',
            priority: 'medium',
            action: 'Prepare incident report documenting response failures and lessons learned',
            reason: 'Critical analysis required for protocol improvements',
            applied: true,
            effect: 'Comprehensive incident report documenting automation failure and response delays'
          }
        ],
        relatedThreats: []
      }
    ],
    outcomeSummaryPoints: [
      {
        title: 'HVAC Automation Failure - Critical',
        description: 'HVAC isolation system failed to respond to automatic triggers. 8-minute delay in zone isolation allowed chemical contamination to spread from primary detection point to adjacent sectors. Manual override required to achieve full containment.'
      },
      {
        title: 'Personnel Exposure - 12 Casualties',
        description: '12 personnel exposed to chlorine gas requiring immediate medical treatment. All personnel stabilized and receiving ongoing care. Exposure levels ranged from minor to moderate - no life-threatening injuries but extended recovery required.'
      },
      {
        title: 'Contamination Spread - Multiple Zones',
        description: 'Chemical contamination spread beyond initial detection zone to 2 adjacent sectors before containment achieved. Trace contamination detected in ventilation systems requiring comprehensive decontamination protocols.'
      },
      {
        title: 'Response Time Delays',
        description: 'Communication system delays contributed to slower personnel evacuation. Emergency response team deployment delayed by equipment access issues. Manual intervention required 12 minutes longer than acceptable response parameters.'
      },
      {
        title: 'Decontamination Requirements',
        description: 'Full facility decontamination required before normal operations can resume. Estimated 4-6 hours for Sector B decontamination. Additional air quality monitoring required in adjacent zones for 24-48 hours.'
      },
      {
        title: 'System Vulnerabilities Identified',
        description: 'Critical vulnerabilities identified in HVAC automation system. Sensor malfunction prevented proper isolation response. Backup ventilation systems not activated automatically. Manual override procedures proved effective but response time exceeded acceptable parameters.'
      }
    ],
    strategicRecommendations: [
      {
        id: 'failed-rec-1',
        category: 'maintenance',
        recommendation: 'HVAC Sensor System Audit and Replacement',
        impact: 'Complete audit of all HVAC isolation sensors and replacement of malfunctioning units. Install redundant sensor systems with automatic failover to prevent single-point failures.',
        priority: 'critical',
        estimatedCost: '$50K - $100K',
        estimatedTime: '2-3 weeks'
      },
      {
        id: 'failed-rec-2',
        category: 'training',
        recommendation: 'Emergency Manual Override Procedures Training',
        impact: 'Implement comprehensive training program for manual HVAC override procedures. Ensure all personnel can execute manual isolation within 2 minutes of automation failure detection.',
        priority: 'critical',
        estimatedCost: '$10K - $20K',
        estimatedTime: '1-2 weeks'
      },
      {
        id: 'failed-rec-3',
        category: 'equipment',
        recommendation: 'Enhanced Chemical Detection Network',
        impact: 'Install additional chemical detectors in ventilation transition zones to provide earlier warning of contamination spread. Integrate with HVAC control system for faster response.',
        priority: 'high',
        estimatedCost: '$30K - $50K',
        estimatedTime: '3-4 weeks'
      },
      {
        id: 'failed-rec-4',
        category: 'optimization',
        recommendation: 'Automated Backup Ventilation Activation',
        impact: 'Configure backup ventilation systems to activate automatically when primary HVAC is shut down. Maintain air quality in unaffected zones during emergency isolation procedures.',
        priority: 'high',
        estimatedCost: '$15K - $25K',
        estimatedTime: '2-3 weeks'
      },
      {
        id: 'failed-rec-5',
        category: 'maintenance',
        recommendation: 'Emergency Communication System Upgrade',
        impact: 'Upgrade emergency communication systems to ensure zero-delay personnel alerts. Implement redundant communication channels for critical emergency notifications.',
        priority: 'high',
        estimatedCost: '$20K - $40K',
        estimatedTime: '3-4 weeks'
      },
      {
        id: 'failed-rec-6',
        category: 'equipment',
        recommendation: 'NBC Equipment Storage Accessibility',
        impact: 'Relocate NBC emergency response equipment to ensure immediate access points in all sectors. Eliminate equipment access delays that contributed to extended response time.',
        priority: 'medium',
        estimatedCost: '$5K - $10K',
        estimatedTime: '1-2 weeks'
      }
    ],
    finalOutcome: 'SCENARIO FAILED - Chemical threat containment delayed due to HVAC automation failure. 12 personnel required medical treatment for chlorine exposure. Contamination spread to adjacent sectors before manual intervention successful. Decontamination required. Critical system failures identified requiring immediate remediation before facility can return to normal operations.'
  }
};

export function ScenarioDetailView({ scenarioId, language, onBack, onEmergencyModeChange, onSimulationStateChange, caseStatus }: ScenarioDetailViewProps) {
  const t = translations[language];
  const scenarioData = mockScenarioData[scenarioId];
  const [viewMode, setViewMode] = useState<ViewMode>('setup');
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  // Debug log
  console.log('ScenarioDetailView - scenarioId:', scenarioId, 'viewMode:', viewMode, 'caseStatus (not used):', caseStatus);

  // Automatically navigate back if scenario not found
  useEffect(() => {
    if (!scenarioData) {
      onBack();
    }
  }, [scenarioData, onBack]);

  // Update emergency mode when simulation starts
  const handleNewAttempt = () => {
    console.log('New Attempt clicked! Setting emergency mode and simulation state...');
    console.log('Scenario name:', scenarioData.setup.name);
    
    onEmergencyModeChange?.('emergency');
    onSimulationStateChange?.({
      drillName: scenarioData.setup.name,
      scenarioId: scenarioId,
      isRunning: true,
      isPaused: false,
      currentTime: 0,
      speed: 1
    });
    
    console.log('Emergency mode and simulation state set!');
    // Navigate back will be handled by App.tsx
  };

  const handleViewReport = (runId: string) => {
    setSelectedRunId(runId);
    setViewMode('report');
  };

  const handleBackToSetup = () => {
    setViewMode('setup');
    setSelectedRunId(null);
  };

  if (!scenarioData) {
    return null;
  }

  const getCaseName = (id: string) => {
    const nameMap: { [key: string]: keyof typeof translations.en } = {
      '1': 'case1Name',
      '2': 'case2Name',
      '3': 'case3Name',
    };
    const key = nameMap[id];
    return key ? t[key] : scenarioData.setup.name;
  };

  const getCaseDescription = (id: string) => {
    const descMap: { [key: string]: keyof typeof translations.en } = {
      '1': 'case1Desc',
      '2': 'case2Desc',
      '3': 'case3Desc',
    };
    const key = descMap[id];
    return key ? t[key] : scenarioData.setup.description;
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

  const getCaseLocation = (caseId: string, threatIndex: number) => {
    const locationKey = `case${caseId}Location${threatIndex + 1}` as keyof typeof translations.en;
    return t[locationKey] || '';
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'hostileForce': return Users;
      case 'cyber': return Wifi;
      case 'structuralFailure': return Building2;
      case 'chemical': return Skull;
      case 'explosive': return AlertTriangle;
      default: return AlertTriangle;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
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

  // Setup View (default)
  if (viewMode === 'setup') {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className={`size-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
            <span>{t.backToCases}</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {getCaseName(scenarioId)}
              </h1>
              <p className="text-gray-600">
                {getCaseDescription(scenarioId)}
              </p>
            </div>
            <button
              onClick={handleNewAttempt}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Play className="size-5" />
              <span>{language === 'ar' ? 'محاولة جديدة' : 'New Attempt'}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {/* Scenario Setup */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {language === 'ar' ? 'إعداد السيناريو' : 'Scenario Setup'}
                </h3>
                <button
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Edit2 className="size-4" />
                  <span>{language === 'ar' ? 'تعديل الإعدادات' : 'Edit Configuration'}</span>
                </button>
              </div>
              <div className="p-6">
                {/* Threat Timeline */}
                <div className="space-y-4">
                  {scenarioData.setup.threats.map((threat, index) => {
                    const ThreatIcon = getThreatIcon(threat.type);
                    return (
                      <div key={threat.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-center size-10 rounded bg-red-100 flex-shrink-0">
                          <ThreatIcon className="size-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-900">{getThreatName(threat.type)}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                              {threat.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-600">
                              {language === 'ar' ? 'في' : 'at'} <span className="font-medium">{threat.time}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <span className="font-medium">{language === 'en' ? 'Detector:' : 'الكاشف:'}</span>
                            {scenarioId === '3' ? (
                              <div className="flex items-center gap-1.5">
                                {index === 0 && (
                                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">
                                    C12
                                  </span>
                                )}
                                {index === 1 && (
                                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">
                                    C7
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span>{getCaseLocation(scenarioId, index) || threat.location}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{threat.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Previous Runs Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {language === 'ar' ? 'التجارب السابقة' : 'Previous Attempts'}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {language === 'ar' ? 'رقم التجربة' : 'Attempt #'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {language === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {language === 'ar' ? 'المدة' : 'Duration'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {language === 'ar' ? 'الإجراءات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {scenarioData.runs.map((run) => (
                      <tr key={run.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium text-gray-900">#{run.runNumber}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatDateTime(run.startTime)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {run.duration || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(run.status)}`}>
                            {run.status === 'success' ? (language === 'ar' ? 'نجح' : 'Success') :
                             run.status === 'failed' ? (language === 'ar' ? 'فشل' : 'Failed') :
                             (language === 'ar' ? 'قيد التشغيل' : 'In Progress')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {run.status === 'in-progress' ? (
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                              <Play className="size-4" />
                              <span>{language === 'ar' ? 'استئناف' : 'Resume'}</span>
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleViewReport(run.id)}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                            >
                              <Eye className="size-4" />
                              <span>{language === 'ar' ? 'عرض الترير' : 'View Report'}</span>
                            </button>
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

  // Report View
  const reportData = selectedRunId ? mockReportData[selectedRunId] : null;
  if (!reportData) {
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
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

  // Calculate statistics for summary
  const totalRecommendations = reportData.assessmentCheckpoints.reduce(
    (sum, cp) => sum + cp.recommendations.length,
    0
  );
  const appliedRecommendations = reportData.assessmentCheckpoints.reduce(
    (sum, cp) => sum + cp.recommendations.filter(r => r.applied).length,
    0
  );
  const adoptionRate = Math.round((appliedRecommendations / totalRecommendations) * 100);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <button
          onClick={handleBackToSetup}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className={`size-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
          <span>{language === 'ar' ? 'العودة إلى الإعداد' : 'Back to Setup'}</span>
        </button>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {getCaseName(scenarioId)}
            </h1>
            <p className="text-sm text-gray-600">
              {getCaseDescription(scenarioId)}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{formatDateTime(reportData.startTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>{reportData.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {/* Key Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`size-10 rounded flex items-center justify-center ${
                    reportData.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {reportData.status === 'success' ? (
                      <CheckCircle2 className="size-5 text-green-600" />
                    ) : (
                      <XCircle className="size-5 text-red-600" />
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{language === 'ar' ? 'الحالة النهائية' : 'Final Status'}</span>
                </div>
                <div className={`text-2xl font-bold ${
                  reportData.status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {reportData.status === 'success' 
                    ? (language === 'ar' ? 'نجح' : 'SUCCESS')
                    : (language === 'ar' ? 'فشل' : 'FAILED')}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-10 rounded bg-blue-100 flex items-center justify-center">
                    <Brain className="size-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">{language === 'ar' ? 'توصيات الذكاء الاصطناعي' : 'AI Recommendations'}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{totalRecommendations}</div>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-10 rounded bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">{language === 'ar' ? 'إجراءات الاستجابة التلقائية للطوارئ' : 'Automated Response Actions'}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{appliedRecommendations}</div>
              </div>
            </div>

            {/* Actions Taken Section */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {language === 'ar' ? 'الإجراءات المتخذة' : 'Actions Taken'}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        System / Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status Change
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Impact / Result
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Time Since Detection
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {/* GTV System */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Wind className="size-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">GTV System</div>
                            <div className="text-xs text-gray-500">HVAC Zone Control</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-semibold text-green-700">ACTIVATED</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Standby → Full Operation</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium mb-1">100% Containment Achieved</div>
                        <div className="text-xs text-gray-600">Complete HVAC zone isolation and contamination containment</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-900">45 seconds</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">After threat detection</div>
                      </td>
                    </tr>

                  {/* Fresh Air Intake */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                            <Airplay className="size-5 text-red-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">Fresh Air Intake</div>
                            <div className="text-xs text-gray-500">External Air Supply</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-red-500"></div>
                          <span className="text-sm font-semibold text-red-700">SHUT DOWN</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Active → Emergency Closure</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium mb-1">Zero External Exposure</div>
                        <div className="text-xs text-gray-600">Prevented contaminated external air infiltration to all zones</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-900">52 seconds</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">After threat detection</div>
                      </td>
                    </tr>

                  {/* External Water Supply */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                            <CloudRain className="size-5 text-red-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">External Water Supply</div>
                            <div className="text-xs text-gray-500">Municipal Water Connection</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-red-500"></div>
                          <span className="text-sm font-semibold text-red-700">ISOLATED</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Normal Flow → Isolated</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium mb-1">Water Supply Protected</div>
                        <div className="text-xs text-gray-600">Secured internal water reserves from external contamination</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-900">1 min 8 sec</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">After threat detection</div>
                      </td>
                    </tr>

                  {/* Filtration System */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Filter className="size-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">HEPA Filtration System</div>
                            <div className="text-xs text-gray-500">Air Quality Control</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-semibold text-green-700">ACTIVATED</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Standby → Maximum Capacity</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium mb-1">99.97% Air Quality Maintained</div>
                        <div className="text-xs text-gray-600">HEPA filters operating at maximum efficiency across all zones</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-900">1 min 15 sec</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">After threat detection</div>
                      </td>
                    </tr>

                  {/* CO2 Removal */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <FlaskConical className="size-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">CO₂ Removal System</div>
                            <div className="text-xs text-gray-500">Chemical Scrubbers</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-semibold text-green-700">ACTIVATED</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Passive → Active Scrubbing</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium mb-1">CO₂ at Safe Levels (450 ppm)</div>
                        <div className="text-xs text-gray-600">Scrubbers operational, maintaining safe atmospheric composition</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-900">1 min 22 sec</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">After threat detection</div>
                      </td>
                    </tr>

                  {/* O2 Supply System */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Radio className="size-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">O₂ Supply System</div>
                            <div className="text-xs text-gray-500">Emergency Oxygen Distribution</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-semibold text-green-700">ACTIVATED</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Reserve → Active Distribution</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium mb-1">Oxygen Level at 21.5%</div>
                        <div className="text-xs text-gray-600">Emergency oxygen distribution to all zones maintaining safe levels</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-900">1 min 30 sec</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">After threat detection</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scenario Outcome Summary */}
            <div className={`bg-white rounded-lg shadow-sm border-l-4 p-6 ${
              reportData.status === 'success' ? 'border-green-600' : 'border-red-600'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`size-12 rounded flex items-center justify-center flex-shrink-0 ${
                  reportData.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {reportData.status === 'success' ? (
                    <CheckCircle2 className="size-6 text-green-600" />
                  ) : (
                    <XCircle className="size-6 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'النتيجة النهائية' : 'Final Outcome Summary'}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-sm mb-4">{reportData.finalOutcome}</p>
                  
                  {reportData.outcomeSummaryPoints && reportData.outcomeSummaryPoints.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {reportData.outcomeSummaryPoints.map((point, index) => (
                        <div key={index} className="border-l-2 border-gray-300 pl-4">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{point.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{point.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {language === 'ar' ? 'التوصيات الاستراتيجية' : 'Strategic Recommendations'}
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportData.strategicRecommendations.map((rec) => {
                    const CategoryIcon = getCategoryIcon(rec.category);
                    return (
                      <div key={rec.id} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`size-10 rounded flex items-center justify-center flex-shrink-0 ${
                            rec.priority === 'critical' ? 'bg-red-100' : 
                            rec.priority === 'high' ? 'bg-orange-100' : 'bg-blue-100'
                          }`}>
                            <CategoryIcon className={`size-5 ${
                              rec.priority === 'critical' ? 'text-red-600' : 
                              rec.priority === 'high' ? 'text-orange-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${getPriorityColor(rec.priority)}`}>
                                {rec.priority.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-600 capitalize">{rec.category}</span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm mb-2">{rec.recommendation}</h4>
                          </div>
                        </div>
                        
                        {/* Key Impact Points */}
                        <div className="mb-3 pl-13">
                          <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">{rec.impact}</p>
                        </div>

                        {/* Cost and Time */}
                        <div className="flex items-center gap-4 text-xs pl-13">
                          <div className="flex items-center gap-1.5">
                            <Activity className="size-3.5 text-gray-500" />
                            <span className="font-medium text-gray-700">{rec.estimatedCost}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-gray-500" />
                            <span className="font-medium text-gray-700">{rec.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}