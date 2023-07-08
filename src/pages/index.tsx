import { Header, HomeLayout, StudentAddDialog } from '@/components';
import { Sidebar } from '@/components/Sidebar';
import { Table, TableBody, TableHead } from '@/components/StudentsTable';
import { AuthProvider } from '@/context';
import type { NextPageWithLayout, Student } from '@/model';
import { Button } from '@material-tailwind/react';
import { ReactNode, useState } from 'react';

const TABLE_FIELDS = ['이름', '성별', '학년', '반'];

const Home: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <Header />
          <div className='p-6'>
            <Table>
              <TableHead fields={TABLE_FIELDS} />
              <TableBody rows={students} />
            </Table>
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
