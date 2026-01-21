import { useState } from 'react';
import { 
  Plus,
  Calendar,
  Layers,
  Edit3,
  Play,
  Trash2,
  Copy,
  ChevronRight,
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Language } from '../translations';

interface FloorPlan {
  id: string;
  name: string;
  description: string;
  floorId: string;
  floorName: string;
  deviceCount: number;
  createdDate: string;
  lastModified: string;
  status: 'draft' | 'active' | 'tested';
  testsRun?: number;
}

interface FloorSetupListViewProps {
  language?: Language;
  onCreateNew: () => void;
  onEditPlan: (planId: string) => void;
}

const MOCK_FLOOR_PLANS: FloorPlan[] = [
  {
    id: 'plan-1',
    name: 'Enhanced Chemical Detection - Floor 2',
    description: 'Added 8 additional chemical detectors to Sector B and surrounding areas for improved early warning coverage',
    floorId: 'floor-a-2',
    floorName: 'Floor 2 - Operations',
    deviceCount: 13,
    createdDate: '2026-01-10',
    lastModified: '2026-01-14',
    status: 'tested',
    testsRun: 3,
  },
  {
    id: 'plan-2',
    name: 'Ground Floor Security Upgrade',
    description: 'Comprehensive security enhancement with additional cameras, motion sensors, and access control points at all entry zones',
    floorId: 'floor-a-1',
    floorName: 'Floor 1 - Ground Level',
    deviceCount: 15,
    createdDate: '2026-01-08',
    lastModified: '2026-01-12',
    status: 'active',
    testsRun: 5,
  },
  {
    id: 'plan-3',
    name: 'Medical Bay Air Quality Monitoring',
    description: 'Medical-grade air quality sensors and pressure monitoring for isolation room and decontamination areas',
    floorId: 'floor-a-2',
    floorName: 'Floor 2 - Operations',
    deviceCount: 8,
    createdDate: '2026-01-15',
    lastModified: '2026-01-15',
    status: 'draft',
    testsRun: 0,
  },
  {
    id: 'plan-4',
    name: 'Emergency Lighting & Alarms - All Corridors',
    description: 'Strategic placement of emergency lighting and fire alarms along main corridors and emergency exit routes',
    floorId: 'floor-a-2',
    floorName: 'Floor 2 - Operations',
    deviceCount: 12,
    createdDate: '2025-12-28',
    lastModified: '2026-01-05',
    status: 'tested',
    testsRun: 7,
  },
];

export function FloorSetupListView({ language = 'en', onCreateNew, onEditPlan }: FloorSetupListViewProps) {
  const [plans, setPlans] = useState<FloorPlan[]>(MOCK_FLOOR_PLANS);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleDelete = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (confirm(`Are you sure you want to delete "${plan?.name}"?\n\nThis action cannot be undone.`)) {
      setPlans(plans.filter(p => p.id !== planId));
      if (selectedPlan === planId) {
        setSelectedPlan(null);
      }
    }
  };

  const handleDuplicate = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      const newPlan: FloorPlan = {
        ...plan,
        id: `plan-${Date.now()}`,
        name: `${plan.name} (Copy)`,
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        status: 'draft',
        testsRun: 0,
      };
      setPlans([newPlan, ...plans]);
    }
  };

  const getStatusBadge = (status: FloorPlan['status']) => {
    switch (status) {
      case 'draft':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-gray-300 rounded-full">
            <FileText className="size-3 text-gray-600" />
            <span className="text-xs font-semibold text-gray-700">Draft</span>
          </div>
        );
      case 'active':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 border border-blue-300 rounded-full">
            <Clock className="size-3 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">Active</span>
          </div>
        );
      case 'tested':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 border border-green-300 rounded-full">
            <CheckCircle className="size-3 text-green-600" />
            <span className="text-xs font-semibold text-green-700">Tested</span>
          </div>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Conceptual Floor Plans</h1>
            <p className="text-sm text-gray-600 mt-1">
              Design and test virtual floor configurations before deployment
            </p>
          </div>
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-lg transition-colors"
          >
            <Plus className="size-5" />
            Create New Floor Plan
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Plans</p>
            <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
          </div>
          <div className="h-10 w-px bg-gray-300"></div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Tested & Ready</p>
            <p className="text-2xl font-bold text-green-600">
              {plans.filter(p => p.status === 'tested').length}
            </p>
          </div>
          <div className="h-10 w-px bg-gray-300"></div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Active Deployments</p>
            <p className="text-2xl font-bold text-blue-600">
              {plans.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="h-10 w-px bg-gray-300"></div>
          <div>
            <p className="text-xs text-gray-600 mb-1">In Draft</p>
            <p className="text-2xl font-bold text-gray-600">
              {plans.filter(p => p.status === 'draft').length}
            </p>
          </div>
        </div>
      </div>

      {/* Plans List */}
      <div className="flex-1 overflow-auto p-6">
        {plans.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="size-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="size-10 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No Floor Plans Yet</h2>
              <p className="text-sm text-gray-600 mb-6">
                Create your first conceptual floor plan to test infrastructure and device configuration changes in a virtual environment.
              </p>
              <button
                onClick={onCreateNew}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-lg transition-colors"
              >
                <Plus className="size-5" />
                Create New Floor Plan
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white border-2 rounded-xl p-5 transition-all hover:shadow-lg ${
                  selectedPlan === plan.id
                    ? 'border-purple-500 shadow-md'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                      {getStatusBadge(plan.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Layers className="size-3.5" />
                        <span>{plan.floorName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        <span>Created {formatDate(plan.createdDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{plan.deviceCount} devices</span>
                      </div>
                      {plan.testsRun && plan.testsRun > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Play className="size-3.5" />
                          <span>{plan.testsRun} drill{plan.testsRun !== 1 ? 's' : ''} run</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditPlan(plan.id);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Floor Plan"
                    >
                      <Edit3 className="size-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicate(plan.id);
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Duplicate Floor Plan"
                    >
                      <Copy className="size-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(plan.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Floor Plan"
                    >
                      <Trash2 className="size-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditPlan(plan.id);
                      }}
                      className="ml-2 p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Open Floor Plan"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Last Modified */}
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Last modified: {formatDate(plan.lastModified)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
