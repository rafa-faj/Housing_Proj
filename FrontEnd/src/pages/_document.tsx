import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

/**
 * Custom Document page to allow us to customize things in html head, etc.
 * https://nextjs.org/docs/advanced-features/custom-document
 */
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site for University of California, San Diego (UCSD) students to find housing and roommates in an easy and conveniant manner."
          />

          <link rel="apple-touch-icon" href="/logo192.png" />
          {/* manifest.json provides metadata used when your web app is installed on a user's mobile device
          or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
          <link rel="manifest" href="/manifest.json" />
        </Head>

        <body>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDP7ZDv6xGzfVe7y7Sgb3MsYMqCVLNljeY&libraries=geometry,drawing,places"></script>
          <script src="https://sdk.amazonaws.com/js/aws-sdk-2.774.0.min.js"></script>
          <noscript>You need to enable JavaScript to run this app.</noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
