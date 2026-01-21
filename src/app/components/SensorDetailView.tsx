import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, Wrench } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SensorDetailViewProps {
  sensorId: string;
}

const sensorData = {
  'temp-01': {
    name: 'Temperature Sensor A',
    type: 'Temperature',
    location: 'Room 301 - Ceiling Center',
    status: 'critical',
    currentValue: '28.5°C',
    normalRange: '20-24°C',
    accuracy: '±0.2°C',
    lastCalibration: '2024-01-01',
    batteryLevel: 85,
    firmwareVersion: 'v2.1.4',
  },
  'hum-01': {
    name: 'Humidity Sensor',
    type: 'Humidity',
    location: 'Room 301 - Wall North',
    status: 'operational',
    currentValue: '45%',
    normalRange: '30-60%',
    accuracy: '±2%',
    lastCalibration: '2024-01-15',
    batteryLevel: 92,
    firmwareVersion: 'v2.1.4',
  },
};

const historicalData = [
  { time: '00:00', value: 22.5, min: 20, max: 24, avg: 22.3 },
  { time: '02:00', value: 22.1, min: 20, max: 24, avg: 22.1 },
  { time: '04:00', value: 22.3, min: 20, max: 24, avg: 22.2 },
  { time: '06:00', value: 22.8, min: 20, max: 24, avg: 22.5 },
  { time: '08:00', value: 23.5, min: 20, max: 24, avg: 23.0 },
  { time: '10:00', value: 24.2, min: 20, max: 24, avg: 23.6 },
  { time: '12:00', value: 25.1, min: 20, max: 24, avg: 24.1 },
  { time: '14:00', value: 26.5, min: 20, max: 24, avg: 24.8 },
  { time: '16:00', value: 27.8, min: 20, max: 24, avg: 25.5 },
  { time: '18:00', value: 28.5, min: 20, max: 24, avg: 26.0 },
  { time: '20:00', value: 28.2, min: 20, max: 24, avg: 25.8 },
  { time: '22:00', value: 27.9, min: 20, max: 24, avg: 25.6 },
];

const weeklyData = [
  { day: 'Mon', avg: 22.5, incidents: 0 },
  { day: 'Tue', avg: 22.8, incidents: 0 },
  { day: 'Wed', avg: 23.1, incidents: 1 },
  { day: 'Thu', avg: 23.5, incidents: 0 },
  { day: 'Fri', avg: 24.2, incidents: 2 },
  { day: 'Sat', avg: 25.8, incidents: 3 },
  { day: 'Sun', avg: 26.5, incidents: 4 },
];

const maintenanceLog = [
  { date: '2024-01-15', type: 'Calibration', technician: 'John Smith', notes: 'Annual calibration completed' },
  { date: '2023-10-20', type: 'Battery Replacement', technician: 'Sarah Johnson', notes: 'Replaced battery - 100% charge' },
  { date: '2023-07-12', type: 'Firmware Update', technician: 'Mike Wilson', notes: 'Updated to v2.1.4' },
  { date: '2023-04-05', type: 'Inspection', technician: 'John Smith', notes: 'Routine inspection - no issues' },
];

const associatedIncidents = [
  { id: 'inc-001', title: 'Temperature Spike Detected', severity: 'critical', date: '15m ago', status: 'active' },
  { id: 'inc-009', title: 'Temperature Deviation', severity: 'medium', date: '2 days ago', status: 'resolved' },
  { id: 'inc-010', title: 'Sensor Drift Warning', severity: 'low', date: '1 week ago', status: 'resolved' },
];

