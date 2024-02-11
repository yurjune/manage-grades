import { CustomTabs, DashboardLayout, PrivateRoute } from '@/components';
import { firestoreApi, useGetStudentsQuery } from '@/redux/firestoreApi';
import { wrapper } from '@/redux/store';
import { SEMESTER_FIELDS, SUBJECT_FIELDS, GROUP_FIELDS as _GROUP_FIELDS } from '@/shared/constants';
import { getAverageScoresOfSemester } from '@/shared/utils';
import { Option, Select } from '@material-tailwind/react';
import { Fragment, ReactNode, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const GROUP_FIELDS = _GROUP_FIELDS.slice(1);
const initialTabValue = GROUP_FIELDS[0].value;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(firestoreApi.endpoints.getStudents.initiate({ group: '' }));
  store.dispatch(firestoreApi.endpoints.getStudents.initiate({ group: initialTabValue }));
  await Promise.all(store.dispatch(firestoreApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export const StatisticsPage = () => {
  const [tabValue, setTabValue] = useState(initialTabValue);
  const [semester, setSemester] = useState(SEMESTER_FIELDS[0]);
  const { data: totalStudents = [] } = useGetStudentsQuery({ group: '' });
  const { data: students = [] } = useGetStudentsQuery({ group: tabValue });

  const totalAverage = getAverageScoresOfSemester(totalStudents, semester);
  const currentGroupAverage = getAverageScoresOfSemester(students, semester);

  const chartData = {
    labels: SUBJECT_FIELDS,
    datasets: [
      {
        label: '전체',
        backgroundColor: 'gold',
        borderWidth: 2,
        data: Object.values(totalAverage ?? { math: 0, english: 0 }),
      },
      {
        label: tabValue + '반',
        backgroundColor: 'purple',
        borderWidth: 2,
        data: Object.values(currentGroupAverage ?? { math: 0, english: 0 }),
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
      <div className='w-[90%] mx-auto'>{<Bar data={chartData} options={chartOptions} />}</div>
    </Fragment>
  );
};

StatisticsPage.getLayout = function Layout(page: ReactNode) {
  return (
    <PrivateRoute>
      <DashboardLayout title='성적 통계'>{page}</DashboardLayout>
    </PrivateRoute>
  );
};

export default StatisticsPage;

const chartOptions = {
  maxBarThickness: 50,
  scales: {
    y: {
      max: 100,
    },
  },
  plugins: {
    title: {
      display: true,
      text: '과목 별 반 평균 점수 분포',
      font: {
        size: 18,
      },
    },
    legend: {
      position: 'bottom' as const,
      labels: {
        font: {
          size: 14,
        },
      },
    },
  },
};
