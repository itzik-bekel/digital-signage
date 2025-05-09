import React from 'react'
import { Form } from '../../../components/Form'

const ShabbatOptions = () => {
  return (
    <Form>
      <h3>זמני שבת</h3>
      <p>מציג זמני כניסת ויציאת שבת עבור ראשון לציון</p>
      <style jsx>{`
        h3,
        p {
          font-family: 'Open Sans', sans-serif;
          margin: 0;
          direction: rtl;
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

export default ShabbatOptions
