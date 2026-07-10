import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { categories, getAllProducts } from "@/data/products";

const categoryIcons = {
  electronics: "⚡",
  fashion: "✦",
  "home-living": "⌂",
  beauty: "✿",
};

export default function HomePage() {
  const trending = getAllProducts().slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              New arrivals
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Objects worth
              <br />
              <span className="text-primary">living with.</span>
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Thoughtfully curated goods from independent makers and heritage
              brands — things built to last.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/category/electronics">
                  Shop Electronics <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/category/fashion">Explore Fashion</Link>
              </Button>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="w-full max-w-md overflow-hidden rounded-2xl lg:flex-1">
            <img
              src="/hero.png"
              alt="Featured collection"
              className="h-80 w-full object-cover lg:h-96"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/hero/800/600";
              }}
            />
          </div>
        </div>
      </section>

      {/* Promo strip */}
      <div className="bg-foreground py-3 text-center text-sm text-background">
        Free shipping on orders over ฿1,500 &nbsp;·&nbsp; Easy 30-day returns
        &nbsp;·&nbsp; Secure checkout
      </div>

      {/* Category tiles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display mb-8 text-2xl font-semibold">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border bg-secondary/40 p-8 transition-all hover:border-primary/40 hover:bg-secondary"
            >
              <span className="text-4xl">{categoryIcons[cat.slug] ?? "◆"}</span>
              <div className="text-center">
                <p className="font-medium">{cat.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="bg-secondary/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">
              Trending now
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/category/electronics">
                View all <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "Free shipping",
              desc: "On orders over ฿1,500",
            },
            {
              icon: RefreshCcw,
              title: "30-day returns",
              desc: "No questions asked",
            },
            {
              icon: ShieldCheck,
              title: "Secure payment",
              desc: "Your data is protected",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
