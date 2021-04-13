import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    }
  
    render() {
      return (
        <Html lang="en" class="govuk-template lbh-template">
            <Head>
            <meta charset="utf-8" />
            <title> Hackney Council</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />
            <meta name="theme-color" content="#0b0c0c" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" href="index.scss"/>
            Put your path to the LBHFrontend CSS File in the href attribute here
            <link href="" rel="stylesheet" type="text/css" />
            </Head>
            <body class="govuk-template__body">
            <script>
                document.body.className = document.body.className
                ? document.body.className + " js-enabled"
                : "js-enabled"
            </script>
            <Main class="lbh-main-wrapper " id="main-content" role="main">
                <div class="lbh-container">
                <Provider session={pageProps.session}>
                <Component {...pageProps} />
                </Provider>
                </div>
            </Main>
            <Nextscript src="index.scss"></Nextscript>
            <Nextscript>
                window.LBHFrontend.initAll()
            </Nextscript>
            </body>
        </Html>
      )
    }
  }
  
  export default MyDocument