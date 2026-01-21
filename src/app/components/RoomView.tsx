import { Thermometer, Droplets, Wind, Users, Activity, Gauge, Brain, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { rooms, incidents } from '../data/mockData';
import { getRoomById, RoomData } from '../data/roomsData';
import { ViewMode } from './ViewToggle';

interface RoomViewProps {
  roomId: string;
  viewMode?: ViewMode;
  onIncidentClick: (incidentId: string) => void;
  onSensorClick: (sensorId: string) => void;
}

// Define a unified room type for the component
type UnifiedRoom = {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'warning' | 'critical';
  temperature: number;
  humidity: number;
  occupancy: number;
  floorId?: string;
  sensors?: number;
};

const sensorHistory = [
  { time: '00:00', temp: 22.5, humidity: 45, co2: 420 },
  { time: '04:00', temp: 22.1, humidity: 46, co2: 410 },
  { time: '08:00', temp: 23.8, humidity: 44, co2: 680 },
  { time: '12:00', temp: 24.5, humidity: 43, co2: 720 },
  { time: '16:00', temp: 25.2, humidity: 42, co2: 650 },
  { time: '20:00', temp: 23.9, humidity: 45, co2: 480 },
  { time: '23:59', temp: 22.8, humidity: 46, co2: 430 },
];

const sensors = [
  { id: 'temp-01', name: 'Temperature Sensor', type: 'Temperature', value: '28.5°C', status: 'critical', location: 'Ceiling', lastUpdate: '2m ago' },
  { id: 'hum-01', name: 'Humidity Sensor', type: 'Humidity', value: '45%', status: 'operational', location: 'Wall', lastUpdate: '2m ago' },
  { id: 'co2-01', name: 'CO2 Monitor', type: 'Air Quality', value: '680 ppm', status: 'operational', location: 'Ceiling', lastUpdate: '1m ago' },
  { id: 'motion-01', name: 'Motion Detector', type: 'Occupancy', value: '3 people', status: 'operational', location: 'Ceiling', lastUpdate: '30s ago' },
];

export function RoomView({ roomId, viewMode, onIncidentClick, onSensorClick }: RoomViewProps) {
  // Try to find room in mockData first (for legacy room IDs like room-a-101)
  let room = rooms.find(r => r.id === roomId);
  
  // If not found, try the centralized FloorPlanView room data (F2-R1, F1-R5, etc.)
  if (!room) {
    room = getRoomById(roomId);
  }
  
  const roomIncidents = incidents.filter(i => i.roomId === roomId);

  if (!room) return null;

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Room Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{room.name}</h2>
            <p className="text-gray-600">{room.type}</p>
          </div>
          <StatusBadge status={room.status} />
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            icon={Thermometer}
            label="Temperature"
            value={`${room.temperature}°C`}
            status={room.temperature > 26 ? 'critical' : 'normal'}
            trend={room.temperature > 24 ? 'up' : 'stable'}
          />
          <MetricCard
            icon={Droplets}
            label="Humidity"
            value={`${room.humidity}%`}
            status="normal"
            trend="stable"
          />
          <MetricCard
            icon={Wind}
            label="Air Quality"
            value="Good"
            status="normal"
            trend="stable"
          />
          <MetricCard
            icon={Users}
            label="Occupancy"
            value={`${room.occupancy} people`}
            status="normal"
            trend="stable"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Temperature History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Temperature History (24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sensorHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[20, 30]} />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Humidity & CO2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Humidity & CO2 Levels (24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sensorHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area yAxisId="left" type="monotone" dataKey="humidity" stroke="#3b82f6" fill="#93c5fd" />
              <Area yAxisId="right" type="monotone" dataKey="co2" stroke="#8b5cf6" fill="#c4b5fd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Sensor Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sensors.map(sensor => (
            <button
              key={sensor.id}
              onClick={() => onSensorClick(sensor.id)}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{sensor.name}</h4>
                  <p className="text-sm text-gray-600">{sensor.type}</p>
                </div>
                <SensorStatusBadge status={sensor.status} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Value:</span>
                  <span className={`font-semibold ${sensor.status === 'critical' ? 'text-red-600' : 'text-gray-900'}`}>
                    {sensor.value}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-gray-900">{sensor.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Update:</span>
                  <span className="text-gray-900">{sensor.lastUpdate}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="size-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Analysis & Recommendations</h3>
            <p className="text-sm text-gray-600">Real-time insights and predictions</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-start gap-2">
              <Activity className="size-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Temperature Anomaly Detected</p>
                <p className="text-sm text-gray-700 mt-1">
                  Current temperature (28.5°C) is 4.5°C above normal. HVAC system showing reduced efficiency. 
                  Predict 90% chance of complete failure within 6 hours without intervention.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium">
                    Approve Auto-Fix
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-start gap-2">
              <Gauge className="size-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Energy Optimization Available</p>
                <p className="text-sm text-gray-700 mt-1">
                  Based on occupancy patterns, lighting can be reduced by 25% during 2-4 PM without affecting productivity.
                  Estimated savings: $12/day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Incidents */}
      {roomIncidents.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Active Incidents</h3>
          <div className="space-y-3">
            {roomIncidents.map(incident => (
              <button
                key={incident.id}
                onClick={() => onIncidentClick(incident.id)}
                className="w-full bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{incident.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{incident.aiPrediction}</p>
                  </div>
                  <SeverityBadge severity={incident.severity} />
                </div>
                {incident.suggestedAction && (
                  <div className="mt-3 bg-white rounded p-3 border border-red-200">
                    <p className="text-sm font-medium text-gray-900">Suggested Action:</p>
                    <p className="text-sm text-gray-700 mt-1">{incident.suggestedAction}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, status, trend }: any) {
  return (
    <div className={`rounded-lg p-4 ${status === 'critical' ? 'bg-red-50 border-2 border-red-300' : 'bg-gray-50 border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`size-5 ${status === 'critical' ? 'text-red-600' : 'text-gray-600'}`} />
        {trend === 'up' && <TrendingUp className="size-4 text-red-600" />}
        {trend === 'down' && <TrendingDown className="size-4 text-green-600" />}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className={`text-xl font-bold ${status === 'critical' ? 'text-red-600' : 'text-gray-900'}`}>
        {value}
      </p>
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
    <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}

function SensorStatusBadge({ status }: { status: string }) {
  const styles = {
    operational: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
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
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[severity]}`}>
      {severity}
    </span>
  );
}