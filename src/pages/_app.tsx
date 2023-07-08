import { AppPropsWithLayout } from '@/model';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>,
  );
}

export default App;
