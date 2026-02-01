#!/usr/bin/env python3
import re

file_path = '/tmp/foundry-workspace-0b7b19ce-47e0-4c30-bcf5-14ad64ad0f77/src/app/components/FloorPlanView.tsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Count occurrences before
dark_count = content.count("backgroundColor: 'rgb(15, 23, 42)'")
class_count = content.count('className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"')
print(f"Found {dark_count} dark backgrounds and {class_count} dark classes")

# Replace 1: className
content = content.replace(
    'className="absolute text-white rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"',
    'className="absolute rounded-lg shadow-2xl border-2 border-blue-500 pointer-events-none whitespace-nowrap"'
)

# Replace 2: backgroundColor
content = content.replace(
    "backgroundColor: 'rgb(15, 23, 42)'",
    "backgroundColor: '#ffffff'"
)

# Replace 3: zIndex
content = content.replace(
    "zIndex: 1000,\n                          backgroundColor: '#ffffff'",
    "zIndex: 99999,\n                          backgroundColor: '#ffffff'"
)
content = content.replace(
    "zIndex: 1000,\n                        backgroundColor: '#ffffff'",
    "zIndex: 99999,\n                        backgroundColor: '#ffffff'"
)
content = content.replace(
    "zIndex: 1000,\n                       backgroundColor: '#ffffff'",
    "zIndex: 99999,\n                       backgroundColor: '#ffffff'"
)

# Replace 4: fontWeight bold -> 700 and add color
content = re.sub(
    r"style=\{\{ fontWeight: 'bold', marginBottom: `\$\{4 / zoom\}px` \}\}>",
    "style={{ fontWeight: 700, marginBottom: `${4 / zoom}px`, color: '#1e293b' }}>",
    content
)

# Replace 5: Status label color
content = content.replace(
    "style={{ color: '#9ca3af' }}>Status:",
    "style={{ color: '#64748b', fontWeight: 500 }}>Status:"
)

# Replace 6: Reading label color  
content = content.replace(
    "style={{ color: '#9ca3af' }}>Reading:",
    "style={{ color: '#64748b' }}>Reading:"
)

# Replace 7: Container div color
content = content.replace(
    "style={{ color: '#d1d5db' }}>",
    "style={{ color: '#334155', fontWeight: 500 }}>"
)

# Replace 8: Status badge fontWeight
content = re.sub(
    r"fontWeight: 'bold',\n                            backgroundColor: '#16a34a'",
    "fontWeight: 600,\n                            fontSize: `${11 / zoom}px`,\n                            backgroundColor: '#16a34a',\n                            color: 'white'",
    content
)
content = re.sub(
    r"fontWeight: 'bold',\n                          backgroundColor: '#16a34a'",
    "fontWeight: 600,\n                          fontSize: `${11 / zoom}px`,\n                          backgroundColor: '#16a34a',\n                          color: 'white'",
    content
)
content = re.sub(
    r"fontWeight: 'bold',\n                        backgroundColor: '#16a34a'",
    "fontWeight: 600,\n                        fontSize: `${11 / zoom}px`,\n                        backgroundColor: '#16a34a',\n                        color: 'white'",
    content
)

# Replace 9: Add value span styling  
content = re.sub(
    r"<span style=\{\{ color: '#64748b' \}\}>Reading:</span> \{hoveredFloorSensor\.value\}",
    "<span style={{ color: '#64748b' }}>Reading:</span> <span style={{ fontWeight: 600, color: '#1e293b' }}>{hoveredFloorSensor.value}</span>",
    content
)

# Write the modified content back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Fixed all tooltips! Replaced {dark_count} dark backgrounds and {class_count} dark classes")
print("All tooltips now have solid white backgrounds with dark text")
