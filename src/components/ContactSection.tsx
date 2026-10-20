import React from 'react';
import { 
  PhoneCall, MessageCircle, MapPin, ExternalLink, 
  ShieldCheck, AlertTriangle, CheckSquare, Sparkles, HelpCircle 
} from 'lucide-react';
import { RESTAURANT_META } from '../data/restaurantData';

interface ContactSectionProps {
  onOpenPhoneModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenChecklist: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenPhoneModal,
  onOpenWhatsAppModal,
  onOpenChecklist,
}) => {
  return (
    <section id="contact" className="py-20 bg-[#0b0d10] border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>قنوات الطلب والتواصل الرسمية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            التواصل والطلب مع <span className="text-amber-400">أمواج للمشويات</span>
          </h2>
          <p className="text-stone-400 text-sm">
            روابط حقيقية وموثوقة للطلب والخرائط، مع الشفافية الكاملة بشأن أرقام الاتصال وقنوات الخدمة.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* 1. Talabat Official Order */}
          <div className="bg-[#121620] border border-[#ea580c]/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[#ea580c] transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#ea580c]/20 text-[#ea580c] flex items-center justify-center font-bold text-xl">
                T
              </div>
              <div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold inline-block mb-1">
                  رابط رسمي مفعل
                </span>
                <h3 className="text-lg font-bold text-white">الطلب عبر طلبات (Talabat)</h3>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                صفحة قائمة طعام مطعم أمواج بمدينة نصر على منصة طلبات مصر للاطلاع على الوجبات وطلب التوصيل المباشر.
              </p>
            </div>

            <a
              href={RESTAURANT_META.links.talabatMenu}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-md"
            >
              <span>فتح صفحة المطعم على طلبات</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 2. Google Maps Nasr City Branch */}
          <div className="bg-[#121620] border border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-500 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold inline-block mb-1">
                  موقع موثق بالخريطة
                </span>
                <h3 className="text-lg font-bold text-white">موقع فرع مدينة نصر</h3>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                57 شارع عباس العقاد، المنطقة الأولى، مدينة نصر، القاهرة. افتح الخريطة للتوجيه الملاحي المباشر للفرع.
              </p>
            </div>

            <a
              href={RESTAURANT_META.links.googleMapsNasrCity}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs py-3 rounded-xl transition-colors"
            >
              <span>فتح الموقع على Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 3. Linktree Amwaj Cairo */}
          <div className="bg-[#121620] border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-stone-700 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-stone-800 text-stone-300 flex items-center justify-center font-bold text-lg">
                <ExternalLink className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="text-xs bg-stone-800 text-stone-300 border border-stone-700 px-2 py-0.5 rounded font-semibold inline-block mb-1">
                  صفحة الروابط الرسمية
                </span>
                <h3 className="text-lg font-bold text-white">صفحة Amwaj Cairo Linktree</h3>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                صفحة الروابط الخاصة بمطعم أمواج القاهرة التي تجمع روابط المطعم المعتمدة.
              </p>
            </div>

            <a
              href={RESTAURANT_META.links.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs py-3 rounded-xl transition-colors border border-stone-700"
            >
              <span>زيارة Linktree أمواج</span>
              <ExternalLink className="w-4 h-4 text-stone-400" />
            </a>
          </div>

        </div>

        {/* Direct Channels Status: Hotline & WhatsApp */}
        <div className="bg-[#141923] border border-stone-800 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="max-w-2xl mb-6">
            <h3 className="text-xl font-bold text-white mb-1">
              حالة أرقام الاتصال المباشر والواتساب
            </h3>
            <p className="text-stone-400 text-xs">
              التزاماً بسياسة الأمان وعدم توجيه العملاء إلى أرقام غير معتمدة رسمياً:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Hotline 15036 Card */}
            <div className="bg-[#0e1117] border border-amber-500/30 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                    <PhoneCall className="w-4 h-4" />
                    <span>الخط الساخن: 15036</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                    غير مؤكد رسمياً
                  </span>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  الرقم 15036 منشور في دليل المنيو المتاح، ولكنه يتطلب موافقة وتأكيد إدارة المطعم قبل تفعيل الاتصال المباشر التلقائي.
                </p>
              </div>

              <button
                onClick={onOpenPhoneModal}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                تأكيد ومراجعة حالة الرقم (15036)
              </button>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#0e1117] border border-stone-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-300 font-bold text-base">
                    <MessageCircle className="w-4 h-4 text-emerald-500/70" />
                    <span>رقم واتساب للطلب</span>
                  </div>
                  <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-0.5 rounded font-semibold">
                    غير مفعل حالياً
                  </span>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  لم يتم تفعيل زر واتساب تجنباً لتوجيه الطلبات لرقم غير رسمي، بانتظار تزويدنا برقم الواتساب المعتمد من قبل إدارة المطعم.
                </p>
              </div>

              <button
                onClick={onOpenWhatsAppModal}
                className="w-full py-2.5 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                معلومات تفعيل رقم الواتساب
              </button>
            </div>

          </div>
        </div>

        {/* Restaurant Approval Banner */}
        <div className="bg-gradient-to-r from-amber-950/40 via-[#181d28] to-stone-900 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">
                قائمة المتطلبات اللازمة من المطعم لتحويل النموذج إلى موقع رسمي
              </h4>
              <p className="text-stone-400 text-xs mt-0.5">
                تتضمن اعتماد المنيو النهائي، مواعيد العمل، تأكيد الخط الساخن، واللوجو الأصلي.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenChecklist}
            className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 shadow-md"
          >
            عرض بنود الاعتماد (6 نقاط)
          </button>
        </div>

      </div>
    </section>
  );
};
