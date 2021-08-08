const path = require('path');
const cors = require("cors");
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes')


app = express()
//1) GLOBAL  
app.use(cors());
// Set security HTTP headers
app.use(helmet())

// Developmet logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this Ip, please try again in an hour'
});

app.use('/api', limiter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));

// Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString;
    next();
})


//2) ROUTES
app.get('/', (req, res) => {
    res.send('App is running!')
})
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);

app.all('*', (req, res, next) => {
    let message = `Can't find ${req.originalUrl} on this server!`;
    const statusCode = 404;
    next(new AppError(message, statusCode))
});

//3) ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;