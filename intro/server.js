// const http = require('http');
const express = require('express');
const cats = ['Garfield', 'Tom', 'Simba'];

const app = express();

app.get('/', (req, res) => {
    // res.send('Hello, world!');
    // res.html('<h1>Hello, world!</h1>');
    res.json({ message: 'Hello, world!' });
});

app.get('/cats', (req, res) => { res.json(cats); });
app.get('/cats/:id', (req, res) => { res.json(cats[req.params.id]); });

// curl -X GET http://localhost:5000/cats/search/Garf
app.get('/cats/search/:name', (req, res) => {
    res.json(cats.filter(cat => cat.toLowerCase().includes(req.params.name.toLowerCase())))
});

// curl with body
// curl -X POST -d "name=Garfield" http://localhost:5000/cats
app.post('/cats', (req, res) => {
    // cats.push(req.body.name);
    console.log(req);

    res.json(cats);
});
app.put('/cats/:id', (req, res) => {
    cats[req.params.id] = req.body.name;
    res.json(cats);
});
app.delete('/cats/:id', (req, res) => {
    cats.splice(req.params.id, 1);
    res.json(cats);
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
