// IDRAK Building Management System - Type Definitions

export type ViewLevel = 'summary' | 'emergency' | 'floors' | 'incidents' | 'sensors' | 'map' | 'floor' | 'room' | 'incident' | 'sensor';
export type MainSection = 'dashboard' | 'incidents' | 'cbrne-attacks' | 'automation' | 'tactical-cases' | 'layout-tests' | 'thresholds' | 'alarms' | 'escalation' | 'users' | 'notifications' | 'preferences' | 'facility-floors' | 'facility-rooms' | 'facility-sensors' | 'facility-equipment';

export interface Building {
  id: string;
  name: string;
  floors: number;
  sensors: number;
  incidents: number;
  status: 'operational' | 'warning' | 'critical';
}

export interface Incident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  buildingId?: string;
  floorId?: string;
  roomId?: string;
  timestamp: Date;
  status: 'active' | 'resolving' | 'resolved';
  aiPrediction?: string;
  suggestedAction?: string;
  autoActionApplied?: boolean;
  matchedRule?: string;
  ruleAction?: string;
  sensorId?: string;
  affectedSensors?: AffectedSensor[];
}

export interface AffectedSensor {
  id: string;
  name: string;
  location: string;
  floorId: string;
  roomId: string;
  reading: string;
  normalRange: string;
  deviation: string;
  type: string;
}
