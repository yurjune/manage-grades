import { AppPropsWithLayout } from '@/model';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-tailwind/react';

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <ThemeProvider value={customTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>,
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
