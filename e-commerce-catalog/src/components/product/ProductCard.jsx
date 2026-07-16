import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Rating from "./Rating";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    rating,
    reviewCount,
    inStock,
    images,
  } = product;

  const navigate = useNavigate();
  const { state: cartItems, dispatch } = useCart();
  const { state: wishlist, dispatch: wishlistDispatch } = useWishlist();
  const isWishlisted = wishlist.includes(id);
  const isInCart = cartItems.some((item) => item.productId === id);

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
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            Sale
          </Badge>
        )}
        <button
          type="button"
          aria-label="Toggle wishlist"
          aria-pressed={isWishlisted}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            wishlistDispatch({ type: "TOGGLE_ITEM", productId: id });
          }}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-destructive text-destructive" : "text-foreground"}
          />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {brand}
            </p>
            <Link to={`/product/${id}`}>
              <h3 className="mt-0.5 line-clamp-2 text-sm leading-snug font-medium hover:text-primary">
                {name}
              </h3>
            </Link>
          </div>
        </div>

        <Rating value={rating} count={reviewCount} size={14} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <span className="text-base font-semibold">
              ฿{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ฿{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant={isInCart ? "default" : "outline"}
            disabled={!inStock}
            onClick={() =>
              isInCart
                ? navigate("/cart")
                : dispatch({ type: "ADD_ITEM", productId: id })
            }
            className="shrink-0"
          >
            {isInCart ? <Check size={14} /> : <ShoppingCart size={14} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
