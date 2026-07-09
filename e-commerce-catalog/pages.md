# Page Details — E-commerce Catalog

รายละเอียดของแต่ละหน้า ดูภาพรวม/design system/ขอบเขต logic ที่ [`spec.md`](./spec.md)

---

## 1. Home — `/`

**ไฟล์:** `src/pages/HomePage.jsx`

**โครงสร้างหน้า (บนลงล่าง):**
1. **Hero** — headline + subcopy + ปุ่ม CTA 2 อัน (`/category/electronics`,
   `/category/fashion`) + รูปภาพ
2. **Promo strip** — แถบสีเข้มเต็มความกว้าง บอกเงื่อนไขส่งฟรี
3. **Category tiles** — grid 4 ช่อง ลิงก์ไป `/category/:slug` แต่ละอัน
4. **Trending now** — grid สินค้า 4 ชิ้นแรกจาก mock data + ลิงก์ "View all"

**Component ที่ใช้:** `ProductCard`

**Routing concept ที่หน้านี้ demo:** เป็น `index` route ของ `RootLayout` — ไม่มี
dynamic param ตัวมันเอง แต่เป็นจุดเริ่มต้นของลิงก์ไปหน้าอื่นๆ ทั้งหมด

**States:** ไม่มี state พิเศษ — เนื้อหาคงที่เสมอ

**ยังไม่ได้ทำ:** ไม่มี — หน้านี้เป็น static ล้วนๆ

---

## 2. Category — `/category/:categorySlug`

**ไฟล์:** `src/pages/CategoryPage.jsx`

**โครงสร้างหน้า:**
1. Breadcrumb (Home / ชื่อหมวด)
2. Header หมวด (ชื่อ + tagline)
3. Layout 2 คอลัมน์: `FilterSidebar` (ซ้าย, ซ่อนบนมือถือ) + เนื้อหาหลัก (ขวา)
4. ใน "เนื้อหาหลัก": `SortBar` (จำนวนผลลัพธ์ + sort dropdown + ปุ่ม filter สำหรับมือถือ)
   → grid สินค้า → `CatalogPagination`

**Component ที่ใช้:** `PageBreadcrumb`, `FilterSidebar`, `SortBar`, `ProductCard`,
`CatalogPagination`, `EmptyState`

**Dynamic param:** `:categorySlug` — lookup ผ่าน `getCategoryBySlug()` และ
`getProductsByCategory()` ใน `src/data/products.js`

**States:**
| State | เงื่อนไข | แสดงอะไร |
|---|---|---|
| ปกติ | slug ตรงกับหมวดจริง และมีสินค้า | grid สินค้า |
| หมวดไม่พบ | slug ไม่ตรงกับหมวดไหนเลย (เช่น `/category/xyz`) | `EmptyState` "Category not found" |
| หมวดว่าง | หมวดมีจริงแต่ไม่มีสินค้าใน mock data | `EmptyState` "No products yet" |

**Routing concept ที่หน้านี้ demo:**
- `useParams` อ่าน `:categorySlug` แล้ว lookup ข้อมูลจริง
- `useSearchParams` ผ่าน `FilterSidebar`/`SortBar`/`CatalogPagination` — ค่า `brand`,
  `maxPrice`, `minRating`, `inStock`, `sort`, `page` ทั้งหมด sync กับ URL
- การจัดการ dynamic param ที่ไม่ valid อย่างปลอดภัย (ไม่ crash, แสดง fallback UI)

**ยังไม่ได้ทำ:** filter/sort/pagination ยังไม่ตัดข้อมูลจริง (ดูข้อ 6 ใน `spec.md`)
— grid ที่เห็นคือสินค้าทั้งหมดของหมวดเสมอ ไม่ว่าจะตั้งค่า filter/sort/page เป็นอะไร

---

## 3. Product Detail — `/product/:productId`

**ไฟล์:** `src/pages/ProductDetailPage.jsx`

**โครงสร้างหน้า:**
1. Breadcrumb (Home / หมวด / ชื่อสินค้า)
2. Layout 2 คอลัมน์: Gallery (ซ้าย) + Info panel (ขวา)
   - Gallery: รูปหลัก + thumbnail แถวล่าง (คลิกเปลี่ยนรูปหลัก — local `useState`)
   - Info: แบรนด์, ชื่อ, rating, ราคา (+ ราคาก่อนลดถ้ามี + badge), คำอธิบายสั้น,
     quantity stepper (local state), ปุ่ม Add to cart, ปุ่ม wishlist
3. Tabs: Description / Specifications / Reviews (`shadcn Tabs`, client-side ไม่ใช่ route)
4. Related products — สินค้าอื่นในหมวดเดียวกัน (สูงสุด 4 ชิ้น)

**Component ที่ใช้:** `PageBreadcrumb`, `Rating`, `ProductCard` (related), `EmptyState`

**Dynamic param:** `:productId` — lookup ผ่าน `getProductById()`

**States:**
| State | เงื่อนไข | แสดงอะไร |
|---|---|---|
| ปกติ | productId ตรงกับสินค้าจริง + มีสต็อก | quantity stepper + Add to cart |
| สินค้าไม่พบ | productId ไม่ตรงกับสินค้าไหนเลย | `EmptyState` "Product not found" |
| หมดสต็อก | `product.inStock === false` | ข้อความ "Currently out of stock" แทนปุ่ม |

**Routing concept ที่หน้านี้ demo:** `useParams` กับ dynamic segment ที่ "ลึก" กว่า
category (สินค้าเดี่ยว), การแยก client-side state (active tab, active image, quantity)
ออกจาก route state ให้ชัดเจน

