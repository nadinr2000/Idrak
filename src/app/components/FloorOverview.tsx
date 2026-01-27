import { Building2, Thermometer, Activity, Shield, AlertTriangle, CheckCircle, Brain, TrendingUp, Zap, Users, ShieldCheck, Wind, Droplets, Battery, Fuel, Clock, Sparkles } from 'lucide-react';

interface FloorOverviewProps {
  floorId: string;
  emergencyMode?: boolean;
}

export function FloorOverview({ floorId, emergencyMode }: FloorOverviewProps) {
  const isFloor2 = floorId === 'floor-a-2';
  const floorName = isFloor2 ? 'Operations Level' : 'Entry Level';
  
  // Floor statistics
  const stats = isFloor2 ? {
    totalRooms: 19,
    operational: emergencyMode ? 15 : 17,
    warning: emergencyMode ? 2 : 2,
    critical: emergencyMode ? 2 : 0,
    totalSensors: 42,
    activeSensors: 42,
    avgTemp: emergencyMode ? 23 : 21,
    occupancy: emergencyMode ? 12 : 28,
  } : {
    totalRooms: 18,
    operational: 17,
    warning: 1,
    critical: 0,
    totalSensors: 36,
    activeSensors: 36,
    avgTemp: 21,
    occupancy: 15,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Building Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Bunker Alpha-7</h1>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${
            emergencyMode 
              ? 'bg-red-600 text-white animate-pulse' 
              : 'bg-green-100 text-green-800'
          }`}>
            {emergencyMode ? (
              <>
                <AlertTriangle className="size-3.5" />
                Under Attack
              </>
            ) : (
              <>
                <ShieldCheck className="size-3.5" />
                Operational
              </>
            )}
          </span>
        </div>
        <p className="text-sm text-gray-600">Mountain Range Sector, Grid Reference: 42°N 71°W</p>
      </div>

      {/* Emergency Sections - Only shown in emergency mode */}
      {emergencyMode && (
        <>
          {/* AI Assessment Section */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-300 p-4 mb-4">
            <div className="flex items-start gap-2 mb-3">
              <Brain className="size-5 text-red-700 mt-0.5" />
              <h3 className="text-base font-bold text-red-900">AI ASSESSMENT</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-700">Agent Type:</span>
                <span className="text-sm font-bold text-gray-900">Chlorine Gas (Cl₂)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-700">Concentration:</span>
                <span className="text-sm font-bold text-red-700">15.7 ppm (IDLH exceeded)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-700">Source Location:</span>
                <span className="text-sm font-bold text-gray-900">Sector B - Lab (F2-R6)</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-700">Leak Source:</span>
                <span className="text-sm font-bold text-red-700">Storage cylinder valve failure</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-red-200">
              <p className="text-xs font-bold text-red-900 mb-2">SPREADING ANALYSIS</p>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-700">Current Spread:</span>
                  <span className="text-sm font-bold text-red-700">2 rooms (Sector B only)</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-700">Contamination Vector:</span>
                  <span className="text-sm font-bold text-gray-900">HVAC system (active)</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-700">Predicted Spread:</span>
                  <span className="text-sm font-bold text-orange-700">—</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-700">Containment Status:</span>
                  <span className="text-sm font-bold text-red-700">Not Contained</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-red-200">
              <p className="text-xs font-bold text-red-900 mb-2">PERSONNEL IMPACT</p>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-700">At Risk:</span>
                  <span className="text-sm font-bold text-red-700">12 personnel</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-700">In Contaminated Zone:</span>
                  <span className="text-sm font-bold text-red-700">5 personnel (Sector B)</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-700">Adjacent Areas:</span>
                  <span className="text-sm font-bold text-orange-700">7 personnel</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-700">Survival Rate (with evac):</span>
                  <span className="text-sm font-bold text-green-700">98%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommended Actions Section */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-300 p-4 mb-4">
            <div className="flex items-start gap-2 mb-3">
              <Sparkles className="size-5 text-purple-700 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-purple-900">AI RECOMMENDED ACTIONS</h3>
                <p className="text-xs text-purple-700">Based on analysis of 47 historical chemical incidents</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Action 1 */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg border-2 border-red-300 p-3">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-red-600 text-white rounded-full size-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-red-900">IMMEDIATE EVACUATION</h4>
                    <p className="text-xs text-red-800 mt-1">Evacuate all 12 personnel from Floor 2 to Floor 1 assembly point. Deploy emergency lighting and audio guidance system.</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-red-700">ETA: 2-3 minutes</span>
                      <span className="text-xs font-bold text-green-700">Success: 94%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action 2 */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-2 border-orange-300 p-3">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-orange-600 text-white rounded-full size-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-orange-900">SEAL HVAC SYSTEM</h4>
                    <p className="text-xs text-orange-800 mt-1">Close all dampers to Floor 2. Shutdown air handlers. Activate pressure barriers to prevent contamination spread.</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-orange-700">ETA: 45 seconds</span>
                      <span className="text-xs font-bold text-green-700">Success: 91%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action 3 */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-300 p-3">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-yellow-600 text-white rounded-full size-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-yellow-900">DEPLOY CBRN TEAM</h4>
                    <p className="text-xs text-yellow-800 mt-1">Dispatch hazmat response team with Level A PPE, chlorine neutralization agents, and air monitoring equipment.</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-yellow-700">ETA: 2 minutes</span>
                      <span className="text-xs font-bold text-green-700">Success: 89%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Execute All Button */}
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
                <Zap className="size-5" />
                EXECUTE ALL ACTIONS
              </button>
              <p className="text-center text-xs text-purple-700">AI Confidence: <span className="font-bold">97%</span></p>
            </div>
          </div>

          {/* Threat Timeline Section */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4">
            <h3 className="text-base font-bold text-gray-900 mb-4">THREAT TIMELINE</h3>
            
            <div className="space-y-4">
              {/* Timeline Entry 1 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="bg-red-600 rounded-full size-3 mt-1"></div>
                  <div className="w-0.5 bg-gray-300 flex-1 mt-1"></div>
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">14:33:12</span>
                    <span className="text-xs text-gray-500">(1m 50s ago)</span>
                  </div>
                  <h4 className="text-sm font-bold text-red-900 mb-1">Chemical Agent Detected</h4>
                  <p className="text-xs text-gray-700">Chlorine gas sensor triggered in Sector B - Lab. Concentration: 15.7 ppm (IDLH exceeded). Automatic alert sent to command center.</p>
                </div>
              </div>

              {/* Timeline Entry 2 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="bg-orange-600 rounded-full size-3 mt-1"></div>
                  <div className="w-0.5 bg-gray-300 flex-1 mt-1"></div>
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">14:33:45</span>
                    <span className="text-xs text-gray-500">(1m 17s ago)</span>
                  </div>
                  <h4 className="text-sm font-bold text-orange-900 mb-1">Contamination Spreading</h4>
                  <p className="text-xs text-gray-700">Trace levels detected in Sector B - Equipment room. HVAC system identified as contamination vector.</p>
                </div>
              </div>

              {/* Timeline Entry 3 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="bg-purple-600 rounded-full size-3 mt-1"></div>
                  <div className="w-0.5 bg-gray-300 flex-1 mt-1"></div>
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">14:34:02</span>
                    <span className="text-xs text-gray-500">(1m ago)</span>
                  </div>
                  <h4 className="text-sm font-bold text-purple-900 mb-1">AI Analysis Completed</h4>
                  <p className="text-xs text-gray-700">AI system analyzed threat parameters against 47 historical incidents. Leak source identified as storage cylinder valve failure. Response recommendations generated.</p>
                </div>
              </div>

              {/* Timeline Entry 4 - Current */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="bg-red-600 rounded-full size-3 mt-1 animate-pulse shadow-lg shadow-red-600/50"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">14:34:18</span>
                    <span className="text-xs text-gray-500">(now)</span>
                  </div>
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="size-4 text-red-600" />
                      <h4 className="text-sm font-bold text-red-900">ACTIVE THREAT - AWAITING RESPONSE</h4>
                    </div>
                    <p className="text-xs text-red-800">Situation critical. 12 personnel at risk. Immediate action required to prevent casualties and full floor contamination.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500 uppercase mb-1">Rooms</p>
          <p className="text-xl font-bold text-gray-900">{stats.totalRooms}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            <span className="text-xs text-green-600 font-semibold">{stats.operational} OK</span>
            {stats.warning > 0 && <span className="text-xs text-yellow-600 font-semibold">{stats.warning} WARN</span>}
            {stats.critical > 0 && <span className="text-xs text-red-600 font-semibold">{stats.critical} CRIT</span>}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500 uppercase mb-1">Sensors</p>
          <p className="text-xl font-bold text-blue-600">{stats.activeSensors}/{stats.totalSensors}</p>
          <p className="text-xs text-gray-600 mt-1">All Active</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500 uppercase mb-1">Temperature</p>
          <p className={`text-xl font-bold ${
            stats.avgTemp > 24 ? 'text-orange-600' : 'text-green-600'
          }`}>{stats.avgTemp}°C</p>
          <p className="text-xs text-gray-600 mt-1">Average</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-500 uppercase mb-1">Occupancy</p>
          <p className="text-xl font-bold text-gray-900">{stats.occupancy}</p>
          <p className="text-xs text-gray-600 mt-1">Personnel</p>
        </div>
      </div>

      {/* CBRNE Threat Status */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">CBRNE Threat Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Chemical</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              emergencyMode ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {emergencyMode ? 'DETECTED' : 'CLEAR'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Biological</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              emergencyMode ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
            }`}>
              {emergencyMode ? 'MONITOR' : 'CLEAR'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Radiation</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              emergencyMode ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
            }`}>
              {emergencyMode ? '0.18 μSv/h' : 'CLEAR'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Nuclear</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              emergencyMode ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {emergencyMode ? 'ALERT' : 'CLEAR'}
            </span>
          </div>
        </div>
      </div>

      {/* Environmental Health */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Environmental Health</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">O₂ Level</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-orange-600' : 'text-green-600'}`}>
              {emergencyMode ? '18.2' : '20.9'}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">CO₂ Level</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-red-600' : 'text-green-600'}`}>
              {emergencyMode ? '1,850' : '420'} ppm
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">PM 2.5</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-orange-600' : 'text-green-600'}`}>
              {emergencyMode ? '68' : '12'} μg/m³
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">VOC</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-red-600' : 'text-green-600'}`}>
              {emergencyMode ? '850' : '220'} ppb
            </span>
          </div>
        </div>
      </div>

      {/* Air Filtration Systems */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Air Filtration Systems</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">HEPA Filters</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-yellow-600' : 'text-green-600'}`}>
              {emergencyMode ? '94' : '99'}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Carbon Filters</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-orange-600' : 'text-green-600'}`}>
              {emergencyMode ? '87' : '97'}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">NBC Filters</span>
            <span className={`text-sm font-bold ${emergencyMode ? 'text-red-600' : 'text-blue-600'}`}>
              {emergencyMode ? 'ACTIVE' : 'STANDBY'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Air Exchange</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-orange-600' : 'text-green-600'}`}>
              {emergencyMode ? '2.4' : '6.2'} ACH
            </span>
          </div>
        </div>
      </div>

      {/* Power Systems */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Power Systems</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Primary Grid</span>
            <div className="text-right">
              <span className="text-sm font-bold text-green-600 block">ONLINE</span>
              <span className="text-xs text-gray-500">{emergencyMode ? '780' : '450'} kW</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Backup Generator</span>
            <div className="text-right">
              <span className={`text-sm font-bold block ${emergencyMode ? 'text-green-600' : 'text-blue-600'}`}>
                {emergencyMode ? 'ACTIVE' : 'STANDBY'}
              </span>
              <span className="text-xs text-gray-500">{emergencyMode ? '320 kW' : '100%'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Battery UPS</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-yellow-600' : 'text-green-600'}`}>
              {emergencyMode ? '68' : '98'}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Fuel Reserve</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-yellow-600' : 'text-green-600'}`}>
              {emergencyMode ? '82' : '95'}%
            </span>
          </div>
        </div>
      </div>

      {/* Life Support Systems */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Life Support Systems</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Water Reserve</span>
            <div className="text-right">
              <span className={`text-base font-bold block ${emergencyMode ? 'text-yellow-600' : 'text-green-600'}`}>
                {emergencyMode ? '12,400' : '15,800'} L
              </span>
              <span className="text-xs text-gray-500">{emergencyMode ? '42 Days' : '56 Days'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Food Supply</span>
            <div className="text-right">
              <span className={`text-base font-bold block ${emergencyMode ? 'text-yellow-600' : 'text-green-600'}`}>
                {emergencyMode ? '38' : '60'} Days
              </span>
              <span className="text-xs text-gray-500">{emergencyMode ? 'Rationed' : 'Full'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Water Quality</span>
            <span className="text-base font-bold text-green-600">
              {emergencyMode ? '99.4' : '99.8'}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Medical Supplies</span>
            <span className={`text-base font-bold ${emergencyMode ? 'text-orange-600' : 'text-green-600'}`}>
              {emergencyMode ? '72' : '94'}%
            </span>
          </div>
        </div>
      </div>

      {/* AI Floor Assessment */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200 p-5 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Brain className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-purple-900">AI Floor Assessment</h3>
            <p className="text-xs text-purple-700">Real-time environmental & operational analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <p className="text-xs font-semibold text-purple-700 uppercase mb-1">Health Score</p>
            <div className="flex items-baseline gap-1">
              <p className={`text-2xl font-bold ${
                emergencyMode ? 'text-red-600' : stats.warning > 0 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {emergencyMode ? '42' : stats.warning > 0 ? '94' : '98'}
              </p>
              <span className="text-xs text-gray-600">/100</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <p className="text-xs font-semibold text-purple-700 uppercase mb-1">Air Quality</p>
            <div className="flex items-baseline gap-1">
              <p className={`text-2xl font-bold ${
                emergencyMode ? 'text-red-600' : 'text-green-600'
              }`}>
                {emergencyMode ? '32' : '96'}
              </p>
              <span className="text-xs text-gray-600">%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <p className="text-xs font-semibold text-purple-700 uppercase mb-1">Safety Index</p>
            <div className="flex items-baseline gap-1">
              <p className={`text-2xl font-bold ${
                emergencyMode ? 'text-red-600' : 'text-green-600'
              }`}>
                {emergencyMode ? '28' : '99'}
              </p>
              <span className="text-xs text-gray-600">%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-purple-200">
          <p className="text-xs font-bold text-gray-900 mb-2">AI Insights</p>
          <ul className="space-y-1.5">
            {emergencyMode ? (
              <>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <AlertTriangle className="size-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>CRITICAL: Chemical contamination detected in Sector B - Lab (Room F2-R6)</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <AlertTriangle className="size-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Emergency containment protocols activated - ventilation systems isolated</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <AlertTriangle className="size-3.5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Adjacent areas showing elevated readings - monitoring for spread</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <Activity className="size-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>12 personnel evacuated to safe zones - decontamination teams deployed</span>
                </li>
              </>
            ) : stats.warning > 0 ? (
              <>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <AlertTriangle className="size-3.5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>Utility Room showing elevated temperature (26°C) - HVAC adjustment recommended</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="size-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>All critical systems operational - no immediate threats detected</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <TrendingUp className="size-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Air quality stable across all zones - all sensors reporting nominal values</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <Activity className="size-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Recommended: Schedule preventive maintenance for Utility Room cooling system</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="size-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>All rooms operational - no alerts or anomalies detected</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="size-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Environmental conditions optimal across all monitored areas</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="size-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>All CBRN sensors reporting normal background levels</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-700">
                  <TrendingUp className="size-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>System performance at 99.8% efficiency - all predictive models nominal</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}