export function SensorDetailView({ sensorId }: SensorDetailViewProps) {
  const sensor = sensorData[sensorId] || sensorData['temp-01'];

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Sensor Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-lg ${sensor.status === 'critical' ? 'bg-red-100' : 'bg-green-100'}`}>
              <Activity className={`size-8 ${sensor.status === 'critical' ? 'text-red-600' : 'text-green-600'}`} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{sensor.name}</h2>
              <p className="text-gray-600 mt-1">{sensor.type} Sensor</p>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <span className="size-2 bg-gray-400 rounded-full" />
                {sensor.location}
              </p>
            </div>
          </div>
          <StatusBadge status={sensor.status} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <StatCard label="Current Value" value={sensor.currentValue} status={sensor.status} />
          <StatCard label="Normal Range" value={sensor.normalRange} />
          <StatCard label="Accuracy" value={sensor.accuracy} />
          <StatCard label="Battery" value={`${sensor.batteryLevel}%`} />
          <StatCard label="Firmware" value={sensor.firmwareVersion} />
          <StatCard label="Last Calibration" value={sensor.lastCalibration} />
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Real-time Readings (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[18, 30]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="max" stroke="#ef4444" strokeDasharray="5 5" name="Max Threshold" />
                <Line type="monotone" dataKey="min" stroke="#3b82f6" strokeDasharray="5 5" name="Min Threshold" />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} name="Actual" />
                <Line type="monotone" dataKey="avg" stroke="#10b981" strokeWidth={1} name="Average" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sensor Health */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Sensor Health</h3>
          <div className="space-y-4">
            <HealthMetric
              label="Signal Strength"
              value={95}
              status="excellent"
              icon={Activity}
            />
            <HealthMetric
              label="Battery Level"
              value={sensor.batteryLevel}
              status={sensor.batteryLevel > 80 ? 'excellent' : 'warning'}
              icon={Activity}
            />
            <HealthMetric
              label="Data Quality"
              value={98}
              status="excellent"
              icon={CheckCircle2}
            />
            <HealthMetric
              label="Uptime (7d)"
              value={99.8}
              status="excellent"
              icon={Clock}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Run Diagnostics
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Weekly Trends & Incidents</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="avg" stroke="#3b82f6" fill="#93c5fd" name="Avg Temperature" />
            <Area yAxisId="right" type="monotone" dataKey="incidents" stroke="#ef4444" fill="#fca5a5" name="Incidents" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Associated Incidents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Associated Incidents</h3>
          <div className="space-y-3">
            {associatedIncidents.map(incident => (
              <div
                key={incident.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{incident.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{incident.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={incident.severity as any} />
                    <IncidentStatusBadge status={incident.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Log */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Maintenance Log</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Schedule Maintenance
            </button>
          </div>
          <div className="space-y-3">
            {maintenanceLog.map((log, index) => (
              <div key={index} className="border-l-2 border-blue-200 pl-4 py-2">
                <div className="flex items-start gap-3">
                  <Wrench className="size-4 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{log.type}</p>
                      <span className="text-xs text-gray-500">{log.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{log.notes}</p>
                    <p className="text-xs text-gray-500 mt-1">By: {log.technician}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Sensor Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Threshold (High)</label>
            <input
              type="number"
              defaultValue="24"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Threshold (Low)</label>
            <input
              type="number"
              defaultValue="20"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sampling Rate (seconds)</label>
            <input
              type="number"
              defaultValue="60"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Cooldown (minutes)</label>
            <input
              type="number"
              defaultValue="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Save Configuration
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, status }: any) {
  return (
    <div className={`rounded-lg p-4 ${status === 'critical' ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <p className={`font-semibold ${status === 'critical' ? 'text-red-600' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  );
}

function HealthMetric({ label, value, status, icon: Icon }: any) {
  const getColor = () => {
    if (status === 'excellent') return 'text-green-600';
    if (status === 'warning') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <span className={`text-sm font-semibold ${getColor()}`}>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${status === 'excellent' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    operational: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    critical: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <span className={`px-4 py-2 rounded-full font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[severity]}`}>
      {severity}
    </span>
  );
}

function IncidentStatusBadge({ status }: { status: string }) {
  const styles = {
    active: 'bg-red-100 text-red-800',
    resolved: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
