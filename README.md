# Matrix App

Matrix is a web application that allows users to create, display, and interact with matrices. The app provides
functionality for creating matrices, editing cell values, adding and deleting rows, and calculating row and column sums
and averages.

## [View the Matrix App](https://matrix-app-chi.vercel.app/)

## Table of Contents

- [Requirements](#requirements)
- [Running the App](#running-the-app)
- [Using the App](#using-the-app)
- [Contributing](#contributing)
- [License](#license)

## Requirements

Before using the "Matrix" app, make sure you have the following:

1. **Web Browser**: It is recommended to use the latest version of Google Chrome, Mozilla Firefox, or Safari.

2. **Node.js and npm (Node Package Manager)**: The "Matrix" app is built using React, and you need Node.js and npm for
   running it locally.

## Running the App

To run the "Matrix" app on your local computer, follow these steps:

1. **Download the App Code**: Download the source code of the app from the GitHub repository. You can clone the
   repository using Git or download a ZIP archive and extract it.

   ```shell
   git clone https://github.com/pashokmi/matrix-app.git

2. **Navigate to the App Directory**: Open a terminal and navigate to the app's directory:

   ```shell
   cd matrix-app

3. **Install Dependencies**: Execute the following command to install all the required dependencies from the
   package.json file:
   This command will launch a development server and automatically open the web browser with the "Matrix" app
   at http://localhost:3000. If the web browser doesn't open automatically, you can manually navigate to this link in
   your browser.
   ```shell
   npm install

4. **Start the App**: After successfully installing the dependencies, start the app with the following command:
    ```shell
   npm start

5.   **Use the App**: Now you can use the "Matrix" app to create, edit, and interact with matrices. Try adding or deleting
     rows, changing cell values, and viewing calculations of sums and averages.

## Using the App

- **Create Matrices**: Specify the number of rows and columns in the input fields and click the "Create Matrix" button to create a new matrix.

- **Edit Cell Values**: Click on any cell within the matrix to edit its value by typing in a new number.

- **Add Rows**: Press the "Add row" button to add a new row with random values to the matrix.

- **Delete Rows**: Click the "Delete row" button next to a row to remove it from the matrix.

- **View Sums and Averages**: Sums of rows and averages of columns are automatically calculated and displayed in the table.

- **Change Highlighting Mode**: Hover over a row's sum or a cell to highlight the nearest cells to it.
