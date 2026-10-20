import React from 'react';
import { 
  Flame, MapPin, ExternalLink, ShieldCheck, 
  Heart, ArrowUp, CheckSquare 
} from 'lucide-react';
import { RESTAURANT_META, BRANCHES_DATA } from '../data/restaurantData';

interface FooterProps {
  onOpenChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChecklist }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nasrCity = BRANCHES_DATA.find((b) => b.id === 'nasr-city');

  return (
    <footer className="bg-[#080a0d] border-t border-stone-800 text-stone-400 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5">
                <div className="w-full h-full bg-[#0b0d10] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-black text-white block">أمواج للمشويات</span>
                <span className="text-[10px] text-amber-400 font-mono">AMWAJ RESTAURANT</span>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs">
              مطعم متخصص في تقديم أشهى مشويات الفحم، الشاورما العربي، البروستد المقرمش، والأسماك والمأكولات البحرية الطازجة.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/20 transition-colors cursor-pointer"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>قائمة بنود الاعتماد والموافقة</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              أقسام الموقع
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  من نحن وقصة المطعم
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  منيو المشويات والوجبات
                </a>
              </li>
              <li>
                <a href="#grills-section" className="hover:text-amber-400 transition-colors">
                  المشويات والكباب والكفتة
                </a>
              </li>
              <li>
                <a href="#broasted-section" className="hover:text-amber-400 transition-colors">
                  البرجر والدجاج المقلي (البروستد)
                </a>
              </li>
              <li>
                <a href="#seafood-section" className="hover:text-amber-400 transition-colors">
                  الأسماك والمأكولات البحرية
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              الروابط المنشورة المعتمدة
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={RESTAURANT_META.links.talabatMenu}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>صفحة قائمة الطعام على طلبات</span>
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT_META.links.googleMapsNasrCity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>موقع الفرع على Google Maps</span>
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT_META.links.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>صفحة روابط Amwaj Cairo (Linktree)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Branch Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              بيانات الفرع الرئيسي
            </h4>
            <div className="bg-[#121620] p-4 rounded-xl border border-stone-800 space-y-2">
              <span className="font-bold text-stone-200 block text-xs">
                فرع مدينة نصر (المنطقة الأولى):
              </span>
              <p className="text-stone-400 text-xs leading-relaxed">
                {nasrCity?.address}
              </p>
              <div className="pt-1 text-[11px] text-amber-400/80">
                الخط الساخن: 15036 (يحتاج تأكيد الإدارة)
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Callout */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 space-y-3 text-stone-500 text-[11px] leading-relaxed">
          <p>
            <strong>إخلاء مسؤولية قانوني وتقني:</strong> هذا الموقع هو نموذج تجريبي استعراضي (Prototype) صُمم لعرض مقترح واجهة مستخدم رقمية حديثة لمطعم أمواج للمشويات — مدينة نصر. لا يدّعي الموقع أي صفة رسمية أو ملكية تجارية للمطعم حتى الحصول على التفويض المباشر، وجميع الأسعار والوجبات المذكورة هي أسعار استرشادية أولية للمعاينة منقولة من قائمة طلبات وتتطلب الموافقة والاعتماد النهائي من إدارة المطعم.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/60 border-t border-stone-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} مطعم أمواج للمشويات — نموذج تصميم واجهات رقمية (Amwaj Restaurant Showcase).
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
