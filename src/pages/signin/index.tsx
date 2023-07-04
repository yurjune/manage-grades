import { AuthLayout } from '@/components';
import { NextPageWithLayout } from '@/model';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';
import { ReactNode } from 'react';

const SigninPage: NextPageWithLayout = () => {
  return (
    <Card className='w-96'>
      <CardBody className='flex flex-col gap-4'>
        <Typography className='self-center mb-4' variant='h3' color='black'>
          로그인
        </Typography>
        <Input label='Email' size='lg' />
        <Input label='Password' size='lg' />
        <div className='-ml-2.5'>
          <Checkbox label='Remember Me' />
        </div>
      </CardBody>
      <CardFooter className='pt-0'>
        <Button variant='gradient' fullWidth>
          Sign In
        </Button>
        <Typography variant='small' className='mt-6 flex justify-center'>
          Don't have an account?
          <Typography as='a' href='#signup' variant='small' color='blue' className='ml-1 font-bold'>
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
};

SigninPage.getLayout = (page: ReactNode) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SigninPage;
