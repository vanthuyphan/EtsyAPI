const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router();

/** GET /health-check - Check service health */
    router.get('/health-check', (req, res) => {
    console.log("We're here");
        res.send('OK')
    }
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
