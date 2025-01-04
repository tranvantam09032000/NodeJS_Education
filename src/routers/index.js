const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');
function route(app) {

    app.use('/me', meRouter);
    app.use('/courses', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;