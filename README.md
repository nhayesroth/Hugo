# Hugo

### Summary
Simple server and client applications allowing users to create, save, and price insurance applications.
- Backend is Node
- Frontend is React
- Both use TypeScript (with pretty loose enforcement based on my unfamiliarity)
- Persistence is in-memory
- Field validation is very limited

### Instructions to run
Start the backend server on port 3001
```
Hugo/backend $ npx ts-node src/index.ts
```

Start the frontend:
```
Hugo/frontend $ npm start
```

### Next steps (if I were doing this for real)

#### General
- Nothing is tested. So, add tests for all the things.
- Share code between backend and frontend where possible (rather than duplicating e.g. ApplicationData and getErrors).
- Delete a bunch of auto-generated code/files that I suspect are not needed.
- More consistent organization. I started assuming I'd have more than 1 feature. So, the backend code is organized into an `applications` feature folder, but the frontend isn't. It should be consistent.
- Get a better linter that enforces consistent styles.

#### Backend
- Consider extracting a DB layer/interface beyond the backend API handlers. I wanted to persist the request at submission time, but the current scheme didn't allow it. So, I had to add that client-side. Not ideal.
- Consider moving vehicles to their own table. I included them as columns on the Application table for simplicity. In real life, I'd probably introduce a separate table and join the two as necessary.
- Improve data validation and API behavior when we encounter errors.

#### Frontend
- Improve the multi-vehicle approach (e.g. use Application.vehicles as opposed to 12 fields for 3 vehicles).
- Simplify ApplicationForm. There's too much going on in there.
- Address some warnings re: react hooks and controlled vs. uncontrolled input components.