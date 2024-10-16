const express = require('express');
const cats = ['Garfield', 'Tom', 'Simba'];

const app = express();
app.use(express.json()); // <<<<<<<<

// curl -X GET http://localhost:5000
app.get('/', (req, res) => {
    // res.send('Hello, world!');
    // res.html('<h1>Hello, world!</h1>');
    res.json({ message: 'Hello, world!' });
});

// curl -X GET http://localhost:5000/cats?name=Garf
app.get('/cats', (req, res) => {
    if (req.query.name) {
        res.json(cats.filter(cat => cat.toLowerCase().includes(req.query.name.toLowerCase())));
    } else {
        res.json(cats);
    }
});

// curl -X GET http://localhost:5000/cats/0
app.get('/cats/:id', (req, res) => { res.json(cats[req.params.id]); });

// curl -X GET http://localhost:5000/cats/search/Garf
app.get('/cats/search/:name', (req, res) => {
    res.json(cats.filter(cat => cat.toLowerCase().includes(req.params.name.toLowerCase())))
});

// curl -X POST -H "Content-Type: application/json" -d '{"name": "Felix"}' http://localhost:5000/cats
app.post('/cats', (req, res) => {
    cats.push(req.body.name);
    res.json(cats);
});

// curl -X PUT -H "Content-Type: application/json" -d '{"name": "Felix"}' http://localhost:5000/cats/0
app.put('/cats/:id', (req, res) => {
    cats[req.params.id] = req.body.name;
    res.json(cats);
});

// curl -X DELETE http://localhost:5000/cats/0
app.delete('/cats/:id', (req, res) => {
    cats.splice(req.params.id, 1);
    res.json(cats);
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
