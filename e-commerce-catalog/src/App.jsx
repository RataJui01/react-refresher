import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import SearchResultsPage from "@/pages/SearchResultsPage";
import CartPage from "@/pages/CartPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:categorySlug" element={<CategoryPage />} />
          <Route path="product/:productId" element={<ProductDetailPage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
