import { ArrowLeft, MapPin, Building2, Shield, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import { Language } from '../translations';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import idrakLogo from '@/assets/IdrakLogo.png';
import promoImage from '@/assets/ksamap.png';

interface KSAMapLandingPageProps {
  language: Language;
  onBack: () => void;
  onEnterDemo: () => void;
}

interface FacilityLocation {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  status: 'operational' | 'alert' | 'maintenance';
  x: number; // percentage position on map
  y: number; // percentage position on map
}

const facilities: FacilityLocation[] = [
  {
    id: 'riyadh-1',
    name: 'Riyadh Command Center',
    nameAr: 'مركز قيادة الرياض',
    city: 'Riyadh',
    cityAr: 'الرياض',
    status: 'operational',
    x: 56,
    y: 48,
  },
  {
    id: 'jeddah-1',
    name: 'Jeddah Facility',
    nameAr: 'منشأة جدة',
    city: 'Jeddah',
    cityAr: 'جدة',
    status: 'operational',
    x: 28,
    y: 52,
  },
  {
    id: 'dammam-1',
    name: 'Dammam Operations',
    nameAr: 'عمليات الدمام',
    city: 'Dammam',
    cityAr: 'الدمم',
    status: 'alert',
    x: 72,
    y: 46,
  },
  {
    id: 'mecca-1',
    name: 'Mecca Security Hub',
    nameAr: 'مركز أمن مكة',
    city: 'Mecca',
    cityAr: 'مكة',
    status: 'operational',
    x: 30,
    y: 55,
  },
  {
    id: 'medina-1',
    name: 'Medina Monitoring',
    nameAr: 'مراقبة المدينة',
    city: 'Medina',
    cityAr: 'المدينة',
    status: 'maintenance',
    x: 30,
    y: 46,
  },
];

export function KSAMapLandingPage({ language, onBack, onEnterDemo }: KSAMapLandingPageProps) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityLocation | null>(null);
  const [hoveredFacility, setHoveredFacility] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'alert':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'operational':
        return language === 'en' ? 'Operational' : 'عملي';
      case 'alert':
        return language === 'en' ? 'Alert' : 'تنبيه';
      case 'maintenance':
        return language === 'en' ? 'Maintenance' : 'صيانة';
      default:
        return status;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col overflow-hidden relative">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/4 size-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 size-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Top Bar */}
      <div 
        className="flex items-center justify-end px-8 py-4 relative z-50"
      >
        {/* Right Side - Back and Demo Buttons */}
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="group relative p-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-blue-600 hover:to-blue-700 text-slate-400 hover:text-white border border-slate-700 hover:border-blue-400 rounded-xl shadow-xl transition-all duration-300 hover:shadow-blue-500/50 hover:scale-110"
            title={language === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
          >
            <Home className="size-5 transition-all" />
          </button>

          {/* Enter Demo Button */}
          <button
            onClick={onEnterDemo}
            className="group relative px-4 py-3 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-blue-600 hover:to-blue-700 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-400 rounded-xl shadow-xl transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="flex items-center gap-2 relative z-10">
              <span className="text-sm font-semibold">
                {language === 'en' ? 'Demo' : 'عرض'}
              </span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8 relative z-10">
        <div className="w-full max-w-6xl relative">
          {/* Animated Glow Ring - Full Width */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Content Container */}
          <div className="relative flex items-end justify-between">
            {/* Left Side - Logo and Text Content */}
            <div className="flex-1 flex flex-col items-start pb-32 relative z-20 pl-4">
              {/* Logo */}
              <div className="mb-8">
                <img src={idrakLogo} className="w-64 h-auto drop-shadow-2xl" />
              </div>

              {/* Text Content */}
              <div className="max-w-md">
                <p className="text-3xl text-white leading-relaxed" style={{ fontFamily: 'Archivo Narrow, sans-serif' }}>
                  {language === 'en' 
                    ? 'Scalable Intelligence across multiple cities, facilities, and operational environments.' 
                    : 'ذكاء قابل للتطوير عبر مدن متعددة ومنشآت وبيئات تشغيلية.'}
                </p>
              </div>
            </div>

            {/* Right Side - Map Image */}
            <div className="relative w-[700px] flex-shrink-0 -ml-32 -mt-12">
              {/* Image with Floating Animation */}
              <motion.img 
                src={promoImage} 
                alt="IDRAK Scalable Intelligence"
                className="relative w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}