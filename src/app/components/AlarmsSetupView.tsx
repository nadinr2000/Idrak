import { BellRing, Plus, Edit, Trash2, Clock, AlertCircle, CheckCircle2, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface Alarm {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  soundEnabled: boolean;
  repeatInterval: number;
  recipients: string[];
}

export function AlarmsSetupView() {
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: '1',
      name: 'Critical Temperature Alert',
      trigger: 'Temperature',
      condition: '> 30°C',
      severity: 'critical',
      enabled: true,
      soundEnabled: true,
      repeatInterval: 5,
      recipients: ['admin@building.com', 'ops@building.com'],
    },
    {
      id: '2',
      name: 'High Humidity Warning',
      trigger: 'Humidity',
      condition: '> 70%',
      severity: 'high',
      enabled: true,
      soundEnabled: false,
      repeatInterval: 15,
      recipients: ['maintenance@building.com'],
    },
    {
      id: '3',
      name: 'Sensor Offline Alert',
      trigger: 'Sensor Status',
      condition: 'Offline > 10min',
      severity: 'medium',
      enabled: true,
      soundEnabled: true,
      repeatInterval: 30,
      recipients: ['tech@building.com'],
    },
    {
      id: '4',
      name: 'Motion Detection After Hours',
      trigger: 'Motion',
      condition: 'Detected 10PM-6AM',
      severity: 'high',
      enabled: true,
      soundEnabled: true,
      repeatInterval: 0,
      recipients: ['security@building.com'],
    },
    {
      id: '5',
      name: 'Air Quality Poor',
      trigger: 'Air Quality',
      condition: 'AQI > 150',
      severity: 'medium',
      enabled: false,
      soundEnabled: false,
      repeatInterval: 60,
      recipients: ['facilities@building.com'],
    },
  ]);

  const toggleAlarmStatus = (alarmId: string) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === alarmId ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Alarms Setup</h2>
          <p className="text-gray-600 mt-1">Configure alarm triggers and notification settings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="size-4" />
          <span>Create Alarm</span>
        </button>
      </div>

      {/* Active Alarms Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BellRing className="size-5 text-blue-600" />
            <span className="text-sm text-gray-600">Total Alarms</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{alarms.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="size-5 text-green-600" />
            <span className="text-sm text-gray-600">Enabled</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{alarms.filter(a => a.enabled).length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="size-5 text-red-600" />
            <span className="text-sm text-gray-600">Critical</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{alarms.filter(a => a.severity === 'critical').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="size-5 text-purple-600" />
            <span className="text-sm text-gray-600">Sound Enabled</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{alarms.filter(a => a.soundEnabled).length}</p>
        </div>
      </div>

      {/* Alarms List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alarm Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trigger
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alarms.map(alarm => (
                <tr key={alarm.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleAlarmStatus(alarm.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        alarm.enabled ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          alarm.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BellRing className={`size-4 ${alarm.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="font-medium text-gray-900">{alarm.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{alarm.trigger}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-600">{alarm.condition}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityStyles(alarm.severity)}`}>
                      {alarm.severity.charAt(0).toUpperCase() + alarm.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {alarm.soundEnabled && <Volume2 className="size-4 text-purple-600" />}
                      <Clock className="size-4" />
                      <span>{alarm.repeatInterval > 0 ? `Every ${alarm.repeatInterval}min` : 'Once'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-600">
                      {alarm.recipients.length} recipient{alarm.recipients.length !== 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="size-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
