import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateAdmin } from '../middleware/auth';
import pool from '../db';

const router = express.Router();

// Mock storage setup for buckets
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // In a real app, this would upload to S3/GCS buckets
    // For now, we'll just mock the destination
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// --- Public Routes ---

// Get approved jobs
router.get('/jobs', async (req, res) => {
  try {
    // const result = await pool.query('SELECT * FROM jobs WHERE status = $1', ['approved']);
    // res.json(result.rows);
    res.json([{ id: 1, title: 'Sample Job', status: 'approved' }]); // Mock response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Submit application
router.post('/applications', upload.single('resume'), async (req, res) => {
  try {
    const { name, mobile, email, city, message, job_id } = req.body;
    const resume_url = req.file ? `/uploads/${req.file.filename}` : null;
    
    // await pool.query(
    //   'INSERT INTO applications (job_id, name, mobile, email, city, message, resume_url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    //   [job_id, name, mobile, email, city, message, resume_url]
    // );
    
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// --- Admin Routes (Protected) ---

// Admin login (Mock)
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Mock authentication
  if (username === 'admin' && password === 'admin123') {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: 1, username: 'admin', role: 'admin' }, process.env.JWT_SECRET || 'your_super_secret_jwt_key_for_dev', { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get all applications (Admin)
router.get('/admin/applications', authenticateAdmin, async (req, res) => {
  try {
    // const result = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    // res.json(result.rows);
    res.json([{ id: 1, name: 'John Doe', status: 'pending' }]); // Mock response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

export default router;
