// Define types for the insurance application
export interface Application {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  vehicleCount: number;
  vin: string;
  year: number;
  make: string;
  model: string;
}