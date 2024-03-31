import { useAddScoresMutation } from '@/redux/firestoreApi';
import { Student } from '@/shared/model';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { ZodError, z } from 'zod';
import { InputField, SelectField } from './CustomFields';
import { ErrorMessage } from './ErrorMessage';
import toast from 'react-hot-toast';
import { useState } from 'react';

enum Field {
  SEMESTER = 'semester',
  UID = 'uid',
  KOREAN = 'korean',
  ENGLISH = 'english',
  MATH = 'math',
  SCIENCE = 'science',
}

const rangeErrorMsg = '성적은 0 이상 100 이하여야 합니다.';
const scoreSchema = z.object({
  [Field.SEMESTER]: z.string(),
  [Field.UID]: z.string().min(1, '학생을 선택해주세요.'),
  [Field.KOREAN]: z.number().min(0, rangeErrorMsg).max(100, rangeErrorMsg),
  [Field.SCIENCE]: z.number().min(0, rangeErrorMsg).max(100, rangeErrorMsg),
  [Field.MATH]: z.number().min(0, rangeErrorMsg).max(100, rangeErrorMsg),
  [Field.ENGLISH]: z.number().min(0, rangeErrorMsg).max(100, rangeErrorMsg),
});

interface ScoreDialogProps extends Pick<DialogProps, 'open'> {
  handleDialog: () => void;
  students: Student[];
  semesters: string[];
  selectedStudent: Student | null;
  currentSemester: string;
}

type FormValue = z.infer<typeof scoreSchema>;

export const ScoreDialog = ({
  open,
  handleDialog,
  students,
  semesters,
  selectedStudent,
  currentSemester,
}: ScoreDialogProps) => {
  const [loading, setLoading] = useState(false);
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
    resolver: zodResolver(scoreSchema),
  });

  const handleFormSubmit = handleSubmit(async (values) => {
    try {
      const parsed = scoreSchema.parse(values);
      setLoading(true);
      await addScores(parsed);
      handleDialog();
      reset();
      toast.success(editMode ? '성적을 변경하였습니다.' : '성적을 등록하였습니다.');
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  });

  const candidates = students.map((student) => ({
    uid: student.uid,
    nameWithGroup: `${student.name} (반: ${student.group})`,
  }));

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
              selectProps={{ label: '학기' }}
              options={semesters}
            />
            <Controller
              name='uid'
              control={control}
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
              {...register('korean', { valueAsNumber: true })}
              formState={formState}
              inputProps={{ label: '국어', size: 'lg', type: 'number' }}
            />
            <InputField
              {...register('english', { valueAsNumber: true })}
              formState={formState}
              inputProps={{ label: '영어', size: 'lg', type: 'number' }}
            />
            <InputField
              {...register('math', { valueAsNumber: true })}
              formState={formState}
              inputProps={{ label: '수학', size: 'lg', type: 'number' }}
            />
            <InputField
              {...register('science', { valueAsNumber: true })}
              formState={formState}
              inputProps={{ label: '과학', size: 'lg', type: 'number' }}
            />
          </form>
        </CardBody>

        <CardFooter className='pt-0'>
          <Button
            variant='gradient'
            onClick={handleFormSubmit}
            className='float-right'
            loading={loading}
          >
            등록
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
