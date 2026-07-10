import { FileQuestion } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";

export default function NotFoundPage() {
  return (
    <EmptyState
      icon={FileQuestion}
      heading="404 — Page not found"
      subtext="The page you're looking for doesn't exist or has been moved."
      actionLabel="Go home"
      actionTo="/"
    />
  );
}
