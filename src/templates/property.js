import React, { Component } from 'react'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import AddToCalendar from '@culturehq/add-to-calendar'
import FsLightbox from 'fslightbox-react'
import moment, { relativeTimeRounding } from 'moment'
import { Sold } from '../components/icons'
import PropertyCard from '../components/cards/property'

import Seo from '../components/seo'
import Map from '../components/map'
import PropertyForm from '../components/property-form'
import Link from '../utils/link'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Fade from 'react-reveal/Fade'

// Component to fix beforeChange bug rerendering slick
class BlockUpdate extends Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (<>{ this.props.children }</>)
  }
}

function filterIt(arr, searchKey) {
  return arr.filter(function(obj) {
    return Object.keys(obj).some(function(key) {
      return obj[key].includes(searchKey)
    })
  })
}

class PropertyTemplate extends Component {

  state = {
    enquire: false,
    videoLightbox: false,
    floorplanLightbox: false,
    imageLightboxController: {
      toggler: false,
      slide: 0
    },
    showMore: false
  }

  constructor(props) {
    super(props)
    this.slider = React.createRef()
  }

  openLightboxOnSlide = (index) => {
    this.setState({
      imageLightboxController: {
        toggler: !this.state.imageLightboxController.toggler,
        slide: index
      }
    })
  }

  renderText = (el, i) => {
    if (el.length === 0) return
    if (el.indexOf('•') !== -1) return <li key={i}>{ el.replace(/•/gi, '') }</li>
    return <p key={i}>{ el }</p>
  }

