import { Header, Sidebar } from '@/components';
import { Typography } from '@material-tailwind/react';
import { PropsWithChildren } from 'react';

interface DashboardLayoutProps {
  title: string;
}

export const DashboardLayout = ({ title, children }: PropsWithChildren<DashboardLayoutProps>) => {
  return (
    <div className='w-full h-full'>
      <main className='h-full my-0 mx-auto max-w-[90rem] flex'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <Header />
          <div className='p-6'>
            <Typography variant='h4' className='mb-8 ml-1'>
              {title}
            </Typography>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
