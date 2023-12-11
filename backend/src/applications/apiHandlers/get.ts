import { Request, Response } from 'express';
import { db } from '../../common';

export function get(req: Request, res: Response) {
  console.log(`\nGET - request received: ${JSON.stringify({ body: req.body, params: req.params })}`);

  const { id } = req.params;

  db.get('SELECT * FROM InsuranceApplication WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      console.log(`GET - ERROR - error retrieving application ${id}: ${err}`)
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      console.log(`GET - ERROR - application ${id} not found`)
      return res.status(404).json({ error: 'Insurance application not found' });
    }

    const response = { application: row };
    console.log(`GET - response: ${JSON.stringify(response)}`)
    res.json(response);
  });
}