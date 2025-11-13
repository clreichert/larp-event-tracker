import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, CheckCircle2, Circle, Swords, AlertCircle, ChevronDown, ChevronRight } from "lucide-react";
import PartyPathTracker, { type Encounter } from "@/components/PartyPathTracker";
import { useState, useMemo } from "react";
import { getPartyColor } from "@/lib/partyColors";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Party, Issue, Encounter as DBEncounter, CombatCheckin, CombatEncounter } from "@shared/schema";

export default function PartyDetailPage() {
  const [, params] = useRoute("/party/:partyName");
  const [, setLocation] = useLocation();
  const partyName = params?.partyName || "";
  const [issuesOpen, setIssuesOpen] = useState(true);
  const [partyPathOpen, setPartyPathOpen] = useState(true);
  const [combatOpen, setCombatOpen] = useState(true);

  const { data: party, isLoading: partyLoading } = useQuery<Party>({
    queryKey: ['/api/parties', partyName],
    enabled: !!partyName,
  });

  const { data: encounters, isLoading: encountersLoading } = useQuery<DBEncounter[]>({
    queryKey: ['/api/encounters/party', party?.id],
    enabled: !!party?.id,
  });

  const { data: allIssues, isLoading: issuesLoading } = useQuery<Issue[]>({
    queryKey: ['/api/issues'],
  });

  const { data: allCombatCheckins, isLoading: combatCheckinsLoading } = useQuery<CombatCheckin[]>({
    queryKey: ['/api/combat-checkins'],
  });

  const { data: allCombatEncounters, isLoading: combatEncountersLoading } = useQuery<CombatEncounter[]>({
    queryKey: ['/api/combat-encounters'],
  });

  const updateEncounterMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<DBEncounter> }) => {
      const res = await apiRequest('PATCH', `/api/encounters/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/encounters/party'] });
      queryClient.invalidateQueries({ queryKey: ['/api/encounters'] });
    },
  });

  const isLoading = partyLoading || encountersLoading || issuesLoading || combatCheckinsLoading || combatEncountersLoading;

  const partyIssues = useMemo(() => {
    if (!allIssues || !partyName) return [];
    return allIssues.filter(i => i.party === partyName && i.status !== 'Resolved');
  }, [allIssues, partyName]);

  const combatEncountersData = useMemo(() => {
    if (!allCombatCheckins || !allCombatEncounters || !party?.id) return [];
    
    const partyCheckins = allCombatCheckins.filter(c => c.partyId === party.id && c.encountered);
    
    return partyCheckins.map(checkin => {
      const combat = allCombatEncounters.find(ce => ce.id === checkin.combatId);
      return {
        id: checkin.id,
        name: combat?.name || 'Unknown Combat',
        type: combat?.type || 'Unknown',
        notes: checkin.notes || ''
      };
    });
  }, [allCombatCheckins, allCombatEncounters, party?.id]);

  const completedCombat = useMemo(() => {
    if (!allCombatCheckins || !party?.id) return 0;
    return allCombatCheckins.filter(c => c.partyId === party.id && c.encountered).length;
  }, [allCombatCheckins, party?.id]);

  const handleUpdateEncounter = (id: string, updates: Partial<Encounter>) => {
    updateEncounterMutation.mutate({ id, updates });
  };

  const handleAddNote = (note: string) => {
    console.log('Add note:', note);
  };

  if (isLoading) {
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
          <Skeleton className="h-9 w-32 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>

        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!party) {
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

  const totalEncounters = encounters?.length || 0;
  const completedEncounters = encounters?.filter(e => e.completed).length || 0;
  const completionPercent = totalEncounters > 0 ? (completedEncounters / totalEncounters) * 100 : 0;
  const colors = getPartyColor(partyName);

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
        <h1 className={`text-3xl font-semibold ${colors.text}`} data-testid={`heading-party-${partyName}`}>
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
                  {completedEncounters}/{totalEncounters}
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
                  {completedCombat}
                </p>
                <p className="text-xs text-muted-foreground">
                  {completedCombat === 1 ? 'encounter' : 'encounters'}
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
                  {partyIssues.length}
                </p>
                <p className="text-xs text-muted-foreground">
                  {partyIssues.filter(i => i.priority === 'High').length > 0 
                    ? `${partyIssues.filter(i => i.priority === 'High').length} high priority`
                    : 'Active'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {partyIssues.length > 0 && (
        <Collapsible open={issuesOpen} onOpenChange={setIssuesOpen}>
          <Card id="issues-section">
            <CardHeader>
              <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate -m-6 p-6 rounded-lg" data-testid="trigger-toggle-issues">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Open Issues ({partyIssues.length})
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
                {partyIssues.map((issue) => (
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
                encounters={encounters || []}
                onUpdateEncounter={handleUpdateEncounter}
                onAddNote={handleAddNote}
              />
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {combatEncountersData.length > 0 && (
        <Collapsible open={combatOpen} onOpenChange={setCombatOpen}>
          <Card id="combat-section">
            <CardHeader>
              <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate -m-6 p-6 rounded-lg" data-testid="trigger-toggle-combat">
                <CardTitle className="flex items-center gap-2">
                  <Swords className="h-5 w-5" />
                  Combat Encounters ({combatEncountersData.length})
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
                  {combatEncountersData.map((combat) => (
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
