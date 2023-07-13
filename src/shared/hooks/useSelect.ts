import { useCallback, useState } from 'react';

export const useSelect = (initialValue: Record<string, string>) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback(
    (key: string) => (val?: string) => {
      setValue((prev) => ({
        ...prev,
        [key]: val ?? '',
      }));
    },
    [],
  );

  return [value, handler, setValue] as const;
};
