import { Language, translations } from '../translations';
import { Plus, Clock, MapPin, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { EnhancedLocationSelector } from './EnhancedLocationSelector';

interface Threat {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timeValue?: number;
  timeOccurrence?: string;
  specificType?: string;
  threshold?: string;
}

interface ThreatType {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface ThreatTimelineProps {
  language: Language;
  threats: Threat[];
  durationValue: string;
  durationType: 'hours' | 'days' | 'months';
  threatTypes: ThreatType[];
  onAddThreat: (threat: Threat) => void;
  onRemoveThreat: (index: number) => void;
  onUpdateThreat: (index: number, field: keyof Threat, value: any) => void;
  onOpenLocationSelector: (threatIndex: number) => void;
  onOpenLocationSelectorForNew?: (callback: (location: string) => void) => void;
  getThreatIcon: (type: string) => { Icon: any; color: string };
  getThreatName: (type: string) => string;
  getSeverityColor: (severity: string) => string;
  getSeverityText: (severity: string) => string;
  getThreatSpecificOptions: (threatType: string) => any;
  scenarioComplexity?: 'simple' | 'detailed';
}

export function ThreatTimeline({
  language,
  threats,
  durationValue,
  durationType,
  threatTypes,
  onAddThreat,
  onRemoveThreat,
  onUpdateThreat,
  onOpenLocationSelector,
  onOpenLocationSelectorForNew,
  getThreatIcon,
  getThreatName,
  getSeverityColor,
  getSeverityText,
  getThreatSpecificOptions,
  scenarioComplexity,
}: ThreatTimelineProps) {
  const t = translations[language];
  const [showAddThreat, setShowAddThreat] = useState(false);
  const [newThreatType, setNewThreatType] = useState('');
  const [newThreatData, setNewThreatData] = useState<any>({ severity: 'medium' });
  const [selectedTimepoint, setSelectedTimepoint] = useState<number>(0);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [timeInputValue, setTimeInputValue] = useState('0');

  // Generate timeline points
  const generateTimelinePoints = () => {
    if (!durationValue) return [];
    const value = parseInt(durationValue);
    const points: number[] = [];
    
    // Smart tick mark generation based on duration
    // Aim for approximately 10-15 tick marks maximum for readability
    let interval = 1;
    
    if (durationType === 'hours') {
      if (value <= 12) {
        interval = 1; // Show every hour up to 12 hours
      } else if (value <= 24) {
        interval = 2; // Show every 2 hours up to 24 hours
      } else if (value <= 48) {
        interval = 4; // Show every 4 hours up to 48 hours
      } else if (value <= 72) {
        interval = 6; // Show every 6 hours up to 72 hours
      } else if (value <= 168) { // 1 week
        interval = 12; // Show every 12 hours
      } else {
        interval = 24; // Show every day for longer durations
      }
    } else if (durationType === 'days') {
      if (value <= 7) {
        interval = 1; // Show every day up to 1 week
      } else if (value <= 14) {
        interval = 2; // Show every 2 days up to 2 weeks
      } else if (value <= 30) {
        interval = 3; // Show every 3 days up to 1 month
      } else if (value <= 90) {
        interval = 7; // Show every week up to 3 months
      } else {
        interval = 15; // Show every 15 days for longer durations
      }
    } else { // months
      if (value <= 6) {
        interval = 1; // Show every month up to 6 months
      } else if (value <= 12) {
        interval = 2; // Show every 2 months up to 1 year
      } else {
        interval = 3; // Show every 3 months for longer durations
      }
    }
    
    // Generate points at the calculated interval
    for (let i = 0; i <= value; i += interval) {
      points.push(i);
    }
    
    // Always ensure the last point is included if not already there
    if (points[points.length - 1] !== value) {
      points.push(value);
    }
    
    return points;
  };

  // Format timepoint label
  const formatTimepoint = (point: number) => {
    // Handle decimal points for more precise time display
    const roundedPoint = Math.round(point * 10) / 10; // Round to 1 decimal place
    
    if (durationType === 'hours') {
      if (roundedPoint === Math.floor(roundedPoint)) {
        return language === 'ar' ? `${roundedPoint}س` : `${roundedPoint}h`;
      } else {
        // Convert decimal to hours and minutes (e.g., 2.5 -> 2h 30m)
        const hours = Math.floor(roundedPoint);
        const minutes = Math.round((roundedPoint - hours) * 60);
        if (hours === 0) {
          return language === 'ar' ? `${minutes}د` : `${minutes}m`;
        }
        return language === 'ar' ? `${hours}س ${minutes}د` : `${hours}h ${minutes}m`;
      }
    } else if (durationType === 'days') {
      if (roundedPoint === Math.floor(roundedPoint)) {
        // Whole days
        return language === 'ar' ? `${roundedPoint}ي` : `${roundedPoint}d`;
      } else {
        // Fractional days - show in hours
        const totalHours = roundedPoint * 24;
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);
        
        if (hours === 0) {
          return language === 'ar' ? `${minutes}د` : `${minutes}m`;
        } else if (minutes === 0) {
          return language === 'ar' ? `${hours}س` : `${hours}h`;
        } else {
          return language === 'ar' ? `${hours}س ${minutes}د` : `${hours}h ${minutes}m`;
        }
      }
    } else {
      // months
      if (roundedPoint === Math.floor(roundedPoint)) {
        // Whole months
        return language === 'ar' ? `${roundedPoint}ش` : `${roundedPoint}m`;
      } else {
        // Fractional months - show in days (assuming 30 days per month)
        const totalDays = Math.round(roundedPoint * 30);
        return language === 'ar' ? `${totalDays}ي` : `${totalDays}d`;
      }
    }
  };

  // Handle timeline click/drag
  const handleTimelineInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const maxValue = parseInt(durationValue) || 1;
    const timeValue = percentage * maxValue;
    
    // Round to 2 decimal places for finer granularity
    const roundedTime = Math.round(timeValue * 100) / 100;
    
    setSelectedTimepoint(roundedTime);
    setTimeInputValue(roundedTime.toString());
    setShowAddThreat(false);
    setNewThreatType('');
  };

  const handleTimelineMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) {
      handleTimelineInteraction(e);
    } else {
      // Just hovering
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const maxValue = parseInt(durationValue) || 1;
      const timeValue = percentage * maxValue;
      const roundedTime = Math.round(timeValue * 100) / 100;
      setHoveredTime(roundedTime);
    }
  };

  // Handle manual time input
  const handleTimeInputChange = (value: string) => {
    setTimeInputValue(value);
  };

  const handleTimeInputSubmit = () => {
    const parsed = parseFloat(timeInputValue);
    const maxValue = parseInt(durationValue) || 1;
    
    if (!isNaN(parsed) && parsed >= 0 && parsed <= maxValue) {
      const rounded = Math.round(parsed * 100) / 100;
      setSelectedTimepoint(rounded);
      setTimeInputValue(rounded.toString());
      setIsEditingTime(false);
      setShowAddThreat(false);
      setNewThreatType('');
    } else {
      // Reset to current value if invalid
      setTimeInputValue(selectedTimepoint.toString());
      setIsEditingTime(false);
    }
  };

  const handleTimeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTimeInputSubmit();
    } else if (e.key === 'Escape') {
      setTimeInputValue(selectedTimepoint.toString());
      setIsEditingTime(false);
    }
  };

  const handleAddNewThreat = () => {
    if (!newThreatType || selectedTimepoint === null) return;
    
    const newThreat: Threat = {
      type: newThreatType,
      severity: newThreatData.severity as 'low' | 'medium' | 'high' | 'critical',
      location: newThreatData.location || '',
      timeValue: selectedTimepoint,
      timeOccurrence: formatTimepoint(selectedTimepoint),
      specificType: newThreatData.specificType || '',
      threshold: newThreatData.threshold || '',
    };
    
    onAddThreat(newThreat);
    setNewThreatType('');
    setNewThreatData({ severity: 'medium' }); // Reset with default severity
    setShowAddThreat(false);
  };

  const handleCancelAddThreat = () => {
    setShowAddThreat(false);
    setNewThreatType('');
    setNewThreatData({ severity: 'medium' }); // Reset with default severity
  };

  const timelinePoints = generateTimelinePoints();
  const threatsAtSelectedTime = selectedTimepoint !== null 
    ? threats.map((threat, index) => ({ threat, index })).filter(({ threat }) => threat.timeValue === selectedTimepoint)
    : [];

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'الجدول الزمني للتهديدات' : 'Threat Timeline'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {language === 'ar' 
              ? 'اختر نقطة زمنية لإضافة أو عرض التهديدات'
              : 'Select a time point to add or view threats'}
          </p>
        </div>
        <div className="text-sm text-gray-600">
          {language === 'ar' ? 'المدة الإجمالية:' : 'Total Duration:'}{' '}
          <span className="font-semibold text-gray-900">
            {durationValue} {durationType === 'hours' ? t.hours : durationType === 'days' ? t.days : t.months}
          </span>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <div className="relative">
          {/* Time labels */}
          <div className="flex justify-between mb-3 px-2">
            <span className="text-sm font-medium text-gray-700">
              {formatTimepoint(0)}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {formatTimepoint(parseInt(durationValue) || 0)}
            </span>
          </div>

          {/* Interactive Timeline Bar */}
          <div
            className="relative h-4 bg-white rounded-full shadow-inner cursor-pointer"
            onClick={handleTimelineInteraction}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleTimelineMove}
            onMouseLeave={() => {
              setHoveredTime(null);
              setIsDragging(false);
            }}
          >
            {/* Gradient fill up to selected point */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-150"
              style={{ 
                width: `${(selectedTimepoint / (parseInt(durationValue) || 1)) * 100}%` 
              }}
            />

            {/* Hover indicator */}
            {hoveredTime !== null && hoveredTime !== selectedTimepoint && (
              <div
                className="absolute top-0 h-full w-1 bg-indigo-400 opacity-50 rounded-full"
                style={{
                  left: `${(hoveredTime / (parseInt(durationValue) || 1)) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              />
            )}

            {/* Selected time marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 size-8 bg-indigo-600 border-4 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transition-all duration-150 hover:scale-110"
              style={{
                left: `${(selectedTimepoint / (parseInt(durationValue) || 1)) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />

            {/* Threat markers on timeline */}
            {threats.map((threat, idx) => {
              if (threat.timeValue === undefined) return null;
              const position = (threat.timeValue / (parseInt(durationValue) || 1)) * 100;
              
              return (
                <div
                  key={idx}
                  className="absolute top-1/2 -translate-y-1/2 size-3 bg-red-500 rounded-full border-2 border-white shadow-md"
                  style={{
                    left: `${position}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}
                  title={`${getThreatName(threat.type)} at ${formatTimepoint(threat.timeValue)}`}
                />
              );
            })}
          </div>

          {/* Hover time display */}
          {hoveredTime !== null && (
            <div
              className="absolute top-full mt-2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg pointer-events-none"
              style={{
                left: `${(hoveredTime / (parseInt(durationValue) || 1)) * 100}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {formatTimepoint(hoveredTime)}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 bg-gray-900 rotate-45" />
            </div>
          )}

          {/* Tick marks */}
          <div className="relative flex justify-between mt-6 px-2">
            {timelinePoints.map((point) => {
              const threatsAtPoint = threats.filter(t => t.timeValue === point);
              const hasThreats = threatsAtPoint.length > 0;

              return (
                <div key={point} className="flex flex-col items-center">
                  <div className="w-px h-3 bg-gray-400" />
                  <span className="text-xs text-gray-600 mt-1">
                    {formatTimepoint(point)}
                  </span>
                  {hasThreats && (
                    <div className="mt-1 size-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                      {threatsAtPoint.length}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Timepoint Panel */}
      {selectedTimepoint !== null && (
        <div className="bg-white border-2 border-indigo-300 rounded-xl p-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Editable Time Badge */}
              {isEditingTime ? (
                <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                  <Clock className="size-5" />
                  <input
                    type="number"
                    value={timeInputValue}
                    onChange={(e) => handleTimeInputChange(e.target.value)}
                    onBlur={handleTimeInputSubmit}
                    onKeyDown={handleTimeInputKeyDown}
                    className="w-20 bg-white border border-indigo-300 rounded px-2 py-0.5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                    step="0.01"
                    min="0"
                    max={durationValue}
                  />
                  <span className="text-sm">
                    {durationType === 'hours' ? (language === 'ar' ? 'س' : 'h') : 
                     durationType === 'days' ? (language === 'ar' ? 'ي' : 'd') : 
                     (language === 'ar' ? 'ش' : 'm')}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsEditingTime(true);
                    setTimeInputValue(selectedTimepoint.toString());
                  }}
                  className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-indigo-200 transition-colors cursor-pointer"
                >
                  <Clock className="size-5" />
                  {formatTimepoint(selectedTimepoint)}
                </button>
              )}
              <span className="text-gray-600">
                {language === 'ar' 
                  ? `${threatsAtSelectedTime.length} ${threatsAtSelectedTime.length === 1 ? 'تهديد' : 'تهديدات'}`
                  : `${threatsAtSelectedTime.length} threat${threatsAtSelectedTime.length !== 1 ? 's' : ''}`}
              </span>
            </div>

            {/* Add Threat Button - Only show when form is closed */}
            {!showAddThreat && (
              <button
                onClick={() => setShowAddThreat(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2 shadow-md"
              >
                <Plus className="size-5" />
                {language === 'ar' ? 'إضافة تهديد' : 'Add Threat'}
              </button>
            )}
          </div>

          {/* Add New Threat Form */}
          {showAddThreat && (
            <div className="mb-6 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">
                {language === 'ar' ? 'تهديد جديد' : 'New Threat'}
              </h4>
              
              {/* Threat Type Dropdown */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'نوع التهديد' : 'Threat Type'}
                </label>
                <div className="relative">
                  <select
                    value={newThreatType}
                    onChange={(e) => setNewThreatType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white pr-10"
                  >
                    <option value="">
                      {language === 'ar' ? '-- اختر نوع التهديد --' : '-- Select Threat Type --'}
                    </option>
                    {threatTypes.map((threat) => (
                      <option key={threat.id} value={threat.id}>
                        {getThreatName(threat.id)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Configuration Fields - Show when threat type is selected */}
              {newThreatType && (
                <>
                  {/* Threat Header with Icon */}
                  <div className="flex items-center gap-3 pt-2 border-t border-indigo-300">
                    {(() => {
                      const { Icon, color } = getThreatIcon(newThreatType);
                      return <Icon className={`size-6 ${color}`} />;
                    })()}
                    <span className="font-semibold text-gray-900 text-lg">
                      {getThreatName(newThreatType)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Location - Only show in detailed scenarios */}
                    {scenarioComplexity === 'detailed' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          {t.device}
                        </label>
                        <button
                          onClick={() => {
                            if (onOpenLocationSelectorForNew) {
                              onOpenLocationSelectorForNew((location) => {
                                setNewThreatData({ ...newThreatData, location });
                              });
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-left flex items-center gap-2 hover:bg-white bg-white"
                        >
                          <MapPin className="size-4 text-gray-600" />
                          <span className={newThreatData.location ? 'text-gray-900' : 'text-gray-500'}>
                            {newThreatData.location || t.devicePlaceholder}
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Severity */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        {t.severity}
                      </label>
                      <select
                        value={newThreatData.severity}
                        onChange={(e) => setNewThreatData({ ...newThreatData, severity: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                      >
                        <option value="low">{getSeverityText('low')}</option>
                        <option value="medium">{getSeverityText('medium')}</option>
                        <option value="high">{getSeverityText('high')}</option>
                        <option value="critical">{getSeverityText('critical')}</option>
                      </select>
                    </div>

                    {/* Threat-Specific Parameters */}
                    {(() => {
                      const specificOptions = getThreatSpecificOptions(newThreatType);
                      if (!specificOptions) return null;
                      
                      return (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                              {specificOptions.typeLabel}
                            </label>
                            <select
                              value={newThreatData.specificType || ''}
                              onChange={(e) => setNewThreatData({ ...newThreatData, specificType: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                            >
                              {specificOptions.typeOptions.map((opt: any) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                              {specificOptions.thresholdLabel}
                            </label>
                            <select
                              value={newThreatData.threshold || ''}
                              onChange={(e) => setNewThreatData({ ...newThreatData, threshold: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                            >
                              {specificOptions.thresholdOptions.map((opt: any) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Action Buttons - Inside grey card */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-indigo-300 mt-2">
                    <button
                      onClick={handleCancelAddThreat}
                      className="px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium flex items-center gap-2"
                    >
                      <X className="size-4" />
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      onClick={handleAddNewThreat}
                      className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
                    >
                      {language === 'ar' ? 'حفظ التهديد' : 'Save Threat'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Threats at this timepoint */}
          {threatsAtSelectedTime.length > 0 && (
            <div className="space-y-3">
              {threatsAtSelectedTime.map(({ threat, index }) => {
                const { Icon, color } = getThreatIcon(threat.type);
                const specificOptions = getThreatSpecificOptions(threat.type);

                return (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    {/* Threat Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon className={`size-6 ${color}`} />
                        <span className="font-semibold text-gray-900 text-lg">{getThreatName(threat.type)}</span>
                      </div>
                      <button
                        onClick={() => onRemoveThreat(index)}
                        className="text-red-600 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                      >
                        <X className="size-5" />
                      </button>
                    </div>

                    {/* Threat Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Location - Only show in detailed scenarios */}
                      {scenarioComplexity === 'detailed' && (
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-2">
                            {t.device}
                          </label>
                          <button
                            onClick={() => onOpenLocationSelector(index)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-left flex items-center gap-2 hover:bg-white"
                          >
                            <MapPin className="size-4 text-gray-600" />
                            <span className={threat.location ? 'text-gray-900' : 'text-gray-500'}>
                              {threat.location || t.devicePlaceholder}
                            </span>
                          </button>
                        </div>
                      )}

                      {/* Severity */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          {t.severity}
                        </label>
                        <select
                          value={threat.severity}
                          onChange={(e) => onUpdateThreat(index, 'severity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                        >
                          <option value="low">{getSeverityText('low')}</option>
                          <option value="medium">{getSeverityText('medium')}</option>
                          <option value="high">{getSeverityText('high')}</option>
                          <option value="critical">{getSeverityText('critical')}</option>
                        </select>
                      </div>

                      {/* Threat-Specific Parameters */}
                      {specificOptions && (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                              {specificOptions.typeLabel}
                            </label>
                            <select
                              value={threat.specificType || ''}
                              onChange={(e) => onUpdateThreat(index, 'specificType', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                            >
                              {specificOptions.typeOptions.map((opt: any) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                              {specificOptions.thresholdLabel}
                            </label>
                            <select
                              value={threat.threshold || ''}
                              onChange={(e) => onUpdateThreat(index, 'threshold', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                            >
                              {specificOptions.thresholdOptions.map((opt: any) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State for Selected Timepoint */}
          {threatsAtSelectedTime.length === 0 && !showAddThreat && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">
                {language === 'ar' 
                  ? 'لا توجد تهديدات في هذا الوقت'
                  : 'No threats at this time point'}
              </p>
              <p className="text-xs mt-1">
                {language === 'ar'
                  ? 'انقر على "إضافة تهديد" لإضافة تهديد جديد'
                  : 'Click "Add Threat" to add a new threat'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Initial State - No Timepoint Selected */}
      {selectedTimepoint === null && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <Clock className="size-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 font-medium mb-2">
            {language === 'ar' 
              ? 'اختر نقطة زمنية من الجدول الزمني أعلاه'
              : 'Select a time point from the timeline above'}
          </p>
          <p className="text-sm text-gray-500">
            {language === 'ar'
              ? 'انقر على أي وقت (مثل 0س، 1س، 2س) لبدء إضافة التهديدات'
              : 'Click on any time (e.g., 0h, 1h, 2h) to start adding threats'}
          </p>
        </div>
      )}

      {/* Summary Stats */}
      {threats.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">
              {language === 'ar' ? 'إجمالي التهديدات:' : 'Total Threats:'}
            </span>
            <span className="text-blue-700 font-bold text-lg">{threats.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}