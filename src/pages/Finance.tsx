import { events } from '@/data/mockData';
import { StatsCard } from '@/components/StatsCard';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const totalIncome = events.reduce((s, e) => s + e.income, 0);
const totalExpenses = events.reduce((s, e) => s + e.expenses, 0);
const totalProfit = totalIncome - totalExpenses;

const chartData = events.map(e => ({
  name: e.name.length > 12 ? e.name.slice(0, 12) + '…' : e.name,
  income: e.income,
  expenses: e.expenses,
  profit: e.income - e.expenses,
}));

const Finance = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold font-display text-foreground">Finance Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Track income, expenses, and profit/loss across all events</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Total Income" value={`₹${totalIncome.toLocaleString()}`} icon={TrendingUp} variant="success" />
      <StatsCard title="Total Expenses" value={`₹${totalExpenses.toLocaleString()}`} icon={TrendingDown} variant="warning" />
      <StatsCard title="Net Profit" value={`₹${totalProfit.toLocaleString()}`} icon={PiggyBank} variant="accent" />
      <StatsCard title="Avg per Event" value={`₹${Math.round(totalProfit / events.length).toLocaleString()}`} icon={DollarSign} variant="info" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-card border rounded-lg p-5 shadow-card">
        <h3 className="font-display font-bold text-foreground mb-4">Revenue Breakdown</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="hsl(142, 71%, 45%)" name="Income" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="hsl(0, 72%, 51%)" name="Expenses" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card border rounded-lg p-5 shadow-card">
        <h3 className="font-display font-bold text-foreground mb-4">Profit Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="profit" stroke="hsl(40, 95%, 55%)" strokeWidth={2.5} dot={{ fill: 'hsl(40, 95%, 55%)', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-card border rounded-lg shadow-card overflow-hidden">
      <div className="p-5">
        <h3 className="font-display font-bold text-foreground">Event-wise Financial Summary</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead className="text-right">Income</TableHead>
            <TableHead className="text-right">Expenses</TableHead>
            <TableHead className="text-right">Profit/Loss</TableHead>
            <TableHead className="text-right">Margin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map(e => {
            const p = e.income - e.expenses;
            const margin = e.income > 0 ? Math.round((p / e.income) * 100) : 0;
            return (
              <TableRow key={e.id}>
                <TableCell className="font-medium text-foreground">{e.name}</TableCell>
                <TableCell className="text-right text-success">₹{e.income.toLocaleString()}</TableCell>
                <TableCell className="text-right text-destructive">₹{e.expenses.toLocaleString()}</TableCell>
                <TableCell className={`text-right font-semibold ${p >= 0 ? 'text-success' : 'text-destructive'}`}>
                  ₹{Math.abs(p).toLocaleString()} {p >= 0 ? '↑' : '↓'}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{margin}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  </div>
);

export default Finance;
