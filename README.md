
# SafeWatch AI Guardian System

A comprehensive security monitoring system with AI-enhanced threat detection. This project includes both a React frontend and Django backend.

## Frontend Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a .env file from the example:
   ```
   cp .env.example .env
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at http://localhost:8080

## Backend Setup

See the [backend README](django_backend/README.md) for detailed instructions on setting up the Django backend.

## Project Structure

- `/src` - React frontend code
  - `/api` - API client and services
  - `/components` - UI components
  - `/hooks` - React hooks for data fetching
  - `/pages` - Main application pages
  
- `/django_backend` - Django REST API backend
  - `/api` - Django app with models and views
  - `/safewatch` - Django project settings

## Features

- Real-time camera monitoring
- AI-powered threat detection
- Alert management system
- Incident logging and response tracking
- Risk zone mapping
- Emergency SOS functionality
- System statistics and performance metrics

## Technologies

- Frontend: React, TypeScript, TailwindCSS, Tanstack Query
- Backend: Django, Django REST Framework
- Data Visualization: Recharts
- UI Components: shadcn/ui

## Development

To work on both the frontend and backend simultaneously:

1. Start the Django backend server (see backend README)
2. Start the React frontend development server
3. The frontend will automatically connect to the backend API

## Screenshot

![Dashboard Screenshot](https://example.com/screenshot.png)
