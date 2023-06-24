import React from 'react'

import usePropertyQuery from "../hooks/use-property-query"
import useSoldQuery from "../hooks/use-sold-query"

import PropertyCard from './cards/property'
import SearchForm from './property-search'

import Link from '../utils/link'
import parse from 'html-react-parser'

const FeaturedProperties = ({ title, button, featured }) => {

  // Data
  let buy = usePropertyQuery()
  let properties = []
  if (featured?.length > 0) {
    buy = buy.filter(el => el.id !== featured[0].id)
    properties = [featured[0], ...buy]
  } else {
    properties = [...buy]
  }

  return (
    <>
      <section className='featured-properties'>
        <div className='featured-properties__inner'>
          <div className='featured-properties__header'>
            { title && <h3>{parse(title)}</h3> }
            <Link className='btn btn-black' to={button.url}>{button.title}</Link>
          </div>
          <div className='featured-properties__items'>
            { properties?.slice(0, 3).map((el, i) => {
              return (<PropertyCard key={el.id} {...el} slider={i === 0 ? true : false} />)
            }) }
          </div>
        </div>
      </section>
    </>
    
  )
}

FeaturedProperties.defaultProps = {
  title: 'Featured Properties',
  button: {
    title: 'View All',
    url: '/buy/'
  }
}

export default FeaturedProperties
