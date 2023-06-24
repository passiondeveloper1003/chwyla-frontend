import React from 'react'
import Fade from 'react-reveal/Fade'
import parse from 'html-react-parser'

const BasicPage = ({ title, content, image, button, reverse }) => {

  return (
    <section className='basic-page'>
      <Fade distance='40px' bottom>
        <div className='basic-page__inner'>
          { title && <h1>{parse(title)}</h1> }
          { content && <div className='basic-page__content'>{parse(content)}</div> }
        </div>
      </Fade>
    </section>
  )
}

BasicPage.defaultProps = {
  title: ``,
  content: ``,
}

export default BasicPage