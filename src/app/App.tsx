import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DemoControlBar } from './components/DemoControlBar';
import { EmergencyBar } from './components/EmergencyBar';
import { Navigation } from './components/Navigation';
import { ViewToggle, ViewMode } from './components/ViewToggle';
import { EmergencyHeader } from './components/EmergencyHeader';
import { ArchitecturalViewModal } from './components/ArchitecturalViewModal';
import { NewFloorSetupView } from './components/NewFloorSetupView';
import { FloorSetupListView } from './components/FloorSetupListView';
import { EquipmentDashboard } from './components/EquipmentDashboard';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { SummaryDashboard } from './components/SummaryDashboard';
import { EmergencyDashboard } from './components/EmergencyDashboard';
import { BuildingsDashboard } from './components/BuildingsDashboard';
import { IncidentsDashboard } from './components/IncidentsDashboard';
import { SensorsDashboard } from './components/SensorsDashboard';
import { MapView } from './components/MapView';
import { FloorPlanView } from './components/FloorPlanView';
import { FloorRoomsListView } from './components/FloorRoomsListView';
import { RoomView } from './components/RoomView';
import { SensorDetailView } from './components/SensorDetailView';
import { IncidentDetailView } from './components/IncidentDetailView';
import { AutomationRulesView } from './components/AutomationRulesView';
import { RoomsDashboard } from './components/RoomsDashboard';
import { CBRNeAttacksView } from './components/CBRNeAttacksView';
import { TacticalCasesView } from './components/TacticalCasesView';
import { DraftScenarioView } from './components/DraftScenarioView';
import { ScenarioDetailView } from './components/ScenarioDetailView';
import { ThresholdsView } from './components/ThresholdsView';
import { AlarmsSetupView } from './components/AlarmsSetupView';
import { EscalationPathsView } from './components/EscalationPathsView';
import { UsersView } from './components/UsersView';
import { NotificationsView } from './components/NotificationsView';
import { PreferencesView } from './components/PreferencesView';
import { Language } from './translations';
import { rooms } from '@/app/data/mockData';
import { getRoomById } from '@/app/data/roomsData';
import { ViewLevel, MainSection, Building, Incident, AffectedSensor } from './types';

