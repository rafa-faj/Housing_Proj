import React, { FunctionComponent } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { reduxNextWrapper } from '../redux/store';
import Login from '../components/Login';
import '../assets/sass/main.scss';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>HomeHub</title>
    </Head>

    <Login />

    <Component {...pageProps} />
  </>
);

export default reduxNextWrapper.withRedux(App);
