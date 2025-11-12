import { useRoute, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Circle, Swords } from "lucide-react";
import PartyPathTracker, { type Encounter } from "@/components/PartyPathTracker";

export default function PartyDetailPage() {
  const [, params] = useRoute("/party/:partyName");
  const [, setLocation] = useLocation();
  const partyName = params?.partyName || "";

  // Mock data - would come from API in real implementation
  const partyData = {
    Arden: {
      totalEncounters: 12,
      completedEncounters: 8,
      totalCombat: 3,
      completedCombat: 2,
      encounters: [
        {
          id: '1',
          name: 'Kiko Truthspeaker',
          time: '9:00 AM',
          location: 'Forest Path',
          activity: 'Receive truth blessing and guidance',
          item: 'Truth Token',
          completed: true,
          notes: 'Party received blessing smoothly. Good roleplay.'
        },
        {
          id: '2',
          name: 'The Wandering Merchant',
          time: '10:30 AM',
          location: 'Crossroads',
          activity: 'Trade for locus root',
          item: 'Locus Root',
          completed: true,
          notes: 'Successful trade completed.'
        },
        {
          id: '3',
          name: 'River Guardian Combat',
          time: '11:45 AM',
          location: 'River Crossing',
          activity: 'Defeat the River Guardian',
          completed: true,
          notes: 'Combat went well. No injuries.'
        },
        {
          id: '4',
          name: 'Ancient Shrine',
          time: '1:00 PM',
          location: 'Hidden Grove',
          activity: 'Offer tribute at the shrine',
          item: 'Shrine Blessing',
          completed: true,
          notes: ''
        },
        {
          id: '5',
          name: 'Shadow Beast Encounter',
          time: '2:30 PM',
          location: 'Dark Woods',
          activity: 'Combat with shadow beast',
          completed: false,
          notes: ''
        },
        {
          id: '6',
          name: 'Elder Council Meeting',
          location: 'Village Center',
          activity: 'Meet with the Elder Council for guidance',
          completed: false,
          notes: ''
        }
      ]
    },
    Clairia: {
      totalEncounters: 10,
      completedEncounters: 5,
      totalCombat: 2,
      completedCombat: 1,
      encounters: [
        {
          id: '1',
          name: 'Morning Meditation',
          time: '8:00 AM',
          location: 'Temple',
          activity: 'Begin the day with meditation',
          completed: true,
          notes: 'Peaceful start to the day.'
        },
        {
          id: '2',
          name: 'Herb Gathering',
          time: '9:30 AM',
          location: 'Meadow',
          activity: 'Collect healing herbs',
          item: 'Healing Herbs',
          completed: true,
          notes: 'Found all necessary herbs.'
        },
        {
          id: '3',
          name: 'Bandit Ambush',
          time: '11:00 AM',
          location: 'Forest Trail',
          activity: 'Combat encounter with bandits',
          completed: true,
          notes: 'Victory with minor wounds.'
        },
        {
          id: '4',
          name: 'Lost Child Quest',
          time: '1:30 PM',
          location: 'Village Outskirts',
          activity: 'Help find lost child',
          completed: true,
          notes: 'Child safely returned to parents.'
        },
        {
          id: '5',
          name: 'Soulspeaking Ceremony',
          time: '3:00 PM',
          location: 'Sacred Grove',
          activity: 'Participate in soulspeaking',
          completed: true,
          notes: 'Emotional ceremony, went well.'
        },
        {
          id: '6',
          name: 'Night Watch Challenge',
          location: 'Camp Perimeter',
          activity: 'Defend camp from night creatures',
          completed: false,
          notes: ''
        }
      ]
    },
    'P\'Loa': {
      totalEncounters: 11,
      completedEncounters: 3,
      totalCombat: 1,
      completedCombat: 0,
      encounters: [
        {
          id: '1',
          name: 'Dawn Ritual',
          time: '7:00 AM',
          location: 'Sacred Circle',
          activity: 'Participate in dawn blessing',
          completed: true,
          notes: 'Strong energy from the group.'
        },
        {
          id: '2',
          name: 'Path of Trials - First Test',
          time: '9:00 AM',
          location: 'Trial Grounds',
          activity: 'Complete first trial of wisdom',
          completed: true,
          notes: 'Passed with flying colors.'
        },
        {
          id: '3',
          name: 'Marketplace Encounter',
          time: '11:30 AM',
          location: 'Town Square',
          activity: 'Gather information and supplies',
          item: 'Map Fragment',
          completed: true,
          notes: 'Acquired valuable map fragment.'
        },
        {
          id: '4',
          name: 'Guardian Beast Combat',
          location: 'Mountain Pass',
          activity: 'Battle the guardian beast',
          completed: false,
          notes: ''
        }
      ]
    },
    'Uri-Kesh': {
      totalEncounters: 10,
      completedEncounters: 7,
      totalCombat: 2,
      completedCombat: 2,
      encounters: [
        {
          id: '1',
          name: 'Desert Crossing',
          time: '8:30 AM',
          location: 'Desert Edge',
          activity: 'Navigate the desert safely',
          completed: true,
          notes: 'Made good time.'
        },
        {
          id: '2',
          name: 'Oasis Discovery',
          time: '10:00 AM',
          location: 'Hidden Oasis',
          activity: 'Find and rest at the oasis',
          item: 'Water Blessing',
          completed: true,
          notes: 'Refreshing stop.'
        }
      ]
    },
    Doloron: {
      totalEncounters: 9,
      completedEncounters: 4,
      totalCombat: 1,
      completedCombat: 1,
      encounters: [
        {
          id: '1',
          name: 'Morning Assembly',
          time: '8:00 AM',
          location: 'Great Hall',
          activity: 'Attend morning assembly',
          completed: true,
          notes: 'Joyce accompanying as companion.'
        }
      ]
    },
    Sythwan: {
      totalEncounters: 11,
      completedEncounters: 6,
      totalCombat: 3,
      completedCombat: 1,
      encounters: [
        {
          id: '1',
          name: 'Mountain Ascent',
          time: '7:30 AM',
          location: 'Base Camp',
          activity: 'Begin mountain climb',
          completed: true,
          notes: 'Strong start to the day.'
        }
      ]
    }
  };

  const data = partyData[partyName as keyof typeof partyData];

  if (!data) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/')}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <p className="text-muted-foreground">Party not found</p>
      </div>
    );
  }

  const completionPercent = (data.completedEncounters / data.totalEncounters) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/')}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-semibold" data-testid={`heading-party-${partyName}`}>
          {partyName}
        </h1>
        <p className="text-muted-foreground">Party progress and encounter tracking</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Overall Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Encounters</span>
                  <span className="font-medium">
                    {data.completedEncounters}/{data.totalEncounters}
                  </span>
                </div>
                <Progress value={completionPercent} />
                <p className="text-xs text-muted-foreground">
                  {Math.round(completionPercent)}% complete
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Encounter Status</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-chart-2" />
                  <span className="text-muted-foreground">
                    {data.completedEncounters} completed
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {data.totalEncounters - data.completedEncounters} remaining
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Combat Encounters</h3>
              <div className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-semibold">
                    {data.completedCombat}/{data.totalCombat}
                  </p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PartyPathTracker 
        party={partyName}
        encounters={data.encounters}
        onUpdateEncounter={(id, updates) => {
          console.log('Update encounter:', id, updates);
        }}
        onAddNote={(note) => {
          console.log('Add note:', note);
        }}
      />
    </div>
  );
}
