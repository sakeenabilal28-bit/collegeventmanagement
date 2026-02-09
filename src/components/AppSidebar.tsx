import {
  LayoutDashboard, Calendar, Ticket, Users, DollarSign, CheckSquare,
  ClipboardList, Shield, Megaphone, GraduationCap, LogOut
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useRole } from '@/contexts/RoleContext';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/data/mockData';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const adminLinks = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Events', url: '/events', icon: Calendar },
  { title: 'Approvals', url: '/approvals', icon: CheckSquare },
  { title: 'Participants', url: '/participants', icon: Users },
  { title: 'Attendance', url: '/attendance', icon: ClipboardList },
  { title: 'Finance', url: '/finance', icon: DollarSign },
  { title: 'Tickets', url: '/tickets', icon: Ticket },
];

const organizerLinks = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Events', url: '/events', icon: Calendar },
  { title: 'Participants', url: '/participants', icon: Users },
  { title: 'Attendance', url: '/attendance', icon: ClipboardList },
  { title: 'Finance', url: '/finance', icon: DollarSign },
];

const studentLinks = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Events', url: '/events', icon: Calendar },
  { title: 'My Tickets', url: '/tickets', icon: Ticket },
];

const linksByRole: Record<UserRole, typeof adminLinks> = {
  admin: adminLinks,
  organizer: organizerLinks,
  student: studentLinks,
};

const roleIcons: Record<UserRole, typeof Shield> = {
  admin: Shield,
  organizer: Megaphone,
  student: GraduationCap,
};

const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  organizer: 'Organizer',
  student: 'Student',
};

export function AppSidebar() {
  const { role } = useRole();
  const { user, signOut } = useAuth();
  const links = linksByRole[role];
  const RoleIcon = roleIcons[role];

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="gradient-accent rounded-lg p-2">
            <Calendar className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-sidebar-foreground tracking-tight">CampusEvents</h2>
            <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest">Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-[10px] uppercase tracking-widest px-3 mb-1">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center gap-2">
          <RoleIcon className="h-4 w-4 text-sidebar-foreground/60" />
          <Badge variant="outline" className="text-xs">
            {roleLabels[role]}
          </Badge>
        </div>
        <p className="text-xs text-sidebar-foreground/50 truncate">{user?.email}</p>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sidebar-foreground/70" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
