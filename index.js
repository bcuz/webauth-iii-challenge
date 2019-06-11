const express = require('express');
const bcrypt = require('bcryptjs');

const server = express();

server.use(express.json());



const port = process.env.PORT || 5001;
server.listen(port, function() {
  console.log(`\n=== API Listening on http://localhost:${port} ===\n`);
});