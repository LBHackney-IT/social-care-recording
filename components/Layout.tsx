import Link from "next/link"
import { signIn, signOut, useSession } from "../lib/auth"

interface Props {
  children: React.ReactChild | React.ReactChildren
}

const Layout = ({ children }: Props): React.ReactElement => {
  const [session, loading] = useSession()

  if (session) {
    return (
      <>
        <p>
          You are signed in as {session.email || "Unknown email"}
          <button onClick={() => signOut()}>Sign out</button>
        </p>
        {children}
      </>
    )
  }

  return (
    <>
      <button onClick={signIn}>Sign in</button>
      {children}
    </>
  )
}

export default Layout
