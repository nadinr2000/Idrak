const fs = require('fs');

// Read the file
const filePath = '/src/app/components/FloorPlanView.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of {hoveredFloorSensor?.id === with {SHOW_INLINE_TOOLTIPS && hoveredFloorSensor?.id ===
// But skip the one we already updated
content = content.replace(
  /{hoveredFloorSensor\?\.id ===/g,
  '{SHOW_INLINE_TOOLTIPS && hoveredFloorSensor?.id ==='
);

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed all inline tooltip conditions');
