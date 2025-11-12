import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  category?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxHeight?: string;
}

export default function ActivityFeed({ activities, maxHeight = "400px" }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }}>
          <div className="space-y-1 px-6 pb-6">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`p-4 rounded-md hover-elevate ${
                  index % 2 === 0 ? 'bg-muted/30' : ''
                }`}
                data-testid={`activity-${activity.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{activity.type}</span>
                      {activity.category && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.category}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
