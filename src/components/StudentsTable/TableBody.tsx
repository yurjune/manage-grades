import { Student } from '@/shared/model';
import { openStudentDialog } from '@/redux/features/dialogsSlice';
import { selectStudent } from '@/redux/features/studentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IconButton, Typography } from '@material-tailwind/react';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { Fragment, useState } from 'react';
import { DeleteConfirmDialog } from '../DeleteConfirmDialog';
import { useDeleteStudentMutation } from '@/redux/firestoreApi';

interface Props {
  rows: Student[];
}

export const StudentsTableBody = ({ rows }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteStudent] = useDeleteStudentMutation();
  const selectedStudent = useAppSelector((state) => state.student.value);
  const dispatch = useAppDispatch();

  const handleEditClick = (data: Student) => () => {
    dispatch(openStudentDialog());
    dispatch(selectStudent({ value: data }));
  };

  const handleDeleteClick = (data: Student) => () => {
    dispatch(selectStudent({ value: data }));
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(selectStudent({ value: null }));
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (selectedStudent == null) return;
    await deleteStudent(selectedStudent.uid);
    handleClose();
  };

  return (
    <Fragment>
      <tbody>
        {rows.map((data, index) => {
          const { uid, name, gender, grade, group } = data;
          const isLast = index === rows.length - 1;
          const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

          return (
            <tr key={uid}>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-bold'>
                  {name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {gender}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {grade}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {group}
                </Typography>
              </td>
              <td className={`${classes} w-[170px]`}>
                <IconButton size='sm' onClick={handleEditClick(data)} className='mr-4'>
                  <FaEdit />
                </IconButton>
                <IconButton size='sm' color='red' onClick={handleDeleteClick(data)}>
                  <AiOutlineUserDelete size='18px' />
                </IconButton>
              </td>
            </tr>
          );
        })}
      </tbody>
      <DeleteConfirmDialog open={open} onClose={handleClose} onConfirm={handleConfirm} />
    </Fragment>
  );
};
