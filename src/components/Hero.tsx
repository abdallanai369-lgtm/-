import React from 'react';
import { 
  Flame, MapPin, ExternalLink, PhoneCall, MessageCircle, 
  Sparkles, ArrowLeft, Star, SlidersHorizontal 
} from 'lucide-react';
import { RESTAURANT_META, BRANCHES_DATA } from '../data/restaurantData';

interface HeroProps {
  onOpenPhoneModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenChecklist: () => void;
  onOpenMenuManager: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPhoneModal,
  onOpenWhatsAppModal,
  onOpenChecklist,
  onOpenMenuManager,
}) => {
  const nasrCityBranch = BRANCHES_DATA.find((b) => b.id === 'nasr-city');

  return (
    <section id="hero" className="relative pt-8 pb-20 overflow-hidden bg-gradient-to-b from-[#080a0f] via-[#0f131c] to-[#0b0d10]">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Prototype Header Notice Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>مقترح تصميم تجريبي فائق الجودة لمطعم أمواج للمشويات — مدينة نصر</span>
          <button 
            onClick={onOpenChecklist}
            className="text-white hover:text-amber-200 underline cursor-pointer mr-1 font-semibold"
          >
            تفاصيل الاعتماد
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                طعم الفحم الأصيل وجودة المطبخ الشرقي الفاخر
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                مطعم <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">أمواج للمشويات</span>
              </h1>
              <p className="text-lg sm:text-xl text-stone-300 font-normal max-w-2xl leading-relaxed">
                {RESTAURANT_META.taglineAr}
              </p>
            </div>

            {/* Branch Quick Highlight */}
            <div className="bg-[#141924]/90 border border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-stone-300 text-sm shadow-xl">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">فرع مدينة نصر:</span>
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.2 rounded font-medium">
                      عنوان منشور ومؤكد
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {nasrCityBranch?.address}
                  </p>
                </div>
              </div>

              <a
                href={RESTAURANT_META.links.googleMapsNasrCity}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-stone-900/90 border border-amber-500/30 px-3.5 py-2 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                <span>موقعنا بالخريطة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Core Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* 1. Explore Menu Button */}
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm sm:text-base px-6 py-4 rounded-xl shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <Flame className="w-5 h-5 text-stone-950" />
                <span>مشاهدة المنيو والأسعار</span>
              </a>

              {/* 2. Menu Manager Button */}
              <button
                onClick={onOpenMenuManager}
                className="inline-flex items-center justify-center gap-2 bg-[#181e2b] hover:bg-[#20283a] text-amber-300 border border-amber-500/40 font-bold text-sm sm:text-base px-5 py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>تعديل المنيو وإضافة أطباق</span>
              </button>

              {/* 3. Talabat Official Link Button */}
              <a
                href={RESTAURANT_META.links.talabatMenu}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>طلب على طلبات</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* 4. Google Maps Button */}
              <a
                href={RESTAURANT_META.links.googleMapsNasrCity}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-300 font-medium text-xs sm:text-sm px-4 py-4 rounded-xl border border-stone-800 transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>موقع الفرع</span>
              </a>
            </div>

            {/* Hotline & WhatsApp Verification Status Controls */}
            <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-stone-400 font-medium">قنوات الاتصال المباشر:</span>
              
              {/* Hotline Button with Caution */}
              <button
                onClick={onOpenPhoneModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-amber-500/30 text-amber-300 hover:bg-amber-950/40 transition-colors cursor-pointer"
                title="اضغط لمعرفة حالة تأكيد الرقم"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>الخط الساخن: 15036</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                  غير مؤكد رسميًا
                </span>
              </button>

              {/* WhatsApp Button with Disabled/Pending Notice */}
              <button
                onClick={onOpenWhatsAppModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/70 border border-stone-700/80 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                title="اضغط لمعرفة حالة تفعيل واتساب"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500/70" />
                <span>واتساب للطلب: غير مفعّل</span>
                <span className="text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.2 rounded">
                  بانتظار الرقم المعتمد
                </span>
              </button>
            </div>

            {/* "الأشهر في أمواج" Quick Badges Strip */}
            <div className="pt-3">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>الأشهر طلباً في مطعم أمواج:</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[#141924] border border-amber-500/30 text-stone-200 px-3 py-1 rounded-lg">
                  🔥 مشكل أمواج الفاخر
                </span>
                <span className="bg-[#141924] border border-amber-500/30 text-stone-200 px-3 py-1 rounded-lg">
                  🍗 وجبة بروستد 4 قطع مقرمشة
                </span>
                <span className="bg-[#141924] border border-amber-500/30 text-stone-200 px-3 py-1 rounded-lg">
                  🍢 شيش طاووق على الفحم
                </span>
                <span className="bg-[#141924] border border-amber-500/30 text-stone-200 px-3 py-1 rounded-lg">
                  🌯 وجبة شاورما عربي لحم
                </span>
              </div>
            </div>

          </div>

          {/* Visual Showcase Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Glow Border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-amber-600/50 via-amber-500/20 to-orange-500/40 shadow-2xl shadow-black/80">
                <div className="bg-[#121620] rounded-[22px] overflow-hidden border border-stone-800">
                  
                  {/* Hero Showcase Image */}
                  <div className="relative h-72 sm:h-84 overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85"
                      alt="مشكل أمواج الفاخر للمشويات"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-black/30" />
                    
                    {/* Floating Tag */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-amber-500/50 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>صنف رقم 1: مشكل أمواج الفاخر</span>
                    </div>

                    <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between">
                      <div className="bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-700">
                        <span className="text-[10px] text-stone-400 block">السعر الاسترشادي للمعاينة</span>
                        <span className="text-xl font-black text-amber-400">345 ج.م</span>
                      </div>
                      <a
                        href="#menu"
                        className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold px-3.5 py-2.5 rounded-xl flex items-center gap-1 shadow-md transition-colors"
                      >
                        <span>تصفح المنيو</span>
                        <ArrowLeft className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Quick Card Features */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/80 pb-3">
                      <span>مصدر الأسعار: قائمة طلبات المعروضة</span>
                      <span className="text-amber-400 font-semibold">قابلة للتعديل الحي</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-200 font-medium">وجبة بروستد 4 قطع ذهبية</span>
                        <span className="text-amber-400 font-bold">215 ج.م*</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-200 font-medium">شيش طاووق على الفحم</span>
                        <span className="text-amber-400 font-bold">220 ج.م*</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-200 font-medium">جمبري مشوي جامبو</span>
                        <span className="text-amber-400 font-bold">360 ج.م*</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={onOpenMenuManager}
                        className="text-xs text-amber-400 hover:text-white underline font-semibold cursor-pointer"
                      >
                        تعديل أسعار وصور هذه الأصناف
                      </button>
                      <span className="text-[11px] text-stone-500">جودة 4K احترافية</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
