import React, { useState } from 'react';
import { 
  MapPin, ExternalLink, Clock, Phone, Copy, Check, 
  AlertCircle, ShieldCheck, HelpCircle, Navigation 
} from 'lucide-react';
import { BRANCHES_DATA } from '../data/restaurantData';

export const BranchesSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="branches" className="py-20 bg-[#0e1117] border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>مواقع الفروع</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            فروع <span className="text-amber-400">أمواج للمشويات</span>
          </h2>
          <p className="text-stone-400 text-sm">
            نلتزم بالدقة التامة في عرض الفروع المنشورة والمعتمدة وتوضيح الفروع التي لا تزال قيد التحقق.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. فرع مدينة نصر (المنشور والمؤكد) */}
          {BRANCHES_DATA.filter((b) => b.id === 'nasr-city').map((branch) => (
            <div
              key={branch.id}
              className="bg-[#121620] border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-xl shadow-amber-500/5"
            >
              {/* Branch Status Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{branch.name}</h3>
                    <span className="text-xs text-stone-400">{branch.city} - {branch.area}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{branch.statusLabel}</span>
                </span>
              </div>

              {/* Branch Address & Details */}
              <div className="space-y-4 text-sm">
                <div className="bg-[#171d2a] p-4 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="font-semibold text-stone-300">العنوان المنشور:</span>
                    <button
                      onClick={() => handleCopyAddress(branch.id, branch.address)}
                      className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      {copiedId === branch.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ العنوان</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-stone-200 font-medium leading-relaxed">
                    {branch.address}
                  </p>
                </div>

                {/* Working hours notice */}
                <div className="flex items-start gap-3 text-stone-400 text-xs">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-300 block">مواعيد العمل:</span>
                    <span>{branch.workingHours}</span>
                  </div>
                </div>

                {/* Phone hotline notice */}
                <div className="flex items-start gap-3 text-stone-400 text-xs">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-300 block">الخط الساخن:</span>
                    <span>{branch.phone}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-3">
                {branch.mapsUrl && (
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>فتح موقع الفرع على Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                )}
              </div>

            </div>
          ))}

          {/* 2. فرع مدينتي (قيد التأكيد) */}
          {BRANCHES_DATA.filter((b) => b.id === 'madinaty').map((branch) => (
            <div
              key={branch.id}
              className="bg-[#121620]/70 border border-dashed border-stone-700 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative"
            >
              {/* Branch Status Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 text-stone-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-300">{branch.name}</h3>
                    <span className="text-xs text-stone-500">{branch.city} - {branch.area}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{branch.statusLabel}</span>
                </span>
              </div>

              {/* Branch Address & Details */}
              <div className="space-y-4 text-sm">
                <div className="bg-[#171d2a]/60 p-4 rounded-xl border border-stone-800/80 space-y-2">
                  <span className="text-xs font-semibold text-stone-400 block">ملاحظة الفرع:</span>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    {branch.address}
                  </p>
                </div>

                <div className="bg-amber-950/20 border border-amber-500/20 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>
                    هذا الفرع مقترح ويحتاج إلى تأكيد تفاصيله وموقعه الجغرافي الدقيق ومواعيد العمل وأرقام الهواتف من إدارة المطعم قبل اعتماده ونشره رسمياً، تجنباً لأي معلومات غير دقيقة.
                  </span>
                </div>
              </div>

              {/* Actions Disabled placeholder */}
              <div className="pt-4 border-t border-stone-800">
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-xl bg-stone-800/50 text-stone-500 text-xs font-medium cursor-not-allowed text-center"
                >
                  الرابط والتفاصيل ستُفعل فور اعتماد المطعم لفرع مدينتي
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
