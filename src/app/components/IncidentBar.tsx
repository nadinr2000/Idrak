import { AlertTriangle, X } from 'lucide-react';
import { Language, translations } from '../translations';

interface IncidentBarProps {
  language: Language;
  onClose: () => void;
}

export function IncidentBar({ language, onClose }: IncidentBarProps) {
  const t = translations[language];

  return (
    <div className="bg-orange-50 border-b border-orange-200 px-6 py-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-5 bg-orange-500 rounded flex items-center justify-center">
              <AlertTriangle className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-orange-900">
              {language === 'en' ? 'Active Incident Mode' : 'وضع الحادث النشط'}
            </span>
          </div>
          <div className="h-4 w-px bg-orange-300"></div>
          <span className="text-sm text-orange-700">
            {language === 'en' ? 'Monitoring elevated activity - some systems showing warnings' : 'مراقبة النشاط المرتفع - بعض الأنظمة تظهر تحذيرات'}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-orange-100 transition-colors"
          title={language === 'en' ? 'Exit Incident Mode' : 'الخروج من وضع الحادث'}
        >
          <X className="size-4 text-orange-700" />
        </button>
      </div>
    </div>
  );
}
