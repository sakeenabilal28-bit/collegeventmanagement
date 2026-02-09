import {
  LayoutDashboard, Calendar, Ticket, Users, DollarSign, CheckSquare,
  ClipboardList, Shield, Megaphone, GraduationCap
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useRole } from '@/contexts/RoleContext';
import { UserRole } from '@/data/mockData';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

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

export function AppSidebar() {
  const { role, setRole } = useRole();
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
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <label className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 mb-1.5 block">
          Switch Role
        </label>
        <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
          <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm">
            <div className="flex items-center gap-2">
              <RoleIcon className="h-3.5 w-3.5" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="organizer">Organizer</SelectItem>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
      </SidebarFooter>
    </Sidebar>
  );
}
