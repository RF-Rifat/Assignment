# Assignment-2

This is a Node.js application built with TypeScript, MongoDB (Mongoose), and Express.

## Installation

Before running the application, make sure you have Node.js and npm (or yarn) installed on your machine.

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd assignment-2
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or if you prefer using yarn:

   ```bash
   yarn install
   ```

3. **Set environment variables:**

   Create a `.env` file in the root directory with the following environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

   Adjust `MONGODB_URI` to your MongoDB URI and database name.

## Scripts

- **Start the application in development mode:**

  ```bash
  npm run start:dev
  ```

  This command uses `ts-node-dev` to run TypeScript files in watch mode with hot-reloading.

- **Start the application in production mode:**

  ```bash
  npm run start:prod
  ```

  This command runs the transpiled JavaScript files from the `dist` directory using Node.js.

- **Linting:**

  ```bash
  npm run lint
  ```

  Run ESLint to lint your TypeScript code.

- **Fix linting issues:**

  ```bash
  npm run lint:fix
  ```

  Run ESLint with auto-fix enabled to fix linting issues automatically.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

### Notes:

- Replace `<repository-url>` with your actual repository URL.
- Adjust the MongoDB URI (`MONGODB_URI`) in the `.env` file according to your MongoDB setup.
- Modify the scripts or add additional scripts as needed for testing, deployment, or other purposes.
- Include any additional information relevant to setting up or running your specific application.
