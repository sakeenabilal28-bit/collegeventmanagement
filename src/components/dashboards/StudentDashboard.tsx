import { events } from '@/data/mockData';
import { Calendar, Ticket, Star } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { EventCard } from '@/components/EventCard';

const upcomingEvents = events.filter(e => e.status === 'approved');

export const StudentDashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold font-display text-foreground">Student Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Discover events, register, and download your tickets</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsCard title="Upcoming Events" value={upcomingEvents.length} icon={Calendar} variant="accent" />
      <StatsCard title="My Registrations" value={2} icon={Ticket} variant="info" />
      <StatsCard title="Events Attended" value={1} icon={Star} variant="success" />
    </div>
    <div>
      <h2 className="font-display font-bold text-foreground mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEvents.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
      </div>
    </div>
  </div>
);
