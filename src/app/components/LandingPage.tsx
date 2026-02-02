import { Shield, Brain, Activity, AlertTriangle, Wind, Radio, CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Zap, Sparkles } from 'lucide-react';
import { Language } from '../translations';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Group3Logo from '@/imports/Group3';

interface LandingPageProps {
  language: Language;
  onEnter: () => void;
}

const features = [
  {
    icon: Activity,
    titleEn: 'Real-Time Monitoring',
    titleAr: 'مراقبة فورية',
    descEn: 'Live system status visualization with graphical dashboards, contamination spread projections, and critical alerts.',
    descAr: 'تصور فوري لحالة النظام مع لوحات معلومات رسومية، توقعات انتشار التلوث، وتنبيهات حرجة.',
    gradient: 'from-green-500 to-emerald-500',
    border: 'border-green-500',
    shadow: 'shadow-green-500/20',
  },
  {
    icon: Brain,
    titleEn: 'AI-Powered Analysis',
    titleAr: 'تحليل بالذكاء الاصطناعي',
    descEn: 'Machine learning algorithms provide predictive threat assessment, tactical recommendations, and automated decision support.',
    descAr: 'خوارزميات التعلم الآلي توفر تقييم تنبؤي للتهديدات، صيات تكتيكية، ودعم قرار تلقائي.',
    gradient: 'from-purple-500 to-violet-500',
    border: 'border-purple-500',
    shadow: 'shadow-purple-500/20',
  },
  {
    icon: Radio,
    titleEn: 'Threat Detection',
    titleAr: 'كشف التهديدات',
    descEn: 'Advanced sensor network for real-time detection of chemical, biological, radiological, nuclear, and explosive threats.',
    descAr: 'شبكة مستشعرات متقدمة للكشف الفوري عن التهديدات الكيميائية والبيولوجية والإشعاعية والنووية والمتفجرات.',
    gradient: 'from-fuchsia-500 to-pink-600',
    border: 'border-fuchsia-500',
    shadow: 'shadow-fuchsia-500/20',
  },
  {
    icon: AlertTriangle,
    titleEn: 'Enhanced Decision Making',
    titleAr: 'تحسين صنع القرار',
    descEn: 'Automated emergency protocols with real-time timeline tracking, personnel evacuation, and tactical case management.',
    descAr: 'بروتوكولات طوارئ تلقائية مع تتبع الجدول الزمني الفوري، إخلاء الموظفين، وإدارة الحالات التكتيكية.',
    gradient: 'from-indigo-500 to-blue-600',
    border: 'border-indigo-500',
    shadow: 'shadow-indigo-500/20',
  },
  {
    icon: CheckCircle,
    titleEn: 'Situation Simulations',
    titleAr: 'محاكاة المواقف',
    descEn: 'Comprehensive training scenarios with live demo mode, threat simulation, and emergency response drill capabilities.',
    descAr: 'سيناريوهات تدريب شاملة مع وضع عرض توضيحي مباشر، محاكاة التهديدات، وقدرات تدريب على الاستجابة للطوارئ.',
    gradient: 'from-cyan-500 to-teal-500',
    border: 'border-cyan-500',
    shadow: 'shadow-cyan-500/20',
  },
  {
    icon: Wind,
    titleEn: 'Engineering Control',
    titleAr: 'التحكم الهندسي',
    descEn: 'Intelligent airflow management with automatic zone isolation, negative pressure control, and contamination prevention.',
    descAr: 'إدارة ذكية لتدفق الهواء مع عزل تلقائي للمناطق، التحكم بالضغط السلبي، ومنع التلوث.',
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500',
    shadow: 'shadow-blue-500/20',
  },
];

export function LandingPage({ language, onEnter }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-advance slides every 4 seconds (pause on hover)
  useEffect(() => {
    if (isHovering) return; // Don't auto-advance when hovering
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const currentFeature = features[currentSlide];
  const Icon = currentFeature.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col overflow-hidden relative">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/4 size-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 size-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Top Bar with Demo Button */}
      <div className="flex items-center justify-between px-8 py-4 relative z-10">
        {/* Left spacer for balance */}
        <div className="w-32"></div>
        
        {/* Center spacer */}
        <div className="flex-1"></div>
        
        {/* Enter Dashboard Button */}
        <button
          onClick={onEnter}
          className="group relative px-4 py-3 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-blue-600 hover:to-blue-700 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-400 rounded-xl shadow-xl transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 overflow-hidden"
          title={language === 'en' ? 'Enter Dashboard' : 'الدخول إلى لوحة التحكم'}
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <div className="flex items-center gap-2 relative z-10">
            <span className="text-sm font-semibold">Demo</span>
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-16 relative z-10">
        {/* Logo - Centered */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="relative group cursor-pointer">
            <Group3Logo className="w-64 h-64 drop-shadow-2xl" />
          </div>
        </div>
        
        {/* Intelligent Command and Control heading */}
        <div className="mb-12 text-center max-w-5xl mx-auto">
          <h2 className="text-5xl text-white font-bold leading-tight">
            {language === 'en' ? (
              <>
                <span className="block">Intelligent</span>
                <span className="block">Command and Control</span>
              </>
            ) : (
              <>
                <span className="block">القيادة والسيطرة</span>
                <span className="block">الذكية</span>
              </>
            )}
          </h2>
        </div>
        
        {/* Feature Carousel - All Visible with One Expanded */}
        <div className="relative w-full max-w-7xl">
          <div className="flex items-center justify-center gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = index === currentSlide;
              
              return (
                <div
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  onMouseEnter={() => {
                    setCurrentSlide(index);
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`
                    transition-all duration-500 cursor-pointer relative
                    ${isActive 
                      ? 'flex-[2] h-[240px]' 
                      : 'flex-[0.5] h-[240px] hover:flex-[0.6]'
                    }
                  `}
                >
                  {/* Icon floating above card when expanded */}
                  {isActive && (
                    <div className={`absolute -top-8 left-1/2 -translate-x-1/2 z-20 size-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-2xl ${feature.shadow} overflow-hidden transition-transform hover:scale-110`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <Icon className="size-8 text-white drop-shadow-lg relative z-10" />
                    </div>
                  )}
                  
                  <div className={`
                    h-full backdrop-blur-xl border-2 rounded-2xl p-5 
                    transition-all duration-500 shadow-2xl relative overflow-hidden group
                    ${isActive 
                      ? `border-${feature.border.split('-')[1]}-500 ${feature.shadow} hover:shadow-2xl` 
                      : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/95'
                    }
                  `}>
                    {/* Card shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Colored gradient overlay for active card */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`}></div>
                    )}

                    {isActive ? (
                      // Expanded View
                      <div className="h-full flex flex-col items-center justify-center relative z-10 pt-4">
                        <h3 className="text-2xl font-bold text-white mb-3 text-center drop-shadow-lg">
                          {language === 'en' ? feature.titleEn : feature.titleAr}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed text-center">
                          {language === 'en' ? feature.descEn : feature.descAr}
                        </p>
                      </div>
                    ) : (
                      // Compact View
                      <div className="h-full flex flex-col items-center justify-center gap-3 relative z-10">
                        <div className={`size-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-xl ${feature.shadow} transition-all group-hover:scale-110`}>
                          <Icon className="size-7 text-white drop-shadow-lg" />
                        </div>
                        <h3 className="text-base font-bold text-white text-center leading-tight">
                          {language === 'en' ? feature.titleEn : feature.titleAr}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all ${
                  index === currentSlide
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50'
                    : 'size-2 bg-slate-600 hover:bg-slate-500'
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* ... remove this code ... */}
    </div>
  );
}