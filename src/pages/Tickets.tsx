import { useRole } from '@/contexts/RoleContext';
import { participants, events } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Ticket, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { StatsCard } from '@/components/StatsCard';

const Tickets = () => {
  const { role } = useRole();

  if (role === 'student') {
    const myTickets = participants.filter(p => p.studentId === 'STU001');
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">My Tickets</h1>
          <p className="text-sm text-muted-foreground mt-1">View and download your event tickets</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {myTickets.map((t, i) => {
            const event = events.find(e => e.id === t.eventId);
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} className="bg-card border rounded-lg overflow-hidden shadow-card">
                <div className="gradient-hero p-4">
                  <h3 className="font-display font-bold text-primary-foreground">{event?.name}</h3>
                  <p className="text-xs text-primary-foreground/70 mt-1">{event?.date} · {event?.venue}</p>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ticket ID</span>
                    <span className="font-mono font-bold text-accent">{t.ticketId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Student ID</span>
                    <span className="font-mono text-foreground">{t.studentId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={t.attended ? 'bg-success/15 text-success border-success/30 border' : 'bg-info/15 text-info border-info/30 border'}>
                      {t.attended ? 'Attended' : 'Confirmed'}
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full mt-2 gap-1.5" onClick={() => toast.success('Ticket downloaded!')}>
                    <Download className="h-3.5 w-3.5" /> Download Receipt
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Admin view - ticket analytics
  const totalTickets = participants.length;
  const attendedTickets = participants.filter(p => p.attended).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Ticket Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of all issued tickets and attendance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Tickets" value={totalTickets} icon={Ticket} variant="accent" />
        <StatsCard title="Attended" value={attendedTickets} icon={BarChart3} variant="success" />
        <StatsCard title="No-shows" value={totalTickets - attendedTickets} icon={BarChart3} variant="warning" />
      </div>

      <div className="bg-card border rounded-lg shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-sm text-accent">{p.ticketId}</TableCell>
                <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                <TableCell className="text-sm">{events.find(e => e.id === p.eventId)?.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.registeredAt}</TableCell>
                <TableCell>
                  <Badge className={p.attended ? 'bg-success/15 text-success border-success/30 border' : 'bg-muted text-muted-foreground'}>
                    {p.attended ? 'Attended' : 'Pending'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tickets;
