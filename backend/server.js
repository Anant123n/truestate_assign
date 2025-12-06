import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import cors from 'cors';









import connectDB from './config/mongodb.js';
import salesRoutes from './routes/salesRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/sales', salesRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});








// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


