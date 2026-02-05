import { Bell, User, Menu, Languages, AlertTriangle, Settings, MapPin, Shield } from 'lucide-react';
import { Language, translations } from '../translations';

export function TopBar({ onMenuClick, language, onLanguageChange, emergencyMode = false, onLogoClick }: { 
  onMenuClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  emergencyMode?: boolean;
  onLogoClick?: () => void;
}) {
  const t = translations[language];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onLogoClick}
            className="size-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Shield className="size-6 text-white" />
          </button>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">{language === 'en' ? 'IDRAK' : 'إدراك'}</h1>
            <p className="text-xs text-gray-500">{t.appSubtitle}</p>
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
            <div className="size-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <User className="size-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{t.admin}</span>
          </button>
        </div>
      </div>
    </div>
  );
}