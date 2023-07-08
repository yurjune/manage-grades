import { Student } from '@/model';
import { Typography } from '@material-tailwind/react';

interface TableBodyProps {
  rows: Student[];
}

export const TableBody = ({ rows }: TableBodyProps) => {
  return (
    <tbody>
      {rows.map(({ name, gender, grade, group }, index) => {
        const isLast = index === rows.length - 1;
        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

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
          </tr>
        );
      })}
    </tbody>
  );
};
