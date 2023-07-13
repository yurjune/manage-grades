import { useInput, useSelect } from '@/shared/hooks';
import { Student } from '@/shared/model';
import { useAddScoresMutation } from '@/redux/firestoreApi';
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
  const editMode = Boolean(selectedStudent);

  const [info, handleInfo, setInfo] = useSelect({
    student: '',
    semester: '',
  });
  const [scores, handleScores, setScores] = useInput({
    korean: '',
    math: '',
    english: '',
    science: '',
  });

  const candidates = students.map((student) => ({
    uid: student.uid,
    nameWithGroup: `${student.name} (반: ${student.group})`,
  }));

  useEffect(() => {
    setInfo({
      student: selectedStudent?.uid ?? '',
      semester: currentSemester,
    });

    const exScores = selectedStudent?.semesters?.[currentSemester];
    if (exScores) {
      setScores({
        korean: exScores.korean.toString(),
        math: exScores.math.toString(),
        english: exScores.english.toString(),
        science: exScores.science.toString(),
      });
    } else {
      setScores({ korean: '', math: '', english: '', science: '' });
    }
  }, [open, selectedStudent, currentSemester, setInfo, setScores]);

  const handleSubmit = async () => {
    if (
      Object.values({ ...info }).some((field) => !field) ||
      Object.values({ ...scores }).some((field) => !field || !Number.isInteger(Number(field)))
    ) {
      return;
    }

    const { student, semester } = info;
    const { korean, math, english, science } = scores;
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
              value={info.semester}
              onChange={handleInfo('semester')}
              disabled={editMode}
            >
              {semesters.map((semester) => (
                <Option key={semester} value={semester}>
                  {semester}
                </Option>
              ))}
            </Select>
            <Select
              label='학생'
              value={info.student}
              onChange={handleInfo('student')}
              disabled={editMode}
            >
              {candidates.map((candidate) => (
                <Option key={candidate.uid} value={candidate.uid}>
                  {candidate.nameWithGroup}
                </Option>
              ))}
            </Select>
            <Input
              label='국어'
              size='lg'
              name='korean'
              value={scores.korean}
              onChange={handleScores}
            />
            <Input label='수학' size='lg' name='math' value={scores.math} onChange={handleScores} />
            <Input
              label='영어'
              size='lg'
              name='english'
              value={scores.english}
              onChange={handleScores}
            />
            <Input
              label='과학'
              size='lg'
              name='science'
              value={scores.science}
              onChange={handleScores}
            />
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
