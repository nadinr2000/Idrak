import { AlertCircle, ArrowLeft, Brain, CheckCircle, Shield, Sparkles, TrendingUp, Wind, X } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Sensor {
  id: string;
  name: string;
  type: 'chemical' | 'temperature' | 'smoke' | 'motion' | 'pressure' | 'air-quality' | 'warning';
  subType?: 'R' | 'B' | 'C' | 'CO2' | 'CO' | 'O2' | 'DP' | 'T' | 'H' | 'W' | 'AF' | 'F' | 'GTV' | 'DOOR' | 'AI';
  status: 'operational' | 'warning' | 'critical';
  value: string;
  x: number;
  y: number;
  lastUpdate?: string;
}

interface SensorDetailPanelProps {
  sensor: Sensor;
  onClose: () => void;
  generateSensorHistory?: (sensor: Sensor) => any[];
  emergencyMode?: boolean;
  language?: 'en' | 'ar';
}

// Default sensor history generator
const defaultGenerateSensorHistory = (sensor: Sensor) => {
  const baseValue = parseFloat(sensor.value) || 400;
  const data = [];
  
  // Last 6 hours (actual data)
  for (let i = 6; i >= 1; i--) {
    data.push({
      time: `-${i}h`,
      timeActual: `${i}h ago`,
      actual: baseValue + (Math.random() - 0.5) * 20,
      predicted: null
    });
  }
  
  // Current time
  data.push({
    time: 'Now',
    timeActual: 'Current',
    actual: baseValue,
    predicted: baseValue
  });
  
  // Next 6 hours (predicted data)
  for (let i = 1; i <= 6; i++) {
    data.push({
      time: `+${i}h`,
      timeActual: `in ${i}h`,
      actual: null,
      predicted: baseValue + (Math.random() - 0.3) * 25
    });
  }
  
  return data;
};

