# Tooltip Fix Required

The tooltip needs to be:
1. Smaller - more compact
2. Semi-transparent white background (98% opacity) so sensors below are visible  
3. Positioned above sensor, not to the side
4. No arrow - just simple rounded box
5. Just sensor name and value, no status badge

Replace the tooltip div structure (lines 815-865) with:

```tsx
<div 
  className="absolute pointer-events-none whitespace-nowrap"
  style={{ 
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '8px',
    zIndex: 99999
  }}
>
  <div
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(59, 130, 246, 0.4)',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      fontSize: '11px',
      padding: '6px 10px',
      color: '#1e293b',
      fontWeight: 600
    }}
  >
    <div style={{ marginBottom: '2px' }}>{hoveredFloorSensor.name}</div>
    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>
      {hoveredFloorSensor.value}
    </div>
  </div>
</div>
```

This creates a small, semi-transparent tooltip that won't block other sensors.
