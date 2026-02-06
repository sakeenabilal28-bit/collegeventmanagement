import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'info';
}

const variantStyles = {
  default: 'bg-card border-border',
  accent: 'bg-card border-l-4 border-l-accent',
  success: 'bg-card border-l-4 border-l-success',
  warning: 'bg-card border-l-4 border-l-warning',
  info: 'bg-card border-l-4 border-l-info',
};

export const StatsCard = ({ title, value, icon: Icon, trend, trendUp, variant = 'default' }: StatsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`rounded-lg border p-5 shadow-card ${variantStyles[variant]}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-bold font-display text-foreground">{value}</p>
        {trend && (
          <p className={`mt-1 text-xs font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className="rounded-lg bg-primary/10 p-3">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
  </motion.div>
);
