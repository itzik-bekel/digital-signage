import React from 'react'
import { Form } from '../../../components/Form'

const WeatherOptions = () => {
  return (
    <Form>
      <h3>Weather Widget</h3>
      <p>Displaying weather information for Rishon Lezion using weatherwidget.io</p>
      <style jsx>{`
        h3,
        p {
          font-family: 'Open Sans', sans-serif;
          margin: 0;
        }
        h3 {
          margin-bottom: 10px;
        }
        p {
          opacity: 0.8;
        }
      `}</style>
    </Form>
  )
}

export default WeatherOptions
