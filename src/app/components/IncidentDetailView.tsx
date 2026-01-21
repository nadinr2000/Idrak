import { AlertCircle, Clock, MapPin, Activity, Brain, CheckCircle2, XCircle, Zap, ArrowRight, History, ArrowLeft } from 'lucide-react';
import { incidents } from '../data/mockData';
import { useState } from 'react';
import { ConflictingRulesSection } from './ConflictingRulesSection';
import { AIConflictResolution } from './AIConflictResolution';

interface IncidentDetailViewProps {
  incidentId: string;
  onSensorClick?: (sensorId: string) => void;
  onBack?: () => void;
}

function generateTimeline(incident: any) {
  const baseTime = incident.timestamp.getTime();
  
  // For inc-001: Temperature Spike with matched rule
  if (incident.id === 'inc-001') {
    return [
      { 
        time: new Date(baseTime).toLocaleTimeString(), 
        event: 'Temperature threshold exceeded (26°C) detected by sensor TEMP-301-A', 
        type: 'detection' 
      },
      { 
        time: new Date(baseTime + 2000).toLocaleTimeString(), 
        event: 'Automation rule matched: "Temperature Control"', 
        type: 'ai' 
      },
      { 
        time: new Date(baseTime + 5000).toLocaleTimeString(), 
        event: 'Automated action: AC Power Increased by 20%', 
        type: 'action' 
      },
      { 
        time: new Date(baseTime + 8000).toLocaleTimeString(), 
        event: 'Temperature Monitoring System Activated', 
        type: 'action' 
      },
      { 
        time: new Date(baseTime + 12 * 60000).toLocaleTimeString(), 
        event: 'Temperature normalized to 23°C', 
        type: 'status' 
      },
      { 
        time: new Date(baseTime + 15 * 60000).toLocaleTimeString(), 
        event: 'Incident marked as resolved', 
        type: 'status' 
      },
    ];
  }
  
  // For inc-002: Water Leak with matched rule
  if (incident.id === 'inc-002') {
    return [
      { 
        time: new Date(baseTime).toLocaleTimeString(), 
        event: 'Water flow anomaly detected (13.5 L/min) by sensor WATER-101-B', 
        type: 'detection' 
      },
      { 
        time: new Date(baseTime + 1500).toLocaleTimeString(), 
        event: 'Automation rule matched: "Water Leak Emergency Response"', 
        type: 'ai' 
      },
      { 
        time: new Date(baseTime + 3000).toLocaleTimeString(), 
        event: 'Automated action: Water supply shut off to affected zone', 
        type: 'action' 
      },
      { 
        time: new Date(baseTime + 5000).toLocaleTimeString(), 
        event: 'Maintenance team automatically notified', 
        type: 'notification' 
      },
      { 
        time: new Date(baseTime + 8 * 60000).toLocaleTimeString(), 
        event: 'Maintenance team arrived on site', 
        type: 'status' 
      },
      { 
        time: new Date(baseTime + 15 * 60000).toLocaleTimeString(), 
        event: 'Leak source identified and repair in progress', 
        type: 'status' 
      },
    ];
  }
  
  // For inc-003: Chemical Agent Detection (active tactical case)
  if (incident.id === 'inc-003') {
    return [
      { 
        time: new Date(baseTime).toLocaleTimeString(), 
        event: 'Chemical agent signature detected by sensor CHEM-201-C', 
        type: 'detection' 
      },
      { 
        time: new Date(baseTime + 3000).toLocaleTimeString(), 
        event: 'AI analysis: Chemical threat confirmed (98.5% confidence)', 
        type: 'ai' 
      },
      { 
        time: new Date(baseTime + 5000).toLocaleTimeString(), 
        event: 'Emergency protocols activated: Floor 2 - Sector B isolation initiated', 
        type: 'action' 
      },
      { 
        time: new Date(baseTime + 8000).toLocaleTimeString(), 
        event: 'HVAC system adjusted to negative pressure mode', 
        type: 'action' 
      },
      { 
        time: new Date(baseTime + 12000).toLocaleTimeString(), 
        event: 'Emergency response team dispatched', 
        type: 'notification' 
      },
      { 
        time: new Date(baseTime + 2 * 60000).toLocaleTimeString(), 
        event: 'Containment protocols engaged - Air filtration at maximum', 
        type: 'action' 
      },
      { 
        time: new Date(baseTime + 5 * 60000).toLocaleTimeString(), 
        event: 'Current reading: 6.8 Hz - Elevated levels persist', 
        type: 'alert' 
      },
      { 
        time: new Date(baseTime + 8 * 60000).toLocaleTimeString(), 
        event: 'Hazmat team on site, decontamination procedures underway', 
        type: 'status' 
      },
    ];
  }
  
  // For inc-004: Multi-Floor HVAC with conflicting rules
  if (incident.id === 'inc-004') {
    return [
      { 
        time: new Date(baseTime).toLocaleTimeString(), 
        event: 'Multiple environmental anomalies detected across 3 floors', 
        type: 'detection' 
      },
      { 
        time: new Date(baseTime + 2000).toLocaleTimeString(), 
        event: 'Floor 2: Temperature exceeded threshold (30.1°C)', 
        type: 'detection' 
      },
      { 
        time: new Date(baseTime + 3000).toLocaleTimeString(), 
        event: 'Floor 3: Humidity levels critical (72%)', 
        type: 'detection' 
      },
      { 
        time: new Date(baseTime + 4000).toLocaleTimeString(), 
        event: 'Floor 4: Airflow critically low (0.1 m/s)', 
        type: 'detection' 
      },
      { 
        time: new Date(baseTime + 6000).toLocaleTimeString(), 
        event: '⚠️ Automation conflict: 3 rules matched with contradictory actions', 
        type: 'alert' 
      },
      { 
        time: new Date(baseTime + 8000).toLocaleTimeString(), 
        event: 'AI analysis initiated to resolve conflicting rules', 
        type: 'ai' 
      },
      { 
        time: new Date(baseTime + 12000).toLocaleTimeString(), 
        event: 'Root cause identified: Primary HVAC cooling system failure', 
        type: 'ai' 
      },
      { 
        time: new Date(baseTime + 15000).toLocaleTimeString(), 
        event: 'AI conflict resolution strategy generated', 
        type: 'ai' 
      },
      { 
        time: new Date(baseTime + 18000).toLocaleTimeString(), 
        event: 'Awaiting Facility Commander approval for recommended actions', 
        type: 'status' 
      },
    ];
  }
  
  // Default timeline for other incidents
  return [
    { 
      time: new Date(baseTime).toLocaleTimeString(), 
      event: `${incident.title} detected`, 
      type: 'detection' 
    },
    { 
      time: new Date(baseTime + 3000).toLocaleTimeString(), 
      event: 'AI analysis initiated', 
      type: 'ai' 
    },
    { 
      time: new Date(baseTime + 8000).toLocaleTimeString(), 
      event: 'Response actions in progress', 
      type: 'action' 
    },
    { 
      time: new Date(baseTime + 5 * 60000).toLocaleTimeString(), 
      event: `Current status: ${incident.status}`, 
      type: 'status' 
    },
  ];
}

