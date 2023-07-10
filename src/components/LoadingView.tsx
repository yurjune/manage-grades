import React from 'react';
import { SpinnerContainer } from './SpinnerContainer';

export const LoadingView = () => {
  return (
    <div className='h-screen'>
      <SpinnerContainer />
    </div>
  );
};
