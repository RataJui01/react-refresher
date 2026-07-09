# Frontend Spec — E-commerce Catalog (Routing Practice)

โปรเจกต์นี้คือ **UI shell ที่ยังไม่มี logic** — routing ทำงานได้จริง, หน้าตาครบทุกหน้า,
ข้อมูลทั้งหมดเป็น mock data แบบ static แต่ **ไม่มี** data fetching, cart state, หรือ
filter/sort logic ตัวจริง เป้าหมายคือให้คุณเห็นโครงสร้างแอปเต็มรูปแบบใน browser
แล้วค่อยเขียน logic เชื่อมเข้าไปเองทีหลัง

ดูรายละเอียดแต่ละหน้าได้ที่ [`pages.md`](./pages.md)

---

## 1. Tech Stack (ตามที่ตกลงกันไว้)

| อย่าง | ที่ใช้ |
|---|---|
| Language | JavaScript (`.jsx`) — ไม่มี TypeScript |
| Styling | Tailwind CSS (มีอยู่แล้วในโปรเจกต์คุณ) + **shadcn/ui** (ต้องติดตั้งเพิ่ม — ดูข้อ 2) |
| Routing | React Router v7, **Declarative Mode** (`<Routes>` / `<Route>` ใน `App.jsx`) |
| Icons | `lucide-react` |

---

## 2. Prerequisites — ติดตั้งก่อนใช้โค้ดชุดนี้

โค้ดที่ให้มาทั้งหมด import จาก `@/components/ui/*` (shadcn convention) ต้องรัน
shadcn CLI เพื่อ generate ไฟล์พวกนี้เข้าไปในโปรเจกต์คุณก่อน:

```bash
npx shadcn@latest init
```

จากนั้นติดตั้ง component ที่โค้ดนี้ใช้จริงทั้งหมด (ครบตามนี้ ไม่มีเกิน):

```bash
npx shadcn@latest add button badge input label select checkbox radio-group slider sheet tabs separator breadcrumb pagination
```

shadcn CLI จะถามเรื่อง path alias (`@/*`) และ base color ระหว่าง init — ตอบตามที่โปรเจกต์
คุณต้องการได้เลย โค้ดชุดนี้ไม่ผูกกับ base color ที่เลือกตอน init เพราะเราจะ override
ด้วย custom tokens ในข้อ 4

> **หมายเหตุ:** shadcn/ui ไม่ใช่ npm package แต่เป็นโค้ดที่ copy เข้าโปรเจกต์คุณ
> (คุณ "เป็นเจ้าของ" โค้ดใน `components/ui/`) — ตรงกับที่ `/shadcn-ui` skill อธิบายไว้

---

## 3. โครงสร้างไฟล์

```
src/
├── data/
│   └── products.js          # mock data + helper lookups (ไม่ใช่ business logic)
├── components/
│   ├── ui/                  # generate โดย shadcn CLI (ข้อ 2)
│   ├── layout/
│   │   ├── Header.jsx        # nav, search form, cart icon, mobile menu
│   │   ├── Footer.jsx
│   │   └── RootLayout.jsx    # Header + <Outlet/> + Footer
│   ├── product/
│   │   ├── ProductCard.jsx
│   │   └── Rating.jsx
│   ├── catalog/
│   │   ├── PageBreadcrumb.jsx
│   │   ├── FilterSidebar.jsx # ราคา/แบรนด์/rating/สต็อก — ผูกกับ URL
│   │   ├── SortBar.jsx       # sort dropdown + mobile filter trigger
│   │   └── CatalogPagination.jsx
│   └── common/
│       └── EmptyState.jsx    # ใช้ซ้ำสำหรับ empty cart / no results / 404
├── pages/
│   ├── HomePage.jsx
│   ├── CategoryPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── SearchResultsPage.jsx
│   ├── CartPage.jsx
│   └── NotFoundPage.jsx
└── App.jsx                   # route config
```

คัดลอกทุกอย่างใน `src/` (ยกเว้น `components/ui/` ซึ่ง generate เอง) ไปวางทับ/รวมกับ
โปรเจกต์ของคุณตาม path เดิม ถ้าคุณใช้โครงสร้างโฟลเดอร์ต่างจากนี้ ปรับ import path
(`@/...`) ให้ตรงกับของคุณได้เลย — ทุกไฟล์ import แบบ absolute path ผ่าน alias `@/`
ซึ่งปกติ Vite + shadcn จะตั้งให้ชี้ไปที่ `src/` อยู่แล้ว

---

## 4. Design System

แนวทางที่เลือก: **"Modern boutique retail"** — โทนอบอุ่น ไม่ใช่สไตล์ SaaS สีฟ้า/ม่วงทั่วไป
สี dominant คือ terracotta/สีอิฐ ตัดกับพื้นหลังครีมอุ่นๆ ให้ความรู้สึกร้านของดีไซน์เนอร์
มากกว่า marketplace ทั่วไป

### สี (CSS variables)

