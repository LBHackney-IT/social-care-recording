import { AppProps } from "next/app"
import { NextComponentType, NextPageContext } from "next"
import Head from "next/head"
import Link from "next/link"
import { Provider } from "../lib/auth"
import Layout from "../components/Layout"
import "./index.scss"

interface ExtendedAppProps extends AppProps {
  Component: NextComponentType & {
    goBackPath: string
  }
}

const App = ({ Component, pageProps }: ExtendedAppProps) => {
  return (
    <Provider>
      <Head>
        <meta charSet="utf-8" />
        <title>Hackney Council</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0b0c0c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>

      <Layout>
        <Component
          postheader={
            Component.goBackPath && (
              <Link href={Component.goBackPath}>
                <div className="lbh-container">
                  <a href="#" className="govuk-back-link lbh-back-link">
                    Go back
                  </a>
                </div>
              </Link>
            )
          }
          {...pageProps}
        />
      </Layout>
    </Provider>
  )
}

export default App
