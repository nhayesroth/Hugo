import axios from 'axios';
import { useApplicationData } from 'hooks/useApplicationData';
import _ from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationData, Field, FieldError } from 'types';
import { Routes } from 'utils';
import { getErrors } from '../utils/getErrors';
import './styles.css';

interface Props {
  onSave: (data: ApplicationData) => void;
  applicationData?: ApplicationData,
}

// Used to construct the form and track errors. Field names match ApplicationData.
const fields: Field[] = [
  { type: 'text', name: 'firstName', spanText: 'First Name', value: '' },
  { type: 'text', name: 'lastName', spanText: 'Last Name', value: '' },
  { type: 'text', name: 'dob', spanText: 'Date of Birth', value: '' },
  { type: 'text', name: 'street', spanText: 'Street', value: '' },
  { type: 'text', name: 'city', spanText: 'City', value: '' },
  { type: 'text', name: 'state', spanText: 'State', value: '' },
  { type: 'number', name: 'zipCode', spanText: 'ZipCode', value: 0 },

  { type: 'text', name: 'vin1', spanText: 'Vehicle 1 VIN', value: '' },
  { type: 'number', name: 'year1', spanText: 'Vehicle 1 Year', value: 0 },
  { type: 'text', name: 'make1', spanText: 'Vehicle 1 Make', value: '' },
  { type: 'text', name: 'model1', spanText: 'Vehicle 1 Model', value: '' },

  { type: 'text', name: 'vin2', spanText: 'Vehicle 2 VIN', value: '' },
  { type: 'number', name: 'year2', spanText: 'Vehicle 2 Year', value: 0 },
  { type: 'text', name: 'make2', spanText: 'Vehicle 2 Make', value: '' },
  { type: 'text', name: 'model2', spanText: 'Vehicle 2 Model', value: '' },

  { type: 'text', name: 'vin3', spanText: 'Vehicle 3 VIN', value: '' },
  { type: 'number', name: 'year3', spanText: 'Vehicle 3 Year', value: 0 },
  { type: 'text', name: 'make3', spanText: 'Vehicle 3 Make', value: '' },
  { type: 'text', name: 'model3', spanText: 'Vehicle 3 Model', value: '' },
];

/**
 * Base component to render the insurance application form.
 * 
 * Keeps track of errors, allows the user to save and/or submit, and/or redirect to index to start a new
 * application.
 */
export function ApplicationForm({ applicationData, onSave }: Props): JSX.Element {
  const { id } = useParams();
  const { formData, setFormData } = useApplicationData({ applicationData });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldError[]>(fields.map(field => ({ name: field.name })));
  const [hasPendingChenges, setHasPendingChanges] = useState<Boolean>(false);
  useEffect(() => {
    const currentErrors = getErrors(formData);
    if (!_.isEqual(errors, currentErrors)) {
      setErrors(currentErrors);
    }
  }, [formData, errors]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setHasPendingChanges(true);
  };

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    try {
      onSave(formData);
      setHasPendingChanges(false);
    } catch (error) {
      alert('Error encountered while saving the application: ' + error);
    }
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (errors.length !== 0) {
      alert(`Please fix all errors: ${errors.map((error) => error.error)}`);
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3001/submit/${formData.id}`, formData);
      console.log(`Successfully priced application: $${response.data.price}`);
      alert(`Your totally real and definitely not random price is $${response.data.price}`)
    } catch (error) {
      alert('Caught an error: ' + error);
    }
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleSave(event)
    }
  }

  function handleNewApplication(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    navigate(Routes.index)
  }

  function getInputClassName(name: string): string | undefined {
    return errors.some((error) => error.name === name)
      ? 'error-input'
      : '';
  }

  function canSubmit(): boolean {
    return !!id
      && errors.length === 0
      && !hasPendingChenges;
  }

  // Function to get field value based on its name
  function getFieldValue(fieldName: string): string | number {
    return String(formData[fieldName as keyof ApplicationData]) || '';
  }

  return (
    <form onSubmit={handleSave}>
      {fields.filter((field) => !field.name.startsWith("vehicle")).map((field, index) => (
        <label key={index}>
          <span>{field.spanText}:</span>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name as keyof ApplicationData]}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={getInputClassName(field.name)}
          />
        </label>
      ))}

      <div className="button-group">
        <button onClick={handleNewApplication}>New Application</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleSubmit} disabled={!canSubmit()}>Submit</button>
      </div>
    </form>
  );
}

