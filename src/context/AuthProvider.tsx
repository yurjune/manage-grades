import { auth } from '@/firebase-config';
import { User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null;
  login: (email: string, pw: string) => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const login = (email: string, pw: string) => {
    signInWithEmailAndPassword(auth, email, pw)
      .then(({ user }) => {
        setUser(user);
      })
      .catch(console.error);
  };

  const logout = () => {
    auth.signOut().catch(console.error);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (authUser) {
        if (router.pathname === '/signin') {
          router.push('/');
          return;
        }
      } else {
        if (['/', '/scores'].includes(router.pathname)) {
          router.push('/signin');
          return;
        }
      }
      setAuthorized(true);
    });

    router.events.on('routeChangeStart', () => setAuthorized(false));
    router.events.on('routeChangeComplete', () => setAuthorized(true));

    return () => {
      unSubscribe();
      router.events.off('routeChangeStart', () => setAuthorized(false));
      router.events.off('routeChangeComplete', () => setAuthorized(true));
    };
  }, [router, setUser]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {authorized ? children : <div>loading...</div>}
    </AuthContext.Provider>
  );
};
