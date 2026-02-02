export function IdrakLogo({ className = "w-96 h-96" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 150 110" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Large Shield icon - border only, no background */}
      <path 
        d="M 15 10 L 2 15 L 2 32 C 2 39 7 43 15 46 C 23 43 28 39 28 32 L 28 15 Z" 
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      
      {/* I - blue solid color letter centered on shield */}
      <rect x="13" y="17" width="4" height="22" fill="#3b82f6"/>
      
      {/* Dot below shield to make I look like exclamation mark */}
      <circle cx="15" cy="52" r="2.5" fill="#3b82f6"/>
      
      {/* D - moved further right */}
      <path 
        d="M 35 16 L 35 40 L 43 40 C 49 40 51 36 51 28 C 51 20 49 16 43 16 Z M 39 20 L 43 20 C 46 20 47 22 47 28 C 47 34 46 36 43 36 L 39 36 Z" 
        fill="#3b82f6"
      />
      
      {/* R */}
      <path 
        d="M 59 16 L 59 40 L 63 40 L 63 30 L 67 30 L 71 40 L 75 40 L 71 29 C 73 28 75 26 75 22 C 75 18 73 16 69 16 Z M 63 20 L 69 20 C 70 20 71 20.5 71 22 C 71 23.5 70 24 69 24 L 63 24 Z"
        fill="#3b82f6"
      />
      
      {/* A */}
      <path 
        d="M 83 40 L 87 40 L 88 36 L 96 36 L 97 40 L 101 40 L 95 16 L 89 16 Z M 89.5 32 L 92 22 L 94.5 32 Z"
        fill="#3b82f6"
      />
      
      {/* K */}
      <path 
        d="M 109 16 L 109 40 L 113 40 L 113 30 L 119 40 L 124 40 L 117 28 L 123 16 L 118 16 L 113 26 L 113 16 Z"
        fill="#3b82f6"
      />
    </svg>
  );
}