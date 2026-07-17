import { useMemo, useState } from "react";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Rating from "@/components/product/Rating";
import EmptyState from "@/components/common/EmptyState";
import { getReviewsByProductId, getRatingBreakdown } from "@/data/reviews";

const VISIBLE_COUNT = 3;

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ReviewItem({ review, voted, onToggleVote }) {
  const helpfulCount = review.helpfulCount + (voted ? 1 : 0);

  return (
    <div className="flex flex-col gap-2 py-6 first:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
            {review.initials}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{review.author}</span>
            {review.verified && (
              <Badge variant="secondary">Verified Purchase</Badge>
            )}
          </div>
        </div>
        <span className="text-sm text-muted-foreground">
          {formatDate(review.date)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Rating value={review.rating} size={14} />
        <span className="font-medium">{review.title}</span>
      </div>

      <p className="leading-relaxed text-muted-foreground">{review.body}</p>

      <Button
        variant="ghost"
        size="sm"
        className={`w-fit ${voted ? "text-primary" : "text-muted-foreground"}`}
        aria-pressed={voted}
        onClick={onToggleVote}
      >
        <ThumbsUp size={14} className={voted ? "fill-current" : ""} />
        Helpful ({helpfulCount})
      </Button>
    </div>
  );
}

export default function CustomerReviews({ rating, reviewCount, productId }) {
  const [sortBy, setSortBy] = useState("recent");
  const [expanded, setExpanded] = useState(false);
  const [votedIds, setVotedIds] = useState(() => new Set());

  const reviews = useMemo(
    () => getReviewsByProductId(productId, rating),
    [productId, rating],
  );
  const breakdown = useMemo(
    () => getRatingBreakdown(rating, reviewCount),
    [rating, reviewCount],
  );

  const sortedReviews = useMemo(() => {
    const arr = [...reviews];
    switch (sortBy) {
      case "highest":
        return arr.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return arr.sort((a, b) => a.rating - b.rating);
      case "helpful":
        return arr.sort((a, b) => b.helpfulCount - a.helpfulCount);
      case "recent":
      default:
        return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [reviews, sortBy]);

  const visibleReviews = expanded
    ? sortedReviews
    : sortedReviews.slice(0, VISIBLE_COUNT);

  function toggleVote(id) {
    setVotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  if (!reviewCount) {
    return (
      <EmptyState
        icon={MessageSquare}
        heading="No reviews yet"
        subtext="Be the first to share what you think about this product."
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center gap-2 text-center lg:items-start lg:text-left">
          <span className="font-display text-5xl font-bold">
            {rating.toFixed(1)}
          </span>
          <Rating value={rating} size={20} />
          <span className="text-sm text-muted-foreground">
            Based on {reviewCount.toLocaleString()} reviews
          </span>
        </div>

        <div className="flex w-full flex-col gap-2">
          {breakdown.map(({ star, pct }) => (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="w-3 shrink-0 font-medium">{star}</span>
              <Star size={12} className="shrink-0 fill-yellow-400 text-yellow-400" />
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-yellow-400"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-muted-foreground">
                {pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mt-8" />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-xl font-semibold">
          {reviewCount.toLocaleString()} Reviews
        </h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 flex flex-col divide-y">
        {visibleReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            voted={votedIds.has(review.id)}
            onToggleVote={() => toggleVote(review.id)}
          />
        ))}
      </div>

      {!expanded && sortedReviews.length > VISIBLE_COUNT && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => setExpanded(true)}>
            Show more reviews
          </Button>
        </div>
      )}
    </div>
  );
}
