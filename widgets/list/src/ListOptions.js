import React, { useState, useEffect } from 'react'
import { Form, Input, Button, InlineInputGroup } from '../../../components/Form'
import ListContent from './ListContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const MAX_COLS = 34

const ListOptions = ({ data: initialData = {}, onChange = () => {} }) => {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    onChange(data)
  }, [data])

  const handleGlobalChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleTableChange = (tableIdx, field, value) => {
    setData(prev => {
      const tables = [...prev.tables]
      tables[tableIdx][field] = value
      return { ...prev, tables }
    })
  }

  const handlePersonChange = (tableIdx, personIdx, field, value) => {
    setData(prev => {
      const tables = [...prev.tables]
      tables[tableIdx].people[personIdx][field] = value
      return { ...prev, tables }
    })
  }

  const addTable = () => {
    setData(prev => ({
      ...prev,
      tables: [...prev.tables, { title: '', people: [] }]
    }))
    return Promise.resolve()
  }

  const deleteTable = idx => {
    setData(prev => ({
      ...prev,
      tables: prev.tables.filter((_, i) => i !== idx)
    }))
    return Promise.resolve()
  }

  const addPerson = tableIdx => {
    setData(prev => {
      const tables = [...prev.tables]
      if (tables[tableIdx].people.length < MAX_COLS) {
        tables[tableIdx].people.push({
          apt: tables[tableIdx].people.length + 1,
          name: '',
          missing: ''
        })
      }
      return { ...prev, tables }
    })
    return Promise.resolve()
  }

  const deletePerson = (tableIdx, personIdx) => {
    setData(prev => {
      const tables = [...prev.tables]
      tables[tableIdx].people = tables[tableIdx].people.filter((_, i) => i !== personIdx)
      return { ...prev, tables }
    })
    return Promise.resolve()
  }

  return (
    <div className="container">
      <Form>
        <h3>List Widget Options</h3>
        <Input
          label="Rotation Seconds"
          type="number"
          min={0}
          max={60}
          value={data.rotationSec}
          onChange={(name, value) => handleGlobalChange('rotationSec', parseInt(value, 10))}
        />
        <InlineInputGroup>
          <Input
            label="Background Color"
            type="color"
            value={data.color}
            onChange={(name, value) => handleGlobalChange('color', value)}
          />
          <Input
            label="Text Color"
            type="color"
            value={data.textColor}
            onChange={(name, value) => handleGlobalChange('textColor', value)}
          />
        </InlineInputGroup>

        {data.tables.map((table, tableIdx) => (
          <div key={`table-${tableIdx}`} className="table-editor">
            <InlineInputGroup>
              <Input
                label={`Table ${tableIdx + 1} Title`}
                value={table.title}
                onChange={(name, value) => handleTableChange(tableIdx, 'title', value)}
              />
              <Button
                color="#e74c3c"
                text="Delete Table"
                onClick={() => deleteTable(tableIdx)}
              />
            </InlineInputGroup>

            {table.people.map((person, personIdx) => (
              <InlineInputGroup key={`person-${personIdx}`}>
                <Input
                  label={`Apt ${person.apt} Name`}
                  value={person.name}
                  onChange={(name, value) => handlePersonChange(tableIdx, personIdx, 'name', value)}
                />
                <Input
                  label="Missing Months"
                  value={person.missing}
                  onChange={(name, value) => handlePersonChange(tableIdx, personIdx, 'missing', value)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  color="#e74c3c"
                  onClick={() => deletePerson(tableIdx, personIdx)}
                />
              </InlineInputGroup>
            ))}

            {table.people.length < MAX_COLS && (
              <Button
                color="#2ecc71"
                text="+ Add Person"
                onClick={() => addPerson(tableIdx)}
              />
            )}
          </div>
        ))}

        <Button color="#3498db" text="+ Add Table" onClick={addTable} />
      </Form>

      <div className="previewContainer">
        <p>Preview</p>
        <div className="preview">
          <ListContent data={data} />
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
        }
        .previewContainer {
          margin-left: 16px;
          width: 240px;
        }
        .preview {
          width: 240px;
          height: 240px;
          overflow: hidden;
          border-radius: 6px;
        }
        .table-editor {
          margin-top: 16px;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
      `}</style>
    </div>
  )
}

export default ListOptions
