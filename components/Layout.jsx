import React from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "../lib/auth"

const Layout = ({ children }) => {
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
