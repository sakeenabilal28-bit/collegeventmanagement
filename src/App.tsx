import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { RoleProvider } from "@/contexts/RoleContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Approvals from "./pages/Approvals";
import Participants from "./pages/Participants";
import Attendance from "./pages/Attendance";
import Finance from "./pages/Finance";
import Tickets from "./pages/Tickets";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<Auth />} />
    <Route path="/" element={<ProtectedRoute><Layout><Index /></Layout></ProtectedRoute>} />
    <Route path="/events" element={<ProtectedRoute><Layout><Events /></Layout></ProtectedRoute>} />
    <Route path="/events/:id" element={<ProtectedRoute><Layout><EventDetail /></Layout></ProtectedRoute>} />
    <Route path="/approvals" element={<ProtectedRoute><Layout><Approvals /></Layout></ProtectedRoute>} />
    <Route path="/participants" element={<ProtectedRoute><Layout><Participants /></Layout></ProtectedRoute>} />
    <Route path="/attendance" element={<ProtectedRoute><Layout><Attendance /></Layout></ProtectedRoute>} />
    <Route path="/finance" element={<ProtectedRoute><Layout><Finance /></Layout></ProtectedRoute>} />
    <Route path="/tickets" element={<ProtectedRoute><Layout><Tickets /></Layout></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <RoleProvider>
            <AppRoutes />
          </RoleProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
