import { Request, Response } from 'express';
import { db } from '../../common';
import { Application } from '../Types/Application';
import { getErrors } from '../helpers';

export function submit(req: Request, res: Response) {
  console.log(`\nSUBMIT - request received:  ${JSON.stringify(req.body)}`);
  const { id } = req.params;

  db.get('SELECT * FROM InsuranceApplication WHERE id = ?', [id], (err, application: Application) => {
    if (err) {
      console.error(err.message);
      console.log(`SUBMIT - ERROR - error retrieving application ${id}: ${err}`)
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!application) {
      console.log(`SUBMIT - ERROR - application ${id} not found`)
      return res.status(404).json({ error: 'Insurance application not found' });
    }

    const errors = getErrors(application);
    if (errors.length !== 0) {
      console.log(`SUBMIT - ERROR - application is not valid: ${JSON.stringify(errors)}`);
      return res.status(400).json({ error: 'Invalid application data', reason: errors });
    }


    // Return a random price for a valid application.
    const price = getRandomPrice();
    console.log(`\nSUBMIT - successfully priced application ${id}:  ${JSON.stringify(req.body)}`);
    res.json({ price: getRandomPrice() });
  });
}

function getRandomPrice(min: number = 500, max: number = 1500): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

