import { GitBranch, Plus, Edit, Trash2, Clock, ArrowRight, Users, Mail, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface EscalationStep {
  level: number;
  delay: number; // minutes
  notifyUsers: string[];
  notifyGroups: string[];
  channels: ('email' | 'sms' | 'phone' | 'app')[];
}

interface EscalationPath {
  id: string;
  name: string;
  description: string;
  triggerSeverity: string[];
  enabled: boolean;
  steps: EscalationStep[];
  activations: number;
}

export function EscalationPathsView() {
  const [paths, setPaths] = useState<EscalationPath[]>([
    {
      id: '1',
      name: 'Critical Temperature Escalation',
      description: 'Escalation path for critical temperature incidents',
      triggerSeverity: ['critical'],
      enabled: true,
      activations: 24,
      steps: [
        {
          level: 1,
          delay: 0,
          notifyUsers: ['Maintenance Team'],
          notifyGroups: ['On-Call Engineers'],
          channels: ['email', 'app'],
        },
        {
          level: 2,
          delay: 15,
          notifyUsers: ['Facilities Manager'],
          notifyGroups: ['Maintenance Supervisors'],
          channels: ['email', 'sms', 'app'],
        },
        {
          level: 3,
          delay: 30,
          notifyUsers: ['Building Manager', 'Operations Director'],
          notifyGroups: ['Executive Team'],
          channels: ['email', 'sms', 'phone', 'app'],
        },
      ],
    },
    {
      id: '2',
      name: 'Security Breach Protocol',
      description: 'Immediate escalation for security incidents',
      triggerSeverity: ['critical', 'high'],
      enabled: true,
      activations: 8,
      steps: [
        {
          level: 1,
          delay: 0,
          notifyUsers: ['Security Team'],
          notifyGroups: ['On-Site Security'],
          channels: ['phone', 'sms', 'app'],
        },
        {
          level: 2,
          delay: 5,
          notifyUsers: ['Security Manager', 'Building Manager'],
          notifyGroups: ['Emergency Response Team'],
          channels: ['phone', 'sms', 'app'],
        },
      ],
    },
    {
      id: '3',
      name: 'Standard Sensor Failure',
      description: 'Non-critical sensor issues',
      triggerSeverity: ['medium', 'low'],
      enabled: true,
      activations: 156,
      steps: [
        {
          level: 1,
          delay: 0,
          notifyUsers: ['Maintenance Team'],
          notifyGroups: [],
          channels: ['email', 'app'],
        },
        {
          level: 2,
          delay: 60,
          notifyUsers: ['Facilities Manager'],
          notifyGroups: [],
          channels: ['email', 'app'],
        },
      ],
    },
    {
      id: '4',
      name: 'Fire Safety Alert',
      description: 'Fire detection and smoke alarm escalation',
      triggerSeverity: ['critical'],
      enabled: true,
      activations: 2,
      steps: [
        {
          level: 1,
          delay: 0,
          notifyUsers: ['Fire Safety Team', 'Security Team'],
          notifyGroups: ['Emergency Services'],
          channels: ['phone', 'sms', 'app'],
        },
        {
          level: 2,
          delay: 2,
          notifyUsers: ['Building Manager', 'Operations Director'],
          notifyGroups: ['Executive Team', 'All Staff'],
          channels: ['phone', 'sms', 'app'],
        },
      ],
    },
  ]);

  const togglePathStatus = (pathId: string) => {
    setPaths(paths.map(path => 
      path.id === pathId ? { ...path, enabled: !path.enabled } : path
    ));
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="size-3" />;
      case 'sms':
        return <MessageSquare className="size-3" />;
      case 'phone':
        return <Phone className="size-3" />;
      case 'app':
        return <Users className="size-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Escalation Paths</h2>
          <p className="text-gray-600 mt-1">Define notification workflows and escalation procedures</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="size-4" />
          <span>Create Path</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="size-5 text-blue-600" />
            <span className="text-sm text-gray-600">Total Paths</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{paths.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="size-5 text-green-600" />
            <span className="text-sm text-gray-600">Active Paths</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{paths.filter(p => p.enabled).length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-5 text-orange-600" />
            <span className="text-sm text-gray-600">Total Steps</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">{paths.reduce((sum, p) => sum + p.steps.length, 0)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-5 text-purple-600" />
            <span className="text-sm text-gray-600">Activations (30d)</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{paths.reduce((sum, p) => sum + p.activations, 0)}</p>
        </div>
      </div>

      {/* Escalation Paths List */}
      <div className="space-y-4">
        {paths.map(path => (
          <div key={path.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Path Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <GitBranch className={`size-5 ${path.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
                  <h3 className="font-semibold text-gray-900">{path.name}</h3>
                  <button
                    onClick={() => togglePathStatus(path.id)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      path.enabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        path.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Triggers: {path.triggerSeverity.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}</span>
                  <span>•</span>
                  <span>{path.steps.length} escalation levels</span>
                  <span>•</span>
                  <span>{path.activations} activations (30d)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="size-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            {/* Escalation Steps */}
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              <div className="space-y-4">
                {path.steps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Step indicator */}
                    <div className="absolute -left-[2.1rem] top-1 size-6 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{step.level}</span>
                    </div>

                    {/* Step content */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {step.delay === 0 ? 'Immediate' : `After ${step.delay} minutes`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {step.channels.map(channel => (
                            <div
                              key={channel}
                              className="p-1 bg-white rounded border border-gray-300 text-gray-600"
                              title={channel}
                            >
                              {getChannelIcon(channel)}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 font-medium">Users:</span>
                          <div className="mt-1 space-y-1">
                            {step.notifyUsers.map((user, i) => (
                              <div key={i} className="text-gray-700 flex items-center gap-1">
                                <ArrowRight className="size-3 text-gray-400" />
                                {user}
                              </div>
                            ))}
                          </div>
                        </div>
                        {step.notifyGroups.length > 0 && (
                          <div>
                            <span className="text-gray-600 font-medium">Groups:</span>
                            <div className="mt-1 space-y-1">
                              {step.notifyGroups.map((group, i) => (
                                <div key={i} className="text-gray-700 flex items-center gap-1">
                                  <ArrowRight className="size-3 text-gray-400" />
                                  {group}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
