import { HomeLayout } from '@/components';
import { Sidebar } from '@/components/Sidebar';
import { AuthProvider } from '@/context';
import { NextPageWithLayout } from '@/model';
import { ReactNode } from 'react';

const Home: NextPageWithLayout = () => {
  return (
    <div className='flex'>
      <Sidebar />
    </div>
  );
};

Home.getLayout = (page: ReactNode) => {
  return (
    <AuthProvider>
      <HomeLayout>{page}</HomeLayout>
    </AuthProvider>
  );
};

export default Home;
