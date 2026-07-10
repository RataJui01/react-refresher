export const categories = [
  {
    id: "cat-1",
    slug: "electronics",
    name: "Electronics",
    tagline: "Tech for everyday life",
  },
  {
    id: "cat-2",
    slug: "fashion",
    name: "Fashion",
    tagline: "Style that speaks to you",
  },
  {
    id: "cat-3",
    slug: "home-living",
    name: "Home & Living",
    tagline: "Make your space a sanctuary",
  },
  {
    id: "cat-4",
    slug: "beauty",
    name: "Beauty",
    tagline: "Glow from within",
  },
];

export const products = [
  // Electronics
  {
    id: "p1",
    name: "Wireless Noise-Cancelling Headphones",
    brand: "Sony",
    categorySlug: "electronics",
    price: 2990,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p1a/600/600",
      "https://picsum.photos/seed/p1b/600/600",
      "https://picsum.photos/seed/p1c/600/600",
    ],
    description:
      "Premium wireless headphones with industry-leading noise cancellation. Up to 30 hours of battery life with quick charging. Foldable design for easy portability.",
    specifications: {
      "Driver Size": "40mm",
      Connectivity: "Bluetooth 5.2",
      "Battery Life": "30 hours",
      "Charging Time": "3 hours",
      Weight: "250g",
      Frequency: "4 Hz–40,000 Hz",
    },
    tags: ["headphones", "wireless", "noise cancelling", "audio"],
  },
  {
    id: "p2",
    name: "Galaxy Smart Watch Series 6",
    brand: "Samsung",
    categorySlug: "electronics",
    price: 7900,
    originalPrice: null,
    rating: 4.3,
    reviewCount: 95,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p2a/600/600",
      "https://picsum.photos/seed/p2b/600/600",
      "https://picsum.photos/seed/p2c/600/600",
    ],
    description:
      "Advanced health monitoring smartwatch with always-on display. Track your heart rate, sleep, and workouts. Water resistant up to 50m.",
    specifications: {
      Display: "1.4\" AMOLED",
      "Battery Life": "40 hours",
      "Water Resistance": "5ATM",
      "Health Sensors": "Heart rate, SpO2, ECG",
      Connectivity: "Bluetooth 5.0, Wi-Fi",
      Compatibility: "Android 8.0+",
    },
    tags: ["smartwatch", "fitness", "health", "wearable"],
  },
  {
    id: "p3",
    name: "Portable Bluetooth Speaker",
    brand: "JBL",
    categorySlug: "electronics",
    price: 1890,
    originalPrice: 2290,
    rating: 4.7,
    reviewCount: 234,
    inStock: false,
    images: [
      "https://picsum.photos/seed/p3a/600/600",
      "https://picsum.photos/seed/p3b/600/600",
    ],
    description:
      "Waterproof Bluetooth speaker with 360° surround sound. Built-in powerbank to charge your devices. 20 hours of playtime.",
    specifications: {
      "Output Power": "20W",
      "Battery Life": "20 hours",
      "Water Resistance": "IP67",
      Connectivity: "Bluetooth 5.1",
      Weight: "540g",
      "Charge Type": "USB-C",
    },
    tags: ["speaker", "bluetooth", "waterproof", "portable", "audio"],
  },
  {
    id: "p4",
    name: "7-in-1 USB-C Hub",
    brand: "Anker",
    categorySlug: "electronics",
    price: 890,
    originalPrice: null,
    rating: 4.1,
    reviewCount: 67,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p4a/600/600",
      "https://picsum.photos/seed/p4b/600/600",
    ],
    description:
      "Expand your laptop's connectivity with 7 ports including 4K HDMI, USB-A 3.0 (x3), SD card reader, and 100W power delivery.",
    specifications: {
      Ports: "7-in-1",
      "HDMI Output": "4K @ 30Hz",
      "USB-A Ports": "3 × USB 3.0",
      "Card Readers": "SD, microSD",
      "Power Delivery": "100W",
      Compatibility: "MacBook, Windows laptops",
    },
    tags: ["hub", "USB-C", "adapter", "laptop"],
  },

  // Fashion
  {
    id: "p5",
    name: "Premium Linen Overshirt",
    brand: "Uniqlo",
    categorySlug: "fashion",
    price: 790,
    originalPrice: 990,
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p5a/600/600",
      "https://picsum.photos/seed/p5b/600/600",
      "https://picsum.photos/seed/p5c/600/600",
    ],
    description:
      "Lightweight and breathable 100% linen overshirt. Perfect for layering or wearing on its own. Natural crinkle texture that only gets better with wear.",
    specifications: {
      Material: "100% Linen",
      Fit: "Regular",
      Care: "Machine wash cold",
      Origin: "Japan",
      Sizes: "XS – 3XL",
      "Collar Type": "Point collar",
    },
    tags: ["shirt", "linen", "casual", "menswear"],
  },
  {
    id: "p6",
    name: "Organic Canvas Tote Bag",
    brand: "Muji",
    categorySlug: "fashion",
    price: 590,
    originalPrice: null,
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p6a/600/600",
      "https://picsum.photos/seed/p6b/600/600",
    ],
    description:
      "Spacious tote bag made from organic cotton canvas. Strong handles and interior pocket. Folds flat for easy storage.",
    specifications: {
      Material: "Organic Cotton Canvas",
      Capacity: "15L",
      Dimensions: "40 × 35 × 10 cm",
      Handles: "60 cm drop",
      Closure: "Open top",
      Care: "Machine wash cold",
    },
    tags: ["bag", "tote", "canvas", "eco-friendly", "accessories"],
  },
  {
    id: "p7",
    name: "Leather Stan Smith Sneakers",
    brand: "Adidas",
    categorySlug: "fashion",
    price: 3290,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p7a/600/600",
      "https://picsum.photos/seed/p7b/600/600",
      "https://picsum.photos/seed/p7c/600/600",
    ],
    description:
      "The iconic Stan Smith gets a premium upgrade with genuine leather upper. Timeless silhouette that goes with everything. Cushioned insole for all-day comfort.",
    specifications: {
      Upper: "Genuine Leather",
      Sole: "Rubber",
      "Lacing System": "Classic lace-up",
      Sizes: "UK 4 – 13",
      Care: "Wipe clean with damp cloth",
      Origin: "Vietnam",
    },
    tags: ["sneakers", "leather", "adidas", "footwear", "casual"],
  },
  {
    id: "p8",
    name: "Merino Wool Scarf",
    brand: "Zara",
    categorySlug: "fashion",
    price: 1290,
    originalPrice: 1890,
    rating: 4.0,
    reviewCount: 43,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p8a/600/600",
      "https://picsum.photos/seed/p8b/600/600",
    ],
    description:
      "Soft and warm 100% merino wool scarf. Naturally temperature-regulating and odour-resistant. Generous length for multiple styling options.",
    specifications: {
      Material: "100% Merino Wool",
      Dimensions: "200 × 40 cm",
      Care: "Hand wash cold, flat dry",
      Weight: "200g",
      Colors: "4 available",
      Origin: "Italy",
    },
    tags: ["scarf", "wool", "winter", "accessories"],
  },

  // Home & Living
  {
    id: "p9",
    name: "Ceramic Mug Set (Set of 4)",
    brand: "Kinto",
    categorySlug: "home-living",
    price: 1290,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 201,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p9a/600/600",
      "https://picsum.photos/seed/p9b/600/600",
      "https://picsum.photos/seed/p9c/600/600",
    ],
    description:
      "Minimalist ceramic mugs with a matte glaze finish. Comfortable grip and generous 320ml capacity. Dishwasher and microwave safe.",
    specifications: {
      Material: "Ceramic",
      Capacity: "320ml each",
      Dimensions: "Ø 85 × H 90mm",
      Care: "Dishwasher safe",
      Origin: "Japan",
      Set: "4 mugs",
    },
    tags: ["mug", "ceramic", "coffee", "kitchenware", "gift"],
  },
  {
    id: "p10",
    name: "Large Bamboo Cutting Board",
    brand: "Joseph Joseph",
    categorySlug: "home-living",
    price: 790,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 87,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p10a/600/600",
      "https://picsum.photos/seed/p10b/600/600",
    ],
    description:
      "Extra-large bamboo cutting board with integrated juice grooves and non-slip feet. Naturally antimicrobial bamboo surface that is easy on knife blades.",
    specifications: {
      Material: "Bamboo",
      Dimensions: "45 × 30 × 2 cm",
      Features: "Juice grooves, non-slip feet",
      Care: "Hand wash, oil monthly",
      Origin: "China",
      Weight: "1.2kg",
    },
    tags: ["cutting board", "bamboo", "kitchen", "cooking"],
  },
  {
    id: "p11",
    name: "Washed Linen Throw Pillow",
    brand: "Muji",
    categorySlug: "home-living",
    price: 490,
    originalPrice: null,
    rating: 4.3,
    reviewCount: 65,
    inStock: false,
    images: [
      "https://picsum.photos/seed/p11a/600/600",
      "https://picsum.photos/seed/p11b/600/600",
    ],
    description:
      "Pre-washed linen pillow cover for an effortlessly lived-in look. Removable cover with hidden zipper. Available in natural linen tones.",
    specifications: {
      Material: "100% Linen",
      Dimensions: "45 × 45 cm",
      Closure: "Hidden zipper",
      Care: "Machine wash cold",
      Fill: "Not included",
      Origin: "Portugal",
    },
    tags: ["pillow", "linen", "home decor", "living room"],
  },
  {
    id: "p12",
    name: "Cedarwood Scented Candle",
    brand: "Diptyque",
    categorySlug: "home-living",
    price: 1890,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p12a/600/600",
      "https://picsum.photos/seed/p12b/600/600",
    ],
    description:
      "Hand-poured soy wax candle with a warm cedarwood, vetiver, and amber fragrance. Up to 55 hours of burn time. Reusable glass vessel.",
    specifications: {
      Wax: "Soy blend",
      "Burn Time": "55 hours",
      "Net Weight": "190g",
      "Fragrance Notes": "Cedarwood, Vetiver, Amber",
      Care: "Trim wick to 5mm before each use",
      Origin: "France",
    },
    tags: ["candle", "scented", "home fragrance", "gift"],
  },

  // Beauty
  {
    id: "p13",
    name: "Vitamin C Brightening Serum",
    brand: "The Ordinary",
    categorySlug: "beauty",
    price: 490,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 445,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p13a/600/600",
      "https://picsum.photos/seed/p13b/600/600",
    ],
    description:
      "15% L-Ascorbic Acid serum to brighten skin tone, reduce dark spots, and boost collagen production. Lightweight formula absorbs quickly.",
    specifications: {
      "Key Ingredient": "15% Vitamin C (L-Ascorbic Acid)",
      "Skin Type": "All skin types",
      Usage: "AM/PM, before moisturiser",
      Volume: "30ml",
      Shelf: "12 months after opening",
      Fragrance: "Fragrance-free",
    },
    tags: ["serum", "vitamin C", "brightening", "skincare", "anti-aging"],
  },
  {
    id: "p14",
    name: "UV Aqua Rich Sunscreen SPF50+",
    brand: "Anessa",
    categorySlug: "beauty",
    price: 890,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 567,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p14a/600/600",
      "https://picsum.photos/seed/p14b/600/600",
    ],
    description:
      "Lightweight, water-based sunscreen that provides broad-spectrum SPF50+/PA++++ protection. Watery texture that absorbs instantly with no white cast.",
    specifications: {
      SPF: "50+ / PA++++",
      "Skin Type": "All, especially oily/combination",
      Finish: "Matte",
      Volume: "60ml",
      Usage: "Apply generously before sun exposure",
      "Water Resistance": "Water and sweat resistant",
    },
    tags: ["sunscreen", "SPF50", "sun protection", "skincare", "japan"],
  },
  {
    id: "p15",
    name: "Water Sleeping Lip Mask",
    brand: "Laneige",
    categorySlug: "beauty",
    price: 390,
    originalPrice: 490,
    rating: 4.4,
    reviewCount: 123,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p15a/600/600",
      "https://picsum.photos/seed/p15b/600/600",
    ],
    description:
      "Overnight lip treatment that repairs, nourishes, and plumps lips while you sleep. Infused with Vitamin C, Hyaluronic Acid, and Berry Mix Complex.",
    specifications: {
      "Key Ingredients": "Vitamin C, Hyaluronic Acid",
      Usage: "Apply generously at night",
      Volume: "20g",
      Scent: "Berry",
      "Skin Type": "All lip types",
      Origin: "South Korea",
    },
    tags: ["lip mask", "overnight", "moisture", "skincare", "korea"],
  },
  {
    id: "p16",
    name: "Dewy Skin Mist",
    brand: "Tatcha",
    categorySlug: "beauty",
    price: 1690,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    images: [
      "https://picsum.photos/seed/p16a/600/600",
      "https://picsum.photos/seed/p16b/600/600",
    ],
    description:
      "Hydrating facial mist inspired by the Japanese practice of layering moisture. Infused with Hadasei-3 Complex, silk, and green tea to set makeup or refresh throughout the day.",
    specifications: {
      "Key Ingredients": "Hadasei-3, Silk Extract, Green Tea",
      Usage: "Mist 20–30cm from face",
      Volume: "55ml",
      Finish: "Dewy",
      "Skin Type": "Dry, combination",
      Origin: "Japan",
    },
    tags: ["mist", "hydrating", "setting spray", "skincare", "luxury"],
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) ?? null;
}

export function getProductsByCategory(slug) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getAllProducts() {
  return products;
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
