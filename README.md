# Gym Management System with Chapa Payment Aggregator and QR Code Scanner


## Overview

Welcome to the Gym Management System repository! This system is designed to help gym owners and managers efficiently manage their gym's operations, including membership management, scheduling, and payments. It integrates seamlessly with the Chapa payment aggregator for easy payment processing and includes a QR code scanner for convenient schedule checking.

## Features

- **Membership Management**: Easily add, update, and track gym memberships.
- **Scheduling**: Allow members to view class schedules and check availability using the built-in QR code scanner.
- **Chapa Payment Integration**: Streamline payment processing for membership fees and additional services.
- **User-friendly Interface**: Intuitive and responsive user interface for both gym staff and members.
- **Reporting**: Generate reports on membership statistics, payments, and more.
- **Customizable**: Tailor the system to your gym's specific needs with configurable options.

## Prerequisites

Before setting up the Gym Management System, make sure you have the following prerequisites:

- [Node.js](https://nodejs.org/) installed on your server.
- [Chapa API credentials](https://developer.chapa.co/docs/) for payment integration.
- A compatible QR code scanner device or software.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/getaseww/gym-management-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd gym-management-system
   ```

3. Install dependencies and run api:
   
    ```bash
   cd api
   ```

   ```bash
   npm install
   ```
4. Install dependencies and run app:
   
    ```bash
   cd app
   ```

   ```bash
   npm install
   ```

5. Configure the application by creating a `.env` file and setting the following environment variables:

   ```dotenv
   PORT=3000
   CHAPA_API_KEY=your_chapa_api_key
   CHAPA_API_SECRET=your_chapa_api_secret
   ```

6. Start the application:

   ```bash
   npm start
   ```

7. Access the Gym Management System in your web browser at `http://localhost:3000`.

## Usage

1. **Admin Dashboard**: Log in as an admin to access the gym management dashboard.

2. **Membership Management**: Add, edit, or deactivate memberships.

3. **Scheduling**: View and manage gym class schedules. Members can scan QR codes to check their schedules.

4. **Payments**: Process payments using Chapa integration for memberships and services.

5. **Reports**: Generate various reports to analyze gym performance.

## Contributors

- [Your Name](https://github.com/getaseww)

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

- Thank you to the Chapa team for providing the payment aggregator API.

## Contact
