import { ApplicationData, FieldError } from 'types';

/**
 * Returns a list of FieldErrors for the provided application.
 */
export function getErrors(applicationData: ApplicationData): FieldError[] {
    const errors: FieldError[] = [];
    if (applicationData.firstName.trim().length === 0) {
        errors.push({ name: 'firstName', error: 'First Name is required' });
    }

    if (applicationData.lastName.trim().length === 0) {
        errors.push({ name: 'lastName', error: 'Last Name is required' });
    }

    if (!isValidDateOfBirth(applicationData.dob)) {
        errors.push({ name: 'dob', error: `Date of Birth is required and must be before ${new Date().getFullYear() - 16}` });
    }

    if (applicationData.street.trim().length === 0) {
        errors.push({ name: 'street', error: 'Street is required' });
    }

    if (applicationData.city.trim().length === 0) {
        errors.push({ name: 'city', error: 'City is required' });
    }

    if (applicationData.state.trim().length === 0) {
        errors.push({ name: 'state', error: 'State is required' });
    }

    // Vehicle 1 must be provided, the others are optional.
    errors.push(...validateVehicle(applicationData.vin1, applicationData.year1, applicationData.make1, applicationData.model1, 1));
    if (applicationData?.vin2 || applicationData?.year2 || applicationData?.make2 || applicationData?.model2) {
        errors.push(...validateVehicle(applicationData.vin2, applicationData.year2, applicationData.make2, applicationData.model2, 2));
    }
    if (applicationData?.vin3 || applicationData?.year3 || applicationData?.make3 || applicationData?.model3) {
        errors.push(...validateVehicle(applicationData.vin3, applicationData.year3, applicationData.make3, applicationData.model3, 3));
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

function validateVehicle(vin?: string, year?: number, make?: string, model?: string, i?: number): FieldError[] {
    const errors: FieldError[] = [];

    if ((vin || '').trim().length === 0) {
        errors.push({ name: `vin${i}`, error: `Vehicle VIN is required` });
    }
    if (!isValidVehicleYear(year || 0)) {
        errors.push({ name: `year${i}`, error: `Vehicle year must be between 1985 and ${new Date().getFullYear() + 1}` });
    }
    if ((make || '').trim().length === 0) {
        errors.push({ name: `make${i}`, error: `Vehicle make is required` });
    }
    if ((model || '').trim().length === 0) {
        errors.push({ name: `model${i}`, error: `Vehicle model is required` });
    }

    return errors;
}

function isValidVehicleYear(year: number) {
    return 1985 <= year
        && year <= (new Date().getFullYear() + 1);
}

