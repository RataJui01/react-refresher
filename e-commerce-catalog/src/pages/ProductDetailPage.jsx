import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus, PackageX, Check } from "lucide-react";
import { getProductById, getProductsByCategory } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageBreadcrumb from "@/components/catalog/PageBreadcrumb";
import Rating from "@/components/product/Rating";
import ProductCard from "@/components/product/ProductCard";
import CustomerReviews from "@/components/product/CustomerReviews";
import EmptyState from "@/components/common/EmptyState";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = getProductById(productId);
  const { state: cart, dispatch } = useCart();
  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();
  const isWishlisted = wishlist.includes(productId);
  const isInCart = cart.some((item) => item.productId === productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          icon={PackageX}
          heading="Product not found"
          subtext={`We couldn't find a product with ID "${productId}".`}
          actionLabel="Go home"
          actionTo="/"
        />
      </div>
    );
  }

  const {
    name,
    brand,
    categorySlug,
    price,
    originalPrice,
    rating,
    reviewCount,
    inStock,
    images,
    description,
    specifications,
  } = product;

  const related = getProductsByCategory(categorySlug)
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    {
      label: categorySlug
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
      to: `/category/${categorySlug}`,
    },
    { label: name },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumb items={breadcrumbItems} />

      {/* Main product section */}
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border">
            <img
              src={images[selectedImage]}
              alt={name}
              className="h-96 w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${name} view ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {brand}
            </p>
            <h1 className="mt-1 font-display text-3xl leading-tight font-bold">
              {name}
            </h1>
          </div>

          <Rating value={rating} count={reviewCount} size={18} />

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold">
              ฿{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ฿{originalPrice.toLocaleString()}
              </span>
            )}
            {originalPrice && (
              <Badge variant="destructive">
                {Math.round((1 - price / originalPrice) * 100)}% off
              </Badge>
            )}
          </div>

          <p className="leading-relaxed text-muted-foreground">{description}</p>

          <Separator />

          {inStock ? (
            <div className="flex flex-col gap-4">
              {/* Quantity stepper */}
              <div className="flex items-center gap-1">
                <span className="mr-3 text-sm font-medium">Quantity</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-10 text-center text-sm font-medium">
                  {qty}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => {
                    if (isInCart) {
                      navigate("/cart");
                      return;
                    }
                    dispatch({
                      type: "ADD_ITEM",
                      productId: productId,
                      qty: qty,
                    });
                  }}
                >
                  {isInCart ? (
                    <>
                      <Check size={16} className="mr-2" />
                      View Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-pressed={isWishlisted}
                  onClick={() => {
                    wishlistDispatch({ type: "TOGGLE_ITEM", productId });
                  }}
                >
                  <Heart
                    size={16}
                    className={isWishlisted ? "fill-destructive text-destructive" : ""}
                  />
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
              Currently out of stock — check back soon.
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Description / Specs / Reviews */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviewCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="prose mt-6 max-w-none">
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <dl className="divide-y rounded-xl border">
            {Object.entries(specifications).map(([key, val]) => (
              <div key={key} className="flex px-4 py-3 text-sm">
                <dt className="w-40 shrink-0 font-medium text-muted-foreground">
                  {key}
                </dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <CustomerReviews
            rating={rating}
            reviewCount={reviewCount}
            productId={productId}
          />
        </TabsContent>
      </Tabs>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold">
            You might also like
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
