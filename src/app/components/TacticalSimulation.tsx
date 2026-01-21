import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, FastForward, Clock, AlertTriangle, CheckCircle2, XCircle, Brain, Zap, Shield, TrendingUp, Users, Wifi, Building2, Skull, Target, Activity, ChevronRight } from 'lucide-react';
import { Language, translations } from '../translations';

interface ThreatEvent {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  time: number; // in seconds from start
  description: string;
  detected: boolean;
}

interface TacticalRecommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium';
  action: string;
  reason: string;
  estimatedEffect: string;
  status: 'pending' | 'applied' | 'rejected';
  appliedAt?: number;
  actualEffect?: string;
}

interface AIAssessment {
  id: string;
  time: number;
  trigger: string;
  prediction: 'success' | 'partial' | 'failure';
  confidence: number;
  situationSummary: string;
  currentStateAnalysis: {
    threatLevel: 'low' | 'medium' | 'high' | 'critical';
    riskFactors: string[];
    vulnerabilities: string[];
    strengths: string[];
    projectedOutcome: string;
    criticalGaps: string[];
  };
  recommendations: TacticalRecommendation[];
  shown: boolean;
}

interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  currentTime: number; // in seconds
  speed: 1 | 2 | 4; // simulation speed multiplier
  threatsDetected: number;
  threatsNeutralized: number;
  recommendationsApplied: number;
  systemHealth: number; // percentage
  personnelSafety: number; // percentage
  supplyReserves: number; // percentage
}

interface TacticalSimulationProps {
  scenarioId: string;
  scenarioName: string;
  language: Language;
  onClose: () => void;
  onStateChange?: (state: {
    scenarioName: string;
    isRunning: boolean;
    isPaused: boolean;
    currentTime: number;
    speed: 1 | 2 | 4;
  }) => void;
}

