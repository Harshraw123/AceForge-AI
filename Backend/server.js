import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import sessionRoutes from './routes/session.routes.js';
import questionRoutes from './routes/question.routes.js';
import aiRoutes from './routes/ai.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import codeRoutes from './routes/code.routes.js';
import aiReview from  './routes/aiReview.routes.js'
import dsaProblems from './routes/dsaProblems.route.js'
import runDsaCode from './routes/runDsaCode.js'
// Removed mock interview route


dotenv.config();

// Connect to database (non-blocking for Vercel)
connectDB().catch(console.error);

const app = express();

// Robust CORS: allow localhost and any vercel.app frontend
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // mobile apps/curl/postman
        const isLocal = allowedOrigins.includes(origin);
        const isVercel = /https?:\/\/.*vercel\.app$/.test(origin);
        if (isLocal || isVercel) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/quiz',quizRoutes)
app.use("/api/code", codeRoutes);
app.use('/api/review',aiReview)
app.use('/api/problems',dsaProblems)
app.use('/api/dsaProblems',runDsaCode)
// app.use('/api/mockInterview', mockInterview)


app.get('/', (req, res) => {
    res.json({ 
        message: 'AceForge AI Backend API is running!', 
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        message: 'Server is running properly',
        timestamp: new Date().toISOString()
    });
});



const PORT = process.env.PORT || 8000;

// For Vercel deployment - always export the app
export default app;

// Start server locally only in development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
