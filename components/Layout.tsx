import Link from "next/link"
import Header from "./Header"

interface Props {
  postheader: React.ReactChild | React.ReactChildren
  children: React.ReactChild | React.ReactChildren
}

const Layout = ({ postheader, children }: Props): React.ReactElement => {
  return (
    <>
      <Header />
      {postheader}
      <main className="lbh-main-wrapper " id="main-content" role="main">
        <div className="lbh-container">{children}</div>
      </main>
    </>
  )
}

export default Layout
