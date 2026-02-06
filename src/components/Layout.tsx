import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useRole } from '@/contexts/RoleContext';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const roleTitles = { admin: 'Administrator', organizer: 'Event Organizer', student: 'Student' };

export function Layout({ children }: { children: React.ReactNode }) {
  const { role } = useRole();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="hidden sm:block">
                <span className="text-sm font-medium text-muted-foreground">
                  Logged in as <span className="text-foreground font-semibold">{roleTitles[role]}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-destructive text-destructive-foreground">
                  3
                </Badge>
              </Button>
              <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  {role[0].toUpperCase()}
                </span>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
