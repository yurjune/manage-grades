import { CustomTabs, DashboardLayout } from '@/components';
import { AuthProvider } from '@/context';
import React, { ReactNode, Fragment, useState } from 'react';
import { wrapper } from '@/redux/store';
import { firestoreApi, useGetStudentsQuery } from '@/redux/services/firestoreApi';
import { getTotalScoresForCurrentSemester } from '@/utils';
import { useSelect } from '@/hooks';
import { Select, Option } from '@material-tailwind/react';

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

export const StasticsPage = () => {
  const [tabValue, setTabValue] = useState(initialGroupValue);
  const [semester, handleSemesterChange] = useSelect(SEMESTER_FIELDS[0]);
  const { data: students = [] } = useGetStudentsQuery({ group: '' });
  // const scores = getTotalScoresForCurrentSemester(students, semester);

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
    </Fragment>
  );
};

StasticsPage.getLayout = (page: ReactNode) => {
  return (
    <AuthProvider>
      <DashboardLayout title='성적 통계'>{page}</DashboardLayout>
    </AuthProvider>
  );
};

export default StasticsPage;
