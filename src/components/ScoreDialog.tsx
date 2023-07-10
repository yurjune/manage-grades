import { useInput, useSelect } from '@/hooks';
import { Student } from '@/model';
import { useAddScoresMutation } from '@/redux/services/firestoreApi';
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
import { useEffect } from 'react';

interface ScoreDialogProps extends Pick<DialogProps, 'open'> {
  handleDialog: () => void;
  students: Student[];
  semesters: string[];
}

export const ScoreDialog = (props: ScoreDialogProps) => {
  const { open, handleDialog, students, semesters } = props;
  const [student, handleStudentChange, setStudent] = useSelect('');
  const [semester, handleSemesterChange, setSemester] = useSelect('');
  const [math, handleMathChange, setMath] = useInput('');
  const [english, handleEnglishChange, setEnglish] = useInput('');
  const [addScores] = useAddScoresMutation();

  const candidates = students.map((student) => ({
    uid: student.uid,
    nameWithGroup: `${student.name} (반: ${student.group})`,
  }));

  useEffect(() => {
    setStudent('');
    setSemester('');
    setMath('');
    setEnglish('');
  }, [open, setStudent, setSemester, setMath, setEnglish]);

  const handleSubmit = async () => {
    if ([student, semester, math, english].some((val) => !val)) {
      return;
    }

    await addScores({ uid: student, semester, math, english });
    handleDialog();
  };

  return (
    <Dialog size='sm' open={open} handler={handleDialog} className='bg-transparent shadow-none'>
      <Card className='mx-auto w-full'>
        <form>
          <CardBody className='flex flex-col gap-8'>
            <Typography variant='h4' color='black'>
              성적 추가
            </Typography>
            <Select label='학생' value={student} onChange={handleStudentChange}>
              {candidates.map((candidate) => (
                <Option key={candidate.uid} value={candidate.uid}>
                  {candidate.nameWithGroup}
                </Option>
              ))}
            </Select>
            <Select label='학기' value={semester} onChange={handleSemesterChange}>
              {semesters.map((semester) => (
                <Option key={semester} value={semester}>
                  {semester}
                </Option>
              ))}
            </Select>
            <Input label='수학' size='lg' value={math} onChange={handleMathChange} />
            <Input label='영어' size='lg' value={english} onChange={handleEnglishChange} />
          </CardBody>
        </form>
        <CardFooter className='pt-0'>
          <Button variant='gradient' fullWidth onClick={handleSubmit}>
            등록
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
