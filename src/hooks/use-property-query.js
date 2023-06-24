import { useStaticQuery, graphql } from "gatsby"

const usePropertyQuery =  () => {
  const { allWpProperty } = useStaticQuery(graphql`
    query BuyProperties {
      allWpProperty(
        filter: {
          propertyListing: {
            marketingStatus: {in: ["Available"]}
          }
        }
        sort: {propertyListing: {listedDate: DESC}}
      ){
        nodes {
          ...PropertyCard
        }
      }
    }
  `)

  return allWpProperty.nodes 
}

export default usePropertyQuery