import { Settings, Save, Globe, Palette, Clock } from 'lucide-react';

export function PreferencesView() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">System Preferences</h2>
        <p className="text-gray-600 mt-1">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="size-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Regional Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (CET)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="size-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Display Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Light Mode</option>
                <option>Dark Mode</option>
                <option>Auto (System)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Celsius (°C)</option>
                <option>Fahrenheit (°F)</option>
                <option>Kelvin (K)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Compact View</p>
                <p className="text-sm text-gray-600">Show more data in less space</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="size-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Data Retention</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sensor Data History</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>30 days</option>
                <option>90 days</option>
                <option>180 days</option>
                <option>1 year</option>
                <option>Forever</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Incident Logs</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>90 days</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>Forever</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Recordings</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>7 days</option>
                <option>14 days</option>
                <option>30 days</option>
                <option>60 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Maintenance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="size-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">System Maintenance</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-Update</p>
                <p className="text-sm text-gray-600">Automatically install system updates</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Backup Enabled</p>
                <p className="text-sm text-gray-600">Daily automatic backups</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Window</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>02:00 - 04:00 AM</option>
                <option>04:00 - 06:00 AM</option>
                <option>12:00 - 02:00 AM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Advanced Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit</label>
              <input
                type="number"
                defaultValue="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Requests per hour</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sensor Polling Interval</label>
              <input
                type="number"
                defaultValue="60"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Seconds</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Users</label>
              <input
                type="number"
                defaultValue="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Active sessions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <Save className="size-5" />
          Save Preferences
        </button>
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Reset to Defaults
        </button>
        <button className="px-6 py-2.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium ml-auto">
          Export Configuration
        </button>
      </div>
    </div>
  );
}
