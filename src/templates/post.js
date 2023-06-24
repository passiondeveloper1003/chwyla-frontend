import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import { GatsbyImage } from 'gatsby-plugin-image'
import parse from 'html-react-parser'
import ArticleCard from '../components/cards/article'
import Fade from 'react-reveal/Fade'

class PostTemplate extends Component {

  render() {
    const { wpPost, related } = this.props.data

    return (
      <>
        <Seo bodyClass='post-template' {...wpPost.seo} />
        <section className='article'>
          <div className='article__inner'>
            <Fade distance='40px' bottom>
              <>
                { wpPost.featuredImage?.node?.localFile && <GatsbyImage image={wpPost.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={wpPost.title} /> }
              </>
            </Fade>
            <Fade distance='40px' bottom>
              <h1>{ wpPost.title }</h1>
            </Fade>
            <Fade distance='40px' bottom>
              <div className='article__content'>{parse(wpPost.content)}</div>
            </Fade>
          </div>
        </section>
        <section className='related'>
          <Fade distance='40px' bottom>
            <div className='related__inner'>
              <h2>Related Articles</h2>
              <div className='related__items'>
                { related.nodes.map((el, i) => (
                  <div className='related__item' key={i}>
                    <ArticleCard {...el} />
                  </div>
                )) }
              </div>
            </div>
          </Fade>
        </section>
      </>
    )
  }
}

export const postQuery = graphql`
  query ($id: String!) {
    wpPost(id: {eq: $id}) {
      title
      content
      uri
      seo {
        ...WpSeo
      }
      date(formatString: "MMMM D, YYYY")
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
    related: allWpPost(
      filter: {id: {ne: $id}}
      sort: {fields: date, order: DESC},
      limit: 3
    ) {
      nodes {
        ...ArticleCard
      }
    }
  }
`

export default PostTemplate