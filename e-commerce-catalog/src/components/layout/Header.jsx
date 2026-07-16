import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { label: "Electronics", to: "/category/electronics" },
  { label: "Fashion", to: "/category/fashion" },
  { label: "Home & Living", to: "/category/home-living" },
  { label: "Beauty", to: "/category/beauty" },
];

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 font-display text-xl font-bold tracking-tight text-primary"
        >
          TERRA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="ml-auto hidden flex-1 items-center gap-2 md:flex"
        >
          <div className="relative max-w-sm flex-1">
            <Search
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-9"
            />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        {/* Wishlist */}
        <Button asChild variant="ghost" size="icon" className="relative">
          <Link to="/wishlist">
            <Heart size={20} />
            {wishlistState.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 justify-center rounded-full px-1 text-xs">
                {wishlistState.length}
              </Badge>
            )}
          </Link>
        </Button>

        {/* Cart */}
        <Button asChild variant="ghost" size="icon" className="relative">
          <Link to="/cart">
            <ShoppingCart size={20} />
            {state.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 justify-center rounded-full px-1 text-xs">
                {state.reduce((total, item) => total + item.qty, 0)}
              </Badge>
            )}
          </Link>
        </Button>

        {/* Mobile menu trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left font-display text-primary">
                TERRA
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-6">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Search size={16} />
                </Button>
              </form>

              {/* Mobile nav */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Wishlist ({wishlistState.length})
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Cart ({state.reduce((total, item) => total + item.qty, 0)})
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
