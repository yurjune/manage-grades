import { useAddStudentMutation, useEditStudentMutation } from '@/redux/firestoreApi';
import { Student } from '@/shared/model';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
  type DialogProps,
} from '@material-tailwind/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { InputField, SelectField } from './CustomFields';

enum Field {
  NAME = 'name',
  GENDER = 'gender',
  GRADE = 'grade',
  GROUP = 'group',
}

const studentSchema = z.object({
  [Field.NAME]: z.string().min(2, '이름을 2자 이상 입력해주세요.'),
  [Field.GENDER]: z.string().min(1, '성별을 선택해주세요.'),
  [Field.GRADE]: z.string().min(1, '학년을 선택해주세요.'),
  [Field.GROUP]: z.string().min(1, '반을 선택해주세요.'),
});

type FormValue = z.infer<typeof studentSchema>;

interface StudentDialogProps extends Pick<DialogProps, 'open'> {
  handleDialog: () => void;
  selectedStudent: Student | null;
}

export const StudentDialog = ({ open, handleDialog, selectedStudent }: StudentDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [addStudent] = useAddStudentMutation();
  const [editStudent] = useEditStudentMutation();
  const editMode = Boolean(selectedStudent);

  const { register, handleSubmit, control, reset, formState } = useForm<FormValue>({
    values: {
      name: selectedStudent?.name ?? '',
      gender: selectedStudent?.gender ?? '',
      grade: selectedStudent?.grade ?? '',
      group: selectedStudent?.group ?? '',
    },
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    if (selectedStudent) {
      await editStudent({ ...values, uid: selectedStudent.uid });
    } else {
      await addStudent({ ...values });
    }
    setLoading(false);

    handleDialog();
    reset();
    toast.success(editMode ? '성적을 변경하였습니다.' : '성적을 등록하였습니다.');
  });

  const required = { required: '값을 입력해주세요!' };
  return (
    <Dialog size='sm' open={open} handler={handleDialog} className='bg-transparent shadow-none'>
      <Card className='mx-auto w-full'>
        <CardBody>
          <Typography variant='h4' color='black' className='mb-8'>
            {selectedStudent ? '학생 수정' : '학생 추가'}
          </Typography>

          <form className='flex flex-col gap-6'>
            <InputField
              {...register(Field.NAME)}
              formState={formState}
              inputProps={{ label: '이름', size: 'lg' }}
            />
            <SelectField
              control={control}
              name={Field.GENDER}
              rules={required}
              options={['남', '여']}
              selectProps={{ label: '성별' }}
            />
            <SelectField
              control={control}
              name={Field.GRADE}
              rules={required}
              options={['1', '2', '3']}
              selectProps={{ label: '학년' }}
            />
            <SelectField
              control={control}
              name={Field.GROUP}
              rules={required}
              options={['A', 'B', 'C']}
              selectProps={{ label: '반' }}
            />
          </form>
        </CardBody>

        <CardFooter className='pt-0'>
          <Button variant='gradient' onClick={onSubmit} className='float-right' loading={loading}>
            등록
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
