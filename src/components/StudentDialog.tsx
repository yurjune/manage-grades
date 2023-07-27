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
import { ErrorMessage } from './ErrorMessage';

const NAME = 'name';
const GENDER = 'gender';
const GRADE = 'grade';
const GROUP = 'group';
type FormValue = Pick<Student, 'name' | 'gender' | 'grade' | 'group'>;

interface StudentDialogProps extends Pick<DialogProps, 'open'> {
  handleDialog: () => void;
  selectedStudent: Student | null;
}

export const StudentDialog = ({ open, handleDialog, selectedStudent }: StudentDialogProps) => {
  const [addStudent] = useAddStudentMutation();
  const [editStudent] = useEditStudentMutation();

  const { register, handleSubmit, control, reset, formState } = useForm<FormValue>({
    values: {
      name: selectedStudent?.name ?? '',
      gender: selectedStudent?.gender ?? '',
      grade: selectedStudent?.grade ?? '',
      group: selectedStudent?.group ?? '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (selectedStudent) {
      await editStudent({ ...values, uid: selectedStudent.uid });
    } else {
      await addStudent({ ...values });
    }

    reset();
    handleDialog();
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
            <div className='flex flex-col gap-2'>
              <Input {...register(NAME, required)} label='이름' size='lg' />
              <ErrorMessage name={NAME} errors={formState.errors} />
            </div>
            <div className='flex flex-col gap-2'>
              <Controller
                name={GENDER}
                control={control}
                rules={required}
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
              <ErrorMessage name={GENDER} errors={formState.errors} />
            </div>
            <div className='flex flex-col gap-2'>
              <Controller
                name={GRADE}
                control={control}
                rules={required}
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
              <ErrorMessage name={GRADE} errors={formState.errors} />
            </div>
            <div className='flex flex-col gap-2'>
              <Controller
                name={GROUP}
                control={control}
                rules={required}
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
              <ErrorMessage name={GROUP} errors={formState.errors} />
            </div>
          </form>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button variant='gradient' onClick={onSubmit} className='float-right'>
            등록
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
