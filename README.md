# Sales Management System

## Overview
This Sales Management System provides a comprehensive dashboard for tracking and analyzing sales data. It features a responsive user interface with a static sidebar and a dynamic main content area. Users can efficiently search, filter, sort, and paginate through sales records, which are aggregated from multiple related data models (Customers, Products, Operations) for a holistic view.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose

## Search Implementation Summary
Search is implemented using a full-text search approach on the backend. The `salesController` uses MongoDB's `$match` stage with the `$or` operator to check both `customer.customerName` and `customer.phoneNumber`. It utilizes `$regex` with the `'i'` option to ensure case-insensitive and partial matching, providing accurate and performant results even with large datasets.

## Filter Implementation Summary
The system supports robust multi-select and range-based filtering. Filters for Region, Gender, Category, Tags, and Payment Method use the `$in` operator to match any selected values. The Age Range filter parses "min-max" strings to apply `$gte` and `$lte` conditions. All filters are applied in the `$match` stage of the aggregation pipeline, allowing them to work independently or in combination with search and sorting.

## Sorting Implementation Summary
Sorting is handled via the `$sort` stage in the aggregation pipeline. The system supports sorting by Date (Newest/Oldest), Quantity (High/Low), and Customer Name (A-Z/Z-A). The sort parameter from the frontend is mapped to specific database fields (e.g., `operation.date`, `quantity`, `customer.customerName`), ensuring that the active search and filter context is preserved while reordering results.

## Pagination Implementation Summary
Pagination is achieved using MongoDB's `$facet` stage, which allows retrieving both the paginated data subset and the total count of matching records in a single query. The `page` and `limit` parameters determine the `$skip` and `$limit` values. This ensures efficient data loading and accurate "Page X of Y" displays on the frontend, even when filters reduce the total result set.

## Setup Instructions

### Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables in `.env` (ensure `mongo_url` is set).
4. Seed the database (optional): `node seed_data.js`
5. Start the server: `npm start` (runs on port 5000)

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser at `http://localhost:5173`
