import MetricCard from '../MetricCard';
import { Activity } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Total Events" 
        value={1234} 
        icon={Activity}
        trend={{ value: 12, isPositive: true }}
      />
    </div>
  );
}
