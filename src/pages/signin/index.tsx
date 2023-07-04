import { AuthLayout } from '@/components';
import { NextPageWithLayout } from '@/model';
import { ReactNode } from 'react';
import { Card, CardBody, CardFooter, Typography, Input, Button } from '@material-tailwind/react';

const SigninPage: NextPageWithLayout = () => {
  return (
    <Card className='w-96'>
      <CardBody className='flex flex-col gap-4 mb-4'>
        <Typography className='self-center mb-4' variant='h3' color='black'>
          로그인
        </Typography>
        <Input label='Email' size='lg' />
        <Input label='Password' size='lg' />
      </CardBody>
      <CardFooter className='pt-0 flex flex-col gap-4'>
        <Button className='text-sm' variant='gradient' fullWidth>
          로그인
        </Button>
        <Button className='text-sm' variant='gradient' fullWidth color='pink'>
          테스트 계정 이용하기
        </Button>
      </CardFooter>
    </Card>
  );
};

SigninPage.getLayout = (page: ReactNode) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SigninPage;
