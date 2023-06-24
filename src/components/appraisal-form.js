import React, { Component } from 'react'
import { Icon } from './icons'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

class AppraisalForm extends Component {

  state = {
    result: '',
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (!this.refs.form.checkValidity()) return false

    fetch("https://hooks.zapier.com/hooks/catch/2181815/bnvnlzj/", {
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

    const { id } = this.props

    let props = {
      ref: 'form',
      name: 'appraisal',
      className: 'form',
      onSubmit: this.handleSubmit,
    }

    if (this.state.result === 'success')
      return (
        <div className='contact__success'>
          <Icon color='#242424' />
          <h4>Thank you</h4>
          <p>We’ll be in touch with you shortly.</p>
        </div>
      )

    return (
      <form {...props}>
        <h4>Request an Appraisal</h4>
        <div className='form__row'>
          <label>Type of apprasial required</label>
          <div className='form__radios'>
            <div className='form__radio'>
              <input id={`${id}_sales_appraisal`} type='radio' name="appraisal_type" onChange={this.handleChange} value="Sales Appraisal" />
              <label htmlFor={`${id}_sales_appraisal`}>Sales Appraisal</label>
            </div>
            <div className='form__radio'>
              <input id={`${id}_rental_appraisal`} type='radio' name="appraisal_type" onChange={this.handleChange} value="Rental Appraisal" />
              <label htmlFor={`${id}_rental_appraisal`}>Rental Appraisal</label>
            </div>
          </div>
        </div>
        <div className='form__row form__row--double'>
          <div className='form__column'>
            <label htmlFor={`${id}_first-name-field`}>First Name</label>
            <input className='form__input' type='text' name='firstname' id={`${id}_first-name-field`} placeholder='-' onChange={this.handleChange} required />
          </div>
          <div className='form__column'>
            <label htmlFor={`${id}_last-name-field`}>Last Name</label>
            <input className='form__input' type='text' name='lastname' id={`${id}_last-name-field`} placeholder='-' onChange={this.handleChange} required />
          </div>
        </div>
        <div className='form__row'>
          <label htmlFor={`${id}_email-field`}>Contact Email</label>
          <input className='form__input' type='email' name='email' id={`${id}_email-field`} placeholder='-' onChange={this.handleChange} required  />
        </div>
        <div className='form__row'>
          <label htmlFor={`${id}_phone-field`}>Contact Number</label>
          <input className='form__input' type='text' name='mobile' id={`${id}_phone-field`} placeholder='-' onChange={this.handleChange} required  />
        </div>
        <div className='form__row'>
          <label htmlFor={`${id}_addres-field`}>Enter address of property to be appraised</label>
          <input type='text' name='address' id={`${id}_address-field`} placeholder='-' onChange={this.handleChange} required />
        </div>
        <div className='form__row'>
          <label htmlFor={`${id}_message`}>Additional Comments (optional)</label>
          <textarea className='form__input form__textarea' id={`${id}_message`} name='message' placeholder='-' onChange={this.handleChange} />
        </div>
        <div className='form__row form__row--submit'>
          <button type='submit' className='btn btn--border'>Request Appraisal</button>
        </div>
      </form>
    )
  }
}

export default AppraisalForm