import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const RATING_OPTIONS = [
  { label: "Any rating", value: "" },
  { label: "4 stars & up", value: "4" },
  { label: "3 stars & up", value: "3" },
  { label: "2 stars & up", value: "2" },
];

/**
 * All filter state lives in the URL. No actual filtering applied here —
 * CategoryPage/SearchResultsPage always shows the full product list (TODO).
 *
 * @param {{ brands: string[] }} props
 */
export default function FilterSidebar({ brands = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
  const selectedBrands = searchParams.getAll("brand");
  const minRating = searchParams.get("minRating") ?? "";
  const inStock = searchParams.get("inStock") === "1";

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [syncedPrice, setSyncedPrice] = useState([minPrice, maxPrice]);

  if (syncedPrice[0] !== minPrice || syncedPrice[1] !== maxPrice) {
    setSyncedPrice([minPrice, maxPrice]);
    setPriceRange([minPrice, maxPrice]);
  }

  const update = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === null || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.delete("page");
    setSearchParams(next);
  };

  const toggleBrand = (brand) => {
    const next = new URLSearchParams(searchParams);
    const current = next.getAll("brand");
    next.delete("brand");
    if (current.includes(brand)) {
      current
        .filter((b) => b !== brand)
        .forEach((b) => next.append("brand", b));
    } else {
      [...current, brand].forEach((b) => next.append("brand", b));
    }
    next.delete("page");
    setSearchParams(next);
  };

  const clearAll = () => {
    const next = new URLSearchParams(searchParams);
    ["minPrice", "maxPrice", "brand", "minRating", "inStock", "page"].forEach(
      (k) => next.delete(k),
    );
    setSearchParams(next);
  };

  const hasFilters =
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice") ||
    selectedBrands.length > 0 ||
    !!minRating ||
    inStock;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          disabled={!hasFilters}
        >
          Clear all
        </Button>
      </div>

      <Separator />

      {/* Price range */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Price range</h4>
        <Slider
          min={0}
          max={10000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={([min, max]) => {
            const next = new URLSearchParams(searchParams);
            min > 0
              ? next.set("minPrice", String(min))
              : next.delete("minPrice");
            max < 10000
              ? next.set("maxPrice", String(max))
              : next.delete("maxPrice");
            next.delete("page");
            setSearchParams(next);
          }}
          className="w-full"
        />
        <div className="text-muted-foreground flex justify-between text-xs">
          <span>฿{priceRange[0].toLocaleString()}</span>
          <span>฿{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <Separator />

      {/* Brands */}
      {brands.length > 0 && (
        <>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Brand</h4>
            <div className="flex flex-col gap-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center gap-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />
        </>
      )}

      {/* Minimum rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Minimum rating</h4>
        <RadioGroup
          value={minRating}
          onValueChange={(val) => update("minRating", val)}
        >
          {RATING_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem value={opt.value} id={`rating-${opt.value}`} />
              <Label
                htmlFor={`rating-${opt.value}`}
                className="cursor-pointer text-sm font-normal"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* In stock only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="inStock"
          checked={inStock}
          onCheckedChange={(checked) => update("inStock", checked ? "1" : null)}
        />
        <Label htmlFor="inStock" className="cursor-pointer text-sm font-normal">
          In stock only
        </Label>
      </div>
    </div>
  );
}
