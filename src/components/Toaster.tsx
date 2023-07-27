import React from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = () => {
  return <HotToaster toastOptions={options} />;
};

const options = {
  style: {
    fontSize: '0.9rem',
    padding: '0.5rem 1rem',
  },
  success: {
    style: {
      background: 'green',
    },
  },
  error: {
    style: {
      background: 'rgb(254 202 202)',
    },
  },
};
