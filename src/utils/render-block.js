import React from 'react'

import PageBanner from '../components/page-banner'
import TitleContentImage from '../components/title-content-image'
import TeamArchive from '../components/team-archive'
import BlogArchive from '../components/blog-archive'
import PropertyArchive from '../components/property-archive'
import Cta from '../components/cta'
import ColumnContent from '../components/column-content'
import Contact from '../components/contact'
import BasicPage from '../components/basic-page'
import FeaturedProperties from '../components/featured-properties'

const renderBlock = (param, el, i, intro, setIntro) => {
  el.key = i

  let block = {
    'PageBanner' : (el) => <PageBanner {...el} intro={intro} setIntro={setIntro} />,
    'TitleContentImage' : (el) => <TitleContentImage {...el} />,
    'TeamArchive' : (el) => <TeamArchive {...el} />,
    'BlogArchive' : (el) => <BlogArchive {...el} />,
    'Cta' : (el) => <Cta {...el} />,
    'ColumnContent' : (el) => <ColumnContent {...el} />,
    'PropertyArchive' : (el) => <PropertyArchive {...el} />,
    'Contact' : (el) => <Contact {...el} />,
    'BasicPage' : (el) => <BasicPage {...el} />,
    'FeaturedProperties' : (el) => <FeaturedProperties {...el} />,
  }[param]

  if (!block) return null

  return block(el)
}

export default renderBlock