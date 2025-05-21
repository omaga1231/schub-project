# Study Circle Hub

A platform for college students to review and share course experiences, study tips, and preparation resources.

## Features

- Course catalog with filtering by subject, professor, difficulty, and college
- Course pages with reviews, ratings, study tips, and resource uploads
- User authentication 
- Type-ahead search
- Admin panel for content moderation
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, Tailwind CSS, ShadCN/UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Frontend Setup

```
cd frontend
npm install
npm start
```

### Backend Setup

```
cd backend
npm install
npm start
```

## Environment Variables

Create a `.env` file in the backend directory with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Development

- Frontend runs on http://localhost:3000
- Backend API runs on http://localhost:5000

## Deployment

- Frontend: Deploy to Vercel
- Backend: Deploy to Render or Railway
