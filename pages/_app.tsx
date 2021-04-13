import { AppProps } from "next/app"
import { Provider } from "../lib/auth"
import Layout from "../components/Layout"
import "./index.scss"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
