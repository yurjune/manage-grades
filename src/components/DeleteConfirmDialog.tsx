import React from 'react';
import { Button, Dialog, DialogHeader, DialogFooter, DialogProps } from '@material-tailwind/react';

interface DeleteConfirmDialogProps extends Pick<DialogProps, 'open'> {
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmDialog = ({ open, onClose, onConfirm }: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader className='mt-4 mb-8 text-center'>정말로 삭제하시겠습니까?</DialogHeader>
      <DialogFooter>
        <Button variant='outlined' onClick={onClose} className='mr-2'>
          <span>취소</span>
        </Button>
        <Button variant='gradient' color='red' onClick={onConfirm}>
          <span>삭제</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
