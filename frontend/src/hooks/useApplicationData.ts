import { SetStateAction, useEffect, useState } from 'react';
import { ApplicationData } from 'types';
import { defaultApplicationData } from 'utils';

interface Params {
  applicationData?: ApplicationData,
}

/**
 * Hook that manages insurance application data for new and/or in-progress applications. Will parse IDs from the URL and attempt
 * to retrieve data as necessary.
 */
export function useApplicationData(
  { applicationData }: Params): {
    formData: ApplicationData,
    setFormData: React.Dispatch<SetStateAction<ApplicationData>>
  } {

  const [formData, setFormData] = useState(
    {
      ...applicationData,
      ...defaultApplicationData(),
    });

  // Update formData as the user modifies the form.
  useEffect(() => {
    if (applicationData) setFormData(applicationData);
  }, [applicationData]);

  return { formData, setFormData };
}