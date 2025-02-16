# Contribution Management System

A responsive web application built with React and Material UI for managing and tracking contributions with advanced filtering, sorting, and search capabilities.

## 🚀 Features

- **Advanced Search & Filter System**
  - Search through titles, descriptions, and owners
  - Filter contributions by status (Active, Scheduled, Complete)
  - Sort by multiple fields (ID, title, description, start time, end time, owner)

- **Responsive Design**
  - Desktop: 3 contributions per row
  - Tablet: 2 contributions per row
  - Mobile: 1 contribution per row

- **Smart Pagination**
  - 14 contributions per page
  - URL-based pagination for easy sharing and navigation

- **Status Management**
  - Client-side status determination based on start and end times
  - Enhanced UI design for status tagging

## 🛠️ Tech Stack

- Frontend:
  - React + Vite
  - Material UI
  - Docker containerization

- Backend:
  - Containerized backend service
  - Docker support

## 🏃‍♂️ Getting Started

You can either set up the project traditionally or use Docker for quick deployment.

### Option 1: Traditional Setup

1. Clone the repository:
```bash
git clone https://github.com/KavyaBabu/video-contributions-browser.git
cd video-contributions-browser
```

2. Set up the backend:
```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

3. Set up the frontend:
```bash
cd ../ui
npm install
npm run dev
```
### Local Development

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Option 2: Docker Setup (Recommended)
### Prerequisites

- Docker and Docker Compose installed on your system
- Node.js (for local development)

### Running with Docker

1. Build the backend image:
```bash
cd server
docker build -t backend_app .
```

2. Build the frontend image:
```bash
cd frontend
docker build -t frontend_app .
```

3. Run both services using Docker Compose:
```bash
docker-compose up
```

## 🎯 Project Structure

```
project-root/
├── ui/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── server/
│   ├── src/
│   └── Dockerfile
└── docker-compose.yml
```

## 💻 Browser Support

The application is tested and supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
