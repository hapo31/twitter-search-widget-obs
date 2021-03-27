import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="dns-prefetch" href="//www.google.co.jp" />
        </Head>
        <body
          style={{
            margin: "0",
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
