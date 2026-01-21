export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // TopBar
    appTitle: 'IDRAK',
    appSubtitle: 'Intelligent CBRNe-aware BMS',
    admin: 'Facility Commander',
    
    // Navigation
    summary: 'Facility Overview',
    floors: 'Floors',
    incidents: 'Incidents',
    sensors: 'Sensors',
    sensorsLabel: 'sensors',
    floor: 'Floor',
    floorLabel: 'Floor',
    room: 'Room',
    rooms: 'rooms',
    filter: 'Filter',
    export: 'Export',
    
    // Sidebar
    dashboards: 'Homepage',
    configurations: 'Configurations',
    settings: 'Settings',
    main: 'Main',
    building: 'Building',
    facility: 'Facility',
    stressTests: 'Stress Tests',
    configuration: 'Configuration',
    automation: 'Automation Rules',
    alarms: 'Alarms',
    tacticalThreatDrills: 'Tactical Threat Drills',
    layoutTests: 'Test Floor Setup',
    
    // Sidebar Descriptions
    dashboardsDesc: 'Monitor system status',
    automationDesc: 'Manage rule-based actions',
    tacticalCasesDesc: 'Simulate emergency scenarios',
    tacticalThreatDrillsDesc: 'Simulate emergency drills',
    layoutTestsDesc: 'Test infrastructure changes before deployment',
    thresholdsDesc: 'Set sensor limits',
    alarmsDesc: 'Configure alarm triggers',
    
    // View Toggle
    dashboard: 'Dashboard',
    architectural: 'Architectural',
    
    // Summary Dashboard - Metrics
    totalFloors: 'Total Floors',
    totalRooms: 'Total Rooms',
    activeSensors: 'Active Sensors',
    activeIncidents: 'Active Incidents',
    automationRules: 'Automation Rules',
    operational: 'Operational',
    withIssues: 'With Issues',
    occupied: 'Occupied',
    vacant: 'Vacant',
    online: 'Online',
    offline: 'Offline',
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    active: 'Active',
    disabled: 'Disabled',
    
    // Summary Dashboard - Charts
    incidentsCountTrend: 'Incidents Count Trend',
    incidentsOverTime: 'Incidents Over Time',
    aiSuggestions: 'AI Suggestions',
    energyConsumption: 'Energy Consumption by System',
    totalInPeriod: 'Total in Period',
    averagePerDay: 'Average per Day',
    ruleMatchedThreats: 'Rule-Matched Threats',
    conflictThreats: 'Conflict Threats',
    undefinedThreats: 'Undefined Threats',
    ruleMatched: 'Rule-Matched',
    conflict: 'Conflict',
    undefined: 'Undefined',
    approved: 'Approved',
    rejected: 'Rejected',
    approvalRate: 'Approval Rate',
    totalUsage: 'Total Usage',
    vsLastMonth: 'vs Last Month',
    costSavings: 'Cost Savings',
    totalIncidents: 'Total Incidents',
    
    // Recent Incidents
    recentIncidents: 'Recent Incidents',
    viewAll: 'View All',
    ago: 'ago',
    
    // Incident Titles
    temperatureSpikeDetected: 'Temperature Spike Detected',
    humidityLevelAbnormal: 'Humidity Level Abnormal',
    motionSensorOffline: 'Motion Sensor Offline',
    co2LevelsElevated: 'CO2 Levels Elevated',
    waterLeakDetected: 'Water Leak Detected',
    airQualityWarning: 'Air Quality Warning',
    unusualVibrationPatternDetected: 'Unusual Vibration Pattern Detected',
    multiFloorHVACSystemFailure: 'Multi-Floor HVAC System Failure',
    
    // Building Diagram
    facilityRoof: 'FACILITY ROOF',
    type: 'Type',
    temp: 'Temp',
    occupancyLabel: 'Occupancy',
    health: 'Health',
    scale: 'SCALE',
    elevation: 'ELEVATION',
    north: 'NORTH',
    alert: 'ALERT',
    emergency: 'EMERGENCY',
    incident: 'INCIDENT',
    groundLevelLabel: 'GROUND LEVEL ±0.0m',
    hoverRoomsEquipment: 'Hover over rooms and equipment to see details',
    viewFullFloor: 'View Full Floor',
    
    // Equipment Types
    coolingSystem: 'Cooling System',
    airHandlingUnit: 'Air Handling Unit',
    chiller: 'Chiller',
    
    // Room Types
    office: 'Office',
    conference: 'Conference',
    lab: 'Lab',
    storage: 'Storage',
    utilityRoom: 'Utility Room',
    openOffice: 'Open Office',
    conferenceRoom: 'Conference Room',
    
    // Equipment Details
    model: 'Model',
    capacity: 'Capacity',
    flow: 'Flow',
    power: 'Power',
    efficiency: 'Efficiency',
    airflow: 'Airflow',
    filterStatus: 'Filter Status',
    good: 'Good',
    
    // Floor Plan Expanded
    floorPlan: 'Floor Plan',
    airQuality: 'Air Quality',
    systemOperational: 'System Operational',
    allParametersNormal: 'All parameters within normal range',
    allParamsNormal: 'All parameters within normal range',
    overlayExamples: 'Overlay Examples (for reference)',
    hideExamples: 'Hide Examples',
    dataCenter: 'Data Center',
    alertActive: 'Alert Active',
    tempApproachingThreshold: 'Temperature approaching threshold',
    buildingCrossSection: 'Facility Cross-Section',
    architecturalViewDesc: 'Interactive floor-by-floor view of the facility',
    roomStatus: 'Room Status',
    
    // Tactical Cases
    newCase: 'New Case',
    searchCases: 'Search cases...',
    allStatus: 'All Status',
    draft: 'Draft',
    completed: 'Completed',
    archived: 'Archived',
    threats: 'Threats',
    noCasesFound: 'No cases found',
    adjustSearchFilter: 'Try adjusting your search or filter criteria',
    addNewTacticalCase: 'Add New Tactical Case',
    caseName: 'Case Name',
    enterCaseName: 'Enter case name...',
    description: 'Description',
    describeScenario: 'Describe the scenario and objectives...',
    duration: 'Total Duration',
    enterDuration: 'e.g., 72 hours, 30 days, 2 weeks',
    addThreats: 'Add Threats',
    selectedThreats: 'Selected Threats',
    device: 'Device',
    devicePlaceholder: 'Select sensor device',
    severity: 'Severity',
    cancel: 'Cancel',
    createCase: 'Create Case',
    backToCases: 'Back to Cases',
    general: 'General',
    selectDevice: 'Select Sensor Device',
    clickToSelectDevice: 'Click on floor plan to select sensor',
    
    // Threat-specific fields
    gasType: 'Gas Type',
    agentType: 'Agent Type',
    sourceType: 'Source Type',
    deviceType: 'Device Type',
    attackVector: 'Attack Vector',
    damageType: 'Damage Type',
    forceSize: 'Force Size',
    concentrationLevel: 'Concentration Level',
    exposureLevel: 'Exposure Level',
    radiationLevel: 'Radiation Level',
    blastYield: 'Blast Yield',
    structuralIntegrity: 'Structural Integrity',
    threatLevel: 'Threat Level',
    
    // Chemical gas types
    chlorine: 'Chlorine',
    sarin: 'Sarin',
    vxGas: 'VX Gas',
    mustardGas: 'Mustard Gas',
    phosgene: 'Phosgene',
    
    // Biological agents
    anthrax: 'Anthrax',
    smallpox: 'Smallpox',
    plague: 'Plague',
    ricin: 'Ricin',
    botulinum: 'Botulinum',
    
    // Radiological sources
    cesium137: 'Cesium-137',
    cobalt60: 'Cobalt-60',
    iridium192: 'Iridium-192',
    strontium90: 'Strontium-90',
    
    // Explosive types
    ied: 'IED',
    mine: 'Mine',
    rpg: 'RPG',
    mortar: 'Mortar',
    grenade: 'Grenade',
    
    // Cyber attack vectors
    malware: 'Malware',
    ddos: 'DDoS',
    phishing: 'Phishing',
    ransomware: 'Ransomware',
    zeroDay: 'Zero-Day Exploit',
    
    // Damage types
    crack: 'Crack',
    collapse: 'Collapse',
    breach: 'Breach',
    subsidence: 'Subsidence',
    
    // Force sizes
    small: 'Small (1-5)',
    medium_force: 'Medium (6-15)',
    large: 'Large (16-30)',
    massive: 'Massive (30+)',
    
    // Threat Types - CBRNE
    chemical: 'Chemical',
    biological: 'Biological',
    radiological: 'Radiological',
    nuclear: 'Nuclear',
    explosive: 'Explosive',
    cyber: 'Cyber Attack',
    structuralFailure: 'Structural Failure',
    hostileForce: 'Hostile Force',
    
    // Mock Tactical Cases
    case1Name: 'Extended Siege Scenario',
    case1Desc: 'Prolonged hostile force containment with resource management protocols',
    case1Location1: 'Perimeter - All Sectors',
    case1Location2: 'Floor 1 - Command Center',
    case1Location3: 'Floor 2',
    case1Results: 'All defensive systems operational. Supply reserves at 72%',
    
    case2Name: 'VIP Evacuation Protocol',
    case2Desc: 'Emergency extraction of high-value personnel under threat conditions',
    case2Location1: 'Floor 3 - Secure Wing',
    case2Location2: 'Floor 1 - Exit Route Alpha',
    
    case3Name: 'Chemical Agent Attack Response',
    case3Desc: 'Chemical threat detection and containment protocol',
    case3Location1: 'Floor 2 - Sector B',
    case3Location2: 'Floor 2 - Air Filtration',
    case3Location3: 'All Floors - Ventilation Lockdown',
    case3Results: 'Contamination contained. Air quality restored in 18 minutes',
    
    minutes: 'minutes',
    hours: 'hours',
    days: 'days',
    months: 'months',
    step: 'Step',
    of: 'of',
    next: 'Next',
    previous: 'Previous',
    generalInfo: 'General Information',
    threatConfiguration: 'Threat Configuration',
    fillRequiredFields: 'Please fill in all required fields to continue',
    version: 'Version',
    released: 'Released',
    
    // Scenario Detail View
    threatTimeline: 'Threat Timeline',
    tacticalRecommendations: 'Tactical Recommendations',
    aiAssessment: 'AI Assessment',
    predictionSuccess: 'Predicted Success',
    predictionPartial: 'Partial Success Expected',
    predictionFailure: 'Failure Predicted',
    confidence: 'Confidence',
    aiReasoning: 'AI Reasoning',
    criticalFactors: 'Critical Factors',
    estimatedCasualties: 'Estimated Casualties',
    estimatedDuration: 'Estimated Duration',
    finalOutcome: 'Final Outcome',
    strategicRecommendations: 'Strategic Recommendations',
    strategicRecommendationsSubtitle: 'Infrastructure and capability improvements for future readiness',
    infrastructure: 'Infrastructure',
    equipment: 'Equipment',
    personnel: 'Personnel',
    protocol: 'Protocol',
    estimatedCost: 'Estimated Cost',
    estimatedTime: 'Timeline',
    implemented: 'Implemented',
    outcome: 'Outcome',
    failed: 'Failed',
    scenarioTimeline: 'Scenario Timeline',
    threatDetected: 'Threat Detected',
    aiReassessment: 'AI Reassessment',
    trigger: 'Trigger',
    situationSummary: 'Situation Summary',
    keyChanges: 'Key Changes',
    aiRecommendations: 'AI Recommendations',
    effectOfAction: 'Effect of Action',
    summaryTab: 'Summary',
    detailsTab: 'Details',
    scenarioOutcome: 'Scenario Outcome',
    reassessments: 'Reassessments',
    threatsDetected: 'Threats Detected',
    emergencyMode: 'Emergency State',
    liveSimulation: 'Live Simulation',
    startSimulation: 'Start Simulation',
    systemStatus: 'System Status',
    
    // Emergency Dashboard
    aiThreatAssessment: 'AI Threat Assessment',
    affectedZones: 'Affected Zones',
    responseTime: 'Response Time',
    priority: 'Priority',
    executeAction: 'Execute',
    threatType: 'Threat Type',
    confidenceLevel: 'Confidence Level',
    chemicalThreat: 'Chemical Agent Detected',
    biologicalThreat: 'Biological Contamination',
    radiologicalThreat: 'Radiation Spike',
    immediateEvacuation: 'Immediate Evacuation - Sector B',
    sealVentilation: 'Seal Ventilation Systems',
    activateProtocol: 'Activate Containment Protocol',
    deployHazmat: 'Deploy HAZMAT Team',
    affectedPersonnel: 'Affected Personnel',
    containmentStatus: 'Containment Status',
    facilityPrognosis: 'Facility Prognosis',
    containmentSuccess: 'Containment Success',
    fullRecovery: 'Full Recovery',
    partialRecovery: 'Partial Recovery',
    criticalFailure: 'Critical Failure',
    timeToContainment: 'Time to Containment',
    estimatedDamage: 'Estimated Damage',
    survivalRate: 'Survival Rate',
    systemIntegrity: 'System Integrity',
    airQualityRecovery: 'Air Quality Recovery',
    structuralStability: 'Structural Stability',
    powerSystems: 'Power Systems',
    predictedOutcome: 'Predicted Outcome',
    currentStatus: 'Current Status',
    spreading: 'Spreading',
    contained: 'Contained',
    minimal: 'Minimal',
    moderate: 'Moderate',
    severe: 'Severe',
    degraded: 'Degraded',
    
    systemHealth: 'System Health',
  },
  ar: {
    // TopBar
    appTitle: 'إدراك',
    appSubtitle: 'نظام إدارة مباني ذكي واعٍ بتهديدات CBRNE',
    admin: 'مسؤول المرافق',
    
    // Navigation
    summary: 'نظرة عامة على المرافق',
    floors: 'الطوابق',
    incidents: 'الحوادث',
    sensors: 'المستشعرات',
    sensorsLabel: 'المستشعرات',
    floor: 'الطابق',
    floorLabel: 'الطابق',
    room: 'الغرفة',
    rooms: 'الغرف',
    filter: 'تصفية',
    export: 'تصدير',
    
    // Sidebar
    dashboards: 'Homepage',
    configurations: 'التكوينات',
    settings: 'الإعدادات',
    main: 'الأساسي',
    building: 'المبنى',
    facility: 'الموقع',
    stressTests: 'اختبارات الضغط',
    configuration: 'التكوين',
    automation: 'قواعد الأتمتة',
    alarms: 'الإنذارات',
    tacticalThreatDrills: 'تمارين التهديدات الاستراتيجية',
    layoutTests: 'تخطيط الطابق الجديد/الأجهة',
    
    // Sidebar Descriptions
    dashboardsDesc: 'مراقبة حالة النظام',
    automationDesc: 'إدارة الإجراءات القائمة على القواعد',
    tacticalCasesDesc: 'محاكاة سيناريوهات الطوارئ',
    tacticalThreatDrillsDesc: 'محاكاة تدريبات الطوارئ',
    layoutTestsDesc: 'اختبار التغييرات في البنية التحتية قبل التنفيذ',
    thresholdsDesc: 'تعيين حدود المستشعرات',
    alarmsDesc: 'تكوين مشغلات الإنذار',
    
    // View Toggle
    dashboard: 'لوحة المعلومات',
    architectural: 'معماري',
    
    // Summary Dashboard - Metrics
    totalFloors: 'إجمالي الطوابق',
    totalRooms: 'إجمالي الغرف',
    activeSensors: 'المستشعرات النشطة',
    activeIncidents: 'الحوادث النشطة',
    automationRules: 'قواعد الأتمتة',
    operational: 'تشغيلي',
    withIssues: 'بها مشاكل',
    occupied: 'مشغولة',
    vacant: 'شاغرة',
    online: 'متصل',
    offline: 'غير متصل',
    critical: 'حرج',
    high: 'عالي',
    medium: 'متوسط',
    low: 'منخفض',
    active: 'نشط',
    disabled: 'معطل',
    
    // Summary Dashboard - Charts
    incidentsCountTrend: 'اتجاه عدد الحوادث',
    incidentsOverTime: 'الحوادث مع مرور الوقت',
    aiSuggestions: 'اقتراحات الذكاء الاصطناعي',
    energyConsumption: 'استهلاك الطاقة حسب النظام',
    totalInPeriod: 'الإجمالي في لفترة',
    averagePerDay: 'المتوسط في اليوم',
    ruleMatchedThreats: 'التهديدات المطابقة للقواعد',
    conflictThreats: 'تهديدات متضاربة',
    undefinedThreats: 'تهديدات غير محددة',
    ruleMatched: 'مطابق للقاعدة',
    conflict: 'متضارب',
    undefined: 'غير محدد',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    approvalRate: 'معدل الموافقة',
    totalUsage: 'الاستخدام الإجمالي',
    vsLastMonth: 'مقابل الشهر الماضي',
    costSavings: 'توفير التكاليف',
    totalIncidents: 'إجمالي الحوادث',
    
    // Recent Incidents
    recentIncidents: 'الحوادث الأخيرة',
    viewAll: 'عرض الكل',
    ago: 'منذ',
    
    // Incident Titles
    temperatureSpikeDetected: 'اكتشاف زيادة حادة في درجة الحرارة',
    humidityLevelAbnormal: 'مستوى الرطوبة غير طبيعي',
    motionSensorOffline: 'حساس الحركة غير متصل',
    co2LevelsElevated: 'مستوى ثاني أكسيد الكربون مرتفع',
    waterLeakDetected: 'اكتشاف تسرب المياه',
    airQualityWarning: 'تحذير جودة الهواء',
    unusualVibrationPatternDetected: 'اكتشاف نمط هزاز غي طبيعي',
    multiFloorHVACSystemFailure: 'فشل نظام التكييف والتهوية متعدد الطوابق',
    
    // Building Diagram
    facilityRoof: 'سطح المنشأة',
    type: 'النوع',
    temp: 'درجة الحرارة',
    occupancyLabel: 'الإشغال',
    health: 'الصحة',
    scale: 'المقياس',
    elevation: 'الارتفاع',
    north: 'شمال',
    alert: 'تنبيه',
    emergency: 'طوارئ',
    incident: 'حادث',
    groundLevelLabel: 'مستوى الأرض ±0.0م',
    hoverRoomsEquipment: 'مرر فوق الغرف والمعدات لرؤية التفاصيل',
    viewFullFloor: 'عرض الطابق الكامل',
    
    // Equipment Types
    coolingSystem: 'نظام التبريد',
    airHandlingUnit: 'وحدة معالجة الهواء',
    chiller: 'المبرد',
    
    // Room Types
    office: 'مكتب',
    conference: 'اجتماعات',
    lab: 'مختبر',
    storage: 'تخزين',
    utilityRoom: 'غرفة المرافق',
    openOffice: 'مكتب مفتوح',
    conferenceRoom: 'غرفة الاجتماعات',
    
    // Equipment Details
    model: 'النموذج',
    capacity: 'السعة',
    flow: 'التدفق',
    power: 'الطاقة',
    efficiency: 'الكفاءة',
    airflow: 'تدفق الهواء',
    filterStatus: 'حالة الفلتر',
    good: 'جيد',
    
    // Floor Plan Expanded
    floorPlan: 'خطة الطابق',
    airQuality: 'جودة الهواء',
    systemOperational: 'نظام تشغيلي',
    allParametersNormal: 'جميع المعلمات ضمن النطاق الطبيعي',
    allParamsNormal: 'جميع المعلمات ضمن النطاق الطبيعي',
    overlayExamples: 'أمثلة على التراكيب (للاسترجاع)',
    hideExamples: 'إخفاء الأمثلة',
    dataCenter: 'مركز البيانات',
    alertActive: 'تنبيه نشط',
    tempApproachingThreshold: 'درجة الحرارة قريبة من الحد',
    buildingCrossSection: 'قطاع مقطع للمنشأة',
    architecturalViewDesc: 'عرض تفاعلي طابق بطبقة من الطوابق للمنشأة',
    roomStatus: 'حالة الغرفة',
    
    // Tactical Cases
    newCase: 'حالة جديدة',
    searchCases: 'بحث عن حالات...',
    allStatus: 'جميع الحالات',
    draft: 'مسودة',
    completed: 'مكتملة',
    archived: 'مؤرشة',
    threats: 'تهديدات',
    noCasesFound: 'لم يتم العثور على حالات',
    adjustSearchFilter: 'حاول تعديل معايير البحث أو التصفية',
    addNewTacticalCase: 'إضافة حالة استراتيجية جديدة',
    caseName: 'اسم الحالة',
    enterCaseName: 'أدخل اسم الحالة...',
    description: 'الوصف',
    describeScenario: 'صف السيناريو والأهداف...',
    duration: 'المدة الإجمالية',
    enterDuration: 'مثلًا، 72 ساعة، 30 يومًا، أسبوعان',
    addThreats: 'إضافة تهديدات',
    selectedThreats: 'التهديدات المحددة',
    device: 'الجهاز',
    devicePlaceholder: 'اختر جهاز المستشعر',
    severity: 'الخطورة',
    cancel: 'إلغاء',
    createCase: 'إنشاء الحالة',
    backToCases: 'عودة إلى الحالات',
    general: 'عام',
    selectDevice: 'تحديد جهاز المستشعر',
    clickToSelectDevice: 'انقر على خطة الطابق لتحديد جهاز المستشعر',
    
    // Threat-specific fields
    gasType: 'نوع الغاز',
    agentType: 'نوع الوكيل',
    sourceType: 'نوع المصدر',
    deviceType: 'نوع الجهاز',
    attackVector: 'تجهات الهجوم',
    damageType: 'نوع التلف',
    forceSize: 'حجم القوات',
    concentrationLevel: 'مستوى التركيز',
    exposureLevel: 'مستوى التعرض',
    radiationLevel: 'مستوى الإشعاع',
    blastYield: 'قوة الانفجار',
    structuralIntegrity: 'الاستقرار البناني',
    threatLevel: 'مستوى التهديد',
    
    // Chemical gas types
    chlorine: 'كلورين',
    sarin: 'سارين',
    vxGas: 'غاز VX',
    mustardGas: 'غاز الصفراء',
    phosgene: 'فسجين',
    
    // Biological agents
    anthrax: 'أنثركس',
    smallpox: 'السعال الجلدي',
    plague: 'البلاط',
    ricin: 'ريسين',
    botulinum: 'بوتولينوم',
    
    // Radiological sources
    cesium137: 'سيزيوم-137',
    cobalt60: 'كوبالت-60',
    iridium192: 'إيريديوم-192',
    strontium90: 'سترونتيوم-90',
    
    // Explosive types
    ied: 'IED',
    mine: 'ثقبة معدنية',
    rpg: 'RPG',
    mortar: 'صواريخ مدفعية',
    grenade: 'قنبلة',
    
    // Cyber attack vectors
    malware: 'برامج ضارة',
    ddos: 'هجوم توزيعي على الخدمة',
    phishing: 'الاحتيال بالبريد الإلكتروني',
    ransomware: 'برامج طلب السداد',
    zeroDay: 'استغلال يوم صفر',
    
    // Damage types
    crack: 'شق',
    collapse: 'انهيار',
    breach: 'انتحال',
    subsidence: 'انزلاق',
    
    // Force sizes
    small: 'صغير (1-5)',
    medium_force: 'متوسط (6-15)',
    large: 'كبير (16-30)',
    massive: 'كبير جداً (30+)',
    
    // Threat Types - CBRNE
    chemical: 'كيميائي',
    biological: 'بيولوجي',
    radiological: 'إشعاعي',
    nuclear: 'نووي',
    explosive: 'تفجير',
    cyber: 'هجوم كيبراني',
    structuralFailure: 'فشل بنية',
    hostileForce: 'قوة عدوية',
    
    // Mock Tactical Cases
    case1Name: 'موقف استمراري',
    case1Desc: 'استمرار حجز القوى العضوية مع بروتوكولات إدارة الموارد',
    case1Location1: 'الحدود - جميع القطاعات',
    case1Location2: 'الطابق 1 - مركز القيادة',
    case1Location3: 'الطابق 2',
    case1Results: 'جميع أنظمة الدفاع تشغيلية. مخزونات الاحتياط على 72%',
    
    case2Name: 'بروتوكول إخلاء الشخصيات ذات القيم العالية',
    case2Desc: 'استخراج طارئ للأشخاص ذات القيمة العالية تحت ظروف التهديد',
    case2Location1: 'الطابق 3 - الجناح الآمن',
    case2Location2: 'الطابق 1 - مسار الخروج ألفا',
    
    case3Name: 'استجابة للهجوم الكيميائي، البيولوجي، الإشعاعي، النووي، التفجير',
    case3Desc: 'حجز التهديدات الكيميائية، البيولوجية، الإشعاعية، النووية، التفجيرية',
    case3Location1: 'الطابق 1 - منطقة التنظيف',
    case3Location2: 'الطابق 2 - تصفية الهواء',
    case3Location3: 'جميع الطوابق - إغلاق التهوية',
    case3Results: 'تم حجز التلوث. استعادة جودة الهواء في 18 دقيقة',
    
    minutes: 'دقائق',
    hours: 'ساعات',
    days: 'أيام',
    months: 'أشهر',
    step: 'خطوة',
    of: 'من',
    next: 'التالي',
    previous: 'السابق',
    generalInfo: 'معلومات عامة',
    threatConfiguration: 'تكوين التهديد',
    fillRequiredFields: 'يرجى ملء جميع الحقول المطلوبة للمتابعة',
    version: 'الإصدار',
    released: 'صدر في',
    
    // Scenario Detail View
    threatTimeline: 'جدول زمني التهديد',
    tacticalRecommendations: 'التوصيات الاستراتيجية',
    aiAssessment: 'تقييم الذكاء الاصطناعي',
    predictionSuccess: 'نجاح متوقع',
    predictionPartial: 'نجاح جزئي متوقع',
    predictionFailure: 'فل متوقع',
    confidence: 'ثقة',
    aiReasoning: 'منطق الذكاء الاصطناعي',
    criticalFactors: ' العوامل الحاسمة',
    estimatedCasualties: 'الجرحى المتوقعون',
    estimatedDuration: 'المدة المتوقعة',
    finalOutcome: 'النهاية النهائية',
    strategicRecommendations: 'التوصيات الاستراتيجية',
    strategicRecommendationsSubtitle: 'تحسينات البنية التحتية والقدرات للاستعداد للمستقبل',
    infrastructure: 'البنية التحتية',
    equipment: 'المعدات',
    personnel: 'الموظفين',
    protocol: 'البروتوكول',
    estimatedCost: 'التكلفة المتوقعة',
    estimatedTime: 'جدول زمني',
    implemented: 'مطبوع',
    outcome: 'النهاية',
    failed: 'فشل',
    scenarioTimeline: 'جدول زمني السيناريو',
    threatDetected: 'اكتشاف التهديد',
    aiReassessment: 'إعادة تقييم الذكاء الاصطناعي',
    trigger: 'المشغل',
    situationSummary: 'ملخص الوضع',
    keyChanges: 'ال변يات الرئيسية',
    aiRecommendations: 'التوصيات الذكاء الاصطناعي',
    effectOfAction: 'تأثير الإجراء',
    summaryTab: 'ملخص',
    detailsTab: 'تفاصيل',
    scenarioOutcome: 'نهاية السيناريو',
    reassessments: 'إعادة التقييمات',
    threatsDetected: 'التهديدات المكتشفة',
    emergencyMode: 'الحالة الطارئة',
    liveSimulation: 'محاكاة حية',
    startSimulation: 'بدء المحاكاة',
    systemStatus: 'حالة النظام',
    
    // Emergency Dashboard
    aiThreatAssessment: 'تقييم التهديد بالذكاء الاصطناعي',
    affectedZones: 'المناطق المتأثرة',
    responseTime: 'وقت الاستجابة',
    priority: 'الأولوية',
    executeAction: 'تنفيذ',
    threatType: 'نوع التهديد',
    confidenceLevel: 'مستوى الثقة',
    chemicalThreat: 'كشف وجود عامل كيميائي',
    biologicalThreat: 'تلوث بيولوجي',
    radiologicalThreat: 'ارتفاع في الإشعاع',
    immediateEvacuation: 'إخلاء فوري - القطاع ب',
    sealVentilation: 'إغلاق أنظمة التهوية',
    activateProtocol: 'تفعيل بروتوكول الاحتواء',
    deployHazmat: 'نشر فريق المواد الخطرة',
    affectedPersonnel: 'الموظفون المتأثرون',
    containmentStatus: 'حالة الاحتواء',
    facilityPrognosis: 'توقعات المرافق',
    containmentSuccess: 'نجاح الاحتواء',
    fullRecovery: 'تعافي كامل',
    partialRecovery: 'تعافي جزئي',
    criticalFailure: 'فشل حرجي',
    timeToContainment: 'وقت الاحتواء',
    estimatedDamage: 'الضرر المتوقع',
    survivalRate: 'معدل البقاء',
    systemIntegrity: 'سلامة النظام',
    airQualityRecovery: 'تعافي جودة الهواء',
    structuralStability: 'استقرار البنية التحتية',
    powerSystems: 'أنظمة الطاقة',
    predictedOutcome: 'النهاية المتوقعة',
    currentStatus: 'الحالة الحالية',
    spreading: 'انتشار',
    contained: 'محصور',
    minimal: 'دقيق',
    moderate: 'متوسط',
    severe: 'شديد',
    degraded: 'متدهور',
    
    systemHealth: 'صحة النظام',
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

// Helper function to translate room type
export function getRoomType(lang: Language, type: string): string {
  const typeMap: { [key: string]: keyof typeof translations.en } = {
    'Office': 'office',
    'Conference': 'conference',
    'Lab': 'lab',
    'Storage': 'storage',
    'Utility Room': 'utilityRoom',
    'Open Office': 'openOffice',
    'Conference Room': 'conferenceRoom',
  };
  
  const key = typeMap[type];
  return key ? translations[lang][key] : type;
}

// Helper function to translate room name
export function getRoomName(lang: Language, name: string): string {
  if (lang === 'en') return name;
  
  // Parse room names like "Room 101"
  const match = name.match(/Room (\d+)/);
  if (match) {
    return `غرفة ${match[1]}`;
  }
  
  return name;
}

// Helper function to translate equipment type
export function getEquipmentType(lang: Language, type: string): string {
  const typeMap: { [key: string]: keyof typeof translations.en } = {
    'Cooling System': 'coolingSystem',
    'Air Handling Unit': 'airHandlingUnit',
    'Chiller': 'chiller',
  };
  
  const key = typeMap[type];
  return key ? translations[lang][key] : type;
}

// Helper function to get localized incident title
export function getIncidentTitle(lang: Language, englishTitle: string): string {
  const titleMap: { [key: string]: keyof typeof translations.en } = {
    'Temperature Spike Detected': 'temperatureSpikeDetected',
    'Humidity Level Abnormal': 'humidityLevelAbnormal',
    'Motion Sensor Offline': 'motionSensorOffline',
    'CO2 Levels Elevated': 'co2LevelsElevated',
    'Water Leak Detected': 'waterLeakDetected',
    'Air Quality Warning': 'airQualityWarning',
    'Unusual Vibration Pattern Detected': 'unusualVibrationPatternDetected',
    'Multi-Floor HVAC System Failure': 'multiFloorHVACSystemFailure',
  };
  
  const key = titleMap[englishTitle];
  return key ? translations[lang][key] : englishTitle;
}

// Helper function to get localized location
export function getIncidentLocation(lang: Language, englishLocation: string): string {
  if (lang === 'en') return englishLocation;
  
  // Parse location like "Building A - Floor 3 - Room 301"
  const parts = englishLocation.split(' - ');
  if (parts.length >= 3) {
    const building = parts[0]; // Keep building identifier as is
    const floorPart = parts[1]; // "Floor 3"
    const roomPart = parts[2]; // "Room 301"
    
    const floorNum = floorPart.match(/\d+/)?.[0] || '';
    const roomId = roomPart.replace('Room ', '').replace('Conference Room', '').replace('Utility Room', '').replace('Open Office', '').trim();
    
    if (roomPart.includes('Conference Room')) {
      return `${building} - الطابق ${floorNum} - غرفة الاجتماعات`;
    } else if (roomPart.includes('Utility Room')) {
      return `${building} - الطابق ${floorNum} - غرفة المرافق`;
    } else if (roomPart.includes('Open Office')) {
      return `${building} - الطابق ${floorNum} - مكتب مفتوح`;
    } else {
      return `${building} - الطابق ${floorNum} - غرفة ${roomId}`;
    }
  }
  
  return englishLocation;
}