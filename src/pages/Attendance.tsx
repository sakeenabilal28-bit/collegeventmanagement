import { events, participants, staffMembers } from '@/data/mockData';
import { motion } from 'framer-motion';
import { Users, UserCheck, Heart, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Attendance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Attendance Tracking</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor attendance across all events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.filter(e => e.status !== 'pending' && e.status !== 'rejected').map((event, i) => {
          const eventParticipants = participants.filter(p => p.eventId === event.id);
          const attended = eventParticipants.filter(p => p.attended).length;
          const total = eventParticipants.length;
          const rate = total > 0 ? Math.round((attended / total) * 100) : 0;
          const assignedStaff = staffMembers.filter(s => s.assignedEvents.includes(event.id));

          return (
            <motion.div key={event.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} className="bg-card border rounded-lg p-5 shadow-card space-y-4">
              <div>
                <h3 className="font-display font-bold text-foreground text-sm">{event.name}</h3>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Attendance Rate</span>
                  <span className="font-semibold text-foreground">{rate}%</span>
                </div>
                <Progress value={rate} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-muted/50 rounded-md p-2">
                  <Users className="h-3.5 w-3.5 mx-auto text-info mb-1" />
                  <p className="text-lg font-bold text-foreground">{event.attendees}</p>
                  <p className="text-[10px] text-muted-foreground">Attendees</p>
                </div>
                <div className="bg-muted/50 rounded-md p-2">
                  <UserCheck className="h-3.5 w-3.5 mx-auto text-success mb-1" />
                  <p className="text-lg font-bold text-foreground">{assignedStaff.length}</p>
                  <p className="text-[10px] text-muted-foreground">Staff</p>
                </div>
                <div className="bg-muted/50 rounded-md p-2">
                  <Heart className="h-3.5 w-3.5 mx-auto text-accent mb-1" />
                  <p className="text-lg font-bold text-foreground">{event.volunteers.length}</p>
                  <p className="text-[10px] text-muted-foreground">Volunteers</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Attendance;
