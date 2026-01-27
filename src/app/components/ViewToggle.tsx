import { LayoutGrid, Building2, AlertTriangle, MapPin } from 'lucide-react';
import { Language, translations } from '../translations';

export type ViewMode = 'dashboard' | 'architectural';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  buildingName?: string;
  language: Language;
  emergencyMode?: boolean;
  onOpenArchitecturalView?: () => void; // New prop for opening the modal
}

export function ViewToggle({ viewMode, onViewModeChange, buildingName, language, emergencyMode, onOpenArchitecturalView }: ViewToggleProps) {
  const t = translations[language];
  const defaultBuildingName = language === 'en' ? 'Bunker Alpha-7' : 'المخبأ ألفا-7';
  
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Building Name on the left */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900">{buildingName || defaultBuildingName}</h1>
            {!emergencyMode && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md border border-green-200 shadow-sm">
                <div className="size-1.5 rounded-full bg-green-600"></div>
                {language === 'en' ? 'Operational' : 'عملياتي'}
              </span>
            )}
            {emergencyMode && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-md uppercase tracking-wide shadow-md border border-red-800">
                <AlertTriangle className="size-3" />
                <span>{language === 'en' ? 'Under Attack' : 'تحت هجوم'}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
            <MapPin className="size-3.5" />
            <span>{language === 'en' ? 'Sector 12, Underground Level 3' : 'القطاع 12، المستوى الجوفي 3'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}