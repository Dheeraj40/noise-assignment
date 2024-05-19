# Express Application with Jest Testing

This is a simple Express application with Jest tests to demonstrate basic functionality for managing sleep records.

## Features

- **POST `/sleep`:** Allows users to submit their sleep duration along with a timestamp.
  - Accepts JSON data including **`userId`**, **`hours`**, and **`timestamp`**.
  - Stores the data in a database (a simple in-memory array is used for this exercise).

- **GET `/sleep/:userId`:** Retrieves a list of all sleep records for a given user, sorted by date.

- **DELETE `/sleep/:recordId`:** Deletes a specific sleep record by its ID.

## Prerequisites

- Node.js installed on your machine.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/Dheeraj40/noise-assignment.git
    ```

2. Navigate to the project directory:

    ```bash
    cd noise-assignment
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

### Running the Server

To start the server, run:

```bash
npm start
```


To test the application, run:

```bash
npm test
```