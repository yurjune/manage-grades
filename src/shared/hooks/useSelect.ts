import { useCallback, useState } from 'react';

export const useSelect = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((val?: string) => {
    setValue(val ?? '');
  }, []);

  return [value, handler, setValue] as const;
};
