import React from 'react'

import usePropertyQuery from "../hooks/use-property-query"
import useSoldQuery from "../hooks/use-sold-query"
import useLeaseQuery from "../hooks/use-lease-query"

import PropertyCard from './cards/property'
import SearchForm from './property-search'

import Link from '../utils/link'

const PropertyArchive = ({ type, featured }) => {

  // Data
  let properties = {
    'buy': usePropertyQuery(),
    'sold': useSoldQuery(),
    'lease': useLeaseQuery(),
  }[type]

  if (featured?.length > 0) {
    properties = properties.filter(el => el.id !== featured[0].id)
    properties = [featured[0], ...properties]
  }
  // State
  const [list, setList] = React.useState(properties);
  const [limit, setLimit] = React.useState(12);

  let suburbs = []
  if (type !== 'projects') {
    properties?.forEach((el, i) => {
      suburbs.push(el.propertyAddress.suburb)
    })
    suburbs = suburbs.filter((v, i, a) => a.indexOf(v) === i)
    suburbs.sort()
  }

  // Ref
  const load = React.createRef();

  // Events
  let timeout = null
  const onScroll = () => {
    let position = load?.current?.getBoundingClientRect()
    if (!position) return
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
      if (!timeout) {
      //if (!this.timeout && this.state.length < this.state.list) {
        timeout = setTimeout(() => {
          setLimit(limit + 6)
          timeout = null
        }, 10)
      }
    } else {
      clearTimeout(timeout)
    }
  }

  // Update
  React.useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })


  return (
    <>
      <section className='property-archive'>
        <div className='property-archive__inner'>
          <div className='property-archive__header'>
            <SearchForm
              list={properties || []} 
              set={setList} 
              type={type} 
              suburbs={suburbs}
            />
          </div>
          <div className='property-archive__items'>
            { list?.slice(0, limit).map((el, i) => {
              return (<PropertyCard key={el.id} rental={type === 'lease' ? true : false} sold={type === 'sold' ? true : false} slider={i === 0 ? true : false} {...el} />)
            }) }
          </div>
          { list?.length === 0 && <p className='property-archive__no-results'>Currently we do not have any properties available.</p> }
        </div>
      </section>
      <div ref={load} />
    </>
    
  )
}

PropertyArchive.defaultProps = {
  type: 'Buy',
}

export default PropertyArchive
