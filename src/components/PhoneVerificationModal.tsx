import React, { useState } from 'react';
import { X, PhoneCall, AlertTriangle, ShieldCheck, Copy, Check } from 'lucide-react';
import { RESTAURANT_META } from '../data/restaurantData';

interface PhoneVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotlineNumber: string;
}

export const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
  isOpen,
  onClose,
  hotlineNumber,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(hotlineNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#121620] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-stone-200"
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
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-amber-400 font-bold block">تنبيه التحقق والأمان</span>
            <h3 className="text-lg font-bold text-white">حالة الخط الساخن ({hotlineNumber})</h3>
          </div>
        </div>

        {/* Warning Box */}
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-2 text-xs leading-relaxed text-amber-200">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>حالة الرقم: غير مؤكد حتى موافقة المطعم</span>
          </div>
          <p>
            {RESTAURANT_META.contact.hotline.disclaimer}
          </p>
          <p className="text-stone-300">
            تطبيقاً لسياسة الأمان ومنع الإزعاج أو التضليل، لم يتم تفعيل الاتصال المباشر التلقائي بزر الاتصال في النسخة الرسمية حتى نحصل على تأكيد كتابي من إدارة مطعم أمواج.
          </p>
        </div>

        {/* Number Display */}
        <div className="bg-[#171d2a] p-4 rounded-xl border border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-stone-400 block">الرقم المنشور في الدليل:</span>
            <span className="text-2xl font-mono font-extrabold text-amber-400">{hotlineNumber}</span>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ الرقم</span>
              </>
            )}
          </button>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer text-center"
          >
            فهمت، إغلاق النافذة
          </button>

          <a
            href={`tel:${hotlineNumber}`}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors text-center inline-flex items-center justify-center gap-1.5"
          >
            <span>تجربة الاتصال (يدويًا)</span>
          </a>
        </div>

      </div>
    </div>
  );
};
