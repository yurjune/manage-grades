import { Input, InputProps } from '@material-tailwind/react';
import { forwardRef, PropsWithoutRef } from 'react';
import { UseFormRegisterReturn, UseFormReturn } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';

type InputFieldProps = PropsWithoutRef<UseFormRegisterReturn> & {
  inputProps?: InputProps;
  formState: UseFormReturn['formState'];
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const { inputProps, formState, ...register } = props;

  return (
    <div className='flex flex-col gap-2'>
      <Input {...register} {...inputProps} ref={ref} />
      <ErrorMessage name={register.name} errors={formState.errors} />
    </div>
  );
});

InputField.displayName = 'InputField';
