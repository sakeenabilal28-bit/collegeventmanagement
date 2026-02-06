import { useRole } from '@/contexts/RoleContext';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { OrganizerDashboard } from '@/components/dashboards/OrganizerDashboard';
import { StudentDashboard } from '@/components/dashboards/StudentDashboard';

const Index = () => {
  const { role } = useRole();

  return (
    <div>
      {role === 'admin' && <AdminDashboard />}
      {role === 'organizer' && <OrganizerDashboard />}
      {role === 'student' && <StudentDashboard />}
    </div>
  );
};

export default Index;
