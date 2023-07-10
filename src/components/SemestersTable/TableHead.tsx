import { Typography } from '@material-tailwind/react';
import React from 'react';

interface TableHeadProps {
  fields: string[];
}

export const TableHead = ({ fields }: TableHeadProps) => {
  return (
    <thead>
      <tr>
        {fields.map((head) => (
          <th key={head} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal leading-none opacity-70'
            >
              {head}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
};
