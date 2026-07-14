import { useParams, useSearchParams } from "react-router-dom";
import { LayoutGrid, SearchX } from "lucide-react";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import {
  filterProducts,
  getFiltersFromSearchParams,
  paginate,
  sortProducts,
} from "@/lib/catalogFilters";
import PageBreadcrumb from "@/components/catalog/PageBreadcrumb";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import SortBar from "@/components/catalog/SortBar";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/EmptyState";

const PRODUCTS_PER_PAGE = 2;

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

  const filters = getFiltersFromSearchParams(searchParams);
  const filteredProducts = filterProducts(products, filters);
  const sortedProducts = sortProducts(
    filteredProducts,
    searchParams.get("sort"),
  );

  const requestedPage = Number(searchParams.get("page")) || 1;
  const { pageCount, pagedItems: pagedProducts } = paginate(
    sortedProducts,
    requestedPage,
    PRODUCTS_PER_PAGE,
  );

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
          <SortBar count={pagedProducts.length} brands={brands} />

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
              {pagedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <CatalogPagination pageCount={pageCount} />
        </div>
      </div>
    </div>
  );
}
