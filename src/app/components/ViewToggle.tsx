import { LayoutGrid, Building2, AlertTriangle, MapPin, Map } from 'lucide-react';
import { Language, translations } from '../translations';

export type ViewMode = 'dashboard' | 'architectural';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  buildingName?: string;
  language: Language;
  emergencyMode?: false | 'incident' | 'emergency';
  onOpenArchitecturalView?: () => void; // New prop for opening the modal
}

export function ViewToggle({ viewMode, onViewModeChange, buildingName, language, emergencyMode, onOpenArchitecturalView }: ViewToggleProps) {
  const t = translations[language];
  const defaultBuildingName = language === 'en' ? 'Site' : 'الموقع';
  
  // Determine background color based on demo mode for the Site card
  const getCardStyles = () => {
    if (emergencyMode === 'emergency') {
      return 'bg-red-200 border-red-400';
    } else if (emergencyMode === 'incident') {
      return 'bg-orange-200 border-orange-400';
    } else {
      return 'bg-green-200 border-green-400';
    }
  };
  
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Building Name card on the left */}
        <div className={`${getCardStyles()} border rounded-lg px-4 py-3 flex items-center justify-between gap-6`}>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900">{buildingName || defaultBuildingName}</h1>
              {!emergencyMode && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md border border-green-200 shadow-sm">
                  <div className="size-1.5 rounded-full bg-green-600"></div>
                  {language === 'en' ? 'Operational' : 'عملياتي'}
                </span>
              )}
              {emergencyMode === 'incident' && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md uppercase tracking-wide shadow-sm border border-orange-200">
                  <AlertTriangle className="size-3" />
                  <span>{language === 'en' ? 'Active Incident' : 'حادثة نشطة'}</span>
                </div>
              )}
              {emergencyMode === 'emergency' && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md uppercase tracking-wide shadow-sm border border-red-200">
                  <AlertTriangle className="size-3" />
                  <span>{language === 'en' ? 'Threat Detected' : 'تم اكتشاف تهديد'}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
              <MapPin className="size-3.5" />
              <span>{language === 'en' ? 'Sector 12, Underground Level 3' : 'القطاع 12، المستوى الجوفي 3'}</span>
            </div>
          </div>
          
          {/* View Toggle Buttons */}
          <div className="flex items-center bg-white rounded-md shadow-sm border border-gray-300 overflow-hidden">
            <button
              onClick={() => onViewModeChange('dashboard')}
              className={`px-3 py-2 flex items-center justify-center transition-colors ${
                viewMode === 'dashboard'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={language === 'en' ? 'Dashboard View' : 'عرض لوحة القيادة'}
            >
              <LayoutGrid className="size-5" />
            </button>
            <div className="w-px h-6 bg-gray-300" />
            <button
              onClick={() => onViewModeChange('architectural')}
              className={`px-3 py-2 flex items-center justify-center transition-colors ${
                viewMode === 'architectural'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={language === 'en' ? 'Floor Plan View' : 'عرض مخطط الطابق'}
            >
              <Map className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}