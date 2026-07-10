import { useParams } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import PageBreadcrumb from "@/components/catalog/PageBreadcrumb";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import SortBar from "@/components/catalog/SortBar";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/EmptyState";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          icon={LayoutGrid}
          heading="Category not found"
          subtext={`"${categorySlug}" doesn't match any category.`}
          actionLabel="Browse all"
          actionTo="/"
        />
      </div>
    );
  }

  const products = getProductsByCategory(categorySlug);
  const brands = [...new Set(products.map((p) => p.brand))].sort();

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          icon={LayoutGrid}
          heading="No products yet"
          subtext={`${category.name} is coming soon. Check back later.`}
          actionLabel="Go home"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[{ label: "Home", to: "/" }, { label: category.name }]}
      />

      {/* Header */}
      <div className="mt-4 mb-8">
        <h1 className="font-display text-3xl font-bold">{category.name}</h1>
        <p className="mt-1 text-muted-foreground">{category.tagline}</p>
      </div>

      {/* Layout */}
      <div className="flex gap-8">
        {/* Desktop filter sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <FilterSidebar brands={brands} />
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-6">
          <SortBar count={products.length} brands={brands} />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination — TODO: slice products by page */}
          <CatalogPagination pageCount={3} />
        </div>
      </div>
    </div>
  );
}
