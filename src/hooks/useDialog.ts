import { useCallback, useState } from 'react';

export const useDialog = (defaultOpen = false) => {
  const [open, setOpen] = useState(defaultOpen);

  const openDialog = useCallback(() => setOpen(true), []);
  const toggleDialog = useCallback(() => setOpen((prev) => !prev), []);

  return [open, openDialog, toggleDialog, setOpen] as const;
};
