import React from 'react';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { Card } from '@material-tailwind/react';

export const Table = () => {
  return (
    <Card className='overflow-auto h-full w-full px-0'>
      <table className='w-full min-w-max table-auto text-left'>
        <TableHead list={TABLE_HEAD} />
        <TableBody list={TABLE_ROWS} />
      </table>
    </Card>
  );
};

const TABLE_HEAD = ['이름', '반', '수학', '영어'];
export type Row = {
  name: string;
  group: string;
  math: number;
  english: number;
};
const TABLE_ROWS: Row[] = [
  {
    name: '홍길동',
    group: '1반',
    math: 90,
    english: 100,
  },
  {
    name: '임꺽정',
    group: '2반',
    math: 90,
    english: 100,
  },
];
