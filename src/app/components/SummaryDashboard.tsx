import { 
  Wind, 
  Activity, 
  Zap, 
  Droplets, 
  AlertTriangle, 
  Shield, 
  Gauge, 
  ThermometerSun,
  Users,
  Building,
  AlertCircle,
  TrendingUp,
  Calendar,
  Clock,
  ChevronRight,
  Sparkles,
  BarChart3,
  Radio,
  Lock,
  Eye,
  Building2,
  Thermometer,
  Lightbulb,
  Layers,
  DoorOpen,
  Brain,
  CheckCircle2,
  LineChart as LineChartIcon
} from 'lucide-react';
import { ViewMode } from './ViewToggle';
import { Language, translations, getIncidentTitle, getIncidentLocation } from '../translations';
import { IncidentCard } from './IncidentCard';
import { incidents, floors, automationRules } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { FloorPlanView } from './FloorPlanView';
import { BuildingDiagram3D } from './BuildingDiagram3D';
import { useState } from 'react';

interface SummaryDashboardProps {
  viewMode: ViewMode;
  onNavigateToFloors: () => void;
  onNavigateToIncidents: () => void;
  onNavigateToSensors: () => void;
  onFloorClick: (floorId: string) => void;
  onIncidentClick: (incidentId: string) => void;
  language: Language;
  emergencyMode?: boolean;
}

