import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";

export interface Encounter {
  id: string;
  name: string;
  completed: boolean;
  notes: string | null;
}

interface CondensedPartyPathTrackerProps {
  encounters: Encounter[];
  onUpdateEncounter?: (id: string, updates: Partial<Encounter>) => void;
}

export default function CondensedPartyPathTracker({ encounters, onUpdateEncounter }: CondensedPartyPathTrackerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialValues: Record<string, string> = {};
    encounters.forEach(enc => {
      initialValues[enc.id] = enc.notes || '';
    });
    setEditValues(initialValues);
  }, [encounters]);

  const handleNotesBlur = (encounterId: string) => {
    const newNotes = editValues[encounterId] || '';
    const encounter = encounters.find(e => e.id === encounterId);
    
    if (encounter && newNotes !== encounter.notes) {
      onUpdateEncounter?.(encounterId, { notes: newNotes });
    }
    
    setEditingId(null);
  };

  const handleNotesChange = (encounterId: string, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [encounterId]: value
    }));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Status</TableHead>
            <TableHead className="w-1/3">Character</TableHead>
            <TableHead>Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {encounters.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                No encounters found
              </TableCell>
            </TableRow>
          ) : (
            encounters.map((encounter) => (
              <TableRow 
                key={encounter.id} 
                className="hover-elevate"
                data-testid={`row-encounter-${encounter.id}`}
              >
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateEncounter?.(encounter.id, { completed: !encounter.completed });
                    }}
                    className="hover-elevate active-elevate-2 p-1 rounded"
                    data-testid={`button-toggle-status-${encounter.id}`}
                  >
                    {encounter.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-chart-2" data-testid={`status-complete-${encounter.id}`} />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" data-testid={`status-incomplete-${encounter.id}`} />
                    )}
                  </button>
                </TableCell>
                <TableCell className="font-medium">{encounter.name}</TableCell>
                <TableCell className="py-2">
                  <input
                    type="text"
                    value={editValues[encounter.id] || ''}
                    onChange={(e) => handleNotesChange(encounter.id, e.target.value)}
                    onFocus={() => setEditingId(encounter.id)}
                    onBlur={() => handleNotesBlur(encounter.id)}
                    placeholder="Add comments..."
                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 text-sm"
                    data-testid={`input-comments-${encounter.id}`}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
