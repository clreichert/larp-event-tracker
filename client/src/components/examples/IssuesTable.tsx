import IssuesTable from '../IssuesTable';

export default function IssuesTableExample() {
  const mockIssues = [
    {
      id: '1',
      party: 'Clairia',
      job: 'Keeper',
      type: 'Medical',
      priority: 'Low' as const,
      status: 'Hopefully fixed' as const,
      situation: 'Keeper tweaked an ankle while walking. Sounds minor, but should have a medical check-in at lunch. -Scaz',
      timestamp: new Date('2024-01-20T13:00:00'),
      hasDetails: false,
    },
    {
      id: '2',
      party: 'P\'Loa',
      job: 'Other',
      type: 'Medical',
      priority: 'High' as const,
      status: 'Monitoring' as const,
      situation: 'Participant suddenly feeling light-headed, sweaty; Steve found Abigail. Julie Leviter checking in on him.',
      timestamp: new Date('2024-01-19T18:45:00'),
      hasDetails: true,
    },
    {
      id: '3',
      party: 'Noctara',
      job: 'Other',
      type: 'Opportunity!' as const,
      priority: 'Low' as const,
      status: 'Hopefully fixed' as const,
      situation: 'Via companion, they are really into Banshee lore, Pendant of Fortune d\'Oro would be a big win for them',
      timestamp: new Date('2024-01-20T08:30:00'),
      hasDetails: false,
    }
  ];

  return (
    <div className="p-6">
      <IssuesTable 
        issues={mockIssues}
        onEdit={(issue) => console.log('Edit issue:', issue)}
      />
    </div>
  );
}
