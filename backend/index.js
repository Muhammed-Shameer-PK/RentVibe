import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'RentVibe API is running!' });
});

const port = process.env.PORT || 5001; // Match the port expected by the frontend
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;