import { Heart } from "lucide-react";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/EmptyState";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { state: productIds } = useWishlist();

  const products = productIds.map(getProductById).filter(Boolean);

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-display text-3xl font-bold">Your wishlist</h1>
        <EmptyState
          icon={Heart}
          heading="Your wishlist is empty"
          subtext="Save items you like to find them here later."
          actionLabel="Browse products"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-display text-3xl font-bold">Your wishlist</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
