import { Typography } from '@material-tailwind/react';
import { type Row } from './Table';

interface TableBodyProps {
  list: Row[];
}

export const TableBody = ({ list }: TableBodyProps) => {
  return (
    <tbody>
      {list.map(({ name, group, math, english }, index) => {
        const isLast = index === list.length - 1;
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
                {group}
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
          </tr>
        );
      })}
    </tbody>
  );
};
