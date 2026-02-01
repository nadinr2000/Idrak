import { AlertTriangle, Play, Pause, FastForward, Clock, X } from 'lucide-react';
import { Language, translations } from '../translations';
import { useState } from 'react';

interface EmergencyBarProps {
  scenarioName: string;
  language: Language;
  isRunning: boolean;
  isPaused: boolean;
  currentTime: number;
  speed: 1 | 2 | 4;
  onTogglePause: () => void;
  onChangeSpeed: () => void;
  onClose: () => void;
  onTimeChange?: (seconds: number) => void;
}

export function EmergencyBar({
  scenarioName,
  language,
  isRunning,
  isPaused,
  currentTime,
  speed,
  onTogglePause,
  onChangeSpeed,
  onClose,
  onTimeChange
}: EmergencyBarProps) {
  const t = translations[language];
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editedTime, setEditedTime] = useState('');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parseTime = (timeStr: string): number => {
    const parts = timeStr.split(':').map(p => parseInt(p, 10) || 0);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
  };

  const handleTimeClick = () => {
    setIsEditingTime(true);
    setEditedTime(formatTime(currentTime));
  };

  const handleTimeBlur = () => {
    setIsEditingTime(false);
    if (editedTime && onTimeChange) {
      const newSeconds = parseTime(editedTime);
      if (newSeconds >= 0) {
        onTimeChange(newSeconds);
      }
    }
  };

  const handleTimeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTimeBlur();
    } else if (e.key === 'Escape') {
      setIsEditingTime(false);
      setEditedTime('');
    }
  };

  const adjustTime = (delta: number) => {
    if (onTimeChange) {
      const newTime = Math.max(0, currentTime + delta);
      onTimeChange(newTime);
    }
  };

  return (
    <div className="bg-gray-700 text-white px-6 py-1.5 flex items-center justify-between shadow-md border-b border-gray-600">
      {/* Left: Emergency Indicator */}
      <div className="flex items-center gap-3">
        <AlertTriangle className="size-4" />
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wide text-xs">
            {t.liveSimulation || 'Live Simulation'}
          </span>
          <span className="text-gray-400 text-xs">•</span>
          <span className="text-xs text-gray-300">{scenarioName}</span>
        </div>
      </div>

      {/* Center: Timer - Enhanced Editable */}
      <div className="flex items-center gap-2">
        {/* Time Adjustment Buttons */}
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => adjustTime(60)}
            className="bg-gray-600 hover:bg-gray-500 rounded px-1.5 py-0.5 transition-colors border border-gray-500"
            title="Add 1 minute"
          >
            <svg className="size-2.5 fill-white" viewBox="0 0 24 24">
              <path d="M7 14l5-5 5 5z"/>
            </svg>
          </button>
          <button
            onClick={() => adjustTime(-60)}
            className="bg-gray-600 hover:bg-gray-500 rounded px-1.5 py-0.5 transition-colors border border-gray-500"
            title="Subtract 1 minute"
          >
            <svg className="size-2.5 fill-white" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
        </div>

        {/* Time Display/Editor */}
        <div className="flex items-center gap-2 bg-black bg-opacity-40 px-4 py-1.5 rounded border border-gray-600">
          <Clock className="size-3.5 text-gray-300" />
          {isEditingTime ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                onBlur={handleTimeBlur}
                onKeyDown={handleTimeKeyDown}
                className="text-sm font-mono font-bold bg-gray-800 border border-blue-400 rounded px-2 py-0.5 outline-none w-28 text-white focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
                placeholder="HH:MM:SS"
                autoFocus
                onFocus={(e) => e.target.select()}
              />
              <span className="text-[10px] text-gray-400 whitespace-nowrap">Press Enter</span>
            </div>
          ) : (
            <button
              onClick={handleTimeClick}
              className="flex items-center gap-2 hover:bg-gray-700 hover:bg-opacity-50 rounded px-2 py-0.5 transition-all group"
              title="Click to edit time (HH:MM:SS)"
            >
              <span className="text-sm font-mono font-bold text-white select-all">{formatTime(currentTime)}</span>
              <svg className="size-3 stroke-gray-400 group-hover:stroke-blue-400 transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
          )}
        </div>

        {/* Next Event Button */}
        <button
          onClick={() => {
            // This will be implemented to jump to next threat event
            // For now, just demonstrate the button
            console.log('Next Event clicked');
          }}
          className="bg-blue-600 hover:bg-blue-500 rounded px-4 py-1.5 transition-colors border border-blue-500 text-xs font-semibold text-white flex items-center gap-1.5"
          title="Jump to next event"
        >
          <FastForward className="size-3.5" />
          {language === 'ar' ? 'الحدث التالي' : 'Next Event'}
        </button>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {isRunning && (
          <>
            <button
              onClick={onTogglePause}
              className="flex items-center gap-1.5 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded transition-colors border border-gray-500"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? (
                <>
                  <svg className="size-3 fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span className="text-white font-semibold text-xs">Resume</span>
                </>
              ) : (
                <>
                  <svg className="size-3 fill-white" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                  <span className="text-white font-semibold text-xs">Pause</span>
                </>
              )}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="flex items-center gap-1.5 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded transition-colors border border-gray-500"
          title="Close Simulation"
        >
          <svg className="size-3 stroke-white stroke-2" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
          <span className="text-white font-semibold text-xs">{t.closeSimulation || 'Close'}</span>
        </button>
      </div>
    </div>
  );
}