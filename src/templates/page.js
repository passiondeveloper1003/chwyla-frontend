import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'

import RenderBlock from '../utils/render-block'

class PageTemplate extends Component {

  render() {
    const { wpPage } = this.props.data

    return (
      <>
        <Seo bodyClass={`page-template page-template--${wpPage.slug}${this.props.intro ? ' page-template--intro-active' : ''}`} {...wpPage.seo} />
        { wpPage.acf?.contentBlocks?.map((el, i) => RenderBlock(el.fieldGroupName?.replace('page_Acf_ContentBlocks_', ''), el, i, this.props.intro, this.props.setIntro))  }
      </>
    )
  }
}

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: {eq: $id}) {
      title
      slug
      uri
      seo {
        ...WpSeo
      }
      acf {
        contentBlocks {
          ... on WpPage_Acf_ContentBlocks_PageBanner {
            fieldGroupName
            desktopImage {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1600
                  )
                }
              }
            }
            mobileImage {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 800
                  )
                }
              }
            }
            splash
            title
            video
            mobileVideo
          }
          ... on WpPage_Acf_ContentBlocks_TitleContentImage {
            fieldGroupName
            title
            content
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1600
                  )
                }
              }
            }
            button {
              url
              title
            }
            reverse
          }
          ... on WpPage_Acf_ContentBlocks_Cta {
            fieldGroupName
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1600
                  )
                }
              }
            }
            title
            content
            button {
              url
              title
            }
          }
          ... on WpPage_Acf_ContentBlocks_FeaturedProperties {
            fieldGroupName
            title
            button {
              url
              title
            }
            featured {
              ... on WpProperty {
                ...PropertyCard
              }
            }
          }
          ... on WpPage_Acf_ContentBlocks_ColumnContent {
            fieldGroupName
            items {
              title
              content
              image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      width: 1600
                    )
                  }
                }
              }
              button {
                url
                title
              }
              appraisal
            }
          }
          ... on WpPage_Acf_ContentBlocks_TeamArchive {
            fieldGroupName
          }
          ... on WpPage_Acf_ContentBlocks_BlogArchive {
            fieldGroupName
          }
          ... on WpPage_Acf_ContentBlocks_Contact {
            fieldGroupName
            title
            email {
              url
              title
            }
            phone {
              url
              title
            }
            googleMap {
              latitude
              longitude
            }
          }
          ... on WpPage_Acf_ContentBlocks_PropertyArchive {
            fieldGroupName
            type
            featured {
              ... on WpProperty {
                ...PropertyCard
              }
            }
          }
          ... on WpPage_Acf_ContentBlocks_BasicPage {
            fieldGroupName
            title
            content
          }
        }
      }
    }
  }
`

export default PageTemplate