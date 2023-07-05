import React, { ReactNode } from 'react';

export const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-screen h-screen bg-blue-gray-900'>
      <main className='h-screen my-0 mx-auto max-w-[100rem]'>{children}</main>
    </div>
  );
};
