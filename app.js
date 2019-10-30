require('dotenv').config();
const express = require('express');
const { requestLogger } = require('./middleware');
const configRoutes = require('./routes');

const app = express();
app.use(express.json());

app.use(requestLogger);

configRoutes(app);

app.listen(3000, () => {
    console.log(`COEBackendService running on ${process.env.HOST}:${process.env.PORT}`);
});
