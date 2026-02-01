const fs = require('fs');

// Read file
let content = fs.readFileSync('/src/app/components/FloorPlanView.tsx', 'utf8');

// Replace class name
content = content.replace(
  /className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"/g,
  'className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"'
);

// Replace background color
content = content.replace(
  /backgroundColor: 'rgb\(15, 23, 42\)'/g,
  "backgroundColor: '#ffffff'"
);

// Replace text color patterns in tooltip content
// Pattern 1: Main title color
content = content.replace(
  /(hoveredFloorSensor\.name}<\/div>)/g,
  (match, p1) => {
    return p1;
  }
);

// Add color property to style objects that don't have backgroundColor specified
const styleRegex = /style=\{\{\s*fontWeight: 'bold',\s*marginBottom: `\$\{4 \/ zoom\}px`\s*\}\}/g;
content = content.replace(
  styleRegex,
  "style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}"
);

// Fix color references in spans
content = content.replace(
  /style=\{\{ color: '#9ca3af' \}\}>Status:<\/span>/g,
  "style={{ color: '#64748b', fontWeight: 500 }}>Status:</span>"
);

content = content.replace(
  /style=\{\{ color: '#9ca3af' \}\}>Reading:<\/span>/g,
  "style={{ color: '#64748b' }}>Reading:</span>"
);

content = content.replace(
  /<div style=\{\{ color: '#d1d5db' \}\}>/g,
  "<div style={{ color: '#334155', fontWeight: 500 }}>"
);

// Write back
fs.writeFileSync('/src/app/components/FloorPlanView.tsx', content);
console.log('Fixed all tooltips!');