const relatedIncidents = [
  { id: 'inc-007', title: 'HVAC Maintenance Due', severity: 'low', date: '2 days ago' },
  { id: 'inc-008', title: 'Temperature Fluctuation', severity: 'medium', date: '1 week ago' },
];

export function IncidentDetailView({ incidentId, onSensorClick, onBack }: IncidentDetailViewProps) {
  const incident = incidents.find(i => i.id === incidentId);

  if (!incident) return null;

  // Handle multi-sensor incidents
  const hasMultipleSensors = incident.affectedSensors && incident.affectedSensors.length > 0;
  const affectedSensors = hasMultipleSensors ? incident.affectedSensors! : [{
    id: incident.sensorId || 'UNKNOWN',
    name: incident.sensorId || 'Unknown Sensor',
    location: incident.location,
    floorId: incident.floorId || '',
    roomId: incident.roomId || '',
    reading: incident.id === 'inc-001' ? '26°C' : 
             incident.id === 'inc-002' ? '13.5 L/min' : 
             incident.id === 'inc-003' ? '5.2 Hz' : '26°C',
    currentReading: incident.status === 'active' ? 
                   (incident.id === 'inc-003' ? '6.8 Hz' : undefined) : 
                   undefined,
    normalRange: incident.id === 'inc-001' ? '18-24°C' : 
                 incident.id === 'inc-002' ? '0-5 L/min' : 
                 incident.id === 'inc-003' ? '0-2 Hz' : '18-24°C',
    deviation: incident.id === 'inc-001' ? '+2°C' : 
               incident.id === 'inc-002' ? '+8.5 L/min' : 
               incident.id === 'inc-003' ? '+3.2 Hz' : '+2°C',
    currentDeviation: incident.status === 'active' ? 
                     (incident.id === 'inc-003' ? '+4.8 Hz' : undefined) : 
                     undefined,
    type: incident.id === 'inc-001' ? 'Temperature' : 
          incident.id === 'inc-002' ? 'Water Flow' : 
          incident.id === 'inc-003' ? 'Vibration' : 'Temperature',
  }];

  // Get unique floors
  const uniqueFloors = [...new Set(affectedSensors.map(s => s.floorId))];
  const [selectedFloorView, setSelectedFloorView] = useState(uniqueFloors[0] || '');

  // Generate timeline once
  const timeline = generateTimeline(incident);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span className="font-medium">Back to Incidents</span>
        </button>
      )}

      {/* Incident Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${getSeverityStyle(incident.severity).bg}`}>
              <AlertCircle className={`size-6 ${getSeverityStyle(incident.severity).text}`} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{incident.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{Math.floor((Date.now() - incident.timestamp.getTime()) / 60000)}m ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SeverityBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Incident ID</p>
            <p className="font-mono font-semibold text-gray-900">{incident.id.toUpperCase()}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Severity</p>
            <p className="font-semibold text-gray-900 capitalize">{incident.severity}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Resolution Method</p>
            <p className="font-semibold text-gray-900">
              {incident.matchedRule ? 'Rule Match' : 'AI-Suggested'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Resolution Time</p>
            <p className={`font-semibold ${incident.status === 'resolved' ? 'text-green-600' : 'text-gray-600'}`}>
              {incident.id === 'inc-001' ? '4 min 15 sec' : 
               incident.id === 'inc-002' ? '2 min 45 sec' : 
               'Pending'}
            </p>
          </div>
        </div>
      </div>

      {/* Affected Sensor Location & Readings - Full Width */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="size-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900 text-lg">Incident Details</h3>
          </div>
          {hasMultipleSensors && (
            <div className="text-sm font-medium text-gray-700 bg-orange-100 px-3 py-1.5 rounded-full border border-orange-300">
              {affectedSensors.length} Sensors Affected • {uniqueFloors.length} {uniqueFloors.length > 1 ? 'Floors' : 'Floor'}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Floor Plan View */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            {/* Multi-Floor Selector */}
            {hasMultipleSensors && uniqueFloors.length > 1 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {uniqueFloors.map(floorId => {
                  const floorNum = floorId.split('-')[2];
                  const sensorsOnFloor = affectedSensors.filter(s => s.floorId === floorId).length;
                  return (
                    <button
                      key={floorId}
                      onClick={() => setSelectedFloorView(floorId)}
                      className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                        selectedFloorView === floorId
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Floor {floorNum} ({sensorsOnFloor})
                    </button>
                  );
                })}
              </div>
            )}
            
            <h4 className="font-medium text-gray-900 mb-4">
              {hasMultipleSensors && uniqueFloors.length > 1 
                ? `Floor Plan View - Floor ${selectedFloorView.split('-')[2]}` 
                : 'Floor Plan View'}
            </h4>
            
            <FloorPlanDiagram 
              incident={incident} 
              sensors={hasMultipleSensors ? affectedSensors.filter(s => s.floorId === selectedFloorView) : undefined}
              sensor={!hasMultipleSensors ? affectedSensors[0] : undefined}
              floorId={hasMultipleSensors ? selectedFloorView : undefined}
            />
            
            {!hasMultipleSensors && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Location:</span> {incident.location}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Sensor Readings */}
          <div className="space-y-4">
            {!hasMultipleSensors ? (
              <SensorReadingCard sensor={affectedSensors[0]} incident={incident} />
            ) : (
              <>
                <h4 className="font-medium text-gray-900">Affected Sensors ({affectedSensors.length})</h4>
                <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
                  {affectedSensors.map((sensor) => (
                    <SensorReadingCard key={sensor.id} sensor={sensor} incident={incident} compact />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* AI Analysis or Rule Match */}
        <div className="lg:col-span-2">
          {incident.matchedRule && !hasMultipleSensors ? (
            // Rule Matched Section (Single Sensor)
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="size-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Automation Rule Matched</h3>
                  <p className="text-sm text-gray-600">Resolved by pre-configured automation rule</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-2">Matched Rule</h4>
                  <p className="text-lg font-semibold text-green-700">{incident.matchedRule}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-3">Actions Taken</h4>
                  <div className="space-y-3">
                    {incident.id === 'inc-001' && (
                      // Temperature Control actions
                      <>
                        <div className="flex items-start gap-3 pb-3 border-b border-green-100 last:border-0 last:pb-0">
                          <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">AC Power Increased by 20%</p>
                            <p className="text-xs text-gray-600 mt-1">Executed at {new Date(incident.timestamp.getTime() + 5000).toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 pb-3 border-b border-green-100 last:border-0 last:pb-0">
                          <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Temperature Monitoring Activated</p>
                            <p className="text-xs text-gray-600 mt-1">Executed at {new Date(incident.timestamp.getTime() + 8000).toLocaleTimeString()}</p>
                          </div>
                        </div>
                      </>
                    )}
                    {incident.id === 'inc-002' && (
                      // Water Leak actions
                      <>
                        <div className="flex items-start gap-3 pb-3 border-b border-green-100 last:border-0 last:pb-0">
                          <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Water Supply Shut Off</p>
                            <p className="text-xs text-gray-600 mt-1">Executed at {new Date(incident.timestamp.getTime() + 3000).toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 pb-3 border-b border-green-100 last:border-0 last:pb-0">
                          <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Maintenance Team Alerted</p>
                            <p className="text-xs text-gray-600 mt-1">Executed at {new Date(incident.timestamp.getTime() + 5000).toLocaleTimeString()}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="size-5" />
                    <p className="font-medium">Automated action successfully applied</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    The system automatically detected the condition and applied the configured response without manual intervention.
                  </p>
                </div>
              </div>
            </div>
          ) : hasMultipleSensors && affectedSensors.every(s => s.matchedRule) ? (
            // Conflicting Rules Section (Multi-Sensor with Rules)
            <>
              <ConflictingRulesSection affectedSensors={affectedSensors} incident={incident} />
              <AIConflictResolution incident={incident} />
            </>
          ) : (
            // AI Analysis Section
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="size-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">AI Analysis</h3>
                  <p className="text-sm text-gray-600">Powered by predictive analytics</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                  <p className="text-gray-700">{incident.aiPrediction}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="font-medium text-gray-900 mb-2">Root Cause Analysis</h4>
                  <p className="text-gray-700">
                    Pattern does not match any known automation rule. AI deep analysis indicates unusual signature requiring manual inspection and expert evaluation.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-gray-900 mb-4">Recommended Actions</h4>
                  <div className="space-y-4">
                    {/* Action 1 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="size-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</div>
                            <h5 className="font-semibold text-gray-900">Dispatch maintenance team for physical inspection</h5>
                          </div>
                          <p className="text-sm text-gray-600 ml-8">Priority: High - Immediate action recommended</p>
                          <p className="text-sm text-gray-700 ml-8 mt-2">
                            Send qualified technician to inspect ventilation fan for foreign object obstruction or bearing misalignment.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-8">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="size-4" />
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-1.5">
                          <XCircle className="size-4" />
                          Reject
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Override
                        </button>
                      </div>
                    </div>

                    {/* Action 2 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="size-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">2</div>
                            <h5 className="font-semibold text-gray-900">Reduce HVAC system load by 30%</h5>
                          </div>
                          <p className="text-sm text-gray-600 ml-8">Priority: Medium - Preventive measure</p>
                          <p className="text-sm text-gray-700 ml-8 mt-2">
                            Temporarily reduce ventilation fan speed to minimize further damage until inspection is completed.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-8">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="size-4" />
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-1.5">
                          <XCircle className="size-4" />
                          Reject
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Override
                        </button>
                      </div>
                    </div>

                    {/* Action 3 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="size-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">3</div>
                            <h5 className="font-semibold text-gray-900">Activate backup ventilation in adjacent zones</h5>
                          </div>
                          <p className="text-sm text-gray-600 ml-8">Priority: Medium - System continuity</p>
                          <p className="text-sm text-gray-700 ml-8 mt-2">
                            Ensure continuous air circulation by activating backup systems in neighboring mechanical rooms.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-8">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="size-4" />
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-1.5">
                          <XCircle className="size-4" />
                          Reject
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Override
                        </button>
                      </div>
                    </div>

                    {/* Action 4 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="size-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">4</div>
                            <h5 className="font-semibold text-gray-900">Document findings for automation rule creation</h5>
                          </div>
                          <p className="text-sm text-gray-600 ml-8">Priority: Low - Future optimization</p>
                          <p className="text-sm text-gray-700 ml-8 mt-2">
                            Create new automation rule based on this vibration pattern for faster response in future incidents.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-8">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="size-4" />
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-1.5">
                          <XCircle className="size-4" />
                          Reject
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Override
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bulk Actions Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-blue-100 rounded">
                      <AlertCircle className="size-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-900 mb-1">Action Required</p>
                      <p className="text-sm text-blue-800">
                        Please review each recommended action above. You can approve, reject, or override individual actions based on your operational assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="size-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Incident Timeline</h3>
          </div>
          <div className="space-y-4">
            {timeline.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`size-3 rounded-full ${getTimelineColor(event.type)}`} />
                  {index < timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1" />}
                </div>
                <div className="pb-4 flex-1">
                  <p className="text-xs text-gray-500 mb-1">{event.time}</p>
                  <p className="text-sm text-gray-900">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getSeverityStyle(severity: string) {
  const styles = {
    critical: { bg: 'bg-red-100', text: 'text-red-600' },
    high: { bg: 'bg-orange-100', text: 'text-orange-600' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    low: { bg: 'bg-blue-100', text: 'text-blue-600' },
  };
  return styles[severity] || styles.low;
}

function getTimelineColor(type: string) {
  const colors = {
    detection: 'bg-blue-500',
    ai: 'bg-purple-500',
    action: 'bg-green-500',
    notification: 'bg-yellow-500',
    alert: 'bg-red-500',
    status: 'bg-gray-500',
  };
  return colors[type] || colors.status;
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[severity]}`}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: 'bg-red-100 text-red-800',
    resolving: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

function SensorStatusBadge({ status }: { status: string }) {
  const styles = {
    critical: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    degraded: 'bg-orange-100 text-orange-800',
    operational: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

function getSensorReading(incident: any) {
  // Example logic to determine sensor reading based on incident details
  if (incident.severity === 'critical') {
    return '28.5°C';
  } else if (incident.severity === 'high') {
    return '26.2°C';
  } else {
    return '24.0°C';
  }
}

function FloorPlanDiagram({ incident, sensor, sensors, floorId }: { incident: any, sensor?: any, sensors?: any[], floorId?: string }) {
  const isMultiSensor = sensors && sensors.length > 0;
  
  // Helper function to check if a room location matches any sensor
  const hasIncidentInRoom = (roomKeywords: string[]) => {
    if (isMultiSensor && sensors) {
      return sensors.some(s => 
        roomKeywords.some(keyword => s.location.toLowerCase().includes(keyword.toLowerCase()))
      );
    }
    return roomKeywords.some(keyword => incident.location.toLowerCase().includes(keyword.toLowerCase()));
  };

  // Helper function to get sensor ID for a specific room
  const getSensorIdForRoom = (roomKeywords: string[]) => {
    if (isMultiSensor && sensors) {
      const matchedSensor = sensors.find(s => 
        roomKeywords.some(keyword => s.location.toLowerCase().includes(keyword.toLowerCase()))
      );
      return matchedSensor?.id || '';
    }
    return sensor?.id || '';
  };

  // Determine floor number for display
  const floorNumber = incident.location.includes('Floor 2') ? 'FLOOR 2' : 
                     incident.location.includes('Floor 3') ? 'FLOOR 3' : 
                     incident.location.includes('Floor 4') ? 'FLOOR 4' : 
                     incident.location.includes('Floor 5') ? 'FLOOR 5' : 'FLOOR 1';

  return (
    <div className="relative bg-[#1a2332] rounded-lg border-2 border-gray-400 p-6 aspect-[4/3]">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>
      
      {/* Floor Plan Layout - Architectural Style */}
      <div className="relative h-full">
        {/* Main Corridor - Horizontal */}
        <div className="absolute left-[10%] right-[10%] top-[45%] h-[10%] bg-[#2a3342] border-t-2 border-b-2 border-blue-400/40"></div>
        
        {/* Room 1 - Top Left - Server Room */}
        <div className={`absolute left-[10%] top-[10%] w-[23%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['Server Room', 'Server'])
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">SERVER-A</div>
          {hasIncidentInRoom(['Server Room', 'Server']) && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['Server Room', 'Server'])}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute bottom-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Room 2 - Top Center - Control Room / Office */}
        <div className={`absolute left-[37%] top-[10%] w-[26%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['Control Room', 'Office']) && !hasIncidentInRoom(['Server Room'])
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">OFFICE</div>
          {hasIncidentInRoom(['Office']) && !hasIncidentInRoom(['Server Room', 'Conference']) && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['Office'])}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute bottom-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Room 3 - Top Right - Storage */}
        <div className={`absolute right-[10%] top-[10%] w-[23%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['Storage']) 
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">STORAGE</div>
          {hasIncidentInRoom(['Storage']) && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['Storage'])}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute bottom-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Room 4 - Middle Left - Equipment/Electric */}
        <div className={`absolute left-[10%] bottom-[45%] w-[23%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['Equipment Room', 'Electric']) 
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">ELECTRIC</div>
          {hasIncidentInRoom(['Equipment Room', 'Electric']) && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['Equipment Room', 'Electric'])}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute top-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Room 5 - Center - Conference */}
        <div className={`absolute left-[37%] bottom-[45%] w-[26%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['Conference']) 
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">CONF</div>
          {hasIncidentInRoom(['Conference']) && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['Conference'])}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute top-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Room 6 - Middle Right - Data Center */}
        <div className={`absolute right-[10%] bottom-[45%] w-[23%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['Data Center', 'Archive']) 
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">DATA-CTR</div>
          {hasIncidentInRoom(['Data Center', 'Archive']) && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['Data Center', 'Archive'])}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute top-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Room 7 - Bottom Left - HVAC/Mechanical */}
        <div className={`absolute left-[10%] bottom-[10%] w-[23%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['HVAC', 'Mechanical']) || incident.id === 'inc-003'
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">HVAC</div>
          {(hasIncidentInRoom(['HVAC', 'Mechanical']) || incident.id === 'inc-003') && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['HVAC', 'Mechanical']) || 'VIB-510-D'}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute top-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Room 8 - Bottom Center - Restroom/Utility (Water systems) */}
        <div className={`absolute left-[37%] bottom-[10%] w-[26%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['Restroom', 'Bathroom', 'Utility']) || incident.id === 'inc-002'
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">RESTROOM</div>
          {(hasIncidentInRoom(['Restroom', 'Bathroom', 'Utility']) || incident.id === 'inc-002') && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['Restroom', 'Bathroom', 'Utility']) || 'WATER-102-C'}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute top-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Room 9 - Bottom Right - Lab */}
        <div className={`absolute right-[10%] bottom-[10%] w-[23%] h-[30%] border-2 bg-[#2a3342] ${
          hasIncidentInRoom(['Lab']) 
            ? 'border-red-500 bg-red-900/20' 
            : 'border-blue-400/60'
        }`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-blue-300">LAB</div>
          {hasIncidentInRoom(['Lab']) && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
                {getSensorIdForRoom(['Lab'])}
              </div>
            </>
          )}
          {/* Door */}
          <div className="absolute top-0 left-[40%] w-[20%] h-1 bg-blue-400"></div>
        </div>

        {/* Compass Rose */}
        <div className="absolute top-2 right-2 flex flex-col items-center">
          <div className="text-blue-400 text-xs font-bold">N</div>
          <div className="w-px h-4 bg-blue-400"></div>
          <div className="size-1 bg-blue-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Floor label */}
      <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1.5 rounded font-mono font-semibold">
        {floorNumber}
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-[#1a2332] border-2 border-blue-400/60 rounded px-3 py-2 text-[10px] space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="size-2.5 bg-red-500 rounded-full shadow-sm shadow-red-500"></div>
          <span className="text-blue-300 font-mono">INCIDENT</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2.5 border border-blue-400/60 bg-[#2a3342]"></div>
          <span className="text-blue-300 font-mono">NORMAL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-400"></div>
          <span className="text-blue-300 font-mono">DOOR</span>
        </div>
      </div>

      {/* Drawing Title Block */}
      <div className="absolute bottom-3 left-3 text-[9px] font-mono text-blue-400/70">
        <div>IDRAK BMS</div>
        <div>DWG-{incident.id.toUpperCase()}</div>
      </div>
    </div>
  );
}

function SensorReadingCard({ sensor, incident, compact }: { sensor: any, incident: any, compact?: boolean }) {
  const isActive = incident.status === 'active';
  const hasCurrentReading = isActive && sensor.currentReading;

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-900 text-lg">{sensor.name}</p>
          <p className="text-sm text-gray-600 mt-1">{sensor.location}</p>
        </div>
        <SeverityBadge severity={incident.severity} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Triggered Reading */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Triggered Reading</p>
          <p className="text-2xl font-bold text-orange-600">
            {sensor.reading}
          </p>
          {hasCurrentReading && (
            <p className="text-[10px] text-gray-500 mt-1">
              At incident start
            </p>
          )}
        </div>
        
        {/* Current Reading (for active incidents only) */}
        {hasCurrentReading && (
          <div className="bg-white rounded-lg p-3 border border-red-200 ring-2 ring-red-100">
            <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
              Current Reading
              <span className="size-1.5 bg-red-500 rounded-full animate-pulse"></span>
            </p>
            <p className="text-2xl font-bold text-red-600">
              {sensor.currentReading}
            </p>
            <p className="text-[10px] text-red-600 mt-1 font-medium">
              Live monitoring
            </p>
          </div>
        )}
        
        {/* Normal Range (shown when no current reading or resolved) */}
        {!hasCurrentReading && (
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Normal Range</p>
            <p className="text-lg font-semibold text-gray-900">
              {sensor.normalRange}
            </p>
          </div>
        )}
        
        {/* Deviation at trigger */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Deviation{hasCurrentReading ? ' (Initial)' : ''}</p>
          <p className="text-lg font-semibold text-orange-600">
            {sensor.deviation}
          </p>
        </div>

        {/* Current Deviation (for active incidents only) */}
        {hasCurrentReading && sensor.currentDeviation && (
          <div className="bg-white rounded-lg p-3 border border-red-200 ring-2 ring-red-100">
            <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
              Current Deviation
              <span className="size-1.5 bg-red-500 rounded-full animate-pulse"></span>
            </p>
            <p className="text-lg font-semibold text-red-600">
              {sensor.currentDeviation}
            </p>
          </div>
        )}
        
        {/* Normal Range (for active incidents, shown in smaller section) */}
        {hasCurrentReading && (
          <div className="bg-white rounded-lg p-3 border border-gray-200 col-span-2">
            <p className="text-xs text-gray-600 mb-1">Normal Operating Range</p>
            <p className="text-sm font-semibold text-gray-900">
              {sensor.normalRange}
            </p>
          </div>
        )}
        
        {/* Detection Time */}
        <div className="bg-white rounded-lg p-3 border border-gray-200 col-span-2">
          <p className="text-xs text-gray-600 mb-1">Detection Time</p>
          <p className="text-sm font-semibold text-gray-900">
            {new Date(incident.timestamp).toLocaleDateString()} {new Date(incident.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}