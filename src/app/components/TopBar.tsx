import { Bell, User, Menu, Languages, AlertTriangle, Settings, MapPin } from 'lucide-react';
import { Language, translations } from '../translations';

export function TopBar({ onMenuClick, language, onLanguageChange, emergencyMode = false }: { 
  onMenuClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  emergencyMode?: boolean;
}) {
  const t = translations[language];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">{t.appTitle}</h1>
            <p className="text-sm text-gray-500">{t.appSubtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                language === 'en'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                language === 'ar'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              عربي
            </button>
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="size-5 text-gray-600" />
            <span className="absolute top-1 right-1 size-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="size-5 text-gray-600" />
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="size-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
              <User className="size-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{t.admin}</span>
          </button>
        </div>
      </div>
    </div>
  );
}