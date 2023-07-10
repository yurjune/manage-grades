import { AuthContext } from '@/context';
import { Button, Navbar, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { useContext } from 'react';

export const Header = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Navbar className='sticky top z-10 h-max max-w-full rounded-none py-3 px-6'>
      <div className='flex items-center justify-between'>
        <Typography className='mr-4 cursor-pointer py-1.5 font-bold text-blue-gray-900'>
          <Link href='/'>성적 관리 시스템</Link>
        </Typography>
        <Button color='pink' variant='gradient' size='sm' className='inline-block' onClick={logout}>
          로그아웃
        </Button>
      </div>
    </Navbar>
  );
};
