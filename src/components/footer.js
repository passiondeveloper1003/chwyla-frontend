import React, { Component } from 'react'
import Link from '../utils/link'
import { Logo } from './icons'

class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <div className='footer__inner'>
          <div className='footer__logo'>
            <Link to=''>
              <Logo color='#FFFFFF' />
            </Link>
          </div>
          <div className='footer__mobile-wrapper'>
            <div className='footer__col'>
              <ul>
                <li><Link to='/buy/'>Buy</Link></li>
                <li><Link to='/about/'>About</Link></li>
                <li><Link to='/lease/'>Lease</Link></li>
                <li><Link to='/team/'>Team</Link></li>
                <li><Link to='/sold/'>Sold</Link></li>
                <li><Link to='/contact/'>Contact</Link></li>
              </ul>
            </div>
            <div className='footer__col'>
              <ul>
                <li>
                  <Link to='tel:+61386009995'>03 8600 9995</Link><br />
                  <Link to='mailto:admin@chwyla.com.au'>admin@chwyla.com.au</Link>
                </li>
                <li> <Link to='https://www.google.com/maps/place/Shop+3%2F100+Hazel+Glen+Dr,+Doreen+VIC+3754/@-37.5863504,145.1250002,17z/data=!3m1!4b1!4m5!3m4!1s0x6ad7b552a4baaaab:0x198518f585c85493!8m2!3d-37.5863547!4d145.1271942'>3/100 Hazel Glen Dr<br />Doreen 3754</Link>
                  </li>
              </ul>
              <ul>
                <li><Link to='https://www.instagram.com/chwyla_/'>Instagram</Link></li>
                <li><Link to='https://www.linkedin.com/company/chwyla/'>LinkedIn</Link></li>
                <li><Link to='https://www.facebook.com/CHWYLA'>Facebook</Link></li>
              </ul>
            </div>
            <div className='footer__row footer__bottom'>
              <div className='footer__col'>
                <ul>
                  <li><Link to='/privacy-policy/'>Privacy Policy</Link></li>
                </ul>
              </div>
              <div className='footer__col'>
                <ul>
                  <li>© Chwyla 2022.<br />All rights reserved.</li>
                  <li>Site by <Link to='https://lbdstudios.com'>LBD Studios</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className='footer__desktop-wrapper'>
            <div className='footer__row footer__top'>
              <div className='footer__col'>
                <ul>
                  <li>
                    <Link to='tel:+61386009995'>03 8600 9995</Link><br />
                    <Link to='mailto:admin@chwyla.com.au'>admin@chwyla.com.au</Link>
                  </li>
                  <li> <Link to='https://www.google.com/maps/place/Shop+3%2F100+Hazel+Glen+Dr,+Doreen+VIC+3754/@-37.5863914,145.124883,16.97z/data=!4m5!3m4!1s0x6ad7b552a4baaaab:0x198518f585c85493!8m2!3d-37.5863547!4d145.1271942'>3/100 Hazel Glen Dr<br />Doreen 3754</Link>
                  </li>
                </ul>
              </div>
              <div className='footer__col'>
                <ul>
                  <li><Link to='/buy/'>Buy</Link></li>
                  <li><Link to='/about/'>About</Link></li>
                  <li><Link to='/lease/'>Lease</Link></li>
                  <li><Link to='/team/'>Team</Link></li>
                  <li><Link to='/sold/'>Sold</Link></li>
                  <li><Link to='/contact/'>Contact</Link></li>
                </ul>
              </div>
              <div className='footer__col'>
                <ul>
                  <li><Link to='https://www.instagram.com/chwyla_/'>Instagram</Link></li>
                  <li><Link to='https://www.linkedin.com/company/chwyla/'>LinkedIn</Link></li>
                  <li><Link to='https://www.facebook.com/CHWYLA'>Facebook</Link></li>
                </ul>
              </div>
            </div>
            <div className='footer__row footer__bottom'>
              <div className='footer__col'>
                <ul>
                  <li><Link to='/privacy-policy/'>Privacy Policy</Link></li>
                </ul>
              </div>
              <div className='footer__col'>&nbsp;</div>
              <div className='footer__col'>
                <ul>
                  <li>Site by <Link to='https://lbdstudios.com'>LBD Studios</Link></li>
                </ul>
              </div>
            </div>
            <div className='footer__row footer__desktop'>
              <p>© Chwyla {new Date().getFullYear()}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
