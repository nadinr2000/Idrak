import { MapPin, AlertTriangle, LayoutGrid } from 'lucide-react';
import { Language } from '../translations';

interface EmergencyHeaderProps {
  language: Language;
  onOpenArchitecturalView?: () => void;
}

export function EmergencyHeader({ language, onOpenArchitecturalView }: EmergencyHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Facility Info */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-900">
                {language === 'en' ? 'Site' : 'الموقع'}
              </h2>
              {/* Under Attack Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-md uppercase tracking-wide shadow-md border border-red-800">
                <AlertTriangle className="size-3" />
                <span>{language === 'en' ? 'Threat Detected' : 'تم اكتشاف تهديد'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
              <MapPin className="size-3.5" />
              <span>{language === 'en' ? 'Sector 12, Underground Level 3' : 'القطاع 12، المستوى الجوفي 3'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}