import { Option, Select, type SelectProps } from '@material-tailwind/react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';

type SelectFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  options: string[];
  selectProps: Omit<SelectProps, 'children' | 'ref'>;
  gap?: number;
};

export const SelectField = <T extends FieldValues>(props: SelectFieldProps<T>) => {
  const { name, control, rules, options, selectProps, gap = 2 } = props;
  const { field, formState } = useController({ control, name, rules });

  return (
    <div className={`flex flex-col gap-${gap}`}>
      <Select {...field} {...selectProps}>
        {options.map((val) => (
          <Option key={val} value={val}>
            {val}
          </Option>
        ))}
      </Select>
      <ErrorMessage name={name} errors={formState.errors} />
    </div>
  );
};
