const cityRoutes = require('./cityRoutes');

module.exports = app => {
    app.use('/city', cityRoutes);
    app.use('*', (req, res) => {
        res.status(404).json({ status: 404, error: 'Not Found' });
    });
};
