# Company Management Backend

A Node.js backend with PostgreSQL integration for managing companies, now configured for Neon DB.

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Neon DB**:
   - Create a free account at [Neon Console](https://console.neon.tech/)
   - Create a new project
   - Copy your connection string from the dashboard

3. **Configure Environment**:
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   PORT=5000
   NODE_ENV=development
   ```

4. **Start Server**:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

## Database

- **Database**: Neon DB (Cloud PostgreSQL)
- **Connection**: Uses DATABASE_URL environment variable
- **SSL**: Required for Neon DB connections
- **Auto-setup**: Tables are created automatically on first connection

## Migration from Local PostgreSQL

The application now supports both local PostgreSQL and Neon DB:
- If `DATABASE_URL` is provided, it uses Neon DB
- Otherwise, it falls back to individual connection parameters for local development
