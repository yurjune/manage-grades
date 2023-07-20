import { useAddScoresMutation } from '@/redux/firestoreApi';
import { Score, Student } from '@/shared/model';
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type UndefinedScore = {
  [key in keyof Score]: Score[key] | undefined;
};
type FormValue<T extends Score | UndefinedScore> = { uid: string; semester: string } & T;
type InitialFormValue = FormValue<UndefinedScore>;
type ValidFormValue = FormValue<Score>;

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
  const exScores = selectedStudent?.semesters?.[currentSemester];

  const { register, control, handleSubmit, reset } = useForm<InitialFormValue>({
    values: {
      semester: currentSemester,
      uid: selectedStudent?.uid ?? '',
      korean: exScores?.korean,
      math: exScores?.math,
      english: exScores?.english,
      science: exScores?.science,
    },
  });

  const handleFormSubmit: SubmitHandler<InitialFormValue> = async (values) => {
    const { korean, english, math, science } = values;
    const scores = { korean, english, math, science };

    if (Object.values(scores).some((score) => !score || isNaN(score))) return;

    await addScores(values as ValidFormValue);
    handleDialog();
    reset();
  };

  const candidates = students.map((student) => ({
    uid: student.uid,
    nameWithGroup: `${student.name} (반: ${student.group})`,
  }));

  const selectRules = { required: true };
  const scoreRules = { required: true, valueAsNumber: true, min: 0, max: 100 };

  return (
    <Dialog size='sm' open={open} handler={handleDialog} className='bg-transparent shadow-none'>
      <Card className='mx-auto w-full'>
        <CardBody>
          <Typography variant='h4' color='black' className='mb-8'>
            성적 추가
          </Typography>
          <form className='flex flex-col gap-8'>
            <Controller
              name='semester'
              control={control}
              rules={selectRules}
              render={({ field }) => (
                <Select {...field} label='학기' disabled={editMode}>
                  {semesters.map((semester) => (
                    <Option key={semester} value={semester}>
                      {semester}
                    </Option>
                  ))}
                </Select>
              )}
            />
            <Controller
              name='uid'
              control={control}
              rules={selectRules}
              render={({ field }) => (
                <Select {...field} label='학생' disabled={editMode}>
                  {candidates.map((candidate) => (
                    <Option key={candidate.uid} value={candidate.uid}>
                      {candidate.nameWithGroup}
                    </Option>
                  ))}
                </Select>
              )}
            />
            <Input {...register('korean', scoreRules)} type='number' label='국어' size='lg' />
            <Input {...register('english', scoreRules)} type='number' label='영어' size='lg' />
            <Input {...register('math', scoreRules)} type='number' label='수학' size='lg' />
            <Input {...register('science', scoreRules)} type='number' label='과학' size='lg' />
          </form>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button
            variant='gradient'
            onClick={handleSubmit(handleFormSubmit)}
            className='float-right'
          >
            등록
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
