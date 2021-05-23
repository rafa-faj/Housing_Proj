import React, { FunctionComponent } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { reduxNextWrapper } from '@redux';
import Login from '@components/Login';
import '../assets/scss/global/index.scss';
import Layout from '@components/Layout'

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>HomeHub</title>
    </Head>

    <Login />

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default reduxNextWrapper.withRedux(App);
