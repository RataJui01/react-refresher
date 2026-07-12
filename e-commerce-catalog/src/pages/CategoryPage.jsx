import { useParams, useSearchParams } from "react-router-dom";
import { LayoutGrid, SearchX } from "lucide-react";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import PageBreadcrumb from "@/components/catalog/PageBreadcrumb";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import SortBar from "@/components/catalog/SortBar";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/EmptyState";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
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

  const selectedBrands = searchParams.getAll("brand");
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
  const minRating = searchParams.get("minRating") ?? "";
  const inStock = searchParams.get("inStock") === "1";

  const filteredProducts = products
    .filter((product) =>
      selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true,
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)
    .filter((product) =>
      minRating ? product.rating >= Number(minRating) : true,
    )
    .filter((product) => (inStock ? product.inStock : true));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <PageBreadcrumb
        items={[{ label: "Home", to: "/" }, { label: category.name }]}
      />

      {/* Header */}
      <div className="mt-4 mb-8">
        <h1 className="font-display text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground mt-1">{category.tagline}</p>
      </div>

      {/* Layout */}
      <div className="flex gap-8">
        {/* Desktop filter sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <FilterSidebar brands={brands} />
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-6">
          <SortBar count={filteredProducts.length} brands={brands} />

          {filteredProducts.length === 0 ? (
            <EmptyState
              icon={SearchX}
              heading="No products match your filters"
              subtext="Try adjusting or clearing your filters to see more results."
              actionLabel="Clear filters"
              actionTo={`/category/${categorySlug}`}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination — TODO: slice products by page */}
          <CatalogPagination pageCount={3} />
        </div>
      </div>
    </div>
  );
}
