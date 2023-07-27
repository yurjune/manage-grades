import { AuthLayout, ErrorMessage } from '@/components';
import { env } from '@/shared/constants';
import { AuthContext, AuthProvider } from '@/shared/context';
import { NextPageWithLayout } from '@/shared/model';
import { Button, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react';
import { ReactNode, useContext } from 'react';
import { useForm } from 'react-hook-form';

type LoginFormValue = {
  email: string;
  pw: string;
};

const EMAIL = 'email';
const PW = 'pw';

const SigninPage: NextPageWithLayout = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormValue>();
  const { login } = useContext(AuthContext);

  const handleTestAccountClick = async () => {
    login(env.TEST_EMAIL, env.TEST_PW);
  };

  const onSubmit = handleSubmit((values) => {});

  const emailRegister = register(EMAIL, {
    required: '이메일을 입력해주세요!',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: '이메일 형식에 맞지 않습니다!',
    },
  });

  const pwRegiter = register(PW, {
    required: '비밀번호를 입력해주세요!',
  });

  return (
    <Card className='w-96'>
      <CardBody className='flex flex-col gap-8 mb-4'>
        <Typography className='self-center mb-4' variant='h3' color='black'>
          로그인
        </Typography>
        <div className='flex flex-col gap-2'>
          <Input label='Email' size='lg' {...emailRegister} />
          <ErrorMessage errors={formState.errors} name={EMAIL} />
        </div>
        <div className='flex flex-col gap-2'>
          <Input label='Password' size='lg' {...pwRegiter} />
          <ErrorMessage errors={formState.errors} name={PW} />
        </div>
      </CardBody>
      <CardFooter className='pt-0 flex flex-col gap-4'>
        <Button className='text-sm' variant='gradient' fullWidth onClick={onSubmit}>
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
