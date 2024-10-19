# testinggggggggggggggggggg

# Finance Management System (v1)

## Getting Started

### 1. Clone or Download the Repository
First, clone or download all the files from this repository.

### 2. Setup Environment for `finance_system_v1`

- **Step 1:** Create a `.env` file in the root directory (parent folder) of the project.
- **Step 2:** Add the following environment variables to the `.env` file:

  SECRET_KEY=4f1d6b8e23f84e9e9b8e4d8c1b6d2f3a
  MYSQL_HOST=localhost
  MYSQL_USER=root
  MYSQL_PASSWORD=
  MYSQL_DB=finance_management_system

  # Microservices URLs
  AUTH_SERVICE_URL=http://localhost:5000
  LOGGING_SERVICE_URL=http://localhost:5001

- **Step 3:** Install the required Python libraries by running the following command in your terminal:

  pip install -r requirements.txt

- **Step 4:** Import the provided SQL file into your MySQL database to set up the required schema and data.

### 3. Setup Environment for `authentication_service`

- **Step 1:** Install the required libraries by running the following command:

  pip install -r requirements.txt

  > *Note: Ensure all the necessary libraries are installed, as the `requirements.txt` might not have all the dependencies.*

- **Step 2:** Import the `auth_db.sql` file into your MySQL database to create the authentication schema.

---

## Running the Applications

### 1. Start the Authentication Service
In the `authentication_service` directory, run the following command:

python run.py

### 2. Start the Main Application
In the `finance_system_v1` directory, run the following command:

python run.py

Once the main application is running, you can access it via the link provided in the terminal (e.g., `http://127.0.0.1:5005`).

---

## Login Credentials

Use the following credentials to log in to the application:

- Username: mtbayona.fms
- Password: bayona921

---

CONTACT ME IF YOU NEED HELP!
