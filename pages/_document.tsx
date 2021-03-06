import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): React.ReactElement {
    return (
      <Html lang="en" className="govuk-template lbh-template">
        <Head />
        <body className="govuk-template__body">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
