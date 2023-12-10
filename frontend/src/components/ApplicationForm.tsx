// InsuranceForm.tsx
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
  { type: 'text', name: 'vin', spanText: 'Vehicle VIN', value: '' },
  { type: 'number', name: 'year', spanText: 'Vehicle Year', value: 0 },
  { type: 'text', name: 'make', spanText: 'Vehicle Make', value: '' },
  { type: 'text', name: 'model', spanText: 'Vehicle Model', value: '' },
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
  useEffect(() => {
    const currentErrors = getErrors(formData);
    if (!_.isEqual(errors, currentErrors)) {
      setErrors(currentErrors);
    }
  }, [formData, errors])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    try {
      onSave(formData);
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
    return !!id && errors.length === 0;
  }

  return (
    <form onSubmit={handleSave}>
      {fields.map((field, index) => (
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

