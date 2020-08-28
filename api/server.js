const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/users-router.js');
const dinerRouter = require('../users/diners-router.js');
const operatorRouter = require('../users/operators-router.js');
const truckRouter = require('../trucks/trucks-router.js');
const menuItemRouter = require('../menuitems/menuitems-router.js');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);
server.use('/api/diners',authenticate, dinerRouter);
server.use('/api/operators',authenticate, operatorRouter);
server.use('/api/trucks',authenticate, truckRouter);
server.use('/api/menuitems',authenticate, menuItemRouter);


server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

module.exports = server;
