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
        vin1: '',
        year1: 2000,
        make1: '',
        model1: ''
    };
}