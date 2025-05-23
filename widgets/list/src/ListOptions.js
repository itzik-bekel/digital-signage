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
      tables: [
        ...prev.tables,
        {
          title: '',
          columnTitles: {
            apt: 'דירה מס׳',
            name: 'שם',
            missing: 'חודשים חסרים'
          },
          people: []
        }
      ]
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
        const existingApts = tables[tableIdx].people.map(p => parseInt(p.apt));
        let newApt = 1;
        while (existingApts.includes(newApt)) {
          newApt++;
        }
        tables[tableIdx].people.push({
          apt: newApt,
          name: '',
          missing: ''
        })
        // Sort people by apartment number
        tables[tableIdx].people.sort((a, b) => parseInt(a.apt) - parseInt(b.apt));
      }
      return { ...prev, tables }
    })
    return Promise.resolve()
  }

  const validateAptNumber = (tableIdx, personIdx, value) => {
    const aptNum = parseInt(value);
    if (isNaN(aptNum) || aptNum < 1) return false;
    
    const existingApts = data.tables[tableIdx].people
      .filter((_, idx) => idx !== personIdx)
      .map(p => parseInt(p.apt));
    
    return !existingApts.includes(aptNum);
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
        <InlineInputGroup
          children={[
            <Input
              key="bg-color"
              label="Background Color"
              type="color"
              value={data.color}
              onChange={(name, value) => handleGlobalChange('color', value)}
            />,
            <Input
              key="text-color"
              label="Text Color"
              type="color"
              value={data.textColor}
              onChange={(name, value) => handleGlobalChange('textColor', value)}
            />
          ]}
        />

        {data.tables.map((table, tableIdx) => (
          <div key={`table-${tableIdx}`} className="table-editor">
            <InlineInputGroup
              children={[
                <Input
                  key="title"
                  label={`Table ${tableIdx + 1} Title`}
                  value={table.title}
                  onChange={(name, value) => handleTableChange(tableIdx, 'title', value)}
                />
              ]}
            />
            <InlineInputGroup
              children={[
                <Input
                  key="apt"
                  label="Apt Column Title"
                  value={(table.columnTitles && table.columnTitles.apt) || 'דירה מס׳'}
                  onChange={(name, value) =>
                    handleTableChange(tableIdx, 'columnTitles', {
                      ...table.columnTitles,
                      apt: value
                    })}
                />,
                <Input
                  key="name"
                  label="Name Column Title"
                  value={(table.columnTitles && table.columnTitles.name) || 'שם'}
                  onChange={(name, value) =>
                    handleTableChange(tableIdx, 'columnTitles', {
                      ...table.columnTitles,
                      name: value
                    })}
                />,
                <Input
                  key="missing"
                  label="Status Column Title"
                  value={(table.columnTitles && table.columnTitles.missing) || 'חודשים חסרים'}
                  onChange={(name, value) =>
                    handleTableChange(tableIdx, 'columnTitles', {
                      ...table.columnTitles,
                      missing: value
                    })}
                />
              ]}
            />
            <InlineInputGroup
              children={[
                <Button
                  key="delete"
                  color="#e74c3c"
                  text="Delete Table"
                  onClick={() => deleteTable(tableIdx)}
                />
              ]}
            />

            {table.people.map((person, personIdx) => (
              <InlineInputGroup
                key={`person-${personIdx}`}
              children={[
                <Input
                  key="apt"
                  label="Apt №"
                  type="number"
                  min="1"
                  value={person.apt}
                  onChange={(name, value) => {
                    if (validateAptNumber(tableIdx, personIdx, value)) {
                      handlePersonChange(tableIdx, personIdx, 'apt', value);
                      // Re-sort after apartment number change
                      setData(prev => {
                        const tables = [...prev.tables];
                        tables[tableIdx].people.sort((a, b) => parseInt(a.apt) - parseInt(b.apt));
                        return { ...prev, tables };
                      });
                    }
                  }}
                />,
                <Input
                  key="name"
                  label="Name"
                  value={person.name}
                  onChange={(name, value) => handlePersonChange(tableIdx, personIdx, 'name', value)}
                />,
                  <Input
                    key="missing"
                    label="Missing Months"
                    value={person.missing}
                    onChange={(name, value) => handlePersonChange(tableIdx, personIdx, 'missing', value)}
                  />,
                  <FontAwesomeIcon
                    key="delete"
                    icon={faTrash}
                    color="#e74c3c"
                    onClick={() => deletePerson(tableIdx, personIdx)}
                  />
                ]}
              />
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
