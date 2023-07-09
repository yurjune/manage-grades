import { Student } from '@/model';
import { openStudentDialog } from '@/redux/features/dialogs/dialogsSlice';
import { selectStudent } from '@/redux/features/student/studentSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IconButton, Typography } from '@material-tailwind/react';
import { FaEdit } from 'react-icons/fa';

interface TableBodyProps {
  rows: Student[];
}

export const TableBody = ({ rows }: TableBodyProps) => {
  const dispatch = useAppDispatch();

  return (
    <tbody>
      {rows.map((data, index) => {
        const { name, gender, grade, group } = data;
        const isLast = index === rows.length - 1;
        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

        const handleEditClick = () => {
          dispatch(openStudentDialog());
          dispatch(selectStudent({ value: data }));
        };

        return (
          <tr key={name}>
            <td className={classes}>
              <Typography variant='small' color='blue-gray' className='font-bold'>
                {name}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant='small' color='blue-gray' className='font-normal'>
                {gender}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant='small' color='blue-gray' className='font-normal'>
                {grade}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant='small' color='blue-gray' className='font-normal'>
                {group}
              </Typography>
            </td>
            <td className={classes}>
              <IconButton size='sm' onClick={handleEditClick}>
                <FaEdit />
              </IconButton>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
