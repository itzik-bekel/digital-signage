import React, { Component } from 'react'
import { Form, Input } from '../../../components/Form'

class WeatherOptions extends Component {
  constructor(props) {
    super(props)
    const { unit = 'metric' } = props.data || {}
    this.state = {
      unit
    }
  }
  handleChange = (name, value) => {
    const { onChange = () => {} } = this.props
    this.setState(
      {
        [name]: value
      },
      () => {
        onChange(this.state)
      }
    )
  }

  render() {
    const { unit } = this.state
    return (
      <Form>
        <h3>Widget: Weather</h3>
        <p>5-day weather forecast for Rishon Letzion, Israel</p>
        <Input
          inline={false}
          label={'Temperature Unit'}
          type={'select'}
          name={'unit'}
          value={unit}
          choices={[{ id: 'metric', label: 'Celsius' }, { id: 'imperial', label: 'Fahrenheit' }]}
          onChange={this.handleChange}
        />
        <style jsx>
          {`
            h3,
            p {
              font-family: 'Open Sans', sans-serif;
            }
          `}
        </style>
      </Form>
    )
  }
}

export default WeatherOptions
