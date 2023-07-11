import { CustomTabs, DashboardLayout, StudentDialog } from '@/components';
import { Table, TableBody, TableHead } from '@/components/StudentsTable';
import { STUDENT_FIELDS, GROUP_FIELDS } from '@/shared/constants';
import { AuthProvider } from '@/shared/context';
import type { NextPageWithLayout } from '@/shared/model';
import { openStudentDialog, toggleStudentDialog } from '@/redux/features/dialogs/dialogsSlice';
import { selectStudent } from '@/redux/features/student/studentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { firestoreApi, useGetStudentsQuery } from '@/redux/firestoreApi';
import { wrapper } from '@/redux/store';
import { Button } from '@material-tailwind/react';
import { Fragment, ReactNode, useState } from 'react';

const TABLE_FIELDS = [...STUDENT_FIELDS, '수정/삭제'];
const initialGroupValue = GROUP_FIELDS[0].value;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(firestoreApi.endpoints.getStudents.initiate({ group: initialGroupValue }));
  await Promise.all(store.dispatch(firestoreApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});

const Home: NextPageWithLayout = () => {
  const [tabValue, setTabValue] = useState(initialGroupValue);
  const { data: students = [] } = useGetStudentsQuery({ group: tabValue });
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
        <CustomTabs fields={GROUP_FIELDS} value={tabValue} onChange={(val) => setTabValue(val)} />
      </div>
      <Table>
        <TableHead fields={TABLE_FIELDS} />
        <TableBody rows={students} />
      </Table>
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
