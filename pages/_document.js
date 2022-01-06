import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="title" content="Raroin" />
          <meta name="description" content="Premium NFT marketplace theme" />
          <meta
            name="keywords"
            content="bootstrap, creabik, ThemeForest, bootstrap5, agency theme, saas
			theme, sass, html5"
          />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title> NFT Dungeon </title>
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          {/* 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈 STYLES */}
          <link rel="stylesheet" href="assets/css/plugins/remixicon.css" />
          <link rel="stylesheet" href="assets/css/plugins/bootstrap.min.css" />
          <link
            rel="stylesheet"
            href="assets/css/plugins/swiper-bundle.min.css"
          />
          <link rel="stylesheet" href="assets/css/style.css" />
        </Head>
        <body className="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
