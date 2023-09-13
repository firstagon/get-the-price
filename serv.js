const express = require("express");
const path = require("path");

const app = express();

console.log('serving')

const PORT = process.env.APP_FRONTEND_PORT || 3000;

app.use(express.static(path.join(__dirname, "/build")));

app.get('*', (req, res) => {
    res.send(path.join(__dirname, '/build/index.html'))
})

app.listen(PORT);
