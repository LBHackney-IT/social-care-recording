import { AppProps } from "next/app"
import { NextComponentType, NextPageContext } from "next"
import Head from "next/head"
import Link from "next/link"
import { Provider } from "../lib/auth"
import Layout from "../components/Layout"
import "../styles/index.scss"

interface ExtendedAppProps extends AppProps {
  Component: NextComponentType & {
    Postheader: React.ComponentClass
  }
}

const App = ({ Component, pageProps }: ExtendedAppProps) => {
  return (
    <Provider>
      <Head>
        <meta charSet="utf-8" />
        <title>Social care | Hackney Council</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0b0c0c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>

      <Layout
        postheader={
          Component.Postheader && <Component.Postheader {...pageProps} />
        }
      >
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
