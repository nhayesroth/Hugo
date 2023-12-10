import { Application } from "../Types/Application";

/**
 * Validates basic application data format. Does not check for completeness, since we
 * allow saving of incomplete applications.
 */
export function isApplicationValid(application: Application): boolean {
  // TODO: perform other validation requirements
  return (
    (application.dob.trim() == '' || isValidDateOfBirth(application.dob))
    && areVehiclesValid(application)
  );
}

function isValidDateOfBirth(dob: string): boolean {
  throw new Error("Function not implemented.");
}

function areVehiclesValid(application: Application): boolean {
  throw new Error("Function not implemented.");
}

