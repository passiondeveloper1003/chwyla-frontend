import React from 'react'
import Link from '../../utils/link'
import Fade from 'react-reveal/Fade'
import parse from 'html-react-parser'
import Slider from 'react-slick'
import { Sold } from '../icons'

const PropertyCard = ({ title, databaseId, propertyAddress, propertyImages, slug, propertyData, propertyListing, propertyLand, rental, slider }) => {

  const sliderRef = React.useRef(null)

  const settings = {
    autoplay: true,
    autoPlaySpeed: 5000,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  }
  
  let postType = rental ? 'rental' : 'property'
  let pathName = `/${postType}/${slug}/`
  let heading = `${propertyAddress.streetAddress}<br />${propertyAddress.suburb}`
  let sold = false
  if (propertyAddress.hideAddress) {
    heading = propertyAddress.suburb
    pathName = `/${postType}/${propertyAddress.suburb.toLowerCase().replace(/ /gi, '-')}-${databaseId}/`
  }
  if (propertyListing.marketingStatus !== 'Available' ) sold = true

  const renderStats = ({propertyData, propertyLand})  => {
    return (
      <div className='card__stats'>
        {propertyData.bedrooms > 0 && 
          <span>
            {propertyData.bedrooms} Beds
          </span>
        }
        {propertyData.bathrooms > 0 && 
          <span>
            {propertyData.bathrooms} Baths
          </span>
        }
        {propertyData.totalParking > 0 && 
          <span>
            {propertyData.totalParking} Cars
          </span>
        }
        { propertyLand?.landArea_value && 
          <span>
            {propertyLand.landArea_value}{propertyLand.landArea_unit === 'sqm' ? '㎡' : propertyLand.landArea_unit+'s'}
          </span> 
        }
      </div>
    )
  }

  return (
    <Fade distance='40px' bottom>
      <div className='card card--property'>
        <Link to={pathName}>
          { propertyImages?.length > 0 && !slider &&
            <div className='card__image'>
              <img src={propertyImages[propertyImages.length > 1 ? 1 : 0].large} />
              { sold && <div className='card__sold'><Sold /></div> }
            </div>
          }
          { propertyImages?.length > 0 && slider &&
            <div className='card__image'>
              <Slider {...settings} ref={sliderRef}>
                {propertyImages.slice(1, 5).map((image, index) => (
                  <img key={index} src={image.large} alt={heading} />
                ))}
              </Slider>
              { sold && <div className='card__sold'><Sold /></div> }
            </div>
          }
          <div className='card__meta'>
            { heading && <h4>{parse(heading)}</h4> }
            { renderStats({propertyData, propertyLand}) }
          </div>
        </Link>
      </div>
    </Fade>
  )
}

export default PropertyCard