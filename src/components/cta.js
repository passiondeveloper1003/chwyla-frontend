import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Fade from 'react-reveal/Fade'
import Link from '../utils/link'

const Cta = ({ image, title, content, button }) => {

  return (
    <section className='cta'>
      { image?.localFile && <GatsbyImage className='cta__bg' loading='lazy' image={getImage(image?.localFile)} alt={title} /> }
        <div className='cta__inner'>
          <Fade distance='40px' bottom>
          <div className='cta__title'>
            { title && <h3 dangerouslySetInnerHTML={{ __html: title }} /> }
            { content && <div className='cta__content' dangerouslySetInnerHTML={{ __html: content }} /> }
            <Link to={button.url} className='btn btn-white'>
              <span>{button.title}</span>
            </Link>
          </div>
          </Fade>
        </div>
    </section>
  )
}

Cta.defaultProps = {
  title: ``,
  content: ``,
  image: null,
  button: null,
}

export default Cta