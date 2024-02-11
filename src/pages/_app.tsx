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
import Head from 'next/head';
import { Provider } from 'react-redux';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function App({ Component, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Head>
        <title>성적 관리 시스템</title>
      </Head>
      <Provider store={store}>
        {getLayout(
          <ThemeProvider value={customTheme}>
            <Component {...props.pageProps} />
            <Toaster />
          </ThemeProvider>,
        )}
      </Provider>
    </>
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

export default App;
