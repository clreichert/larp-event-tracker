import PartyDashboard from "@/components/PartyDashboard";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  const mockParties = [
    {
      party: 'Arden',
      totalEncounters: 12,
      completedEncounters: 8,
      totalCombat: 3,
      completedCombat: 2,
      openIssues: [],
      recentActivity: [
        { id: '1', description: 'Completed Kiko Truthspeaker encounter', timestamp: new Date() },
        { id: '2', description: 'Received locus root item', timestamp: new Date() }
      ]
    },
    {
      party: 'Clairia',
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
      recentActivity: [
        { id: '1', description: 'Party split for rest', timestamp: new Date() }
      ]
    },
    {
      party: 'P\'Loa',
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
      recentActivity: []
    },
    {
      party: 'Uri-Kesh',
      totalEncounters: 10,
      completedEncounters: 7,
      totalCombat: 2,
      completedCombat: 2,
      openIssues: [],
      recentActivity: [
        { id: '1', description: 'Completed evening encounters', timestamp: new Date() }
      ]
    },
    {
      party: 'Doloron',
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
      recentActivity: []
    },
    {
      party: 'Sythwan',
      totalEncounters: 11,
      completedEncounters: 6,
      totalCombat: 3,
      completedCombat: 1,
      openIssues: [],
      recentActivity: [
        { id: '1', description: 'Requested early soulspeaking', timestamp: new Date() }
      ]
    }
  ];

  const totalIssues = mockParties.reduce((sum, p) => sum + p.openIssues.length, 0);
  const highPriorityIssues = mockParties.reduce((sum, p) => 
    sum + p.openIssues.filter(i => i.priority === 'High').length, 0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold" data-testid="heading-dashboard">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all party progress and issues</p>
      </div>

      <Card 
        className="p-6 hover-elevate cursor-pointer max-w-sm"
        onClick={() => setLocation('/issues')}
        data-testid="widget-open-issues"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Open Issues</p>
            <p className="text-4xl font-semibold mt-2" data-testid="metric-open-issues">
              {totalIssues}
            </p>
            {highPriorityIssues > 0 && (
              <p className="text-sm text-destructive mt-1">
                {highPriorityIssues} high priority
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-md bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
        </div>
      </Card>

      <PartyDashboard parties={mockParties} />
    </div>
  );
}
