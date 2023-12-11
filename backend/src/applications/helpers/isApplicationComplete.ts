import { Application } from "../Types/Application";
import { isApplicationValid } from "./isApplicationValid";

export function isApplicationComplete(application: Application) {
    return isApplicationValid(application)
        && application.dob.trim() !== ''
        && areVehiclesValid(application);
}

function areVehiclesValid(application: Application): boolean {
    const errors: Object[] = [];
    errors.push(...validateVehicle(application.vin1, application.year1, application.make1, application.model1, 1));
    if (application?.vin2 || application?.year2 || application?.make2 || application?.model2) {
        errors.push(...validateVehicle(application.vin2, application.year2, application.make2, application.model2, 2));
    }
    if (application?.vin3 || application?.year3 || application?.make3 || application?.model3) {
        errors.push(...validateVehicle(application.vin3, application.year3, application.make3, application.model3, 3));
    }
    return errors.length === 0;
}

function validateVehicle(vin?: string, year?: number, make?: string, model?: string, i?: number): Object[] {
    const errors: Object[] = [];

    if (vin?.trim() === '') {
        errors.push({ name: `vehicle${i}.vin`, error: `Vehicle VIN is required` });
    }
    if (!isValidVehicleYear(year || 0)) {
        errors.push({ name: `vehicle${i}.year`, error: `Vehicle year must be between 1985 and ${new Date().getFullYear() + 1}` });
    }
    if (make?.trim() === '') {
        errors.push({ name: `vehicle${i}.make`, error: `Vehicle make is required` });
    }
    if (model?.trim() === '') {
        errors.push({ name: `vehicle${i}.model`, error: `Vehicle model is required` });
    }

    return errors;
}

function isValidVehicleYear(year: number) {
    return 1985 <= year
        && year <= (new Date().getFullYear() + 1);
}
