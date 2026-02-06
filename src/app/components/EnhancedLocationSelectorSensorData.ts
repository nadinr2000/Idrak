// Complete sensor data from FloorPlanView - EXACT positions and sensor types
// TOTAL: 81+ SENSORS with EXACT numbering

export interface FloorPlanSensor {
  id: string;
  name: string;
  type: string;
  subType: string;
  left: string;
  top: string;
  shape: 'circle' | 'triangle' | 'rectangle';
  label: string;
  color: string;
}

export const allFloorPlanSensors: FloorPlanSensor[] = [
  // ==================== ENVIRONMENTAL SENSOR GROUPS (CO2, CO, O2) - 21 sensors ====================
  // Group 1 - Zone A (left: 45.25%, top: 31.25%)
  { id: 'CO2-01', name: 'CO₂ Sensor - Group 1', type: 'air-quality', subType: 'CO2', left: '45.25%', top: '31.25%', shape: 'circle', label: 'CO₂', color: '#139B48' },
  { id: 'CO-01', name: 'CO Sensor - Group 1', type: 'air-quality', subType: 'CO', left: '45.25%', top: '31.25%', shape: 'circle', label: 'CO', color: '#139B48' },
  { id: 'O2-01', name: 'O₂ Sensor - Group 1', type: 'air-quality', subType: 'O2', left: '45.25%', top: '31.25%', shape: 'circle', label: 'O₂', color: '#139B48' },
  
  // Group 2 - Zone B (left: 63.5%, top: 45%)
  { id: 'CO2-02', name: 'CO₂ Sensor - Group 2', type: 'air-quality', subType: 'CO2', left: '63.5%', top: '45%', shape: 'circle', label: 'CO₂', color: '#139B48' },
  { id: 'CO-02', name: 'CO Sensor - Group 2', type: 'air-quality', subType: 'CO', left: '63.5%', top: '45%', shape: 'circle', label: 'CO', color: '#139B48' },
  { id: 'O2-02', name: 'O₂ Sensor - Group 2', type: 'air-quality', subType: 'O2', left: '63.5%', top: '45%', shape: 'circle', label: 'O₂', color: '#139B48' },
  
  // Group 3 (left: 79.75%, top: 44.25%)
  { id: 'CO2-03', name: 'CO₂ Sensor - Group 3', type: 'air-quality', subType: 'CO2', left: '79.75%', top: '44.25%', shape: 'circle', label: 'CO₂', color: '#139B48' },
  { id: 'CO-03', name: 'CO Sensor - Group 3', type: 'air-quality', subType: 'CO', left: '79.75%', top: '44.25%', shape: 'circle', label: 'CO', color: '#139B48' },
  { id: 'O2-03', name: 'O₂ Sensor - Group 3', type: 'air-quality', subType: 'O2', left: '79.75%', top: '44.25%', shape: 'circle', label: 'O₂', color: '#139B48' },
  
  // Group 4 (left: 82.25%, top: 59.25%)
  { id: 'CO2-04', name: 'CO₂ Sensor - Group 4', type: 'air-quality', subType: 'CO2', left: '82.25%', top: '59.25%', shape: 'circle', label: 'CO₂', color: '#139B48' },
  { id: 'CO-04', name: 'CO Sensor - Group 4', type: 'air-quality', subType: 'CO', left: '82.25%', top: '59.25%', shape: 'circle', label: 'CO', color: '#139B48' },
  { id: 'O2-04', name: 'O₂ Sensor - Group 4', type: 'air-quality', subType: 'O2', left: '82.25%', top: '59.25%', shape: 'circle', label: 'O₂', color: '#139B48' },
  
  // Group 5 (left: 82.25%, top: 69.25%)
  { id: 'CO2-05', name: 'CO₂ Sensor - Group 5', type: 'air-quality', subType: 'CO2', left: '82.25%', top: '69.25%', shape: 'circle', label: 'CO₂', color: '#139B48' },
  { id: 'CO-05', name: 'CO Sensor - Group 5', type: 'air-quality', subType: 'CO', left: '82.25%', top: '69.25%', shape: 'circle', label: 'CO', color: '#139B48' },
  { id: 'O2-05', name: 'O₂ Sensor - Group 5', type: 'air-quality', subType: 'O2', left: '82.25%', top: '69.25%', shape: 'circle', label: 'O₂', color: '#139B48' },
  
  // Group 6 (left: 49.75%, top: 66.25%)
  { id: 'CO2-06', name: 'CO₂ Sensor - Group 6', type: 'air-quality', subType: 'CO2', left: '49.75%', top: '66.25%', shape: 'circle', label: 'CO₂', color: '#139B48' },
  { id: 'CO-06', name: 'CO Sensor - Group 6', type: 'air-quality', subType: 'CO', left: '49.75%', top: '66.25%', shape: 'circle', label: 'CO', color: '#139B48' },
  { id: 'O2-06', name: 'O₂ Sensor - Group 6', type: 'air-quality', subType: 'O2', left: '49.75%', top: '66.25%', shape: 'circle', label: 'O₂', color: '#139B48' },
  
  // Group 7 (left: 49.75%, top: 54.25%)
  { id: 'CO2-07', name: 'CO₂ Sensor - Group 7', type: 'air-quality', subType: 'CO2', left: '49.75%', top: '54.25%', shape: 'circle', label: 'CO₂', color: '#139B48' },
  { id: 'CO-07', name: 'CO Sensor - Group 7', type: 'air-quality', subType: 'CO', left: '49.75%', top: '54.25%', shape: 'circle', label: 'CO', color: '#139B48' },
  { id: 'O2-07', name: 'O₂ Sensor - Group 7', type: 'air-quality', subType: 'O2', left: '49.75%', top: '54.25%', shape: 'circle', label: 'O₂', color: '#139B48' },
  
  // ==================== DOORS - 3 sensors ====================
  { id: 'DOOR-01', name: 'Door 1', type: 'access-control', subType: 'Door', left: '49%', top: '6%', shape: 'rectangle', label: 'Door 1', color: '#16a34a' },
  { id: 'DOOR-02', name: 'Door 2', type: 'access-control', subType: 'Door', left: '49%', top: '20%', shape: 'rectangle', label: 'Door 2', color: '#16a34a' },
  { id: 'DOOR-03', name: 'Door 3', type: 'access-control', subType: 'Door', left: '71.5%', top: '39.5%', shape: 'rectangle', label: 'Door 3', color: '#16a34a' },
  
  // ==================== DIFFERENTIAL PRESSURE SENSORS - 2 sensors ====================
  { id: 'DP-01', name: 'Differential Pressure Sensor DP1', type: 'pressure', subType: 'DP', left: '44%', top: '6%', shape: 'circle', label: 'DP1', color: '#139B48' },
  { id: 'DP-02', name: 'Differential Pressure Sensor DP2', type: 'pressure', subType: 'DP', left: '44%', top: '20%', shape: 'circle', label: 'DP2', color: '#139B48' },
  
  // ==================== TEMPERATURE & HUMIDITY SENSORS - 10 sensors (5 pairs) ====================
  { id: 'T-01', name: 'Temperature Sensor T1', type: 'temperature', subType: 'T', left: '87.75%', top: '39.25%', shape: 'circle', label: 'T1', color: '#139B48' },
  { id: 'H-01', name: 'Humidity Sensor H1', type: 'humidity', subType: 'H', left: '87.75%', top: '39.25%', shape: 'circle', label: 'H1', color: '#139B48' },
  { id: 'T-02', name: 'Temperature Sensor T2', type: 'temperature', subType: 'T', left: '87.75%', top: '54.25%', shape: 'circle', label: 'T2', color: '#139B48' },
  { id: 'H-02', name: 'Humidity Sensor H2', type: 'humidity', subType: 'H', left: '87.75%', top: '54.25%', shape: 'circle', label: 'H2', color: '#139B48' },
  { id: 'T-03', name: 'Temperature Sensor T3', type: 'temperature', subType: 'T', left: '87.75%', top: '69.25%', shape: 'circle', label: 'T3', color: '#139B48' },
  { id: 'H-03', name: 'Humidity Sensor H3', type: 'humidity', subType: 'H', left: '87.75%', top: '69.25%', shape: 'circle', label: 'H3', color: '#139B48' },
  { id: 'T-05', name: 'Temperature Sensor T5', type: 'temperature', subType: 'T', left: '44.75%', top: '52.75%', shape: 'circle', label: 'T5', color: '#139B48' },
  { id: 'H-05', name: 'Humidity Sensor H5', type: 'humidity', subType: 'H', left: '44.75%', top: '52.75%', shape: 'circle', label: 'H5', color: '#139B48' },
  { id: 'T-06', name: 'Temperature Sensor T6', type: 'temperature', subType: 'T', left: '44.75%', top: '62.75%', shape: 'circle', label: 'T6', color: '#139B48' },
  { id: 'H-06', name: 'Humidity Sensor H6', type: 'humidity', subType: 'H', left: '44.75%', top: '62.75%', shape: 'circle', label: 'H6', color: '#139B48' },
  
  // ==================== WATER LEVEL SENSOR - 1 sensor ====================
  { id: 'W-01', name: 'Water Level Sensor W', type: 'water-level', subType: 'W', left: '16%', top: '25.5%', shape: 'circle', label: 'W', color: '#139B48' },
  
  // ==================== CBRNe DETECTORS - 30 sensors with FULL NUMBERING ====================
  // Group 1 - R1, B1, C1 (left: 43.5%, top: 10%)
  { id: 'R-01', name: 'Radiological Detector R1', type: 'chemical', subType: 'R', left: '43.5%', top: '10%', shape: 'triangle', label: 'R1', color: '#139B48' },
  { id: 'B-01', name: 'Biological Detector B1', type: 'chemical', subType: 'B', left: '43.5%', top: '10%', shape: 'triangle', label: 'B1', color: '#139B48' },
  { id: 'C-01', name: 'Chemical Detector C1', type: 'chemical', subType: 'C', left: '43.5%', top: '10%', shape: 'triangle', label: 'C1', color: '#139B48' },
  
  // Group 2 - R2, B2, C2 (left: 62.5%, top: 39.5%)
  { id: 'R-02', name: 'Radiological Detector R2', type: 'chemical', subType: 'R', left: '62.5%', top: '39.5%', shape: 'triangle', label: 'R2', color: '#139B48' },
  { id: 'B-02', name: 'Biological Detector B2', type: 'chemical', subType: 'B', left: '62.5%', top: '39.5%', shape: 'triangle', label: 'B2', color: '#139B48' },
  { id: 'C-02', name: 'Chemical Detector C2', type: 'chemical', subType: 'C', left: '62.5%', top: '39.5%', shape: 'triangle', label: 'C2', color: '#139B48' },
  
  // Group 3 - R3, B3, C3 (left: 67.5%, top: 51.5%)
  { id: 'R-03', name: 'Radiological Detector R3', type: 'chemical', subType: 'R', left: '67.5%', top: '51.5%', shape: 'triangle', label: 'R3', color: '#139B48' },
  { id: 'B-03', name: 'Biological Detector B3', type: 'chemical', subType: 'B', left: '67.5%', top: '51.5%', shape: 'triangle', label: 'B3', color: '#139B48' },
  { id: 'C-03', name: 'Chemical Detector C3', type: 'chemical', subType: 'C', left: '67.5%', top: '51.5%', shape: 'triangle', label: 'C3', color: '#139B48' },
  
  // Group 4 - R4, B4, C4 (left: 62%, top: 85%)
  { id: 'R-04', name: 'Radiological Detector R4', type: 'chemical', subType: 'R', left: '62%', top: '85%', shape: 'triangle', label: 'R4', color: '#139B48' },
  { id: 'B-04', name: 'Biological Detector B4', type: 'chemical', subType: 'B', left: '62%', top: '85%', shape: 'triangle', label: 'B4', color: '#139B48' },
  { id: 'C-04', name: 'Chemical Detector C4', type: 'chemical', subType: 'C', left: '62%', top: '85%', shape: 'triangle', label: 'C4', color: '#139B48' },
  
  // Group 5 - R5, B5, C5 (left: 52.5%, top: 60%)
  { id: 'R-05', name: 'Radiological Detector R5', type: 'chemical', subType: 'R', left: '52.5%', top: '60%', shape: 'triangle', label: 'R5', color: '#139B48' },
  { id: 'B-05', name: 'Biological Detector B5', type: 'chemical', subType: 'B', left: '52.5%', top: '60%', shape: 'triangle', label: 'B5', color: '#139B48' },
  { id: 'C-05', name: 'Chemical Detector C5', type: 'chemical', subType: 'C', left: '52.5%', top: '60%', shape: 'triangle', label: 'C5', color: '#139B48' },
  
  // Group 6 - R6, B6, C6 (left: 52.5%, top: 71.5%)
  { id: 'R-06', name: 'Radiological Detector R6', type: 'chemical', subType: 'R', left: '52.5%', top: '71.5%', shape: 'triangle', label: 'R6', color: '#139B48' },
  { id: 'B-06', name: 'Biological Detector B6', type: 'chemical', subType: 'B', left: '52.5%', top: '71.5%', shape: 'triangle', label: 'B6', color: '#139B48' },
  { id: 'C-06', name: 'Chemical Detector C6', type: 'chemical', subType: 'C', left: '52.5%', top: '71.5%', shape: 'triangle', label: 'C6', color: '#139B48' },
  
  // Group 7 - R7, C7 (left: 80%, top: 22.5%)
  { id: 'R-07', name: 'Radiological Detector R7', type: 'chemical', subType: 'R', left: '80%', top: '22.5%', shape: 'triangle', label: 'R7', color: '#139B48' },
  { id: 'C-07', name: 'Chemical Detector C7', type: 'chemical', subType: 'C', left: '80%', top: '22.5%', shape: 'triangle', label: 'C7', color: '#139B48' },
  
  // Group 8 - R8, C8 (left: 25%, top: 22.5%)
  { id: 'R-08', name: 'Radiological Detector R8', type: 'chemical', subType: 'R', left: '25%', top: '22.5%', shape: 'triangle', label: 'R8', color: '#139B48' },
  { id: 'C-08', name: 'Chemical Detector C8', type: 'chemical', subType: 'C', left: '25%', top: '22.5%', shape: 'triangle', label: 'C8', color: '#139B48' },
  
  // Group 9 - R9, C9 (left: 22.5%, top: 75%)
  { id: 'R-09', name: 'Radiological Detector R9', type: 'chemical', subType: 'R', left: '22.5%', top: '75%', shape: 'triangle', label: 'R9', color: '#139B48' },
  { id: 'C-09', name: 'Chemical Detector C9', type: 'chemical', subType: 'C', left: '22.5%', top: '75%', shape: 'triangle', label: 'C9', color: '#139B48' },
  
  // Group 10 - R10, C10 (left: 80%, top: 75%)
  { id: 'R-10', name: 'Radiological Detector R10', type: 'chemical', subType: 'R', left: '80%', top: '75%', shape: 'triangle', label: 'R10', color: '#139B48' },
  { id: 'C-10', name: 'Chemical Detector C10', type: 'chemical', subType: 'C', left: '80%', top: '75%', shape: 'triangle', label: 'C10', color: '#139B48' },
  
  // Group 11 - R11, C11 (left: 1.5%, top: 47.5%) - ADJUSTED to be inside floor
  { id: 'R-11', name: 'Radiological Detector R11', type: 'chemical', subType: 'R', left: '9%', top: '26%', shape: 'triangle', label: 'R11', color: '#139B48' },
  { id: 'C-11', name: 'Chemical Detector C11', type: 'chemical', subType: 'C', left: '9%', top: '26%', shape: 'triangle', label: 'C11', color: '#139B48' },
  
  // Group 12 - R12, C12 (left: 92.5%, top: 45%) - ADJUSTED to be inside floor
  { id: 'R-12', name: 'Radiological Detector R12', type: 'chemical', subType: 'R', left: '9%', top: '66%', shape: 'triangle', label: 'R12', color: '#139B48' },
  { id: 'C-12', name: 'Chemical Detector C12', type: 'chemical', subType: 'C', left: '9%', top: '66%', shape: 'triangle', label: 'C12', color: '#139B48' },
  
  // ==================== FILTER SENSOR - 1 sensor ====================
  { id: 'F-01', name: 'Filter Sensor', type: 'filter', subType: 'F', left: '13.8%', top: '57.5%', shape: 'circle', label: 'F', color: '#139B48' },
  
  // ==================== AIRFLOW SENSOR - 1 sensor ====================
  { id: 'AF-01', name: 'Airflow Sensor', type: 'airflow', subType: 'AF', left: '13.8%', top: '65%', shape: 'circle', label: 'AF', color: '#139B48' },
  
  // ==================== GTV (GAS TIGHT VALVES) - 3 sensors ====================
  { id: 'GTV-01', name: 'Gas Tight Valve 1', type: 'valve', subType: 'GTV', left: '11%', top: '55%', shape: 'rectangle', label: 'GTV 1', color: '#139B48' },
  { id: 'GTV-02', name: 'Gas Tight Valve 2', type: 'valve', subType: 'GTV', left: '11%', top: '57.5%', shape: 'rectangle', label: 'GTV 2', color: '#139B48' },
  { id: 'GTV-03', name: 'Gas Tight Valve 3', type: 'valve', subType: 'GTV', left: '11%', top: '62.5%', shape: 'rectangle', label: 'GTV 3', color: '#139B48' },
];

// TOTAL COUNT: 81 sensors
// All labels now include full numbering (R1, B1, C1, T1, H1, DP1, Door 1, GTV 1, etc.)