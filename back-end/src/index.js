const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({

    origin: '*'
    
}));

require('./startup/routes')(app);


const port = 6666;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;