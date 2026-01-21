import { Bell, Mail, MessageSquare, Save } from 'lucide-react';

export function NotificationsView() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Notification Settings</h2>
        <p className="text-gray-600 mt-1">Configure alert channels and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="size-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Email Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Critical Incidents</p>
                <p className="text-sm text-gray-600">Immediate email for critical issues</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Daily Summary</p>
                <p className="text-sm text-gray-600">Daily report of system status</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Analytics</p>
                <p className="text-sm text-gray-600">Weekly performance insights</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            </div>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="size-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Critical Alerts</p>
                <p className="text-sm text-gray-600">SMS for urgent incidents</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">System Failures</p>
                <p className="text-sm text-gray-600">Immediate SMS for system down</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="size-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">In-App Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">All Incidents</p>
                <p className="text-sm text-gray-600">Show all incident notifications</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">AI Predictions</p>
                <p className="text-sm text-gray-600">AI-generated insights</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Automation Events</p>
                <p className="text-sm text-gray-600">Auto-action execution notifications</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            </div>
          </div>
        </div>

        {/* Notification Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quiet Hours</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-900">Enable Quiet Hours</p>
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  defaultValue="22:00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Note: Critical alerts will still be sent during quiet hours
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <Save className="size-5" />
          Save Preferences
        </button>
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Test Notifications
        </button>
      </div>
    </div>
  );
}
