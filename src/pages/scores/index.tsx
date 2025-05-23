import { CustomTabs, DashboardLayout, PrivateRoute, ScoreDialog } from '@/components';
import { SemesterTable, SemesterTableBody, SemesterTableHead } from '@/components/SemestersTable';
import { openScoreDialog, toggleScoreDialog } from '@/redux/features/dialogsSlice';
import { selectStudent } from '@/redux/features/studentSlice';
import { firestoreApi, useGetStudentsQuery } from '@/redux/firestoreApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { wrapper } from '@/redux/store';
import { GROUP_FIELDS, SEMESTER_FIELDS, SUBJECT_FIELDS } from '@/shared/constants';
import { NextPageWithLayout } from '@/shared/model';
import { Button, Option, Select } from '@material-tailwind/react';
import Head from 'next/head';
import { Fragment, ReactNode, useState } from 'react';

const TABLE_FIELDS = ['학기', '이름', '반', ...SUBJECT_FIELDS, '수정'];
const initialGroupValue = GROUP_FIELDS[0].value;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(firestoreApi.endpoints.getStudents.initiate({ group: initialGroupValue }));
  await Promise.all(store.dispatch(firestoreApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});

const ScoresPage: NextPageWithLayout = () => {
  const [tabValue, setTabValue] = useState(initialGroupValue);
  const [semester, setSemester] = useState(SEMESTER_FIELDS[0]);

  const { data: students = [] } = useGetStudentsQuery({ group: tabValue });

  const open = useAppSelector((state) => state.dialogs.scoreDialogOpen);
  const selectedStudent = useAppSelector((state) => state.student.value);
  const dispatch = useAppDispatch();

  const handleScoreDialog = () => {
    dispatch(toggleScoreDialog());
    dispatch(selectStudent({ value: null }));
  };

  return (
    <Fragment>
      <div className='flex mb-4'>
        <div>
          <Select
            label='학기'
            value={semester}
            onChange={(val) => setSemester(val ?? '')}
            className='bg-white'
          >
            {SEMESTER_FIELDS.map((val) => (
              <Option key={val} value={val}>
                {val}
              </Option>
            ))}
          </Select>
        </div>

        <div className='flex-1 ml-4'>
          <CustomTabs fields={GROUP_FIELDS} value={tabValue} onChange={(val) => setTabValue(val)} />
        </div>
      </div>

      <SemesterTable>
        <SemesterTableHead fields={TABLE_FIELDS} />
        <SemesterTableBody rows={students ?? []} semester={semester} />
      </SemesterTable>

      <Button onClick={() => dispatch(openScoreDialog())} className='mt-4 float-right'>
        성적 추가
      </Button>

      <ScoreDialog
        open={open}
        handleDialog={handleScoreDialog}
        students={students}
        semesters={SEMESTER_FIELDS}
        selectedStudent={selectedStudent}
        currentSemester={semester}
      />
    </Fragment>
  );
};

ScoresPage.getLayout = function Layout(page: ReactNode) {
  return (
    <>
      <Head>
        <title>성적 관리</title>
      </Head>
      <PrivateRoute>
        <DashboardLayout title='성적 관리'>{page}</DashboardLayout>
      </PrivateRoute>
    </>
  );
};

export default ScoresPage;
