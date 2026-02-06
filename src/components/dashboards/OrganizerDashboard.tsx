import { StatsCard } from '@/components/StatsCard';
import { events, participants } from '@/data/mockData';
import { Calendar, Users, TrendingUp, Clock } from 'lucide-react';
import { EventCard } from '@/components/EventCard';

const myEvents = events.filter(e => e.status === 'approved' || e.status === 'pending');
const totalParticipants = myEvents.reduce((s, e) => s + e.registeredCount, 0);

export const OrganizerDashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold font-display text-foreground">Organizer Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Manage your events and track participants in real time</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="My Events" value={myEvents.length} icon={Calendar} variant="accent" />
      <StatsCard title="Total Registrations" value={totalParticipants} icon={Users} variant="info" />
      <StatsCard title="Active Now" value={myEvents.filter(e => e.status === 'approved').length} icon={Clock} variant="success" />
      <StatsCard title="Pending Approval" value={myEvents.filter(e => e.status === 'pending').length} icon={TrendingUp} variant="warning" />
    </div>
    <div>
      <h2 className="font-display font-bold text-foreground mb-4">Your Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myEvents.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
      </div>
    </div>
  </div>
);
