import React, { FunctionComponent } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Login from '../components/Login';
import '../assets/sass/main.scss';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>HomeHub</title>
    </Head>
    <Provider store={store}>
      <Login />

      <Component {...pageProps} />
    </Provider>
  </>
);

export default App;
