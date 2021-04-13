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
  return (
    <Layout>
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h2 class="govuk-heading-xl">New Care Assessments</h2>
          <p class="govuk-body govuk-!-margin-bottom-7">You’ve completed 3 out of 17 sections. Some sections have been prefilled. Your work will be saved automatically.</p>

          <ol class="app-task-list">
            <li>
              {posts.map(post => (
              <div>
              <h2 class="app-task-list__section" key={post.id}> {post.id}. 
                <span class="app-task-list__section-number"> {' '}  {post.title} </span>
              </h2> 
                <ul class="app-task-list__items">
                  <li class="app-task-list__item">
                    <span class="app-task-list__task-name">
                      <a href="#" aria-describedby="eligibility-status">
                        {post.content}
                      </a>
                    </span>
                    <strong class="govuk-tag govuk-tag--grey app-task-list__tag"  id="eligibility-status">To do</strong>
                      <Link href={`/posts/${post.id}`}>
                        <a>Show</a>
                      </Link>
                      {session && (
                        <Link href={`/posts/${post.id}/edit`}>
                          <a>Edit</a>
                        </Link>
                      )}
                  </li>
                </ul>
              </div>
              ))}
            </li>
          </ol>

          {session && (
            <Link href="/posts/new">
              <a>New post</a>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Index
