import React from 'react';
import { 
  Flame, Layers, Drumstick, Fish, Soup, 
  Plus, Check, Sparkles, AlertCircle, Clock, Users, Star 
} from 'lucide-react';
import { MenuItem } from '../data/restaurantData';

interface CategoryHighlightsProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: string[];
}

export const CategoryHighlights: React.FC<CategoryHighlightsProps> = ({
  items,
  onSelectItem,
  onAddToCart,
  cartItemIds,
}) => {
  const sections = [
    {
      id: 'grills-section',
      categoryId: 'grills',
      title: 'المشويات والكباب والكفتة على الفحم',
      subtitle: 'نكهة الفحم الطبيعي مع تتبيلات أمواج المتوارثة واللحوم البلدية الطازجة',
      icon: Flame,
      accentColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    },
    {
      id: 'shawarma-section',
      categoryId: 'shawarma',
      title: 'الشاورما والسندوتشات العربية',
      subtitle: 'شاورما اللحم والدجاج مع صلصات الطحينة والثومية وخبز الصاج المحمص',
      icon: Layers,
      accentColor: 'text-orange-400',
      badgeBg: 'bg-orange-500/10 border-orange-500/30 text-orange-300',
    },
    {
      id: 'broasted-section',
      categoryId: 'burger_fried',
      title: 'البرجر والدجاج المقلي (البروستد)',
      subtitle: 'وجبات البروستد المقرمشة الذهبية وبرجر اللحم المشوي على اللهب',
      icon: Drumstick,
      accentColor: 'text-yellow-400',
      badgeBg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    },
    {
      id: 'seafood-section',
      categoryId: 'seafood',
      title: 'الأسماك والمأكولات البحرية',
      subtitle: 'جمبري مشوي على الفحم، طواجن السي فود والأسماك السنجاري بالخلطة الإسكندرانية',
      icon: Fish,
      accentColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    },
    {
      id: 'appetizers-section',
      categoryId: 'appetizers_drinks',
      title: 'المقبلات والسلطات والمشروبات المنعشة',
      subtitle: 'أطباق الحمص والمتبل، السلطات الخضراء، البطاطس المقرمشة والعصائر الطبيعية',
      icon: Soup,
      accentColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    },
  ];

  return (
    <div className="space-y-24 py-12">
      {sections.map((sec, idx) => {
        const secItems = items.filter((i) => i.category === sec.categoryId);
        const IconComponent = sec.icon;

        return (
          <section
            key={sec.id}
            id={sec.id}
            className={`relative scroll-mt-24 ${
              idx % 2 === 1 ? 'bg-[#0e121a]/70 py-16 -mx-4 px-4 sm:-mx-8 sm:px-8 rounded-3xl border border-stone-800/80 shadow-2xl' : ''
            }`}
          >
            {/* Category Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-stone-800">
              <div className="space-y-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${sec.badgeBg}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>القسم #{idx + 4} في المنيو</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {sec.title}
                </h3>
                <p className="text-stone-400 text-sm max-w-2xl">
                  {sec.subtitle}
                </p>
              </div>

              <div className="text-xs text-stone-400 flex items-center gap-1.5 self-start md:self-auto bg-stone-900/90 px-3 py-1.5 rounded-lg border border-stone-800">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                <span>الأسعار استرشادية من منيو طلبات بانتظار الاعتماد</span>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secItems.map((item) => {
                const inCart = cartItemIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-[#121622] hover:bg-[#151a28] border border-stone-800/90 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col group shadow-xl shadow-black/40"
                  >
                    {/* Item Image */}
                    <div 
                      className="relative h-52 overflow-hidden cursor-pointer"
                      onClick={() => onSelectItem(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent" />
                      
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {item.popular && (
                          <span className="bg-amber-500 text-stone-950 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-stone-950" />
                            <span>الأشهر</span>
                          </span>
                        )}
                        {item.badge && !item.popular && (
                          <span className="bg-black/75 text-amber-300 border border-amber-500/30 text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {item.prepTime && (
                        <div className="absolute bottom-2 left-3 flex items-center gap-1 text-[11px] text-stone-300 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{item.prepTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => onSelectItem(item)}
                            className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                          >
                            {item.name}
                          </h4>
                          
                          <div className="text-left shrink-0">
                            <span className="text-amber-400 font-extrabold text-lg block">
                              {item.price} <span className="text-xs font-normal">ج.م*</span>
                            </span>
                            {item.originalPrice && (
                              <span className="text-stone-500 line-through text-xs block">
                                {item.originalPrice} ج.م
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-stone-300 text-xs leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-1 text-[11px] text-stone-400 pt-1">
                          <Users className="w-3 h-3 text-stone-400" />
                          <span>{item.serving}</span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
                        >
                          المكونات والتفاصيل
                        </button>

                        <button
                          onClick={() => onAddToCart(item)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            inCart
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30'
                          }`}
                        >
                          {inCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>مُضاف للحاسبة</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>أضف للطلب التقديري</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
