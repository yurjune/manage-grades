import { AuthLayout, ErrorMessage } from '@/components';
import { env } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/useAuth';
import { NextPageWithLayout } from '@/shared/model';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react';
import Head from 'next/head';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: '이메일 형식에 맞지 않습니다.' }),
  pw: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상 20자 이하여야 합니다.' })
    .max(20, { message: '비밀번호는 8자 이상 20자 이하여야 합니다.' }),
});

type LoginFormValue = z.infer<typeof loginSchema>;

const EMAIL = 'email';
const PW = 'pw';

const SigninPage: NextPageWithLayout = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormValue>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const handleTestAccountClick = async () => {
    await login(env.TEST_EMAIL, env.TEST_PW);
  };

  const onSubmit = handleSubmit(async () => {
    try {
      await new Promise<string>((res) => {
        setTimeout(() => res('success'), 1000);
      });
    } finally {
      toast.error('회원 정보가 존재하지 않습니다!');
    }
  });

  return (
    <Card className='w-96'>
      <CardBody className='flex flex-col gap-6 mb-4'>
        <Typography className='self-center mb-4' variant='h3' color='black'>
          로그인
        </Typography>

        <div className='flex flex-col gap-1'>
          <Input label='Email' size='lg' {...register(EMAIL)} />
          <ErrorMessage errors={formState.errors} name={EMAIL} />
        </div>

        <div className='flex flex-col gap-1'>
          <Input type='password' label='Password' size='lg' {...register(PW)} />
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
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <AuthLayout>{page}</AuthLayout>;
    </>
  );
};

export default SigninPage;
