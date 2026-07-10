import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EmptyState from "@/components/common/EmptyState";

// Hardcoded initial cart items — TODO: replace with global cart state
const INITIAL_ITEMS = [
  { productId: "p1", qty: 1 },
  { productId: "p4", qty: 2 },
];

const SHIPPING_THRESHOLD = 1500;
const SHIPPING_FEE = 150;

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const cartItems = items
    .map(({ productId, qty }) => {
      const product = getProductById(productId);
      return product ? { product, qty } : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0
  );
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const updateQty = (productId, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="font-display mb-8 text-3xl font-bold">Your cart</h1>
        <EmptyState
          icon={ShoppingBag}
          heading="Your cart is empty"
          subtext="Add some items to get started."
          actionLabel="Browse products"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display mb-8 text-3xl font-bold">Your cart</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Cart items */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {cartItems.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl border bg-background p-4"
            >
              <Link to={`/product/${product.id}`} className="shrink-0">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {product.brand}
                    </p>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm font-medium leading-snug hover:text-primary"
                    >
                      {product.name}
                    </Link>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Qty stepper */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQty(product.id, -1)}
                      disabled={qty <= 1}
                    >
                      <Minus size={12} />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {qty}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQty(product.id, 1)}
                    >
                      <Plus size={12} />
                    </Button>
                  </div>

                  <span className="text-sm font-semibold">
                    ฿{(product.price * qty).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-xl border bg-background p-6 lg:sticky lg:top-24">
          <h2 className="font-display mb-4 text-lg font-semibold">
            Order summary
          </h2>
          <Separator className="mb-4" />

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              {shipping === 0 ? (
                <span className="font-medium text-green-600">Free</span>
              ) : (
                <span>฿{shipping.toLocaleString()}</span>
              )}
            </div>
            {shipping > 0 && (
              <p className="text-xs text-muted-foreground">
                Add ฿{(SHIPPING_THRESHOLD - subtotal).toLocaleString()} more
                for free shipping
              </p>
            )}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>฿{total.toLocaleString()}</span>
          </div>

          <Button className="mt-6 w-full" size="lg">
            Proceed to checkout
            {/* TODO: implement checkout flow */}
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Secure checkout · 30-day returns
          </p>
        </div>
      </div>
    </div>
  );
}
