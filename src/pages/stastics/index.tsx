import { CustomTabs, DashboardLayout } from '@/components';
import { AuthProvider } from '@/context';
import { useSelect } from '@/hooks';
import { firestoreApi, useGetStudentsQuery } from '@/redux/services/firestoreApi';
import { wrapper } from '@/redux/store';
import { getTotalScoresForCurrentSemester } from '@/utils';
import { Option, Select } from '@material-tailwind/react';
import { Fragment, ReactNode, useState } from 'react';
import { Bar } from 'react-chartjs-2';

type TabValue = 'A' | 'B' | 'C';
const TAB_FIELDS = [
  { label: 'A반', value: 'A' },
  { label: 'B반', value: 'B' },
  { label: 'C반', value: 'C' },
];
const SEMESTER_FIELDS = ['23-1', '23-2'];
const SUBJECT_FIELDS = ['수학', '영어'];

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(firestoreApi.endpoints.getStudents.initiate({ group: '' }));
  await Promise.all(store.dispatch(firestoreApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export const StasticsPage = () => {
  const [tabValue, setTabValue] = useState('A');
  const [semester, handleSemesterChange] = useSelect(SEMESTER_FIELDS[0]);
  const { data: students = [] } = useGetStudentsQuery({ group: '' });
  const scores = getTotalScoresForCurrentSemester(students, semester);

  const data = {
    labels: SUBJECT_FIELDS,
    datasets: [
      {
        label: '전체',
        backgroundColor: 'gold',
        borderWidth: 2,
        data: Object.values(scores.total),
      },
      {
        label: tabValue + '반',
        backgroundColor: 'purple',
        borderWidth: 2,
        data: Object.values(scores[tabValue as TabValue]),
      },
    ],
  };

  return (
    <Fragment>
      <div className='flex mb-12'>
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
      <div className='w-[90%] mx-auto'>
        <Bar data={data} options={options} />
      </div>
    </Fragment>
  );
};

export const options = {
  maxBarThickness: 80,
  scales: {
    y: {
      max: 100,
    },
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: '과목 별 반 평균 점수 분포',
      font: {
        size: 18,
      },
    },
  },
};

StasticsPage.getLayout = (page: ReactNode) => {
  return (
    <AuthProvider>
      <DashboardLayout title='성적 통계'>{page}</DashboardLayout>
    </AuthProvider>
  );
};

export default StasticsPage;
