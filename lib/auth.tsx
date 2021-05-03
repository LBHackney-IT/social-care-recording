import React, { createContext, useContext, useState, useEffect } from "react"
import cookie from "cookie"
import jsonwebtoken from "jsonwebtoken"

const SessionContext = createContext(null)

/* Wrap app with provider to use session hooks */
export const Provider = ({
  children,
}: {
  children: React.ReactChild[]
}): React.ReactElement => {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <SessionContext.Provider value={{ data, setData, loading, setLoading }}>
      {children}
    </SessionContext.Provider>
  )
}

/** Hook to use session client-side */
export const useSession = (): [any, boolean] => {
  const { data, setData, loading, setLoading } = useContext(SessionContext)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (data) return
        const res = await fetch("/api/auth/session")
        setData(await res.json())
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchSession()
  }, [])

  return [data, loading]
}

/** Get session server-side */
export const getSession = ctx => {
  const { req } = ctx

  const cookies = cookie.parse(req.headers.cookie ?? "")
  const parsedToken = cookies["hackneyToken"]

  if (!parsedToken) return false

  const data = jsonwebtoken.verify(
    cookies["hackneyToken"],
    process.env.HACKNEY_JWT_SECRET
  )

  return {
    user: data,
  }
}

/** Go to sign in page */
export const signIn = (): void => {
  const redirect =
    process.env.NEXT_PUBLIC_API_ENDPOINT || "http://dev.hackney.gov.uk:3000"
  window.location.href = `https://auth.hackney.gov.uk/auth?redirect_uri=${redirect}`
}

/** Clear cookie and sign out */
export const signOut = async (): Promise<void> => {
  await fetch("/api/auth/sign-out")
  window.location.href = "/sign-in"
}

// require user to be signed in to view
// export const withSession = Component => props => {
//   const [session, loading] = useSession()
//   const router = useRouter()

//   if (!session && !loading) router.push("/sign-in")

//   return <Component {...props} session={session} />

//   return <p>Loading...</p>
// }

/** Utility to check if user is in named group */
export const hasGroup = (group: string, session): boolean =>
  session?.groups?.includes(group)
