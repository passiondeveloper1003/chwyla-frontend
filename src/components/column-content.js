import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Fade from 'react-reveal/Fade'
import Link from '../utils/link'
import AppraisalForm from './appraisal-form'

const ColumnContent = ({ items }) => {

  const [appraisal, setAppraisal] = React.useState(false)

  return (
    <>
      <section className='column-content'>
        <Fade distance='40px' bottom>
          <div className='column-content__inner'>
            { items.length > 0 &&
              <div className='column-content__items'>
                { items.map((el, i) => (
                  <div className='column-content__item' key={i}>
                    { el.image?.localFile && <GatsbyImage loading='lazy' image={getImage(el.image?.localFile)} alt={el.title} /> }
                    { el.title && <h3 dangerouslySetInnerHTML={{ __html: el.title }} /> }
                    { el.content && <div className='title-content-image__content' dangerouslySetInnerHTML={{ __html: el.content }} /> }
                    { !el.appraisal && el.button?.url &&
                      <Link to={el.button.url} className='btn btn-black'>
                        <span>{el.button.title}</span>
                      </Link>
                    }
                    { el.appraisal &&
                      <button type='button' onClick={() => setAppraisal(true)}className='btn btn-black'>
                        <span>{el.button.title}</span>
                      </button>
                    }
                  </div>
                )) }
              </div>
            }
          </div>
        </Fade>
      </section>
      <div className={`appraisal ${appraisal ? ' active' : ''}`}>
        <div className='appraisal__overlay'>
          <div className='appraisal__form'>
            <button type='button' onClick={() => setAppraisal(false)} className='appraisal__close'>Close</button>
            <div className='appraisal__form-wrapper'>
              <AppraisalForm id={'cc'} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ColumnContent.defaultProps = {
  items: null,
}

export default ColumnContent