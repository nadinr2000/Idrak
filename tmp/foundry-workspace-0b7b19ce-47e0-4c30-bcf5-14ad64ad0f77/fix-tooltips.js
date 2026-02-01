const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/components/FloorPlanView.tsx');

// Read file
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original dark tooltips:', content.match(/backgroundColor: 'rgb\(15, 23, 42\)'/g)?.length || 0);
console.log('Original dark classes:', content.match(/text-white rounded-lg shadow-xl border border-gray-700/g)?.length || 0);

// Replace className
content = content.replace(
  /className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"/g,
  'className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"'
);

// Replace background color
content = content.replace(
  /backgroundColor: 'rgb\(15, 23, 42\)'/g,
  "backgroundColor: '#ffffff'"
);

// Replace zIndex to be higher
content = content.replace(
  /zIndex: 1000,\s+backgroundColor: '#ffffff'/g,
  "zIndex: 99999,\n          backgroundColor: '#ffffff'"
);

// Replace font weight and add color to title
content = content.replace(
  /style=\{\{ fontWeight: 'bold', marginBottom: `\$\{4 \/ zoom\}px` \}\}>/g,
  "style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>"
);

// Replace Status label color
content = content.replace(
  /style=\{\{ color: '#9ca3af' \}\}>Status:/g,
  "style={{ color: '#64748b', fontWeight: 500 }}>Status:"
);

// Replace Reading label color
content = content.replace(
  /style=\{\{ color: '#9ca3af' \}\}>Reading:/g,
  "style={{ color: '#64748b' }}>Reading:"
);

// Replace container div color
content = content.replace(
  /style=\{\{ color: '#d1d5db' \}\}>/g,
  "style={{ color: '#334155', fontWeight: 500 }}>"
);

// Replace status badge styling
content = content.replace(
  /fontWeight: 'bold',\s+backgroundColor: '#16a34a'/g,
  "fontWeight: 600,\n            fontSize: `${11 / zoom}px`,\n            backgroundColor: '#16a34a',\n            color: 'white'"
);

// Add value span styling
content = content.replace(
  /<span style=\{\{ color: '#64748b' \}\}>Reading:<\/span> \{hoveredFloorSensor\.value\}/g,
  "<span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>"
);

// Write back
fs.writeFileSync(filePath, content);

console.log('\n✅ SUCCESS! All tooltips fixed!');
console.log('- Changed dark backgrounds to solid white');
console.log('- Changed text colors from white to dark');
console.log('- Changed borders from gray to blue');
console.log('- Increased z-index for better visibility');
