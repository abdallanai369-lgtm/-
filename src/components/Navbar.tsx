import React, { useState } from 'react';
import { 
  Menu, X, MapPin, ExternalLink, Flame, ShoppingBag, 
  PhoneCall, ShieldAlert, Sparkles, CheckSquare 
} from 'lucide-react';
import { RESTAURANT_META } from '../data/restaurantData';

interface NavbarProps {
  onOpenChecklist: () => void;
  onOpenPhoneModal: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenChecklist, 
  onOpenPhoneModal, 
  cartCount,
  onOpenCart 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'من نحن', href: '#about' },
    { label: 'المنيو', href: '#menu' },
    { label: 'المشويات', href: '#grills-section' },
    { label: 'الشاورما', href: '#shawarma-section' },
    { label: 'البرجر والبروستد', href: '#broasted-section' },
    { label: 'الأسماك والبحريات', href: '#seafood-section' },
    { label: 'المقبلات والمشروبات', href: '#appetizers-section' },
    { label: 'الفروع', href: '#branches' },
    { label: 'التواصل والطلب', href: '#contact' },
  ];

  return (
    <>
      {/* Top Disclaimer Bar */}
      <div className="bg-amber-950/80 border-b border-amber-500/20 text-amber-200 text-xs px-4 py-1.5 text-center flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          نموذج استعراضي غير رسمي:
        </span>
        <span>
          أُنشئ هذا التصميم لعرض مقترح لمطعم أمواج — الأسعار استرشادية وبانتظار اعتماد المطعم النهائي.
        </span>
        <button 
          onClick={onOpenChecklist}
          className="text-amber-300 underline font-medium hover:text-white transition-colors cursor-pointer mr-1"
        >
          عناصر بانتظار الاعتماد (6)
        </button>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#0b0d10]/95 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Name */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-500/10">
                <div className="w-full h-full bg-[#0e1117] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-white group-hover:text-amber-400 transition-colors">
                    أمواج
                  </span>
                  <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-medium">
                    للمشويات
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 tracking-wider font-light">
                  AMWAJ RESTAURANT & GRILLS
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.slice(0, 6).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-stone-300 hover:text-amber-400 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="relative group">
                <button className="px-3 py-2 text-sm text-stone-300 hover:text-amber-400 font-medium transition-colors flex items-center gap-1 cursor-pointer">
                  المزيد من الأقسام
                  <span className="text-[10px]">▼</span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-[#12161f] border border-stone-800 rounded-xl p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {navLinks.slice(6).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800/50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* Quick Actions Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Talabat Direct Order */}
              <a
                href={RESTAURANT_META.links.talabatMenu}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all shadow-md shadow-orange-900/30"
                title="طلب عبر قائمة طلبات الرسمية"
              >
                <span>طلب على طلبات</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Google Maps Button */}
              <a
                href={RESTAURANT_META.links.googleMapsNasrCity}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium px-3 py-2 rounded-lg border border-stone-700/80 transition-colors"
                title="فتح موقع فرع مدينة نصر على خرائط جوجل"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>موقع الفرع</span>
              </a>

              {/* Hotline Unconfirmed Modal Trigger */}
              <button
                onClick={onOpenPhoneModal}
                className="inline-flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                title="الخط الساخن (يحتاج تأكيد الإدارة)"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>15036*</span>
              </button>

              {/* Order Estimator Cart */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-stone-300 hover:text-amber-400 hover:bg-stone-800/80 rounded-lg transition-colors cursor-pointer"
                title="سلة تجربة الطلب التقديرية"
                aria-label="سلة الطلب التقديرية"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions: Cart + Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenCart}
                className="relative p-2 text-stone-300 hover:text-amber-400"
                aria-label="سلة الطلب التقديرية"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                aria-label="تبديل القائمة"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e1117] border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-stone-300 hover:text-amber-400 hover:bg-stone-800/40 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
              <a
                href={RESTAURANT_META.links.talabatMenu}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#ea580c] text-white text-sm font-bold py-2.5 rounded-lg"
              >
                <span>الطلب من منيو طلبات الرسمي</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={RESTAURANT_META.links.googleMapsNasrCity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-stone-800 text-stone-200 text-xs font-medium py-2 rounded-lg border border-stone-700"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>موقع عباس العقاد</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPhoneModal();
                  }}
                  className="flex items-center justify-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold py-2 rounded-lg"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>الخط 15036 (مراجعة)</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChecklist();
                }}
                className="w-full text-center text-xs text-amber-400/90 py-1.5 underline"
              >
                عرض قائمة الموافقات المطلوبة من المطعم (6 نقاط)
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
