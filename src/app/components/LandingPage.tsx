import { Shield, Brain, Activity, AlertTriangle, Wind, Radio, CheckCircle, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface LandingPageProps {
  language: Language;
  onEnter: () => void;
}

export function LandingPage({ language, onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="size-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="size-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {language === 'en' ? 'IDRAK' : 'إدراك'}
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <div className="size-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-400">
              {language === 'en' ? 'Military-Grade Security & Monitoring' : 'أمن ومراقبة بمستوى عسكري'}
            </span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6">
            {language === 'en' ? 'Intelligent CBRNe-aware' : 'نظام ذكي واعي'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {language === 'en' ? 'Building Management System' : 'لإدارة المباني بتهديدات CBRNe'}
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            {language === 'en' 
              ? 'Real-time monitoring, AI-powered threat detection, and automated response systems for critical military bunker operations.'
              : 'مراقبة في الوقت الفعلي، كشف التهديدات بالذكاء الاصطناعي، وأنظمة استجابة تلقائية لعمليات المخابئ العسكرية الحرجة.'}
          </p>

          <button
            onClick={onEnter}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
          >
            {language === 'en' ? 'Enter Dashboard' : 'الدخول إلى لوحة التحكم'}
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: CBRNe Detection */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:bg-slate-700 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-500/20">
            <div className="size-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
              <Radio className="size-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'en' ? 'CBRNe Detection' : 'كشف التهديدات الكيميائية'}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Advanced sensor network for real-time detection of chemical, biological, radiological, nuclear, and explosive threats.'
                : 'شبكة مستشعرات متقدمة للكشف الفوري عن التهديدات الكيميائية والبيولوجية والإشعاعية والنووية والمتفجرات.'}
            </p>
          </div>

          {/* Feature 2: AI-Powered Analysis */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:bg-slate-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="size-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mb-4">
              <Brain className="size-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'en' ? 'AI-Powered Analysis' : 'تحليل بالذكاء الاصطناعي'}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Machine learning algorithms provide predictive threat assessment, tactical recommendations, and automated decision support.'
                : 'خوارزميات التعلم الآلي توفر تقييم تنبؤي للتهديدات، توصيات تكتيكية، ودعم قرار تلقائي.'}
            </p>
          </div>

          {/* Feature 3: Emergency Response */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:bg-slate-700 hover:border-yellow-500 transition-all hover:shadow-lg hover:shadow-yellow-500/20">
            <div className="size-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="size-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'en' ? 'Emergency Response' : 'استجابة الطوارئ'}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Automated emergency protocols with real-time timeline tracking, personnel evacuation, and tactical case management.'
                : 'بروتوكولات طوارئ تلقائية مع تتبع الجدول الزمني الفوري، إخلاء الموظفين، وإدارة الحالات التكتيكية.'}
            </p>
          </div>

          {/* Feature 4: HVAC Containment */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:bg-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20">
            <div className="size-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <Wind className="size-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'en' ? 'HVAC Containment' : 'احتواء التهوية'}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Intelligent airflow management with automatic zone isolation, negative pressure control, and contamination prevention.'
                : 'إدارة ذكية لتدفق الهواء مع عزل تلقائي للمناطق، التحكم بالضغط السلبي، ومنع التلوث.'}
            </p>
          </div>

          {/* Feature 5: Real-Time Monitoring */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:bg-slate-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/20">
            <div className="size-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <Activity className="size-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'en' ? 'Real-Time Monitoring' : 'مراقبة فورية'}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Live system status visualization with graphical dashboards, contamination spread projections, and critical alerts.'
                : 'تصور فوري لحالة النظام مع لوحات معلومات رسومية، توقعات انتشار التلوث، وتنبيهات حرجة.'}
            </p>
          </div>

          {/* Feature 6: Tactical Simulations */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:bg-slate-700 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
            <div className="size-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="size-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'en' ? 'Tactical Simulations' : 'محاكاة تكتيكية'}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Comprehensive training scenarios with live demo mode, threat simulation, and emergency response drill capabilities.'
                : 'سيناريوهات تدريب شاملة مع وضع عرض توضيحي مباشر، محاكاة التهديدات، وقدرات تدريب على الاستجابة للطوارئ.'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-slate-800/80 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-8 py-6 text-center">
          <p className="text-slate-300 text-sm">
            {language === 'en' 
              ? '© 2026 IDRAK System. Military-Grade Facility Management Solution.'
              : '© 2026 نظام إدراك. حل إدارة المنشآت بمستوى عسكري.'}
          </p>
        </div>
      </div>
    </div>
  );
}