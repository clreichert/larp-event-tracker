import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Circle, AlertCircle, Swords } from "lucide-react";
import { useLocation } from "wouter";

interface PartyStatus {
  party: string;
  totalEncounters: number;
  completedEncounters: number;
  totalCombat: number;
  completedCombat: number;
  openIssues: {
    id: string;
    type: string;
    priority: "Low" | "High";
    status: string;
    situation: string;
  }[];
  recentActivity: {
    id: string;
    description: string;
    timestamp: Date;
  }[];
}

interface PartyDashboardProps {
  parties: PartyStatus[];
}

export default function PartyDashboard({ parties }: PartyDashboardProps) {
  const [, setLocation] = useLocation();

  const handlePartyClick = (party: string) => {
    setLocation(`/party/${party}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {parties.map((party) => {
        const completionPercent = (party.completedEncounters / party.totalEncounters) * 100;
        const hasHighPriorityIssues = party.openIssues.some(i => i.priority === "High");

        return (
          <Card 
            key={party.party} 
            className="hover-elevate cursor-pointer"
            onClick={() => handlePartyClick(party.party)}
            data-testid={`card-party-${party.party}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {party.party}
                  {hasHighPriorityIssues && (
                    <Badge variant="destructive" className="text-xs">
                      High Priority
                    </Badge>
                  )}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {party.completedEncounters}/{party.totalEncounters} Complete
                </span>
              </div>
              <Progress value={completionPercent} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Encounter Progress</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-chart-2" />
                      <span className="text-muted-foreground">
                        {party.completedEncounters} completed
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Circle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {party.totalEncounters - party.completedEncounters} remaining
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Combat Encounters</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Swords className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {party.completedCombat}/{party.totalCombat} complete
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Open Issues ({party.openIssues.length})
                </h4>
                {party.openIssues.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No open issues</p>
                ) : (
                  <ScrollArea className="h-32">
                    <div className="space-y-2">
                      {party.openIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className="p-2 rounded-md bg-muted/30 text-sm"
                          data-testid={`issue-summary-${issue.id}`}
                        >
                          <div className="flex items-start gap-2 mb-1">
                            <Badge 
                              variant={issue.priority === "High" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {issue.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {issue.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {issue.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">
                            {issue.situation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">Recent Activity</h4>
                {party.recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                ) : (
                  <div className="space-y-1">
                    {party.recentActivity.slice(0, 3).map((activity) => (
                      <p key={activity.id} className="text-xs text-muted-foreground">
                        • {activity.description}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
