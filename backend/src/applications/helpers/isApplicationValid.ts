import { Application } from "../Types/Application";

/**
 * Validates basic application data format. Does not check for completeness, since we
 * allow saving of incomplete applications.
 */
export function isApplicationValid(application: Application): boolean {
  // TODO: perform other validation requirements
  return (
    (application.dob.trim() == '' || isValidDateOfBirth(application.dob))
  );
}

function isValidDateOfBirth(dob: string): boolean {
  const date = new Date(dob);
  const currentDate = new Date();
  const minAgeDate = new Date();
  minAgeDate.setFullYear(currentDate.getFullYear() - 16);

  return date <= minAgeDate;
}

