import { Student } from '@/model';
import { Typography } from '@material-tailwind/react';
import { Fragment } from 'react';

type row = Pick<Student, 'uid' | 'name' | 'group' | 'semesters'>;

interface TableBodyProps {
  rows: row[];
  semester: string;
}

export const TableBody = ({ rows, semester }: TableBodyProps) => {
  const filteredRows = rows.filter((item) => item.semesters[semester]);
  return (
    <Fragment>
      <tbody>
        {filteredRows.map((data, index) => {
          console.log(data);
          const { uid, name, group, semesters } = data;
          const { english, math } = semesters[semester];
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
                <Typography variant='small' color='blue-gray' className='font-bold'>
                  {name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-bold'>
                  {group}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {english}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {math}
                </Typography>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Fragment>
  );
};
