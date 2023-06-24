import React from "react"
import Link from '../utils/link'

import Seo from "../components/seo"

const NotFoundPage = () => (
  <>
    <Seo bodyClass='page-template--error' title="404: Not found" />
    <section className='basic-page'>
    	<div className='basic-page__inner'>
    		<div className='basic-page__content'>
			    <h1>404 Error</h1>
			    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
			    <Link to='/' className='btn btn-black'>Back home</Link>
			  </div>
		  </div>
		</section>
  </>
)

export default NotFoundPage
