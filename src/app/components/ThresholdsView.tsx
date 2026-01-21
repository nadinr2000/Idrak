import { Gauge, Save } from 'lucide-react';

export function ThresholdsView() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Sensor Thresholds</h2>
        <p className="text-gray-600 mt-1">Configure alert thresholds for sensor types</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Gauge className="size-5 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Temperature</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min (°C)</label>
                <input type="number" defaultValue="18" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max (°C)</label>
                <input type="number" defaultValue="26" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Critical Low (°C)</label>
                <input type="number" defaultValue="15" className="w-full px-4 py-2 border border-red-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Critical High (°C)</label>
                <input type="number" defaultValue="30" className="w-full px-4 py-2 border border-red-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Gauge className="size-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Humidity</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min (%)</label>
                <input type="number" defaultValue="30" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max (%)</label>
                <input type="number" defaultValue="70" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Critical Low (%)</label>
                <input type="number" defaultValue="20" className="w-full px-4 py-2 border border-red-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Critical High (%)</label>
                <input type="number" defaultValue="80" className="w-full px-4 py-2 border border-red-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* CO2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Gauge className="size-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">CO2 Levels</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Normal (ppm)</label>
                <input type="number" defaultValue="800" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warning (ppm)</label>
                <input type="number" defaultValue="1000" className="w-full px-4 py-2 border border-yellow-300 rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Critical (ppm)</label>
                <input type="number" defaultValue="1500" className="w-full px-4 py-2 border border-red-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Occupancy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Gauge className="size-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Occupancy</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity</label>
                <input type="number" defaultValue="50" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warning Level (%)</label>
                <input type="number" defaultValue="80" className="w-full px-4 py-2 border border-yellow-300 rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Critical Level (%)</label>
                <input type="number" defaultValue="95" className="w-full px-4 py-2 border border-red-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2">
          <Save className="size-5" />
          Save Thresholds
        </button>
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}