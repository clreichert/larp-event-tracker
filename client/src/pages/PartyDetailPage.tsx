import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, CheckCircle2, Circle, Swords, AlertCircle, ChevronDown, ChevronRight } from "lucide-react";
import PartyPathTracker, { type Encounter } from "@/components/PartyPathTracker";
import { useState } from "react";

export default function PartyDetailPage() {
  const [, params] = useRoute("/party/:partyName");
  const [, setLocation] = useLocation();
  const partyName = params?.partyName || "";
  const [issuesOpen, setIssuesOpen] = useState(true);
  const [partyPathOpen, setPartyPathOpen] = useState(true);
  const [combatOpen, setCombatOpen] = useState(true);

  // Mock data - would come from API in real implementation
  const partyData = {
    Arden: {
      totalEncounters: 12,
      completedEncounters: 8,
      totalCombat: 3,
      completedCombat: 2,
      openIssues: [],
      combatEncounters: [
        {
          id: '1',
          name: 'Shadow Beast Pack',
          type: 'Creatures',
          notes: 'Party handled well, good teamwork. -CR'
        },
        {
          id: '2',
          name: 'Bandit Ambush',
          type: 'Humanoid',
          notes: ''
        },
        {
          id: '3',
          name: 'River Guardian',
          type: 'Elemental',
          notes: ''
        }
      ],
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
      openIssues: [
        {
          id: '1',
          type: 'Medical',
          priority: 'Low' as const,
          status: 'Monitoring',
          situation: 'Traveler requested knee brace and wrap. Medical staff checking in at lunch.'
        }
      ],
      combatEncounters: [
        {
          id: '1',
          name: 'Shadow Beast Pack',
          type: 'Creatures',
          notes: 'Close call but they managed. -JS'
        },
        {
          id: '2',
          name: 'Bandit Ambush',
          type: 'Humanoid',
          notes: ''
        }
      ],
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
      openIssues: [
        {
          id: '2',
          type: 'Medical',
          priority: 'High' as const,
          status: 'Fixing',
          situation: 'Participant feeling light-headed, being monitored by medical staff.'
        }
      ],
      combatEncounters: [
        {
          id: '2',
          name: 'Bandit Ambush',
          type: 'Humanoid',
          notes: 'Struggled a bit but pulled through.'
        }
      ],
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
      openIssues: [],
      combatEncounters: [
        {
          id: '1',
          name: 'Shadow Beast Pack',
          type: 'Creatures',
          notes: ''
        },
        {
          id: '3',
          name: 'River Guardian',
          type: 'Elemental',
          notes: ''
        }
      ],
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
      openIssues: [
        {
          id: '3',
          type: 'Opportunity!',
          priority: 'Low' as const,
          status: 'Monitoring',
          situation: 'Joyce serving as companion. Schedule is clear for ongoing support.'
        }
      ],
      combatEncounters: [
        {
          id: '2',
          name: 'Bandit Ambush',
          type: 'Humanoid',
          notes: ''
        }
      ],
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
      openIssues: [],
      combatEncounters: [
        {
          id: '5',
          name: 'Forest Spirits',
          type: 'Magical',
          notes: ''
        }
      ],
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="hover-elevate cursor-pointer"
          onClick={() => {
            setPartyPathOpen(true);
            document.getElementById('party-path-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          data-testid="widget-overall-progress"
        >
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>

        <Card 
          className="hover-elevate cursor-pointer"
          onClick={() => {
            setCombatOpen(true);
            document.getElementById('combat-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          data-testid="widget-combat-encounters"
        >
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold mb-2">Combat Encounters</h3>
            <div className="flex items-center gap-2">
              <Swords className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-semibold">
                  {data.completedCombat}
                </p>
                <p className="text-xs text-muted-foreground">
                  {data.completedCombat === 1 ? 'encounter' : 'encounters'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover-elevate cursor-pointer"
          onClick={() => {
            setIssuesOpen(true);
            document.getElementById('issues-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          data-testid="widget-open-issues"
        >
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold mb-2">Open Issues</h3>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-2xl font-semibold">
                  {data.openIssues.length}
                </p>
                <p className="text-xs text-muted-foreground">
                  {data.openIssues.filter(i => i.priority === 'High').length > 0 
                    ? `${data.openIssues.filter(i => i.priority === 'High').length} high priority`
                    : 'Active'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.openIssues.length > 0 && (
        <Collapsible open={issuesOpen} onOpenChange={setIssuesOpen}>
          <Card id="issues-section">
            <CardHeader>
              <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate -m-6 p-6 rounded-lg" data-testid="trigger-toggle-issues">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Open Issues ({data.openIssues.length})
                </CardTitle>
                {issuesOpen ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-3">
                {data.openIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-4 rounded-md bg-muted/30"
                    data-testid={`issue-${issue.id}`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Badge 
                        variant={issue.priority === "High" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {issue.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {issue.type}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {issue.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {issue.situation}
                    </p>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      <Collapsible open={partyPathOpen} onOpenChange={setPartyPathOpen}>
        <Card id="party-path-section">
          <CardHeader>
            <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate -m-6 p-6 rounded-lg" data-testid="trigger-toggle-party-path">
              <CardTitle>{partyName} - Party Path</CardTitle>
              {partyPathOpen ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
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
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {data.combatEncounters && data.combatEncounters.length > 0 && (
        <Collapsible open={combatOpen} onOpenChange={setCombatOpen}>
          <Card id="combat-section">
            <CardHeader>
              <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate -m-6 p-6 rounded-lg" data-testid="trigger-toggle-combat">
                <CardTitle className="flex items-center gap-2">
                  <Swords className="h-5 w-5" />
                  Combat Encounters ({data.combatEncounters.length})
                </CardTitle>
                {combatOpen ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-3">
                  {data.combatEncounters.map((combat) => (
                    <div
                      key={combat.id}
                      className="p-4 rounded-md border"
                      data-testid={`combat-${combat.id}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold">{combat.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {combat.type}
                        </Badge>
                      </div>
                      {combat.notes && (
                        <p className="text-sm text-muted-foreground">
                          {combat.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}
    </div>
  );
}
