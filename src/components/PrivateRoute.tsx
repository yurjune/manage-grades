import { useAuth } from '@/shared/hooks/useAuth';
import { ReactNode } from 'react';
import { LoadingView } from './LoadingView';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <LoadingView />;
};