  render() {

    let property = this.props.data.wpProperty
    let team = this.props.data.allWpTeam.nodes
    let related = this.props.data.allWpProperty.nodes
    let people = []
    let { videoLightbox, floorplanLightbox, imageLightboxController, showMore } = this.state

    let video = ''
    let videos = property.propertyExternal?.length && filterIt(property.propertyExternal,'Youtube Video Link')
    if (videos && videos.length) {
      video = `https://www.youtube.com/watch?v=${videos[0].url.split('.be/')[1]}`
    }

    let tour = ''
    let tours = property.propertyExternal?.length && filterIt(property.propertyExternal,'Virtual Tour Link')
    if (tours && tours.length) {
      tour = tours[0].url
    }

    let auctionEvent = {
      name: property.propertyAddress.hideAddress ? property.propertyAddress.addressSuburb : property.title,
      details: 'Auction',
      location: property.propertyAddress.hideAddress ? property.propertyAddress.addressSuburb : property.title,
      startsAt: moment(property.propertyListing.auctionDate),
      endsAt: moment(property.propertyListing.auctionDate),
    }

    let hasInspections = false
    if (property.propertyInspections?.length > 0 ) {
      property.propertyInspections.map((el, i) => {
        if (moment(el.startDate, "YYYY-MM-DD").isAfter(new Date())) hasInspections = true
      })
    }

    let heading = `${property.propertyAddress.streetAddress}<br />${property.propertyAddress.suburb}`
    if (property.propertyAddress.hideAddress) {
      heading = property.propertyAddress.suburb
    }

    let sold = false
    if (property.propertyListing.marketingStatus !== 'Available' ) sold = true

    let agent_emails = []
    let agents = property.propertyStaff?.map((el, i) => {
      if (people.includes(el.staffMemberId)) return null
      if (!el.webDisplay) return null
      people.push(el.staffMemberId)

      const member = team.find(
        (t) => t.teamDetails.id === el.staffMemberId
      )
      if (!member) return null
      let item = {
        acf: member.acf,
        uri: member.uri,
        title: member.title,
        teamDetails: member.teamDetails,
      }
      // push agent emails for form
      agent_emails.push(member.teamDetails.email)
      // Fallback to global phone
      if (!item.mobile)
        item.mobile = member.teamDetails.mobile

      return item
    }).filter(el => el)

    return (
      <>
        <Seo
          bodyClass={property.slug}
          path={`/property/${property.slug}`}
          title={parse(property.seo.title)}
          description={property.seo.metaDesc}
          keywords={property.seo.metaKeywords}
          schema={property.seo.schema.raw}
          image={property.propertyImages.length > 0 ? property.propertyImages[0].small : ''}
        />
        <article className='property'>
          <Fade distance='40px' bottom>
            <section className='property__header'>
              <div className='property__inner property-archive__items'>
                <div className='card card--property'>
                  { property.propertyImages?.length > 0 &&
                    <div className='card__image' onClick={() => this.openLightboxOnSlide(1)}>
                      <img src={property.propertyImages[property.propertyImages.length > 1 ? 1 : 0].large} />
                      { sold && <div className='card__sold'><span><Sold /></span></div> }
                    </div>
                  }
                  <div className='card__meta'>
                    { property.propertyListing.marketingStatus === 'Sold' && property.propertyImages.length === 1 && <p className='off-market'>Sold Off Market</p> }
                    { heading && <h1>{parse(heading)}</h1> }
                    <div className='card__stats'>
                      {property.propertyData.bedrooms > 0 && 
                        <span>
                          {property.propertyData.bedrooms} Beds
                        </span>
                      }
                      {property.propertyData.bathrooms > 0 && 
                        <span>
                          {property.propertyData.bathrooms} Baths
                        </span>
                      }
                      {property.propertyData.totalParking > 0 && 
                        <span>
                          {property.propertyData.totalParking} Cars
                        </span>
                      }
                      { property.propertyLand?.landArea_value && 
                        <span>
                          {property.propertyLand.landArea_value}{property.propertyLand.landArea_unit === 'sqm' ? '㎡' : property.propertyLand.landArea_unit+'s'}
                        </span> 
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Fade>
          <section className='property__main'>
            <Fade distance='40px' bottom>
              <div className='property__inner'>
                <div className='property__content'>
                  <h2>{parse(property.propertyListing.mainHeadline)}</h2>
                  { property.propertyListing.marketingStatus === 'Sold' && property.propertyListing.soldPriceConfidential !== '1' && <h4 className='property__price'>${ parseFloat(property.propertyListing.soldPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/\.00/, '') }</h4> }
                  { property.propertyListing.marketingStatus === 'Available' && <h4 className='property__price'>{property.propertyListing.displayPrice}</h4> }
                  <ul className='property__buttons'>
                    <li>
                      <button
                        type='button'
                        onClick={() => this.openLightboxOnSlide(1)}
                      >
                        Gallery
                      </button>
                    </li>
                    { tour &&
                      <li>
                        <Link to={tour}>3D Tour</Link>
                      </li>
                    }
                    { property.propertyFloorplan?.length > 0 &&
                      <li>
                        <button
                          type='button'
                          onClick={() => this.setState({ floorplanLightbox: !this.state.floorplanLightbox })}
                        >
                          Floorplan
                        </button>
                      </li>
                    }
                    <li>
                      <Link to='#enquire'>
                        Enquire
                      </Link>
                    </li>
                  </ul>
                  <div className='property__description-wrap'>
                    <div className={`property__description ${showMore && 'active'}`}>
                      { property.propertyListing?.mainDescription.split('\n').map(this.renderText) }
                    </div>
                    <button
                      type='button'
                      className='btn btn-black property__more'
                      onClick={() => this.setState({ showMore: !this.state.showMore })}
                    >
                      {showMore ? 'Read Less' : 'Read More'}
                    </button>
                  </div>
                </div>
                <div className='property__contact'>
                  { property.propertyListing.marketingStatus === 'Sold' && property.propertyListing.auctionDate &&
                    <>
                      <div className='property__important-dates'>
                        <h4>Auction</h4>
                        <p>
                          <AddToCalendar event={auctionEvent}>
                            {moment(property.propertyListing.auctionDate).format('ddd D MMM Y')}<br />
                            {moment(property.propertyListing.auctionDate).format('h:mmA')}
                          </AddToCalendar>
                        </p>
                      </div>
                    </>
                  }
                  { property.propertyListing.marketingStatus === 'Available' &&
                    <>
                      { property.propertyListing?.auctionDate &&
                        <div className='property__important-dates'>
                          <h4>Auction</h4>
                          <p>
                            <AddToCalendar event={auctionEvent}>
                              <u>{moment(property.propertyListing.auctionDate).format('ddd D MMM')}</u><br />
                              {moment(property.propertyListing.auctionDate).format('h:mmA')}
                            </AddToCalendar>
                          </p>

                        </div>
                      }
                      { property.propertyInspections?.length > 0 && hasInspections &&
                        <div className='property__important-dates'>
                          <h4>Inspections</h4>
                          { property.propertyInspections.map((el, i) => {
                            let inspectionEvent = {
                              name: property.propertyAddress.hideAddress ? property.propertyAddress.addressSuburb : property.title,
                              details: 'Open For Inspection',
                              location: property.propertyAddress.hideAddress ? property.propertyAddress.addressSuburb : property.title,
                              startsAt: moment(el.startDate),
                              endsAt: moment(el.endDate),
                            }
                            if (moment(el.startDate).add(1, 'days').isBefore(new Date())) return false
                            return (
                              <p key={i}>
                                <AddToCalendar event={inspectionEvent}>
                                  <u>{moment(el.startDate).format('ddd D MMM')}</u><br />
                                  {moment(el.startDate).format('h:mmA')} - {moment(el.endDate).format('h:mmA')}
                                </AddToCalendar>
                              </p>
                            )
                          }) }

                        </div>
                      }
                    </>
                  }
                  <div className='property__agents'>
                    { agents?.map((el, i) => (
                      <div className='card card--agent'>
                        <div className='card__image'>
                          <Link to={el.uri}><GatsbyImage image={getImage(el.acf.profileImage.localFile)} alt={parse(el.title)} /></Link>
                        </div>
                        <div className='card__content'>
                          <div className='card__title'>
                            <h4>{parse(el.title)}</h4>
                            <p>{parse(el.acf.jobTitle ? el.acf.jobTitle : el.teamDetails.role)}</p>
                          </div>
                          <div className='card__contact'>
                            { el.teamDetails.email && <p className='email'><Link to={`mailto:${el.teamDetails.email}`}>Email</Link></p> }
                            { el.teamDetails.mobile && <p className='phone'><Link to={`tel:${el.teamDetails.mobile}`}>{el.teamDetails.mobile}</Link></p> }
                            <Link className='card__link btn' to={el.uri}>Profile</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          </section>
          { property.propertyImages?.length > 2 &&
            <section className='property__gallery'>
              <div className='property__inner'>
                {property.propertyImages?.slice(2, 5).map((el, i) => (
                  <div className='property__image' key={i} onClick={() => this.openLightboxOnSlide(i + 2)}>
                    <Fade distance='40px' bottom>
                      <img src={el.large} alt={parse(property.title)} />
                    </Fade>
                  </div>
                ))}
              </div>
              <button
                className='property__gallery-button btn btn-black'
                type='button'
                onClick={() => this.openLightboxOnSlide(1)}
              >
                View All
              </button>
            </section>
          }
          <section className='property__enquire' id="enquire">
            <Fade distance='40px' bottom>
              <div className='property__inner'>
                <div className='property__form'>
                  <h4>Interested?<br />Get in touch with Chwyla.</h4>
                  <PropertyForm
                    title={property.title}
                    property={property.title}
                    agent_emails={agent_emails.join(', ')}
                  />
                </div>
                { !property.propertyAddress.hideAddress &&
                  <div className='property__map'>
                    <BlockUpdate>
                      <Map lat={property.propertyLocation?.lat} lng={property.propertyLocation?.long} address={`${property.propertyAddress.streetAddress} ${property.propertyAddress.suburb}`} zoom={17} />
                    </BlockUpdate>
                  </div>
                }
              </div>
            </Fade>
          </section>
          { related?.length > 0 &&
            <section className='property__related'>
              <div className='property__inner'>
                <div className='featured-properties__header'>
                  <h3>Related Properties</h3>
                  <Link className='btn btn-black' to='/buy/'>View All</Link>
                </div>
                <div className='property-archive__items'>
                  { related.map((el) => {
                    return (<PropertyCard key={el.id} rental={false} sold={el.propertyListing.marketingStatus !== 'Available' ? true : false} {...el} />)
                  }) }
                </div>
              </div>
            </section>
          }
        </article>
        { video &&
          <FsLightbox
            toggler={videoLightbox}
            sources={ [
              video
            ]}
          />
        }
        { property.propertyFloorplan?.length > 0 &&
          <FsLightbox
            toggler={floorplanLightbox}
            sources={[
              <img className='property__floorplan-image' src={property.propertyFloorplan[0].url} alt='Floorplan' />
            ]}
          />
        }
        { property.propertyImages?.length > 0 &&
          <FsLightbox
            toggler={imageLightboxController.toggler}
            sources={property.propertyImages.slice(1, 20).map((el, idx) => (
              <img
                className='property__lightbox-image'
                key={idx}
                src={el.large}
                alt={parse(property.title)}
              />
            ))}
            slide={imageLightboxController.slide}
          />
        }
      </>
    )
  }
}

export const propertyQuery = graphql`
  query ($id: String!, $status: String!) {
    wpProperty(id: {eq: $id}) {
      title
      slug
      seo {
        ...WpSeo
      }
      propertyAddress {
        hideAddress
        streetAddress
        suburb
        state
        region
        postcode
      }
      propertyLand {
        landArea_unit
        landArea_value
        buildingArea_unit
        buildingArea_value
      }
      propertyDocuments {
        url
        title
        type
      }
      propertyData {
        bathrooms
        bedrooms
        type
        carPorts
        carSpaces
        garages
        totalParking
        category
        features
      }
      propertyExternal {
        type
        url
      }
      propertyFloorplan {
        url
      }
      propertyImages {
        url
        small
        large
      }
      propertyInspections {
        startDate
        endDate
      }
      propertyStaff {
        staffMemberId
        webDisplay
      }
      propertyListing {
        id
        searchPrice
        marketingStatus
        displayPrice
        mainHeadline
        mainDescription
        auctionDate
        status
        soldDate
        soldPrice
        soldPriceConfidential
      }
      propertyLocation {
        lat
        long
      }
      propertyLand {
        landArea_unit
        landArea_value
        buildingArea_unit
        buildingArea_value
      }
    }
    allWpProperty(
      filter: {
        id: {ne: $id}
        propertyListing: {
          marketingStatus: {in: [$status]}
        }
      }
      limit: 2){
      nodes {
        ...PropertyCard
      }
    }
    allWpTeam {
      nodes {
        title
        uri
        acf {
          profileImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 400
                )
              }
            }
          }
          jobTitle
        }
        teamDetails {
          email
          firstName
          hideMobileOnWeb
          id
          jobTitle
          lastName
          mobile
          phone
          role
        }
      }
    }
  }
`

export default PropertyTemplate