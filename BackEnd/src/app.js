const express = require("express");
const aiRoutes = require("./routes/ai.routes")
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hii from BackEnd");
})

app.use('/ai', aiRoutes);

module.exports = app;