interface Props {
  title: string
  children: React.ReactChild
}

const Banner = ({ title, children }: Props): React.ReactElement => (
  <section className="lbh-page-announcement">
    <h3 className="lbh-page-announcement__title">{title}</h3>
    <div className="lbh-page-announcement__content">{children}</div>
  </section>
)

export default Banner
