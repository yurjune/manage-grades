import { Spinner } from '@material-tailwind/react';
import React from 'react';

export const SpinnerContainer = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner className='h-10 w-10' />
    </div>
  );
};
