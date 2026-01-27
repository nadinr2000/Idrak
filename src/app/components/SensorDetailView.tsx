import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, Wrench, Brain, Zap, AlertCircle, Calendar, BarChart3 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { useState } from 'react';

interface SensorDetailViewProps {
  sensorId: string;
}

const sensorData = {
  // Floor 2 - Room 1 (Command Center) Sensors
  'S-F2-R1-01': {
    name: 'CO2 Sensor North',
    type: 'CO2',
    location: 'Command Center - North Wall',
    status: 'operational',
    currentValue: '450 ppm',
    normalRange: '400-1000 ppm',
    accuracy: '±50 ppm',
    lastCalibration: '2024-01-10',
    batteryLevel: 78,
    firmwareVersion: 'v2.0.8',
    unit: 'ppm',
  },
  'S-F2-R1-02': {
    name: 'O2 Sensor South',
    type: 'Air Quality',
    location: 'Command Center - South Wall',
    status: 'operational',
    currentValue: '20.9%',
    normalRange: '19.5-23%',
    accuracy: '±0.5%',
    lastCalibration: '2024-01-12',
    batteryLevel: 85,
    firmwareVersion: 'v2.1.0',
    unit: '%',
  },
  'S-F2-R1-03': {
    name: 'Radiological Detector',
    type: 'Smoke',
    location: 'Command Center - Ceiling North',
    status: 'operational',
    currentValue: 'Normal',
    normalRange: '0-0.05%',
    accuracy: '±0.01%',
    lastCalibration: '2024-01-20',
    batteryLevel: 95,
    firmwareVersion: 'v3.0.1',
    unit: '%',
  },
  'S-F2-R1-04': {
    name: 'Diff Pressure',
    type: 'Pressure',
    location: 'Command Center - South',
    status: 'operational',
    currentValue: '+8 Pa',
    normalRange: '-10 to +15 Pa',
    accuracy: '±1 Pa',
    lastCalibration: '2023-12-20',
    batteryLevel: 65,
    firmwareVersion: 'v1.9.3',
    unit: 'Pa',
  },
  // Floor 2 - Room 6 (Sector B Lab - CRITICAL)
  'S-F2-R6-01': {
    name: 'Chemical Detector A',
    type: 'CO2',
    location: 'Sector B Lab - West',
    status: 'critical',
    currentValue: 'AGENT DETECTED',
    normalRange: '400-1000 ppm',
    accuracy: '±50 ppm',
    lastCalibration: '2024-01-10',
    batteryLevel: 45,
    firmwareVersion: 'v2.0.8',
    unit: 'ppm',
  },
  'S-F2-R6-02': {
    name: 'Biological Detector',
    type: 'Smoke',
    location: 'Sector B Lab - East',
    status: 'critical',
    currentValue: 'ALERT',
    normalRange: '0-0.05%',
    accuracy: '±0.01%',
    lastCalibration: '2024-01-20',
    batteryLevel: 50,
    firmwareVersion: 'v3.0.1',
    unit: '%',
  },
  'S-F2-R6-03': {
    name: 'CO Sensor',
    type: 'CO2',
    location: 'Sector B Lab - Center',
    status: 'warning',
    currentValue: '12 ppm',
    normalRange: '0-35 ppm',
    accuracy: '±5 ppm',
    lastCalibration: '2024-01-10',
    batteryLevel: 70,
    firmwareVersion: 'v2.0.8',
    unit: 'ppm',
  },
  'S-F2-R6-04': {
    name: 'Air Pressure Monitor',
    type: 'Pressure',
    location: 'Sector B Lab - Southeast',
    status: 'warning',
    currentValue: '-12 Pa',
    normalRange: '-10 to +15 Pa',
    accuracy: '±1 Pa',
    lastCalibration: '2023-12-20',
    batteryLevel: 62,
    firmwareVersion: 'v1.9.3',
    unit: 'Pa',
  },
  'S-F2-R6-05': {
    name: 'Radiological Monitor',
    type: 'Smoke',
    location: 'Sector B Lab - Southwest',
    status: 'operational',
    currentValue: 'Normal',
    normalRange: '0-0.05%',
    accuracy: '±0.01%',
    lastCalibration: '2024-01-20',
    batteryLevel: 88,
    firmwareVersion: 'v3.0.1',
    unit: '%',
  },
  // Legacy sensor IDs for backward compatibility
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
    unit: '°C',
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
    unit: '%',
  },
  'co2-01': {
    name: 'CO2 Sensor',
    type: 'CO2',
    location: 'Room 301 - Wall East',
    status: 'operational',
    currentValue: '420 ppm',
    normalRange: '400-1000 ppm',
    accuracy: '±50 ppm',
    lastCalibration: '2024-01-10',
    batteryLevel: 78,
    firmwareVersion: 'v2.0.8',
    unit: 'ppm',
  },
  'press-01': {
    name: 'Pressure Sensor',
    type: 'Pressure',
    location: 'Room 301 - Ceiling West',
    status: 'warning',
    currentValue: '1015 hPa',
    normalRange: '1010-1020 hPa',
    accuracy: '±1 hPa',
    lastCalibration: '2023-12-20',
    batteryLevel: 65,
    firmwareVersion: 'v1.9.3',
    unit: 'hPa',
  },
  'motion-01': {
    name: 'Motion Sensor',
    type: 'Motion',
    location: 'Room 301 - Entrance',
    status: 'operational',
    currentValue: 'Active',
    normalRange: 'N/A',
    accuracy: '±5°',
    lastCalibration: '2024-01-05',
    batteryLevel: 88,
    firmwareVersion: 'v2.1.1',
    unit: 'events/min',
  },
  'smoke-01': {
    name: 'Smoke Detector',
    type: 'Smoke',
    location: 'Room 301 - Ceiling Center',
    status: 'operational',
    currentValue: '0.02%',
    normalRange: '0-0.05%',
    accuracy: '±0.01%',
    lastCalibration: '2024-01-20',
    batteryLevel: 95,
    firmwareVersion: 'v3.0.1',
    unit: '%',
  },
  'air-01': {
    name: 'Air Quality Sensor',
    type: 'Air Quality',
    location: 'Room 301 - Wall South',
    status: 'operational',
    currentValue: 'Good (45)',
    normalRange: '0-50 (Good)',
    accuracy: '±3 AQI',
    lastCalibration: '2024-01-12',
    batteryLevel: 82,
    firmwareVersion: 'v2.3.0',
    unit: 'AQI',
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

// Performance degradation data (over 12 months)
const performanceData = [
  { month: 'Jan', accuracy: 99.8, responseTime: 98, reliability: 99.5 },
  { month: 'Feb', accuracy: 99.6, responseTime: 98, reliability: 99.3 },
  { month: 'Mar', accuracy: 99.5, responseTime: 97, reliability: 99.0 },
  { month: 'Apr', accuracy: 99.3, responseTime: 97, reliability: 98.8 },
  { month: 'May', accuracy: 99.0, responseTime: 96, reliability: 98.5 },
  { month: 'Jun', accuracy: 98.8, responseTime: 95, reliability: 98.2 },
  { month: 'Jul', accuracy: 98.5, responseTime: 95, reliability: 97.8 },
  { month: 'Aug', accuracy: 98.2, responseTime: 94, reliability: 97.5 },
  { month: 'Sep', accuracy: 97.9, responseTime: 93, reliability: 97.0 },
  { month: 'Oct', accuracy: 97.5, responseTime: 92, reliability: 96.5 },
  { month: 'Nov', accuracy: 97.2, responseTime: 91, reliability: 96.0 },
  { month: 'Dec', accuracy: 96.8, responseTime: 90, reliability: 95.5 },
];

// Anomaly detection data (last 30 days)
const anomalyData = [
  { date: 'Day 1', normal: 95, anomalies: 5 },
  { date: 'Day 5', normal: 93, anomalies: 7 },
  { date: 'Day 10', normal: 94, anomalies: 6 },
  { date: 'Day 15', normal: 92, anomalies: 8 },
  { date: 'Day 20', normal: 90, anomalies: 10 },
  { date: 'Day 25', normal: 88, anomalies: 12 },
  { date: 'Day 30', normal: 85, anomalies: 15 },
];

// Generate historical data based on sensor type and time range
const generateHistoricalData = (sensorType: string, timeRange: '24h' | '7d' | '30d') => {
  const configs = {
    Temperature: { min: 20, max: 24, current: 28.5 },
    Humidity: { min: 30, max: 60, current: 45 },
    CO2: { min: 400, max: 1000, current: 420 },
    Pressure: { min: 1010, max: 1020, current: 1015 },
    Motion: { min: 0, max: 10, current: 2.5 },
    Smoke: { min: 0, max: 0.05, current: 0.02 },
    'Air Quality': { min: 0, max: 50, current: 45 },
  };

  const config = configs[sensorType] || configs.Temperature;
  
  if (timeRange === '24h') {
    return [
      { time: '00:00', value: config.current * 0.79, min: config.min, max: config.max, avg: config.current * 0.78 },
      { time: '02:00', value: config.current * 0.78, min: config.min, max: config.max, avg: config.current * 0.77 },
      { time: '04:00', value: config.current * 0.78, min: config.min, max: config.max, avg: config.current * 0.78 },
      { time: '06:00', value: config.current * 0.80, min: config.min, max: config.max, avg: config.current * 0.79 },
      { time: '08:00', value: config.current * 0.82, min: config.min, max: config.max, avg: config.current * 0.81 },
      { time: '10:00', value: config.current * 0.85, min: config.min, max: config.max, avg: config.current * 0.83 },
      { time: '12:00', value: config.current * 0.88, min: config.min, max: config.max, avg: config.current * 0.85 },
      { time: '14:00', value: config.current * 0.93, min: config.min, max: config.max, avg: config.current * 0.87 },
      { time: '16:00', value: config.current * 0.98, min: config.min, max: config.max, avg: config.current * 0.90 },
      { time: '18:00', value: config.current, min: config.min, max: config.max, avg: config.current * 0.91 },
      { time: '20:00', value: config.current * 0.99, min: config.min, max: config.max, avg: config.current * 0.91 },
      { time: '22:00', value: config.current * 0.98, min: config.min, max: config.max, avg: config.current * 0.90 },
    ];
  } else if (timeRange === '7d') {
    return [
      { time: 'Mon', value: config.current * 0.79, min: config.min, max: config.max, avg: config.current * 0.78 },
      { time: 'Tue', value: config.current * 0.80, min: config.min, max: config.max, avg: config.current * 0.79 },
      { time: 'Wed', value: config.current * 0.81, min: config.min, max: config.max, avg: config.current * 0.80 },
      { time: 'Thu', value: config.current * 0.82, min: config.min, max: config.max, avg: config.current * 0.81 },
      { time: 'Fri', value: config.current * 0.85, min: config.min, max: config.max, avg: config.current * 0.83 },
      { time: 'Sat', value: config.current * 0.91, min: config.min, max: config.max, avg: config.current * 0.86 },
      { time: 'Sun', value: config.current * 0.93, min: config.min, max: config.max, avg: config.current * 0.88 },
    ];
  } else { // 30d
    return [
      { time: 'Week 1', value: config.current * 0.75, min: config.min, max: config.max, avg: config.current * 0.74 },
      { time: 'Week 2', value: config.current * 0.80, min: config.min, max: config.max, avg: config.current * 0.78 },
      { time: 'Week 3', value: config.current * 0.85, min: config.min, max: config.max, avg: config.current * 0.82 },
      { time: 'Week 4', value: config.current * 0.90, min: config.min, max: config.max, avg: config.current * 0.87 },
    ];
  }
};

export function SensorDetailView({ sensorId }: SensorDetailViewProps) {
  const sensor = sensorData[sensorId] || sensorData['temp-01'];
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  
  const currentHistoricalData = generateHistoricalData(sensor.type, timeRange);

  return (
    <div className="w-full h-full overflow-auto bg-gray-50">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Current Value" value={sensor.currentValue} status={sensor.status} />
            <StatCard label="Normal Range" value={sensor.normalRange} />
            <StatCard label="Accuracy" value={sensor.accuracy} />
            <StatCard label="Battery" value={`${sensor.batteryLevel}%`} />
            <StatCard label="Firmware" value={sensor.firmwareVersion} />
            <StatCard label="Last Calibration" value={sensor.lastCalibration} />
          </div>
        </div>

        {/* Real-time Monitoring */}
        <div className="space-y-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Sensor Readings Over Time</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange('24h')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    timeRange === '24h'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  24h
                </button>
                <button
                  onClick={() => setTimeRange('7d')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    timeRange === '7d'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  7d
                </button>
                <button
                  onClick={() => setTimeRange('30d')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    timeRange === '30d'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  30d
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentHistoricalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="max" stroke="#ef4444" strokeDasharray="5 5" name="Max Threshold" />
                <Line type="monotone" dataKey="min" stroke="#3b82f6" strokeDasharray="5 5" name="Min Threshold" />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} name={`Actual (${sensor.unit})`} />
                <Line type="monotone" dataKey="avg" stroke="#10b981" strokeWidth={1} name="Average" />
              </LineChart>
            </ResponsiveContainer>
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
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Run Diagnostics
              </button>
            </div>
          </div>
        </div>

        {/* AI Health Insights & Performance Degradation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* AI Health Analysis */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border-2 border-purple-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-600 rounded-lg p-2">
                <Brain className="size-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">AI Health Analysis</h3>
                <p className="text-xs text-purple-700">Machine learning-based assessment</p>
              </div>
            </div>

            {/* Overall Health Score */}
            <div className="bg-white rounded-lg p-4 mb-4 border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Health Score</span>
                <span className="text-2xl font-bold text-orange-600">73%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" style={{ width: '73%' }} />
              </div>
              <p className="text-xs text-gray-600 mt-2">⚠️ Performance degradation detected</p>
            </div>

            {/* AI Insights */}
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="size-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Calibration Drift Detected</p>
                    <p className="text-xs text-gray-600 mt-1">
                      AI models detect +0.8°C systematic bias in readings over past 14 days. Accuracy degraded from 99.8% to 96.8%.
                    </p>
                    <p className="text-xs text-purple-700 mt-1 font-medium">Confidence: 94%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <div className="flex items-start gap-2">
                  <TrendingDown className="size-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Response Time Degradation</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Sensor response time increased 12% over 6 months. Pattern matches aging battery symptoms.
                    </p>
                    <p className="text-xs text-purple-700 mt-1 font-medium">Confidence: 88%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="flex items-start gap-2">
                  <BarChart3 className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Anomaly Pattern Recognition</p>
                    <p className="text-xs text-gray-600 mt-1">
                      15 anomalies detected in last 30 days. Pattern suggests environmental interference during 14:00-16:00 hours.
                    </p>
                    <p className="text-xs text-purple-700 mt-1 font-medium">Confidence: 91%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Maintenance */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-sm border-2 border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <Wrench className="size-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Predictive Maintenance</h3>
                <p className="text-xs text-blue-700">AI-powered failure prediction</p>
              </div>
            </div>

            {/* Maintenance Predictions */}
            <div className="space-y-3 mb-4">
              {/* Critical - Calibration Needed */}
              <div className="bg-red-50 rounded-lg p-4 border-2 border-red-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-5 text-red-600 flex-shrink-0" />
                    <h4 className="font-bold text-red-900">Calibration Required</h4>
                  </div>
                  <span className="text-xs font-medium text-red-700 bg-red-200 px-2 py-1 rounded">URGENT</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  AI predicts sensor will exceed ±1.0°C accuracy threshold within <span className="font-bold text-red-600">7-10 days</span>.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="size-3" />
                  <span>Recommended: Within 5 days</span>
                </div>
              </div>

              {/* Warning - Battery */}
              <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="size-5 text-yellow-600 flex-shrink-0" />
                    <h4 className="font-bold text-yellow-900">Battery Replacement Due</h4>
                  </div>
                  <span className="text-xs font-medium text-yellow-700 bg-yellow-200 px-2 py-1 rounded">MEDIUM</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Current discharge rate predicts battery failure in <span className="font-bold text-yellow-600">45-60 days</span>.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="size-3" />
                  <span>Recommended: Within 30 days</span>
                </div>
              </div>

              {/* Info - Firmware */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-blue-600 flex-shrink-0" />
                    <h4 className="font-medium text-blue-900">Firmware Update Available</h4>
                  </div>
                  <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded">INFO</span>
                </div>
                <p className="text-xs text-gray-600">
                  Version v2.2.1 includes improved accuracy algorithms and bug fixes.
                </p>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Brain className="size-4 text-purple-600" />
                AI Recommended Actions
              </h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors">
                  <p className="text-sm font-medium text-red-900">1. Schedule Calibration</p>
                  <p className="text-xs text-red-700">Priority: High • Est. time: 30 min</p>
                </button>
                <button className="w-full text-left px-3 py-2 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors">
                  <p className="text-sm font-medium text-yellow-900">2. Order Replacement Battery</p>
                  <p className="text-xs text-yellow-700">Priority: Medium • Lead time: 5-7 days</p>
                </button>
                <button className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                  <p className="text-sm font-medium text-blue-900">3. Update Firmware</p>
                  <p className="text-xs text-blue-700">Priority: Low • Est. time: 10 min</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Degradation Over Time */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Performance Degradation (12 Months)</h3>
            <div className="flex items-center gap-2">
              <Brain className="size-4 text-purple-600" />
              <span className="text-xs text-purple-700 font-medium">AI-Tracked Metrics</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[85, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} name="Accuracy %" />
              <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={2} name="Response Time %" />
              <Line type="monotone" dataKey="reliability" stroke="#10b981" strokeWidth={2} name="Reliability %" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-yellow-800">⚠️ AI Alert:</span> All performance metrics show consistent downward trend. 
              This pattern strongly indicates sensor is approaching end of optimal operational period. Proactive replacement recommended within 3-6 months.
            </p>
          </div>
        </div>

        {/* Anomaly Detection Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Anomaly Detection Trend (30 Days)</h3>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-orange-600" />
              <span className="text-xs text-orange-700 font-medium">Increasing anomaly rate</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="normal" stackId="a" fill="#10b981" name="Normal Readings %" />
              <Bar dataKey="anomalies" stackId="a" fill="#ef4444" name="Anomalies %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Anomaly Rate Increase</p>
              <p className="text-xl font-bold text-red-600">+200%</p>
              <p className="text-xs text-gray-600 mt-1">From 5% to 15% in 30 days</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">AI Pattern Match</p>
              <p className="text-xl font-bold text-purple-600">91%</p>
              <p className="text-xs text-gray-600 mt-1">Matches calibration drift pattern</p>
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