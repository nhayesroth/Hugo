import { Request, Response } from 'express';
import { db } from '../../common';
import { Application } from '../Types/Application';
import { isApplicationValid } from '../helpers/isApplicationValid';

/**
 * Handles API requests to create a new {@link InsuranceApplication}.
 * 
 * Validates the request parameters, persists the application, and returns a response 
 * with the url to view/modify the resulting object.
 */
export function create(req: Request, res: Response) {
  console.log(`\nCREATE - request received:  ${JSON.stringify(req.body)}`);

  // Handle request data and insert into the database
  const newApplication: Application = req.body;

  // Check if req.body has the expected structure
  if (!isApplicationValid(newApplication)) {
    console.log(`CREATE - ERROR - application is not valid: ${JSON.stringify(req.body)}`);
    return res.status(400).json({ error: 'Invalid application data', reason: "foobar" });
  }

  // Insert data into the database
  db.run(
    `INSERT INTO InsuranceApplication 
    (firstName, lastName, dob, street, city, state, zipCode, vehicleCount, vin, year, make, model) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newApplication.firstName,
      newApplication.lastName,
      newApplication.dob,
      newApplication.street,
      newApplication.city,
      newApplication.state,
      newApplication.zipCode,
      newApplication.vehicleCount,
      newApplication.vin,
      newApplication.year,
      newApplication.make,
      newApplication.model,
    ],
    function (error) {
      if (error) {
        console.log(`CREATE - ERROR - failed to persist application due to ${error}: ${JSON.stringify(req.body)}`);
        return res.status(500).json({ error: 'Failed to insert application into the database' });
      }

      // Use the lastID generated from the insertion for the resume route
      const id = this.lastID;
      console.log(`CREATE - successfully created application ${id}: ${JSON.stringify({ id, ...req.body })}`);

      // Return a  route pointing to the frontend URL with the new application ID
      res.json({
        message: "Application saved successfully",
        application: { id }
      });
    }
  );
}