import { X, Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Sensor {
  id: string;
  name: string;
  type: 'chemical' | 'temperature' | 'smoke' | 'motion' | 'pressure' | 'air-quality';
  subType?: 'R' | 'B' | 'C' | 'CO2' | 'CO' | 'O2' | 'DP';
  status: 'operational' | 'warning' | 'critical';
  value: string;
  x: number;
  y: number;
  lastUpdate?: string;
}

interface Room {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'warning' | 'critical';
  temp?: number;
  sensors?: Sensor[];
}

interface RoomDetailPanelProps {
  room: Room;
  onClose: () => void;
}

// Helper function to generate historical data for sensors
const generateSensorHistory = (sensor: Sensor) => {
  const hours = 24;
  const data = [];
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = i === 0 ? 'Now' : `${i}h`;
    let value = 0;
    
    if (sensor.subType === 'CO2') {
      const base = sensor.status === 'warning' ? 850 : 420;
      value = base + (Math.random() * 50 - 25);
    } else if (sensor.subType === 'O2') {
      const base = sensor.status === 'warning' ? 19.2 : 20.9;
      value = base + (Math.random() * 0.5 - 0.25);
    } else if (sensor.subType === 'CO') {
      const base = sensor.status === 'warning' ? 12 : 2;
      value = base + (Math.random() * 3 - 1.5);
    } else if (sensor.subType === 'DP') {
      const base = sensor.status === 'warning' ? -12 : 8;
      value = base + (Math.random() * 4 - 2);
    }
    
    data.push({ time: timestamp, value: Math.max(0, value) });
  }
  
  return data.reverse();
};

// Helper function to generate temperature history for rooms
const generateTemperatureHistory = (room: Room) => {
  const hours = 24;
  const data = [];
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = i === 0 ? 'Now' : `${i}h`;
    const base = room.temp || 21;
    const value = base + (Math.random() * 2 - 1);
    
    data.push({ time: timestamp, temp: value });
  }
  
  return data.reverse();
};

export function RoomDetailPanel({ room, onClose }: RoomDetailPanelProps) {
  const tempHistory = generateTemperatureHistory(room);

  return (
    <div className="flex-1 overflow-auto p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{room.type} • {room.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Status</p>
            <span className={`inline-flex px-2.5 py-1 rounded text-xs font-bold uppercase ${
              room.status === 'operational' ? 'bg-green-100 text-green-800' :
              room.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {room.status === 'operational' ? 'OK' : room.status === 'warning' ? 'WARN' : 'CRIT'}
            </span>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Temp</p>
            <p className="text-2xl font-bold text-gray-900">{room.temp ? `${room.temp}°C` : '-'}</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Sensors</p>
            <p className="text-2xl font-bold text-gray-900">{room.sensors?.length || 0}</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">People</p>
            <p className="text-2xl font-bold text-blue-600">
              {room.status === 'critical' ? '0' : 
               room.type === 'Control Room' ? '8' :
               room.type === 'Laboratory' ? '4' :
               room.type === 'Medical' ? '2' : '1'}
            </p>
          </div>
        </div>

        {/* Temperature Chart */}
        {room.temp && (
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Temperature Trend (24h)</h3>
              <span className="text-sm text-gray-600">Real-time monitoring</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={tempHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={['dataMin - 2', 'dataMax + 2']} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #e5e7eb', borderRadius: '8px' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="temp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* AI Health Assessment */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200 p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Brain className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900">AI Health Assessment</h3>
              <p className="text-sm text-purple-700">Analyzed using 15,000+ data points</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <p className="text-xs font-semibold text-purple-700 uppercase mb-1">Overall Health</p>
              <div className="flex items-baseline gap-2">
                <p className={`text-3xl font-bold ${
                  room.status === 'operational' ? 'text-green-600' :
                  room.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {room.status === 'operational' ? '98' : room.status === 'warning' ? '72' : '45'}
                </p>
                <span className="text-sm text-gray-600">/100</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <p className="text-xs font-semibold text-purple-700 uppercase mb-1">Efficiency</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-blue-600">
                  {room.status === 'operational' ? '94' : room.status === 'warning' ? '81' : '62'}
                </p>
                <span className="text-sm text-gray-600">%</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <p className="text-xs font-semibold text-purple-700 uppercase mb-1">Safety Score</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-green-600">
                  {room.status === 'operational' ? '99' : room.status === 'warning' ? '85' : '58'}
                </p>
                <span className="text-sm text-gray-600">%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <p className="text-sm font-bold text-gray-900 mb-2">Key Insights</p>
            <ul className="space-y-2">
              {room.status === 'operational' && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>All environmental parameters within optimal ranges</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Sensor readings stable over past 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>HVAC system operating at peak efficiency (94%)</span>
                  </li>
                </>
              )}
              {room.status === 'warning' && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle className="size-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Temperature trending 15% above normal baseline</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle className="size-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span>Air quality sensors detecting elevated levels</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>HVAC compensating - increased output by 25%</span>
                  </li>
                </>
              )}
              {room.status === 'critical' && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Critical environmental conditions detected</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Multiple sensors reporting abnormal readings</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Emergency protocols may be required</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Sensors Grid - REMOVED */}
      </div>
    </div>
  );
}
