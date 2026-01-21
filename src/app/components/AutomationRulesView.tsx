import { Zap, Plus, Edit, Trash2, Play, Pause, CheckCircle2 } from 'lucide-react';
import { automationRules } from '../data/mockData';

export function AutomationRulesView() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Automation Rules</h2>
          <p className="text-gray-600 mt-1">Manage rule-based and AI-powered automation actions</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
          <Plus className="size-5" />
          Create New Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Total Rules</p>
          <p className="text-3xl font-bold text-gray-900">{automationRules.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Active Rules</p>
          <p className="text-3xl font-bold text-green-600">{automationRules.filter(r => r.enabled).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Total Executions</p>
          <p className="text-3xl font-bold text-gray-900">{automationRules.reduce((sum, r) => sum + r.executions, 0)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Success Rate</p>
          <p className="text-3xl font-bold text-green-600">98.7%</p>
        </div>
      </div>

      {/* Rules List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Rule Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Trigger</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Executions</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Last Triggered</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {automationRules.map(rule => (
              <tr key={rule.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Zap className="size-5 text-yellow-600" />
                    <span className="font-medium text-gray-900">{rule.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{rule.trigger}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{rule.action}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">{rule.executions}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {Math.floor((Date.now() - rule.lastTriggered.getTime()) / 60000)}m ago
                </td>
                <td className="px-6 py-4">
                  {rule.enabled ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 className="size-3" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Pause className="size-3" />
                      Disabled
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Edit">
                      <Edit className="size-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors" title={rule.enabled ? "Pause" : "Activate"}>
                      {rule.enabled ? <Pause className="size-4 text-gray-600" /> : <Play className="size-4 text-gray-600" />}
                    </button>
                    <button className="p-1 hover:bg-red-100 rounded transition-colors" title="Delete">
                      <Trash2 className="size-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}