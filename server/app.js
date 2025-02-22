const express = require('express');

const app = express();
app.use('/', express.static('build'))
app.use(express.json());

app.use('/post', require('./api/routes/postRoute.js'));
app.use('/elasticsearch', require('./api/routes/elasticSearch.js'));

app.get('/', (req, res) => {
    res.send('You entered to the Server Port!')
});


module.exports = app;