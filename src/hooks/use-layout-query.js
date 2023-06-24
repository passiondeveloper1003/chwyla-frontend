import { useStaticQuery, graphql } from "gatsby"

const useLayoutQuery = () => {
  return useStaticQuery(graphql`
    fragment WpSeo on WpPostTypeSEO {
      metaDesc
      metaKeywords
      metaRobotsNofollow
      opengraphAuthor
      opengraphDescription
      opengraphImage {
        localFile {
          publicURL
        }
      }
      opengraphModifiedTime
      opengraphPublishedTime
      opengraphPublisher
      opengraphSiteName
      opengraphTitle
      opengraphType
      opengraphUrl
      readingTime
      schema {
        articleType
        pageType
        raw
      }
      title
      twitterDescription
      twitterImage {
        localFile {
          publicURL
        }
      }
      twitterTitle
    }
    fragment TeamCard on WpTeam {
      id
      title
      uri
      acf {
        profileImage {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1000
              )
            }
          }
        }
        bio
        linkedin
        instagram
        jobTitle
        email
        phone
      }
      teamDetails {
        id
        role
        email
        webDisplay
      }
    }
    fragment PropertyCard on WpProperty {
      databaseId
      id
      slug
      title
      propertyAddress {
        hideAddress
        streetAddress
        suburb
        state
        postcode
      }
      propertyLand {
        landArea_unit
        landArea_value
        buildingArea_unit
        buildingArea_value
      }
      propertyData {
        bathrooms
        bedrooms
        type
        carPorts
        carSpaces
        garages
        totalParking
        category
      }
      propertyImages {
        url
        small
        large
      }
      propertyListing {
        searchPrice
        marketingStatus
        displayPrice
      }
      propertyStaff {
        staffMemberId
      }
    }
    fragment RentalCard on WpRental {
      databaseId
      id
      slug
      title
      propertyAddress {
        hideAddress
        streetAddress
        suburb
        state
        postcode
      }
      propertyLand {
        landArea_unit
        landArea_value
        buildingArea_unit
        buildingArea_value
      }
      propertyData {
        bathrooms
        bedrooms
        type
        carPorts
        carSpaces
        garages
        totalParking
        category
      }
      propertyImages {
        url
        small
        large
      }
      propertyListing {
        searchPrice
        marketingStatus
        displayPrice
      }
      propertyStaff {
        staffMemberId
      }
    }
    fragment ArticleCard on WpPost {
      id
      uri
      title
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1000
              )
            }
          } 
        }
      }
    }
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      wp {
        generalSettings {
          title
          url
        }
      }
    }
  `)
}

export default useLayoutQuery