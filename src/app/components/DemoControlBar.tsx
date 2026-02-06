import { Language, translations } from '../translations';

interface DemoControlBarProps {
  language: Language;
  emergencyMode: false | 'incident' | 'emergency';
  onToggleEmergency: (mode: false | 'incident' | 'emergency') => void;
}

export function DemoControlBar({ language, emergencyMode, onToggleEmergency }: DemoControlBarProps) {
  const t = translations[language];

  return (
    <div className="bg-blue-50 border-b border-blue-100 px-6 py-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center shadow-sm shadow-blue-500/30">
              <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-blue-900">
              {language === 'en' ? 'Demo Instance' : 'نسخة تجريبية'}
            </span>
          </div>
          <div className="h-3 w-px bg-blue-200"></div>
          <span className="text-xs text-blue-700">
            {language === 'en' ? 'All data is simulated' : 'جميع البيانات محاكاة'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-700 font-medium">
            {language === 'en' ? 'Demo Mode:' : 'وضع التجربة:'}
          </span>
          <div className="flex items-center gap-1.5 bg-white rounded-md p-0.5 shadow-sm border border-gray-200">
            <button
              onClick={() => onToggleEmergency(false)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${ 
                emergencyMode === false
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className={`size-2 rounded-full ${emergencyMode === false ? 'bg-white' : 'bg-green-500'}`}></div>
              {language === 'en' ? 'Normal State' : 'حالة عادية'}
            </button>
            <button
              onClick={() => onToggleEmergency('incident')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${ 
                emergencyMode === 'incident'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className={`size-2 rounded-full ${emergencyMode === 'incident' ? 'bg-white' : 'bg-orange-500'}`}></div>
              {language === 'en' ? 'Active Alarm' : 'إنذار نشط'}
            </button>
            <button
              onClick={() => onToggleEmergency('emergency')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${ 
                emergencyMode === 'emergency'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className={`size-2 rounded-full ${emergencyMode === 'emergency' ? 'bg-white' : 'bg-red-500'}`}></div>
              {language === 'en' ? 'Emergency' : 'الطوارئ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}