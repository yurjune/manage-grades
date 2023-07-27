import { useAddStudentMutation, useEditStudentMutation } from '@/redux/firestoreApi';
import { Student } from '@/shared/model';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
  type DialogProps,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { InputField, SelectField } from './ControlledFields';

const NAME = 'name';
const GENDER = 'gender';
const GRADE = 'grade';
const GROUP = 'group';
type FormValue = Pick<Student, typeof NAME | typeof GENDER | typeof GRADE | typeof GROUP>;

interface StudentDialogProps extends Pick<DialogProps, 'open'> {
  handleDialog: () => void;
  selectedStudent: Student | null;
}

export const StudentDialog = ({ open, handleDialog, selectedStudent }: StudentDialogProps) => {
  const [addStudent] = useAddStudentMutation();
  const [editStudent] = useEditStudentMutation();

  const { handleSubmit, control, reset } = useForm<FormValue>({
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
            <InputField
              control={control}
              name={NAME}
              rules={required}
              inputProps={{ label: '이름', size: 'lg' }}
            />
            <SelectField
              control={control}
              name={GENDER}
              rules={required}
              options={['남', '녀']}
              selectProps={{ label: '성별' }}
            />
            <SelectField
              control={control}
              name={GRADE}
              rules={required}
              options={['1', '2', '3']}
              selectProps={{ label: '학년' }}
            />
            <SelectField
              control={control}
              name={GROUP}
              rules={required}
              options={['A', 'B', 'C']}
              selectProps={{ label: '반' }}
            />
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
