import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Clock, MapPin, Package, Plus } from "lucide-react";

export interface Encounter {
  id: string;
  name: string;
  time?: string;
  location?: string;
  activity: string;
  item?: string;
  completed: boolean;
  notes: string;
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{party} - Party Path</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {encounters.map((encounter, index) => (
                <div key={encounter.id}>
                  <div className="space-y-3 p-4 rounded-md border bg-card">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`encounter-${encounter.id}`}
                        checked={encounter.completed}
                        onCheckedChange={(checked) => 
                          onUpdateEncounter?.(encounter.id, { completed: checked as boolean })
                        }
                        className="mt-1"
                        data-testid={`checkbox-encounter-${encounter.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={`encounter-${encounter.id}`}
                          className={`text-base font-semibold cursor-pointer ${
                            encounter.completed ? 'line-through text-muted-foreground' : ''
                          }`}
                        >
                          {encounter.name}
                        </Label>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {encounter.time && (
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {encounter.time}
                            </Badge>
                          )}
                          {encounter.location && (
                            <Badge variant="secondary" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {encounter.location}
                            </Badge>
                          )}
                          {encounter.item && (
                            <Badge variant="default" className="text-xs">
                              <Package className="h-3 w-3 mr-1" />
                              {encounter.item}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mt-2">
                          {encounter.activity}
                        </p>

                        <div className="mt-3 space-y-2">
                          <Label htmlFor={`notes-${encounter.id}`} className="text-xs">Staff Notes</Label>
                          <Textarea
                            id={`notes-${encounter.id}`}
                            placeholder="Add notes about this encounter..."
                            value={encounter.notes}
                            onChange={(e) => onUpdateEncounter?.(encounter.id, { notes: e.target.value })}
                            className="min-h-20 text-sm"
                            data-testid={`textarea-notes-${encounter.id}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < encounters.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

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
