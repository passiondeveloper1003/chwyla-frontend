import React from 'react'
import PropTypes from 'prop-types'

import layoutQuery from "../hooks/use-layout-query"

import '../assets/scss/main.scss'

import Header from '../components/header'
import Footer from '../components/footer'

const Layout = ({ children, location, pageContext }) => {
  const data = layoutQuery()

  const [intro, setIntro] = React.useState(true)

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { intro, setIntro })
  )

  React.useEffect(() => {
    document.documentElement.style.setProperty(`--mainPaddingMobile`, pageContext?.header === 'white' ? '0' : '66px');
    document.documentElement.style.setProperty(`--mainPaddingDesktop`, pageContext?.header === 'white' ? '0' : '66px');
    document.documentElement.style.setProperty(`--headerColour`, pageContext?.header === 'black' ? '#FFFFFF' : '#FFFFFF');
    document.documentElement.style.setProperty(`--headerBgColour`, pageContext?.header === 'black' ? '#6E6E6E' : 'transparent');
    document.documentElement.style.setProperty(`--headerBorderColour`, pageContext?.header === 'black' ? '#808080' : 'transparent');
  }, [pageContext])

  return (
    <>
      <Header location={location} data={data} pageContext={pageContext} intro={intro} setIntro={setIntro} />
      <main>{childrenWithProps}</main>
      <Footer data={data} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
