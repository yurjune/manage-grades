import { AppPropsWithLayout } from '@/model';
import { wrapper } from '@/redux/store';
import '@/styles/globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ThemeProvider value={customTheme}>
      <Component {...pageProps} />
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
