import { useState, useEffect, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import PartyPathTracker, { type Encounter } from "@/components/PartyPathTracker";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Party, Encounter as DBEncounter } from "@shared/schema";

export default function PartyPathsPage() {
  const [selectedParty, setSelectedParty] = useState<string>("");
  
  const { data: parties, isLoading: partiesLoading } = useQuery<Party[]>({
    queryKey: ['/api/parties'],
  });

  const { data: allEncounters, isLoading: encountersLoading } = useQuery<DBEncounter[]>({
    queryKey: ['/api/encounters'],
  });

  useEffect(() => {
    if (parties && parties.length > 0 && !selectedParty) {
      setSelectedParty(parties[0].name);
    }
  }, [parties, selectedParty]);

  const updateEncounterMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<DBEncounter> }) => {
      const res = await apiRequest('PATCH', `/api/encounters/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/encounters'] });
    },
  });

  const selectedPartyData = useMemo(() => {
    if (!parties || !selectedParty) return null;
    return parties.find(p => p.name === selectedParty);
  }, [parties, selectedParty]);

  const partyEncounters = useMemo(() => {
    if (!allEncounters || !selectedPartyData) return [];
    return allEncounters.filter(e => e.partyId === selectedPartyData.id);
  }, [allEncounters, selectedPartyData]);

  const handleUpdateEncounter = (id: string, updates: Partial<Encounter>) => {
    updateEncounterMutation.mutate({ id, updates });
  };

  const handleAddNote = (note: string) => {
    console.log("Ad hoc note for", selectedParty, ":", note);
  };

  const isLoading = partiesLoading || encountersLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold" data-testid="heading-party-paths">Party Paths</h1>
          <p className="text-muted-foreground">Track encounter completion and add staff notes</p>
        </div>

        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-party-paths">Party Paths</h1>
        <p className="text-muted-foreground">Track encounter completion and add staff notes</p>
      </div>

      <div className="max-w-xs">
        <Label htmlFor="party-select" className="mb-2 block">Select Party</Label>
        <Select value={selectedParty} onValueChange={setSelectedParty}>
          <SelectTrigger id="party-select" data-testid="select-party-path">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {parties?.map(party => (
              <SelectItem key={party.id} value={party.name}>{party.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedParty && (
        <PartyPathTracker
          party={selectedParty}
          encounters={partyEncounters}
          onUpdateEncounter={handleUpdateEncounter}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}
