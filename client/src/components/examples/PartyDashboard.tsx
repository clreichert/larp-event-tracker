import PartyDashboard from '../PartyDashboard';

export default function PartyDashboardExample() {
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
    }
  ];

  return (
    <div className="p-6">
      <PartyDashboard parties={mockParties} />
    </div>
  );
}
