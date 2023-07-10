import { useInput, useSelect } from '@/hooks';
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
import { useAddStudentMutation, useEditStudentMutation } from '@/redux/services/firestoreApi';
import { useEffect } from 'react';
import { Student } from '@/model';

interface StudentAddDialogProps extends Pick<DialogProps, 'open'> {
  handleDialog: () => void;
  selectedStudent: Student | null;
}

export const StudentDialog = (props: StudentAddDialogProps) => {
  const { open, handleDialog, selectedStudent } = props;
  const [addStudent] = useAddStudentMutation();
  const [editStudent] = useEditStudentMutation();

  const [name, handleNameChange, setName] = useInput('');
  const [gender, handleGenderChange, setGender] = useSelect('');
  const [grade, handleGradeChange, setGrade] = useSelect('');
  const [group, handleGroupChange, setGroup] = useSelect('');
  const editMode = selectedStudent;

  useEffect(() => {
    setName(selectedStudent?.name ?? '');
    setGender(selectedStudent?.gender ?? '');
    setGrade(selectedStudent?.grade ?? '');
    setGroup(selectedStudent?.group ?? '');
  }, [selectedStudent, setName, setGender, setGrade, setGroup]);

  const handleSumbitClick = async () => {
    if ([name, gender, grade, group].some((val) => !val)) {
      return;
    }

    const formValues = { name, gender, grade, group };
    if (editMode) {
      await editStudent({ ...selectedStudent, ...formValues });
    } else {
      await addStudent({ ...formValues });
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
            <Input label='이름' size='lg' value={name} onChange={handleNameChange} />
            <Select label='성별' value={gender} onChange={handleGenderChange}>
              {['남', '여'].map((val) => (
                <Option key={val} value={val}>
                  {val}
                </Option>
              ))}
            </Select>
            <Select label='학년' value={grade} onChange={handleGradeChange}>
              {['1', '2', '3'].map((val) => (
                <Option key={val} value={val}>
                  {val}
                </Option>
              ))}
            </Select>
            <Select label='반' value={group} onChange={handleGroupChange}>
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
