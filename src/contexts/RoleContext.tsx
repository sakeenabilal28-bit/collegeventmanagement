import React, { createContext, useContext } from 'react';
import { useAuth, AppRole } from '@/hooks/useAuth';

// Keep UserRole type for backward compatibility
export type UserRole = AppRole;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType>({ role: 'student', setRole: () => {} });

export const useRole = () => useContext(RoleContext);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role } = useAuth();
  
  // setRole is now a no-op since roles come from the database
  return (
    <RoleContext.Provider value={{ role, setRole: () => {} }}>
      {children}
    </RoleContext.Provider>
  );
};
