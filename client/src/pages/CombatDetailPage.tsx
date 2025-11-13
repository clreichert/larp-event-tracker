import { useMemo } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Swords } from "lucide-react";
import { getPartyColor } from "@/lib/partyColors";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CombatEncounter, Party, CombatCheckin } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface PartyCheckin {
  id: string;
  party: string;
  partyId: string;
  encountered: boolean;
  notes: string;
}

export default function CombatDetailPage() {
  const [, params] = useRoute("/combat/:combatId");
  const [, setLocation] = useLocation();
  const combatId = params?.combatId || "";
  const { toast } = useToast();

  const { data: combatEncounters, isLoading: combatLoading } = useQuery<CombatEncounter[]>({
    queryKey: ['/api/combat-encounters'],
  });

  const { data: parties, isLoading: partiesLoading } = useQuery<Party[]>({
    queryKey: ['/api/parties'],
  });

  const { data: checkins, isLoading: checkinsLoading } = useQuery<CombatCheckin[]>({
    queryKey: ['/api/combat-checkins', combatId],
    enabled: !!combatId,
  });

  const combat = useMemo(() => {
    return combatEncounters?.find(c => c.id === combatId);
  }, [combatEncounters, combatId]);

  const updateCheckinMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CombatCheckin> }) => {
      const res = await apiRequest('PATCH', `/api/combat-checkins/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/combat-checkins'] });
      queryClient.invalidateQueries({ queryKey: ['/api/combat-checkins', combatId] });
    },
  });

  const partyCheckins = useMemo((): PartyCheckin[] => {
    if (!parties || !checkins) return [];

    return parties.map(party => {
      const checkin = checkins.find(c => c.partyId === party.id && c.combatId === combatId);
      return {
        id: checkin?.id || '',
        party: party.name,
        partyId: party.id,
        encountered: checkin?.encountered || false,
        notes: checkin?.notes || '',
      };
    });
  }, [parties, checkins, combatId]);

  const isLoading = combatLoading || partiesLoading || checkinsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div>
          <Skeleton className="h-10 w-96 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Party Check-In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!combat) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/combat')}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Combat Tracker
        </Button>
        <p className="text-muted-foreground">Combat encounter not found</p>
      </div>
    );
  }

  const handleToggleParty = (checkinId: string, currentValue: boolean) => {
    if (!checkinId) {
      toast({
        title: "Error",
        description: "Checkin not found",
        variant: "destructive",
      });
      return;
    }
    updateCheckinMutation.mutate({ id: checkinId, updates: { encountered: !currentValue } });
  };

  const handleNotesChange = (checkinId: string, notes: string) => {
    if (!checkinId) return;
    updateCheckinMutation.mutate({ id: checkinId, updates: { notes } });
  };

  const encounteredCount = partyCheckins.filter(pc => pc.encountered).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/combat')}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Combat Tracker
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-semibold flex items-center gap-3" data-testid={`heading-combat-${combatId}`}>
          <Swords className="h-8 w-8" />
          {combat.name}
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <Badge variant="outline">{combat.type}</Badge>
          <p className="text-muted-foreground">
            {encounteredCount} of {partyCheckins.length} parties encountered
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Party Check-In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {partyCheckins.map((partyCheckin) => {
            const colors = getPartyColor(partyCheckin.party);
            return (
              <div 
                key={partyCheckin.party}
                className={`p-4 rounded-lg border border-l-4 ${colors.border}`}
                data-testid={`party-checkin-${partyCheckin.party}`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`party-${partyCheckin.party}`}
                    checked={partyCheckin.encountered}
                    onCheckedChange={() => handleToggleParty(partyCheckin.id, partyCheckin.encountered)}
                    data-testid={`checkbox-party-${partyCheckin.party}`}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <Label 
                      htmlFor={`party-${partyCheckin.party}`}
                      className={`text-base font-semibold cursor-pointer ${colors.text}`}
                    >
                      {partyCheckin.party}
                    </Label>
                    <Textarea
                      id={`notes-${partyCheckin.party}`}
                      value={partyCheckin.notes}
                      onChange={(e) => handleNotesChange(partyCheckin.id, e.target.value)}
                      placeholder="Notes (optional)"
                      className="min-h-16"
                      data-testid={`textarea-notes-${partyCheckin.party}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          onClick={() => setLocation('/combat')}
          data-testid="button-cancel"
        >
          Cancel
        </Button>
        <Button 
          onClick={() => setLocation('/combat')}
          data-testid="button-save"
          disabled={updateCheckinMutation.isPending}
        >
          {updateCheckinMutation.isPending ? 'Saving...' : 'Back to Combat Tracker'}
        </Button>
      </div>
    </div>
  );
}
