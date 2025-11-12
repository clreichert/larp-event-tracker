import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CombatTracker, { type CombatEncounter } from "@/components/CombatTracker";

const PARTIES = ["Arden", "Clairia", "P'Loa", "Uri-Kesh", "Doloron", "Sythwan", "Noctara", "Keer", "Waylon", "Elsewhich", "Glendeep"];

const INITIAL_COMBAT: Record<string, CombatEncounter[]> = {
  "Arden": [
    {
      id: '1',
      name: 'Nix Valerius Combat',
      completed: true,
      notes: 'Party handled well, good teamwork. -CR'
    },
    {
      id: '2',
      name: 'Pascal Valerius Challenge',
      completed: false,
      notes: ''
    }
  ],
  "Clairia": [
    {
      id: '1',
      name: 'Peacock Site Combat',
      completed: false,
      notes: ''
    }
  ]
};

export default function CombatPage() {
  const [selectedParty, setSelectedParty] = useState<string>("Arden");
  const [combatByParty, setCombatByParty] = useState<Record<string, CombatEncounter[]>>(INITIAL_COMBAT);

  const currentCombat = combatByParty[selectedParty] || [];

  const handlePartyChange = (party: string) => {
    setSelectedParty(party);
  };

  const handleUpdateCombat = (id: string, updates: Partial<CombatEncounter>) => {
    setCombatByParty(prev => ({
      ...prev,
      [selectedParty]: (prev[selectedParty] || []).map(combat =>
        combat.id === id ? { ...combat, ...updates } : combat
      )
    }));
  };

  const handleAddCombat = (name: string) => {
    const newCombat: CombatEncounter = {
      id: Date.now().toString(),
      name,
      completed: false,
      notes: ''
    };
    setCombatByParty(prev => ({
      ...prev,
      [selectedParty]: [...(prev[selectedParty] || []), newCombat]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-combat">Combat Tracker</h1>
        <p className="text-muted-foreground">Track combat encounters not listed in the handbook</p>
      </div>

      <div className="max-w-xs">
        <Label htmlFor="party-select" className="mb-2 block">Select Party</Label>
        <Select value={selectedParty} onValueChange={handlePartyChange}>
          <SelectTrigger id="party-select" data-testid="select-combat-party">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PARTIES.map(party => (
              <SelectItem key={party} value={party}>{party}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <CombatTracker
        party={selectedParty}
        combatEncounters={currentCombat}
        onUpdateCombat={handleUpdateCombat}
        onAddCombat={handleAddCombat}
      />
    </div>
  );
}
