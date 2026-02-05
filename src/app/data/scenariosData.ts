export interface Threat {
  id: string;
  type: string;
  severity: string;
  location: string;
  time: string;
  timeValue: number;
  description: string;
}

export interface ScenarioSetup {
  id: string;
  name: string;
  description: string;
  threats: Threat[];
}

export const scenariosData: { [key: string]: { setup: ScenarioSetup } } = {
  '3': {
    setup: {
      id: '3',
      name: 'Chemical Threat Scenario',
      description: 'Chlorine gas breach in HVAC system - Floor 2 Sector B',
      threats: [
        {
          id: 't1',
          type: 'chemical',
          severity: 'critical',
          location: 'Chemical Detector 12',
          time: '0m',
          timeValue: 0,
          description: 'Chlorine gas detected in HVAC system'
        },
        {
          id: 't2',
          type: 'chemical',
          severity: 'high',
          location: 'Chemical Detector 7',
          time: '15m',
          timeValue: 15,
          description: 'Secondary chemical leak detected in adjacent zone'
        },
      ]
    },
  }
};

export function getScenarioThreats(scenarioId: string): Threat[] {
  return scenariosData[scenarioId]?.setup.threats || [];
}
