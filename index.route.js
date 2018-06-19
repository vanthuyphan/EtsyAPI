const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const productRoutes = require('./server/product/product.route');

const router = express.Router();

/** GET /health-check - Check service health */
    router.get('/health-check', (req, res) => {
    console.log("We're here");
        res.send('OK')
    }
);

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

module.exports = router;
