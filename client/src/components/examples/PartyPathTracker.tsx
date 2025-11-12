import PartyPathTracker from '../PartyPathTracker';
import { useState } from 'react';

export default function PartyPathTrackerExample() {
  const [encounters, setEncounters] = useState([
    {
      id: '1',
      name: 'Aria Morgan',
      time: 'Friday night',
      location: 'Contact',
      activity: 'Introducing the party to the companion, getting comfortable interacting in the "otherworld"',
      item: undefined,
      completed: true,
      notes: 'Party met with Aria. Good introduction. -JS'
    },
    {
      id: '2',
      name: 'Kiko Truthspeaker',
      time: 'Saturday morning',
      location: 'Makai Camp',
      activity: 'Cup of insight challenge; learning about partymates',
      item: 'locus root',
      completed: false,
      notes: ''
    },
    {
      id: '3',
      name: 'Buzzkill',
      time: '11am-6pm',
      location: 'Crabtree & Evelyn\'s',
      activity: 'Perfectly good bucket challenge; practicing brainstorming, building on partymates\' ideas',
      completed: false,
      notes: ''
    }
  ]);

  const handleUpdateEncounter = (id: string, updates: any) => {
    setEncounters(prev => 
      prev.map(enc => enc.id === id ? { ...enc, ...updates } : enc)
    );
  };

  return (
    <div className="p-6">
      <PartyPathTracker
        party="Arden"
        encounters={encounters}
        onUpdateEncounter={handleUpdateEncounter}
        onAddNote={(note) => console.log('Ad hoc note:', note)}
      />
    </div>
  );
}
