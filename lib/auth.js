import { createContext, useContext, useState, useEffect } from "react"
import cookie from "cookie"
import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"

const SessionContext = createContext()

// wrap app with provider to use session hooks
export const Provider = ({ children }) => {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <SessionContext.Provider value={{ data, setData, loading, setLoading }}>
      {children}
    </SessionContext.Provider>
  )
}

// hook to use session client-side
export const useSession = () => {
  const { data, setData, loading, setLoading } = useContext(SessionContext)

  useEffect(async () => {
    if (data) return
    const res = await fetch("/api/auth/session")
    setData(await res.json())
    setLoading(false)
  }, [])

  return [data, loading]
}

// get session server-side
export const getSession = ctx => {
  const { req } = ctx

  const cookies = cookie.parse(req.headers.cookie ?? "")
  const parsedToken = cookies["hackneyToken"]

  if (!parsedToken) return false

  const data = jsonwebtoken.verify(
    cookies["hackneyToken"],
    process.env.HACKNEY_JWT_SECRET
  )

  return data
}

// go to sign in page
export const signIn = () => {
  let redirect = "http://dev.hackney.gov.uk:3000"
  window.location = `https://auth.hackney.gov.uk/auth?redirect_uri=${redirect}`
}

// clear cookie and sign out
export const signOut = async () => {
  await fetch("/api/auth/sign-out")
  window.location = "/sign-in"
}

// require user to be signed in to view
export const withSession = Component => props => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (!session && !loading) router.push("/sign-in")

  return <Component {...props} session={session} />

  return <p>Loading...</p>
}

// utility to check if user is in named group
export const hasGroup = (group, session) => session?.groups?.includes(group)
