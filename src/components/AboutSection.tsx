import React from 'react';
import { 
  Flame, Award, ShieldCheck, HeartHandshake, 
  Sparkles, Info, UtensilsCrossed 
} from 'lucide-react';
import { RESTAURANT_META } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0e1117] relative border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>قصتنا وهويتنا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            عن مطعم <span className="text-amber-400">أمواج للمشويات</span>
          </h2>
          <p className="text-stone-400 text-base leading-relaxed">
            مذاق الفحم الطبيعي، لحوم بلدي طازجة وتتبيلات شرقية متميزة في قلب القاهرة.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-stone-300 leading-relaxed text-base">
              <p>
                {RESTAURANT_META.aboutStory}
              </p>
              <p className="text-stone-400 text-sm">
                نحرص في قائمة طعام أمواج على التنوع الذي يلبي كافة الأذواق العائلية؛ بدءاً من صواني مشكل أمواج والكباب والكفتة المشوية على الفحم، مروراً بوجبات الشاورما العربي بخبز الصاج ودبس الرمان، وصولاً إلى خلطة البروستد المقرمشة المحبوبة والبرجر المشوي على اللهب، وأطباق المأكولات البحرية الطازجة كطواجن السي فود والجمبري الجامبو المشوي.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#141923] border border-stone-800 rounded-xl p-4 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">شواء الفحم الطبيعي</h4>
                <p className="text-stone-400 text-xs leading-normal">
                  تتبيلات متوارثة وتحضير يومي للحوم والدواجن للشواء على الجمر لمنح أشهى نكهة مدخنة.
                </p>
              </div>

              <div className="bg-[#141923] border border-stone-800 rounded-xl p-4 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">جودة المكونات والطهي</h4>
                <p className="text-stone-400 text-xs leading-normal">
                  استخدام لحوم طازجة وخضروات يومية مختارة لتقديم وجبات شهية تليق بضيوفنا.
                </p>
              </div>
            </div>

            {/* Respectful Transparency Callout */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex items-start gap-3 text-xs text-stone-400">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-200 block mb-0.5">
                  إخلاء مسؤولية ودقة بيانات النموذج:
                </span>
                هذا الموقع الإلكتروني هو نموذج تصميم استعراضي أُعدّ لغرض تقديم رؤية عصرية لمطعم أمواج. لا يدّعي الموقع حالياً الملكية الرسمية أو التعاقد النهائي حتى اعتماده رسمياً، ولم يتم اختلاق أي تقييمات عملاء أو بيانات شخصية.
              </div>
            </div>

          </div>

          {/* Visual Showcase Gallery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-stone-800 h-48 sm:h-56 relative group">
                <img
                  src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80"
                  alt="فراخ مشوية على الفحم"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white">فراخ مشوية على الفحم</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-stone-800 h-36 sm:h-44 relative group">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
                  alt="برجر أمواج جورميه"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white">برجر مشوي على اللهب</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="rounded-2xl overflow-hidden border border-stone-800 h-36 sm:h-44 relative group">
                <img
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
                  alt="بروستد دجاج مقرمش 4 قطع"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white">وجبة بروستد 4 قطع ذهبية</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-stone-800 h-48 sm:h-56 relative group">
                <img
                  src="https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80"
                  alt="جمبري مشوي جامبو"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white">جمبري مشوي على الفحم</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
