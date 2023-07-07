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

interface StudentAddDialogProps extends Pick<DialogProps, 'open'> {
  handleOpen: () => void;
}

export const StudentAddDialog = (props: StudentAddDialogProps) => {
  const { open, handleOpen } = props;
  const [name, handleNameChange, setName] = useInput('');
  const [gender, handleGenderChange, setGender] = useSelect('');
  const [grade, handleGradeChange, setGrade] = useSelect('');
  const [group, handleGroupChange, setGroup] = useSelect('');

  const resetAllValues = () => {
    setName('');
    setGender('');
    setGrade('');
    setGroup('');
  };

  const handleSumbitClick = async () => {
    if ([name, gender, grade, group].some((val) => !val)) return;
    resetAllValues();
    handleOpen();
  };

  return (
    <Dialog size='sm' open={open} handler={handleOpen} className='bg-transparent shadow-none'>
      <Card className='mx-auto w-full'>
        <form>
          <CardBody className='flex flex-col gap-8'>
            <Typography variant='h4' color='black'>
              학생 추가
            </Typography>
            <Input label='이름' size='lg' value={name} onChange={handleNameChange} />
            <Select label='성별' onChange={handleGenderChange}>
              {['남', '여'].map((val) => (
                <Option key={val} value={val}>
                  {val}
                </Option>
              ))}
            </Select>
            <Select label='학년' onChange={handleGradeChange}>
              {['1', '2', '3'].map((val) => (
                <Option key={val} value={val}>
                  {val}
                </Option>
              ))}
            </Select>
            <Select label='반' onChange={handleGroupChange}>
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
