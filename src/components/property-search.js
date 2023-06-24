import React, { Component } from 'react'
import Select from 'react-select'
import { Search } from './icons'

const rentRange = [
  { label: "Show all", value_min: 0, value_max: 100000 },
  { label: "$100 - $200", value_min: 100, value_max: 200 },
  { label: "$200 - $300", value_min: 200, value_max: 300 },
  { label: "$300 - $400", value_min: 300, value_max: 400 },
  { label: "$400 - $500", value_min: 400, value_max: 500 },
  { label: "$500 - $600", value_min: 500, value_max: 600 },
  { label: "$600 - $700", value_min: 600, value_max: 700 },
  { label: "$700 - $800", value_min: 700, value_max: 800 },
  { label: "$800 - $900", value_min: 800, value_max: 900 },
  { label: "$900 - $1000", value_min: 900, value_max: 1000 },
  { label: "$1000+", value_min: 1000, value_max: 100000 },
]

const buyRange = [
  { label: "Show all", value_min: 0, value_max: 100000000 },
  { label: "Less than $500k", value_min: 0, value_max: 500000 },
  { label: "500k - $900k", value_min: 500000, value_max: 900000 },
  { label: "$900k - $1.5m", value_min: 900000, value_max: 1500000 },
  { label: "$1.5m - $2.5m", value_min: 1500000, value_max: 2500000 },
  { label: "$2.5m - $3.5m", value_min: 2500000, value_max: 3500000 },
  { label: "$3.5m - $4.5m", value_min: 3500000, value_max: 4500000 },
  { label: "$4.5m - $5.5m", value_min: 4500000, value_max: 5500000 },
  { label: "$5.5m - $6.5m", value_min: 5500000, value_max: 6500000},
  { label: "$6.5m - $7.5m", value_min: 6500000, value_max: 7500000},
  { label: "$7.5m - $8.5m", value_min: 7500000, value_max: 8500000},
  { label: "$8.5m - $10m+", value_min: 8500000, value_max: 100000000},
]

const bedroomList = [
  { label: "Show all", value: null},
  { label: "1 Bedroom", value: 1},
  { label: "2 Bedrooms", value: 2},
  { label: "3 Bedrooms", value: 3},
  { label: "4 Bedrooms", value: 4},
  { label: "5+ Bedrooms", value: 5},
]

class SearchForm extends Component {

  state = {
    search: '',
    suburb: null,
    bedrooms: null,
    price_range: null,
  }

  handleSelectChange = (option, field) => {
    let state = {}
    switch (field?.action) {
      case 'select-option':
        state[field.name] = option?.value === null ? '' : option
        this.setState(state, this.updateList)
        break
      default:
        let { name, value } = option.currentTarget
        state[name] = value
        this.setState(state, this.updateList)
        break
    }
  }

  updateList = () => {
    const { list, set, type } = this.props
    const { search, bedrooms, price_range, suburb } = this.state

    let results = {}

    if (list) {
      results = list.filter((el, i) => {
        const { title, propertyData, propertyListing, propertyAddress } = el
        if (bedrooms) {
          if (bedrooms.value === 5 && (parseInt(propertyData.bedrooms) || 0) < 5) return false
          else if ((parseInt(propertyData.bedrooms) || 0) !== bedrooms.value) return false
        }
        if (price_range && parseInt(propertyListing.searchPrice) < price_range.value_min) return false
        if (price_range && parseInt(propertyListing.searchPrice) > price_range.value_max) return false
        if (suburb?.value && suburb.value !== propertyAddress.suburb) return false
        if (search && title.replace(/,/g, '').toLowerCase().indexOf(search) === -1 ) return false
        
        return true
      })
    }
    set(results)
  }

  render() {
    let { suburb, bedrooms, price_range } = this.state
    let { type, suburbs } = this.props
    let suburbsList = [{ label: "Show all", value: null }]

    suburbs?.map((el, i) => {
      suburbsList.push({
        label: el,
        value: el,
      })
      return true
    })
    
    return (
      <section className='search'>
        <div className="search__inner">
          <form className='search__form form'>
            <div className="form__row--search">
              <input className="form__input" type="text" name="search" value={this.state.search} placeholder='Keyword Search' onChange={this.handleSelectChange} />
              <button type='submit'>
                <Search color='#21242F' />
              </button>
            </div>
            <div className="form__row form__row--dropdowns">
              <div className='form__select'>
                <Select
                  options={bedroomList}
                  onChange={this.handleSelectChange}
                  openMenuOnFocus={true}
                  id="bedrooms"
                  name="bedrooms"
                  value={bedrooms}
                  placeholder="Bedrooms"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  ref={node => this.bedrooms = node}
                />
              </div>
              <div className='form__select'>
                <Select
                  options={type === 'lease' ? rentRange : buyRange}
                  onChange={this.handleSelectChange}
                  openMenuOnFocus={true}
                  id="price-range"
                  name="price_range"
                  value={price_range}
                  placeholder="Price Range"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  ref={node => this.price_range = node}
                />
              </div>
              { suburbsList && suburbsList.length > 0 &&
                <div className='form__select'>
                  <Select
                    options={suburbsList}
                    onChange={this.handleSelectChange}
                    openMenuOnFocus={true}
                    id="suburb"
                    name="suburb"
                    value={suburb}
                    placeholder="Location"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    ref={node => this.location = node}
                  />
                </div>
              }
            </div>
          </form>
        </div>
      </section>
    )
  }
}

SearchForm.defaultProps = {
  list: [],
  set: () => {},
  type: 'Find',
  suburbs: [],
}

export default SearchForm