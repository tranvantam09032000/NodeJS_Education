const path = require('path')
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route =  require('./routers');

const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources','views'));

route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});