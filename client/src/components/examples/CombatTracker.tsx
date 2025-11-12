import CombatTracker from '../CombatTracker';
import { useState } from 'react';

export default function CombatTrackerExample() {
  const [combatEncounters, setCombatEncounters] = useState([
    {
      id: '1',
      name: 'Nix Valerius Combat',
      completed: true,
      notes: 'Party handled well, good teamwork. -CR'
    },
    {
      id: '2',
      name: 'Pascal Valerius Challenge',
      completed: false,
      notes: ''
    }
  ]);

  const handleUpdateCombat = (id: string, updates: any) => {
    setCombatEncounters(prev =>
      prev.map(combat => combat.id === id ? { ...combat, ...updates } : combat)
    );
  };

  const handleAddCombat = (name: string) => {
    setCombatEncounters(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        completed: false,
        notes: ''
      }
    ]);
  };

  return (
    <div className="p-6 max-w-3xl">
      <CombatTracker
        party="Arden"
        combatEncounters={combatEncounters}
        onUpdateCombat={handleUpdateCombat}
        onAddCombat={handleAddCombat}
      />
    </div>
  );
}
