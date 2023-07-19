import { useAddStudentMutation, useEditStudentMutation } from '@/redux/firestoreApi';
import { Student } from '@/shared/model';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Option,
  Select,
  Typography,
  type DialogProps,
} from '@material-tailwind/react';
import { Controller, useForm } from 'react-hook-form';

interface StudentAddDialogProps extends Pick<DialogProps, 'open'> {
  handleDialog: () => void;
  selectedStudent: Student | null;
}

type FormValue = Pick<Student, 'name' | 'gender' | 'grade' | 'group'>;

export const StudentDialog = (props: StudentAddDialogProps) => {
  const { open, handleDialog, selectedStudent } = props;
  const [addStudent] = useAddStudentMutation();
  const [editStudent] = useEditStudentMutation();
  const { register, handleSubmit, control, reset } = useForm<FormValue>({
    values: {
      name: selectedStudent?.name ?? '',
      gender: selectedStudent?.gender ?? '',
      grade: selectedStudent?.grade ?? '',
      group: selectedStudent?.group ?? '',
    },
  });

  const handleSumbitClick = async (values: FormValue) => {
    if (selectedStudent) {
      await editStudent({ ...values, uid: selectedStudent.uid });
    } else {
      await addStudent({ ...values });
    }

    reset();
    handleDialog();
  };

  return (
    <Dialog size='sm' open={open} handler={handleDialog} className='bg-transparent shadow-none'>
      <Card className='mx-auto w-full'>
        <form>
          <CardBody className='flex flex-col gap-8'>
            <Typography variant='h4' color='black'>
              {selectedStudent ? '학생 수정' : '학생 추가'}
            </Typography>
            <Input {...register('name', { required: true })} label='이름' size='lg' />
            <Controller
              name='gender'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} label='성별'>
                  {['남', '여'].map((val) => (
                    <Option key={val} value={val}>
                      {val}
                    </Option>
                  ))}
                </Select>
              )}
            />
            <Controller
              name='grade'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} label='학년'>
                  {['1', '2', '3'].map((val) => (
                    <Option key={val} value={val}>
                      {val}
                    </Option>
                  ))}
                </Select>
              )}
            />
            <Controller
              name='group'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} label='반'>
                  {['A', 'B', 'C'].map((val) => (
                    <Option key={val} value={val}>
                      {val}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </CardBody>
        </form>
        <CardFooter className='pt-0'>
          <Button variant='gradient' onClick={handleSubmit(handleSumbitClick)} fullWidth>
            등록
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
