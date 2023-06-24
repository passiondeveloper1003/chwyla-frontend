import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import parse from 'html-react-parser'
import { Logo } from './icons'
import Video from '../assets/images/chwyla.mp4'

const PageBanner = ({ title, desktopImage, mobileImage, video, mobileVideo, splash, intro, setIntro }) => {
  React.useEffect (() => {
    if (!splash) setIntro(false)
  }, [splash, setIntro])
  return (
    <section className={`page-banner${intro ? ' page-banner--intro-active' : ''}`}>
      { intro && splash && desktopImage?.localFile && mobileImage?.localFile &&
        <>
          <GatsbyImage image={getImage(desktopImage.localFile)} alt={title} className='page-banner__image page-banner__image--mobile' />
          <GatsbyImage image={getImage(mobileImage.localFile)} alt={title} className='page-banner__image page-banner__image--desktop' />
        </>
      }
      { !intro && video && mobileVideo &&
        <>
          <video className='page-banner__video page-banner__video--mobile' src={Video} autoPlay muted loop playsInline />
          <video className='page-banner__video page-banner__video--desktop' src={Video} autoPlay muted loop playsInline />
        </>
      }
      { !intro && !video && !mobileVideo && desktopImage?.localFile && mobileImage?.localFile &&
        <>
          <GatsbyImage image={getImage(desktopImage.localFile)} alt={title} className='page-banner__image page-banner__image--desktop' />
          <GatsbyImage image={getImage(mobileImage.localFile)} alt={title} className='page-banner__image page-banner__image--desktop' />
        </>
      }
      <div className='page-banner__inner'>
        { !intro && title && <h1>{parse(title)}</h1> }
        { intro && <Logo color='#FFFFFF' /> }
        
        { !intro && <span>Scroll to begin</span> }
        { intro && 
          <>
            <button type='button' onClick={() => setIntro(false)} />
            <span className='button'>Click to enter</span>
          </>
        }
      </div>
    </section>
  )
}

PageBanner.defaultProps = {
  title: ``,
  desktopImage: null,
  mobileImage: null,
  video: ``,
  mobileVideo: ``,
}

export default PageBanner

