import { Button, Navbar, Typography } from '@material-tailwind/react';

export const Header = () => {
  return (
    <Navbar className='sticky top z-10 h-max max-w-full rounded-none py-3 px-6'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <Typography as='a' href='#' className='mr-4 cursor-pointer py-1.5 font-medium'>
          성적 관리 시스템
        </Typography>
        <div className='flex items-center gap-4'>
          <Button variant='gradient' size='sm' className='inline-block'>
            <span>로그아웃</span>
          </Button>
        </div>
      </div>
    </Navbar>
  );
};
