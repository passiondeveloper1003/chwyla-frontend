import React, {Component} from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Fade from 'react-reveal/Fade'
import Link from '../utils/link'
import Map from './map'
import ContactForm from './contact-form'
import parse from 'html-react-parser'

// Component to fix beforeChange bug rerendering slick
class BlockUpdate extends Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (<>{ this.props.children }</>)
  }
}

const Contact = ({ title, email, phone, googleMap }) => {

  return (
    <section className='contact'>
      <button className='contact__back' onClick={() => window.history.back()}>Close</button>
      <div className='contact__map'>
        <BlockUpdate>
          <Map lat={googleMap?.latitude} lng={googleMap?.longitude} staticMap={false} />
        </BlockUpdate>
      </div>
      <div className='contact__form'>
        <div className='contact__form-wrapper'>
          <ContactForm title={title} />
        </div>
      </div>
    </section>
  )
}

Contact.defaultProps = {
  title: `Get in Touch`,
  email: null,
  phone: null,
  button: null,
  googleMap: {
    latitude: `-37.826066295502144`,
    longitude: `145.09827195605783`,
  },
}

export default Contact