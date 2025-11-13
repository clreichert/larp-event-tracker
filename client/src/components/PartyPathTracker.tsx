import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle2, Circle, Plus } from "lucide-react";

export interface Encounter {
  id: string;
  name: string;
  time?: string | null;
  location?: string | null;
  activity: string | null;
  item?: string | null;
  completed: boolean;
  notes: string | null;
}

interface PartyPathTrackerProps {
  party: string;
  encounters: Encounter[];
  onUpdateEncounter?: (id: string, updates: Partial<Encounter>) => void;
  onAddNote?: (note: string) => void;
}

export default function PartyPathTracker({ party, encounters, onUpdateEncounter, onAddNote }: PartyPathTrackerProps) {
  const [adHocNote, setAdHocNote] = useState("");

  const handleAddNote = () => {
    if (adHocNote.trim()) {
      onAddNote?.(adHocNote);
      setAdHocNote("");
      console.log("Added ad hoc note:", adHocNote);
    }
  };

  const handleEncounterClick = (encounter: Encounter) => {
    console.log("Open encounter detail:", encounter);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Character</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {encounters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
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
                  <TableCell className="text-sm text-muted-foreground">
                    {encounter.time || '—'}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {encounter.activity}
                    </p>
                  </TableCell>
                  <TableCell>
                    {encounter.item ? (
                      <Badge variant="default" className="text-xs">
                        {encounter.item}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEncounterClick(encounter)}
                      data-testid={`button-update-${encounter.id}`}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Ad Hoc Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adhoc-note">Add a note not related to specific encounters</Label>
            <Textarea
              id="adhoc-note"
              placeholder="E.g., general party observations, unplanned interactions, staff communications..."
              value={adHocNote}
              onChange={(e) => setAdHocNote(e.target.value)}
              className="min-h-24"
              data-testid="textarea-adhoc-note"
            />
          </div>
          <Button onClick={handleAddNote} data-testid="button-add-adhoc-note">
            Add Note
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
