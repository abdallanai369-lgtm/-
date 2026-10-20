import React, { useState } from 'react';
import { 
  X, Plus, Edit3, Trash2, Star, Image as ImageIcon, 
  RotateCcw, Save, Search, Check, AlertCircle, Sparkles, 
  Flame, Upload, Download, Copy 
} from 'lucide-react';
import { MenuItem, CATEGORIES, PROFESSIONAL_IMAGE_PRESETS } from '../data/restaurantData';

interface MenuManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onSaveItems: (newItems: MenuItem[]) => void;
  onResetItems: () => void;
  hotline: string;
  onUpdateHotline: (newNumber: string) => void;
}

export const MenuManagerModal: React.FC<MenuManagerModalProps> = ({
  isOpen,
  onClose,
  items,
  onSaveItems,
  onResetItems,
  hotline,
  onUpdateHotline,
}) => {
  const [activeTab, setActiveTab] = useState<'items' | 'add' | 'presets' | 'settings'>('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [localHotline, setLocalHotline] = useState(hotline);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New item form state
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    nameEn: '',
    category: 'grills',
    price: 150,
    originalPrice: undefined,
    description: '',
    image: PROFESSIONAL_IMAGE_PRESETS[0].url,
    popular: false,
    badge: '',
    serving: 'وجبة لشخص واحد',
    prepTime: '20 دقيقة',
    ingredients: ['تتبيلة خاصة'],
  });

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  // Filter items in management list
  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // Actions
  const handleTogglePopular = (id: string) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, popular: !i.popular, badge: !i.popular ? 'الأكثر طلباً ⭐' : undefined } : i
    );
    onSaveItems(updated);
    showToast('تم تحديث حالة "الأشهر والأكثر طلباً" للصنف');
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من رغبتك في حذف الصنف "${name}" من المنيو؟`)) {
      const updated = items.filter((i) => i.id !== id);
      onSaveItems(updated);
      showToast(`تم حذف الصنف "${name}"`);
    }
  };

  const handleSaveEditedItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = items.map((i) => (i.id === editingItem.id ? editingItem : i));
    onSaveItems(updated);
    setEditingItem(null);
    showToast(`تم حفظ تعديلات الصنف "${editingItem.name}" بنجاح!`);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) {
      alert('يرجى إدخال اسم الصنف والسعر على الأقل');
      return;
    }

    const created: MenuItem = {
      id: `item-custom-${Date.now()}`,
      name: newItem.name || 'صنف جديد',
      nameEn: newItem.nameEn || 'New Dish',
      category: (newItem.category as any) || 'grills',
      price: Number(newItem.price) || 100,
      originalPrice: newItem.originalPrice ? Number(newItem.originalPrice) : undefined,
      description: newItem.description || 'وصف الصنف الجديد المحضر بتتبيلة أمواج الخاصة.',
      image: newItem.image || PROFESSIONAL_IMAGE_PRESETS[0].url,
      popular: !!newItem.popular,
      badge: newItem.badge || (newItem.popular ? 'الأشهر ⭐' : undefined),
      serving: newItem.serving || 'وجبة فردية',
      prepTime: newItem.prepTime || '15-20 دقيقة',
      ingredients: Array.isArray(newItem.ingredients) 
        ? newItem.ingredients 
        : typeof newItem.ingredients === 'string' 
          ? (newItem.ingredients as string).split(',').map((s) => s.trim()) 
          : ['مكونات طازجة'],
    };

    const updated = [created, ...items];
    onSaveItems(updated);
    setActiveTab('items');
    setNewItem({
      name: '',
      nameEn: '',
      category: 'grills',
      price: 150,
      description: '',
      image: PROFESSIONAL_IMAGE_PRESETS[0].url,
      popular: false,
      badge: '',
      serving: 'وجبة لشخص واحد',
      prepTime: '20 دقيقة',
      ingredients: ['تتبيلة خاصة'],
    });
    showToast(`تمت إضافة "${created.name}" إلى قائمة طعام أمواج بنجاح!`);
  };

  const handleSaveHotline = () => {
    onUpdateHotline(localHotline);
    showToast('تم تحديث رقم الخط الساخن بنجاح!');
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'amwaj_menu_backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم تنزيل نسخة المنيو كملف JSON بنجاح');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#10141d] border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Toast feedback */}
        {successToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-stone-950 font-bold text-xs px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Modal Top Header */}
        <div className="p-5 border-b border-stone-800 bg-[#0c0f17] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">لوحة إدارة وتعديل المنيو والأصناف</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                  {items.length} صنف متاح
                </span>
              </div>
              <p className="text-xs text-stone-400">
                عدّل الأسعار، أضف وجبات جديدة، اختر صوراً فائقة الجودة، وحدد الأصناف الأكثر طلباً فوراً.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-stone-800 bg-[#0e121a] flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => { setActiveTab('items'); setEditingItem(null); }}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'items' && !editingItem
                ? 'bg-[#151a26] text-amber-400 border-amber-500'
                : 'text-stone-400 hover:text-white border-transparent'
            }`}
          >
            <span>إدارة الأصناف الحالية ({items.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('add'); setEditingItem(null); }}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'add'
                ? 'bg-[#151a26] text-amber-400 border-amber-500'
                : 'text-stone-400 hover:text-white border-transparent'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة صنف / وجبة جديدة</span>
          </button>

          <button
            onClick={() => { setActiveTab('presets'); setEditingItem(null); }}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'presets'
                ? 'bg-[#151a26] text-amber-400 border-amber-500'
                : 'text-stone-400 hover:text-white border-transparent'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>مكتبة الصور الاحترافية (4K)</span>
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setEditingItem(null); }}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'settings'
                ? 'bg-[#151a26] text-amber-400 border-amber-500'
                : 'text-stone-400 hover:text-white border-transparent'
            }`}
          >
            <span>الإعدادات والبيانات الأساسية</span>
          </button>
        </div>

        {/* Tab 1: Edit Specific Item (Active when an item is selected for editing) */}
        {editingItem ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#121622]">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">
                  تعديل الصنف: <span className="text-amber-400">{editingItem.name}</span>
                </h4>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
              >
                إلغاء والعودة للقائمة
              </button>
            </div>

            <form onSubmit={handleSaveEditedItem} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">اسم الوجبة (عربي):</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">الاسم بالإنجليزية:</label>
                  <input
                    type="text"
                    value={editingItem.nameEn}
                    onChange={(e) => setEditingItem({ ...editingItem, nameEn: e.target.value })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">القسم:</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="grills">المشويات والكباب والكفتة</option>
                    <option value="shawarma">الشاورما والسندوتشات</option>
                    <option value="burger_fried">البرجر والدجاج المقلي (البروستد)</option>
                    <option value="seafood">الأسماك والمأكولات البحرية</option>
                    <option value="appetizers_drinks">المقبلات والسلطات والمشروبات</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">السعر (ج.م):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-amber-400 font-bold text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">السعر السابق (شطب اختياري):</label>
                  <input
                    type="number"
                    value={editingItem.originalPrice || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="مثال: 250"
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-stone-400 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">الوصف الشهي للطبق:</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl p-3 text-white text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Image URL with Preview */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">رابط صورة الوجبة (عالية الدقة):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="flex-1 bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-stone-200 text-xs font-mono focus:border-amber-500 focus:outline-none"
                  />
                  <img
                    src={editingItem.image}
                    alt="معاينة"
                    className="w-10 h-10 rounded-lg object-cover border border-amber-500/40"
                  />
                </div>

                {/* Quick Presets Picker inside item edit */}
                <div className="pt-2">
                  <span className="text-[11px] text-stone-400 block mb-1">أو اختر صورة احترافية جاهزة بضغطة واحدة:</span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {PROFESSIONAL_IMAGE_PRESETS.slice(0, 8).map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, image: preset.url })}
                        className="p-1 rounded-lg border border-stone-700 hover:border-amber-500 shrink-0 bg-stone-900"
                        title={preset.label}
                      >
                        <img src={preset.url} alt={preset.label} className="w-10 h-10 rounded object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">حجم التقديم:</label>
                  <input
                    type="text"
                    value={editingItem.serving}
                    onChange={(e) => setEditingItem({ ...editingItem, serving: e.target.value })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-xs"
                    placeholder="مثال: يكفي 1-2 فرد مع الأرز"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">شارة مميزة (Badge):</label>
                  <input
                    type="text"
                    value={editingItem.badge || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-xs"
                    placeholder="مثال: الأكثر طلباً ⭐ أو تتبيلة خاصة"
                  />
                </div>
              </div>

              {/* Popular Checkbox */}
              <div className="flex items-center gap-2 p-3 bg-[#0a0d14] rounded-xl border border-stone-800">
                <input
                  type="checkbox"
                  id="edit-popular-check"
                  checked={!!editingItem.popular}
                  onChange={(e) => setEditingItem({ ...editingItem, popular: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <label htmlFor="edit-popular-check" className="text-xs text-stone-200 font-semibold cursor-pointer flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>تثبيت هذا الصنف ضمن قائمة "الأشهر والأكثر طلباً" في أمواج</span>
                </label>
              </div>

              {/* Save & Cancel */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl text-stone-400 hover:text-white text-xs cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات على الصنف</span>
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* Tab 1: Current Items List */}
        {activeTab === 'items' && !editingItem && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#151a26] p-3 rounded-2xl border border-stone-800">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث سريع في الأصناف..."
                  className="w-full bg-[#0d1017] border border-stone-700 rounded-xl pr-9 pl-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Category tabs */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === c.id
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-800/80 text-stone-300 hover:text-white'
                    }`}
                  >
                    {c.nameAr}
                  </button>
                ))}
              </div>
            </div>

            {/* Items Table/Cards */}
            <div className="space-y-2.5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#141924] border border-stone-800 hover:border-amber-500/40 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-700"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm">{item.name}</span>
                        {item.popular && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.2 rounded-full font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400" />
                            الأشهر
                          </span>
                        )}
                        {item.badge && (
                          <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.2 rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 truncate max-w-md mt-0.5">
                        {item.description}
                      </p>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {item.serving} • {item.prepTime || 'جاهز سريعاً'}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800/60">
                    {/* Price inline editor */}
                    <div className="text-left">
                      <span className="text-[10px] text-stone-400 block">السعر:</span>
                      <span className="text-base font-extrabold text-amber-400">
                        {item.price} <span className="text-xs font-normal">ج.م</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Toggle popular button */}
                      <button
                        onClick={() => handleTogglePopular(item.id)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          item.popular
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                            : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-amber-400'
                        }`}
                        title={item.popular ? 'إلغاء تمييز الأشهر' : 'تحديد كأحد أشهر الأطباق'}
                      >
                        <Star className={`w-4 h-4 ${item.popular ? 'fill-amber-400' : ''}`} />
                      </button>

                      {/* Edit button */}
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors cursor-pointer"
                        title="تعديل تفاصيل الصنف والصورة"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        className="p-2 rounded-xl bg-red-950/30 hover:bg-red-900/60 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                        title="حذف الصنف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 2: Add New Item */}
        {activeTab === 'add' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#121622]">
            <div className="border-b border-stone-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>إضافة وجبة أو طبق جديد إلى قائمة طعام أمواج</span>
              </h4>
              <p className="text-xs text-stone-400">
                أدخل بيانات الصنف، اختر صورته المناسبة، وسيظهر مباشرة في المنيو التفاعلي.
              </p>
            </div>

            <form onSubmit={handleAddNewItem} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">اسم الصنف (بالعربية):</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: رول شاورما أمواج جامبو"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">الاسم بالإنجليزية:</label>
                  <input
                    type="text"
                    placeholder="مثال: Jumbo Amwaj Shawarma Roll"
                    value={newItem.nameEn}
                    onChange={(e) => setNewItem({ ...newItem, nameEn: e.target.value })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">القسم الرئيسي:</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="grills">المشويات والكباب والكفتة</option>
                    <option value="shawarma">الشاورما والسندوتشات</option>
                    <option value="burger_fried">البرجر والدجاج المقلي (البروستد)</option>
                    <option value="seafood">الأسماك والمأكولات البحرية</option>
                    <option value="appetizers_drinks">المقبلات والسلطات والمشروبات</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">السعر المبدئي (ج.م):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-amber-400 font-bold text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">حجم التقديم:</label>
                  <input
                    type="text"
                    value={newItem.serving}
                    onChange={(e) => setNewItem({ ...newItem, serving: e.target.value })}
                    className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-white text-xs"
                    placeholder="وجبة فردية / عائلية"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">وصف الصنف والمذاق:</label>
                <textarea
                  rows={2}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="اكتب وصفاً جذاباً للمكونات والتتبيلة وطريقة الشواء..."
                  className="w-full bg-[#0a0d14] border border-stone-700 rounded-xl p-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Photo Picker */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">اختيار صورة عالية الجودة للصنف:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="flex-1 bg-[#0a0d14] border border-stone-700 rounded-xl px-3 py-2 text-stone-200 text-xs font-mono"
                    placeholder="ضع رابط صورة مباشرة أو اختر من المقترحات بالأسفل"
                  />
                  <img
                    src={newItem.image}
                    alt="معاينة"
                    className="w-10 h-10 rounded-lg object-cover border border-amber-500/40 shrink-0"
                  />
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-stone-400 block mb-1.5">أو اختر صورة جاهزة من مكتبة صور أمواج:</span>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {PROFESSIONAL_IMAGE_PRESETS.slice(0, 12).map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setNewItem({ ...newItem, image: preset.url })}
                        className={`p-1 rounded-xl border text-center transition-all cursor-pointer ${
                          newItem.image === preset.url
                            ? 'border-amber-400 bg-amber-500/20 shadow-md'
                            : 'border-stone-800 bg-[#0c0f17] hover:border-stone-700'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-12 rounded-lg object-cover mb-1" />
                        <span className="text-[10px] text-stone-300 truncate block">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#0a0d14] rounded-xl border border-stone-800">
                <input
                  type="checkbox"
                  id="add-popular-check"
                  checked={!!newItem.popular}
                  onChange={(e) => setNewItem({ ...newItem, popular: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
                <label htmlFor="add-popular-check" className="text-xs text-stone-200 font-semibold cursor-pointer flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>تثبيت هذا الصنف ضمن قسم "الأشهر والأكثر مبيعاً" في المنيو</span>
                </label>
              </div>

              <div className="flex justify-end pt-3 border-t border-stone-800">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة الصنف للمنيو فوراً</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Curated 4K Food Photography Library */}
        {activeTab === 'presets' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#121622]">
            <div className="border-b border-stone-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>مكتبة الصور الاحترافية عالية الدقة لمطعم أمواج</span>
              </h4>
              <p className="text-xs text-stone-400">
                صور فوتوغرافية احترافية ملتقطة خصيصاً للمشويات على الفحم، الشاورما، البروستد، والبحريات لتناسب مظهر المطاعم الفاخرة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PROFESSIONAL_IMAGE_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-[#0e121a] border border-stone-800 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs font-bold text-white">{preset.label}</span>
                    </div>
                  </div>

                  <div className="p-3 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(preset.url);
                        showToast(`تم نسخ رابط الصورة: ${preset.label}`);
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ الرابط</span>
                    </button>

                    <button
                      onClick={() => {
                        setNewItem((prev) => ({ ...prev, image: preset.url }));
                        setActiveTab('add');
                        showToast(`تم اختيار صورة "${preset.label}" لإضافتها في صنف جديد`);
                      }}
                      className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1.5 rounded-lg font-medium cursor-pointer"
                    >
                      استخدام كصنف جديد
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Settings & Data Backup */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#121622]">
            <div className="border-b border-stone-800 pb-3">
              <h4 className="text-sm font-bold text-white">إعدادات الاتصال والنسخ الاحتياطي</h4>
              <p className="text-xs text-stone-400">
                إدارة أرقام الهواتف، حفظ البيانات واستعادة القائمة الافتراضية بنقرة واحدة.
              </p>
            </div>

            {/* Hotline Edit */}
            <div className="bg-[#171d2a] p-4 rounded-xl border border-stone-800 space-y-2">
              <label className="text-xs font-semibold text-stone-300 block">
                تعديل رقم الخط الساخن المركزي:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={localHotline}
                  onChange={(e) => setLocalHotline(e.target.value)}
                  className="bg-[#0e1117] border border-stone-700 rounded-lg px-3 py-2 text-sm text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500 flex-1"
                />
                <button
                  onClick={handleSaveHotline}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  حفظ الرقم
                </button>
              </div>
            </div>

            {/* Export & Reset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#171d2a] p-4 rounded-xl border border-stone-800 space-y-2">
                <h5 className="text-xs font-bold text-white">تصدير وحفظ نسخة احتياطية</h5>
                <p className="text-[11px] text-stone-400">
                  قم بتحميل ملف JSON يحتوي على كامل المنيو مع تعديلاتك وأسعارك.
                </p>
                <button
                  onClick={handleExportJson}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تنزيل ملف المنيو (JSON)</span>
                </button>
              </div>

              <div className="bg-[#171d2a] p-4 rounded-xl border border-stone-800 space-y-2">
                <h5 className="text-xs font-bold text-white">استعادة البيانات الاصلية</h5>
                <p className="text-[11px] text-stone-400">
                  إعادة ضبط جميع الأصناف والأسعار الافتراضية المأخوذة من قائمة طلبات.
                </p>
                <button
                  onClick={() => {
                    if (confirm('هل ترغب حقاً في استعادة المنيو الافتراضي الأولي؟ سيتم حذف أي أصناف أضفتها يدوياً.')) {
                      onResetItems();
                      showToast('تمت استعادة المنيو الافتراضي بنجاح');
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة المنيو الافتراضي</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#0c0f17] flex items-center justify-between shrink-0 text-xs">
          <div className="text-stone-400 text-[11px]">
            يتم حفظ جميع التعديلات محلياً وتطبيقها فوراً في الموقع التفاعلي.
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer shadow-md"
          >
            إغلاق ومعاينة الموقع
          </button>
        </div>

      </div>
    </div>
  );
};
