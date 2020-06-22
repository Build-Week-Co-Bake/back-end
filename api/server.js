const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router');
const issuesRouter = require('../issues/issues-router');
const restricted = require('../auth/auth-middleware');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api', authRouter);
server.use('/issues', restricted, issuesRouter);

server.get('/', (req,res) => {
  res.status(200).json({ api: "Welcome to the Co-Make API!" });
});

module.exports = server;