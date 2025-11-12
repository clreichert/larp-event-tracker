import { useState } from "react";
import IssueLogger from "@/components/IssueLogger";
import IssuesTable, { type Issue } from "@/components/IssuesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      party: 'Clairia',
      job: 'Keeper',
      type: 'Medical',
      priority: 'Low',
      status: 'Hopefully fixed',
      situation: 'Keeper tweaked an ankle while walking. Sounds minor, but should have a medical check-in at lunch. -Scaz. UPDATE: JulieL checked her out and she\'s fine.',
      timestamp: new Date('2024-01-20T13:00:00')
    },
    {
      id: '2',
      party: 'P\'Loa',
      job: 'Other',
      type: 'Medical',
      priority: 'High',
      status: 'Monitoring',
      situation: 'Participant suddenly feeling light-headed, sweaty; Steve found Abigail. Julie Leviter checking in. Maisie\'s husband sent to hospital via 911.',
      timestamp: new Date('2024-01-19T18:45:00')
    },
    {
      id: '3',
      party: 'Uri-Kesh',
      job: 'Traveler',
      type: 'General',
      priority: 'Low',
      status: 'Hopefully fixed',
      situation: 'Participant walked through basement with eyes closed, feeling overwhelmed. Talked to Bill, participant went straight into combat workshops. Bill not concerned. -jodi',
      timestamp: new Date('2024-01-19T18:30:00')
    },
    {
      id: '4',
      party: 'Noctara',
      job: 'Other',
      type: 'Opportunity!',
      priority: 'Low',
      status: 'Hopefully fixed',
      situation: 'Via companion, they are really into Banshee lore, Pendant of Fortune d\'Oro would be a big win for them. UPDATE: They got the pendant and were very excited!',
      timestamp: new Date('2024-01-20T08:30:00')
    },
    {
      id: '5',
      party: 'Keer',
      job: 'Ranger',
      type: 'General',
      priority: 'Low',
      status: 'Monitoring',
      situation: 'BobM reports that Nietz (Martin) is holding himself apart. Worth keeping an eye on. Note: he lost a son to overdose couple years back, watch as grief/Rites plot ramps up. -Kristi',
      timestamp: new Date('2024-01-20T09:00:00')
    }
  ]);

  const handleLogIssue = (newIssue: Issue) => {
    setIssues(prev => [newIssue, ...prev]);
  };

  const handleEditIssue = (issue: Issue) => {
    console.log("Edit issue:", issue);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-issues">Issues Tracker</h1>
        <p className="text-muted-foreground">Log and manage participant issues during the event</p>
      </div>

      <Tabs defaultValue="view" className="space-y-6">
        <TabsList>
          <TabsTrigger value="view" data-testid="tab-view-issues">View Issues</TabsTrigger>
          <TabsTrigger value="log" data-testid="tab-log-issue">Log New Issue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view" className="space-y-6">
          <IssuesTable issues={issues} onEdit={handleEditIssue} />
        </TabsContent>
        
        <TabsContent value="log" className="space-y-6">
          <IssueLogger onSubmit={handleLogIssue} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
