import React, { Component } from 'react'
import Link from '../utils/link'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'

import markerIcon from '../assets/images/marker.svg'

import { styles } from '../utils/map-props'

class Map extends Component {

  shouldComponentUpdate() {
    return false
  }

  renderStaticMap() {
    const { lat, lng, address, zoom } = this.props

    let src = [
      `https://maps.googleapis.com/maps/api/staticmap?`,
      `center=${lat},${lng}&`,
      `zoom=${zoom}&`,
      `size=${580}x${378}&`,
      `maptype=roadmap&`,
      `key=AIzaSyCygYmKHtKQ5ieGq_gNN4cPxTxzW_OduXA&`,
      `map_id=a1478b3ed70ca485&`,
    ].join('')
    return (
      <Link className='map' to={`https://www.google.com/maps/search/${encodeURIComponent(address)}`}>
        <img src={src} alt='Map' />
        <div className='marker'>
          <img src={markerIcon} alt='Kollosche - Map' />
        </div>
      </Link>
    )
  }

  render() {
    // Don't render SSR
    if (typeof window === 'undefined') return (<section className='map' />);

    const { lat, lng, staticMap, hideMarker } = this.props

    if (staticMap) return this.renderStaticMap()

    const location = { lat: parseFloat(lat), lng: parseFloat(lng) };

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={location}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          rotateControl: false,
          clickableIcons: true,
          scrollwheel: false,
          styles: styles
        }}
      >
        { !hideMarker &&
        <Marker
            position={location}
            icon={{ url: markerIcon, size: {width: 38, height: 60}, anchor: {x:19 , y: 30}, scaledSize: {width: 38, height: 60} }}
        />
        }
      </GoogleMap>
    ));

    return (
      <div className='map__wrapper'>
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCygYmKHtKQ5ieGq_gNN4cPxTxzW_OduXA&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div className={'map__element'} />}
        />
      </div>
    )
  }
}

Map.defaultProps = {
address: '',
  lat: '-37.828736',
  lng: '144.9606271',
  zoom: 16,
  hideMarker: false,
  staticMap: true,
}

export default Map
