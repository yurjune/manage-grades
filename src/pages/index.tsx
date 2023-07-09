import { Header, HomeLayout, StudentDialog, Sidebar } from '@/components';
import { Table, TableBody, TableHead } from '@/components/StudentsTable';
import { AuthProvider } from '@/context';
import type { NextPageWithLayout } from '@/model';
import { openStudentDialog, toggleStudentDialog } from '@/redux/features/dialogs/dialogsSlice';
import { selectStudent } from '@/redux/features/student/studentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetStudentsQuery } from '@/redux/services/firestoreApi';
import { Button } from '@material-tailwind/react';
import { ReactNode } from 'react';

const TABLE_FIELDS = ['이름', '성별', '학년', '반', '수정'];

const Home: NextPageWithLayout = () => {
  const { data: students } = useGetStudentsQuery();
  const selectedStudent = useAppSelector((state) => state.student.value);
  const dispatch = useAppDispatch();

  const open = useAppSelector((state) => state.dialogs.studentDialogOpen);
  const handleStudentDialog = () => {
    dispatch(toggleStudentDialog());
    dispatch(selectStudent({ value: null }));
  };

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <Header />
          <div className='p-6'>
            <Table>
              <TableHead fields={TABLE_FIELDS} />
              <TableBody rows={students ?? []} />
            </Table>
            <Button className='mt-4 float-right' onClick={() => dispatch(openStudentDialog())}>
              학생 추가
            </Button>
          </div>
        </div>
      </div>
      <StudentDialog
        open={open}
        handleDialog={handleStudentDialog}
        selectedStudent={selectedStudent}
      />
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
