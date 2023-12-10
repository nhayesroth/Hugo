import axios from 'axios';
import { useFetchApplication } from 'hooks/useFetchApplicationData';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationForm } from './ApplicationForm';

/**
 * Component that renders an in-progress application. Fetches data from out backend based on the
 * URL's ID. Saving the form will update the same application, rather than creating a new one.
 * 
 * Will redirect to index if the specified application cannot be found.
 */
export function ApplicationInProgress(): JSX.Element {
  const { id } = useParams();
  const { applicationData } = useFetchApplication({ id });

  async function updateApplication(formData: any) {
    return await axios.put(`http://localhost:3001/application/${id}`, formData);
  }

  return (
    <React.Fragment>
      <h1>Welcome back to application {id}</h1>
      <ApplicationForm applicationData={applicationData} onSave={updateApplication} />
    </React.Fragment>
  );
}