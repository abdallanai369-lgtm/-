import React from 'react';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, 
  ExternalLink, MapPin, AlertCircle, ArrowLeft 
} from 'lucide-react';
import { MenuItem, RESTAURANT_META } from '../data/restaurantData';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface OrderSimulatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const OrderSimulatorDrawer: React.FC<OrderSimulatorDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#121620] border-r border-stone-800 h-full flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">حاسبة الطلب التقديرية</h3>
              <span className="text-[11px] text-stone-400">معاينة الأصناف والتكلفة التقديرية</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-800/80 text-stone-500 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-stone-300 text-sm font-semibold">سلة المعاينة فارغة</p>
              <p className="text-stone-500 text-xs max-w-xs mx-auto">
                اضغط على زر "أضف للطلب التقديري" بجوار أي وجبة في المنيو لتجربة احتساب التكلفة.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((entry) => (
                <div
                  key={entry.item.id}
                  className="bg-[#171d2a] p-3.5 rounded-xl border border-stone-800 flex items-center justify-between gap-3"
                >
                  <img
                    src={entry.item.image}
                    alt={entry.item.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {entry.item.name}
                    </h4>
                    <span className="text-[11px] text-amber-400 font-bold block mt-0.5">
                      {entry.item.price} ج.م × {entry.quantity} = {entry.item.price * entry.quantity} ج.م*
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-[#0e1117] p-1 rounded-lg border border-stone-800">
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, -1)}
                      className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-5 text-center">
                      {entry.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, 1)}
                      className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(entry.item.id)}
                      className="w-6 h-6 rounded text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer mr-1"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-stone-400 hover:text-red-400 text-xs underline cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>تفريغ السلة التقديرية</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer & Actions */}
        <div className="p-5 border-t border-stone-800 bg-[#0e1117] space-y-4">
          
          {/* Estimated Total */}
          <div className="space-y-1.5 bg-[#171d2a] p-3.5 rounded-xl border border-stone-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-300">إجمالي الوجبات التقديري:</span>
              <span className="text-xl font-black text-amber-400">
                {totalAmount} <span className="text-xs font-normal">ج.م*</span>
              </span>
            </div>
            <p className="text-[10px] text-stone-400">
              * الأسعار استرشادية مبنية على منيو طلبات وتتطلب الاعتماد النهائي من المطعم.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2">
            <a
              href={RESTAURANT_META.links.talabatMenu}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-md shadow-orange-950/30"
            >
              <span>طلب هذه الوجبات عبر منيو طلبات</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={RESTAURANT_META.links.googleMapsNasrCity}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold py-2.5 rounded-xl transition-colors border border-stone-700"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>موقع الاستلام من فرع مدينة نصر</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
