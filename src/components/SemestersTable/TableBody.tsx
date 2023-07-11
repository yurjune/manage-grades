import { Student } from '@/model';
import { openScoreDialog } from '@/redux/features/dialogs/dialogsSlice';
import { selectStudent } from '@/redux/features/student/studentSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Typography, IconButton } from '@material-tailwind/react';
import { Fragment } from 'react';
import { FaEdit } from 'react-icons/fa';

interface TableBodyProps {
  rows: Student[];
  semester: string;
}

const defaultScore = {
  korean: '-',
  math: '-',
  english: '-',
  science: '-',
};
export const TableBody = ({ rows, semester }: TableBodyProps) => {
  const dispatch = useAppDispatch();
  const filteredRows = rows.filter((item) => item?.semesters?.[semester]);

  const handleEditClick = (student: Student) => () => {
    dispatch(selectStudent({ value: student }));
    dispatch(openScoreDialog());
  };

  return (
    <Fragment>
      <tbody>
        {filteredRows.map((student, index) => {
          const { uid, name, group, semesters } = student;
          const { korean, math, english, science } = semesters ? semesters[semester] : defaultScore;
          const isLast = index === rows.length - 1;
          const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

          return (
            <tr key={uid}>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-bold'>
                  {semester}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {group}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {korean}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {math}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {english}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {science}
                </Typography>
              </td>
              <td className={`${classes} w-[120px]`}>
                <IconButton size='sm' onClick={handleEditClick(student)}>
                  <FaEdit />
                </IconButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Fragment>
  );
};
