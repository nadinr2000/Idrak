import { Brain, CheckCircle2, XCircle } from 'lucide-react';

export function AIConflictResolution({ incident }: { incident: any }) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Brain className="size-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">AI Conflict Resolution Analysis</h3>
          <p className="text-sm text-gray-600">Intelligent decision-making to resolve contradictory rules</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <h4 className="font-medium text-gray-900 mb-2">Conflict Diagnosis</h4>
          <p className="text-gray-700">
            The system detected a cascading HVAC failure affecting three critical zones with contradictory environmental requirements. 
            The root cause is a primary cooling system malfunction causing simultaneous temperature rise, humidity imbalance, and airflow degradation.
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <h4 className="font-medium text-gray-900 mb-2">Priority Assessment</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Critical Priority: Server Room Temperature (30.1°C)</p>
                <p className="text-xs text-gray-600 mt-1">Server hardware at risk of thermal damage. Immediate cooling required.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">High Priority: Data Center Airflow (0.1 m/s)</p>
                <p className="text-xs text-gray-600 mt-1">Insufficient ventilation risks equipment overheating and data loss.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Medium Priority: Conference Room Humidity (72%)</p>
                <p className="text-xs text-gray-600 mt-1">Elevated but not immediately critical. Can be addressed after cooling stabilization.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-gray-900 mb-4">Recommended Resolution Strategy</h4>
          <div className="space-y-4">
            {/* Action 1 */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</div>
                    <h5 className="font-semibold text-gray-900">Activate emergency cooling for Server Room & Data Center</h5>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Priority: Critical - Immediate action to prevent hardware damage</p>
                  <p className="text-sm text-gray-700 ml-8 mt-2">
                    Increase AC power by 30% focusing on Floor 2 and Floor 4. This addresses both temperature and airflow issues simultaneously.
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
                    <h5 className="font-semibold text-gray-900">Deploy zone-specific dehumidification for Conference Room</h5>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Priority: Medium - Delayed action after cooling stabilization</p>
                  <p className="text-sm text-gray-700 ml-8 mt-2">
                    Use standalone dehumidifier on Floor 3 instead of reducing AC cooling. This addresses humidity without compromising overall cooling.
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
                    <h5 className="font-semibold text-gray-900">Dispatch HVAC technician for primary cooling system inspection</h5>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Priority: High - Root cause resolution</p>
                  <p className="text-sm text-gray-700 ml-8 mt-2">
                    Emergency cooling is a temporary measure. Technician must diagnose and repair the primary cooling system failure.
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
                    <h5 className="font-semibold text-gray-900">Create adaptive rule to handle multi-zone conflicts</h5>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Priority: Low - Future optimization</p>
                  <p className="text-sm text-gray-700 ml-8 mt-2">
                    Develop new automation rule that prioritizes critical zones and uses zone-specific solutions to prevent future conflicts.
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

        {/* Decision Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-blue-100 rounded">
              <Brain className="size-5 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-blue-900 mb-1">AI Decision Rationale</p>
              <p className="text-sm text-blue-800">
                By prioritizing critical cooling for server infrastructure and using zone-specific dehumidification, we resolve all three issues 
                without creating system conflicts. This approach balances immediate safety needs with efficient resource allocation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