// IDRAK Building Management System - Main Application Entry Point  
// Enhanced with emergency mode and architectural visualization
export type { ViewLevel, MainSection, Building, Incident, AffectedSensor };

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<MainSection>('dashboard');
  const [currentView, setCurrentView] = useState<ViewLevel>('summary');
  const [viewMode, setViewMode] = useState<ViewMode>('architectural');
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [selectedDrill, setSelectedDrill] = useState<string | null>(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<string | null>(null);
  const [isCreatingFloorPlan, setIsCreatingFloorPlan] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [emergencyMode, setEmergencyMode] = useState<false | 'incident' | 'emergency'>(false);
  const [architecturalViewOpen, setArchitecturalViewOpen] = useState(false);
  const [simulationState, setSimulationState] = useState<{
    drillName: string;
    isRunning: boolean;
    isPaused: boolean;
    currentTime: number;
    speed: 1 | 2 | 4;
  } | null>(null);
  const [caseStatuses, setCaseStatuses] = useState<{ [caseId: string]: 'draft' | 'active' | 'completed' | 'archived' }>({
    '1': 'completed',
    '2': 'completed',
    '3': 'draft',
  });
  const [summaryViewKey, setSummaryViewKey] = useState(0); // Force remount of summary view

  // When simulation starts, navigate to Dashboards tab
  const handleSimulationStateChange = (state: typeof simulationState) => {
    setSimulationState(state);
    if (state && state.isRunning) {
      // Navigate to Dashboards tab and Emergency Dashboard when simulation starts
      setCurrentSection('dashboard');
      setCurrentView('emergency');
      // Don't clear selectedScenario here anymore, we need it to update case status on close
    } else if (state === null && selectedDrill) {
      // Simulation closed - update case status
      handleCaseStatusUpdate(selectedDrill, 'active'); // Set to 'active' (ongoing)
      // Navigate back to tactical cases view, keep the scenario selected
      setCurrentSection('tactical-cases');
      // Don't clear selectedScenario - keep it to show the case detail view
    }
  };

  // Handle case status updates
  const handleCaseStatusUpdate = (caseId: string, newStatus: 'draft' | 'active' | 'completed' | 'archived') => {
    setCaseStatuses(prev => ({
      ...prev,
      [caseId]: newStatus
    }));
  };

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync demo mode across browser tabs using localStorage
  useEffect(() => {
    // Load initial state from localStorage
    const savedMode = localStorage.getItem('idrak-demo-mode');
    if (savedMode && (savedMode === 'false' || savedMode === 'incident' || savedMode === 'emergency')) {
      setEmergencyMode(savedMode === 'false' ? false : savedMode as 'incident' | 'emergency');
    }

    // Listen for changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'idrak-demo-mode' && e.newValue) {
        const newMode = e.newValue;
        if (newMode === 'false' || newMode === 'incident' || newMode === 'emergency') {
          setEmergencyMode(newMode === 'false' ? false : newMode as 'incident' | 'emergency');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save demo mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('idrak-demo-mode', String(emergencyMode));
  }, [emergencyMode]);

  // Auto-switch to Emergency Dashboard when emergency mode is activated
  useEffect(() => {
    if (emergencyMode && currentSection === 'dashboard') {
      setCurrentView('emergency');
      // In emergency mode, also set a default floor for quick access
      if (!selectedFloor) {
        setSelectedFloor('floor-a-2'); // Default to Operations Level (Floor 2)
      }
    } else if (!emergencyMode && currentView === 'emergency') {
      // When emergency mode ends, return to summary
      setCurrentView('summary');
    }
  }, [emergencyMode]);

  // Update simulation timer
  useEffect(() => {
    if (!simulationState || !simulationState.isRunning || simulationState.isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setSimulationState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentTime: prev.currentTime + prev.speed
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [simulationState?.isRunning, simulationState?.isPaused, simulationState?.speed]);

  const navigateToFloor = (floorId: string) => {
    setSelectedFloor(floorId);
    setCurrentView('floor');
  };

  const navigateToRoom = (roomId: string) => {
    setSelectedRoom(roomId);
    setCurrentView('room');
    
    // Find the room and set its floor as selected too (for breadcrumbs)
    // Try centralized room data first (for FloorPlanView room IDs like F2-R1)
    let room = getRoomById(roomId);
    
    // If not found, try mockData rooms (for legacy IDs like room-a-101)
    if (!room) {
      room = rooms.find(r => r.id === roomId);
    }
    
    if (room && room.floorId) {
      setSelectedFloor(room.floorId);
    }
  };

  const navigateToIncident = (incidentId: string) => {
    setSelectedIncident(incidentId);
    setCurrentView('incident');
  };

  const navigateToSensor = (sensorId: string) => {
    setSelectedSensor(sensorId);
    setCurrentView('sensor');
  };

  const navigateBack = (level: ViewLevel) => {
    setCurrentView(level);
    if (level === 'summary' || level === 'floors' || level === 'incidents' || level === 'sensors' || level === 'map') {
      setSelectedFloor(null);
      setSelectedRoom(null);
      setSelectedIncident(null);
      setSelectedSensor(null);
    } else if (level === 'floor') {
      setSelectedRoom(null);
      setSelectedIncident(null);
      setSelectedSensor(null);
    } else if (level === 'room') {
      setSelectedIncident(null);
      setSelectedSensor(null);
    } else if (level === 'incident') {
      setSelectedSensor(null);
    }
  };

  const handleSectionChange = (section: MainSection) => {
    setCurrentSection(section);
    if (section === 'dashboard') {
      setCurrentView('summary');
      setSummaryViewKey(prev => prev + 1); // Increment to force remount
    }
    // Reset selections when changing sections
    setSelectedFloor(null);
    setSelectedRoom(null);
    setSelectedIncident(null);
    setSelectedSensor(null);
  };

  const handleNavigate = (level: ViewLevel) => {
    setCurrentView(level);
    
    if (level === 'summary' || level === 'floors' || level === 'incidents' || level === 'sensors' || level === 'map') {
      setSelectedFloor(null);
      setSelectedRoom(null);
      setSelectedIncident(null);
      setSelectedSensor(null);
    } else if (level === 'floor') {
      setSelectedRoom(null);
      setSelectedIncident(null);
      setSelectedSensor(null);
    } else if (level === 'room') {
      setSelectedIncident(null);
      setSelectedSensor(null);
    } else if (level === 'incident') {
      setSelectedSensor(null);
    }
  };

  const renderContent = () => {
    // Configuration/Settings sections
    if (currentSection === 'automation') {
      return <AutomationRulesView />;
    }
    if (currentSection === 'facility-floors') {
      // Show the same floors list view as when clicking from dashboard
      return (
        <FloorRoomsListView
          onFloorClick={navigateToFloor}
          onBack={() => {
            setCurrentSection('dashboard');
            setCurrentView('summary');
          }}
          language={language}
        />
      );
    }
    if (currentSection === 'facility-rooms') {
      // Show Rooms Dashboard with all rooms
      return (
        <RoomsDashboard
          onRoomClick={navigateToRoom}
          language={language}
        />
      );
    }
    if (currentSection === 'facility-sensors') {
      return (
        <SensorsDashboard
          onSensorClick={navigateToSensor}
          onNavigateToSummary={() => {
            setCurrentSection('dashboard');
            setCurrentView('summary');
          }}
          onNavigateToBuildings={() => {
            setCurrentSection('dashboard');
            setCurrentView('floors');
          }}
          onNavigateToIncidents={() => {
            setCurrentSection('incidents');
          }}
        />
      );
    }
    if (currentSection === 'facility-equipment') {
      return <EquipmentDashboard language={language} />;
    }
    if (currentSection === 'incidents') {
      // If an incident is selected, show detail view
      if (selectedIncident) {
        return (
          <IncidentDetailView
            incidentId={selectedIncident}
            onSensorClick={navigateToSensor}
            onBack={() => {
              setSelectedIncident(null);
              setCurrentView('incidents');
            }}
          />
        );
      }
      // Otherwise show incidents list
      return (
        <IncidentsDashboard
          language={language}
          onIncidentClick={navigateToIncident}
          onNavigateToSummary={() => {
            setCurrentSection('dashboard');
            setCurrentView('summary');
          }}
          onNavigateToBuildings={() => {
            setCurrentSection('dashboard');
            setCurrentView('floors');
          }}
        />
      );
    }
    if (currentSection === 'cbrne-attacks') {
      return <CBRNeAttacksView language={language} />;
    }
    if (currentSection === 'tactical-cases') {
      if (selectedDrill) {
        // Check if scenario is draft based on caseStatuses
        if (caseStatuses[selectedDrill] === 'draft') {
          return (
            <DraftScenarioView 
              scenarioId={selectedDrill} 
              language={language}
              onBack={() => setSelectedDrill(null)}
              onEmergencyModeChange={setEmergencyMode}
              onSimulationStateChange={handleSimulationStateChange}
              onCloseSidebar={() => setSidebarOpen(false)}
            />
          );
        }
        return (
          <ScenarioDetailView 
            scenarioId={selectedDrill} 
            language={language}
            onBack={() => setSelectedDrill(null)}
            onEmergencyModeChange={setEmergencyMode}
            onSimulationStateChange={handleSimulationStateChange}
            caseStatus={caseStatuses[selectedDrill]}
          />
        );
      }
      return (
        <TacticalCasesView 
          language={language}
          onDrillClick={(drillId) => setSelectedDrill(drillId)}
          caseStatuses={caseStatuses}
          onCaseStatusUpdate={handleCaseStatusUpdate}
          emergencyMode={emergencyMode}
          onStartSimulation={(caseId, caseName) => {
            // Set simulation state
            setSimulationState({
              drillName: caseName,
              isRunning: true,
              isPaused: false,
              currentTime: 0,
              speed: 1,
            });
            // Activate emergency mode
            setEmergencyMode('emergency');
            // Navigate to emergency dashboard
            setCurrentSection('dashboard');
            setCurrentView('emergency');
            // Store the selected drill ID for status updates
            setSelectedDrill(caseId);
          }}
        />
      );
    }
    if (currentSection === 'layout-tests') {
      // Show editor view if creating new or editing existing floor plan
      if (isCreatingFloorPlan || selectedFloorPlan) {
        return (
          <NewFloorSetupView
            language={language}
            planId={selectedFloorPlan}
            onBack={() => {
              setIsCreatingFloorPlan(false);
              setSelectedFloorPlan(null);
            }}
          />
        );
      }
      // Otherwise show list view
      return (
        <FloorSetupListView
          language={language}
          onCreateNew={() => setIsCreatingFloorPlan(true)}
          onEditPlan={(planId) => setSelectedFloorPlan(planId)}
        />
      );
    }
    if (currentSection === 'thresholds') {
      return <ThresholdsView />;
    }
    if (currentSection === 'alarms') {
      return <AlarmsSetupView />;
    }
    if (currentSection === 'escalation') {
      return <EscalationPathsView />;
    }
    if (currentSection === 'users') {
      return <UsersView />;
    }
    if (currentSection === 'notifications') {
      return <NotificationsView />;
    }
    if (currentSection === 'preferences') {
      return <PreferencesView />;
    }

    // Dashboard views with drill-down
    if (currentView === 'summary') {
      return (
        <SummaryDashboard
          key={summaryViewKey} // Force remount of summary view
          viewMode={viewMode}
          onNavigateToFloors={() => setCurrentView('floors')}
          onNavigateToIncidents={() => setCurrentView('incidents')}
          onNavigateToSensors={() => setCurrentView('sensors')}
          onFloorClick={navigateToFloor}
          onIncidentClick={navigateToIncident}
          language={language}
          emergencyMode={emergencyMode}
          currentSection={currentSection}
          summaryViewKey={summaryViewKey}
        />
      );
    }
    if (currentView === 'emergency') {
      // In emergency mode, go directly to floor view (Operations Level)
      if (viewMode === 'architectural') {
        return (
          <FloorPlanView
            floorId={'floor-a-2'} // Operations Level where emergency is happening
            onRoomClick={navigateToRoom}
            onIncidentClick={navigateToIncident}
            onBack={() => {
              // In emergency mode, back should go to emergency dashboard
              setCurrentView('summary');
            }}
            emergencyMode={emergencyMode}
            language={language}
          />
        );
      }
      return (
        <EmergencyDashboard
          language={language}
        />
      );
    }
    if (currentView === 'floors') {
      // Dashboard view - show floors list
      return (
        <BuildingsDashboard
          onFloorClick={navigateToFloor}
          language={language}
        />
      );
    }
    if (currentView === 'incidents') {
      return (
        <IncidentsDashboard
          language={language}
          onIncidentClick={navigateToIncident}
          onNavigateToSummary={() => setCurrentView('summary')}
          onNavigateToBuildings={() => setCurrentView('floors')}
        />
      );
    }
    if (currentView === 'sensors') {
      return (
        <SensorsDashboard
          onSensorClick={navigateToSensor}
          onNavigateToSummary={() => setCurrentView('summary')}
          onNavigateToBuildings={() => setCurrentView('floors')}
          onNavigateToIncidents={() => setCurrentView('incidents')}
        />
      );
    }
    if (currentView === 'map') {
      return (
        <MapView
          onBuildingClick={navigateToFloor}
          onClose={() => setCurrentView('floors')}
        />
      );
    }
    if (currentView === 'floor' && selectedFloor) {
      // Show different views based on viewMode
      if (viewMode === 'architectural') {
        return (
          <FloorPlanView
            floorId={selectedFloor}
            onRoomClick={navigateToRoom}
            onIncidentClick={navigateToIncident}
            language={language}
            onBack={() => {
              setSelectedFloor(null);
              setCurrentView('floors');
            }}
            emergencyMode={emergencyMode}
          />
        );
      } else {
        return (
          <FloorRoomsListView
            floorId={selectedFloor}
            onRoomClick={navigateToRoom}
          />
        );
      }
    }
    if (currentView === 'room' && selectedRoom) {
      return (
        <RoomView
          roomId={selectedRoom}
          viewMode={viewMode}
          onIncidentClick={navigateToIncident}
          onSensorClick={navigateToSensor}
        />
      );
    }
    if (currentView === 'sensor' && selectedSensor) {
      return <SensorDetailView sensorId={selectedSensor} />;
    }
    if (currentView === 'incident' && selectedIncident) {
      return (
        <IncidentDetailView
          incidentId={selectedIncident}
          onSensorClick={navigateToSensor}
          onBack={() => {
            setSelectedIncident(null);
            setCurrentView('incidents');
          }}
        />
      );
    }

    return null;
  };

  return (
    <div className={`h-screen flex flex-col ${
      emergencyMode === 'emergency' ? 'bg-red-50' : 'bg-[#f8fafc]'
    }`}>
      {/* Show landing page first */}
      {showLandingPage ? (
        <LandingPage 
          language={language}
          onEnter={() => {
            setShowLandingPage(false);
          }}
        />
      ) : isLoading ? (
        <LoadingScreen language={language} />
      ) : (
        <>
          {/* Demo Control Bar - Always visible at the top */}
          <DemoControlBar 
            language={language}
            emergencyMode={emergencyMode}
            onToggleEmergency={(mode) => {
              setEmergencyMode(mode);
              if (mode === 'emergency') {
                // When switching to Emergency mode, activate emergency dashboard
                setCurrentSection('dashboard');
                setCurrentView('emergency');
              } else if (mode === false) {
                // When switching to Operational mode, stop simulation and return to summary
                setSimulationState(null);
                if (currentView === 'emergency') {
                  setCurrentView('summary');
                }
              }
              // For incident mode, just set the mode without changing views
            }}
          />
          
          {/* Emergency Bar - Shows below demo bar when in emergency mode with simulation active */}
          {emergencyMode === 'emergency' && simulationState && (
            <EmergencyBar
              scenarioName={simulationState.drillName}
              language={language}
              isRunning={simulationState.isRunning}
              isPaused={simulationState.isPaused}
              currentTime={simulationState.currentTime}
              speed={simulationState.speed}
              onTogglePause={() => {
                setSimulationState(prev => prev ? { ...prev, isPaused: !prev.isPaused } : null);
              }}
              onChangeSpeed={() => {
                setSimulationState(prev => {
                  if (!prev) return null;
                  const newSpeed = (prev.speed === 1 ? 2 : prev.speed === 2 ? 4 : 1) as 1 | 2 | 4;
                  return { ...prev, speed: newSpeed };
                });
              }}
              onTimeChange={(seconds: number) => {
                setSimulationState(prev => prev ? { ...prev, currentTime: seconds } : null);
              }}
              onClose={() => {
                setEmergencyMode(false);
                handleSimulationStateChange(null);
              }}
            />
          )}
          
          <TopBar 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
            language={language}
            onLanguageChange={setLanguage}
            emergencyMode={emergencyMode}
          />
          
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              isOpen={sidebarOpen}
              currentSection={currentSection}
              onSectionChange={handleSectionChange}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              language={language}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-auto">
                {renderContent()}
              </div>
            </div>
          </div>

          {/* Architectural View Modal */}
          <ArchitecturalViewModal
            isOpen={architecturalViewOpen}
            onClose={() => setArchitecturalViewOpen(false)}
            language={language}
            emergencyMode={emergencyMode}
          />
        </>
      )}
    </div>
  );
}