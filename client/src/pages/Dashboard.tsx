import PartyDashboard from "@/components/PartyDashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Activity } from "lucide-react";

export default function Dashboard() {
  const mockParties = [
    {
      party: 'Arden',
      totalEncounters: 12,
      completedEncounters: 8,
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
      openIssues: [],
      recentActivity: [
        { id: '1', description: 'Completed evening encounters', timestamp: new Date() }
      ]
    },
    {
      party: 'Doloron',
      totalEncounters: 9,
      completedEncounters: 4,
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
      openIssues: [],
      recentActivity: [
        { id: '1', description: 'Requested early soulspeaking', timestamp: new Date() }
      ]
    }
  ];

  const totalEncounters = mockParties.reduce((sum, p) => sum + p.totalEncounters, 0);
  const totalCompleted = mockParties.reduce((sum, p) => sum + p.completedEncounters, 0);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Progress</p>
              <p className="text-4xl font-semibold mt-2" data-testid="metric-total-progress">
                {Math.round((totalCompleted / totalEncounters) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {totalCompleted}/{totalEncounters} encounters
              </p>
            </div>
            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
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

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Parties</p>
              <p className="text-4xl font-semibold mt-2" data-testid="metric-active-parties">
                {mockParties.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                tracking progress
              </p>
            </div>
            <div className="h-12 w-12 rounded-md bg-chart-2/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-chart-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-4xl font-semibold mt-2" data-testid="metric-completion-rate">
                {Math.round((mockParties.filter(p => p.completedEncounters / p.totalEncounters > 0.7).length / mockParties.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                parties on track
              </p>
            </div>
            <div className="h-12 w-12 rounded-md bg-chart-3/10 flex items-center justify-center">
              <Activity className="h-6 w-6 text-chart-3" />
            </div>
          </div>
        </Card>
      </div>

      <PartyDashboard parties={mockParties} />
    </div>
  );
}