Generate โดย shadcn init จะสร้างไฟล์ CSS ที่มี `:root { --background: ...; }` อยู่แล้ว
(มักจะอยู่ใน `src/index.css` หรือ `globals.css`) — แทนที่ค่า default ด้วยชุดนี้:

```css
:root {
  --background: 36 33% 96%;      /* ครีมอุ่น */
  --foreground: 24 15% 12%;      /* หมึกเข้ม ไม่ใช่ดำสนิท */

  --primary: 14 62% 47%;         /* terracotta — สีหลักของปุ่ม/CTA */
  --primary-foreground: 36 33% 97%;

  --secondary: 36 26% 91%;
  --secondary-foreground: 24 15% 15%;

  --muted: 36 26% 91%;
  --muted-foreground: 30 8% 42%;

  --accent: 36 26% 89%;
  --accent-foreground: 24 15% 15%;

  --destructive: 4 72% 51%;
  --destructive-foreground: 36 33% 97%;

  --border: 30 20% 87%;
  --input: 30 20% 85%;
  --ring: 14 62% 47%;

  --popover: 36 33% 97%;
  --popover-foreground: 24 15% 12%;

  --radius: 0.6rem;
}
```

ไม่ต้องเขียน dark mode variant ตอนนี้ก็ได้ — ถ้าจะทำทีหลัง ให้คง hue เดิมแต่สลับ
lightness (ดู `color-dark-mode` guideline: อย่า invert สี ตรงๆ)

### Typography

- **Display/heading**: [Fraunces](https://fonts.google.com/specimen/Fraunces) — serif ที่มี
  character อบอุ่น ต่างจาก sans-serif ทั่วไปที่ e-commerce ส่วนใหญ่ใช้
- **Body**: [Work Sans](https://fonts.google.com/specimen/Work+Sans) — sans-serif อ่านง่าย

Import ใน CSS ไฟล์เดียวกับข้อบน (**ต้องอยู่บรรทัดแรกสุด ก่อน `@import "tailwindcss"`**
ไม่งั้น browser จะไม่ apply):

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
```

แล้ว map เป็น Tailwind font family — **ถ้า Tailwind v4** (ใช้ `@theme` ใน CSS โดยตรง ไม่มี
`tailwind.config.js`):

```css
@theme inline {
  --font-display: "Fraunces", serif;
  --font-sans: "Work Sans", sans-serif;
}
```

**ถ้า Tailwind v3** (มี `tailwind.config.js`):

```js
// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      display: ["Fraunces", "serif"],
      sans: ["Work Sans", "sans-serif"],
    },
  },
}
```

จากนั้นใช้ `font-display` กับ heading (เช่น `<h1 className="font-display ...">`) —
โค้ดที่ให้มาใช้ class นี้อยู่แล้วทุกที่ที่เป็น heading

### สี/ฟอนต์ ห้ามทำแบบไหน

ตาม `frontend-design` skill — หลีกเลี่ยง Inter/Roboto/Arial, หลีกเลี่ยง purple gradient
บนพื้นขาว ซึ่ง palette/font ชุดนี้ตั้งใจเลี่ยงทั้งคู่แล้ว ถ้าจะเปลี่ยนทีหลัง พยายามคง
หลักการเดิม: สีหลักสีเดียวที่เด่นชัด (ไม่ใช่ไล่เฉดหลายสี) + font pairing ที่มี character

---

## 5. Route Map

| Path | Component | ใช้ทำอะไร |
|---|---|---|
| `/` | `HomePage` | หน้าแรก — hero, category tiles, trending products |
| `/category/:categorySlug` | `CategoryPage` | รายการสินค้าในหมวด + filter/sort/pagination |
| `/product/:productId` | `ProductDetailPage` | รายละเอียดสินค้า |
| `/search?q=` | `SearchResultsPage` | ผลค้นหา (อ่าน query string) |
| `/cart` | `CartPage` | ตะกร้าสินค้า |
| `*` | `NotFoundPage` | catch-all 404 |

ทุก route ยกเว้นไม่มี ถูกครอบด้วย `RootLayout` (Header + `<Outlet/>` + Footer) ผ่าน
nested route เดียว ใน `App.jsx`

---

## 6. ขอบเขต: มีอะไรให้แล้ว vs ต้องทำเอง

นี่คือส่วนสำคัญที่สุดของ spec นี้ — เพื่อไม่ให้สับสนว่าทำไม filter กดแล้ว "ดูเหมือนไม่ทำงาน"

### ✅ สิ่งที่ทำให้แล้ว (routing mechanics)

- **Routing ทำงานจริง** — คลิกลิงก์แล้วเปลี่ยนหน้าจริง, `<Outlet/>` render layout ซ้อนกันจริง
- **`useParams`** — `:categorySlug` และ `:productId` ถูกอ่านและ lookup กับ mock data จริง
  (เช่น เข้า `/product/p1` จะเห็นสินค้า p1 จริง ไม่ใช่ข้อมูล hardcode เดียวกันทุกหน้า)
- **`useSearchParams` เขียน/อ่าน URL จริง** — filter (ราคา/แบรนด์/rating/สต็อก), sort,
  และ page number ทั้งหมด sync กับ URL query string จริง ลองกดแล้วดู URL bar ได้เลย
  รีเฟรชหน้าแล้วค่ายังอยู่ (นี่คือ pattern "URL as state" ที่คุยกันไว้ก่อนหน้านี้)
- **Search query (`/search?q=`)** — มี naive substring match ให้แล้ว (เทียบชื่อ/แบรนด์
  แบบ case-insensitive) เพื่อให้หน้านี้ demo ได้จริงว่าพิมพ์คำค้นแล้วเห็นผลต่างกัน
- **Invalid param handling** — เข้า category/product ที่ไม่มีจริง จะเห็น empty state
  ที่ถูกต้อง ไม่ crash
- **Cart page มี local state** — เพิ่ม/ลดจำนวน, ลบสินค้าออกจากตะกร้า, คำนวณ subtotal/total
  ทำงานได้จริง **แต่เป็น state เฉพาะหน้านี้เท่านั้น**

### ❌ สิ่งที่ยังไม่ทำ (ต้องเขียนเอง)

- **Filter/Sort ยังไม่ตัดข้อมูลจริง** — `CategoryPage` และ `SearchResultsPage` แสดง
  สินค้าทั้งหมดของหมวด/ผลค้นหาเสมอ ไม่สนใจค่า `?brand=`, `?maxPrice=`, `?minRating=`,
  `?inStock=`, `?sort=` ที่อยู่ใน URL แล้ว (แม้ UI จะอ่าน/เขียนค่าพวกนี้ถูกต้อง) —
  คุณต้องเขียนฟังก์ชัน filter/sort แล้วนำไปใช้กับ array ก่อน render
- **Pagination ยังไม่ตัด array จริง** — `CatalogPagination` แค่ sync เลขหน้ากับ URL
  ยังไม่ slice ข้อมูลตามหน้า (ตอนนี้ `pageCount` เป็นค่า hardcode ที่ส่งเข้าไปตรงๆ)
- **Cart ไม่ใช่ global state** — `CartPage` มี mock cart เป็น `useState` ในตัวเอง
  Header badge (เลข 2 ที่ไอคอนตะกร้า) เป็นค่า hardcode คนละที่กับ CartPage ไม่ได้
  sync กัน — ต้องยก state นี้ขึ้นไปเป็น Context หรือ Zustand (ตามที่เคยคุยกันเรื่อง
  state management) แล้วให้ทั้ง Header และ CartPage อ่านจากที่เดียวกัน
- **Add to Cart / Wishlist ปุ่มยังไม่ทำอะไร** — มี `onClick` เป็น placeholder พร้อม
  comment `// TODO` ไว้ให้แล้วทุกจุด (ใน `ProductCard`, `ProductDetailPage`)
