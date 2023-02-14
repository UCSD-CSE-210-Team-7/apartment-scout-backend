const express = require('express');

const app = express();

app.use(express.json());

// DEFAULT TESTING ROUTE
app.get('/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

var myLogStatement = function(req, res, next) {
  console.log("Received", req.method, "request for resource", req.path, "from", req.ip);
  next(); // callback to the middleware function
}

app.use(myLogStatement)

server = app.listen(3001, () => console.log('node running on localhost:3001'));

module.exports = app
