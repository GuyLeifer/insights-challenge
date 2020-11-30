require('dotenv/').config(); 
const app = require('./app');
const scrape = require('./scrape');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
    setInterval(function() {
        scrape()
    }, 2 * 60 * 1000);
})