export function SummaryDashboard({ viewMode, onNavigateToFloors, onNavigateToIncidents, onNavigateToSensors, onFloorClick, onIncidentClick, language, emergencyMode }: SummaryDashboardProps) {
  const [incidentTimeRange, setIncidentTimeRange] = useState('30');
  const t = translations[language];

  // Environmental gauge data - realistic bunker values
  const environmentalGauges = [
    { label: 'O₂', value: 20.9, unit: '%', min: 19.5, max: 23.5, optimal: [19.5, 23.5], status: 'normal' },
    { label: 'CO₂', value: 420, unit: 'ppm', min: 0, max: 1000, optimal: [0, 600], status: 'normal' },
    { label: 'CO', value: 2, unit: 'ppm', min: 0, max: 50, optimal: [0, 9], status: 'normal' },
    { label: 'Pressure', value: 0.05, unit: 'inH₂O', min: -0.1, max: 0.2, optimal: [0.02, 0.1], status: 'normal' },
    { label: 'Airflow', value: 920, unit: 'CFM', min: 0, max: 1200, optimal: [800, 1200], status: 'normal' },
    { label: 'Humidity', value: 45, unit: '%', min: 0, max: 100, optimal: [30, 60], status: 'normal' },
  ];

  // System status data
  const systemStatuses = [
    { label: t.filtrationSystem, status: 'operational', value: '98%', icon: Wind },
    { label: t.co2Scrubbers, status: 'operational', value: t.activeStatus, icon: Wind },
    { label: t.blastDoors, status: 'operational', value: t.sealed, icon: Lock },
    { label: t.chemicalSensors, status: 'operational', value: '12/12', icon: AlertCircle },
    { label: t.nuclearDetectors, status: 'operational', value: '8/8', icon: Radio },
    { label: t.bioDetectors, status: 'operational', value: '15/15', icon: Eye },
    { label: t.powerSystems, status: 'operational', value: '100%', icon: Zap },
  ];

  // Critical resources
  const resources = [
    { label: t.waterSupply, value: 87, unit: '%', total: '50,000 gal', icon: Droplets, color: '#3b82f6' },
    { label: t.powerReserve, value: 92, unit: '%', total: '72 hrs', icon: Zap, color: '#10b981' },
    { label: t.o2Reserves, value: 78, unit: '%', total: '30 days', icon: Wind, color: '#8b5cf6' },
    { label: t.foodSupply, value: 95, unit: '%', total: '90 days', icon: Building2, color: '#f59e0b' },
  ];

  // Sensor breakdown data
  const sensorBreakdownData = [
    { type: t.temperature, count: 156, icon: Thermometer, color: '#ef4444', status: { online: 152, offline: 4 } },
    { type: t.humidity, count: 124, icon: Droplets, color: '#3b82f6', status: { online: 120, offline: 4 } },
    { type: t.motion, count: 98, icon: Eye, color: '#8b5cf6', status: { online: 95, offline: 3 } },
    { type: t.airQuality, count: 87, icon: Wind, color: '#10b981', status: { online: 84, offline: 3 } },
    { type: t.light, count: 72, icon: Lightbulb, color: '#f59e0b', status: { online: 70, offline: 2 } },
    { type: t.access, count: 29, icon: Lock, color: '#6366f1', status: { online: 27, offline: 2 } },
  ];

  const totalSensors = sensorBreakdownData.reduce((sum, item) => sum + item.count, 0);

  // Incidents trend data - different datasets for different time ranges
  const incidentsTrendDataSets: Record<string, any[]> = {
    '7': [
      { date: 'Jan 30', ruleMatched: 3, conflict: 2, undefined: 1 },
      { date: 'Jan 31', ruleMatched: 5, conflict: 1, undefined: 2 },
      { date: 'Feb 1', ruleMatched: 2, conflict: 3, undefined: 1 },
      { date: 'Feb 2', ruleMatched: 4, conflict: 2, undefined: 2 },
      { date: 'Feb 3', ruleMatched: 6, conflict: 1, undefined: 1 },
      { date: 'Feb 4', ruleMatched: 3, conflict: 2, undefined: 3 },
      { date: 'Feb 5', ruleMatched: 5, conflict: 3, undefined: 2 },
    ],
    '30': [
      { date: 'Jan 6', ruleMatched: 5, conflict: 2, undefined: 1 },
      { date: 'Jan 9', ruleMatched: 7, conflict: 3, undefined: 2 },
      { date: 'Jan 12', ruleMatched: 4, conflict: 1, undefined: 1 },
      { date: 'Jan 15', ruleMatched: 8, conflict: 4, undefined: 3 },
      { date: 'Jan 18', ruleMatched: 6, conflict: 2, undefined: 2 },
      { date: 'Jan 21', ruleMatched: 5, conflict: 3, undefined: 1 },
      { date: 'Jan 24', ruleMatched: 7, conflict: 4, undefined: 3 },
      { date: 'Jan 27', ruleMatched: 5, conflict: 3, undefined: 3 },
      { date: 'Jan 30', ruleMatched: 3, conflict: 2, undefined: 2 },
      { date: 'Feb 2', ruleMatched: 6, conflict: 4, undefined: 3 },
    ],
    '90': [
      { date: 'Nov 10', ruleMatched: 8, conflict: 3, undefined: 2 },
      { date: 'Nov 20', ruleMatched: 6, conflict: 4, undefined: 1 },
      { date: 'Nov 30', ruleMatched: 9, conflict: 2, undefined: 3 },
      { date: 'Dec 10', ruleMatched: 7, conflict: 5, undefined: 2 },
      { date: 'Dec 20', ruleMatched: 5, conflict: 3, undefined: 2 },
      { date: 'Dec 30', ruleMatched: 6, conflict: 2, undefined: 1 },
      { date: 'Jan 10', ruleMatched: 8, conflict: 4, undefined: 3 },
      { date: 'Jan 20', ruleMatched: 7, conflict: 3, undefined: 2 },
      { date: 'Jan 30', ruleMatched: 5, conflict: 2, undefined: 2 },
      { date: 'Feb 5', ruleMatched: 6, conflict: 3, undefined: 2 },
    ],
  };

  const incidentsTrendData = incidentsTrendDataSets[incidentTimeRange];

  // Threat Classification Data
  const threatClassificationData = [
    { date: 'Jan 29', ruleMatched: 5, conflict: 2, undefined: 1 },
    { date: 'Jan 30', ruleMatched: 7, conflict: 3, undefined: 2 },
    { date: 'Jan 31', ruleMatched: 4, conflict: 2, undefined: 1 },
    { date: 'Feb 1', ruleMatched: 8, conflict: 4, undefined: 2 },
    { date: 'Feb 2', ruleMatched: 6, conflict: 2, undefined: 3 },
    { date: 'Feb 3', ruleMatched: 5, conflict: 3, undefined: 1 },
    { date: 'Feb 4', ruleMatched: 7, conflict: 4, undefined: 2 },
    { date: 'Feb 5', ruleMatched: 6, conflict: 3, undefined: 2 },
  ];

  // AI Suggestions Data
  const aiSuggestionsData = [
    { name: t.approved, value: 78, color: '#10b981' },
    { name: t.rejected, value: 22, color: '#ef4444' },
  ];

  // Energy Consumption Data
  const energyConsumptionData = [
    { system: t.hvac, consumption: 42, color: '#3b82f6' },
    { system: t.lighting, consumption: 28, color: '#f59e0b' },
    { system: t.security, consumption: 12, color: '#10b981' },
    { system: t.elevators, consumption: 10, color: '#8b5cf6' },
    { system: t.other, consumption: 8, color: '#6b7280' },
  ];

  // Always show the floor plan view directly
  return (
    <FloorPlanView
      floorId="floor-a-2"
      onRoomClick={() => {}}
      onIncidentClick={onIncidentClick}
      onBack={() => {}}
      emergencyMode={emergencyMode}
      hideBreadcrumbs={true}
      language={language}
    />
  );
}

