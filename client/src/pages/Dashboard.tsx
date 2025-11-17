import PartyDashboard, { type PartyStatus } from "@/components/PartyDashboard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Party, Issue, Encounter, CombatCheckin } from "@shared/schema";
import { useMemo } from "react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  const { data: parties, isLoading: partiesLoading } = useQuery<Party[]>({
    queryKey: ['/api/parties'],
  });

  const { data: issues, isLoading: issuesLoading } = useQuery<Issue[]>({
    queryKey: ['/api/issues'],
  });

  const { data: encounters, isLoading: encountersLoading } = useQuery<Encounter[]>({
    queryKey: ['/api/encounters'],
  });

  const { data: combatCheckins, isLoading: combatCheckinsLoading } = useQuery<CombatCheckin[]>({
    queryKey: ['/api/combat-checkins'],
  });

  const isLoading = partiesLoading || issuesLoading || encountersLoading || combatCheckinsLoading;

  const dashboardData = useMemo<PartyStatus[]>(() => {
    if (!parties || !issues || !encounters || !combatCheckins) {
      return [];
    }

    return parties.map<PartyStatus>(party => {
      const partyEncounters = encounters.filter(e => e.partyId === party.id);
      const partyIssues = issues.filter(i => i.party === party.name && i.status !== 'Resolved');
      const partyCombatCheckins = combatCheckins.filter(c => c.partyId === party.id);

      return {
        party: party.name,
        totalEncounters: partyEncounters.length,
        completedEncounters: partyEncounters.filter(e => e.completed).length,
        totalCombat: partyCombatCheckins.length,
        completedCombat: partyCombatCheckins.filter(c => c.encountered).length,
        openIssues: partyIssues,
        recentActivity: [],
      };
    });
  }, [parties, issues, encounters, combatCheckins]);

  const totalIssues = dashboardData.reduce((sum, p) => sum + p.openIssues.length, 0);
  const highPriorityIssues = dashboardData.reduce((sum, p) => 
    sum + p.openIssues.filter(i => i.priority === 'High').length, 0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-dashboard">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all party progress and issues</p>
      </div>

      {isLoading ? (
        <>
          <Card className="p-6 max-w-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-16" />
              </div>
              <Skeleton className="h-12 w-12 rounded-md" />
            </div>
          </Card>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </>
      ) : (
        <>
          <Card 
            className="p-6 hover-elevate cursor-pointer max-w-sm"
            onClick={() => setLocation('/issues')}
            data-testid="widget-open-issues"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Issues</p>
                <p className="text-4xl font-semibold mt-2" data-testid="metric-open-issues">
                  {totalIssues}
                </p>
                {highPriorityIssues > 0 && (
                  <p className="text-sm text-destructive mt-1">
                    {highPriorityIssues} high priority
                  </p>
                )}
              </div>
              <div className="h-12 w-12 rounded-md bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </Card>

          <PartyDashboard parties={dashboardData} />
        </>
      )}
    </div>
  );
}
