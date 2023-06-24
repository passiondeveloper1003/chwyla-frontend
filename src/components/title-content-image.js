import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Fade from 'react-reveal/Fade'
import Link from '../utils/link'

const TitleContentImage = ({ title, content, image, button, reverse }) => {

  return (
    <section className={`title-content-image${reverse ? ' reverse' : ''}`}>
      <Fade distance='40px' bottom>
        <div className='title-content-image__inner'>
          <div className='title-content-image__title'>
            { title && <h3 dangerouslySetInnerHTML={{ __html: title }} /> }
            { content && <div className='title-content-image__content' dangerouslySetInnerHTML={{ __html: content }} /> }
            { button?.url &&
              <Link to={button.url} className='btn btn-black'>
                <span>{button.title}</span>
              </Link>
            }
          </div>
          <div className='title-content-image__image'> 
            { image?.localFile && <GatsbyImage loading='lazy' image={getImage(image?.localFile)} alt={title} /> }
          </div>
        </div>
      </Fade>
    </section>
  )
}

TitleContentImage.defaultProps = {
  title: ``,
  content: ``,
  image: null,
  button: null,
  reverse: false,
}

export default TitleContentImage