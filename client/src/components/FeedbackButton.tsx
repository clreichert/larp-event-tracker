import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useLocation } from "wouter";

const FEATURE_MAP: Record<string, string> = {
  "/": "Dashboard",
  "/issues": "Issues Tracker",
  "/party-paths": "Party Paths",
  "/combat": "Combat Tracker",
  "/colors": "Design",
  "/feedback": "Design",
};

export function FeedbackButton() {
  const [location, setLocation] = useLocation();

  const handleFeedback = () => {
    const baseRoute = location.split("/")[1] ? `/${location.split("/")[1]}` : "/";
    const feature = FEATURE_MAP[baseRoute] || "Dashboard";
    setLocation(`/feedback/new?feature=${encodeURIComponent(feature)}`);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleFeedback}
      data-testid="button-global-feedback"
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      Feedback
    </Button>
  );
}
