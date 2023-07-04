import React, { ReactNode } from 'react';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-gray-200'>{children}</div>
  );
};
