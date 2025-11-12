import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Swords, Plus } from "lucide-react";

export interface CombatEncounter {
  id: string;
  name: string;
  completed: boolean;
  notes: string;
}

interface CombatTrackerProps {
  party: string;
  combatEncounters: CombatEncounter[];
  onUpdateCombat?: (id: string, updates: Partial<CombatEncounter>) => void;
  onAddCombat?: (name: string) => void;
}

export default function CombatTracker({ party, combatEncounters, onUpdateCombat, onAddCombat }: CombatTrackerProps) {
  const [newCombatName, setNewCombatName] = useState("");

  const handleAddCombat = () => {
    if (newCombatName.trim()) {
      onAddCombat?.(newCombatName);
      setNewCombatName("");
      console.log("Added combat encounter:", newCombatName);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Swords className="h-5 w-5" />
          {party} - Combat Encounters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {combatEncounters.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No combat encounters logged yet
            </p>
          ) : (
            combatEncounters.map((combat, index) => (
              <div key={combat.id}>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={`combat-${combat.id}`}
                      checked={combat.completed}
                      onCheckedChange={(checked) => 
                        onUpdateCombat?.(combat.id, { completed: checked as boolean })
                      }
                      className="mt-1"
                      data-testid={`checkbox-combat-${combat.id}`}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={`combat-${combat.id}`}
                        className={`text-base font-medium cursor-pointer ${
                          combat.completed ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {combat.name}
                      </Label>
                      <Textarea
                        placeholder="Notes about this combat..."
                        value={combat.notes}
                        onChange={(e) => onUpdateCombat?.(combat.id, { notes: e.target.value })}
                        className="min-h-16 text-sm mt-2"
                        data-testid={`textarea-combat-notes-${combat.id}`}
                      />
                    </div>
                  </div>
                </div>
                {index < combatEncounters.length - 1 && <Separator className="my-4" />}
              </div>
            ))
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <Label htmlFor="new-combat" className="text-sm font-semibold">Add New Combat Encounter</Label>
          <div className="flex gap-2">
            <Input
              id="new-combat"
              placeholder="e.g., Wolven battle, Bandits on road..."
              value={newCombatName}
              onChange={(e) => setNewCombatName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCombat()}
              data-testid="input-new-combat"
            />
            <Button onClick={handleAddCombat} data-testid="button-add-combat">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
