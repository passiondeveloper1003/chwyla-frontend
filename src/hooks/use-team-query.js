import { useStaticQuery, graphql } from "gatsby"

const useTeamQuery = () => {
  const { allWpTeam } = useStaticQuery(graphql`
    query TeamQuery {
      allWpTeam(
        sort: { menuOrder: ASC }
      ) {
        nodes {
          ...TeamCard
        }
      }
    }
  `)

  return allWpTeam.nodes 
}

export default useTeamQuery