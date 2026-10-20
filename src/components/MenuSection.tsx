import React, { useState, useMemo } from 'react';
import { 
  Search, Flame, Filter, ExternalLink, AlertTriangle, 
  Sparkles, Plus, Check, SlidersHorizontal, Eye, Star 
} from 'lucide-react';
import { MenuItem, CATEGORIES, RESTAURANT_META } from '../data/restaurantData';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: string[];
  onOpenMenuManager: () => void;
  onTogglePopular: (itemId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onAddToCart,
  cartItemIds,
  onOpenMenuManager,
  onTogglePopular,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const popularItems = useMemo(() => items.filter((i) => i.popular), [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      let matchesCategory = false;
      if (activeCategory === 'all') {
        matchesCategory = true;
      } else if (activeCategory === 'popular') {
        matchesCategory = !!item.popular;
      } else {
        matchesCategory = item.category === activeCategory;
      }

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#0b0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-transparent border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>قائمة طعام أمواج الكاملة والخيارات الأشهر</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              استكشف <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-amber-400 to-amber-600">منيو المشويات والوجبات</span>
            </h2>
            <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
              تصفح أصناف مشويات الفحم، شاورما الصاج، وجبات البروستد الذهبية المقرمشة، البرجر، والبحريات. يمكنك تعديل أي صنف أو إضافة أطباق جديدة بضغطة زر.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Menu Manager Trigger */}
            <button
              onClick={onOpenMenuManager}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-stone-950" />
              <span>تعديل المنيو وإضافة أصناف</span>
            </button>

            {/* Talabat Menu Button */}
            <a
              href={RESTAURANT_META.links.talabatMenu}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-orange-950/40"
            >
              <span>منيو طلبات الرسمي</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Pricing Disclaimer Alert Box */}
        <div className="mb-10 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-200 text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300 block sm:inline ml-1">
                تنويه الأسعار الاسترشادية:
              </span>
              جميع الأسعار المعروضة في هذا النموذج مبنية على قائمة طلبات المعلنة للمعاينة فقط، ويمكنك تعديلها مباشرة عبر لوحة إدارة المنيو.
            </div>
          </div>
          <button
            onClick={onOpenMenuManager}
            className="text-amber-400 hover:text-white underline font-semibold shrink-0 cursor-pointer text-xs"
          >
            تعديل الأصناف والصور
          </button>
        </div>

        {/* Signature "الأشهر في أمواج" Showcase Strip */}
        {activeCategory === 'all' && !searchQuery && popularItems.length > 0 && (
          <div className="mb-14 bg-gradient-to-r from-amber-950/40 via-[#151a26] to-[#0f131d] p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                  <Star className="w-4 h-4 fill-stone-950" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">الأشهر والأكثر طلباً في أمواج</h3>
                  <span className="text-xs text-amber-400/90">الأصناف الحاصلة على أعلى تقييم وطلب من زوارنا</span>
                </div>
              </div>

              <button
                onClick={() => setActiveCategory('popular')}
                className="text-xs text-amber-300 hover:text-white underline font-medium cursor-pointer"
              >
                عرض كل الأصناف الأشهر ({popularItems.length})
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularItems.slice(0, 4).map((item) => (
                <div
                  key={`pop-${item.id}`}
                  className="bg-[#0e121a] hover:bg-[#121622] border border-amber-500/20 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div
                    className="relative h-40 overflow-hidden cursor-pointer"
                    onClick={() => onSelectItem(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-transparent to-transparent" />
                    
                    <span className="absolute top-2 right-2 bg-gradient-to-l from-amber-500 to-amber-600 text-stone-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-stone-950" />
                      <span>{item.badge || 'الأشهر'}</span>
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => onSelectItem(item)}
                        className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.name}
                      </h4>
                      <p className="text-stone-400 text-xs line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-amber-400 font-extrabold text-sm">
                        {item.price} <span className="text-[10px] font-normal">ج.م*</span>
                      </span>

                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-stone-950 text-xs font-bold transition-all cursor-pointer"
                      >
                        أضف للطلب
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="space-y-4 mb-10">
          
          {/* Search Box */}
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن صنف، وجبة بروستد، شيش طاووق، شاورما، جمبري..."
              className="w-full bg-[#121620] border border-stone-800 rounded-2xl pr-12 pl-4 py-3.5 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
              >
                مسح
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? items.length
                  : cat.id === 'popular'
                  ? popularItems.length
                  : items.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'bg-[#121620] text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800/80'
                  }`}
                >
                  <span>{cat.nameAr}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-black/20 text-stone-950' : 'bg-stone-800 text-stone-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#121620]/50 rounded-3xl border border-stone-800/80">
            <p className="text-stone-300 text-base mb-2">لا توجد نتائج تطابق بحثك حالياً</p>
            <p className="text-stone-500 text-xs mb-4">جرب البحث بكلمات أخرى أو أضف الصنف الذي تبحث عنه عبر محرر المنيو</p>
            <button
              onClick={onOpenMenuManager}
              className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold cursor-pointer"
            >
              فتح لوحة إضافة الأصناف
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const inCart = cartItemIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-[#121620] hover:bg-[#151a26] border border-stone-800 hover:border-amber-500/50 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col group shadow-xl shadow-black/50"
                >
                  {/* Item Image with 4K clarity */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-black/20" />
                    
                    {/* Badge or Popular tag */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {item.popular && (
                        <span className="bg-amber-500 text-stone-950 text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-stone-950" />
                          <span>الأشهر</span>
                        </span>
                      )}
                      {item.badge && !item.popular && (
                        <span className="bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Quick Star Toggle on card */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePopular(item.id);
                      }}
                      className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md hover:bg-black text-amber-400 flex items-center justify-center transition-colors cursor-pointer border border-stone-700"
                      title={item.popular ? 'إلغاء تمييز الأشهر' : 'تحديد كأحد أشهر الأطباق'}
                    >
                      <Star className={`w-4 h-4 ${item.popular ? 'fill-amber-400' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-stone-200 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>عرض التفاصيل</span>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          onClick={() => onSelectItem(item)}
                          className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </h3>

                        <div className="text-left shrink-0">
                          <span className="text-amber-400 font-black text-lg block">
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

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-400">
                        <span>{item.serving}</span>
                        {item.prepTime && (
                          <>
                            <span>•</span>
                            <span>{item.prepTime}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
                      >
                        تفاصيل المكونات
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
                            <span>مضاف للحاسبة</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>أضف للطلب</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
