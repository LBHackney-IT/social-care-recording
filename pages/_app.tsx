import { AppProps } from "next/app"
import Head from "next/head"
import { Provider } from "../lib/auth"
import Layout from "../components/Layout"
import "./index.scss"

const App = ({ Component, pageProps }: AppProps) => {
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
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
