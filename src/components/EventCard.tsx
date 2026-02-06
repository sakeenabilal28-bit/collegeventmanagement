import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Event } from '@/data/mockData';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const statusColors: Record<string, string> = {
  approved: 'bg-success/15 text-success border-success/30',
  pending: 'bg-warning/15 text-warning border-warning/30',
  rejected: 'bg-destructive/15 text-destructive border-destructive/30',
  completed: 'bg-muted text-muted-foreground border-border',
};

export const EventCard = ({ event, index = 0 }: { event: Event; index?: number }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group rounded-lg border bg-card shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <div className="gradient-hero p-4">
        <div className="flex items-start justify-between">
          <Badge className={`${statusColors[event.status]} border text-xs`}>{event.status}</Badge>
          <span className="text-xs font-medium text-primary-foreground/70">{event.category}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-primary-foreground font-display leading-tight">{event.name}</h3>
      </div>
      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" /> <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>{event.registeredCount}/{event.maxParticipants} registered</span>
        </div>
        <div className="pt-2">
          <Button size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate(`/events/${event.id}`); }}>
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
