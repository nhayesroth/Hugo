export interface ApplicationData {
  id?: string;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;

  vin1: string;
  year1: number;
  make1: string;
  model1: string;

  vin2?: string;
  year2?: number;
  make2?: string;
  model2?: string;

  vin3?: string;
  year3?: number;
  make3?: string;
  model3?: string;
}