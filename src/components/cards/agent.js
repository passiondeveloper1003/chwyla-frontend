import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Fade from 'react-reveal/Fade'
import Link from '../../utils/link'
import parse from 'html-react-parser'

const AgentCard = ({ uri, title, acf, teamDetails }) => {

  const renderImage = () => {
    if (acf?.profileImage?.localFile) {
      return (
        <div className='card__image'>
          <GatsbyImage image={getImage(acf.profileImage.localFile)} alt={title} />
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Fade distance='40px' bottom>
        <Link className='card card--agent' to={uri}>
          { renderImage() }
          <div className='card__title'>
            { title && <h4>{parse(title)}</h4> }
            { (teamDetails.role || acf.jobTitle) && <p>{parse(acf.jobTitle ? acf.jobTitle : teamDetails.role)}</p> }
          </div>
        </Link>
      </Fade>
    </>
  )
}

export default AgentCard