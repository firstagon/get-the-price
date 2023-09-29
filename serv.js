const express = require("express");
const path = require("path");

const app = express();

console.log('serving')

const PORT = process.env.APP_FRONTEND_PORT || 3000;

app.use(express.static(path.join(__dirname, "/build")));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.listen(PORT);
