import { Toaster } from '@/components';
import { wrapper } from '@/redux/store';
import { AppPropsWithLayout } from '@/shared/model';
import '@/styles/globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ThemeProvider value={customTheme}>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>,
  );
}

const customTheme = {
  input: {
    defaultProps: {
      color: 'indigo',
    },
  },
  select: {
    defaultProps: {
      color: 'indigo',
    },
  },
  button: {
    defaultProps: {
      color: 'indigo',
    },
  },
  iconButton: {
    defaultProps: {
      color: 'indigo',
    },
  },
};

export default wrapper.withRedux(App);
