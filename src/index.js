const path = require('path')
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3001;

const route =  require('./routers');

const db = require('./config/db');
const sortMiddleware = require('./middleware/sort-middleware');
db.connect();

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources','views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(sortMiddleware);

app.engine('handlebars', handlebars.engine(
    {
        extname: "handlebars",
        helpers: {
            sum:(a, b)=> a + b,
            sortable:(field, sort) => {
                console.log(field, sort)
                const sortType = field === sort.name ? sort.type : 'default';

                const icons = {
                    default: "chevron-expand-outline",
                    asc: "caret-up-outline",
                    desc: "caret-down-outline",
                }

                const types = {
                    default: "desc",
                    asc: "desc",
                    desc: "asc",
                }

                const icon = icons[sortType];
                const type = types[sortType]

                return ` <a href="?_sort&column=${field}&type=${type}">
                            <ion-icon name="${icon}"></ion-icon>
                        </a>`
            }
        }
    }
));

route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});