function MetricCardDetailed({ title, value, icon: Icon, color, onClick, breakdown }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    teal: 'bg-teal-50 text-teal-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  const dotColorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    gray: 'bg-gray-400',
    orange: 'bg-orange-500',
  };

  const cardClasses = onClick 
    ? 'bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 cursor-pointer transition-all hover:shadow-md hover:border-gray-300 min-w-0' 
    : 'bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 min-w-0';

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="size-5 sm:size-6" />
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">{value}</h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 truncate">{title}</p>
      {breakdown && (
        <div className="space-y-1.5 pt-2 sm:pt-3 border-t border-gray-100">
          {breakdown.map((item: any) => (
            <div key={item.label} className="flex items-center justify-between gap-2 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                <div className={`size-2 rounded-full flex-shrink-0 ${dotColorClasses[item.color]}`} />
                <span className="text-xs text-gray-600 truncate">{item.label}</span>
              </div>
              <span className="text-xs font-semibold text-gray-900 flex-shrink-0">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SeverityDot({ severity }: { severity: string }) {
  const colors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500',
  };

  return <div className={`size-3 rounded-full ${colors[severity]}`} />;
}

function AIInsightCard({ type, icon: Icon, iconColor, iconBg, title, description, confidence, action, timeframe, savings, status }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 ${iconBg} rounded-lg`}>
          <Icon className="size-5" style={{ color: iconColor }} />
        </div>
        <h4 className="font-medium text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="p-1 bg-gray-100 rounded-full">
            <CheckCircle2 className="size-3 text-gray-600" />
          </div>
          <span className="text-xs text-gray-500">Confidence: {confidence}%</span>
        </div>
        {type === 'prediction' && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
            {timeframe}
          </span>
        )}
        {type === 'suggestion' && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
            {savings}
          </span>
        )}
        {type === 'anomaly' && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
            {status}
          </span>
        )}
      </div>
      <button
        className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        {action} →
      </button>
    </div>
  );
}

function PredictionItem({ icon: Icon, title, description, probability, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 ${colorClasses[color]} rounded-lg`}>
          <Icon className="size-5" />
        </div>
        <h4 className="font-medium text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="p-1 bg-gray-100 rounded-full">
            <CheckCircle2 className="size-3 text-gray-600" />
          </div>
          <span className="text-xs text-gray-500">{probability}</span>
        </div>
      </div>
    </div>
  );
}

function CircularGaugeDisplay({ label, value, unit, min, max, status }: any) {
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180; // Semi-circle (180 degrees)
  
  const statusColor = status === 'normal' ? '#10b981' : 
                     status === 'warning' ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-12 mb-2">
        {/* Background arc */}
        <svg className="w-full h-full" viewBox="0 0 100 60">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Foreground arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={statusColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(angle / 180) * 126} 126`}
            style={{ transition: 'stroke-dasharray 0.3s ease' }}
          />
          {/* Center text */}
          <text
            x="50"
            y="45"
            textAnchor="middle"
            className="text-xs font-bold"
            fill="#111827"
          >
            {value}
          </text>
        </svg>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-gray-900">{label}</div>
        <div className="text-xs text-gray-500">{unit}</div>
      </div>
    </div>
  );
}

function SystemStatusItem({ label, status, icon: Icon }: any) {
  const statusColors = {
    operational: { bg: 'bg-green-100', icon: 'text-green-600', dot: 'bg-green-500' },
    warning: { bg: 'bg-yellow-100', icon: 'text-yellow-600', dot: 'bg-yellow-500' },
    offline: { bg: 'bg-red-100', icon: 'text-red-600', dot: 'bg-red-500' },
  };

  const colors = statusColors[status] || statusColors.operational;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`p-2 ${colors.bg} rounded-lg`}>
          <Icon className={`size-4 ${colors.icon}`} />
        </div>
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full ${colors.dot}`} />
        <span className="text-xs font-medium text-gray-600 capitalize">{status}</span>
      </div>
    </div>
  );
}

function IncidentStatusBar({ label, count, total, color }: any) {
  const percentage = (count / total) * 100;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full ${color}`} />
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full w-24">
        <div 
          className={`absolute left-0 top-0 h-full ${color} transition-all duration-300`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
      <span className="text-xs text-gray-500">{count}</span>
    </div>
  );
}