import React, { useState } from 'react';
import axios from 'axios';
import './popup.css';


const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function Popup({ onClose }) {
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);

  const handleAddSchema = () => {
    if (selectedSchema) {
      setSchemas([...schemas, selectedSchema]);
      setAvailableOptions(availableOptions.filter(option => option.value !== selectedSchema));
      setSelectedSchema('');
    }
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.map(schema => {
        const option = schemaOptions.find(opt => opt.value === schema);
        return { [schema]: option.label };
      }),
    };

    try {
      const response = await axios.post('https://webhook.site/5a6e6a5e-f049-4057-9c01-8d706761ded5', data);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Error saving segment:', error);
    }
  };

  return (
    <div className="popup">
      <h3>Saving Segment</h3>
      <label>
        Enter the Name of the Segment:
        <input
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
      </label>
      <div className="schema-selection">
        {schemas.map((schema, index) => (
          <div key={index}>
            <select
              value={schema}
              onChange={(e) => {
                const newSchemas = [...schemas];
                newSchemas[index] = e.target.value;
                setSchemas(newSchemas);
              }}
            >
              {availableOptions.concat(
                schemaOptions.filter(option => option.value === schema)
              ).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div>
        <select
          value={selectedSchema}
          onChange={(e) => setSelectedSchema(e.target.value)}
        >
          <option value="" disabled>
            Add schema to segment
          </option>
          {availableOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button onClick={handleAddSchema}>+Add new schema</button>
      </div>
      <button onClick={handleSaveSegment}>Save the Segment</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default Popup;
