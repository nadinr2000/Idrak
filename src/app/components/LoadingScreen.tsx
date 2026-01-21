import { Shield, Loader2 } from 'lucide-react';
import { Language } from '../translations';

interface LoadingScreenProps {
  language: Language;
}

export function LoadingScreen({ language }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="size-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
            <Shield className="size-11 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            {language === 'en' ? 'IDRAK' : 'إدراك'}
          </h1>
        </div>

        {/* Loading Spinner */}
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-12 text-blue-400 animate-spin" />
          <p className="text-lg text-slate-300">
            {language === 'en' ? 'Initializing System...' : 'جارٍ تهيئة النظام...'}
          </p>
          
          {/* Loading Steps */}
          <div className="mt-6 space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="size-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              <span>{language === 'en' ? 'Loading sensors data' : 'تحميل بيانات المستشعرات'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span>{language === 'en' ? 'Connecting to HVAC systems' : 'الاتصال بأنظمة التهوية'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span>{language === 'en' ? 'Initializing AI modules' : 'تهيئة وحدات الذكاء الاصطناعي'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span>{language === 'en' ? 'Establishing secure connection' : 'إنشاء اتصال آمن'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
