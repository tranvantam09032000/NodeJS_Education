const path = require('path')
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const route =  require('./routers');

const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'));

app.engine('handlebars', handlebars.engine(
    {
        extname: "handlebars",
        helpers: {
            sum:(a, b)=> a + b,
        }
    }
));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources','views'));

route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});