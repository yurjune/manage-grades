import { useAddScoresMutation } from '@/redux/firestoreApi';
import { Score, Student } from '@/shared/model';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogProps,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { Controller, useForm } from 'react-hook-form';
import { InputField, SelectField } from './CustomFields';
import { ErrorMessage } from './ErrorMessage';

type FormValue = { uid: string; semester: string } & Score;

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

  const { control, handleSubmit, reset, formState, register } = useForm<FormValue>({
    values: {
      semester: currentSemester,
      uid: selectedStudent?.uid ?? '',
      korean: exScores?.korean ?? 0,
      math: exScores?.math ?? 0,
      english: exScores?.english ?? 0,
      science: exScores?.science ?? 0,
    },
  });

  const handleFormSubmit = handleSubmit(async (values) => {
    try {
      const { korean, english, math, science } = values;
      const scores = Object.values({ korean, english, math, science });

      if (scores.some((score) => typeof score !== 'number' || isNaN(score))) {
        throw new Error('Some scores are not a Number!');
      }

      await addScores(values);
      handleDialog();
      reset();
    } catch (err) {
      console.error(err);
    }
  });

  const candidates = students.map((student) => ({
    uid: student.uid,
    nameWithGroup: `${student.name} (반: ${student.group})`,
  }));

  const selectRules = { required: '값을 입력해 주세요!' };
  const scoreRules = {
    required: '값을 입력해 주세요!',
    min: { value: 0, message: '0 이상의 값을 입력해 주세요!' },
    max: { value: 100, message: '100 이하의 값을 입력해 주세요!' },
    valueAsNumber: true,
  };

  return (
    <Dialog size='sm' open={open} handler={handleDialog} className='bg-transparent shadow-none'>
      <Card className='mx-auto w-full'>
        <CardBody>
          <Typography variant='h4' color='black' className='mb-8'>
            성적 추가
          </Typography>
          <form className='flex flex-col gap-8'>
            <SelectField
              name='semester'
              control={control}
              rules={selectRules}
              selectProps={{ label: '학기' }}
              options={semesters}
            />
            <Controller
              name='uid'
              control={control}
              rules={selectRules}
              render={({ field }) => (
                <div className={`flex flex-col gap-2`}>
                  <Select {...field} label='학생' disabled={editMode}>
                    {candidates.map((candidate) => (
                      <Option key={candidate.uid} value={candidate.uid}>
                        {candidate.nameWithGroup}
                      </Option>
                    ))}
                  </Select>
                  <ErrorMessage name='uid' errors={formState.errors} />
                </div>
              )}
            />
            <InputField
              {...register('korean', scoreRules)}
              formState={formState}
              inputProps={{ label: '국어', size: 'lg', type: 'number' }}
            />
            <InputField
              {...register('english', scoreRules)}
              formState={formState}
              inputProps={{ label: '영어', size: 'lg', type: 'number' }}
            />
            <InputField
              {...register('math', scoreRules)}
              formState={formState}
              inputProps={{ label: '수학', size: 'lg', type: 'number' }}
            />
            <InputField
              {...register('science', scoreRules)}
              formState={formState}
              inputProps={{ label: '과학', size: 'lg', type: 'number' }}
            />
          </form>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button variant='gradient' onClick={handleFormSubmit} className='float-right'>
            등록
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
