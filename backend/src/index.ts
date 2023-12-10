// Backend code structure (simplified)
import { create, get, submit, update } from './applications/apiHandlers';
import { app, db } from './common';

// POST route to start a new insurance application
app.post('/application', create);
app.get('/application/:id', get);
app.put('/application/:id', update);
app.post('/submit/:id', submit);

// Start the server
const PORT = 3001; // You can use any available port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { db };
