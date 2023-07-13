import { ChangeEvent, useCallback, useState } from 'react';

export const useInput = (initialValue: Record<string, string>) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  return [value, handler, setValue] as const;
};
