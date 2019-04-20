const mongoose = require('mongoose');
const express = require('express');
const app = express();
const log4js = require('log4js');
const { requestHandler } = require('./controller/orchestrate');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());

mongoose.connect(`mongodb://localhost/usersdb`, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log(error));

app.get('/users', async (req, res) => await requestHandler(req, res));

app.get('/users/:id', async (req, res) => await requestHandler(req, res));

app.post('/users', async (req, res) => await requestHandler(req, res));

app.patch('/users/:id', async (req, res) => await requestHandler(req, res));

app.delete('/users/:id', async (req, res) => await requestHandler(req, res));

app.delete('/users', async (req, res) => await requestHandler(req, res));

//logging
log4js.configure({
    appenders: {
        out: {
            "type": "stdout",
            "layout": {
                "type": "pattern",
                "pattern": "%d %p %c appName='mongodb-starter-app' %m%n"
            }
        }
    },
    categories: {
        default: { appenders: ['out'], level: process.env.LOGGING_LEVEL || 'info' }
    }
});

const normalizePort = val => {
    let port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

const port = normalizePort(process.env.PORT || process.env.VCAP_APP_PORT || 3000);

app.listen(port, () => console.log(`App is listening on port ${port}...`));