import { ApplicationData } from 'types';


/** Returns the default data used to populate an insurance application. */
export function defaultApplicationData(): ApplicationData {
    return {
        id: undefined,
        firstName: 'John',
        lastName: 'Doe',
        dob: '',
        street: '',
        city: '',
        state: '',
        zipCode: 0,
        vehicleCount: 1,
        vin: '',
        year: 2000,
        make: '',
        model: '',
    };
}
