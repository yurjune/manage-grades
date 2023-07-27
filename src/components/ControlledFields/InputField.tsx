import { Input, InputProps } from '@material-tailwind/react';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';

type InputFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  inputProps: Omit<InputProps, 'ref'>;
  gap?: number;
};

export const InputField = <T extends FieldValues>(props: InputFieldProps<T>) => {
  const { name, control, rules, inputProps, gap = 2 } = props;
  const { field, formState } = useController({ control, name, rules });

  return (
    <div className={`flex flex-col gap-${gap}`}>
      <Input {...field} {...inputProps} />
      <ErrorMessage name={name} errors={formState.errors} />
    </div>
  );
};
