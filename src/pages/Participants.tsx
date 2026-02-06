import { participants, events } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

const Participants = () => {
  const [search, setSearch] = useState('');

  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.studentId.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  const getEventName = (eventId: string) => events.find(e => e.id === eventId)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Participants</h1>
        <p className="text-sm text-muted-foreground mt-1">View all registered participants across events</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name, ID, or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="bg-card border rounded-lg shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Ticket</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                <TableCell className="font-mono text-sm">{p.studentId}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{p.email}</TableCell>
                <TableCell className="text-sm">{getEventName(p.eventId)}</TableCell>
                <TableCell className="font-mono text-xs text-accent">{p.ticketId}</TableCell>
                <TableCell>
                  <Badge className={p.attended ? 'bg-success/15 text-success border-success/30 border' : 'bg-muted text-muted-foreground'}>
                    {p.attended ? 'Attended' : 'Registered'}
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

export default Participants;
