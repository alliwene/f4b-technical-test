# F4B Technical Test

## Project Setup

Requirements: [NodeJS](https://nodejs.org/en)

### Steps to run the project locally

1. Setup DB_URI environment variable.

1. `npm install`

1. `npm run start`

1. `npm run dev` - To run in development mode

## API

The server will listen on port `3000`, and it exposes the following APIs:

- **POST** - `/account` - Create a new bank account

  - **firstName** - _string_
  - **lastName** - _string_
  - **dob** - _date_
  - **accountType** - _string_ ('savings' or 'current' or 'checking')
  - **initialBalance** - _number_
  - generates a unique 10-digit account number with the holder's name, account type, and initial balance

- **GET** - `/account/:accountNumber` - Fetch account details by accountNumber

  - **accountNumber** - must be 10 digits

- **GET** - `/media/account` - Fetch all bank accounts

## Project Architecture

This project follows the clean architecture to achieve separation of concerns by dividing the software into layers.

1. `domain` Layer - contains core business logic and entities. It is independent of any external technologies or frameworks.

1. `application` Layer - orchestrates and coordinates the use cases (services) and interacts with the domain layer.

1. `adapters` Layer - contains the implementations defined in the `application` layer.

1. `infrastructure` Layer - contains the external components and technologies used by the application. It deals with the technical details of how data is stored, communicated, and presented.

The `server.ts` at the root of your project is the main application file, setting up the express server, middleware, and routes.
