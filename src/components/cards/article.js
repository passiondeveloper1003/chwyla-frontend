import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Fade from 'react-reveal/Fade'
import Link from '../../utils/link'
import parse from 'html-react-parser'

const ArticleCard = ({ uri, title, featuredImage }) => {

  const renderImage = () => {
    if (featuredImage?.node?.localFile) {
      return (
        <div className='card__image'>
          <GatsbyImage image={getImage(featuredImage?.node.localFile)} alt={title} />
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Fade distance='40px' bottom>
        <Link className='card card--post' to={uri}>
          { renderImage() }
          <div className='card__title'>
            <h4>{parse(title)}</h4>
          </div>
        </Link>
      </Fade>
    </>
  )
}

export default ArticleCard