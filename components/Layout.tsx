import Link from "next/link"
import Header from "./Header"

interface Props {
  children: React.ReactChild | React.ReactChildren
}

const Layout = ({ children }: Props): React.ReactElement => {
  return (
    <>
      <Header />
      <main className="lbh-main-wrapper " id="main-content" role="main">
        <div className="lbh-container">{children}</div>
      </main>
    </>
  )
}

export default Layout
