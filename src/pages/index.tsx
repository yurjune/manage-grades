import { CustomTabs, DashboardLayout, SpinnerContainer, StudentDialog } from '@/components';
import { Table, TableBody, TableHead } from '@/components/StudentsTable';
import { AuthProvider } from '@/context';
import type { NextPageWithLayout } from '@/model';
import { openStudentDialog, toggleStudentDialog } from '@/redux/features/dialogs/dialogsSlice';
import { selectStudent } from '@/redux/features/student/studentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetStudentsQuery } from '@/redux/services/firestoreApi';
import { Button } from '@material-tailwind/react';
import { Fragment, ReactNode, useState } from 'react';

const TABLE_FIELDS = ['이름', '성별', '학년', '반', '수정/삭제'];
const TAB_FIELDS = [
  { label: '전체', value: '' },
  { label: 'A반', value: 'A' },
  { label: 'B반', value: 'B' },
  { label: 'C반', value: 'C' },
];

const Home: NextPageWithLayout = () => {
  const [tabValue, setTabValue] = useState(TAB_FIELDS[0].value);
  const { data: students, isLoading } = useGetStudentsQuery({ group: tabValue });
  const open = useAppSelector((state) => state.dialogs.studentDialogOpen);
  const selectedStudent = useAppSelector((state) => state.student.value);
  const dispatch = useAppDispatch();

  const handleStudentDialog = () => {
    dispatch(toggleStudentDialog());
    dispatch(selectStudent({ value: null }));
  };

  return (
    <Fragment>
      <div className='mb-4'>
        <CustomTabs fields={TAB_FIELDS} value={tabValue} onChange={(val) => setTabValue(val)} />
      </div>
      {isLoading ? (
        <SpinnerContainer />
      ) : (
        <Table>
          <TableHead fields={TABLE_FIELDS} />
          <TableBody rows={students ?? []} />
        </Table>
      )}
      <Button className='mt-4 float-right' onClick={() => dispatch(openStudentDialog())}>
        학생 추가
      </Button>
      <StudentDialog
        open={open}
        handleDialog={handleStudentDialog}
        selectedStudent={selectedStudent}
      />
    </Fragment>
  );
};

Home.getLayout = (page: ReactNode) => {
  return (
    <AuthProvider>
      <DashboardLayout title='학생 관리'>{page}</DashboardLayout>
    </AuthProvider>
  );
};

export default Home;
