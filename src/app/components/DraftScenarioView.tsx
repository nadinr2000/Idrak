import { useState } from 'react';
import { ArrowLeft, Clock, AlertTriangle, MapPin, Edit2, Play, Save } from 'lucide-react';
import { Language, translations } from '../translations';

interface Threat {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
}

interface DraftScenario {
  id: string;
  name: string;
  description: string;
  threats: Threat[];
  duration?: string;
  createdAt: string;
  createdBy: string;
}

interface DraftScenarioViewProps {
  scenarioId: string;
  language: Language;
  onBack: () => void;
  onEmergencyModeChange?: (emergencyMode: boolean) => void;
  onSimulationStateChange?: (state: {
    scenarioName: string;
    isRunning: boolean;
    isPaused: boolean;
    currentTime: number;
    speed: 1 | 2 | 4;
  } | null) => void;
  onCloseSidebar?: () => void;
}

const mockDraftScenario: DraftScenario = {
  id: '3',
  name: 'Chemical Agent Attack Response',
  description: 'Chemical threat detection and containment protocol',
  threats: [
    { type: 'chemical', severity: 'critical', location: 'Floor 2 - Sector B' },
  ],
  duration: '24 hours',
  createdAt: '2025-01-07T09:15:00',
  createdBy: 'Facility Commander',
};

export function DraftScenarioView({ scenarioId, language, onBack, onEmergencyModeChange, onSimulationStateChange, onCloseSidebar }: DraftScenarioViewProps) {
  const t = translations[language];
  const [scenario, setScenario] = useState<DraftScenario>(mockDraftScenario);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(scenario.name);
  const [editedDescription, setEditedDescription] = useState(scenario.description);
  const [editedDuration, setEditedDuration] = useState(scenario.duration || '');

  const handleSave = () => {
    setScenario({
      ...scenario,
      name: editedName,
      description: editedDescription,
      duration: editedDuration,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(scenario.name);
    setEditedDescription(scenario.description);
    setEditedDuration(scenario.duration || '');
    setIsEditing(false);
  };

  const handleActivate = () => {
    onCloseSidebar?.();
    onEmergencyModeChange?.(true);
    onSimulationStateChange?.({
      scenarioName: scenario.name,
      isRunning: true,
      isPaused: false,
      currentTime: 0,
      speed: 1
    });
  };

  const getThreatIcon = (type: string) => {
    return AlertTriangle;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getThreatTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      chemical: t.chemical,
      biological: t.biological,
      radiological: t.radiological,
      nuclear: t.nuclear,
      explosive: t.explosive,
      cyber: t.cyber,
      structuralFailure: t.structuralFailure,
      hostileForce: t.hostileForce,
    };
    return typeMap[type] || type;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className={`size-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
          <span>{t.backToCases}</span>
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {t.draft}
              </div>
              <div className="text-sm text-gray-500">
                {t.createdBy || 'Created by'}: {scenario.createdBy}
              </div>
            </div>

            {!isEditing ? (
              <>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  {language === 'ar' && scenario.name === 'CBRNE Attack Response' ? t.case3Name : scenario.name}
                </h1>
                <p className="text-gray-600 mb-4">
                  {language === 'ar' && scenario.name === 'CBRNE Attack Response' ? t.case3Desc : scenario.description}
                </p>
                {scenario.duration && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="size-4" />
                    <span>{t.duration}: {scenario.duration}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.caseName}
                  </label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.description}
                  </label>
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.duration}
                  </label>
                  <input
                    type="text"
                    value={editedDuration}
                    onChange={(e) => setEditedDuration(e.target.value)}
                    placeholder={t.enterDuration}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 ml-6">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Edit2 className="size-5" />
                  <span>{t.edit || 'Edit'}</span>
                </button>
                <button
                  onClick={handleActivate}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Play className="size-5" />
                  <span>{t.activateSimulation || 'Activate Simulation'}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="size-5" />
                  <span>{t.save || 'Save'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-blue-900 mb-1">
                  {t.draftScenario || 'Draft Scenario'}
                </div>
                <p className="text-sm text-blue-700">
                  {t.draftScenarioInfo || 'This scenario is in draft mode. Review the configuration below and click "Activate Simulation" to begin the tactical exercise.'}
                </p>
              </div>
            </div>
          </div>

          {/* Scenario Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {t.scenarioConfiguration || 'Scenario Configuration'}
              </h2>
            </div>

            <div className="p-6">
              {/* Threats List */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  {t.threats} ({scenario.threats.length})
                </h3>
                <div className="space-y-3">
                  {scenario.threats.map((threat, index) => {
                    const Icon = getThreatIcon(threat.type);
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className={`p-2 rounded-lg ${getSeverityColor(threat.severity)} bg-opacity-10`}>
                          <Icon className={`size-5 ${
                            threat.severity === 'critical' ? 'text-red-600' :
                            threat.severity === 'high' ? 'text-orange-600' :
                            threat.severity === 'medium' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">
                              {getThreatTypeLabel(threat.type)}
                            </h4>
                            <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityText(threat.severity)}`}>
                              {threat.severity === 'critical' ? t.critical :
                               threat.severity === 'high' ? t.high :
                               threat.severity === 'medium' ? t.medium : t.low}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="size-4" />
                            <span>{threat.location}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Preview */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-600 rounded-lg">
                <Play className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t.readyToActivate || 'Ready to Activate'}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t.activateSimulationDesc || 'When activated, you will enter an immersive simulation environment where you will face the configured threats in real-time. AI will provide assessments and recommendations that you can apply or reject to manage the crisis.'}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="size-4 text-indigo-600" />
                    <span>{scenario.threats.length} {t.threats}</span>
                  </div>
                  {scenario.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-indigo-600" />
                      <span>{scenario.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}