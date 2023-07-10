import { CustomTabs, DashboardLayout, ScoreDialog, SpinnerContainer } from '@/components';
import { Table, TableBody, TableHead } from '@/components/SemestersTable';
import { AuthProvider } from '@/context';
import { useSelect } from '@/hooks';
import { openScoreDialog, toggleScoreDialog } from '@/redux/features/dialogs/dialogsSlice';
import { selectStudent } from '@/redux/features/student/studentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetStudentsQuery } from '@/redux/services/firestoreApi';
import { Button, Option, Select } from '@material-tailwind/react';
import { Fragment, ReactNode, useState } from 'react';

const TABLE_FIELDS = ['학기', '이름', '반', '영어', '수학', '수정'];
const TAB_FIELDS = [
  { label: '전체', value: '' },
  { label: 'A반', value: 'A' },
  { label: 'B반', value: 'B' },
  { label: 'C반', value: 'C' },
];
const SEMESTER_FIELDS = ['23-1', '23-2'];

const ScoresPage = () => {
  const [tabValue, setTabValue] = useState(TAB_FIELDS[0].value);
  const [semester, handleSemesterChange] = useSelect(SEMESTER_FIELDS[0]);
  const { data: students = [], isLoading } = useGetStudentsQuery({ group: tabValue });
  const open = useAppSelector((state) => state.dialogs.scoreDialogOpen);
  const selectedStudent = useAppSelector((state) => state.student.value);
  const dispatch = useAppDispatch();

  const handleScoreDialog = () => {
    dispatch(toggleScoreDialog());
    dispatch(selectStudent({ value: null }));
  };

  return (
    <Fragment>
      <div className='w-24 mb-4'>
        <Select label='학기' value={semester} onChange={handleSemesterChange} className='bg-white'>
          {SEMESTER_FIELDS.map((val) => (
            <Option key={val} value={val}>
              {val}
            </Option>
          ))}
        </Select>
      </div>
      <CustomTabs fields={TAB_FIELDS} value={tabValue} onChange={(val) => setTabValue(val)} />
      {isLoading ? (
        <SpinnerContainer />
      ) : (
        <Table>
          <TableHead fields={TABLE_FIELDS} />
          <TableBody rows={students ?? []} semester={semester} />
        </Table>
      )}
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
