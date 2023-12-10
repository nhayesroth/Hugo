import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationData } from 'types';
import { getApplicationRoute } from 'utils';
import { ApplicationForm } from './ApplicationForm';

/**
 * Component that represents a brand new insurance application.
 * 
 * Performs no data fetching, populates default values in the form, and will
 * create a new application on submit.
 */
export function NewApplication(): JSX.Element {
  const navigate = useNavigate();

  async function createNewApplicationAndRedirect(formData: ApplicationData) {
    const response = await axios.post('http://localhost:3001/application', formData);
    console.log("Create application response: " + JSON.stringify(response));
    const route = getApplicationRoute(response?.data?.application?.id);
    console.log(`Redirecting to newly created application ${route}. Response: ${JSON.stringify({ response })}`)
    navigate(route);
  }

  return (
    <React.Fragment>
      <h1>Start a new application</h1>
      <ApplicationForm onSave={createNewApplicationAndRedirect} />
    </React.Fragment>
  );
}