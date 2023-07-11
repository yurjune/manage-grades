import { CustomTabs, DashboardLayout, ScoreDialog } from '@/components';
import { Table, TableBody, TableHead } from '@/components/SemestersTable';
import { AuthProvider } from '@/context';
import { useSelect } from '@/hooks';
import { NextPageWithLayout } from '@/model';
import { openScoreDialog, toggleScoreDialog } from '@/redux/features/dialogs/dialogsSlice';
import { selectStudent } from '@/redux/features/student/studentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { firestoreApi, useGetStudentsQuery } from '@/redux/services/firestoreApi';
import { wrapper } from '@/redux/store';
import { Button, Option, Select } from '@material-tailwind/react';
import { Fragment, ReactNode, useState } from 'react';

const TABLE_FIELDS = ['학기', '이름', '반', '국어', '수학', '영어', '과학', '수정'];
const TAB_FIELDS = [
  { label: '전체', value: '' },
  { label: 'A반', value: 'A' },
  { label: 'B반', value: 'B' },
  { label: 'C반', value: 'C' },
];
const initialGroupValue = TAB_FIELDS[0].value;
const SEMESTER_FIELDS = ['23-1', '23-2'];

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(firestoreApi.endpoints.getStudents.initiate({ group: initialGroupValue }));
  await Promise.all(store.dispatch(firestoreApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});

const ScoresPage: NextPageWithLayout = () => {
  const [tabValue, setTabValue] = useState(initialGroupValue);
  const [semester, handleSemesterChange] = useSelect(SEMESTER_FIELDS[0]);
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
            onChange={handleSemesterChange}
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
          <CustomTabs fields={TAB_FIELDS} value={tabValue} onChange={(val) => setTabValue(val)} />
        </div>
      </div>
      <Table>
        <TableHead fields={TABLE_FIELDS} />
        <TableBody rows={students ?? []} semester={semester} />
      </Table>
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

ScoresPage.getLayout = (page: ReactNode) => {
  return (
    <AuthProvider>
      <DashboardLayout title='성적 관리'>{page}</DashboardLayout>
    </AuthProvider>
  );
};

export default ScoresPage;
