import EventsTable from '../EventsTable';

export default function EventsTableExample() {
  const mockEvents = [
    {
      id: '1',
      title: 'Client Meeting',
      category: 'Meeting',
      date: new Date('2024-01-15'),
      notes: 'Discussed Q1 objectives and deliverables'
    },
    {
      id: '2',
      title: 'Product Demo',
      category: 'Demo',
      date: new Date('2024-01-16'),
      notes: 'Showcased new features to potential customers'
    },
    {
      id: '3',
      title: 'Team Standup',
      category: 'Meeting',
      date: new Date('2024-01-17'),
    }
  ];

  return (
    <div className="p-6">
      <EventsTable 
        events={mockEvents}
        onEdit={(event) => console.log('Edit event:', event)}
        onDelete={(id) => console.log('Delete event:', id)}
      />
    </div>
  );
}
