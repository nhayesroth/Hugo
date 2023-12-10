import { ApplicationData, FieldError } from 'types';

/**
 * Returns a list of FieldErrors for the provided application.
 */
export function getErrors(applicationData: ApplicationData): FieldError[] {
    const errors: FieldError[] = [];
    if (applicationData.firstName.trim() === '') {
        errors.push({ name: 'firstName', error: 'First Name is required' });
    }

    if (applicationData.lastName.trim() === '') {
        errors.push({ name: 'lastName', error: 'Last Name is required' });
    }

    if (!isValidDateOfBirth(applicationData.dob)) {
        errors.push({ name: 'dob', error: `Date of Birth is required and must be before ${new Date().getFullYear() - 16}` });
    }

    if (applicationData.street.trim() === '') {
        errors.push({ name: 'street', error: 'Street is required' });
    }

    if (applicationData.city.trim() === '') {
        errors.push({ name: 'city', error: 'City is required' });
    }

    if (applicationData.state.trim() === '') {
        errors.push({ name: 'state', error: 'State is required' });
    }

    // Zip not validated b/c its numeric requirement is type-enforced.
    if (applicationData.vin.trim() === '') {
        errors.push({ name: 'vin', error: 'Vehicle VIN is required' });
    }

    if (!isValidVehicleYear(applicationData.year)) {
        errors.push({ name: 'year', error: `Vehicle year must be between 1985 and ${new Date().getFullYear() + 1}` });
    }

    if (applicationData.make.trim() === '') {
        errors.push({ name: 'make', error: 'Vehicle make is required' });
    }

    if (applicationData.model.trim() === '') {
        errors.push({ name: 'model', error: 'Vehicle model is required' });
    }

    return errors;
}

function isValidDateOfBirth(dateString: string): boolean {
    const date = new Date(dateString);
    const currentDate = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(currentDate.getFullYear() - 16);

    return date <= minAgeDate;
}

function isValidZipCode(zipCode: string): boolean {
    const regExp = /^\d+$/;
    return regExp.test(zipCode);
}

function isValidVehicleYear(year: number) {
    return 1985 <= year
        && year <= (new Date().getFullYear() + 1);
}
