import { useStaticQuery, graphql } from "gatsby"

const useSoldQuery = () => {
  const { allWpProperty } = useStaticQuery(graphql`
    query SoldProperties {
      allWpProperty(
        filter: {
          propertyListing: {
            marketingStatus: {in: ["Sold", "Under Contract"]}
          }
        }
        sort: {propertyListing: {soldDate: DESC}}
      ){
        nodes {
          ...PropertyCard
        }
      }
    }
  `)

  return allWpProperty.nodes 
}

export default useSoldQuery