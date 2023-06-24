import React, { Component } from 'react'
import Link from '../utils/link'
import { Logo } from './icons'
import AppraisalForm from './appraisal-form'
import ContactForm from './contact-form'

class Header extends Component {

  state = {
    scrolled: false,
    offCanvas: false,
    contact: false,
    appraisal: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollDetect)
	}

	componentWillUnmount() {
	  window.removeEventListener('scroll', this.scrollDetect)
	}

  onScroll = () => {
    this.setState({
      scrolled: window.scrollY > window.innerHeight,
    })
  }

	scrollDetect = () => {
    window.clearTimeout( this.isScrolling )
    this.isScrolling = setTimeout(this.onScroll, 0);
	}

  _hideOffCanvas = () => {
    this.setState({ offCanvas: false })
  }

  _toggleOffCanvas = () => {
    this.setState({ offCanvas: !this.state.offCanvas })
  }

  render() {

    let { offCanvas, scrolled, appraisal, contact } = this.state
    let { intro } = this.props

    let props = {
      onClick: this._hideOffCanvas,
      activeClassName: 'active'
    }

    return (
      <>
        <header className={`header${scrolled ? ' header--scrolled' : ''}${offCanvas ? ' header--active' : ''}${intro ? ' header--intro-active' : ''}`}>
          <div className='header__inner'>
            <Link to='/' title='Site Name' className='header__logo' {...props}>
              <Logo color='#000000' />
            </Link>
            <nav className='header__nav'>
              <ul>
                <li>
                  <Link to='/buy/' {...props}>Property</Link>
                  <ul className='header__subnav'>
                    <li><Link to='/buy/' {...props}>Buy</Link></li>
                    <li><Link to='/lease/' {...props}>Lease</Link></li>
                    <li><Link to='/sold/' {...props}>Sold</Link></li>
                    <li>
                      <button 
                        type='button'
                        onClick={() => this.setState({ appraisal: true })}
                      >
                          Appraisals
                      </button>
                    </li>
                  </ul>
                </li>
                <li><Link to='/about/' {...props}>About</Link></li>
                <li><Link to='/team/'>Team</Link></li>
                <li>
                  <button 
                    type='button'
                    onClick={() => this.setState({ contact: true })}
                  >
                      Contact
                  </button>
                </li>
              </ul>
            </nav>
            <button onClick={this._toggleOffCanvas} className='header__hamburger'>
              { !offCanvas && <span className='lines'></span> }
              { offCanvas && <span className='close'>Close</span> }
            </button>
          </div>
        </header>
        <div className={`off-canvas ${ offCanvas && 'off-canvas--active' }`}>
          <div className='off-canvas__inner'>
            <nav className='off-canvas__nav'>
              <ul>
                <li><Link to='/buy/' {...props}>Buy</Link></li>
                <li><Link to='/lease/' {...props}>Lease</Link></li>
                <li><Link to='/sold/' {...props}>Sold</Link></li>
                <li>
                  <button 
                    type='button'
                    onClick={() => this.setState({ appraisal: true })}
                  >
                      Appraisals
                  </button>
                </li>
                <li><Link to='/about/' {...props}>About</Link></li>
                <li><Link to='/team/' {...props}>Team</Link></li>
                <li><Link to='/contact/'>Contact</Link></li>
              </ul>
            </nav>
            <div className='off-canvas__footer'>
              <div>
                <p>
                  <Link to='tel:+61386009995'>03 8600 9995</Link>
                  <Link to='mailto:admin@chwyla.com.au'>admin@chwyla.com.au</Link>
                </p>
                <p>
                  P.O. Box 200<br />
                  Doreen 3754
                </p>
              </div>
              <ul>
                <li><Link to='https://www.instagram.com/chwyla_/'>Instagram</Link></li>
                <li><Link to='https://www.linkedin.com/company/chwyla/'>LinkedIn</Link></li>
                <li><Link to='https://www.facebook.com/CHWYLA'>Facebook</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`appraisal ${appraisal ? ' active' : ''}`}>
          <div className='appraisal__overlay'>
            <div className='appraisal__form'>
              <button type='button' onClick={() => this.setState({ appraisal: false })} className='appraisal__close'>Close</button>
              <div className='appraisal__form-wrapper'>
                <AppraisalForm id={'header'} />
              </div>
            </div>
          </div>
        </div>
        <div className={`appraisal ${contact ? ' active' : ''}`}>
          <div className='appraisal__overlay'>
            <div className='appraisal__form'>
              <button type='button' onClick={() => this.setState({ contact: false })} className='appraisal__close'>Close</button>
              <div className='appraisal__form-wrapper'>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Header
