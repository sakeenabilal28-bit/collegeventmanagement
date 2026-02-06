import { StatsCard } from '@/components/StatsCard';
import { events, participants } from '@/data/mockData';
import { Calendar, Users, DollarSign, CheckSquare, TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const totalIncome = events.reduce((s, e) => s + e.income, 0);
const totalExpenses = events.reduce((s, e) => s + e.expenses, 0);
const pendingEvents = events.filter(e => e.status === 'pending');
const approvedEvents = events.filter(e => e.status === 'approved');

const financeData = events.map(e => ({ name: e.name.slice(0, 15), income: e.income, expenses: e.expenses }));
const pieData = [
  { name: 'Approved', value: approvedEvents.length, color: 'hsl(142, 71%, 45%)' },
  { name: 'Pending', value: pendingEvents.length, color: 'hsl(38, 92%, 50%)' },
  { name: 'Completed', value: events.filter(e => e.status === 'completed').length, color: 'hsl(220, 15%, 70%)' },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of all campus events and operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Events" value={events.length} icon={Calendar} variant="accent" />
        <StatsCard title="Total Participants" value={participants.length} icon={Users} variant="info" trend="12% this month" trendUp />
        <StatsCard title="Total Income" value={`₹${totalIncome.toLocaleString()}`} icon={DollarSign} variant="success" />
        <StatsCard title="Pending Approvals" value={pendingEvents.length} icon={AlertCircle} variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-card rounded-lg border p-5 shadow-card">
          <h3 className="font-display font-bold text-foreground mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={financeData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="income" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card rounded-lg border p-5 shadow-card">
          <h3 className="font-display font-bold text-foreground mb-4">Event Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-lg border p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-foreground">Pending Approvals</h3>
          <Button variant="outline" size="sm" onClick={() => navigate('/approvals')}>View All</Button>
        </div>
        {pendingEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending approvals</p>
        ) : (
          <div className="space-y-3">
            {pendingEvents.map(e => (
              <div key={e.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.organizer} · {e.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="default" className="h-7 text-xs">Approve</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs text-destructive">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-card rounded-lg border p-5 shadow-card">
          <h3 className="font-display font-bold text-foreground mb-3">Net Profit/Loss</h3>
          <div className="text-3xl font-bold text-success">₹{(totalIncome - totalExpenses).toLocaleString()}</div>
          <div className="flex gap-6 mt-3 text-sm">
            <span className="text-success">Income: ₹{totalIncome.toLocaleString()}</span>
            <span className="text-destructive">Expenses: ₹{totalExpenses.toLocaleString()}</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="bg-card rounded-lg border p-5 shadow-card">
          <h3 className="font-display font-bold text-foreground mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/events')}>Manage Events</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/participants')}>View Participants</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/attendance')}>Track Attendance</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/finance')}>Finance Report</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