**ยังไม่ได้ทำ:** ปุ่ม Add to cart / wishlist ไม่เชื่อมกับ state ใดๆ (มี `// TODO`
คอมเมนต์ไว้ในโค้ด), เนื้อหา tab "Reviews" เป็นข้อความ placeholder ไม่มี review จริง

---

## 4. Search Results — `/search?q=...`

**ไฟล์:** `src/pages/SearchResultsPage.jsx`

**โครงสร้างหน้า:**
1. Header หน้า — "Results for "..."" หรือ "Search" ถ้ายังไม่มีคำค้น
2. ถ้ามีผลลัพธ์: `SortBar` + grid สินค้า + `CatalogPagination`
3. ถ้าไม่มี query หรือไม่มีผลลัพธ์: `EmptyState` ที่ข้อความต่างกันตามกรณี

**Component ที่ใช้:** `SortBar`, `ProductCard`, `CatalogPagination`, `EmptyState`

**Query param:** `?q=` อ่านผ่าน `useSearchParams` (คนละแบบกับ `:categorySlug` —
นี่คือจุดสำคัญที่หน้านี้มีไว้ให้เทียบ: **dynamic route param vs query string**)

**States:**
| State | เงื่อนไข | แสดงอะไร |
|---|---|---|
| ยังไม่ค้นหา | ไม่มี `?q=` เลย | `EmptyState` "Start typing to search" |
| เจอผลลัพธ์ | มี `q` และมีสินค้าตรงกับชื่อ/แบรนด์ | grid สินค้า |
| ไม่เจอผลลัพธ์ | มี `q` แต่ไม่ match อะไรเลย | `EmptyState` "No matches found" |

**หมายเหตุ:** หน้านี้มี string-matching (`.toLowerCase().includes(...)`) ใส่ไว้ให้แล้ว
เป็นข้อยกเว้นเดียวที่มี "การกรองข้อมูลจริง" ในทั้งโปรเจกต์ — เพราะถ้าไม่มีเลย หน้า search
จะดูเหมือนพังตั้งแต่แรก ให้มองว่านี่คือ placeholder แบบง่ายที่สุด ควรแทนที่ด้วย
API ค้นหาจริงทีหลัง ไม่ใช่ pattern ที่ควร apply กับหน้าอื่น (เทียบกับ Category/filter
ที่ตั้งใจไม่ใส่ logic ให้)

**ยังไม่ได้ทำ:** sort/pagination เหมือนหน้า Category (ยังไม่ตัดข้อมูลจริง)

---

## 5. Cart — `/cart`

**ไฟล์:** `src/pages/CartPage.jsx`

**โครงสร้างหน้า:**
1. หัวข้อ "Your cart"
2. Layout 2 คอลัมน์: รายการสินค้า (ซ้าย) + Order summary (ขวา, sticky)
   - แต่ละรายการ: รูป, ชื่อ, แบรนด์, quantity stepper, ปุ่มลบ, ราคารวมต่อชิ้น
   - Order summary: subtotal, shipping (ฟรีถ้า > ฿1,500), total, ปุ่ม checkout

**States:**
| State | เงื่อนไข | แสดงอะไร |
|---|---|---|
| มีของในตะกร้า | `items.length > 0` | รายการ + summary |
| ตะกร้าว่าง | ลบสินค้าออกจนหมด หรือเริ่มต้นด้วย array ว่าง | `EmptyState` "Your cart is empty" |

**สิ่งที่ทำงานได้จริง (local เท่านั้น):** เพิ่ม/ลดจำนวน, ลบสินค้า, คำนวณ subtotal/
shipping/total ใหม่ทันทีที่ state เปลี่ยน — ทั้งหมดนี้เป็น `useState` ภายในไฟล์นี้ไฟล์เดียว

**ยังไม่ได้ทำ (สำคัญ):**
- Cart เริ่มต้นด้วยสินค้า mock 2 ชิ้น (`p1`, `p4`) แบบ hardcode ไม่ได้มาจากการกด
  "Add to cart" จริงจากหน้าไหนเลย
- Header badge (เลข 2) เป็นค่า hardcode แยกต่างหาก **ไม่ sync** กับ state ในหน้านี้
- ปุ่ม "Proceed to checkout" ไม่ทำอะไร

ถ้าจะทำให้ครบ ต้องยก cart state ออกจากไฟล์นี้ไปไว้ที่ระดับสูงกว่า (Context provider
ครอบ `RootLayout`, หรือ Zustand store แยก) แล้วให้ทั้ง `Header` และ `CartPage` อ่าน/
เขียนจากที่เดียวกัน — โครงสร้าง UI และการคำนวณ subtotal ที่มีอยู่แล้วใช้ต่อได้เลย
แค่ย้ายตำแหน่ง state

---

## 6. Not Found — `*` (catch-all)

**ไฟล์:** `src/pages/NotFoundPage.jsx`

**โครงสร้างหน้า:** `EmptyState` ตรงกลางหน้าจอ ข้อความ "404 — Page not found" +
ปุ่มกลับหน้าแรก

**Routing concept ที่หน้านี้ demo:** `path="*"` เป็น route สุดท้ายใน `App.jsx` —
จับทุก URL ที่ไม่ตรงกับ route อื่นก่อนหน้า (ลำดับ route มีผล ต้องอยู่ล่างสุดเสมอ)

**ยังไม่ได้ทำ:** ไม่มี — หน้านี้ static ล้วนๆ เหมือน Home
