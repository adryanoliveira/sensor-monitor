import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
            <title>Home | Sensores</title>
            <link rel="stylesheet" href="/styles/global.css"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
