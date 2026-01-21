import { LayoutDashboard, Zap, Menu, BellRing, ChevronDown, ChevronRight, Target, Layout, AlertTriangle, Building2, DoorOpen, Activity, Wrench, Shield } from 'lucide-react';
import { MainSection } from '../App';
import { Language, translations } from '../translations';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  currentSection: MainSection;
  onSectionChange: (section: MainSection) => void;
  onToggle: () => void;
  language: Language;
}

export function Sidebar({ isOpen, currentSection, onSectionChange, onToggle, language }: SidebarProps) {
  const t = translations[language];

  const menuItems = [
    {
      section: 'dashboard' as MainSection,
      icon: LayoutDashboard,
      label: t.dashboards,
      description: t.dashboardsDesc,
    },
    {
      section: 'incidents' as MainSection,
      icon: AlertTriangle,
      label: t.incidents || 'Incidents',
      description: t.incidentsMenuDesc || 'Monitor and manage active facility incidents',
    },
    {
      section: 'cbrne-attacks' as MainSection,
      icon: Shield,
      label: language === 'en' ? 'CBRNe Attacks' : 'هجمات CBRNe',
      description: language === 'en' ? 'View previous attack reports' : 'عرض تقارير الهجمات السابقة',
    },
  ];

  const buildingItems = [
    {
      section: 'facility-floors' as MainSection,
      icon: Building2,
      label: language === 'en' ? 'Floors' : 'الطوابق',
      description: language === 'en' ? 'Manage floor assets' : 'إدارة أصول الطوابق',
    },
    {
      section: 'facility-rooms' as MainSection,
      icon: DoorOpen,
      label: language === 'en' ? 'Rooms' : 'الغرف',
      description: language === 'en' ? 'Manage room assets' : 'إدارة أصول الغرف',
    },
    {
      section: 'facility-sensors' as MainSection,
      icon: Activity,
      label: language === 'en' ? 'Sensors' : 'المستشعرات',
      description: language === 'en' ? 'Manage sensor assets' : 'إدارة أصول المستشعرات',
    },
    {
      section: 'facility-equipment' as MainSection,
      icon: Wrench,
      label: language === 'en' ? 'Equipment' : 'المعدات',
      description: language === 'en' ? 'Manage equipment assets' : 'إدارة أصول المعدات',
    },
  ];

  const stressTestsItems = [
    {
      section: 'tactical-cases' as MainSection,
      icon: Target,
      label: t.tacticalThreatDrills || 'Tactical Threat Drills',
      description: t.tacticalThreatDrillsDesc || 'Simulate emergency drills',
    },
    {
      section: 'layout-tests' as MainSection,
      icon: Layout,
      label: t.layoutTests || 'New Floor Layout/Devices',
      description: t.layoutTestsDesc || 'Test infrastructure changes before deployment',
    }
  ];

  const configurationItems = [
    {
      section: 'automation' as MainSection,
      icon: Zap,
      label: t.automation,
      description: t.automationDesc,
    },
    {
      section: 'alarms' as MainSection,
      icon: BellRing,
      label: t.alarms,
      description: t.alarmsDesc,
    },
  ];

  const [isSystemStatusOpen, setIsSystemStatusOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 ${
          isOpen ? 'w-72' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Toggle Button */}
          <div className="p-4 border-b border-gray-200 flex justify-center">
            <button 
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="size-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Main Section */}
            <div>
              {isOpen && <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${language === 'ar' ? 'text-right' : ''}`}>{t.main}</h3>}
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <NavItem
                    key={item.section}
                    item={item}
                    isActive={currentSection === item.section}
                    isCollapsed={!isOpen}
                    onClick={() => onSectionChange(item.section)}
                    language={language}
                  />
                ))}
              </div>
            </div>

            {/* Stress Tests Section */}
            <div>
              {isOpen && <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${language === 'ar' ? 'text-right' : ''}`}>{t.stressTests || 'Stress Tests'}</h3>}
              <div className="space-y-1">
                {stressTestsItems.map((item) => (
                  <NavItem
                    key={item.section}
                    item={item}
                    isActive={currentSection === item.section}
                    isCollapsed={!isOpen}
                    onClick={() => onSectionChange(item.section)}
                    language={language}
                  />
                ))}
              </div>
            </div>

            {/* Facility Section */}
            <div>
              {isOpen && <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${language === 'ar' ? 'text-right' : ''}`}>{t.facility || 'Facility'}</h3>}
              <div className="space-y-1">
                {buildingItems.map((item) => (
                  <NavItem
                    key={item.section}
                    item={item}
                    isActive={currentSection === item.section}
                    isCollapsed={!isOpen}
                    onClick={() => onSectionChange(item.section)}
                    language={language}
                  />
                ))}
              </div>
            </div>

            {/* Configuration Section */}
            <div>
              {isOpen && <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${language === 'ar' ? 'text-right' : ''}`}>{t.configuration}</h3>}
              <div className="space-y-1">
                {configurationItems.map((item) => (
                  <NavItem
                    key={item.section}
                    item={item}
                    isActive={currentSection === item.section}
                    isCollapsed={!isOpen}
                    onClick={() => onSectionChange(item.section)}
                    language={language}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          {isOpen && (
            <div className={`p-4 border-t border-gray-200 bg-gray-50 space-y-3 ${language === 'ar' ? 'text-right' : ''}`}>
              <div className="text-xs text-gray-600">
                <div className="font-semibold text-gray-900 mb-1">{t.version} 2.4.1</div>
                <div className="text-gray-500">{t.released} {language === 'en' ? 'Jan 2026' : 'يناير 2026'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function NavItem({ item, isActive, isCollapsed, onClick, language }: any) {
  const Icon = item.icon;

  if (isCollapsed) {
    return (
      <button
        onClick={onClick}
        className={`w-full p-2 rounded-lg transition-colors flex items-center justify-center ${
          isActive
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        title={item.label}
      >
        <Icon className="size-4" />
      </button>
    );
  }

  const isRTL = language === 'ar';

  // Regular item without sub-items
  if (!item.hasSubItems) {
    return (
      <button
        onClick={onClick}
        className={`w-full p-3 rounded-lg transition-colors flex items-start gap-3 ${
          isActive
            ? 'bg-blue-50 text-blue-600 border border-blue-200'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="size-5 mt-0.5 flex-shrink-0" />
        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="font-medium">{item.label}</div>
          <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
        </div>
      </button>
    );
  }

  // Item with sub-items
  return (
    <div>
      <button
        onClick={onSubItemClick}
        className={`w-full p-3 rounded-lg transition-colors flex items-start gap-3 ${
          isActive
            ? 'bg-blue-50 text-blue-600 border border-blue-200'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="size-5 mt-0.5 flex-shrink-0" />
        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="font-medium">{item.label}</div>
          <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
        </div>
        <ChevronDown className={`size-4 ${isSubItemExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isSubItemExpanded && (
        <div className="pl-5">
          {item.subItems.map((subItem: any) => (
            <button
              key={subItem.section}
              onClick={() => onSectionChange(subItem.section)}
              className={`w-full p-3 rounded-lg transition-colors flex items-start gap-3 ${
                currentSection === subItem.section
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <subItem.icon className="size-5 mt-0.5 flex-shrink-0" />
              <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="font-medium">{subItem.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{subItem.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}