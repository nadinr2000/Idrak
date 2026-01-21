import { floors as floorData, rooms as roomData } from '../data/mockData';
import { Language, translations } from '../translations';
import { AlertTriangle, Activity, Zap } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface BuildingDiagram3DProps {
  onFloorClick: (floorId: string) => void;
  language: Language;
  emergencyMode?: boolean;
}

export function BuildingDiagram3D({ onFloorClick, language, emergencyMode }: BuildingDiagram3DProps) {
  const t = translations[language];
  const [hoveredFloor, setHoveredFloor] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for tooltip
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredFloor && containerRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Get mouse position relative to viewport
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Tooltip dimensions
      const tooltipWidth = 280;
      const tooltipHeight = 220;
      const offset = 8; // Small offset from cursor
      
      // Calculate position (default: right and below cursor)
      let x = mouseX + offset;
      let y = mouseY + offset;
      
      // Adjust if tooltip would go off-screen to the right
      if (x + tooltipWidth > window.innerWidth - 10) {
        x = mouseX - tooltipWidth - offset;
      }
      
      // Adjust if tooltip would go off-screen at the bottom
      if (y + tooltipHeight > window.innerHeight - 10) {
        y = mouseY - tooltipHeight - offset;
      }
      
      // Ensure it doesn't go off-screen to the left
      if (x < 10) {
        x = 10;
      }
      
      // Ensure it doesn't go off-screen at the top
      if (y < 10) {
        y = 10;
      }
      
      setTooltipPosition({ x, y });
    }
  };

  // Process floor data
  const floors = floorData.map(floor => {
    const floorRooms = roomData.filter(room => room.floorId === floor.id);
    const floorNumber = parseInt(floor.name.split(' ')[1]);
    
    let floorStatus: 'operational' | 'warning' | 'critical' = 'operational';
    // Floor 2 always has chemical threat - critical in emergency mode, warning in normal mode
    if (floor.id === 'floor-a-2') {
      floorStatus = emergencyMode ? 'critical' : 'warning';
    }
    
    return {
      id: floor.id,
      number: floorNumber,
      name: floor.name,
      status: floorStatus,
      rooms: floor.rooms,
      sensors: floorRooms.reduce((acc, room) => acc + room.sensors, 0),
      occupancy: floorRooms.reduce((acc, room) => acc + room.occupancy, 0),
    };
  }).reverse();

  // Isometric projection constants
  const floorHeight = 45;
  const floorWidth = 400;
  const floorDepth = 180;
  const skewX = 0.5; // Isometric angle
  const skewY = 0.866; // Isometric angle (sqrt(3)/2)

  // SVG dimensions - adjusted for better centering
  const svgWidth = 900;
  const svgHeight = 700;
  const startX = 220; // Centered horizontally
  const startY = 280; // Increased to add more space at top

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 relative">
      {/* Grid background for technical drawing effect */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #cbd5e1 1px, transparent 1px),
            linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Legend */}
      <div className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-slate-200">
        <div className="text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wide">
          {language === 'en' ? 'Status Legend' : 'مفتاح الحالة'}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border-2 border-amber-500 bg-amber-50"></div>
            <span className="text-slate-700">{t.alert}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border-2 border-red-600 bg-red-50"></div>
            <span className="text-slate-700">{t.emergency}</span>
          </div>
        </div>
      </div>

      {/* Hover tooltip for floor information */}
      {hoveredFloor && (() => {
        const floor = floors.find(f => f.id === hoveredFloor);
        if (!floor) return null;
        
        return (
          <div 
            className="z-20 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 border-2 border-slate-300 pointer-events-none"
            style={{
              position: 'fixed',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              width: '280px'
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${
                floor.status === 'critical' ? 'bg-red-600 animate-pulse' : 
                floor.status === 'warning' ? 'bg-amber-500' : 
                'bg-green-500'
              }`}></div>
              <h3 className="font-bold text-slate-800">{floor.name}</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-6">
                <span className="text-slate-600">{language === 'en' ? 'Status:' : 'الحالة:'}</span>
                <span className={`font-semibold ${
                  floor.status === 'critical' ? 'text-red-600' : 
                  floor.status === 'warning' ? 'text-amber-600' : 
                  'text-green-600'
                }`}>
                  {floor.status === 'critical' ? t.emergency : floor.status === 'warning' ? t.alert : t.operational}
                </span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-slate-600">{language === 'en' ? 'Rooms:' : 'الغرف:'}</span>
                <span className="font-semibold text-slate-800">{floor.rooms}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-slate-600">{language === 'en' ? 'Sensors:' : 'أجهزة الاستشعار:'}</span>
                <span className="font-semibold text-slate-800">{floor.sensors}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-slate-600">{language === 'en' ? 'Occupancy:' : 'الإشغال:'}</span>
                <span className="font-semibold text-slate-800">{floor.occupancy} {language === 'en' ? 'personnel' : 'أفراد'}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-500 italic">
                {language === 'en' ? 'Click to view details' : 'انقر لعرض التفاصيل'}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Main isometric drawing */}
      <div className="h-full flex items-center justify-center py-20 px-8" ref={containerRef} onMouseMove={handleMouseMove}>
        <svg 
          width={svgWidth} 
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="drop-shadow-xl"
          style={{ marginTop: '60px' }}
        >
          {/* Define patterns and gradients */}
          <defs>
            {/* Concrete texture pattern */}
            <pattern id="concrete" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="#e2e8f0"/>
              <circle cx="1" cy="1" r="0.5" fill="#cbd5e1"/>
              <circle cx="3" cy="3" r="0.5" fill="#cbd5e1"/>
            </pattern>
            
            {/* Glass pattern */}
            <pattern id="glass" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#e0f2fe" opacity="0.3"/>
              <line x1="0" y1="0" x2="20" y2="20" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.3"/>
            </pattern>

            {/* Alert pattern */}
            <pattern id="alert" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#fee2e2"/>
              <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="#dc2626" opacity="0.3"/>
            </pattern>
          </defs>

          {/* Ground foundation */}
          <g>
            <path
              d={`
                M ${startX} ${startY + floors.length * floorHeight + 20}
                L ${startX + floorWidth} ${startY + floors.length * floorHeight + 20}
                L ${startX + floorWidth + floorDepth * skewX} ${startY + floors.length * floorHeight + 20 - floorDepth * skewY}
                L ${startX + floorDepth * skewX} ${startY + floors.length * floorHeight + 20 - floorDepth * skewY}
                Z
              `}
              fill="#94a3b8"
              stroke="#475569"
              strokeWidth="2"
            />
            <text
              x={startX + floorWidth/2}
              y={startY + floors.length * floorHeight + 40}
              textAnchor="middle"
              className="text-xs font-mono fill-slate-600"
            >
              FOUNDATION
            </text>
          </g>

          {/* Draw each floor */}
          {floors.map((floor, index) => {
            const y = startY + (floors.length - index - 1) * floorHeight;
            const isCritical = floor.status === 'critical';
            const isWarning = floor.status === 'warning';
            
            let fillColor = '#f0fdf4'; // green tint for operational
            let strokeColor = '#10b981';
            if (isCritical) {
              fillColor = '#fef2f2';
              strokeColor = '#dc2626';
            } else if (isWarning) {
              fillColor = '#fffbeb';
              strokeColor = '#f59e0b';
            }
            
            // Wall colors
            let wallFill = 'url(#concrete)';
            if (isCritical) {
              wallFill = '#fee2e2';
            } else if (isWarning) {
              wallFill = '#fef3c7';
            }

            return (
              <g 
                key={floor.id} 
                className="cursor-pointer transition-opacity hover:opacity-90" 
                onClick={() => onFloorClick(floor.id)}
                onMouseEnter={() => setHoveredFloor(floor.id)}
                onMouseLeave={() => setHoveredFloor(null)}
              >
                {/* Floor slab (top face) */}
                <path
                  d={`
                    M ${startX} ${y}
                    L ${startX + floorWidth} ${y}
                    L ${startX + floorWidth + floorDepth * skewX} ${y - floorDepth * skewY}
                    L ${startX + floorDepth * skewX} ${y - floorDepth * skewY}
                    Z
                  `}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="2"
                  opacity="0.95"
                />

                {/* Front wall */}
                <path
                  d={`
                    M ${startX} ${y}
                    L ${startX + floorWidth} ${y}
                    L ${startX + floorWidth} ${y + floorHeight}
                    L ${startX} ${y + floorHeight}
                    Z
                  `}
                  fill={wallFill}
                  stroke="#64748b"
                  strokeWidth="2"
                />

                {/* Side wall */}
                <path
                  d={`
                    M ${startX + floorWidth} ${y}
                    L ${startX + floorWidth + floorDepth * skewX} ${y - floorDepth * skewY}
                    L ${startX + floorWidth + floorDepth * skewX} ${y + floorHeight - floorDepth * skewY}
                    L ${startX + floorWidth} ${y + floorHeight}
                    Z
                  `}
                  fill={wallFill}
                  stroke="#64748b"
                  strokeWidth="2"
                  opacity="0.9"
                />

                {/* Windows - Front face */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const windowX = startX + 60 + (i * 55);
                  const windowY = y + 12;
                  const windowWidth = 45;
                  const windowHeight = 28;
                  // In normal mode (warning), highlight specific affected rooms
                  // In emergency mode (critical), highlight all rooms
                  const hasAlert = isCritical && (i === 2 || i === 3);
                  const isAffectedRoom = isWarning && !emergencyMode && (i === 2 || i === 3); // Rooms in Sector B

                  return (
                    <g key={`window-front-${i}`}>
                      <rect
                        x={windowX}
                        y={windowY}
                        width={windowWidth}
                        height={windowHeight}
                        fill={hasAlert ? "url(#alert)" : isAffectedRoom ? "#fef3c7" : "url(#glass)"}
                        stroke={hasAlert ? "#dc2626" : isAffectedRoom ? "#f59e0b" : "#0369a1"}
                        strokeWidth={isAffectedRoom ? "3" : "2"}
                        opacity={isAffectedRoom ? "0.9" : "1"}
                      />
                      {/* Window frame cross */}
                      <line x1={windowX + windowWidth/2} y1={windowY} x2={windowX + windowWidth/2} y2={windowY + windowHeight} stroke={isAffectedRoom ? "#f59e0b" : "#0369a1"} strokeWidth="1"/>
                      <line x1={windowX} y1={windowY + windowHeight/2} x2={windowX + windowWidth} y2={windowY + windowHeight/2} stroke={isAffectedRoom ? "#f59e0b" : "#0369a1"} strokeWidth="1"/>
                    </g>
                  );
                })}

                {/* Windows - Side face */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const windowX = startX + floorWidth + (i * 40 * skewX);
                  const windowY = y + 25 - (i * 40 * skewY);
                  const windowWidth = 35;
                  const windowHeight = 50;

                  return (
                    <g key={`window-side-${i}`}>
                      <path
                        d={`
                          M ${windowX} ${windowY}
                          L ${windowX + windowWidth * skewX} ${windowY - windowWidth * skewY}
                          L ${windowX + windowWidth * skewX} ${windowY + windowHeight - windowWidth * skewY}
                          L ${windowX} ${windowY + windowHeight}
                          Z
                        `}
                        fill="url(#glass)"
                        stroke="#0369a1"
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })}

                {/* Floor label and info */}
                <text
                  x={startX - 60}
                  y={y + floorHeight/2}
                  textAnchor="end"
                  className="text-lg font-bold fill-slate-800"
                >
                  {floor.name}
                </text>

                {/* Status indicator */}
                {isCritical && (
                  <g>
                    <circle
                      cx={startX - 30}
                      cy={y + floorHeight/2}
                      r="12"
                      fill="#dc2626"
                      className="animate-pulse"
                    />
                    <AlertTriangle className="absolute" x={startX - 38} y={y + floorHeight/2 - 8} size={16} color="white" />
                  </g>
                )}
                {isWarning && (
                  <g>
                    <circle
                      cx={startX - 30}
                      cy={y + floorHeight/2}
                      r="12"
                      fill="#f59e0b"
                    />
                    <AlertTriangle className="absolute" x={startX - 38} y={y + floorHeight/2 - 8} size={16} color="white" />
                  </g>
                )}

                {/* Room divisions (interior walls) */}
                <g opacity="0.3">
                  <line 
                    x1={startX + 100} y1={y} 
                    x2={startX + 100} y2={y + floorHeight} 
                    stroke="#64748b" 
                    strokeWidth="1" 
                    strokeDasharray="4 2"
                  />
                  <line 
                    x1={startX + 200} y1={y} 
                    x2={startX + 200} y2={y + floorHeight} 
                    stroke="#64748b" 
                    strokeWidth="1" 
                    strokeDasharray="4 2"
                  />
                  <line 
                    x1={startX + 300} y1={y} 
                    x2={startX + 300} y2={y + floorHeight} 
                    stroke="#64748b" 
                    strokeWidth="1" 
                    strokeDasharray="4 2"
                  />
                </g>

                {/* Structural columns */}
                <g>
                  {[startX + 50, startX + 200, startX + 350].map((colX, colIndex) => (
                    <rect
                      key={`col-${colIndex}`}
                      x={colX - 3}
                      y={y}
                      width="6"
                      height={floorHeight}
                      fill="#475569"
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                  ))}
                </g>
              </g>
            );
          })}

          {/* Rooftop */}
          <g>
            <path
              d={`
                M ${startX} ${startY}
                L ${startX + floorWidth} ${startY}
                L ${startX + floorWidth + floorDepth * skewX} ${startY - floorDepth * skewY}
                L ${startX + floorDepth * skewX} ${startY - floorDepth * skewY}
                Z
              `}
              fill="#64748b"
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Rooftop equipment */}
            {[
              { x: 60, y: -40, w: 50, h: 30, label: 'HVAC-1' },
              { x: 140, y: -45, w: 55, h: 35, label: 'HVAC-2' },
              { x: 230, y: -50, w: 60, h: 40, label: 'CHILLER', alert: emergencyMode },
              { x: 320, y: -35, w: 45, h: 25, label: 'WATER' },
            ].map((eq, i) => {
              const equipFill = eq.alert ? '#ef4444' : '#94a3b8';
              const equipStroke = eq.alert ? '#dc2626' : '#64748b';
              
              return (
                <g key={`equipment-${i}`}>
                  {/* Equipment box - front face */}
                  <rect
                    x={startX + eq.x}
                    y={startY + eq.y}
                    width={eq.w}
                    height={eq.h}
                    fill={equipFill}
                    stroke={equipStroke}
                    strokeWidth="2"
                    className={eq.alert ? 'animate-pulse' : ''}
                  />
                  {/* Equipment box - top face (isometric) */}
                  <path
                    d={`
                      M ${startX + eq.x} ${startY + eq.y}
                      L ${startX + eq.x + eq.w} ${startY + eq.y}
                      L ${startX + eq.x + eq.w + 15} ${startY + eq.y - 10}
                      L ${startX + eq.x + 15} ${startY + eq.y - 10}
                      Z
                    `}
                    fill={equipFill}
                    stroke={equipStroke}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  {/* Equipment box - side face */}
                  <path
                    d={`
                      M ${startX + eq.x + eq.w} ${startY + eq.y}
                      L ${startX + eq.x + eq.w + 15} ${startY + eq.y - 10}
                      L ${startX + eq.x + eq.w + 15} ${startY + eq.y + eq.h - 10}
                      L ${startX + eq.x + eq.w} ${startY + eq.y + eq.h}
                      Z
                    `}
                    fill={equipFill}
                    stroke={equipStroke}
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                  {/* Label */}
                  <text
                    x={startX + eq.x + eq.w/2}
                    y={startY + eq.y + eq.h/2 + 4}
                    textAnchor="middle"
                    className="text-[10px] font-mono font-semibold fill-white"
                  >
                    {eq.label}
                  </text>
                </g>
              );
            })}

            <text
              x={startX + floorWidth/2}
              y={startY - 80}
              textAnchor="middle"
              className="text-xs font-semibold fill-white tracking-wider"
            >
              ROOFTOP EQUIPMENT
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}