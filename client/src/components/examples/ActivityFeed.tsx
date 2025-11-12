import ActivityFeed from '../ActivityFeed';

export default function ActivityFeedExample() {
  const mockActivities = [
    {
      id: '1',
      type: 'Event Logged',
      description: 'New customer meeting scheduled',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      category: 'Meeting'
    },
    {
      id: '2',
      type: 'Note Added',
      description: 'Follow-up notes from product demo',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      category: 'Notes'
    },
    {
      id: '3',
      type: 'Activity Tracked',
      description: 'Completed onboarding call with new client',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      category: 'Call'
    }
  ];

  return (
    <div className="p-6">
      <ActivityFeed activities={mockActivities} />
    </div>
  );
}
