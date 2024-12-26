const { enable } = require("express/lib/application");

module.exports = function(req, res, next) {

    res.locals._sort = {
        enable: false,
        type: "default"
    }

    if(req.query.hasOwnProperty("_sort")) {
        res.locals._sort = {
            enable: true,
            type: req.query.type,
            name: req.query.column
        }
    }

    next();
}