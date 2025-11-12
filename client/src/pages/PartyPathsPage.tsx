import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PartyPathTracker, { type Encounter } from "@/components/PartyPathTracker";

const PARTIES = ["Arden", "Clairia", "P'Loa", "Uri-Kesh", "Doloron", "Sythwan", "Noctara", "Keer", "Waylon", "Elsewhich", "Glendeep"];

const PARTY_ENCOUNTERS: Record<string, Encounter[]> = {
  "Arden": [
    {
      id: '1',
      name: 'Aria Morgan',
      time: 'Friday night',
      location: 'Contact',
      activity: 'Introducing the party to the companion, getting comfortable interacting in the "otherworld"',
      completed: true,
      notes: 'Party met with Aria. Good introduction. -JS'
    },
    {
      id: '2',
      name: 'Ursula Smirch',
      time: 'Friday night',
      activity: 'Getting comfortable interacting in the "otherworld"',
      completed: true,
      notes: 'Went well. -CR'
    },
    {
      id: '3',
      name: 'Nix Valerius',
      time: 'Friday night',
      activity: 'Walking to set location / experiencing combat',
      completed: true,
      notes: ''
    },
    {
      id: '4',
      name: 'Isaiah Cooke',
      time: 'Friday night',
      location: 'Valerius house',
      activity: 'Illiterate letter #1 challenge; communicating despite obstacles',
      item: 'Paper listing needed items',
      completed: false,
      notes: ''
    },
    {
      id: '5',
      name: 'Kiko Truthspeaker',
      time: 'Saturday morning',
      location: 'Makai Camp',
      activity: 'Cup of insight challenge; learning about partymates',
      item: 'locus root',
      completed: false,
      notes: ''
    },
    {
      id: '6',
      name: 'Buzzkill',
      time: '11am-6pm',
      location: 'Crabtree & Evelyn\'s',
      activity: 'Perfectly good bucket challenge; practicing brainstorming, building on partymates\' ideas',
      completed: false,
      notes: ''
    },
    {
      id: '7',
      name: 'Pascal Valerius',
      time: '8am-1pm',
      location: 'Valerius house',
      activity: 'Combat teamwork challenge; becoming more comfortable with combat, working as a team',
      item: 'star of direction',
      completed: false,
      notes: ''
    },
    {
      id: '8',
      name: 'Karmin Smirch',
      time: '9-11am, 1-4pm, 6-8pm',
      location: 'Smirches\' shop',
      activity: 'Smirch jingle challenge; being creative, working collaboratively',
      item: 'riverglass jewelbox',
      completed: false,
      notes: ''
    }
  ],
  "Clairia": [
    {
      id: '1',
      name: 'Initial Contact',
      time: 'Friday night',
      activity: 'Meeting companion and getting oriented',
      completed: true,
      notes: 'Group introduced successfully. -MM'
    },
    {
      id: '2',
      name: 'First Challenge',
      time: 'Saturday morning',
      activity: 'Team building and party dynamics',
      completed: false,
      notes: ''
    }
  ]
};

export default function PartyPathsPage() {
  const [selectedParty, setSelectedParty] = useState<string>("Arden");
  const [encounters, setEncounters] = useState<Encounter[]>(PARTY_ENCOUNTERS["Arden"]);

  const handlePartyChange = (party: string) => {
    setSelectedParty(party);
    setEncounters(PARTY_ENCOUNTERS[party] || []);
  };

  const handleUpdateEncounter = (id: string, updates: Partial<Encounter>) => {
    setEncounters(prev =>
      prev.map(enc => enc.id === id ? { ...enc, ...updates } : enc)
    );
  };

  const handleAddNote = (note: string) => {
    console.log("Ad hoc note for", selectedParty, ":", note);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-party-paths">Party Paths</h1>
        <p className="text-muted-foreground">Track encounter completion and add staff notes</p>
      </div>

      <div className="max-w-xs">
        <Label htmlFor="party-select" className="mb-2 block">Select Party</Label>
        <Select value={selectedParty} onValueChange={handlePartyChange}>
          <SelectTrigger id="party-select" data-testid="select-party-path">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PARTIES.map(party => (
              <SelectItem key={party} value={party}>{party}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <PartyPathTracker
        party={selectedParty}
        encounters={encounters}
        onUpdateEncounter={handleUpdateEncounter}
        onAddNote={handleAddNote}
      />
    </div>
  );
}