export function SensorDetailPanel({ sensor, onClose, generateSensorHistory, emergencyMode, language = 'en' }: SensorDetailPanelProps) {
  const historyGenerator = generateSensorHistory || defaultGenerateSensorHistory;

  // Special rendering for chemical threat in emergency mode
  if (sensor.type === 'chemical' && sensor.status === 'critical' && sensor.subType === 'C') {
    return (
      <div className="space-y-4">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Threat Header */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-2 border-red-500 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-600">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{sensor.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">ID: {sensor.id}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">{sensor.lastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600">
            <div className="w-2 h-2 rounded-full bg-red-200 animate-pulse" />
            <span className="text-sm font-bold text-white uppercase">{sensor.value}</span>
          </div>
        </div>

        {/* Threat Summary */}
        <div className="bg-white rounded-lg border-2 border-red-500 p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Threat Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Threat Level</span>
              <span className="text-sm font-bold text-red-600">CRITICAL</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Detection Time</span>
              <span className="text-sm font-bold text-gray-900">{sensor.lastUpdate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Agent Type</span>
              <span className="text-sm font-bold text-gray-900">Chemical Irritant</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Concentration</span>
              <span className="text-sm font-bold text-red-600">High</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Affected Areas</span>
              <span className="text-sm font-bold text-gray-900">Zone C, Zone D</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Personnel at Risk</span>
              <span className="text-sm font-bold text-red-600">28 personnel</span>
            </div>
          </div>
        </div>

        {/* AI Assessment */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">AI Threat Assessment</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Wind className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Spreading Rate</div>
                  <div className="text-sm text-gray-700">
                    <span className="font-bold text-red-600">High</span> - Agent dispersing at approximately 
                    <span className="font-bold"> 2.3 m/s</span> through HVAC system. Current wind conditions from 
                    southwest at 1.8 m/s accelerating distribution. Estimated full contamination of Zones C and D 
                    within <span className="font-bold text-red-600">8-12 minutes</span>.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Health Impact Analysis</div>
                  <div className="text-sm text-gray-700">
                    Moderate respiratory irritant detected. Without protective equipment: 
                    <span className="font-bold text-orange-600"> 85% personnel</span> will experience severe discomfort 
                    within 2-3 minutes of exposure. With immediate evacuation and proper decontamination procedures, 
                    survival rate: <span className="font-bold text-green-600">99.8%</span>. Long-term health effects: Minimal if evacuated within 
                    <span className="font-bold"> 5 minutes</span>.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Contamination Trajectory</div>
                  <div className="text-sm text-gray-700">
                    AI models predict expansion to adjacent zones within 15-20 minutes. Probability of containment 
                    breach to Zone A: <span className="font-bold text-orange-600">67%</span> within 30 minutes. 
                    Recommended immediate HVAC shutdown and zone isolation. Natural dissipation time without 
                    intervention: <span className="font-bold">45-60 minutes</span>.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Risk Classification</div>
                  <div className="text-sm text-gray-700">
                    Threat level: <span className="font-bold text-red-600">CRITICAL</span>. 
                    Immediate evacuation required. Chemical identified as non-lethal irritant compound. 
                    Hazmat team deployment: <span className="font-bold text-green-600">RECOMMENDED</span>. 
                    Decontamination protocols must be initiated within 10 minutes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommended Actions */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-bold text-gray-900">AI Recommended Actions</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Immediate Evacuation (Priority: CRITICAL)</div>
                  <div className="text-sm text-gray-700">
                    Initiate emergency evacuation of Zones C and D immediately. Activate building-wide alarm system. 
                    Direct all personnel to designated assembly points Alpha and Bravo. Ensure accountability within 
                    <span className="font-bold"> 3 minutes</span>. Emergency exits 3, 4, and 5 should be used.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">HVAC Shutdown & Zone Isolation (Priority: CRITICAL)</div>
                  <div className="text-sm text-gray-700">
                    Immediately shut down HVAC systems for Zones C and D to prevent agent spread. Activate zone 
                    containment protocols. Close all fire doors and dampers. Pressurize adjacent zones to create 
                    negative pressure barrier. Estimated containment time: <span className="font-bold">90 seconds</span>.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Deploy Hazmat Response Team (Priority: HIGH)</div>
                  <div className="text-sm text-gray-700">
                    Dispatch certified hazmat personnel with Level B protective equipment. Establish decontamination 
                    station at Zone C entrance. Begin air sampling and agent identification procedures. Coordinate 
                    with external emergency services. ETA: <span className="font-bold">4-6 minutes</span>.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Medical Support & Monitoring (Priority: HIGH)</div>
                  <div className="text-sm text-gray-700">
                    Alert on-site medical team. Prepare triage area for potential respiratory distress cases. 
                    Administer oxygen and saline eye wash to affected individuals. Monitor all evacuated personnel 
                    for symptoms. Keep ambulance on standby.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Continuous Monitoring & Communication (Priority: MEDIUM)</div>
                  <div className="text-sm text-gray-700">
                    Maintain real-time sensor monitoring. Update incident command every 2 minutes. Activate emergency 
                    notification system for building occupants. Coordinate with local authorities and update emergency 
                    contacts. Document all actions for post-incident analysis.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Response Status */}
        <div className="bg-white rounded-lg border-2 border-gray-300 p-5">
          <h3 className="font-bold text-gray-900 mb-4">Automated Emergency Response Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Emergency Alarm Activated</span>
              </div>
              <span className="text-xs font-semibold text-green-600">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">HVAC System Shut Down</span>
              </div>
              <span className="text-xs font-semibold text-green-600">COMPLETED</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Hazmat Team Notified</span>
              </div>
              <span className="text-xs font-semibold text-green-600">EN ROUTE</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <span className="text-sm text-gray-700">Zone Isolation in Progress</span>
              </div>
              <span className="text-xs font-semibold text-blue-600">IN PROGRESS</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <span className="text-sm text-gray-700">Medical Team Deployment</span>
              </div>
              <span className="text-xs font-semibold text-blue-600">IN PROGRESS</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special rendering for warning/incident type
  if (sensor.type === 'warning' && sensor.subType === 'AI') {
    return (
      <div className="space-y-4">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Warning Header */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-orange-300 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-500">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{sensor.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">ID: {sensor.id}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">{sensor.lastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-600">
            <div className="w-2 h-2 rounded-full bg-orange-200 animate-pulse" />
            <span className="text-sm font-bold text-white uppercase">Active Incident</span>
          </div>
        </div>

        {/* Incident Summary */}
        <div className="bg-white rounded-lg border-2 border-orange-300 p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Incident Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Alert Level</span>
              <span className="text-sm font-bold text-orange-600">ELEVATED</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Detection Time</span>
              <span className="text-sm font-bold text-gray-900">{sensor.lastUpdate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Affected Areas</span>
              <span className="text-sm font-bold text-gray-900">Zone B, Zone C</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Personnel at Risk</span>
              <span className="text-sm font-bold text-orange-600">12 personnel</span>
            </div>
          </div>
        </div>

        {/* AI Analysis & Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">AI Analysis & Assessment</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Pattern Recognition</div>
                  <div className="text-sm text-gray-700">
                    Multiple environmental sensors in Zone B showing coordinated anomalies. CO₂ levels elevated by 15%, 
                    humidity increased by 8%, and airflow reduced by 12% over the past 45 minutes. Pattern matches known 
                    HVAC malfunction scenarios.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Situation Trajectory</div>
                  <div className="text-sm text-gray-700">
                    AI models predict gradual worsening over next 2-3 hours if unaddressed. Probability of escalation 
                    to critical levels: 35%. Estimated time to critical threshold: 2.5 hours.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Risk Assessment</div>
                  <div className="text-sm text-gray-700">
                    Current risk level: <span className="font-bold text-orange-600">MODERATE</span>. 
                    No immediate health hazard detected. Continued monitoring required. Personnel in affected 
                    areas should be notified of potential air quality degradation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-bold text-gray-900">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Immediate Action (Priority: HIGH)</div>
                  <div className="text-sm text-gray-700">
                    Dispatch maintenance team to inspect HVAC system in Zone B. Check for blocked air intakes, 
                    filter saturation, or mechanical failures. Estimated resolution time: 30-45 minutes.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Personnel Management (Priority: MEDIUM)</div>
                  <div className="text-sm text-gray-700">
                    Issue advisory notification to personnel in Zones B and C. Recommend relocating non-essential 
                    personnel to unaffected areas until air quality normalizes.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Monitoring Protocol (Priority: MEDIUM)</div>
                  <div className="text-sm text-gray-700">
                    Increase sensor polling frequency to 30-second intervals. Activate automatic alert escalation 
                    if CO₂ exceeds 1000 ppm or humidity rises above 70%.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Preventive Measures (Priority: LOW)</div>
                  <div className="text-sm text-gray-700">
                    Schedule comprehensive HVAC system audit for all zones within next 48 hours. Review maintenance 
                    logs to identify potential systemic issues.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Response Status */}
        <div className="bg-white rounded-lg border-2 border-gray-300 p-5">
          <h3 className="font-bold text-gray-900 mb-4">Automated Response Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Maintenance Team Notified</span>
              </div>
              <span className="text-xs font-semibold text-green-600">COMPLETED</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Enhanced Monitoring Activated</span>
              </div>
              <span className="text-xs font-semibold text-green-600">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <span className="text-sm text-gray-700">Personnel Advisory Being Prepared</span>
              </div>
              <span className="text-xs font-semibold text-blue-600">IN PROGRESS</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                <span className="text-sm text-gray-500">Emergency Protocol Activation</span>
              </div>
              <span className="text-xs font-semibold text-gray-500">STANDBY</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Close Button */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title="Close"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Sensor Detail Header */}
      <div className="bg-white rounded-lg border-2 border-gray-300 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            sensor.status === 'operational' ? 'bg-green-100' :
            sensor.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            {sensor.type === 'air-quality' && <Wind className={`w-6 h-6 ${
              sensor.status === 'operational' ? 'text-green-600' :
              sensor.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
            }`} />}
            {sensor.type === 'chemical' && <Shield className={`w-6 h-6 ${
              sensor.status === 'operational' ? 'text-green-600' :
              sensor.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
            }`} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{sensor.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">ID: {sensor.id}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">Updated {sensor.lastUpdate || 'just now'}</span>
            </div>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
          sensor.status === 'operational' ? 'bg-green-600' :
          sensor.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            sensor.status === 'operational' ? 'bg-green-200' :
            sensor.status === 'warning' ? 'bg-yellow-200' : 'bg-red-200'
          } animate-pulse`} />
          <span className="text-sm font-bold text-white uppercase">{sensor.status}</span>
        </div>
      </div>

      {/* Current Reading */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Current Reading</h3>
        <div className="text-center py-8">
          <div className={`text-5xl font-bold mb-2 ${
            sensor.status === 'operational' ? 'text-gray-900' :
            sensor.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
          }`}>{sensor.value}</div>
          <div className="text-sm text-gray-600">
            {sensor.subType === 'CO2' && 'Carbon Dioxide'}
            {sensor.subType === 'O2' && 'Oxygen Level'}
            {sensor.subType === 'CO' && 'Carbon Monoxide'}
            {sensor.subType === 'DP' && 'Dew Point'}
            {sensor.subType === 'R' && 'Radiation Level'}
            {sensor.subType === 'B' && 'Biological Agents'}
            {sensor.subType === 'C' && 'Chemical Agents'}
          </div>
        </div>
        
        {/* Thresholds */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs font-semibold text-gray-600 mb-2 uppercase">Safe Range</div>
          <div className="space-y-2">
            {sensor.subType === 'CO2' && (
              <div className="text-sm text-gray-700">Normal: &lt; 800 ppm • Warning: 800-1200 ppm • Critical: &gt; 1200 ppm</div>
            )}
            {sensor.subType === 'O2' && (
              <div className="text-sm text-gray-700">Normal: 19.5-23.5% • Warning: 19.0-19.5% • Critical: &lt; 19.0%</div>
            )}
            {sensor.subType === 'CO' && (
              <div className="text-sm text-gray-700">Normal: &lt; 9 ppm • Warning: 9-35 ppm • Critical: &gt; 35 ppm</div>
            )}
            {(sensor.subType === 'R' || sensor.subType === 'B' || sensor.subType === 'C') && (
              <div className="text-sm text-gray-700">Normal: No detection • Critical: Any detection</div>
            )}
          </div>
        </div>
      </div>

      {/* Historical Data Chart */}
      {sensor.subType !== 'R' && sensor.subType !== 'B' && sensor.subType !== 'C' && (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-4">Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={historyGenerator(sensor)}>
              <defs>
                <linearGradient id="sensorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
                tick={(props: any) => {
                  const { x, y, payload } = props;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text x={0} y={0} dy={8} textAnchor="middle" fill="#9ca3af" fontSize="12">
                        {payload.value}
                      </text>
                      <text x={0} y={0} dy={22} textAnchor="middle" fill="#6b7280" fontSize="10">
                        {props.payload?.timeActual || ''}
                      </text>
                    </g>
                  );
                }}
                height={50}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              {/* Actual readings (solid line) */}
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#sensorGradient)"
                name="Actual"
              />
              {/* Predicted readings (dashed line) */}
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#predictionGradient)"
                name="Predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-blue-500"></div>
              <span className="text-gray-600">Last 6 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-purple-500 border-dashed" style={{ borderTop: '2px dashed #8b5cf6', height: '0' }}></div>
              <span className="text-gray-600">AI Forecast (Next 6h)</span>
            </div>
          </div>
        </div>
      )}

      {/* Sensor Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Sensor Information</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Sensor Type</span>
            <span className="text-sm font-bold text-gray-900 capitalize">{sensor.type.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Sensor Model</span>
            <span className="text-sm font-bold text-gray-900">
              {sensor.subType === 'CO2' && 'Vaisala GMP252'}
              {sensor.subType === 'O2' && 'Honeywell O2-Sensor'}
              {sensor.subType === 'CO' && 'City Tech 3-Series'}
              {sensor.subType === 'DP' && 'Vaisala DPT-140'}
              {sensor.subType === 'R' && 'Thermo RadEye PRD'}
              {sensor.subType === 'B' && 'Smiths BioThreat-X'}
              {sensor.subType === 'C' && 'Dräger CMS'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Calibration Date</span>
            <span className="text-sm font-bold text-gray-900">
              {new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Next Maintenance</span>
            <span className="text-sm font-bold text-gray-900">
              {new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Accuracy</span>
            <span className="text-sm font-bold text-green-600">±2%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Response Time</span>
            <span className="text-sm font-bold text-gray-900">
              {sensor.type === 'chemical' ? '< 30s' : '< 15s'}
            </span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-gray-900">AI Analysis</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              {sensor.status === 'operational' 
                ? `Sensor readings have been stable and within normal parameters for the past 24 hours.`
                : sensor.status === 'warning'
                ? `Elevated readings detected. Consider increasing ventilation in the affected area.`
                : `CRITICAL: Immediate action required. Activate emergency protocols.`}
            </div>
          </div>
          {sensor.subType !== 'R' && sensor.subType !== 'B' && sensor.subType !== 'C' && (
            <div className="flex items-start gap-3">
              <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                Predicted trend: {sensor.status === 'critical' ? 'Elevated levels persisting' : Math.random() > 0.5 ? 'Stable' : 'Slight increase expected'} over next 6 hours
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              {sensor.status === 'critical' 
                ? 'Emergency protocols activated. Monitoring continuously.'
                : `No maintenance required. Next scheduled check in ${Math.floor(Math.random() * 30 + 1)} days.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}