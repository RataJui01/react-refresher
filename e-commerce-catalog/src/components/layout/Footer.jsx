import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <span className="font-display text-xl font-bold tracking-tight text-primary">
              TERRA
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Curated goods for a considered lifestyle. Quality over quantity,
              always.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/category/electronics"
                  className="hover:text-foreground"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="hover:text-foreground">
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/category/home-living"
                  className="hover:text-foreground"
                >
                  Home &amp; Living
                </Link>
              </li>
              <li>
                <Link to="/category/beauty" className="hover:text-foreground">
                  Beauty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@terra-shop.com</li>
              <li>+66 2 000 0000</li>
              <li>Mon–Fri, 9:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Terra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
