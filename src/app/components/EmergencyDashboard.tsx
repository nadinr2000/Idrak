import { AlertTriangle, Brain, Target, Clock, Users, CheckCircle, Wind, Shield, MapPin, Sparkles, AlertCircle, X, TrendingUp, Activity, Zap, Gauge, Radio, Filter } from 'lucide-react';
import { Language, translations } from '../translations';
import { useState } from 'react';

interface EmergencyDashboardProps {
  language: Language;
}

export function EmergencyDashboard({ language }: EmergencyDashboardProps) {
  const t = translations[language];
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <div className="max-w-[1800px] mx-auto p-8">
        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* COLUMN 1: CURRENT STATUS SUMMARY */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Activity className="size-4" />
              {language === 'en' ? 'Current Status Summary' : 'ملخص الحالة الحالية'}
            </h3>
            
            <div className="bg-red-50 rounded-lg shadow-lg border border-red-200 p-6 flex flex-col h-fit sticky top-8">
              {/* Threat Overview */}
              <div className="mb-6 pb-6 border-b border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="size-5 text-red-600" />
                  <h4 className="font-bold text-slate-900">{t.chemicalThreat}</h4>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold uppercase rounded">
                    {t.critical}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{language === 'en' ? 'Agent:' : 'العامل:'}</span>
                    <span className="font-semibold text-slate-900">{language === 'en' ? 'Chlorine Gas (Cl₂)' : 'غاز الكلور (Cl₂)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{language === 'en' ? 'Concentration:' : 'التركيز:'}</span>
                    <span className="font-semibold text-red-600">15.7 ppm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{language === 'en' ? 'Location:' : 'الموقع:'}</span>
                    <span className="font-semibold text-slate-900">{language === 'en' ? 'Floor 2 - Sector B' : 'الطابق 2 - القطاع ب'}</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="space-y-3 mb-4">
                {/* Spreading Rate - Temporal Graph */}
                <div className="bg-white rounded-lg p-4 border border-red-300 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      {language === 'en' ? 'Spread Since Detection' : 'الانتشار منذ الكشف'}
                    </span>
                    <TrendingUp className="size-4 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-1">2.3 m/min</div>
                  <div className="text-xs text-red-600 font-semibold mb-4">
                    {language === 'en' ? 'Rapid via HVAC' : 'سريع عبر التهوية'}
                  </div>
                  {/* Temporal Spread Graph */}
                  <div className="relative h-28 bg-slate-50 rounded border border-slate-200 p-2">
                    {/* Y-axis labels */}
                    <div className="absolute left-1 top-2 bottom-2 flex flex-col justify-between text-xs text-slate-400">
                      <span>3</span>
                      <span>2</span>
                      <span>1</span>
                      <span className="text-xs">T0</span>
                    </div>
                    {/* Graph area */}
                    <div className="ml-7 h-full relative">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Grid lines */}
                        <line x1="0" y1="25" x2="100" y2="25" stroke="#e2e8f0" strokeWidth="0.5" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" />
                        <line x1="0" y1="75" x2="100" y2="75" stroke="#e2e8f0" strokeWidth="0.5" />
                        {/* Area fill */}
                        <path
                          d="M 0,100 L 0,80 Q 20,65 30,58 Q 40,52 50,42 Q 60,32 70,24 Q 80,16 90,10 L 100,5 L 100,100 Z"
                          fill="url(#spreadGradient)"
                          opacity="0.4"
                        />
                        {/* Line */}
                        <path
                          d="M 0,80 Q 20,65 30,58 Q 40,52 50,42 Q 60,32 70,24 Q 80,16 90,10 L 100,5"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Data points */}
                        <circle cx="0" cy="80" r="2.5" fill="#dc2626" />
                        <circle cx="30" cy="58" r="2.5" fill="#dc2626" />
                        <circle cx="60" cy="32" r="2.5" fill="#dc2626" />
                        <circle cx="100" cy="5" r="3" fill="#dc2626" />
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="spreadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#dc2626" />
                            <stop offset="100%" stopColor="#fee2e2" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  {/* X-axis labels */}
                  <div className="flex justify-between text-xs text-slate-400 mt-2 ml-7 pr-2">
                    <span>T0</span>
                    <span>+3m</span>
                    <span>+6m</span>
                    <span className="font-semibold text-red-600">{language === 'en' ? 'Now' : 'الآن'}</span>
                  </div>
                </div>

                {/* Affected Zones - Visual Grid */}
                <div className="bg-white rounded-lg p-3 border border-orange-300 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      {t.affectedZones}
                    </span>
                    <MapPin className="size-3.5 text-orange-600" />
                  </div>
                  <div className="text-xl font-bold text-orange-600 mb-2">3 {language === 'en' ? 'zones' : 'مناطق'}</div>
                  <div className="text-xs text-slate-600 mb-2">
                    {language === 'en' ? 'B-201, B-202, B-203' : 'ب-201، ب-202، ب-203'}
                  </div>
                  {/* Visual Zone Grid */}
                  <div className="grid grid-cols-4 gap-1">
                    <div className="h-6 bg-orange-500 rounded flex items-center justify-center">
                      <span className="text-xs text-white font-bold">B1</span>
                    </div>
                    <div className="h-6 bg-orange-500 rounded flex items-center justify-center">
                      <span className="text-xs text-white font-bold">B2</span>
                    </div>
                    <div className="h-6 bg-orange-500 rounded flex items-center justify-center">
                      <span className="text-xs text-white font-bold">B3</span>
                    </div>
                    <div className="h-6 bg-slate-200 rounded flex items-center justify-center">
                      <span className="text-xs text-slate-400 font-bold">A1</span>
                    </div>
                  </div>
                </div>

                {/* Affected Personnel - Visual Progress */}
                <div className="bg-white rounded-lg p-3 border border-amber-300 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      {t.affectedPersonnel}
                    </span>
                    <Users className="size-3.5 text-amber-600" />
                  </div>
                  <div className="text-xl font-bold text-amber-600 mb-2">12 {language === 'en' ? 'personnel' : 'موظف'}</div>
                  <div className="text-xs text-slate-600 mb-2">
                    {language === 'en' ? '8 evacuated, 4 in process' : '8 تم إخلاؤهم، 4 قيد الإجراء'}
                  </div>
                  {/* Visual Personnel Status */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '67%' }}></div>
                      </div>
                      <span className="text-xs text-green-600 font-semibold w-8">8</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 animate-pulse" style={{ width: '33%' }}></div>
                      </div>
                      <span className="text-xs text-amber-600 font-semibold w-8">4</span>
                    </div>
                  </div>
                </div>

                {/* Survival Rate - Circular Progress */}
                <div className="bg-white rounded-lg p-3 border border-green-300 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      {t.survivalRate}
                    </span>
                    <Shield className="size-3.5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Circular Progress */}
                    <div className="relative size-16 flex-shrink-0">
                      <svg className="size-16 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3"></circle>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#16a34a" strokeWidth="3" strokeDasharray="92, 100" strokeLinecap="round"></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-green-600">92%</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-green-600 font-semibold mb-1">
                        {language === 'en' ? 'With immediate action' : 'مع الإجراء الفوري'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {language === 'en' ? 'Time critical: <5 min' : 'حرج: <5 دقائق'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Status */}
              <div className="pt-4 border-t border-red-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  {language === 'en' ? 'Response Status' : 'حالة الاستجابة'}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-green-50 rounded px-3 py-2 border border-green-200">
                    <CheckCircle className="size-4 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-900">{language === 'en' ? 'Alarm Active' : 'الإنذار نشط'}</div>
                      <div className="text-xs text-green-600">{language === 'en' ? 'Triggered' : 'مفعل'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 rounded px-3 py-2 border border-green-200">
                    <CheckCircle className="size-4 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-900">{language === 'en' ? 'Area Sealed' : 'المنطقة مغلقة'}</div>
                      <div className="text-xs text-green-600">{language === 'en' ? 'Complete' : 'مكتمل'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-amber-50 rounded px-3 py-2 border border-amber-200">
                    <Activity className="size-4 text-amber-600 flex-shrink-0 animate-pulse" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-900">{language === 'en' ? 'Evacuation' : 'الإخلاء'}</div>
                      <div className="text-xs text-amber-600">{language === 'en' ? '8/12 Clear' : '8/12 آمن'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-blue-50 rounded px-3 py-2 border border-blue-200">
                    <Users className="size-4 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-900">{language === 'en' ? 'CBRN Team' : 'فريق CBRN'}</div>
                      <div className="text-xs text-blue-600">{language === 'en' ? 'ETA 2m' : 'الوصول 2د'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Threat Assessment */}
              <div className="pt-4 mt-4 border-t border-red-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Brain className="size-3.5" />
                  {language === 'en' ? 'AI Threat Assessment' : 'تقييم التهديد بالذكاء الاصطناعي'}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="size-1.5 rounded-full bg-red-600 mt-1 flex-shrink-0"></div>
                    <p className="text-slate-700 leading-snug">
                      {language === 'en' 
                        ? 'Concentration exceeds IDLH threshold (10 ppm). Critical exposure risk.' 
                        : 'التركيز يتجاوز عتبة IDLH (10 جزء في المليون). خطر التعرض الحرج.'}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="size-1.5 rounded-full bg-orange-600 mt-1 flex-shrink-0"></div>
                    <p className="text-slate-700 leading-snug">
                      {language === 'en' 
                        ? 'Gas spreading via HVAC at 2.3 m/min. Full floor contamination in 8-12 min without intervention.' 
                        : 'ينتشر الغاز عبر التهوية بسرعة 2.3 م/دقيقة. تلوث الطابق الكامل في 8-12 دقيقة بدون تدخل.'}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="size-1.5 rounded-full bg-green-600 mt-1 flex-shrink-0"></div>
                    <p className="text-slate-700 leading-snug">
                      {language === 'en' 
                        ? 'Survival rate: 98% with immediate evacuation, 45% if delayed 5+ min.' 
                        : 'معدل البقاء: 98٪ مع الإخلاء الفوري، 45٪ إذا تأخر 5+ دقائق.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: EVENT TIMELINE & ASSESSMENT */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Clock className="size-4" />
              {language === 'en' ? 'Event Timeline & Assessment' : 'الجدول الزمني للأحداث والتقييم'}
            </h3>
            
            <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6 flex flex-col">
              {/* Timeline */}
              <div className="space-y-4">
                {/* Timeline Event 5 - MOST RECENT */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-8 rounded-full bg-purple-100 border-2 border-purple-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <Brain className="size-4 text-purple-600" />
                    </div>
                    <div className="w-0.5 h-full bg-purple-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-xs text-slate-500 mb-1">14:33:12 • {language === 'en' ? '4m 27s' : '4د 27ث'}</div>
                    <h4 className="font-semibold text-slate-900 mb-1">{language === 'en' ? 'AI Analysis Complete' : 'اكتمل تحليل الذكاء الاصطناعي'}</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {language === 'en' 
                        ? 'IDRAK AI completed threat assessment. Recommended actions generated with 94% confidence.' 
                        : 'أكمل الذكاء الاصطناعي IDRAK تقييم التهديد. تم إنشاء الإجراءات الموصى بها بثقة 94٪.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-3.5 text-purple-600" />
                        <span className="text-xs text-purple-600 font-semibold">
                          {language === 'en' ? '3 Recommended Actions' : '3 إجراءات موصى بها'}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(5)}
                        className="text-xs text-purple-600 hover:text-purple-800 font-semibold underline"
                      >
                        {language === 'en' ? 'Read more details' : 'اقرأ المزيد من التفاصيل'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline Event 4 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-8 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <Users className="size-4 text-amber-600" />
                    </div>
                    <div className="w-0.5 h-full bg-amber-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-xs text-slate-500 mb-1">14:30:15 • {language === 'en' ? '1m 30s' : '1د 30ث'}</div>
                    <h4 className="font-semibold text-slate-900 mb-1">{language === 'en' ? 'Evacuation In Progress' : 'الإخلاء قيد التنفيذ'}</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {language === 'en' 
                        ? 'Personnel evacuation ongoing. 8 of 12 personnel confirmed safe. 4 still in transit.' 
                        : 'إخلاء الموظفين جارٍ. تم تأكيد سلامة 8 من 12 موظفًا. 4 لا يزالون في الطريق.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="size-3.5 text-amber-600 animate-pulse" />
                        <span className="text-xs text-amber-600 font-semibold">
                          {language === 'en' ? 'In Progress (8/12 Clear)' : 'قيد التنفيذ (8/12 آمن)'}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(4)}
                        className="text-xs text-amber-600 hover:text-amber-800 font-semibold underline"
                      >
                        {language === 'en' ? 'Read more details' : 'اقرأ المزيد من التفاصيل'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline Event 3 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-8 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center flex-shrink-0">
                      <Shield className="size-4 text-blue-600" />
                    </div>
                    <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-xs text-slate-500 mb-1">14:29:45 • {language === 'en' ? '1m 0s' : '1د 0ث'}</div>
                    <h4 className="font-semibold text-slate-900 mb-1">{language === 'en' ? 'Area Sealed' : 'إغلاق المنطقة'}</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {language === 'en' 
                        ? 'Sector B automatically sealed. HVAC system shutdown initiated to prevent gas spread.' 
                        : 'تم إغلاق القطاع ب تلقائيًا. بدأ إيقاف نظام التهوية لمنع انتشار الغاز.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="size-3.5 text-green-600" />
                        <span className="text-xs text-green-600 font-semibold">
                          {language === 'en' ? 'Completed' : 'مكتمل'}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(3)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        {language === 'en' ? 'Read more details' : 'اقرأ المزيد من التفاصيل'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline Event 2 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-8 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="size-4 text-amber-600" />
                    </div>
                    <div className="w-0.5 h-full bg-amber-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-xs text-slate-500 mb-1">14:29:12 • {language === 'en' ? '0m 27s' : '0د 27ث'}</div>
                    <h4 className="font-semibold text-slate-900 mb-1">{language === 'en' ? 'Automatic Alarm Triggered' : 'تفعيل الإنذار التلقائي'}</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {language === 'en' 
                        ? 'Emergency alarm activated. Personnel notified via PA system and mobile alerts.' 
                        : 'تم تفعيل إنذار الطوارئ. تم إخطار الموظفين عبر نظام الإعلانات والتنبيهات المتنقلة.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="size-3.5 text-green-600" />
                        <span className="text-xs text-green-600 font-semibold">
                          {language === 'en' ? 'Completed' : 'مكتمل'}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(2)}
                        className="text-xs text-amber-600 hover:text-amber-800 font-semibold underline"
                      >
                        {language === 'en' ? 'Read more details' : 'اقرأ المزيد من التفاصيل'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline Event 1 - OLDEST */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-8 rounded-full bg-red-100 border-2 border-red-600 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="size-4 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-1">14:28:45 • {language === 'en' ? '0m 0s' : '0د 0ث'}</div>
                    <h4 className="font-semibold text-slate-900 mb-1">{language === 'en' ? 'Chemical Agent Detected' : 'كشف عامل كيميائي'}</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {language === 'en' 
                        ? 'Chlorine gas detected in Floor 2 - Sector B Lab. Concentration: 15.7 ppm (Critical).' 
                        : 'تم الكشف عن غاز الكلور في الطابق 2 - مختبر القطاع ب. التركيز: 15.7 جزء في المليون (حرج).'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          {t.critical}
                        </span>
                        <span className="text-xs text-slate-500">
                          {language === 'en' ? 'Source: Lab cylinder valve (B-201)' : 'المصدر: صمام أسطوانة المختبر (ب-201)'}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(1)}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold underline"
                      >
                        {language === 'en' ? 'Read more details' : 'اقرأ المزيد من التفاصيل'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: AI RECOMMENDATIONS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Brain className="size-4" />
              {language === 'en' ? 'AI Recommendations' : 'توصيات الذكاء الاصطناعي'}
            </h3>

            {/* Recommendation 1 - Separate Card */}
            <div className="bg-white rounded-lg shadow-lg border border-red-200 p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="size-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-red-600">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 mb-1">{t.immediateEvacuation}</h4>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold uppercase rounded">
                    {t.critical}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                {language === 'en'
                  ? 'Evacuate all 12 personnel from Sector B to Floor 1 assembly point. Deploy emergency lighting and audio guidance systems.'
                  : 'إخلاء جميع الـ 12 موظفًا من القطاع ب إلى نقطة التجمع في الطابق 1. نشر أنظمة الإضاءة الطارئة والتوجيه الصوتي.'}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'ETA' : 'الوقت'}</div>
                  <div className="font-bold text-slate-900">2-3 min</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'Success' : 'النجاح'}</div>
                  <div className="font-bold text-green-600">94%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'AI' : 'الذكاء'}</div>
                  <div className="font-bold text-purple-600">94%</div>
                </div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle className="size-4" />
                {language === 'en' ? 'Approve & Execute' : 'الموافقة والتنفيذ'}
              </button>
            </div>

            {/* Recommendation 2 - Separate Card */}
            <div className="bg-white rounded-lg shadow-lg border border-orange-200 p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="size-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-orange-600">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 mb-1">{t.sealVentilation}</h4>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold uppercase rounded">
                    {language === 'en' ? 'High' : 'عالي'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                {language === 'en'
                  ? 'Close all dampers in Sector B, shutdown air handlers AH-B-01 and AH-B-02. Activate positive pressure barriers in Sectors A and C.'
                  : 'إغلاق جميع الصمامات في القطاع ب، إيقاف معالجات الهواء AH-B-01 و AH-B-02. تفعيل حواجز الضغط الإيجابي في القطاعين أ وج.'}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'ETA' : 'الوقت'}</div>
                  <div className="font-bold text-slate-900">45 sec</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'Success' : 'النجاح'}</div>
                  <div className="font-bold text-green-600">91%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'AI' : 'الذكاء'}</div>
                  <div className="font-bold text-purple-600">91%</div>
                </div>
              </div>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle className="size-4" />
                {language === 'en' ? 'Approve & Execute' : 'الموافقة والتنفيذ'}
              </button>
            </div>

            {/* Recommendation 3 - Separate Card */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 mb-1">{t.activateProtocol}</h4>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase rounded">
                    {language === 'en' ? 'High' : 'عالي'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                {language === 'en'
                  ? 'Deploy hazmat-equipped CBRN team with Level A PPE, chlorine neutralization agents, and air monitoring equipment.'
                  : 'نشر فريق CBRN المجهز بمواد خطرة مع معدات حماية من المستوى أ، ومواد معادلة للكلور، ومعدات مراقبة الهواء.'}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'ETA' : 'الوقت'}</div>
                  <div className="font-bold text-slate-900">2 min</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'Success' : 'النجاح'}</div>
                  <div className="font-bold text-green-600">89%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-600 mb-1">{language === 'en' ? 'AI' : 'الذكاء'}</div>
                  <div className="font-bold text-purple-600">89%</div>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle className="size-4" />
                {language === 'en' ? 'Approve & Execute' : 'الموافقة والتنفيذ'}
              </button>
            </div>

            {/* Additional Info Cards */}
            <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                {language === 'en' ? 'Medical Guidance' : 'التوجيه الطبي'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'en'
                  ? 'Chlorine exposure symptoms: burning eyes/throat, coughing, breathing difficulty. Move to fresh air immediately. Administer oxygen if available. Rinse eyes with water for 15+ minutes. All exposed personnel require immediate medical attention.'
                  : 'أعراض التعرض للكلور: حرقان في العينين/الحلق، والسعال، وصعوبة التنفس. انتقل إلى الهواء النقي فورًا. إعطاء الأكسجين إن أمكن. شطف العينين بالماء لمدة 15+ دقيقة. جميع الموظفين المعرضين يحتاجون عناية طبية فورية.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                {language === 'en' ? 'Historical Context' : 'السياق ��لتاريخي'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'en'
                  ? 'IDRAK AI has analyzed 47 historical chemical incidents. Similar chlorine gas incident in 2019 resulted in 6 casualties due to delayed response. Immediate action is critical.'
                  : 'حلل الذكاء الاصطناعي IDRAK 47 حادثًا كيميائيًا تاريخيًا. أدى حادث مماثل لغاز الكلور في عام 2019 إلى 6 إصابات بسبب التأخر في الاستجابة. الإجراء الفوري أمر بالغ الأهمية.'}
              </p>
            </div>

            {/* AI Disclaimer */}
            <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="size-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-purple-700 leading-relaxed">
                  {language === 'en' 
                    ? 'AI-powered recommendations based on real-time threat analysis, facility parameters, and 47 historical chemical incidents.'
                    : 'توصيات مدعومة بالذكاء الاصطناعي بناءً على تحليل التهديد في الوقت الفعلي ومعايير المنشأة و 47 حادثًا كيميائيًا تاريخيًا.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent !== null && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedEvent(null);
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold">
                  {language === 'en' ? 'Event Details' : 'تفاصيل الحدث'}
                </h3>
                <p className="text-sm text-slate-300 mt-0.5">
                  {language === 'en' ? 'Comprehensive AI Analysis & Tactical Recommendations' : 'تحليل شامل للذكاء الاصطناعي والتوصيات التكتيكية'}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedEvent(null);
                }}
                className="size-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Event 1: Chemical Agent Detected */}
              {selectedEvent === 1 && (
                <>
                  {/* Event Header */}
                  <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 rounded-full bg-red-600 flex items-center justify-center">
                        <AlertTriangle className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-red-900">
                          {language === 'en' ? 'Chemical Agent Detected' : 'كشف عامل كيميائي'}
                        </h4>
                        <p className="text-sm text-red-700">14:28:45 • {language === 'en' ? 'Incident Origin' : 'أصل الحادث'}</p>
                      </div>
                      <span className="px-3 py-1.5 bg-red-600 text-white text-sm font-bold uppercase rounded-lg">
                        {t.critical}
                      </span>
                    </div>
                    <p className="text-sm text-red-800">
                      {language === 'en'
                        ? 'Chlorine gas sensors in Floor 2 - Sector B Lab detected elevated concentration levels exceeding IDLH threshold. Automatic emergency protocols initiated.'
                        : 'اكتشفت مستشعرات غاز الكلور في الطابق 2 - مختبر القطاع ب مستويات تركيز مرتفعة تتجاوز عتبة IDLH. تم بدء بروتوكولات الطوارئ التلقائية.'}
                    </p>
                  </div>

                  {/* AI Analysis Section */}
                  <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="size-5 text-purple-600" />
                      <h5 className="font-bold text-purple-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Analysis' : 'تحليل الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-purple-800 mb-1">{language === 'en' ? 'Chemical Agent Identification:' : 'تحديد العامل الكيميائي:'}</p>
                        <p className="text-sm text-slate-700">
                          {language === 'en'
                            ? 'Agent: Chlorine Gas (Cl₂) - Highly reactive oxidizing agent. Concentration: 15.7 ppm, significantly exceeding IDLH threshold of 10 ppm. Exposure at this level causes severe respiratory damage within minutes.'
                            : 'العامل: غاز الكلور (Cl₂) - عامل مؤكسد شديد التفاعل. التركيز: 15.7 جزء في المليون، متجاوزًا بشكل كبير عتبة IDLH البالغة 10 جزء في المليون. التعرض لهذا المستوى يسبب ضررًا تنفسيًا شديدًا في غضون دقائق.'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-purple-800 mb-1">{language === 'en' ? 'Source Identification:' : 'تحديد المصدر:'}</p>
                        <p className="text-sm text-slate-700">
                          {language === 'en'
                            ? 'Source: Lab storage cylinder valve failure in Room B-201. Cylinder contains approximately 68 kg of compressed chlorine gas. Valve seal degradation detected, causing continuous leak at estimated rate of 0.5 kg/min.'
                            : 'المصدر: فشل صمام أسطوانة تخزين المختبر في الغرفة ب-201. تحتوي الأسطوانة على حوالي 68 كجم من غاز الكلور المضغوط. تم اكتشاف تدهور ختم الصمام، مما تسبب في تسرب مستمر بمعدل تقديري 0.5 كجم/دقيقة.'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-purple-800 mb-1">{language === 'en' ? 'Risk Assessment:' : 'تقييم المخاطر:'}</p>
                        <p className="text-sm text-slate-700">
                          {language === 'en'
                            ? 'Immediate threat to all personnel in contaminated zone. Chlorine gas is heavier than air and will accumulate in low areas. HVAC system actively distributing contaminated air to adjacent zones at 2.3 m/min spread rate.'
                            : 'تهديد فوري لجميع الموظفين في المنطقة الملوثة. غاز الكلور أثقل من الهواء وسوف يتراكم في المناطق المنخفضة. نظام التهوية يوزع الهواء الملوث بنشاط إلى المناطق المجاورة بمعدل انتشار 2.3 م/دقيقة.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Predictions Section */}
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="size-5 text-blue-600" />
                      <h5 className="font-bold text-blue-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Predictions' : 'تنبؤات الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="size-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">1</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 mb-1">
                            {language === 'en' ? 'Contamination Spread Timeline:' : 'الجدول الزمني لانتشار التلوث:'}
                          </p>
                          <p className="text-sm text-slate-700">
                            {language === 'en'
                              ? 'Without intervention: Full Floor 2 contamination in 8-12 minutes. Breakthrough to Floor 1 via stairwells in 15-20 minutes. With HVAC sealed: Containment to Sector B within current 3 affected zones.'
                              : 'بدون تدخل: تلوث كامل للطابق 2 في 8-12 دقيقة. اختراق إلى الطابق 1 عبر السلالم في 15-20 دقيقة. مع إغلاق التهوية: احتواء القطاع ب ضمن المناطق الثلاث المتأثرة الحالية.'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="size-6 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">2</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 mb-1">
                            {language === 'en' ? 'Personnel Impact Forecast:' : 'توقعات تأثير الموظفين:'}
                          </p>
                          <p className="text-sm text-slate-700">
                            {language === 'en'
                              ? 'Current exposure: 5 personnel in direct contamination zone (B-201, B-202). At-risk: 7 additional personnel in adjacent zones. Survival rate: 98% with immediate evacuation (< 2 min), 72% if delayed 5 minutes, 45% if delayed 10+ minutes.'
                              : 'التعرض الحالي: 5 موظفين في منطقة التلوث المباشر (ب-201، ب-202). في خطر: 7 موظفين إضافيين في المناطق المجاورة. معدل البقاء: 98٪ مع إخلاء فوري (< 2 دقيقة)، 72٪ إذا تأخر 5 دقائق، 45٪ إذا تأخر 10+ دقائق.'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="size-6 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-xs">3</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 mb-1">
                            {language === 'en' ? 'Facility Impact:' : 'تأثير المنشأة:'}
                          </p>
                          <p className="text-sm text-slate-700">
                            {language === 'en'
                              ? 'Equipment damage: High corrosion risk to electronic equipment, HVAC components, and structural metals. Estimated decontamination time: 36-48 hours for affected zones. Facility operational capacity reduced to 60% during response.'
                              : 'أضرار المعدات: خطر تآكل عالي للمعدات الإلكترونية ومكونات التهوية والمعادن الإنشائية. وقت التطهير المقدر: 36-48 ساعة للمناطق المتضررة. تم تخفيض القدرة التشغيلية للمنشأة إلى 60٪ خلال الاستجابة.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tactical Recommendations */}
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="size-5 text-green-600" />
                      <h5 className="font-bold text-green-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'Tactical Recommendations' : 'التوصيات التكتيكية'}
                      </h5>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-red-600">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-red-600 uppercase">{language === 'en' ? 'Priority 1 - Critical' : 'الأولوية 1 - حرجة'}</span>
                        </div>
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? 'Immediate Personnel Evacuation' : 'إخلاء الموظفين الفوري'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Activate emergency evacuation for all Floor 2 personnel. Route: Emergency stairs to Floor 1 assembly point (away from contaminated zone). Deploy emergency lighting, audio guidance, and personnel tracking system. ETA: 2-3 minutes.'
                            : 'تفعيل الإخلاء الطارئ لجميع موظفي الطابق 2. المسار: سلالم الطوارئ إلى نقطة التجمع في الطابق 1 (بعيدًا عن المنطقة الملوثة). نشر الإضاءة الطارئة ونظام التوجيه الصوتي وتتبع الموظفين. الوقت المتوقع: 2-3 دقائق.'}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-orange-600">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-orange-600 uppercase">{language === 'en' ? 'Priority 2 - High' : 'الأولوية 2 - عالية'}</span>
                        </div>
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? 'HVAC Containment Protocol' : 'بروتوكول احتواء التهوية'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Emergency shutdown of all air handlers on Floor 2. Close dampers in Sector B. Activate positive pressure barriers in unaffected sectors. Prevents gas spread via ventilation system. ETA: 45 seconds.'
                            : 'إيقاف طارئ لجميع معالجات الهواء في الطابق 2. إغلاق الصمامات في القطاع ب. تفعيل حواجز الضغط الإيجابي في القطاعات غير المتضررة. يمنع انتشار الغاز عبر نظام التهوية. الوقت المتوقع: 45 ثانية.'}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-blue-600">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-blue-600 uppercase">{language === 'en' ? 'Priority 3 - High' : 'الأولوية 3 - عالية'}</span>
                        </div>
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? 'Deploy CBRN Response Team' : 'نشر فريق استجابة CBRN'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Dispatch hazmat-trained CBRN team with Level A PPE suits, chlorine neutralization agents (sodium thiosulfate solution), gas detection equipment, and emergency medical supplies. Establish decontamination corridor. ETA: 2 minutes.'
                            : 'إرسال فريق CBRN المدرب على المواد الخطرة مع بدلات حماية من المستوى أ، ومواد معادلة الكلور (محلول ثيوسلفات الصوديوم)، ومعدات كشف الغاز، واللوازم الطبية الطارئة. إنشاء ممر التطهير. الوقت المتوقع: دقيقتان.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Event 2: Automatic Alarm Triggered */}
              {selectedEvent === 2 && (
                <>
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 rounded-full bg-amber-600 flex items-center justify-center">
                        <AlertCircle className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-amber-900">
                          {language === 'en' ? 'Automatic Alarm Triggered' : 'تفعيل الإنذار التلقائي'}
                        </h4>
                        <p className="text-sm text-amber-700">14:29:12 • {language === 'en' ? '0m 27s after detection' : '0د 27ث بعد الكشف'}</p>
                      </div>
                    </div>
                    <p className="text-sm text-amber-800">
                      {language === 'en'
                        ? 'Emergency alarm activated. Personnel notified via PA system and mobile alerts.'
                        : 'تم تفعيل إنذار الطوارئ. تم إخطار الموظفين عبر نظام الإعلانات والتنبيهات المتنقلة.'}
                    </p>
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="size-5 text-purple-600" />
                      <h5 className="font-bold text-purple-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Assessment' : 'تقييم الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p>
                        {language === 'en'
                          ? 'Emergency alarm system successfully triggered across all Floor 2 zones. Multi-channel notification protocol activated: PA system (audible), mobile alerts (push notifications), and visual strobes.'
                          : 'تم تفعيل نظام الإنذار الطارئ بنجاح عبر جميع مناطق الطابق 2. تم تفعيل بروتوكول الإخطار متعدد القنوات: نظام الإعلانات (صوتي)، والتنبيهات المتنقلة (إشعارات)، والأضواء الوامضة.'}
                      </p>
                      <p>
                        {language === 'en'
                          ? 'Response time: 27 seconds from initial detection. All 12 personnel in affected zones received notifications. Acknowledgment rate: 10/12 confirmed (83%).'
                          : 'وقت الاستجابة: 27 ثانية من الكشف الأولي. تلقى جميع الـ 12 موظفًا في المناطق المتأثرة الإخطارات. معدل التأكيد: 10/12 مؤكد (83٪).'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="size-5 text-blue-600" />
                      <h5 className="font-bold text-blue-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Predictions' : 'تنبؤات الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p>
                        {language === 'en'
                          ? '• Personnel response expected within 15-30 seconds. Based on historical data, 95% of personnel begin evacuation within this window.'
                          : '• من المتوقع استجابة الموظفين خلال 15-30 ثانية. بناءً على البيانات التاريخية، يبدأ 95٪ من الموظفين الإخلاء ضمن هذه النافذة الزمنية.'}
                      </p>
                      <p>
                        {language === 'en'
                          ? '• 2 personnel have not acknowledged alerts - likely in areas with poor signal coverage. Direct intervention required.'
                          : '• لم يؤكد موظفان التنبيهات - من المحتمل أن يكونوا في مناطق ذات تغطية إشارة ضعيفة. التدخل المباشر مطلوب.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="size-5 text-green-600" />
                      <h5 className="font-bold text-green-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'Tactical Recommendations' : 'التوصيات التكتيكية'}
                      </h5>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-red-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '1. Contact Unresponsive Personnel (Immediate)' : '1. الاتصال بالموظفين غير المستجيبين (فوري)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Send emergency response team to physically locate 2 unresponsive personnel. Use portable radios for direct communication.'
                            : 'إرسال فريق الاستجابة الطارئة لتحديد موقع الموظفين غير المستجيبين فعليًا. استخدام أجهزة الراديو المحمولة للاتصال المباشر.'}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-orange-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '2. Activate Emergency Lighting (Immediate)' : '2. تفعيل الإضاءة الطارئة (فوري)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Deploy emergency exit path lighting and directional audio cues. Ensure all evacuation routes clearly marked.'
                            : 'نشر إضاءة مسار الخروج الطارئ والإشارات الصوتية الاتجاهية. التأكد من وضوح جميع طرق الإخلاء.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Event 3: Area Sealed */}
              {selectedEvent === 3 && (
                <>
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <Shield className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-blue-900">
                          {language === 'en' ? 'Area Sealed' : 'إغلاق المنطقة'}
                        </h4>
                        <p className="text-sm text-blue-700">14:29:45 • {language === 'en' ? '1m 0s after detection' : '1د 0ث بعد الكشف'}</p>
                      </div>
                      <span className="px-3 py-1.5 bg-green-600 text-white text-sm font-bold uppercase rounded-lg">
                        {language === 'en' ? 'Completed' : 'مكتمل'}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">
                      {language === 'en'
                        ? 'Sector B automatically sealed. HVAC system shutdown initiated to prevent gas spread.'
                        : 'تم إغلاق القطاع ب تلقائيًا. بدأ إيقاف نظام التهوية لمنع انتشار الغاز.'}
                    </p>
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="size-5 text-purple-600" />
                      <h5 className="font-bold text-purple-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Assessment' : 'تقييم الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p>
                        {language === 'en'
                          ? 'Automated containment protocols executed successfully. All 6 access points to Sector B sealed within 45 seconds: 4 electronic blast doors, 1 emergency bulkhead, 1 stairwell access.'
                          : 'تم تنفيذ بروتوكولات الاحتواء التلقائية بنجاح. تم إغلاق جميع نقاط الوصول الـ 6 إلى القطاع ب خلال 45 ثانية: 4 أبواب انفجار إلكترونية، 1 حاجز طوارئ، 1 وصول للسلالم.'}
                      </p>
                      <p>
                        {language === 'en'
                          ? 'HVAC shutdown confirmed: Air handlers AH-B-01 and AH-B-02 offline. All dampers in Sector B closed. Positive pressure barriers activated in adjacent Sectors A and C to prevent backflow.'
                          : 'تم تأكيد إيقاف التهوية: معالجات الهواء AH-B-01 و AH-B-02 غير متصلة. تم إغلاق جميع الصمامات في القطاع ب. تم تفعيل حواجز الضغط الإيجابي في القطاعين المجاورين أ وج لمنع التدفق العكسي.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="size-5 text-blue-600" />
                      <h5 className="font-bold text-blue-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Predictions' : 'تنبؤات الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p>
                        {language === 'en'
                          ? '• Containment will reduce gas spread by 87%. Contamination limited to current 3 affected zones instead of projected 9 zones without sealing.'
                          : '• سيقلل الاحتواء انتشار الغاز بنسبة 87٪. التلوث محدود بالمناطق الثلاث المتأثرة الحالية بدلاً من 9 مناطق متوقعة بدون الإغلاق.'}
                      </p>
                      <p>
                        {language === 'en'
                          ? '• Gas concentration will stabilize at current levels within 3-4 minutes. Natural dilution will begin reducing concentration by 15% per hour.'
                          : '• سيستقر تركيز الغاز عند المستويات الحالية خلال 3-4 دقائق. سيبدأ التخفيف الطبيعي في تقليل التركيز بنسبة 15٪ في الساعة.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="size-5 text-green-600" />
                      <h5 className="font-bold text-green-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'Tactical Recommendations' : 'التوصيات التكتيكية'}
                      </h5>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-blue-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '1. Maintain Positive Pressure Barriers (Ongoing)' : '1. الحفاظ على حواجز الضغط الإيجابي (مستمر)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Continue operating positive pressure systems in Sectors A and C. Monitor pressure differential to ensure no reverse flow.'
                            : 'مواصلة تشغيل أنظمة الضغط الإيجابي في القطاعين أ وج. مراقبة الضغط التفاضلي لضمان عدم التدفق العكسي.'}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-green-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '2. Continuous Gas Monitoring (Ongoing)' : '2. المراقبة المستمرة للغاز (مستمر)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Deploy portable gas detectors at all seal points. Set alert threshold at 2 ppm to detect any containment breaches early.'
                            : 'نشر كاشفات الغاز المحمولة في جميع نقاط الختم. تعيين عتبة التنبيه عند 2 جزء في المليون للكشف المبكر عن أي اختراقات.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Event 4: Evacuation In Progress */}
              {selectedEvent === 4 && (
                <>
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 rounded-full bg-amber-600 flex items-center justify-center">
                        <Users className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-amber-900">
                          {language === 'en' ? 'Evacuation In Progress' : 'الإخلاء قيد التنفيذ'}
                        </h4>
                        <p className="text-sm text-amber-700">14:30:15 • {language === 'en' ? '1m 30s after detection' : '1د 30ث بعد الكشف'}</p>
                      </div>
                      <span className="px-3 py-1.5 bg-amber-600 text-white text-sm font-bold uppercase rounded-lg animate-pulse">
                        {language === 'en' ? 'In Progress' : 'قيد التنفيذ'}
                      </span>
                    </div>
                    <p className="text-sm text-amber-800">
                      {language === 'en'
                        ? 'Personnel evacuation ongoing. 8 of 12 personnel confirmed safe. 4 still in transit.'
                        : 'إخلاء الموظفين جارٍ. تم تأكيد سلامة 8 من 12 موظفًا. 4 لا يزالون في الطريق.'}
                    </p>
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="size-5 text-purple-600" />
                      <h5 className="font-bold text-purple-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Assessment' : 'تقييم الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p>
                        {language === 'en'
                          ? 'Evacuation progress: 67% complete (8/12 personnel). Average evacuation speed: 0.8 personnel/15 seconds. Current pace is 12% slower than optimal due to congestion at Stairwell A.'
                          : 'تقدم الإخلاء: 67٪ مكتمل (8/12 موظفًا). متوسط سرعة الإخلاء: 0.8 موظف/15 ثانية. الوتيرة الحالية أبطأ بنسبة 12٪ من المثلى بسبب الازدحام في السلم أ.'}
                      </p>
                      <p>
                        {language === 'en'
                          ? 'Personnel locations: 8 at Floor 1 assembly point (confirmed safe), 3 in Stairwell A (descending), 1 in Stairwell B (descending). All personnel moving toward safe zones.'
                          : 'مواقع الموظفين: 8 في نقطة التجمع في الطابق 1 (آمن مؤكد)، 3 في السلم أ (نزول)، 1 في السلم ب (نزول). جميع الموظفين يتحركون نحو المناطق الآمنة.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="size-5 text-blue-600" />
                      <h5 className="font-bold text-blue-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Predictions' : 'تنبؤات الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p>
                        {language === 'en'
                          ? '• Remaining 4 personnel predicted to reach safety in 45-60 seconds. Total evacuation time: 2m 15s - within acceptable emergency parameters.'
                          : '• من المتوقع أن يصل الـ 4 موظفين المتبقين إلى الأمان خلال 45-60 ثانية. إجمالي وقت الإخلاء: 2د 15ث - ضمن معايير الطوارئ المقبولة.'}
                      </p>
                      <p>
                        {language === 'en'
                          ? '• Post-evacuation medical screening recommended for all 12 personnel. 2-3 individuals may require supplemental oxygen. Full recovery expected within 6-12 hours.'
                          : '• يوصى بالفحص الطبي بعد الإخلاء لجميع الـ 12 موظفًا. قد يحتاج 2-3 أفراد إلى أكسجين تكميلي. التعافي الكامل متوقع خلال 6-12 ساعة.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="size-5 text-green-600" />
                      <h5 className="font-bold text-green-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'Tactical Recommendations' : 'التوصيات التكتيكية'}
                      </h5>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-amber-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '1. Expedite Remaining Evacuations (Immediate)' : '1. تسريع الإخلاءات المتبقية (فوري)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Deploy personnel at stairwell exits to guide faster movement. Activate verbal guidance: "Move quickly, remain calm."'
                            : 'نشر الموظفين عند مخارج السلالم لتوجيه حركة أسرع. تفعيل التوجيه الشفهي: "تحركوا بسرعة، ابقوا هادئين."'}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-blue-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '2. Prepare Medical Triage (ETA: 1 min)' : '2. تحضير الفرز الطبي (الوقت: 1 دقيقة)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Position medical personnel at Floor 1 assembly point with oxygen, eye wash stations, and respiratory assessment equipment.'
                            : 'وضع الموظفين الطبيين في نقطة التجمع في الطابق 1 مع الأكسجين ومحطات غسيل العيون ومعدات تقييم الجهاز التنفسي.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Event 5: AI Analysis Complete */}
              {selectedEvent === 5 && (
                <>
                  <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 rounded-full bg-purple-600 flex items-center justify-center">
                        <Brain className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-purple-900">
                          {language === 'en' ? 'AI Analysis Complete' : 'اكتمل تحليل الذكاء الاصطناعي'}
                        </h4>
                        <p className="text-sm text-purple-700">14:33:12 • {language === 'en' ? '4m 27s after detection' : '4د 27ث بعد الكشف'}</p>
                      </div>
                      <span className="px-3 py-1.5 bg-purple-600 text-white text-sm font-bold uppercase rounded-lg">
                        {language === 'en' ? 'Complete' : 'مكتمل'}
                      </span>
                    </div>
                    <p className="text-sm text-purple-800">
                      {language === 'en'
                        ? 'IDRAK AI completed threat assessment. Recommended actions generated with 94% confidence.'
                        : 'أكمل الذكاء الاصطناعي IDRAK تقييم التهديد. تم إنشاء الإجراءات الموصى بها بثقة 94٪.'}
                    </p>
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="size-5 text-purple-600" />
                      <h5 className="font-bold text-purple-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Assessment' : 'تقييم الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p>
                        {language === 'en'
                          ? 'Comprehensive threat analysis completed using multi-layered AI assessment: chemical agent identification (99.2% confidence), source localization (96.8%), spread modeling (94.1%), and impact forecasting (94.3%).'
                          : 'تم إكمال التحليل الشامل للتهديد باستخدام تقييم الذكاء الاصطناعي متعدد الطبقات: تحديد العامل الكيميائي (ثقة 99.2٪)، وتحديد المصدر (96.8٪)، ونمذجة الانتشار (94.1٪)، والتنبؤ بالتأثير (94.3٪).'}
                      </p>
                      <p>
                        {language === 'en'
                          ? 'AI processed 47 historical chemical incidents, current facility parameters, real-time sensor data from 23 monitoring points, and weather conditions to generate optimal response strategy.'
                          : 'معالج الذكاء الاصطناعي 47 حادثًا كيميائيًا تاريخيًا، ومعايير المنشأة الحالية، وبيانات المستشعر في الوقت الفعلي من 23 نقطة مراقبة، والظروف الجوية لإنشاء استراتيجية الاستجابة المثلى.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="size-5 text-blue-600" />
                      <h5 className="font-bold text-blue-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'AI Predictions' : 'تنبؤات الذكاء الاصطناعي'}
                      </h5>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p>
                        {language === 'en'
                          ? '• If all 3 recommended actions executed immediately: 98% personnel survival rate, 87% containment success, full facility restoration in 36-48 hours.'
                          : '• إذا تم تنفيذ جميع الإجراءات الموصى بها الثلاثة فورًا: معدل بقاء الموظفين 98٪، نجاح الاحتواء 87٪، استعادة كاملة للمنشأة في 36-48 ساعة.'}
                      </p>
                      <p>
                        {language === 'en'
                          ? '• Threat neutralization timeline: With CBRN team deployment in 2 minutes, source control in 8-10 minutes, gas concentration below hazardous levels in 25-30 minutes.'
                          : '• جدول تحييد التهديد: مع نشر فريق CBRN في دقيقتين، السيطرة على المصدر في 8-10 دقائق، تركيز الغاز أقل من المستويات الخطرة في 25-30 دقيقة.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="size-5 text-green-600" />
                      <h5 className="font-bold text-green-900 uppercase text-sm tracking-wide">
                        {language === 'en' ? 'Tactical Recommendations' : 'التوصيات التكتيكية'}
                      </h5>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-red-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '1. Complete Personnel Evacuation (ETA: 2-3 min, Success: 94%)' : '1. إكمال إخلاء الموظفين (الوقت: 2-3 دقائق، النجاح: 94٪)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Complete evacuation of all remaining personnel from Floor 2 to Floor 1 assembly point via emergency stairs.'
                            : 'إكمال إخلاء جميع الموظفين المتبقين من الطابق 2 إلى نقطة التجمع في الطابق 1 عبر سلالم الطوارئ.'}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-orange-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '2. Seal Ventilation Systems (ETA: 45 sec, Success: 91%)' : '2. إغلاق أنظمة التهوية (الوقت: 45 ثانية، النجاح: 91٪)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Close all dampers in Sector B, shutdown air handlers. Activate positive pressure barriers in Sectors A and C.'
                            : 'إغلاق جميع الصمامات في القطاع ب، إيقاف معالجات الهواء. تفعيل حواجز الضغط الإيجابي في القطاعين أ وج.'}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-blue-600">
                        <p className="font-semibold text-sm text-slate-900 mb-1">
                          {language === 'en' ? '3. Deploy CBRN Response Team (ETA: 2 min, Success: 89%)' : '3. نشر فريق استجابة CBRN (الوقت: 2 دقائق، النجاح: 89٪)'}
                        </p>
                        <p className="text-xs text-slate-700">
                          {language === 'en'
                            ? 'Dispatch hazmat-trained CBRN team with Level A PPE suits, chlorine neutralization agents, and emergency equipment.'
                            : 'إرسال فريق CBRN المدرب مع بدلات حماية من المستوى أ، ومواد معادلة الكلور، ومعدات الطوارئ.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 rounded-b-2xl">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedEvent(null);
                }}
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {language === 'en' ? 'Close' : 'إغلاق'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}