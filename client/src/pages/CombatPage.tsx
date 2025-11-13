import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";
import { Swords } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { CombatEncounter, CombatCheckin, Party } from "@shared/schema";
import { useMemo } from "react";

export default function CombatPage() {
  const [, setLocation] = useLocation();

  const { data: combatEncounters, isLoading: combatLoading } = useQuery<CombatEncounter[]>({
    queryKey: ['/api/combat-encounters'],
  });

  const { data: combatCheckins, isLoading: checkinsLoading } = useQuery<CombatCheckin[]>({
    queryKey: ['/api/combat-checkins'],
  });

  const { data: parties, isLoading: partiesLoading } = useQuery<Party[]>({
    queryKey: ['/api/parties'],
  });

  const isLoading = combatLoading || checkinsLoading || partiesLoading;

  const combatWithCounts = useMemo(() => {
    if (!combatEncounters || !combatCheckins || !parties) return [];

    return combatEncounters.map(combat => {
      const encountered = combatCheckins.filter(
        c => c.combatId === combat.id && c.encountered
      ).length;

      return {
        ...combat,
        partiesEncountered: encountered,
        totalParties: parties.length,
      };
    });
  }, [combatEncounters, combatCheckins, parties]);

  const handleEncounterClick = (encounterId: string) => {
    setLocation(`/combat/${encounterId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold" data-testid="heading-combat">Combat Tracker</h1>
          <p className="text-muted-foreground">Track roaming combat encounters across all parties</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Swords className="h-5 w-5" />
              Combat Encounters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-combat">Combat Tracker</h1>
        <p className="text-muted-foreground">Track roaming combat encounters across all parties</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Swords className="h-5 w-5" />
            Combat Encounters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Encounter Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Parties Encountered</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {combatWithCounts.map((encounter) => (
                  <TableRow 
                    key={encounter.id} 
                    className="hover-elevate"
                    data-testid={`row-combat-${encounter.id}`}
                  >
                    <TableCell className="font-medium">{encounter.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{encounter.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {encounter.partiesEncountered}/{encounter.totalParties} parties
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEncounterClick(encounter.id)}
                        data-testid={`button-view-combat-${encounter.id}`}
                      >
                        Check In
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
