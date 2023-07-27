import React from 'react';
import { ErrorMessage as HFErrorMEssage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

interface ErrorMessageProps {
  errors: FieldErrors;
  name: string;
}

export const ErrorMessage = ({ errors, name }: ErrorMessageProps) => {
  return (
    <HFErrorMEssage
      errors={errors}
      name={name}
      render={({ message }) => <span className='text-red-500 text-sm'>{message}</span>}
    />
  );
};
