import { useStaticQuery, graphql } from "gatsby"

const useLeaseQuery = () => {
  const { allWpRental } = useStaticQuery(graphql`
    query LeaseProperties {
      allWpRental {
        nodes {
          ...RentalCard
        }
      }
    }
  `)

  return allWpRental.nodes 
}

export default useLeaseQuery