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
