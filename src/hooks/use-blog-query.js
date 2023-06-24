import { useStaticQuery, graphql } from "gatsby"

const useBlogQuery = () => {
  const { allWpPost } = useStaticQuery(graphql`
    query blogQuery {
      allWpPost(sort: {date: DESC}) {
        nodes {
          ...ArticleCard
        }
      }
    }
  `)

  return allWpPost.nodes 
}

export default useBlogQuery