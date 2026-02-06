import { useState } from 'react';
import { events as initialEvents, Event } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Approvals = () => {
  const [eventList, setEventList] = useState<Event[]>([...initialEvents]);

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setEventList(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    toast.success(`Event ${status}!`);
  };

  const pending = eventList.filter(e => e.status === 'pending');
  const processed = eventList.filter(e => e.status === 'approved' || e.status === 'rejected');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Event Approvals</h1>
        <p className="text-sm text-muted-foreground mt-1">Review and approve or reject event proposals</p>
      </div>

      <div>
        <h2 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5 text-warning" /> Pending ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground bg-card border rounded-lg p-6 text-center">All events have been reviewed!</p>
        ) : (
          <div className="space-y-3">
            {pending.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-card border rounded-lg p-4 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-foreground">{e.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.organizer} · {e.date} · {e.venue}</p>
                  <p className="text-xs text-muted-foreground mt-1">{e.description.slice(0, 100)}...</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="gap-1" onClick={() => updateStatus(e.id, 'approved')}>
                    <CheckCircle className="h-3.5 w-3.5" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-destructive" onClick={() => updateStatus(e.id, 'rejected')}>
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display font-bold text-foreground mb-3">Recently Processed</h2>
        <div className="space-y-2">
          {processed.slice(0, 5).map(e => (
            <div key={e.id} className="flex items-center justify-between p-3 bg-card border rounded-lg text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{e.name}</span>
              </div>
              <Badge className={e.status === 'approved' ? 'bg-success/15 text-success border-success/30 border' : 'bg-destructive/15 text-destructive border-destructive/30 border'}>
                {e.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Approvals;
