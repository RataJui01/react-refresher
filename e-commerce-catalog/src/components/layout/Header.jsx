import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
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
          className="font-display text-xl font-bold tracking-tight text-primary shrink-0"
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
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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

        {/* Cart */}
        <Button asChild variant="ghost" size="icon" className="relative">
          <Link to="/cart">
            <ShoppingCart size={20} />
            {/* Hardcoded badge — TODO: sync with global cart state */}
            <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-xs">
              2
            </Badge>
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
              <SheetTitle className="font-display text-left text-primary">
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
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Cart (2)
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
