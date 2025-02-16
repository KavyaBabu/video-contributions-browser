# Contribution Management System

A responsive web application built with **React** and **Material UI** designed for managing and tracking contributions. It features advanced filtering, sorting, and search capabilities for a seamless user experience.

## 🚀 Features

- **Advanced Search & Filter System**:
  - Search through **titles**, **descriptions**, and **owners**.
  - Filter contributions by **status**: **Active**, **Scheduled**, **Complete**.
  - Sort contributions by multiple fields: **ID**, **Title**, **Description**, **Start Time**, **End Time**, **Owner**.

- **Responsive Design**:
  - **Desktop**: 3 contributions per row.
  - **Tablet**: 2 contributions per row.
  - **Mobile**: 1 contribution per row.

- **Smart Pagination**:
  - Display **14 contributions per page**.
  - **URL-based pagination** for easy sharing and navigation.

- **Status Management**:
  - Client-side status determination based on **start** and **end** times.
  - Enhanced UI design for **status tagging** for better user experience.

## 🛠️ Tech Stack

- **Frontend**:
  - **React** + **Vite**
  - **Material UI** for design components
  - **Docker** for containerization

- **Backend**:
  - Containerized backend service with **Docker** support

## 🏃‍♂️ Getting Started

You can set up the project either traditionally or using **Docker** for quick deployment. Follow the steps below based on your preferred setup.

### Option 1: Traditional Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KavyaBabu/video-contributions-browser.git
   cd video-contributions-browser
   ```

2. **Set up the backend**:
   - Navigate to the `server` directory and set up a virtual environment:
     ```bash
     cd server
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     pip install -r requirements.txt
     ```

3. **Set up the frontend**:
   - Navigate to the `ui` directory and install dependencies:
     ```bash
     cd ../ui
     npm install
     ```

### Local Development

1. **Start the frontend server**:
   ```bash
   npm run dev
   ```

2. **Start the backend server**:
   - Ensure you are in the `server` directory, then run:
     ```bash
     uvicorn main:app --reload
     ```

### Option 2: Docker Setup (Recommended)

#### Prerequisites

- **Docker** and **Docker Compose** installed on your system.
- **Node.js** (if developing locally).

#### Running with Docker

1. **Build the backend image**:
   ```bash
   cd server
   docker build -t backend_app .
   ```

2. **Build the frontend image**:
   ```bash
   cd frontend
   docker build -t frontend_app .
   ```

3. **Run both services using Docker Compose**:
   - In the project root directory, run:
     ```bash
     docker-compose up
     ```

   Once the services start, the backend will be accessible at `localhost:3000` and the frontend will be available at `localhost:8080`.

## 🎯 Project Structure

```
project-root/
├── ui/                         
│   ├── src/                   
│   ├── Dockerfile              # Dockerfile for the frontend image
│   └── package.json           
├── server/                     # Backend service
│   ├── src/                    
│   └── Dockerfile              # Dockerfile for the backend image
└── docker-compose.yml          # Configuration to run frontend and backend together
```
![image](https://github.com/user-attachments/assets/acf5c936-934e-4526-b4b7-d944e8ef1e81)
![image](https://github.com/user-attachments/assets/5d9016d7-886d-4f66-8139-8f1dd1aaf0ae)
![image](https://github.com/user-attachments/assets/58eda0d2-3004-493e-913a-c620273d6481)



## 💻 Browser Support

The application has been tested and supports all modern browsers, including:

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
