import { CustomTabs, DashboardLayout, PrivateRoute, StudentDialog } from '@/components';
import { StudentsTable, StudentsTableBody, StudentsTableHead } from '@/components/StudentsTable';
import { openStudentDialog, toggleStudentDialog } from '@/redux/features/dialogsSlice';
import { selectStudent } from '@/redux/features/studentSlice';
import { firestoreApi, useGetStudentsQuery } from '@/redux/firestoreApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { wrapper } from '@/redux/store';
import { GROUP_FIELDS, STUDENT_FIELDS } from '@/shared/constants';
import type { NextPageWithLayout } from '@/shared/model';
import { Button } from '@material-tailwind/react';
import Head from 'next/head';
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

      <StudentsTable>
        <StudentsTableHead fields={TABLE_FIELDS} />
        <StudentsTableBody rows={students} />
      </StudentsTable>

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

Home.getLayout = function Layout(page: ReactNode) {
  return (
    <>
      <Head>
        <title>학생 관리</title>
      </Head>
      <PrivateRoute>
        <DashboardLayout title='학생 관리'>{page}</DashboardLayout>
      </PrivateRoute>
    </>
  );
};

export default Home;
