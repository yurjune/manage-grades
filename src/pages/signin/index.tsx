import { AuthLayout } from '@/components';
import { env } from '@/shared/constants';
import { AuthContext, AuthProvider } from '@/shared/context';
import { NextPageWithLayout } from '@/shared/model';
import { Button, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react';
import { ReactNode, useContext } from 'react';

const SigninPage: NextPageWithLayout = () => {
  const { login } = useContext(AuthContext);

  const handleTestAccountClick = async () => {
    login(env.TEST_EMAIL, env.TEST_PW);
  };

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
        <Button
          className='text-sm'
          variant='gradient'
          fullWidth
          color='pink'
          onClick={handleTestAccountClick}
        >
          테스트 계정 이용하기
        </Button>
      </CardFooter>
    </Card>
  );
};

SigninPage.getLayout = (page: ReactNode) => {
  return (
    <AuthProvider>
      <AuthLayout>{page}</AuthLayout>;
    </AuthProvider>
  );
};

export default SigninPage;
