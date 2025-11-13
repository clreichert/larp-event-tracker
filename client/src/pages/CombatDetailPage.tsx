import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Swords } from "lucide-react";
import { getPartyColor } from "@/lib/partyColors";

const PARTIES = ["Arden", "Clairia", "P'Loa", "Uri-Kesh", "Doloron", "Sythwan", "Noctara", "Keer", "Waylon", "Elsewhich", "Glendeep"];

interface PartyEncounter {
  party: string;
  encountered: boolean;
  notes: string;
}

export default function CombatDetailPage() {
  const [, params] = useRoute("/combat/:combatId");
  const [, setLocation] = useLocation();
  const combatId = params?.combatId || "";

  // Mock data - would come from API in real implementation
  const combatData: Record<string, { name: string; type: string }> = {
    '1': { name: 'Shadow Beast Pack', type: 'Creatures' },
    '2': { name: 'Bandit Ambush', type: 'Humanoid' },
    '3': { name: 'River Guardian', type: 'Elemental' },
    '4': { name: 'Night Creatures', type: 'Creatures' },
    '5': { name: 'Forest Spirits', type: 'Magical' },
    '6': { name: 'Mountain Trolls', type: 'Creatures' },
    '7': { name: 'Desert Wraiths', type: 'Undead' }
  };

  // Initialize with existing data (mock)
  const initialData: Record<string, PartyEncounter[]> = {
    '1': PARTIES.map(party => ({
      party,
      encountered: ['Arden', 'Clairia', 'Uri-Kesh'].includes(party),
      notes: party === 'Arden' ? 'Party handled well, good teamwork. -CR' : 
             party === 'Clairia' ? 'Close call but they managed. -JS' : ''
    })),
    '2': PARTIES.map(party => ({
      party,
      encountered: ['Arden', 'Clairia', 'P\'Loa', 'Uri-Kesh', 'Doloron'].includes(party),
      notes: party === 'P\'Loa' ? 'Struggled a bit but pulled through.' : ''
    })),
    '3': PARTIES.map(party => ({
      party,
      encountered: ['Arden', 'Uri-Kesh'].includes(party),
      notes: ''
    }))
  };

  const [partyEncounters, setPartyEncounters] = useState<PartyEncounter[]>(
    initialData[combatId] || PARTIES.map(party => ({
      party,
      encountered: false,
      notes: ''
    }))
  );

  const combat = combatData[combatId];

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

  const handleToggleParty = (partyName: string) => {
    setPartyEncounters(prev =>
      prev.map(pe =>
        pe.party === partyName
          ? { ...pe, encountered: !pe.encountered }
          : pe
      )
    );
  };

  const handleNotesChange = (partyName: string, notes: string) => {
    setPartyEncounters(prev =>
      prev.map(pe =>
        pe.party === partyName
          ? { ...pe, notes }
          : pe
      )
    );
  };

  const handleSave = () => {
    console.log('Saving combat data:', { combatId, partyEncounters });
    setLocation('/combat');
  };

  const encounteredCount = partyEncounters.filter(pe => pe.encountered).length;

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
            {encounteredCount} of {PARTIES.length} parties encountered
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Party Check-In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {partyEncounters.map((partyEncounter) => {
            const colors = getPartyColor(partyEncounter.party);
            return (
              <div 
                key={partyEncounter.party}
                className={`p-4 rounded-lg border border-l-4 ${colors.border}`}
                data-testid={`party-checkin-${partyEncounter.party}`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`party-${partyEncounter.party}`}
                    checked={partyEncounter.encountered}
                    onCheckedChange={() => handleToggleParty(partyEncounter.party)}
                    data-testid={`checkbox-party-${partyEncounter.party}`}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <Label 
                      htmlFor={`party-${partyEncounter.party}`}
                      className={`text-base font-semibold cursor-pointer ${colors.text}`}
                    >
                      {partyEncounter.party}
                    </Label>
                    <Textarea
                      id={`notes-${partyEncounter.party}`}
                      value={partyEncounter.notes}
                      onChange={(e) => handleNotesChange(partyEncounter.party, e.target.value)}
                      placeholder="Notes (optional)"
                      className="min-h-16"
                      data-testid={`textarea-notes-${partyEncounter.party}`}
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
          onClick={handleSave}
          data-testid="button-save"
        >
          Save Check-In
        </Button>
      </div>
    </div>
  );
}
