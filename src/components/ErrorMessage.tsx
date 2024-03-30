import React from 'react';
import { ErrorMessage as HookFormError } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

interface ErrorMessageProps {
  errors: FieldErrors;
  name: string;
  mt?: string;
  mb?: string;
}

export const ErrorMessage = ({ errors, name, mt, mb }: ErrorMessageProps) => {
  return (
    <HookFormError
      errors={errors}
      name={name}
      render={({ message }) => (
        <span className={`text-red-500 text-sm mt=${mt} mb=${mb}`}>{message}</span>
      )}
    />
  );
};
