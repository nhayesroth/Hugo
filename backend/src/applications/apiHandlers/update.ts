import { Request, Response } from 'express';
import { db } from '../../common';

export function update(req: Request, res: Response) {
  const { id } = req.params;
  const updateFields = req.body;

  console.log(`\nUPDATE - received request for ${id}: ${JSON.stringify(updateFields)}`);

  // Update route to patch an existing insurance application by ID
  db.get('SELECT * FROM InsuranceApplication WHERE id = ?', [id], (err, row) => {

    if (err) {
      console.log(`UPDATE - ERROR when retrieving ${id}: ${err.message}`);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      console.log(`UPDATE - ERROR application ${id} not found`);
      return res.status(404).json({ error: 'Insurance application not found' });
    }

    // Construct the SQL query dynamically based on provided update fields
    const columns = Object.keys(updateFields).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(updateFields);
    const updateQuery = `UPDATE InsuranceApplication SET ${columns} WHERE id = ?`;
    const updateParams = [...values, id];

    db.run(updateQuery, updateParams, (err) => {
      if (err) {
        console.log(`UPDATE - ERROR failed to update application ${id}: ${err.message}`);
        return res.status(500).json({ error: 'Failed to update application' });
      }

      console.log(`UPDATE - successfully updated application ${id}`);
      res.json({
        message: 'Application updated successfully',
        route: `http://localhost:3000/application/${id}`
      });
    });
  });
}