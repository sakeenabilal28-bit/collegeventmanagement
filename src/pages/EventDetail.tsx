import { useParams, useNavigate } from 'react-router-dom';
import { events, participants, staffMembers } from '@/data/mockData';
import { useRole } from '@/contexts/RoleContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, DollarSign, ArrowLeft, Download, UserCheck, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const event = events.find(e => e.id === id);
  const eventParticipants = participants.filter(p => p.eventId === id);
  const assignedStaff = staffMembers.filter(s => s.assignedEvents.includes(id || ''));
  const [showTicket, setShowTicket] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!event) return <div className="p-10 text-center text-muted-foreground">Event not found</div>;

  const handleRegister = () => {
    setRegistered(true);
    setShowTicket(true);
    toast.success('Successfully registered!');
  };

  const profit = event.income - event.expenses;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-hero rounded-xl p-6 md:p-8">
        <Badge className="bg-accent/20 text-primary-foreground border-accent/30 border mb-3">{event.category}</Badge>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-primary-foreground">{event.name}</h1>
        <p className="mt-2 text-sm text-primary-foreground/70">{event.description}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-foreground/80">
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{event.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{event.time}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{event.venue}</span>
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{event.registeredCount}/{event.maxParticipants}</span>
        </div>
      </motion.div>

      {role === 'student' && (
        <div className="bg-card rounded-lg border p-5 shadow-card">
          <h3 className="font-display font-bold text-foreground mb-3">Registration</h3>
          {registered ? (
            <div className="space-y-3">
              <p className="text-sm text-success font-medium">✓ You are registered for this event!</p>
              <Button size="sm" onClick={() => setShowTicket(true)} className="gap-1.5"><Ticket className="h-4 w-4" /> View Ticket</Button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                {event.ticketPrice > 0 ? `Ticket Price: ₹${event.ticketPrice}` : 'Free Event'}
              </p>
              <Button onClick={handleRegister}>Register Now</Button>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(role === 'admin' || role === 'organizer') && (
          <>
            <div className="bg-card rounded-lg border p-5 shadow-card">
              <h3 className="font-display font-bold text-foreground mb-3">Participants ({eventParticipants.length})</h3>
              {eventParticipants.length === 0 ? (
                <p className="text-sm text-muted-foreground">No participants yet</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-auto">
                  {eventParticipants.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm">
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.studentId}</p>
                      </div>
                      <Badge variant={p.attended ? 'default' : 'outline'} className={p.attended ? 'bg-success/15 text-success border-success/30' : ''}>
                        {p.attended ? 'Present' : 'Absent'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-card rounded-lg border p-5 shadow-card">
              <h3 className="font-display font-bold text-foreground mb-3">Staff & Volunteers</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Staff Assigned</p>
                  {assignedStaff.map(s => (
                    <div key={s.id} className="flex items-center gap-2 py-1 text-sm">
                      <UserCheck className="h-3.5 w-3.5 text-info" />
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-xs text-muted-foreground">({s.role})</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Volunteers</p>
                  <div className="flex flex-wrap gap-1.5">
                    {event.volunteers.map(v => (
                      <Badge key={v} variant="outline" className="text-xs">{v}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {(role === 'admin' || role === 'organizer') && (
        <div className="bg-card rounded-lg border p-5 shadow-card">
          <h3 className="font-display font-bold text-foreground mb-3">Financials</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Income</p>
              <p className="text-xl font-bold text-success">₹{event.income.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expenses</p>
              <p className="text-xl font-bold text-destructive">₹{event.expenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Profit/Loss</p>
              <p className={`text-xl font-bold ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                ₹{Math.abs(profit).toLocaleString()} {profit >= 0 ? '↑' : '↓'}
              </p>
            </div>
          </div>
          {event.sponsors.length > 0 && (
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Sponsors</p>
              <div className="flex flex-wrap gap-1.5">
                {event.sponsors.map(s => <Badge key={s} className="bg-accent/15 text-accent-foreground border-accent/30 border">{s}</Badge>)}
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog open={showTicket} onOpenChange={setShowTicket}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Your Event Ticket</DialogTitle>
          </DialogHeader>
          <div className="border-2 border-dashed border-accent rounded-lg p-6 text-center space-y-3">
            <div className="gradient-accent rounded-lg p-3 inline-block">
              <Calendar className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg text-foreground">{event.name}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{event.date} · {event.time}</p>
              <p>{event.venue}</p>
            </div>
            <div className="border-t pt-3 mt-3">
              <p className="text-xs text-muted-foreground">Student ID</p>
              <p className="font-mono font-bold text-foreground">STU-2025-001</p>
              <p className="text-xs text-muted-foreground mt-2">Ticket ID</p>
              <p className="font-mono font-bold text-accent">TKT-{event.id.toUpperCase()}-{Date.now().toString(36).toUpperCase()}</p>
            </div>
            <Button className="w-full gap-1.5 mt-2" onClick={() => toast.success('Ticket downloaded!')}>
              <Download className="h-4 w-4" /> Download Receipt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetail;
