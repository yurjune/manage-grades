import { Typography } from '@material-tailwind/react';
import React from 'react';

interface Props {
  fields: string[];
}

export const SemesterTableHead = ({ fields }: Props) => {
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
