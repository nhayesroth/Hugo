import { Application, FieldError } from "../Types";

export function getErrors(application: Application): FieldError[] {
    const errors: FieldError[] = [];
    if (application.firstName.trim() === '') {
        errors.push({ field: 'firstName', error: 'First Name is required' });
    }

    if (application.lastName.trim() === '') {
        errors.push({ field: 'lastName', error: 'Last Name is required' });
    }

    if (!isValidDateOfBirth(application.dob)) {
        errors.push({ field: 'dob', error: `Date of Birth is required and must be before ${new Date().getFullYear() - 16}` });
    }

    if (application.street.trim() === '') {
        errors.push({ field: 'street', error: 'Street is required' });
    }

    if (application.city.trim() === '') {
        errors.push({ field: 'city', error: 'City is required' });
    }

    if (application.state.trim() === '') {
        errors.push({ field: 'state', error: 'State is required' });
    }

    // Vehicle 1 must be provided, the others are optional.
    errors.push(...validateVehicle(application.vin1, application.year1, application.make1, application.model1, 1));
    if (application?.vin2 || application?.year2 || application?.make2 || application?.model2) {
        errors.push(...validateVehicle(application.vin2, application.year2, application.make2, application.model2, 2));
    }
    if (application?.vin3 || application?.year3 || application?.make3 || application?.model3) {
        errors.push(...validateVehicle(application.vin3, application.year3, application.make3, application.model3, 3));
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
        errors.push({ field: `vin${i}`, error: `Vehicle VIN is required` });
    }
    if (!isValidVehicleYear(year || 0)) {
        errors.push({ field: `year${i}`, error: `Vehicle year must be between 1985 and ${new Date().getFullYear() + 1}` });
    }
    if ((make || '').trim().length === 0) {
        errors.push({ field: `make${i}`, error: `Vehicle make is required` });
    }
    if ((model || '').trim().length === 0) {
        errors.push({ field: `model${i}`, error: `Vehicle model is required` });
    }

    return errors;
}

function isValidVehicleYear(year: number) {
    return 1985 <= year
        && year <= (new Date().getFullYear() + 1);
}

