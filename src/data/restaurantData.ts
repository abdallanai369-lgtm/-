/**
 * Amwaj Restaurant - Data Store & Central Configuration
 * مطعم أمواج للمشويات — مركز البيانات والروابط الرسمية والصور الاحترافية
 */

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'grills' | 'shawarma' | 'burger_fried' | 'seafood' | 'appetizers_drinks';
  price: number; // in EGP
  originalPrice?: number;
  description: string;
  image: string;
  popular?: boolean;
  featured?: boolean;
  badge?: string;
  serving: string;
  prepTime?: string;
  ingredients: string[];
}

export interface Branch {
  id: string;
  name: string;
  status: 'published' | 'pending_confirmation';
  statusLabel: string;
  address: string;
  area: string;
  city: string;
  mapsUrl: string | null;
  phone: string | null;
  workingHours: string;
  notes: string;
  coordinates?: { lat: number; lng: number };
}

export interface RestaurantMeta {
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  aboutStory: string;
  cuisineTypes: string[];
  links: {
    googleMapsNasrCity: string;
    talabatMenu: string;
    linktree: string;
  };
  contact: {
    hotline: {
      number: string;
      status: 'unconfirmed_pending_approval';
      label: string;
      disclaimer: string;
    };
    whatsapp: {
      status: 'pending_confirmation';
      label: string;
      disclaimer: string;
    };
  };
  approvalChecklist: Array<{
    id: string;
    title: string;
    status: 'pending' | 'verified';
    description: string;
    source: string;
  }>;
}

export const RESTAURANT_META: RestaurantMeta = {
  nameAr: 'أمواج للمشويات',
  nameEn: 'Amwaj Restaurant & Grills',
  taglineAr: 'نكهة المشويات الأصيلة على الفحم، الشاورما والبروستد والمأكولات البحرية',
  taglineEn: 'Authentic Charcoal Grills, Shawarma, Broasted Chicken & Fresh Seafood',
  aboutStory: `مطعم أمواج للمشويات يقدم تجربة طعام شرقية غنية تجمع بين عراقة تتبيلات المشويات على الفحم، وجودة اللحوم الطازجة، ونكهات الشاورما الأصيلة، إلى جانب أطباق الدجاج المقلي المقرمش والمأكولات البحرية المحضرة بعناية. فرعنا الرئيسي في قلب شارع عباس العقاد بمدينة نصر يخدم عشاق المشويات وطلبات التوصيل بأعلى معايير الطهي.`,
  cuisineTypes: [
    'مشويات على الفحم',
    'كباب وكفتة حاتي',
    'شاورما عربي وصاج',
    'بروستد ودجاج مقلي',
    'مأكولات بحرية وطواجن',
    'مقبلات وسلطات شرقية'
  ],
  links: {
    googleMapsNasrCity: 'https://maps.app.goo.gl/8SZCVVZ5VpSNBhHW6',
    talabatMenu: 'https://www.talabat.com/egypt/restaurant/739988/amwaj-nasr-city--abbas-el-akkad',
    linktree: 'https://linktr.ee/amwajcairo',
  },
  contact: {
    hotline: {
      number: '15036',
      status: 'unconfirmed_pending_approval',
      label: 'الخط الساخن (منشور في دليل المنيو)',
      disclaimer: 'الرقم 15036 منشور في دليل المنيو المتاح، ولكنه يحتاج إلى تأكيد وموافقة إدارة المطعم قبل اعتماده رسمياً للاتصال التلقائي.',
    },
    whatsapp: {
      status: 'pending_confirmation',
      label: 'واتساب خدمة التوصيل',
      disclaimer: 'زر واتساب غير مفعّل حالياً حتى يتم تزويدنا بالرقم الرسمي المعتمد من قبل المطعم.',
    },
  },
  approvalChecklist: [
    {
      id: 'hotline',
      title: 'اعتماد الخط الساخن (15036)',
      status: 'pending',
      description: 'الرقم منشور في دليل المنيو المتاح ويجب اعتباره غير مؤكد حتى توافق الإدارة على استخدامه.',
      source: 'دليل منيو المطاعم المنشور',
    },
    {
      id: 'whatsapp',
      title: 'توفير رقم واتساب الرسمي',
      status: 'pending',
      description: 'زر واتساب معطل ولم يتم افتراض أي رقم لتجنب توجيه العملاء إلى جهات غير مؤكدة.',
      source: 'بانتظار تزويدنا به',
    },
    {
      id: 'prices',
      title: 'اعتماد أسعار الأصناف والمنيو',
      status: 'pending',
      description: 'الأسعار الحالية أولية ومأخوذة من قائمة طلبات المتاحة للمعاينة وتتطلب المراجعة مع التكلفة الحالية.',
      source: 'قائمة طلبات (Talabat Egypt)',
    },
    {
      id: 'hours',
      title: 'مواعيد العمل الرسمية لكل فرع',
      status: 'pending',
      description: 'لم يتم افتراض مواعيد عمل تجنباً للتضليل، بانتظار ساعات الخدمة وصالات الاستقبال.',
      source: 'بانتظار تأكيد الإدارة',
    },
    {
      id: 'madinaty',
      title: 'تفاصيل وموقع فرع مدينتي',
      status: 'pending',
      description: 'فرع مقترح للمطعم يتطلب تأكيد عنوانه، خريطته، وموعد الافتتاح الرسمي.',
      source: 'قيد التأكيد والمراجعة',
    },
    {
      id: 'media',
      title: 'اللوجو الأصلي وصور المطبخ الحصرية',
      status: 'pending',
      description: 'استخدام صور طعام توضيحية احترافية مرخصة مع تنبيه بعدم نسبها كصور مطبخ خاصة للمطعم بدون إذن.',
      source: 'صور مرخصة استرشادية',
    },
  ],
};

