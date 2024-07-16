# vision_Link_Task

create a simple web application to display a set of points, and allow adding, editing and deleting points.

## Prerequisites

Before you begin, ensure you have installed the following tools:
- Docker: [Installation](https://www.docker.com/)


## Setup Instructions

1. **Clone the Repository**

   First, clone this repository to your local machine:

   ```sh
   git clone <repository_url>
   cd <repository_directory>

2. **Setting Up Environment Variables**

    - Create a .env file in the clientfile folder with the url and port that you want the server to listen to.

    - In this case it is:

    ```sh
    REACT_APP_SERVER = http://localhost:8080

3. **Setting Up Environment Variables**

    Create a .env file in the server folder with your PostgreSQL database credentials. Replace placeholders with your actual database details:

    ```sh
    POSTGRES_USER=your_postgres_user
    POSTGRES_HOST=db
    POSTGRES_PASSWORD=your_postgres_password
    POSTGRES_DB=your_database_name
    POSTGRES_PORT=5432

4. **Starting the Application**

    Start the application using Docker Compose:

    ```sh
    docker-compose up --build


5. **Access the Application**

   Once the application is running and the model is pulled, you can access it through your web browser at http://localhost:3000.