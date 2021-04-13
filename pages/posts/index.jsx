import Layout from "../../components/Layout"
import Link from "next/link"
import { useSession } from "next-auth/client"

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/posts`)
  const posts = await res.json()
  return { props: { posts } }
}

const Index = ({ posts }) => {
  const [session, loading] = useSession()
  console.log(posts.length)
  return (
    <Layout>
      <h1>New Care Assessments</h1>
      <table class="govuk-table lbh-table">
        <tbody class="govuk-table__body">
          {posts.map(post => (
          <div>
           <h2 key={post.id}>{post.id}. {post.title}</h2> 
            <tr class="govuk-table__row">
            <td class="govuk-table__cell">{post.content}</td>
            <td class="govuk-table__cell">{post.published}</td>
            <td class="govuk-table__cell">
              <span class="govuk-tag lbh-tag lbh-tag--green" >status test </span>
            </td>
            <td class="govuk-table__cell">
              <Link href={`/posts/${post.id}`}>
                <a>Show</a>
              </Link>
              {session && (
                <Link href={`/posts/${post.id}/edit`}>
                  <a>Edit</a>
                </Link>
              )}
            </td>
            </tr>
          </div>
          ))}
        </tbody>
      </table>

      {session && (
        <Link href="/posts/new">
          <a>New post</a>
        </Link>
      )}
    </Layout>
  )
}

export default Index