export const BRANCHES_DATA: Branch[] = [
  {
    id: 'nasr-city',
    name: 'فرع مدينة نصر (الرئيسي)',
    status: 'published',
    statusLabel: 'عنوان منشور ومؤكد',
    address: '57 شارع عباس العقاد، المنطقة الأولى، مدينة نصر، القاهرة',
    area: 'المنطقة الأولى - شارع عباس العقاد',
    city: 'القاهرة',
    mapsUrl: 'https://maps.app.goo.gl/8SZCVVZ5VpSNBhHW6',
    phone: '15036 (بانتظار التأكيد الرسمي)',
    workingHours: 'متاح للطلب والتوصيل — تتطلب المواعيد الرسمية تأكيد الإدارة',
    notes: 'الفرع المنشور في دليل طلبات وخرائط جوجل. موقع حيوي في قلب عباس العقاد.',
    coordinates: { lat: 30.0594, lng: 31.3392 },
  },
  {
    id: 'madinaty',
    name: 'فرع مدينتي',
    status: 'pending_confirmation',
    statusLabel: 'قيد التأكيد من الإدارة',
    address: 'مدينتي، القاهرة الجديدة (جاري التحقق من العنوان الدقيق ونقطة التوصيل)',
    area: 'القاهرة الجديدة',
    city: 'القاهرة',
    mapsUrl: null,
    phone: null,
    workingHours: 'غير معتمد بعد حتى موافقة الإدارة',
    notes: 'فرع يحتاج إلى تأكيد تفاصيله وعنوانه التفصيلي ومواعيده قبل النشر الرسمي.',
  },
];

export const CATEGORIES = [
  { id: 'all', nameAr: 'كل الأصناف', icon: 'Sparkles' },
  { id: 'popular', nameAr: 'الأشهر والأكثر طلباً ⭐', icon: 'Star' },
  { id: 'grills', nameAr: 'المشويات والكباب والكفتة', icon: 'Flame' },
  { id: 'shawarma', nameAr: 'الشاورما والسندوتشات', icon: 'Layers' },
  { id: 'burger_fried', nameAr: 'البرجر والدجاج المقلي', icon: 'Drumstick' },
  { id: 'seafood', nameAr: 'الأسماك والمأكولات البحرية', icon: 'Fish' },
  { id: 'appetizers_drinks', nameAr: 'المقبلات والسلطات والمشروبات', icon: 'Soup' },
] as const;

