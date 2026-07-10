import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  const { id, name, brand, price, originalPrice, rating, reviewCount, inStock, images } =
    product;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-background transition-shadow hover:shadow-md">
      <Link to={`/product/${id}`} className="relative overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <span className="rounded-full bg-background px-3 py-1 text-sm font-medium text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}
        {originalPrice && (
          <Badge className="absolute left-3 top-3 bg-destructive text-destructive-foreground">
            Sale
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {brand}
            </p>
            <Link to={`/product/${id}`}>
              <h3 className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug hover:text-primary">
                {name}
              </h3>
            </Link>
          </div>
        </div>

        <Rating value={rating} count={reviewCount} size={14} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <span className="text-base font-semibold">฿{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ฿{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant="outline"
            disabled={!inStock}
            onClick={() => {
              // TODO: dispatch add to cart
            }}
            className="shrink-0"
          >
            <ShoppingCart size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