export function TacticalSimulation({ scenarioId, scenarioName, language, onClose, onStateChange }: TacticalSimulationProps) {
  const t = translations[language];
  const [state, setState] = useState<SimulationState>({
    isRunning: false,
    isPaused: false,
    currentTime: 0,
    speed: 1,
    threatsDetected: 0,
    threatsNeutralized: 0,
    recommendationsApplied: 0,
    systemHealth: 100,
    personnelSafety: 100,
    supplyReserves: 85,
  });

  const [threats, setThreats] = useState<ThreatEvent[]>([
    {
      id: 't1',
      type: 'hostileForce',
      severity: 'critical',
      location: 'Perimeter - All Sectors',
      time: 0,
      description: 'Hostile force detected at perimeter. Estimated 50+ personnel with heavy weapons.',
      detected: false
    },
    {
      id: 't2',
      type: 'cyber',
      severity: 'high',
      location: 'Floor 1 - Command Center',
      time: 360, // 6 minutes
      description: 'Coordinated cyber attack on command and control systems detected.',
      detected: false
    },
    {
      id: 't3',
      type: 'structuralFailure',
      severity: 'medium',
      location: 'Floor 2 - North Wing',
      time: 1440, // 24 minutes
      description: 'Minor structural damage from sustained artillery fire.',
      detected: false
    },
  ]);

  const [assessments, setAssessments] = useState<AIAssessment[]>([
    {
      id: 'a1',
      time: 5,
      trigger: 'Initial threat detected',
      prediction: 'success',
      confidence: 78,
      situationSummary: 'Hostile force detected. Immediate defensive measures required.',
      currentStateAnalysis: {
        threatLevel: 'critical',
        riskFactors: ['Hostile force with heavy weapons', 'Perimeter breach risk'],
        vulnerabilities: ['Unsecured entry points', 'Automated defense systems not activated'],
        strengths: ['Robust perimeter defense systems available'],
        projectedOutcome: 'Potential breach if not secured',
        criticalGaps: ['Level 3 Lockdown Protocol not activated']
      },
      recommendations: [
        {
          id: 'r1',
          priority: 'critical',
          action: 'Activate Level 3 Lockdown Protocol',
          reason: 'Secure all entry points and engage automated perimeter defense systems.',
          estimatedEffect: 'Expected: 100% perimeter security, prevent breach attempts',
          status: 'pending'
        },
        {
          id: 'r2',
          priority: 'critical',
          action: 'Enable Advanced Cyber Defense Suite',
          reason: 'Hostile forces likely to attempt coordinated cyber attacks.',
          estimatedEffect: 'Expected: Block 90%+ of intrusion attempts, protect critical systems',
          status: 'pending'
        },
        {
          id: 'r3',
          priority: 'high',
          action: 'Implement Resource Conservation Protocol',
          reason: 'Unknown siege duration requires optimized supply management.',
          estimatedEffect: 'Expected: Extend operational capability by 50%, reduce consumption by 25%',
          status: 'pending'
        }
      ],
      shown: false
    },
    {
      id: 'a2',
      time: 365,
      trigger: 'Cyber attack detected',
      prediction: 'success',
      confidence: 82,
      situationSummary: 'Coordinated cyber attack underway. Defensive measures performing well.',
      currentStateAnalysis: {
        threatLevel: 'high',
        riskFactors: ['Cyber attack on command systems', 'Potential data loss'],
        vulnerabilities: ['Non-secured network segments', 'Limited communication redundancy'],
        strengths: ['Advanced cyber defense suite active'],
        projectedOutcome: 'Critical systems protected, communication maintained',
        criticalGaps: ['Distributed Communication Network not activated']
      },
      recommendations: [
        {
          id: 'r4',
          priority: 'critical',
          action: 'Activate Distributed Communication Network',
          reason: 'Ensure communication redundancy during cyber assault.',
          estimatedEffect: 'Expected: Maintain 85%+ communication capacity even under attack',
          status: 'pending'
        },
        {
          id: 'r5',
          priority: 'high',
          action: 'Isolate Non-Critical Network Segments',
          reason: 'Limit cyber attack surface by disconnecting non-essential systems.',
          estimatedEffect: 'Expected: Reduce attack surface by 40%, protect critical infrastructure',
          status: 'pending'
        }
      ],
      shown: false
    },
    {
      id: 'a3',
      time: 1445,
      trigger: 'Structural damage reported',
      prediction: 'success',
      confidence: 76,
      situationSummary: 'North perimeter sustaining damage. Integrity at 87% and deteriorating.',
      currentStateAnalysis: {
        threatLevel: 'medium',
        riskFactors: ['Structural damage from artillery fire', 'Potential collapse'],
        vulnerabilities: ['Minor structural damage', 'Unreinforced walls'],
        strengths: ['Emergency barriers available'],
        projectedOutcome: 'Wall integrity stabilized, potential collapse prevented',
        criticalGaps: ['North Wall not reinforced']
      },
      recommendations: [
        {
          id: 'r6',
          priority: 'high',
          action: 'Reinforce North Wall with Emergency Barriers',
          reason: 'Prevent further structural degradation and potential breach.',
          estimatedEffect: 'Expected: Stabilize wall integrity, prevent collapse',
          status: 'pending'
        },
        {
          id: 'r7',
          priority: 'high',
          action: 'Activate Psychological Support Protocols',
          reason: 'Extended stress affecting personnel. Morale management critical.',
          estimatedEffect: 'Expected: Restore morale by 10-15%, maintain readiness',
          status: 'pending'
        }
      ],
      shown: false
    }
  ]);

  const [activeAssessment, setActiveAssessment] = useState<AIAssessment | null>(null);
  const [detectedThreats, setDetectedThreats] = useState<ThreatEvent[]>([]);
  const [eventLog, setEventLog] = useState<Array<{ time: number; message: string; type: 'threat' | 'action' | 'success' | 'warning' }>>([]);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [shownAssessments, setShownAssessments] = useState<AIAssessment[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-start simulation on mount
  useEffect(() => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  // Notify parent component about state changes
  useEffect(() => {
    onStateChange?.({
      scenarioName,
      isRunning: state.isRunning,
      isPaused: state.isPaused,
      currentTime: state.currentTime,
      speed: state.speed
    });
  }, [scenarioName, state.isRunning, state.isPaused, state.currentTime, state.speed, onStateChange]);

  // Start simulation
  const startSimulation = () => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
  };

  // Pause/Resume simulation
  const togglePause = () => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  // Change speed
  const changeSpeed = () => {
    setState(prev => ({
      ...prev,
      speed: (prev.speed === 1 ? 2 : prev.speed === 2 ? 4 : 1) as 1 | 2 | 4
    }));
  };

  // Main simulation loop
  useEffect(() => {
    if (!state.isRunning || state.isPaused) return;

    timerRef.current = setInterval(() => {
      setState(prev => {
        const newTime = prev.currentTime + (1 * prev.speed);

        // Check if simulation should end (e.g., after 30 minutes = 1800 seconds)
        if (newTime >= 1800) {
          setSimulationComplete(true);
          return { ...prev, isRunning: false, currentTime: 1800 };
        }

        return { ...prev, currentTime: newTime };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isRunning, state.isPaused, state.speed]);

  // Detect threats based on current time
  useEffect(() => {
    threats.forEach(threat => {
      if (!threat.detected && state.currentTime >= threat.time) {
        // Mark threat as detected
        setThreats(prev => prev.map(t => 
          t.id === threat.id ? { ...t, detected: true } : t
        ));
        setDetectedThreats(prev => [...prev, threat]);
        setState(prev => ({ 
          ...prev, 
          threatsDetected: prev.threatsDetected + 1,
          systemHealth: Math.max(0, prev.systemHealth - (threat.severity === 'critical' ? 15 : threat.severity === 'high' ? 10 : 5)),
          personnelSafety: Math.max(0, prev.personnelSafety - (threat.severity === 'critical' ? 10 : threat.severity === 'high' ? 5 : 2))
        }));
        setEventLog(prev => [...prev, {
          time: state.currentTime,
          message: `${threat.type === 'hostileForce' ? t.hostileForce : threat.type === 'cyber' ? t.cyber : t.structuralFailure} - ${threat.location}`,
          type: 'threat'
        }]);
      }
    });
  }, [state.currentTime, threats, t]);

  // Show assessments based on current time
  useEffect(() => {
    assessments.forEach(assessment => {
      if (!assessment.shown && state.currentTime >= assessment.time) {
        setAssessments(prev => prev.map(a =>
          a.id === assessment.id ? { ...a, shown: true } : a
        ));
        setActiveAssessment(assessment);
        setShownAssessments(prev => [...prev, assessment]);
      }
    });
  }, [state.currentTime, assessments]);

  // Apply recommendation
  const applyRecommendation = (assessmentId: string, recommendationId: string) => {
    setAssessments(prev => prev.map(a => {
      if (a.id === assessmentId) {
        return {
          ...a,
          recommendations: a.recommendations.map(r => {
            if (r.id === recommendationId) {
              // Calculate actual effect based on recommendation
              let actualEffect = '';
              let healthBonus = 0;
              let safetyBonus = 0;
              let neutralized = 0;

              if (r.id === 'r1') {
                actualEffect = 'All 47 access points secured. Defensive perimeter at 100%. Zero breaches.';
                healthBonus = 10;
                safetyBonus = 15;
                neutralized = 1;
              } else if (r.id === 'r2') {
                actualEffect = 'AI intrusion detection active. Blocked 3 reconnaissance probes.';
                healthBonus = 8;
                safetyBonus = 5;
              } else if (r.id === 'r3') {
                actualEffect = 'Consumption reduced 23%. Extended operational duration to 45+ days.';
                setState(prev => ({ ...prev, supplyReserves: Math.min(100, prev.supplyReserves + 10) }));
              } else if (r.id === 'r4') {
                actualEffect = 'Mesh network activated. Communication redundancy: 87% maintained.';
                healthBonus = 12;
                neutralized = 1;
              } else if (r.id === 'r5') {
                actualEffect = 'Attack surface reduced 40%. Critical systems protected.';
                healthBonus = 8;
              } else if (r.id === 'r6') {
                actualEffect = 'Emergency barriers deployed. Wall integrity stabilized at 84%.';
                healthBonus = 15;
                neutralized = 1;
              } else if (r.id === 'r7') {
                actualEffect = 'Morale recovered to 89%. Personnel readiness maintained.';
                safetyBonus = 12;
              }

              setState(prev => ({
                ...prev,
                recommendationsApplied: prev.recommendationsApplied + 1,
                systemHealth: Math.min(100, prev.systemHealth + healthBonus),
                personnelSafety: Math.min(100, prev.personnelSafety + safetyBonus),
                threatsNeutralized: prev.threatsNeutralized + neutralized
              }));

              setEventLog(prev => [...prev, {
                time: state.currentTime,
                message: `Applied: ${r.action}`,
                type: 'action'
              }, {
                time: state.currentTime,
                message: actualEffect,
                type: 'success'
              }]);

              return { ...r, status: 'applied' as const, appliedAt: state.currentTime, actualEffect };
            }
            return r;
          })
        };
      }
      return a;
    }));

    // Update confidence if all critical recommendations are applied
    setTimeout(() => {
      setActiveAssessment(null);
    }, 500);
  };

  // Reject recommendation
  const rejectRecommendation = (assessmentId: string, recommendationId: string) => {
    setAssessments(prev => prev.map(a => {
      if (a.id === assessmentId) {
        return {
          ...a,
          recommendations: a.recommendations.map(r => {
            if (r.id === recommendationId) {
              setEventLog(prev => [...prev, {
                time: state.currentTime,
                message: `Rejected: ${r.action}`,
                type: 'warning'
              }]);
              return { ...r, status: 'rejected' as const };
            }
            return r;
          })
        };
      }
      return a;
    }));

    setTimeout(() => {
      setActiveAssessment(null);
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Simulation Controls */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between border-b-2 border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Time Display */}
          <div className="flex items-center gap-2 bg-black bg-opacity-30 px-4 py-2 rounded-lg">
            <Clock className="size-5" />
            <span className="text-2xl font-mono font-bold">{formatTime(state.currentTime)}</span>
          </div>

          {/* Controls */}
          {!state.isRunning ? (
            <button
              onClick={startSimulation}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              <Play className="size-5" />
              <span>{t.startSimulation || 'Start Simulation'}</span>
            </button>
          ) : (
            <>
              <button
                onClick={togglePause}
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                {state.isPaused ? <Play className="size-5" /> : <Pause className="size-5" />}
              </button>
              <button
                onClick={changeSpeed}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <FastForward className="size-5" />
                <span>{state.speed}x</span>
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Metrics & Status */}
        <div className="w-80 bg-gray-900 text-white p-6 overflow-y-auto border-r border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="size-5 text-blue-400" />
            {t.systemStatus || 'System Status'}
          </h3>

          {/* Key Metrics */}
          <div className="space-y-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">{t.systemHealth || 'System Health'}</div>
              <div className="flex items-end gap-2">
                <div className={`text-3xl font-bold ${getStatusColor(state.systemHealth)}`}>
                  {state.systemHealth}%
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    state.systemHealth >= 80 ? 'bg-green-500' :
                    state.systemHealth >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${state.systemHealth}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">{t.personnelSafety || 'Personnel Safety'}</div>
              <div className="flex items-end gap-2">
                <div className={`text-3xl font-bold ${getStatusColor(state.personnelSafety)}`}>
                  {state.personnelSafety}%
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    state.personnelSafety >= 80 ? 'bg-green-500' :
                    state.personnelSafety >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${state.personnelSafety}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">{t.supplyReserves || 'Supply Reserves'}</div>
              <div className="flex items-end gap-2">
                <div className={`text-3xl font-bold ${getStatusColor(state.supplyReserves)}`}>
                  {state.supplyReserves}%
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    state.supplyReserves >= 80 ? 'bg-green-500' :
                    state.supplyReserves >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${state.supplyReserves}%` }}
                />
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-red-900 bg-opacity-30 rounded-lg p-3 border border-red-700">
              <div className="text-xs text-red-300 mb-1">{t.threatsDetected || 'Threats'}</div>
              <div className="text-2xl font-bold text-red-400">{state.threatsDetected}</div>
            </div>
            <div className="bg-green-900 bg-opacity-30 rounded-lg p-3 border border-green-700">
              <div className="text-xs text-green-300 mb-1">{t.neutralized || 'Neutralized'}</div>
              <div className="text-2xl font-bold text-green-400">{state.threatsNeutralized}</div>
            </div>
            <div className="bg-blue-900 bg-opacity-30 rounded-lg p-3 border border-blue-700 col-span-2">
              <div className="text-xs text-blue-300 mb-1">{t.actionsApplied || 'Actions Applied'}</div>
              <div className="text-2xl font-bold text-blue-400">{state.recommendationsApplied}</div>
            </div>
          </div>

          {/* Detected Threats */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider">
              {t.activeThreats || 'Active Threats'}
            </h4>
            <div className="space-y-2">
              {detectedThreats.slice(-3).reverse().map(threat => {
                const Icon = getThreatIcon(threat.type);
                return (
                  <div key={threat.id} className="bg-gray-800 rounded-lg p-3 border-l-4 border-red-500">
                    <div className="flex items-start gap-2">
                      <Icon className="size-4 text-red-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          {threat.type === 'hostileForce' ? t.hostileForce :
                           threat.type === 'cyber' ? t.cyber :
                           t.structuralFailure}
                        </div>
                        <div className="text-xs text-gray-400 truncate">{threat.location}</div>
                      </div>
                      <div className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(threat.severity)} text-white`}>
                        {threat.severity === 'critical' ? t.critical :
                         threat.severity === 'high' ? t.high :
                         threat.severity === 'medium' ? t.medium : t.low}
                      </div>
                    </div>
                  </div>
                );
              })}
              {detectedThreats.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">
                  {t.noThreatsYet || 'No threats detected yet'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Panel - Main View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Event Log */}
          <div className="flex-1 bg-gray-800 p-6 overflow-hidden flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="size-5 text-green-400" />
              {t.eventLog || 'Event Log'}
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2">
              {eventLog.slice().reverse().map((event, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    event.type === 'threat' ? 'bg-red-900 bg-opacity-30 border-l-4 border-red-500' :
                    event.type === 'action' ? 'bg-blue-900 bg-opacity-30 border-l-4 border-blue-500' :
                    event.type === 'success' ? 'bg-green-900 bg-opacity-30 border-l-4 border-green-500' :
                    'bg-yellow-900 bg-opacity-30 border-l-4 border-yellow-500'
                  }`}
                >
                  <div className="text-xs text-gray-400 font-mono whitespace-nowrap">
                    {formatTime(event.time)}
                  </div>
                  <div className="flex-1">
                    {event.type === 'threat' && <AlertTriangle className="size-4 text-red-400 inline mr-2" />}
                    {event.type === 'action' && <Zap className="size-4 text-blue-400 inline mr-2" />}
                    {event.type === 'success' && <CheckCircle2 className="size-4 text-green-400 inline mr-2" />}
                    {event.type === 'warning' && <XCircle className="size-4 text-yellow-400 inline mr-2" />}
                    <span className="text-sm text-white">{event.message}</span>
                  </div>
                </div>
              ))}
              {eventLog.length === 0 && !state.isRunning && (
                <div className="text-center text-gray-500 py-12">
                  <Target className="size-12 mx-auto mb-4 opacity-50" />
                  <div className="text-lg font-semibold mb-2">{t.simulationReady || 'Simulation Ready'}</div>
                  <div className="text-sm">{t.clickStartToBegin || 'Click \"Start Simulation\" to begin'}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - AI Recommendations */}
        <div className="w-96 bg-gradient-to-b from-indigo-950 to-purple-950 text-white overflow-y-auto border-l border-indigo-700">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center size-12 rounded-full bg-indigo-600">
                <Brain className="size-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-indigo-300 uppercase tracking-wider">{t.aiAssessment}</div>
                <div className="text-lg font-bold">{t.recommendedActions || 'AI Recommendations'}</div>
              </div>
            </div>

            {shownAssessments.length === 0 ? (
              <div className="text-center text-indigo-400 py-12">
                <Brain className="size-16 mx-auto mb-4 opacity-30" />
                <div className="text-sm">{t.noAssessmentsYet || 'AI assessments will appear here as the simulation progresses'}</div>
              </div>
            ) : (
              <div className="space-y-6">
                {shownAssessments.slice().reverse().map(assessment => (
                  <div key={assessment.id} className="border-t border-indigo-800 pt-6 first:border-0 first:pt-0">
                    {/* Assessment Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-indigo-300 font-mono">{formatTime(assessment.time)}</div>
                        <div className="flex items-center gap-1 text-xs text-indigo-300">
                          <Shield className="size-3" />
                          <span>{t.confidence}: {assessment.confidence}%</span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-indigo-200 mb-1">{assessment.trigger}</div>
                      <p className="text-xs text-indigo-300">{assessment.situationSummary}</p>
                    </div>

                    {/* Current State Analysis */}
                    <div className="bg-black bg-opacity-40 rounded-lg p-4 mb-4 border border-indigo-700">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="size-4 text-indigo-400" />
                        <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                          {t.currentStateAnalysis || 'Current State Analysis'}
                        </div>
                      </div>

                      {/* Prediction */}
                      <div className="mb-3 pb-3 border-b border-indigo-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-indigo-400">{t.prediction || 'Prediction'}:</span>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            assessment.prediction === 'success' ? 'bg-green-600 text-white' :
                            assessment.prediction === 'partial' ? 'bg-yellow-600 text-white' :
                            'bg-red-600 text-white'
                          }`}>
                            {assessment.prediction === 'success' ? t.success || 'Success' :
                             assessment.prediction === 'partial' ? t.partial || 'Partial Success' :
                             t.failure || 'Failure'}
                          </div>
                        </div>
                        <div className="text-xs text-gray-300">{assessment.currentStateAnalysis.projectedOutcome}</div>
                      </div>

                      {/* Threat Level */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-indigo-400">{t.threatLevel || 'Threat Level'}:</span>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            assessment.currentStateAnalysis.threatLevel === 'critical' ? 'bg-red-500 text-white' :
                            assessment.currentStateAnalysis.threatLevel === 'high' ? 'bg-orange-500 text-white' :
                            assessment.currentStateAnalysis.threatLevel === 'medium' ? 'bg-yellow-500 text-gray-900' :
                            'bg-blue-500 text-white'
                          }`}>
                            {assessment.currentStateAnalysis.threatLevel.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {/* Risk Factors */}
                      {assessment.currentStateAnalysis.riskFactors.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs text-red-400 font-semibold mb-1">{t.riskFactors || 'Risk Factors'}:</div>
                          <ul className="space-y-1">
                            {assessment.currentStateAnalysis.riskFactors.map((factor, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-start gap-1">
                                <span className="text-red-400 mt-0.5">•</span>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Vulnerabilities */}
                      {assessment.currentStateAnalysis.vulnerabilities.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs text-orange-400 font-semibold mb-1">{t.vulnerabilities || 'Vulnerabilities'}:</div>
                          <ul className="space-y-1">
                            {assessment.currentStateAnalysis.vulnerabilities.map((vuln, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-start gap-1">
                                <span className="text-orange-400 mt-0.5">•</span>
                                <span>{vuln}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Critical Gaps */}
                      {assessment.currentStateAnalysis.criticalGaps.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs text-yellow-400 font-semibold mb-1">{t.criticalGaps || 'Critical Gaps'}:</div>
                          <ul className="space-y-1">
                            {assessment.currentStateAnalysis.criticalGaps.map((gap, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-start gap-1">
                                <span className="text-yellow-400 mt-0.5">•</span>
                                <span>{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Strengths */}
                      {assessment.currentStateAnalysis.strengths.length > 0 && (
                        <div>
                          <div className="text-xs text-green-400 font-semibold mb-1">{t.strengths || 'Strengths'}:</div>
                          <ul className="space-y-1">
                            {assessment.currentStateAnalysis.strengths.map((strength, idx) => (
                              <li key={idx} className="text-xs text-gray-300 flex items-start gap-1">
                                <span className="text-green-400 mt-0.5">•</span>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Recommendations Header */}
                    <div className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                      <Zap className="size-3 text-yellow-400" />
                      {t.recommendedActions || 'Recommended Actions'}
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-3">
                      {assessment.recommendations.map(rec => (
                        <div
                          key={rec.id}
                          className={`rounded-lg p-4 border ${
                            rec.status === 'applied' ? 'bg-green-900 bg-opacity-40 border-green-500' :
                            rec.status === 'rejected' ? 'bg-gray-800 bg-opacity-40 border-gray-600' :
                            'bg-indigo-900 bg-opacity-40 border-indigo-600'
                          }`}
                        >
                          {/* Priority Badge */}
                          <div className="flex items-center justify-between mb-2">
                            <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              rec.priority === 'critical' ? 'bg-red-500 text-white' :
                              rec.priority === 'high' ? 'bg-orange-500 text-white' :
                              'bg-yellow-500 text-gray-900'
                            }`}>
                              {rec.priority === 'critical' ? t.critical :
                               rec.priority === 'high' ? t.high : t.medium}
                            </div>
                            {rec.status === 'applied' && (
                              <div className="flex items-center gap-1 text-green-400 text-xs">
                                <CheckCircle2 className="size-3" />
                                <span>{t.applied || 'Applied'}</span>
                              </div>
                            )}
                            {rec.status === 'rejected' && (
                              <div className="flex items-center gap-1 text-gray-400 text-xs">
                                <XCircle className="size-3" />
                                <span>{t.rejected}</span>
                              </div>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-white mb-1">{rec.action}</h4>
                          <p className="text-xs text-gray-300 mb-2">{rec.reason}</p>

                          {/* Effect */}
                          <div className="bg-black bg-opacity-40 rounded p-2 mb-3">
                            <div className="text-xs text-indigo-300 mb-1 flex items-center gap-1">
                              <Zap className="size-3" />
                              {rec.status === 'applied' ? t.actualEffect || 'Actual Effect' : t.estimatedEffect || 'Estimated Effect'}:
                            </div>
                            <p className="text-xs text-white">
                              {rec.status === 'applied' ? rec.actualEffect : rec.estimatedEffect}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          {rec.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => applyRecommendation(assessment.id, rec.id)}
                                className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-semibold transition-all"
                              >
                                <CheckCircle2 className="size-3" />
                                <span>{t.applyAction || 'Apply'}</span>
                              </button>
                              <button
                                onClick={() => rejectRecommendation(assessment.id, rec.id)}
                                className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs font-semibold transition-all"
                              >
                                <XCircle className="size-3" />
                                <span>{t.reject || 'Reject'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simulation Complete Modal */}
      {simulationComplete && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-6 z-20">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 border-4 border-green-500">
            <div className="text-center mb-6">
              <Shield className="size-20 mx-auto mb-4 text-green-500" />
              <h2 className="text-3xl font-bold text-white mb-2">{t.simulationComplete || 'Simulation Complete'}</h2>
              <p className="text-gray-400">{t.performanceSummary || 'Performance Summary'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">{t.finalSystemHealth || 'Final System Health'}</div>
                <div className={`text-3xl font-bold ${getStatusColor(state.systemHealth)}`}>{state.systemHealth}%</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">{t.personnelSafety}</div>
                <div className={`text-3xl font-bold ${getStatusColor(state.personnelSafety)}`}>{state.personnelSafety}%</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">{t.threatsNeutralized || 'Threats Neutralized'}</div>
                <div className="text-3xl font-bold text-green-400">{state.threatsNeutralized}/{state.threatsDetected}</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">{t.adoptionRate}</div>
                <div className="text-3xl font-bold text-blue-400">
                  {Math.round((state.recommendationsApplied / assessments.reduce((sum, a) => sum + a.recommendations.length, 0)) * 100)}%
                </div>
              </div>
            </div>

            <div className="bg-green-900 bg-opacity-30 rounded-lg p-4 border border-green-600 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="size-5 text-green-400" />
                <div className="font-semibold text-green-400">{t.overallPerformance || 'Overall Performance'}</div>
              </div>
              <p className="text-white text-sm">
                {state.systemHealth >= 80 && state.personnelSafety >= 80
                  ? t.excellentPerformance || 'Excellent performance! All systems maintained and personnel kept safe.'
                  : state.systemHealth >= 50 && state.personnelSafety >= 50
                  ? t.goodPerformance || 'Good performance. Some systems degraded but mission objectives achieved.'
                  : t.needsImprovement || 'Performance needs improvement. Review recommendations for better outcomes.'}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {t.closeSimulation || 'Close Simulation'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}