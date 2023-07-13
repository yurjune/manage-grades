import { useInput, useSelect } from '@/shared/hooks';
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

interface StudentAddDialogProps extends Pick<DialogProps, 'open'> {
  handleDialog: () => void;
  selectedStudent: Student | null;
}

export const StudentDialog = (props: StudentAddDialogProps) => {
  const { open, handleDialog, selectedStudent } = props;
  const [addStudent] = useAddStudentMutation();
  const [editStudent] = useEditStudentMutation();
  const editMode = selectedStudent;

  const [inputValues, handleInputValues, setInputValues] = useInput({ name: '' });
  const [selectValues, handleSelectValues, setSelectValues] = useSelect({
    gender: '',
    grade: '',
    group: '',
  });

  useEffect(() => {
    setInputValues({ name: selectedStudent?.name ?? '' });
    setSelectValues({
      gender: selectedStudent?.gender ?? '',
      grade: selectedStudent?.grade ?? '',
      group: selectedStudent?.group ?? '',
    });
  }, [open, selectedStudent, setInputValues, setSelectValues]);

  const handleSumbitClick = async () => {
    if (Object.values({ ...inputValues, ...selectValues }).some((field) => !field)) {
      return;
    }

    const { name } = inputValues;
    const { gender, grade, group } = selectValues;
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
            <Input
              label='이름'
              name='name'
              size='lg'
              value={inputValues.name}
              onChange={handleInputValues}
            />
            <Select
              label='성별'
              value={selectValues.gender}
              onChange={handleSelectValues('gender')}
            >
              {['남', '여'].map((val) => (
                <Option key={val} value={val}>
                  {val}
                </Option>
              ))}
            </Select>
            <Select label='학년' value={selectValues.grade} onChange={handleSelectValues('grade')}>
              {['1', '2', '3'].map((val) => (
                <Option key={val} value={val}>
                  {val}
                </Option>
              ))}
            </Select>
            <Select label='반' value={selectValues.group} onChange={handleSelectValues('group')}>
              {['A', 'B', 'C'].map((val) => (
                <Option key={val} value={val}>
                  {val}
                </Option>
              ))}
            </Select>
          </CardBody>
        </form>
        <CardFooter className='pt-0'>
          <Button variant='gradient' onClick={handleSumbitClick} fullWidth>
            등록
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
