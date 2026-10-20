import React from 'react';
import { X, Clock, Users, Flame, Plus, Check, AlertCircle } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  isInCart: boolean;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  isInCart,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#121620] border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-60 w-full shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-black/30" />
          
          {item.badge && (
            <span className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-md shadow-md">
              {item.badge}
            </span>
          )}

          <div className="absolute bottom-3 right-4">
            <span className="text-2xl font-black text-amber-400">
              {item.price} <span className="text-sm font-normal text-amber-200">ج.م*</span>
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
            <p className="text-xs text-stone-400 font-mono">{item.nameEn}</p>
          </div>

          <p className="text-sm text-stone-300 leading-relaxed">
            {item.description}
          </p>

          {/* Details row */}
          <div className="grid grid-cols-2 gap-3 bg-[#171d2a] p-3.5 rounded-xl border border-stone-800 text-xs">
            <div className="flex items-center gap-2 text-stone-300">
              <Users className="w-4 h-4 text-amber-400" />
              <span>{item.serving}</span>
            </div>
            {item.prepTime && (
              <div className="flex items-center gap-2 text-stone-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>زمن التحضير: {item.prepTime}</span>
              </div>
            )}
          </div>

          {/* Ingredients */}
          {item.ingredients.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                المكونات والتتبيلة:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs bg-stone-800/80 text-stone-300 px-2.5 py-1 rounded-lg border border-stone-700/60"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer callout */}
          <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl flex items-start gap-2 text-[11px] text-amber-300/90">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              السعر استرشادي للمعاينة مأخوذ من قائمة طلبات المتاحة، ويتطلب الاعتماد الرسمي من إدارة المطعم قبل إطلاق الموقع.
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-stone-800 bg-[#0e1117] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-stone-400 hover:text-white text-xs font-medium cursor-pointer"
          >
            إغلاق
          </button>

          <button
            onClick={() => onAddToCart(item)}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isInCart
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>مُضاف إلى حاسبة الطلب</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>أضف لحاسبة الطلب التقديرية</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
