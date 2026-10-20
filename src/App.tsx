/**
 * Amwaj Restaurant - Main Application
 * نموذج موقع مطعم أمواج للمشويات — مدينة نصر
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { CategoryHighlights } from './components/CategoryHighlights';
import { BranchesSection } from './components/BranchesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { PhoneVerificationModal } from './components/PhoneVerificationModal';
import { WhatsAppNoticeModal } from './components/WhatsAppNoticeModal';
import { ApprovalChecklistModal } from './components/ApprovalChecklistModal';
import { OrderSimulatorDrawer, CartItem } from './components/OrderSimulatorDrawer';
import { MenuManagerModal } from './components/MenuManagerModal';
import { INITIAL_MENU_ITEMS, MenuItem, RESTAURANT_META } from './data/restaurantData';
import { ShoppingBag, ExternalLink, MapPin, SlidersHorizontal, CheckSquare, Sparkles } from 'lucide-react';

const STORAGE_KEY_ITEMS = 'amwaj_restaurant_menu_v2';
const STORAGE_KEY_HOTLINE = 'amwaj_restaurant_hotline_v2';

export default function App() {
  // Load from LocalStorage if available for persistence
  const [items, setItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved menu:', e);
    }
    return INITIAL_MENU_ITEMS;
  });

  const [hotline, setHotline] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HOTLINE);
      if (saved) return saved;
    } catch (e) {
      console.error('Error loading saved hotline:', e);
    }
    return RESTAURANT_META.contact.hotline.number;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [checklistModalOpen, setChecklistModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [menuManagerOpen, setMenuManagerOpen] = useState(false);

  // Sync to LocalStorage on item change
  const handleSaveItems = (newItems: MenuItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(newItems));
    } catch (e) {
      console.error('Error persisting menu items:', e);
    }

    // Sync items in cart
    setCart((prevCart) =>
      prevCart
        .map((ci) => {
          const found = newItems.find((ni) => ni.id === ci.item.id);
          return found ? { ...ci, item: found } : null;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleResetItems = () => {
    setItems(INITIAL_MENU_ITEMS);
    try {
      localStorage.removeItem(STORAGE_KEY_ITEMS);
    } catch (e) {
      console.error('Error resetting menu items:', e);
    }
  };

  const handleUpdateHotline = (newNumber: string) => {
    setHotline(newNumber);
    try {
      localStorage.setItem(STORAGE_KEY_HOTLINE, newNumber);
    } catch (e) {
      console.error('Error persisting hotline:', e);
    }
  };

  const handleTogglePopular = (itemId: string) => {
    const updated = items.map((i) =>
      i.id === itemId
        ? {
            ...i,
            popular: !i.popular,
            badge: !i.popular ? 'الأكثر طلباً ⭐' : undefined,
          }
        : i
    );
    handleSaveItems(updated);
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartItemIds = cart.map((ci) => ci.item.id);
  const totalCartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080a0f] text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. Navbar */}
      <Navbar
        onOpenChecklist={() => setChecklistModalOpen(true)}
        onOpenPhoneModal={() => setPhoneModalOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: الرئيسية (Hero) */}
        <Hero
          onOpenPhoneModal={() => setPhoneModalOpen(true)}
          onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
          onOpenChecklist={() => setChecklistModalOpen(true)}
          onOpenMenuManager={() => setMenuManagerOpen(true)}
        />

        {/* Section 2: من نحن (About) */}
        <AboutSection />

        {/* Section 3: المنيو التفاعلي مع أشهر الأطباق ومحرر الأصناف */}
        <MenuSection
          items={items}
          onSelectItem={setSelectedItem}
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
          onOpenMenuManager={() => setMenuManagerOpen(true)}
          onTogglePopular={handleTogglePopular}
        />

        {/* Sections 4, 5, 6, 7, 8: الأقسام المتخصصة للمأكولات والمشروبات */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryHighlights
            items={items}
            onSelectItem={setSelectedItem}
            onAddToCart={handleAddToCart}
            cartItemIds={cartItemIds}
          />
        </div>

        {/* Section 9: الفروع (Branches: Nasr City + Madinaty) */}
        <BranchesSection />

        {/* Section 10: التواصل والطلب (Contact & Order) */}
        <ContactSection
          onOpenPhoneModal={() => setPhoneModalOpen(true)}
          onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
          onOpenChecklist={() => setChecklistModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenChecklist={() => setChecklistModalOpen(true)} />

      {/* Floating Bottom Quick Action Bar for Easy Mobile/Tablet Access */}
      <aside aria-label="شريط الوصول السريع" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 flex items-center justify-between sm:justify-end gap-2 bg-[#121622]/95 backdrop-blur-md p-2 rounded-2xl border border-stone-800 shadow-2xl">
        {/* Menu Manager Trigger */}
        <button
          onClick={() => setMenuManagerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1b2230] hover:bg-[#232c3e] text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shadow-md"
          title="لوحة إدارة وتعديل المنيو"
          aria-label="تعديل المنيو وإضافة أطباق"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>تعديل المنيو</span>
        </button>

        {/* Checklist Trigger */}
        <button
          onClick={() => setChecklistModalOpen(true)}
          className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          title="قائمة موافقات المطعم المطلوبة"
          aria-label="قائمة موافقات المطعم المطلوبة"
        >
          <CheckSquare className="w-4 h-4 text-amber-400" />
        </button>

        {/* Google Maps Shortcut */}
        <a
          href={RESTAURANT_META.links.googleMapsNasrCity}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
          title="موقع فرع مدينة نصر على الخريطة"
          aria-label="موقع فرع مدينة نصر على الخريطة"
        >
          <MapPin className="w-4 h-4 text-amber-400" />
        </a>

        {/* Talabat Direct */}
        <a
          href={RESTAURANT_META.links.talabatMenu}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-md"
        >
          <span>منيو طلبات</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold transition-all cursor-pointer shadow-md shadow-amber-500/20"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>حاسبة الطلب</span>
          {totalCartCount > 0 && (
            <span className="bg-black text-amber-400 text-[10px] font-mono px-1.5 py-0.5 rounded-full">
              {totalCartCount}
            </span>
          )}
        </button>
      </aside>

      {/* Interactive Modals */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
        isInCart={selectedItem ? cartItemIds.includes(selectedItem.id) : false}
      />

      <PhoneVerificationModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        hotlineNumber={hotline}
      />

      <WhatsAppNoticeModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
      />

      <ApprovalChecklistModal
        isOpen={checklistModalOpen}
        onClose={() => setChecklistModalOpen(false)}
      />

      <OrderSimulatorDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Comprehensive Menu Management Modal */}
      <MenuManagerModal
        isOpen={menuManagerOpen}
        onClose={() => setMenuManagerOpen(false)}
        items={items}
        onSaveItems={handleSaveItems}
        onResetItems={handleResetItems}
        hotline={hotline}
        onUpdateHotline={handleUpdateHotline}
      />

    </div>
  );
}
