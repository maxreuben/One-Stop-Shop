# E-Commerce-Website

## Quickstart

1. Install node following instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Install git cli [here](https://git-scm.com/downloads)
3. Log into [CockroachDB](https://cockroachlabs.cloud/login) (I used GitHub to log in)
4. Create a free database and add the CA certificate as per their instructions
5. Once you get to the connect stage, copy the "General Connection String" and save it
6. Choose a directory in command prompt or Powershell
7. Run the following commands
   ```bash
   git clone https://github.com/srikrishnakaashyap/E-Commerce-Website
   cd E-Commerce-Website
   git branch working
   npm install
   ```
8. Create a `.env` file in the root directory of E-Commerce-Website that looks like this:
    ```dotenv
    COCKROACH_DB=<Connection String from Step 5>
    SESSION_SECRET=e7050b24044fdcc300d40f52706accad35b052ca # this is a random string, you can regenerate it if you want
    ```
9. Run `node ./index.js` from the root of the project
10. Visit http://localhost:8001/signup from your browser