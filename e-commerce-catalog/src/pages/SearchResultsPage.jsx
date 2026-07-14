import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { searchProducts } from "@/data/products";
import { paginate, sortProducts } from "@/lib/catalogFilters";
import SortBar from "@/components/catalog/SortBar";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/EmptyState";

const PRODUCTS_PER_PAGE = 12;

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  // No query yet
  if (!q.trim()) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          icon={Search}
          heading="What are you looking for?"
          subtext="Type something in the search bar above."
        />
      </div>
    );
  }

  const results = searchProducts(q);
  const brands = [...new Set(results.map((p) => p.brand))].sort();
  const sortedResults = sortProducts(results, searchParams.get("sort"));

  const requestedPage = Number(searchParams.get("page")) || 1;
  const { pageCount, pagedItems: pagedResults } = paginate(
    sortedResults,
    requestedPage,
    PRODUCTS_PER_PAGE,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display mb-6 text-2xl font-semibold">
        Results for &ldquo;{q}&rdquo;
      </h1>

      {results.length === 0 ? (
        <EmptyState
          icon={Search}
          heading="No matches found"
          subtext={`We couldn't find anything for "${q}". Try a different keyword.`}
          actionLabel="Go home"
          actionTo="/"
        />
      ) : (
        <div className="flex flex-col gap-6">
          <SortBar count={pagedResults.length} brands={brands} />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pagedResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <CatalogPagination pageCount={pageCount} />
        </div>
      )}
    </div>
  );
}
