import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Swords } from "lucide-react";

interface CombatEncounter {
  id: string;
  name: string;
  type: string;
  partiesEncountered: number;
  totalParties: number;
}

export default function CombatPage() {
  const [, setLocation] = useLocation();

  const combatEncounters: CombatEncounter[] = [
    {
      id: '1',
      name: 'Shadow Beast Pack',
      type: 'Creatures',
      partiesEncountered: 3,
      totalParties: 6
    },
    {
      id: '2',
      name: 'Bandit Ambush',
      type: 'Humanoid',
      partiesEncountered: 5,
      totalParties: 6
    },
    {
      id: '3',
      name: 'River Guardian',
      type: 'Elemental',
      partiesEncountered: 2,
      totalParties: 6
    },
    {
      id: '4',
      name: 'Night Creatures',
      type: 'Creatures',
      partiesEncountered: 1,
      totalParties: 6
    },
    {
      id: '5',
      name: 'Forest Spirits',
      type: 'Magical',
      partiesEncountered: 4,
      totalParties: 6
    },
    {
      id: '6',
      name: 'Mountain Trolls',
      type: 'Creatures',
      partiesEncountered: 0,
      totalParties: 6
    },
    {
      id: '7',
      name: 'Desert Wraiths',
      type: 'Undead',
      partiesEncountered: 2,
      totalParties: 6
    }
  ];

  const handleEncounterClick = (encounterId: string) => {
    setLocation(`/combat/${encounterId}`);
  };

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
                {combatEncounters.map((encounter) => (
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