/**
 * مكتبة صور احترافية عالية الدقة للمأكولات الشرقية والمشويات
 * يمكن للمستخدم الاختيار منها بنقرة واحدة داخل محرر المنيو
 */
export const PROFESSIONAL_IMAGE_PRESETS = [
  {
    id: 'p-mix-grill',
    label: 'مشكل مشويات فاخر على الفحم',
    category: 'grills',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-shish-tawook',
    label: 'شيش طاووق مدخن ومتبل',
    category: 'grills',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-grilled-chicken',
    label: 'دجاج كامل مشوي على الفحم',
    category: 'grills',
    url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-kofta-hati',
    label: 'كفتة حاتي سيخ مشوية',
    category: 'grills',
    url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-lamb-chops',
    label: 'ريش ضاني مشوية بالعصارة',
    category: 'grills',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-shawarma-meat',
    label: 'وجبة شاورما لحم عربي صاج',
    category: 'shawarma',
    url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-shawarma-chicken',
    label: 'شاورما دجاج صاج مقرمشة',
    category: 'shawarma',
    url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-shawarma-wrap',
    label: 'رول شاورما كايزر وصاج',
    category: 'shawarma',
    url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-broasted-chicken',
    label: 'وجبة بروستد 4 قطع ذهبية مقرمشة',
    category: 'burger_fried',
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-gourmet-burger',
    label: 'برجر لحم مشوي على اللهب بالجبن',
    category: 'burger_fried',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-zinger-burger',
    label: 'برجر زنجر دجاج كرانشي حار',
    category: 'burger_fried',
    url: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-grilled-shrimp',
    label: 'جمبري جامبو مشوي على الفحم',
    category: 'seafood',
    url: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-seafood-casserole',
    label: 'طاجن سي فود إسكندراني بالكريمة',
    category: 'seafood',
    url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-fish-singari',
    label: 'سمك قاروص سنجاري بالفرن',
    category: 'seafood',
    url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-hummus',
    label: 'حمص بيروتي بزيت الزيتون',
    category: 'appetizers_drinks',
    url: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-salad',
    label: 'سلطة خضراء بلدي طازجة',
    category: 'appetizers_drinks',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-fries',
    label: 'بطاطس مقلية ذهبية متبلة',
    category: 'appetizers_drinks',
    url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-juice-orange',
    label: 'عصير برتقال فريش طبيعي',
    category: 'appetizers_drinks',
    url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'p-mojito',
    label: 'موهيتو ليمون ونعناع مثلج',
    category: 'appetizers_drinks',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
  },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // 1. المشويات والكباب والكفتة
  {
    id: 'item-amwaj-mix',
    name: 'مشكل أمواج الفاخر',
    nameEn: 'Amwaj Mixed Grill Platter',
    category: 'grills',
    price: 345,
    originalPrice: 380,
    description: 'تشكيلة مشويات أمواج المميزة: كباب لحم بتلو، كفتة مشوية على الفحم، شيش طاووق متبل، وريش ضاني تقدم مع أرز بسمتي بالمكسرات، خضار مشوية وخبز الصاج.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: true,
    badge: 'الأكثر طلبًا ⭐',
    serving: 'يكفي 1-2 أفراد (نصف كيلو تقريبي)',
    prepTime: '25-30 دقيقة',
    ingredients: ['كباب لحم بلدي', 'كفتة حاتي', 'شيش طاووق', 'ريشة ضاني', 'أرز مبهر', 'خبز وسلطات'],
  },
  {
    id: 'item-shish-tawook',
    name: 'شيش طاووق على الفحم',
    nameEn: 'Charcoal Shish Tawook Plate',
    category: 'grills',
    price: 220,
    description: 'قطع صدور وأوراك الدجاج الطازجة متبلة بالزبادي والليمون والأعشاب الشرقية، مشوية ببطء على الفحم وتقدم مع صوص الثومية وأرز أصفر وخضار سوتيه.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: true,
    badge: 'تتبيلة خاصة',
    serving: 'طبق رئيسي مع الأرز والصلصة',
    prepTime: '20 دقيقة',
    ingredients: ['دجاج طازج متبل', 'خضار مشوية (فلفل، بصل، طماطم)', 'أرز بسمتي', 'ثومية كريمية'],
  },
  {
    id: 'item-grilled-chicken',
    name: 'فراخ مشوية على الفحم بالتتبيلة الخاصة',
    nameEn: 'Charcoal Grilled Whole/Half Chicken',
    category: 'grills',
    price: 240,
    originalPrice: 260,
    description: 'دجاجة طازجة متبلة بخلطة أمواج الخاصة ومشوية على نار الفحم الهادئة حتى النضج والقرمشة الذهبية، تقدم مع البطاطس والسلطات والخبز البلدي.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: true,
    badge: 'طعم الفحم الأصيل ⭐',
    serving: 'دجاجة كاملة أو نصف مع الإضافات',
    prepTime: '25 دقيقة',
    ingredients: ['دجاج طازج محلي', 'تتبيلة بهارات مشوية', 'بطاطس محمرة', 'سلطة خضراء وطحينة'],
  },
  {
    id: 'item-kofta-hati',
    name: 'كفتة حاتي مشوية على الفحم',
    nameEn: 'Traditional Charcoal Kofta Plate',
    category: 'grills',
    price: 250,
    description: 'كفتة لحم بلدي مفروم ومتبل بالبصل والبقدونس وتوابل الحاتي الشرقية، مشوية باحتراف على السيخ مع الخبز الطازج وسلطة الطحينة.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: false,
    badge: 'لحم بلدي صافي',
    serving: 'نصف كيلو / طبق وجبة',
    prepTime: '20 دقيقة',
    ingredients: ['لحم مفروم بلدي', 'توابل شرقية', 'بقدونس وبصل', 'طحينة وخبز'],
  },
  {
    id: 'item-lamb-chops',
    name: 'ريش ضاني مشوية على الفحم',
    nameEn: 'Charcoal Grilled Lamb Chops',
    category: 'grills',
    price: 395,
    description: 'ريش لحم ضاني بلدي طرية منتقاة بعناية، متبلة بماء البصل وإكليل الجبل والبهارات، مشوية على الجمر مع الخضار المشوية.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'طبق فاخر (قطع ريش مختارة)',
    prepTime: '25 دقيقة',
    ingredients: ['ريش ضاني بلدي', 'تتبيلة إكليل الجبل وبهارات', 'خضروات مشوية', 'خبز الصاج'],
  },

  // 2. الشاورما والسندوتشات
  {
    id: 'item-shawarma-box-meat',
    name: 'وجبة شاورما عربي لحم',
    nameEn: 'Arabic Meat Shawarma Box',
    category: 'shawarma',
    price: 185,
    description: 'شاورما لحم بلدي بتتبيلة الخل والبهارات السبعة داخل خبز الصاج المقرمش، مقطعة ومقدمة مع البطاطس المتبلة وسلطة البيواز ودبس الرمان والطحينة.',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: true,
    badge: 'الأكثر مبيعاً ⭐',
    serving: 'وجبة مقطعة مع البطاطس والمخللات',
    prepTime: '15 دقيقة',
    ingredients: ['شرائح لحم متبل', 'خبز صاج', 'دبس رمان وبقدونس', 'طحينة وبطاطس'],
  },
  {
    id: 'item-shawarma-box-chicken',
    name: 'وجبة شاورما عربي دجاج',
    nameEn: 'Arabic Chicken Shawarma Box',
    category: 'shawarma',
    price: 165,
    description: 'شاورما دجاج طازجة مشوية على السيخ العمودي ومحمصة على الجريل في خبز الصاج، تقدم مع بطاطس مقلية ذهبية وثومية ومخلل خيار.',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: false,
    badge: 'طعم عربي أصيل',
    serving: 'وجبة كاملة مع الثومية والبطاطس',
    prepTime: '15 دقيقة',
    ingredients: ['دجاج شاورما متبل', 'ثومية أمواج', 'مخلل خيار لفت', 'بطاطس مقرمشة'],
  },
  {
    id: 'item-shawarma-sandwiches',
    name: 'ساندوتشات شاورما صاج وكايزر (ميكس)',
    nameEn: 'Shawarma Sandwiches (Beef & Chicken)',
    category: 'shawarma',
    price: 95,
    description: 'ساندوتش شاورما فردي محشو بكمية غنية من اللحم أو الدجاج مع صلصة الطحينة أو الثومية حسب اختيارك.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'ساندوتش كبير',
    prepTime: '10 دقائق',
    ingredients: ['لحم / دجاج شاورما', 'طحينة / ثومية', 'خضروات ومخلل'],
  },

  // 3. البرجر والدجاج المقلي
  {
    id: 'item-broasted-4pcs',
    name: 'وجبة بروستد 4 قطع مقرمشة',
    nameEn: 'Crispy Broasted Chicken 4 Pcs Meal',
    category: 'burger_fried',
    price: 215,
    originalPrice: 235,
    description: '4 قطع دجاج طازجة متبلة بالخلطة السرية ومقلية بتقنية البروستد الذهبية المقرمشة مع احتفاظها بالعصارة الداخلية. تقدم مع البطاطس المقلية، سلطة الكول سلو، صوص الثومية، وقطعة خبز.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: true,
    badge: 'الأشهر والأكثر مبيعاً ⭐',
    serving: 'وجبة فردية مشبعة (4 قطع)',
    prepTime: '20 دقيقة',
    ingredients: ['4 قطع دجاج بروستد', 'بطاطس مقرمشة', 'كول سلو كريمي', 'ثومية وخبز'],
  },
  {
    id: 'item-amwaj-special-burger',
    name: 'برجر أمواج سبيشال جورميه',
    nameEn: 'Amwaj Gourmet Flame-Grilled Burger',
    category: 'burger_fried',
    price: 175,
    description: 'شريحة برجر لحم بقري صافي مشوية على اللهب تعلوها جبنة الشيدر الذائبة، خس طازج، طماطم، بصل مكرمل وصوص أمواج المميز في خبز البريوش الطازج.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: true,
    badge: 'مشوي على اللهب ⭐',
    serving: 'ساندوتش مع البطاطس المقلية',
    prepTime: '15-20 دقيقة',
    ingredients: ['لحم بقري 180 جم', 'شيدر صفراء', 'بصل مكرمل', 'خبز بريوش', 'صوص أمواج الخاص'],
  },
  {
    id: 'item-zinger-burger',
    name: 'برجر زنجر سوبر كرانشي',
    nameEn: 'Super Crunchy Zinger Chicken Burger',
    category: 'burger_fried',
    price: 155,
    description: 'قطعة فيليه دجاج مقرمشة حارة أو عادية مع جبنة الشيدر وصوص المايونيز المدخن والخس في خبز السمسم الطازج مع البطاطس.',
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'ساندوتش مع بطاطس',
    prepTime: '15 دقيقة',
    ingredients: ['صدور دجاج كريسبي', 'جبنة شيدر', 'خس وصوص مدخن', 'بطاطس'],
  },

  // 4. الأسماك والمأكولات البحرية
  {
    id: 'item-grilled-shrimp',
    name: 'جمبري مشوي جامبو على الفحم',
    nameEn: 'Charcoal Grilled Jumbo Shrimp',
    category: 'seafood',
    price: 360,
    originalPrice: 390,
    description: 'حبات جمبري جامبو طازجة مشوية بقشرها على الفحم بتتبيلة الثوم والليمون والكمون وزيت الزيتون البكر، تقدم مع الأرز الصيادية وسلطة الطحينة.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: true,
    badge: 'طازج ومميز ⭐',
    serving: 'طبق رئيسي مع أرز صيادية وسلطات',
    prepTime: '20-25 دقيقة',
    ingredients: ['جمبري جامبو طازج', 'تتبيلة ليمون وثوم وكمون', 'أرز صيادية مصري', 'طحينة'],
  },
  {
    id: 'item-seafood-casserole',
    name: 'طاجن سي فود إسكندراني بالكريمة أو الصلصة',
    nameEn: 'Alexandrian Creamy Seafood Casserole',
    category: 'seafood',
    price: 295,
    description: 'تشكيلة بحرية غنية من الجمبري والكاليماري وفيليه السمك مع الخضار الطازج في صلصة كريمة غنية أو صلصة حمراء حارة في الفرن.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    popular: true,
    featured: false,
    badge: 'طاجن فخاري فاخر',
    serving: 'طاجن فخاري ساخن',
    prepTime: '25 دقيقة',
    ingredients: ['جمبري', 'كاليماري طازج', 'سمك فيليه', 'كريمة طهي أو صوص أحمر', 'موتزاريلا'],
  },
  {
    id: 'item-fish-singari',
    name: 'سمك قاروص سنجاري بالخلطة',
    nameEn: 'Singari Sea Bass with Herbs & Spices',
    category: 'seafood',
    price: 310,
    description: 'سمكة قاروص طازجة مفتوحة سنجاري ومغطاة بخلطة الطماطم والفلفل الألوان والثوم والليمون والكزبرة، مشوية في الفرن حتى الاحمرار الذهبي.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'سمكة كاملة بالخلطة مع الأرز والخبز',
    prepTime: '30 دقيقة',
    ingredients: ['سمك قاروص بلدي', 'خلطة خضار وبهارات إسكندرانية', 'ليمون وزيت زيتون'],
  },

  // 5. المقبلات والسلطات والمشروبات
  {
    id: 'item-hummus-beiruti',
    name: 'حمص بيروتي بزيت الزيتون',
    nameEn: 'Hummus with Virgin Olive Oil',
    category: 'appetizers_drinks',
    price: 55,
    description: 'حمص حب مسلوق ومهروس ناعماً مع الطحينة النقية وعصير الليمون، مزين بحبات الحمص والبابريكا وزيت الزيتون البكر.',
    image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'طبق مقبلات مع الخبز الطازج',
    prepTime: '5 دقائق',
    ingredients: ['حمص حب', 'طحينة سمسم', 'ليمون وزيت زيتون', 'بابريكا'],
  },
  {
    id: 'item-amwaj-green-salad',
    name: 'سلطة أمواج الخضراء البلدي',
    nameEn: 'Fresh Garden Salad',
    category: 'appetizers_drinks',
    price: 40,
    description: 'طماطم، خيار، خس، جرجير، بقدونس، وبصل أحمر متبلة بالخل والليمون والكمون وزيت الزيتون.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'طبق سلطة فردي أو للمشاركة',
    prepTime: '5 دقائق',
    ingredients: ['خضار ورقي طازج', 'طماطم وخيار', 'تتبيلة ليمون وكمون'],
  },
  {
    id: 'item-crispy-fries-seasoned',
    name: 'بطاطس مقلية ببهارات أمواج الخاصة',
    nameEn: 'Seasoned Crispy French Fries',
    category: 'appetizers_drinks',
    price: 45,
    description: 'أصابع بطاطس ذهبية ومقرمشة متبلة بمزيج توابل أمواج المميز، تقدم مع صوص الكاتشب أو المايونيز.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'طبق جانبي مقرمش',
    prepTime: '8 دقائق',
    ingredients: ['بطاطس منتقاة', 'بهارات أمواج الخاصة', 'صوصات جانبية'],
  },
  {
    id: 'item-fresh-orange-juice',
    name: 'عصير برتقال طبيعي فريش',
    nameEn: 'Freshly Squeezed Orange Juice',
    category: 'appetizers_drinks',
    price: 50,
    description: 'عصير برتقال طبيعي 100% معصور طازج بدون أي إضافات صناعية أو سكر مضاف.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'كوب بارد مثلج 350 مل',
    prepTime: '5 دقائق',
    ingredients: ['برتقال طازج معصور'],
  },
  {
    id: 'item-mojito-lemon-mint',
    name: 'موهيتو ليمون ونعناع منعش',
    nameEn: 'Refreshing Lemon Mint Mojito',
    category: 'appetizers_drinks',
    price: 55,
    description: 'مزيج منعش من الليمون الطازج وأوراق النعناع الخضراء مع الصودا الفوارة والثلج المجروش.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
    popular: false,
    featured: false,
    serving: 'كوب منعش مع مكعبات الثلج',
    prepTime: '5 دقائق',
    ingredients: ['ليمون طازج', 'أوراق نعناع', 'صودا وثلج'],
  },
];
