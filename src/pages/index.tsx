import { getStudents } from '@/api';
import { Header, HomeLayout, Table } from '@/components';
import { Sidebar } from '@/components/Sidebar';
import { AuthProvider } from '@/context';
import { NextPageWithLayout } from '@/model';
import { ReactNode } from 'react';

const Home: NextPageWithLayout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Header />
        <div className='p-6'>
          <Table />
        </div>
      </div>
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
