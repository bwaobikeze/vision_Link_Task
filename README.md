# vision_Link_Task

create a simple web application to display a set of points, and allow adding, editing and deleting points.

## Prerequisites

Before you begin, ensure you have installed the following tools:
- Docker: [Installation](https://www.docker.com/)
- PostgreSQL: [Installation](https://www.postgresql.org/download/)
- This is the Database schema that the application is expecting:
   ```sql
   CREATE TABLE point (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       x INTEGER NOT NULL,
       y INTEGER NOT NULL
   );


## Setup Instructions

1. **Clone the Repository**

   First, clone this repository to your local machine:

   ```sh
   git clone <repository_url>
   cd <repository_directory>

2. **Setting Up Client Environment Variables**

    - Create a .env file in the clientfile folder with the url and port that you want the server to listen to.

    - In this case it is:

    ```sh
    REACT_APP_SERVER = http://localhost:8080

3. **Setting Up Server Environment Variables**

    Create a .env file in the server folder with your PostgreSQL database connection string credentials. Replace placeholders with your actual database details. "host.docker.internal" is to give docker access to your database running locally :

    ```sh
    POSTGRES_USER="your_postgres_user"
    POSTGRES_HOST="host.docker.internal"
    POSTGRES_PASSWORD="your_postgres_password"
    POSTGRES_DB="your_database_name"
    POSTGRES_PORT="5432"

4. **Starting the Application**

    Start the application using Docker Compose:

    ```sh
    docker-compose up --build


5. **Access the Application**

   Once the application is running and the model is pulled, you can access it through your web browser at http://localhost:3000.
   
6. **Shut down the Application**
    shut down the application using Docker Compose:

    ```sh
    docker-compose down


## Assumptions
 - I assumed that a PostgreSQL database already contains the table of points
 - I assumed that the database would be ran locally