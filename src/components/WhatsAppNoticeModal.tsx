import React from 'react';
import { X, MessageCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { RESTAURANT_META } from '../data/restaurantData';

interface WhatsAppNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppNoticeModal: React.FC<WhatsAppNoticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#121620] border border-stone-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-400 font-bold block">حالة خدمة الواتساب</span>
            <h3 className="text-lg font-bold text-white">خدمة طلبات الواتساب</h3>
          </div>
        </div>

        {/* Status Box */}
        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 text-xs leading-relaxed text-stone-300">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>الحالة: بانتظار الرقم الرسمي من المطعم</span>
          </div>
          <p>
            {RESTAURANT_META.contact.whatsapp.disclaimer}
          </p>
          <p className="text-stone-400">
            بناءً على تعليمات الأمان المهني، لا نقوم بافتراض أو اختلاق أي أرقام واتساب أو حسابات تواصل لم تُنشر رسمياً من المطعم.
          </p>
        </div>

        {/* Next step for the restaurant */}
        <div className="p-3.5 rounded-xl bg-[#171d2a] border border-stone-800 space-y-1.5 text-xs">
          <span className="font-semibold text-stone-200 block">خطوة الاعتماد:</span>
          <p className="text-stone-400 leading-normal">
            بمجرد تزويدنا برقم الهاتف المخصص لخدمة العملاء والواتساب، سيتم تفعيل زر المحادثة الفورية وتجهيز رسالة طلب مسبقة تلقائية.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold transition-colors cursor-pointer text-center"
        >
          حسناً، إغلاق
        </button>

      </div>
    </div>
  );
};
