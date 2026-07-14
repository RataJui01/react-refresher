export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 10000;

export function getFiltersFromSearchParams(searchParams) {
  return {
    brands: searchParams.getAll("brand"),
    minPrice: Number(searchParams.get("minPrice")) || DEFAULT_MIN_PRICE,
    maxPrice: Number(searchParams.get("maxPrice")) || DEFAULT_MAX_PRICE,
    minRating: searchParams.get("minRating") ?? "",
    inStock: searchParams.get("inStock") === "1",
  };
}

export function filterProducts(products, filters) {
  const { brands, minPrice, maxPrice, minRating, inStock } = filters;

  return products
    .filter((product) =>
      brands.length > 0 ? brands.includes(product.brand) : true,
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)
    .filter((product) =>
      minRating ? product.rating >= Number(minRating) : true,
    )
    .filter((product) => (inStock ? product.inStock : true));
}

export function sortProducts(products, sort) {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "newest":
      return [...products].sort(
        (a, b) => Number(b.id.slice(1)) - Number(a.id.slice(1)),
      );
    default:
      return products;
  }
}

export function paginate(items, page, perPage) {
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const pagedItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return { pageCount, currentPage, pagedItems };
}
