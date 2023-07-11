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
  selectedStudent: Student | null;
  currentSemester: string;
}

export const ScoreDialog = (props: ScoreDialogProps) => {
  const { open, handleDialog, students, semesters, selectedStudent, currentSemester } = props;
  const [addScores] = useAddScoresMutation();

  const [semester, handleSemesterChange, setSemester] = useSelect('');
  const [student, handleStudentChange, setStudent] = useSelect('');
  const [korean, handleKoreanChange, setKorean] = useInput('');
  const [math, handleMathChange, setMath] = useInput('');
  const [english, handleEnglishChange, setEnglish] = useInput('');
  const [science, handleScienceChange, setScience] = useInput('');
  const editMode = Boolean(selectedStudent);

  // TODO: 로직 개선
  useEffect(() => {
    setStudent(selectedStudent?.uid ?? '');
    setSemester(currentSemester);

    setKorean(selectedStudent?.semesters?.[currentSemester].korean?.toString() ?? '');
    setMath(selectedStudent?.semesters?.[currentSemester].math?.toString() ?? '');
    setEnglish(selectedStudent?.semesters?.[currentSemester].english?.toString() ?? '');
    setScience(selectedStudent?.semesters?.[currentSemester].science?.toString() ?? '');
  }, [
    open,
    selectedStudent,
    currentSemester,
    setStudent,
    setSemester,
    setKorean,
    setMath,
    setEnglish,
    setScience,
  ]);

  const candidates = students.map((student) => ({
    uid: student.uid,
    nameWithGroup: `${student.name} (반: ${student.group})`,
  }));

  const handleSubmit = async () => {
    if ([student, semester, korean, math, english, science].some((val) => !val)) return;
    if ([korean, math, english, science].some((val) => !Number.isInteger(Number(val)))) return;

    await addScores({
      uid: student,
      semester,
      korean: Number(korean),
      math: Number(math),
      english: Number(english),
      science: Number(science),
    });

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
            <Select
              label='학기'
              value={semester}
              onChange={handleSemesterChange}
              disabled={editMode}
            >
              {semesters.map((semester) => (
                <Option key={semester} value={semester}>
                  {semester}
                </Option>
              ))}
            </Select>
            <Select label='학생' value={student} onChange={handleStudentChange} disabled={editMode}>
              {candidates.map((candidate) => (
                <Option key={candidate.uid} value={candidate.uid}>
                  {candidate.nameWithGroup}
                </Option>
              ))}
            </Select>
            <Input label='국어' size='lg' value={korean} onChange={handleKoreanChange} />
            <Input label='영어' size='lg' value={english} onChange={handleEnglishChange} />
            <Input label='수학' size='lg' value={math} onChange={handleMathChange} />
            <Input label='과학' size='lg' value={science} onChange={handleScienceChange} />
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
