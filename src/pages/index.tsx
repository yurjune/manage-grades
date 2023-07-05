import { AuthContext, AuthProvider } from '@/context';
import { Button } from '@material-tailwind/react';
import { ReactNode, useContext } from 'react';

export default function Home() {
  const { logout } = useContext(AuthContext);
  const handleClick = () => {
    logout();
  };

  return <Button onClick={handleClick}>로그아웃</Button>;
}

Home.getLayout = (page: ReactNode) => {
  return <AuthProvider>{page}</AuthProvider>;
};
