import { Card } from '@material-tailwind/react';
import { ReactNode } from 'react';

export const StudentsTable = ({ children }: { children: ReactNode }) => {
  return (
    <Card className='overflow-auto w-full px-0'>
      <table className='w-full min-w-max table-auto text-left'>{children}</table>
    </Card>
  );
};
