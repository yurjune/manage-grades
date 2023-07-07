import { Header, HomeLayout, StudentAddDialog, Table } from '@/components';
import { Sidebar } from '@/components/Sidebar';
import { AuthProvider } from '@/context';
import { NextPageWithLayout } from '@/model';
import { Button } from '@material-tailwind/react';
import { ReactNode, useState } from 'react';

const Home: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <Header />
          <div className='p-6'>
            <Table />
            <Button onClick={() => setOpen(true)} className='mt-4 float-right'>
              학생 추가
            </Button>
          </div>
        </div>
      </div>
      <StudentAddDialog open={open} handleOpen={() => setOpen((cur) => !cur)} />
    </>
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
