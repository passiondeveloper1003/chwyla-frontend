import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import parse from 'html-react-parser'
import Link from '../utils/link'
import Fade from 'react-reveal/Fade'

class ProfileTemplate extends Component {

  render() {
    const { wpTeam } = this.props.data

    return (
      <>
        <Seo bodyClass='profile-template' {...wpTeam.seo} />
        <section className='profile'>
          <div className='profile__inner'>
            <button className='profile__back' onClick={() => window.history.back()}>Back to Team</button>
            <div className='profile__image'>
              <Fade distance='40px' bottom>
                <>{ wpTeam.acf.profileImage?.localFile && <GatsbyImage image={getImage(wpTeam.acf.profileImage.localFile)} alt={wpTeam.title} /> }</>
              </Fade>
            </div>
            <div className='profile__content'>
              <Fade distance='40px' bottom>
                <>
                  { wpTeam.title && <h1>{ parse(wpTeam.title) }</h1> }
                  { (wpTeam.teamDetails.role || wpTeam.acf.jobTitle) && <p className='profile__role'>{ parse(wpTeam.acf.jobTitle ? wpTeam.acf.jobTitle : wpTeam.teamDetails.role) }</p> }
                  <div className='profile__contact'>
                    <ul>
                      { (wpTeam.teamDetails.email || wpTeam.acf.email) && <li><Link to={`mailto:${wpTeam.acf.email ? wpTeam.acf.email : wpTeam.teamDetails.email}`}>{wpTeam.acf.email ? wpTeam.acf.email : wpTeam.teamDetails.email}</Link></li> }
                      { (wpTeam.teamDetails.mobile || wpTeam.acf.phone) && <li><Link to={`tel:${wpTeam.teamDetails.mobile ? wpTeam.teamDetails.mobile : wpTeam.acf.phone}`}>{wpTeam.acf.phone ? wpTeam.acf.phone : wpTeam.teamDetails.mobile}</Link></li> }
                    </ul>
                    <ul>
                      { wpTeam.acf.linkedin && <li><Link to={wpTeam.acf.linkedin}>LinkedIn</Link></li> }
                      { wpTeam.acf.instagram && <li><Link to={wpTeam.acf.instagram}>Instagram</Link></li> }
                    </ul>
                  </div>
                  { wpTeam.acf.bio && <div className='profile__bio'>{parse(wpTeam.acf.bio)}</div> }
                </>
              </Fade>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export const profileQuery = graphql`
  query ($id: String!) {
    wpTeam(id: {eq: $id}) {
      title
      uri
      seo {
        ...WpSeo
      }
      teamDetails {
        email
        jobTitle
        role
        mobile
        phone
      }
      acf {
        bio
        profileImage {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 1000
              )
            }
          }
        }
        linkedin
        instagram
        jobTitle
        email
        phone
      }
    }
  }
`

export default ProfileTemplate