- **ไม่มี data fetching เลย** — ทุกอย่างมาจาก `src/data/products.js` แบบ import ตรงๆ
  ถ้าจะเปลี่ยนเป็นเรียก API จริง จุดที่ต้องแก้คือฟังก์ชัน `getProductById`,
  `getCategoryBySlug`, `getProductsByCategory` ใน `products.js` — เปลี่ยนจาก
  synchronous lookup เป็น React Router loader หรือ TanStack Query ได้เลย (ตามที่คุย
  กันไว้เรื่อง trade-off ระหว่างสองแนวทางนี้)
- **ไม่มี checkout flow** — ปุ่ม "Proceed to checkout" เป็น placeholder

---

## 7. Component ที่ใช้ซ้ำได้ (shared)

| Component | ใช้ที่ไหนบ้าง |
|---|---|
| `RootLayout` | ทุกหน้า (ผ่าน route ครอบใน `App.jsx`) |
| `Header` / `Footer` | ผ่าน `RootLayout` |
| `ProductCard` | Home, Category, Search, ProductDetail (related products) |
| `Rating` | `ProductCard`, `ProductDetailPage` |
| `PageBreadcrumb` | Category, ProductDetail |
| `FilterSidebar` | Category (desktop aside + mobile sheet ผ่าน `SortBar`) |
| `SortBar` | Category, Search |
| `CatalogPagination` | Category, Search |
| `EmptyState` | Category (not-found), ProductDetail (not-found), Search (no query/no results), Cart (empty), NotFoundPage |

---

## 8. หมายเหตุการทดสอบ

โค้ดชุดนี้ผ่านการตรวจสอบมาแล้ว: `vite build` สะอาด, `oxlint` ไม่มี error, และมีการ
SSR-render ทุกหน้าด้วยข้อมูลหลายแบบ (param ถูก/ผิด, มี query/ไม่มี, filter ใน URL)
เพื่อเช็คว่าไม่มี runtime error — แต่ยังไม่เคยเปิดดูใน browser จริงเพราะรันในระบบที่ไม่มี
browser ให้ทดสอบ ถ้าเจอจุดไหนหน้าตาเพี้ยนตอนรันจริง (โดยเฉพาะ shadcn component ที่
generate จาก CLI เวอร์ชันของคุณอาจต่างจากที่ผมอ้างอิง) บอกได้เลย แก้ให้ต่อได้ทันที
