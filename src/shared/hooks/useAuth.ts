import { auth } from '@/firebase-config';
import { userActions } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuth = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (email: string, pw: string) => {
    await signInWithEmailAndPassword(auth, email, pw)
      .then((result) => {
        // user instead of authUser
        const signedUser = (result as any).user;

        dispatch(
          userActions.login({
            user: {
              displayName: signedUser.displayName,
              email: signedUser.email,
            },
          }),
        );
        router.push('/');
      })
      .catch(console.error);
  };

  const logout = async () => {
    await auth.signOut().catch(console.error);
    dispatch(userActions.logout());
    router.push('/signin');
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          userActions.login({
            user: {
              displayName: authUser.displayName,
              email: authUser.email,
            },
          }),
        );
      } else {
        dispatch(userActions.logout());
        router.push('/signin');
      }
    });

    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  return { user, login, logout };
};
