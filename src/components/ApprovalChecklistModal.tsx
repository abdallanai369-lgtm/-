import React from 'react';
import { X, CheckSquare, Clock, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import { RESTAURANT_META } from '../data/restaurantData';

interface ApprovalChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApprovalChecklistModal: React.FC<ApprovalChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#121620] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-stone-200 max-h-[90vh] overflow-y-auto"
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
        <div className="flex items-center gap-3 border-b border-stone-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-amber-400 font-bold block">متطلبات الإطلاق الرسمي</span>
            <h3 className="text-xl font-bold text-white">
              قائمة المعلومات المطلوبة من إدارة مطعم أمواج
            </h3>
          </div>
        </div>

        {/* Introduction */}
        <p className="text-xs text-stone-300 leading-relaxed bg-[#171d2a] p-4 rounded-xl border border-stone-800">
          هذا المشروع تم تصميمه كنموذج استعراضي فائق الجودة لمطعم أمواج للمشويات — مدينة نصر. ليصبح الموقع رسميًا ومعتمدًا بنسبة 100%، يحتاج فريق العمل إلى الحصول على موافقة وتأكيد إدارة المطعم على البنود الستة التالية:
        </p>

        {/* Checklist Items */}
        <div className="space-y-3">
          {RESTAURANT_META.approvalChecklist.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#0e1117] border border-stone-800 rounded-xl p-4 flex items-start gap-3 hover:border-amber-500/30 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                    الحالة: بانتظار الاعتماد
                  </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[11px] text-stone-500 pt-1">
                  المصدر الحالي بالنموذج: {item.source}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Note */}
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>التزام مهني:</strong> تم بناء هذا النموذج دون المساس ببيانات العملاء، ودون افتراض أي تقييمات مزورة، ومع الاحتفاظ بروابط طلبات وخرائط جوجل الرسمية فقط لضمان النزاهة والمصداقية.
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer text-center"
          >
            إغلاق ومتابعة تصفح المنيو
          </button>
        </div>

      </div>
    </div>
  );
};
