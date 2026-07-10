import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus, PackageX } from "lucide-react";
import { getProductById, getProductsByCategory } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageBreadcrumb from "@/components/catalog/PageBreadcrumb";
import Rating from "@/components/product/Rating";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/common/EmptyState";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = getProductById(productId);

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
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {brand}
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold leading-tight">
              {name}
            </h1>
          </div>

          <Rating value={rating} count={reviewCount} size={18} />

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold">฿{price.toLocaleString()}</span>
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

          <p className="text-muted-foreground leading-relaxed">{description}</p>

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
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
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
                    // TODO: dispatch add to cart
                  }}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    // TODO: dispatch add to wishlist
                  }}
                >
                  <Heart size={16} />
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

        <TabsContent value="description" className="mt-6 prose max-w-none">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
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
          <p className="text-muted-foreground">
            Customer reviews coming soon. — TODO
          </p>
        </TabsContent>
      </Tabs>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-2xl font-semibold">
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
