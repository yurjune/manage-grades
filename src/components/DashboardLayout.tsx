import { Header, Sidebar } from '@/components';
import { Typography } from '@material-tailwind/react';
import { PropsWithChildren } from 'react';

interface DashboardLayoutProps {
  title: string;
}

export const DashboardLayout = ({ title, children }: PropsWithChildren<DashboardLayoutProps>) => {
  return (
    <div className='w-screen h-screen'>
      <main className='h-screen my-0 mx-auto max-w-[100rem] flex'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <Header />
          <div className='p-6'>
            <Typography variant='h4' className='mb-6 ml-1'>
              {title}
            </Typography>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
