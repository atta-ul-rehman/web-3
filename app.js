console.clear()
const express = require("express");
const joi = require("joi");
const app = express();
const cors = require("cors");

app.use(cors());

var port = normalizePort(process.env.PORT || '3000');
http = require('http');
app.set('port', port);

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

app.use(express.json());
const products = [
  {
    id: 1, number1: 1234, name: "atta", email: "abc@gmial.com", gender: "m", number2: "1234", Address:
    {
      street: "n1", city: "lhr", country: "pak"
    }
  },
  {
    id: 2, number1: 12234, name: "lila", email: "abc@gmial.com", gender: "f", number2: "1234", Address:
    {
      street: "n1", city: "lhr", country: "pak"
    }
  },
  {
    id: 3, number1: 122234, name: "atta", email: "abc@gmial.com", gender: "m", number2: "1234", Address:
    {
      street: "n1", city: "lhr", country: "pak"
    }
  },

];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/search", function (req, res) {
  res.send("API Search");
});

//first parameter is url
app.get("/api/products", function (req, res) {
  res.send(products);
});
//get one resource
app.get("/api/products/:id", function (req, res) {
  const prod = products.find(c => c.id === parseInt(req.params.id));
  if (!prod)
    return res.status(400).send("Product not found");
  res.send(prod);
});
//update one resource with id e.g. index
app.put("/api/products/:id", function (req, res) {
  const prod = products.find(c => c.id === parseInt(req.params.id));
  if (!prod)
    return res.status(400).send("Product not found");
  const { error } = valide(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  prod.number1 = req.body.number1;
  prod.name = req.body.name;
  prod.email = req.body.email;
  prod.gender = req.body.gender;
  prod.number2 = req.body.number2 || null;
  prod.Address["street"] = req.body.street;
  prod.Address["city"] = req.body.city;
  prod.Address["country"] = req.body.country;
  res.send(prod);
});
//delete one resource
app.delete("/api/products/:id", function (req, res) {
  const prod = products.find(c => c.id === parseInt(req.params.id));
  if (!prod) return res.status(404).send("product not found");
  const index = products.indexOf(prod);
  products.splice(index, 1);
  res.send(prod);
});
//create one resource
app.post("/api/products", function (req, res) {
  const { error } = valide(req.body);
  valide(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  if (!products) {
    res.status(400).send("smt went wrong");
    return;
  }
  const prod = {
    id: products.length + 1,
    number1: req.body.number1,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    number2: req.body.number2 || null,
    Address:
    {
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
    }
  };
  products.push(prod);
  res.send(prod);
});
//Vlaidate routes
function valide(prod) {
  const schema = joi.object({
    id: joi.number().integer(),
    number1: joi.number(),
    number2: joi.string(),
    name: joi.string().min(3),
    email: joi.string(),
    gender: joi.string().valid("M", "F").insensitive(),
    street: joi.string(),
    city: joi.string(),
    country: joi.string()
  });
  return schema.validate(prod);
}
server = http.createServer(app);
server.on('listening', onListening);
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
server.listen(port);
