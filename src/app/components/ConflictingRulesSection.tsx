import { AlertCircle } from 'lucide-react';

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

export function ConflictingRulesSection({ affectedSensors, incident }: { affectedSensors: any[], incident: any }) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-300 p-6 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <AlertCircle className="size-6 text-orange-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Conflicting Rules Detected</h3>
          <p className="text-sm text-gray-600">Multiple automation rules matched with contradictory actions</p>
        </div>
      </div>

      <div className="space-y-4">
        {affectedSensors.map((sensor, index) => (
          <div key={sensor.id} className="bg-white rounded-lg p-4 border-2 border-orange-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{sensor.matchedRule}</p>
                  <p className="text-xs text-gray-600 mt-1">{sensor.location} • {sensor.id}</p>
                </div>
              </div>
              <SeverityBadge severity={incident.severity} />
            </div>

            <div className="ml-11 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-gray-600 mt-0.5">Trigger:</span>
                <span className="text-sm text-gray-900">
                  {sensor.type} {sensor.currentReading} (Normal: {sensor.normalRange})
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-gray-600 mt-0.5">Action:</span>
                <span className="text-sm font-semibold text-orange-700">{sensor.ruleAction}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-900 mb-2">Rule Conflict Analysis</p>
              <ul className="space-y-1.5 text-sm text-red-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Rule 1</strong> wants to <strong>increase AC power by 35%</strong> to cool the server room</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Rule 2</strong> wants to <strong>reduce AC cooling by 20%</strong> to dehumidify the conference room</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Rule 3</strong> wants to <strong>increase HVAC fan speed by 40%</strong> to improve airflow in data center</span>
                </li>
              </ul>
              <p className="text-sm text-red-900 mt-3 font-medium">
                ⚠️ These actions are mutually contradictory and cannot be executed simultaneously without causing system instability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
