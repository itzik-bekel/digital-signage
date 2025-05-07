import React from 'react'
import { Form, Input } from '../../../components/Form'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

const ColorPickerInput = ({ label, color, onChange }) => {
  const [displayPicker, setDisplayPicker] = React.useState(false)
  
  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '36px',
        borderRadius: '2px',
        background: color
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }
  })

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label>
      <div style={styles.swatch} onClick={() => setDisplayPicker(true)}>
        <div style={styles.color} />
      </div>
      {displayPicker && (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={() => setDisplayPicker(false)} />
          <SketchPicker color={color} onChange={(color) => onChange(color.hex)} />
        </div>
      )}
    </div>
  )
}

const RssOptions = ({ data = {}, onChange = () => {} }) => {
  const {
    updateInterval = 300000,
    itemsToShow = 5,
    textColor = '#ffffff',
    backgroundColor = '#2d3436',
    fontSize = 16
  } = data

  return (
    <Form>
      <Input
        type="number"
        label="Update Interval (ms)"
        value={updateInterval}
        onChange={value => onChange({ ...data, updateInterval: parseInt(value) })}
      />
      <Input
        type="number"
        label="Number of Items to Show"
        value={itemsToShow}
        onChange={value => onChange({ ...data, itemsToShow: parseInt(value) })}
      />
      <Input
        type="number"
        label="Font Size (px)"
        value={fontSize}
        onChange={value => onChange({ ...data, fontSize: parseInt(value) })}
      />
      <ColorPickerInput
        label="Text Color"
        color={textColor}
        onChange={color => onChange({ ...data, textColor: color })}
      />
      <ColorPickerInput
        label="Background Color"
        color={backgroundColor}
        onChange={color => onChange({ ...data, backgroundColor: color })}
      />
    </Form>
  )
}

export default RssOptions
