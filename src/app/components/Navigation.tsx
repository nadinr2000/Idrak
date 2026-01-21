import { Home, Building, Layers, DoorOpen, Activity, Radio, ChevronRight, Filter, Download } from 'lucide-react';
import { ViewLevel } from '../App';
import { rooms, floors } from '../data/mockData';
import { getRoomById } from '../data/roomsData';
import { translations, Language } from '../translations';
import { ViewMode } from './ViewToggle';

interface NavigationProps {
  currentView: ViewLevel;
  selectedFloor: string | null;
  selectedRoom: string | null;
  selectedIncident: string | null;
  selectedSensor: string | null;
  onNavigate: (level: ViewLevel) => void;
  language: Language;
  emergencyMode?: boolean;
  viewMode?: ViewMode;
}

export function Navigation({ currentView, selectedFloor, selectedRoom, selectedIncident, selectedSensor, onNavigate, language, emergencyMode, viewMode }: NavigationProps) {
  const t = translations[language];

  // Build breadcrumbs based on current view
  const breadcrumbs = [];
  
  // Get floor and room names from data
  const floorData = selectedFloor ? floors.find(f => f.id === selectedFloor) : null;
  const roomData = selectedRoom ? getRoomById(selectedRoom) : null;
  
  // Always start with Overview
  const isOnSummary = currentView === 'summary';
  const isOnEmergency = currentView === 'emergency';
  
  // In emergency mode, start with Emergency Dashboard, otherwise start with Facility Overview
  if (emergencyMode) {
    breadcrumbs.push({ 
      level: 'emergency' as ViewLevel, 
      label: language === 'en' ? 'Emergency Dashboard' : 'لوحة الطوارئ', 
      icon: Activity, 
      clickable: !isOnEmergency // Only clickable if we're NOT on emergency
    });
  } else {
    breadcrumbs.push({ 
      level: 'summary' as ViewLevel, 
      label: t.summary, 
      icon: Home, 
      clickable: !isOnSummary // Only clickable if we're NOT on summary
    });
  }

  // Add specific dashboard type if not on summary
  if (currentView === 'floors') {
    breadcrumbs.push({ 
      level: 'floors' as ViewLevel, 
      label: t.floors, 
      icon: Layers,
      clickable: false
    });
  } else if (currentView === 'incidents') {
    breadcrumbs.push({ 
      level: 'incidents' as ViewLevel, 
      label: t.incidents, 
      icon: Activity,
      clickable: false
    });
  } else if (currentView === 'sensors') {
    breadcrumbs.push({ 
      level: 'sensors' as ViewLevel, 
      label: t.sensors, 
      icon: Radio,
      clickable: false
    });
  } else if (currentView === 'map') {
    breadcrumbs.push({ 
      level: 'map' as ViewLevel, 
      label: language === 'en' ? 'Map View' : 'عرض الخريطة', 
      icon: Layers,
      clickable: false
    });
  }

  // Add floor breadcrumb if we're in a floor view
  if (selectedFloor || currentView === 'floor') {
    // Add "Floors" first if not already in breadcrumbs
    if (!breadcrumbs.find(b => b.level === 'floors')) {
      breadcrumbs.push({ 
        level: 'floors' as ViewLevel, 
        label: t.floors, 
        icon: Layers,
        clickable: true
      });
    }
    
    breadcrumbs.push({ 
      level: 'floor' as ViewLevel, 
      label: floorData ? floorData.name : t.floor, 
      icon: Layers,
      clickable: currentView !== 'floor'
    });
  }

  // Add room breadcrumb if we're in a room view
  if (selectedRoom || currentView === 'room') {
    breadcrumbs.push({ 
      level: 'room' as ViewLevel, 
      label: roomData ? roomData.name : t.room, 
      icon: DoorOpen,
      clickable: currentView !== 'room'
    });
  }

  // Add incident breadcrumb if we're viewing an incident
  if (selectedIncident || currentView === 'incident') {
    breadcrumbs.push({ 
      level: 'incident' as ViewLevel, 
      label: selectedIncident ? `${t.incident} ${selectedIncident}` : (language === 'en' ? 'Incident Details' : 'تفاصيل الحادث'), 
      icon: Activity,
      clickable: false
    });
  }

  // Add sensor breadcrumb if we're viewing a sensor
  if (selectedSensor || currentView === 'sensor') {
    breadcrumbs.push({ 
      level: 'sensor' as ViewLevel, 
      label: selectedSensor || (language === 'en' ? 'Sensor Details' : 'تفاصيل المستشعر'), 
      icon: Radio,
      clickable: false
    });
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          {breadcrumbs.map((crumb, index) => {
            const Icon = crumb.icon;
            const isActive = index === breadcrumbs.length - 1;
            const isClickable = crumb.clickable;
            
            return (
              <div key={`${crumb.level}-${index}`} className="flex items-center gap-2">
                <button
                  onClick={() => isClickable && onNavigate(crumb.level)}
                  disabled={!isClickable}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    isActive && !isClickable
                      ? 'bg-blue-50 text-blue-700 font-medium cursor-default border border-blue-200'
                      : isClickable
                      ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      : 'text-gray-600 cursor-default'
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{crumb.label}</span>
                </button>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className={`size-4 text-gray-400 ${language === 'ar' ? 'rotate-180' : ''}`} />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Action Buttons - Hidden in architectural view */}
        {viewMode !== 'architectural' && (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="size-4" />
              <span className="text-sm">{t.filter}</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="size-4" />
              <span className="text-sm">{t.export}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}