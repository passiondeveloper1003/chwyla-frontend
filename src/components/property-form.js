import React, { Component } from 'react'
import { Icon } from './icons'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

class PropertyForm extends Component {


  constructor(props) {
    super(props)
    this.form = React.createRef()

    this.state = {
      result: '',
      listing_id: this.props.property,
      agent_email: this.props.agent_emails,
    }

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (!this.refs.form.checkValidity()) return false

    fetch("https://hooks.zapier.com/hooks/catch/2181815/bnv710t/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": this.refs.form.getAttribute("name"),
        ...this.state
      })
    })
    .then(() => {
      this.setState({result: 'success', msg: ''})
    })
    .catch(error => this.setState({result: 'fail', msg: error}))
  }

  render() {
    let props = {
      ref: 'form',
      name: 'property',
      className: 'form',
      onSubmit: this.handleSubmit,
    }

    if (this.state.result === 'success')
      return (
        <div className='contact__success'>
          <Icon color='#FFFFFF' />
          <h4>Thanks for getting in touch with Chwyla.</h4>
          <p>We’ll be in touch with you shortly.</p>
        </div>
      )

    return (
      <form {...props}>
        <div className='form__row form__row--double'>
          <div className='form__column'>
            <label htmlFor='first-name-field'>First Name</label>
            <input className='form__input' type='text' name='firstname' id='first-name-field' onChange={this.handleChange} required />
          </div>
          <div className='form__column'>
            <label htmlFor="last-name-field">Last Name</label>
            <input className='form__input' type='text' name='lastname' id='last-name-field' onChange={this.handleChange} required />
          </div>
        </div>
        <div className='form__row'>
          <label htmlFor='email-field'>Contact Email</label>
          <input className='form__input' type='email' name='email' id='email-field' onChange={this.handleChange} required  />
        </div>
        <div className='form__row'>
          <label htmlFor='phone-field'>Contact Number</label>
          <input className='form__input' type='text' name='mobile' id='phone-field' onChange={this.handleChange} required  />
        </div>
        <div className='form__row'>
          <label htmlFor='message'>Your Message (optional)</label>
          <textarea className='form__input form__textarea' id="message" name='message' placeholder='-' onChange={this.handleChange} />
        </div>
        <div className='form__row form__row--submit'>
          <button type='submit' className='btn btn--border'>Submit</button>
        </div>
      </form>
    )
  }
}

export default PropertyForm
