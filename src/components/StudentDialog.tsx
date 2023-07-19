import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogProps,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { useAddStudentMutation, useEditStudentMutation } from '@/redux/firestoreApi';
import { useEffect } from 'react';
import { Student } from '@/shared/model';
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
  const editMode = selectedStudent;
  const { register, handleSubmit, control, setValue, reset } = useForm<FormValue>();

  useEffect(() => {
    if (selectedStudent == null) {
      reset();
    } else {
      setValue('name', selectedStudent.name);
      setValue('gender', selectedStudent.gender);
      setValue('grade', selectedStudent.grade);
      setValue('group', selectedStudent.group);
    }
  }, [open, selectedStudent, setValue, reset]);

  const handleSumbitClick = async (values: FormValue) => {
    const { name, gender, grade, group } = values;

    if (editMode) {
      await editStudent({ name, gender, grade, group, uid: selectedStudent.uid });
    } else {
      await addStudent({ name, gender, grade, group });
    }

    handleDialog();
  };

  return (
    <Dialog size='sm' open={open} handler={handleDialog} className='bg-transparent shadow-none'>
      <Card className='mx-auto w-full'>
        <form>
          <CardBody className='flex flex-col gap-8'>
            <Typography variant='h4' color='black'>
              {editMode ? '학생 수정' : '학생 추가'}
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
