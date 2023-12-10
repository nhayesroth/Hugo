import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationData } from 'types';
import { Routes } from 'utils';

/**
 * Hook that retrieves a specified insurance application's data by ID.
 */
export function useFetchApplication({ id }: { id: String | undefined }): { applicationData?: ApplicationData } {
  const [applicationData, setApplicationData] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetch(`/application/${id}`)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          console.log(`Server responded with an error ${JSON.stringify(response)}`);
          console.log(`Redirecting to index...`);
          navigate(Routes.index);
          return;
        }
        setApplicationData(response.application);
        console.log("Set applicationData to: " + JSON.stringify(response.application));
      })
      .catch((error) => console.error('Error fetching application data:', error));
    // TODO: eslint complains about me not including dependencies here. i'm unsure if it's actually
    // a problem and/or the right way to run this hook once
  }, []);

  return { applicationData };
}