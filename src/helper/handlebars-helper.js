const handlebars = require('handlebars');

module.exports = {
    sum:(a, b)=> a + b,
    sortable:(field, sort) => {
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
        const type = types[sortType];
        const href = handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

        const output = `<a href="${href}">
                        <ion-icon name="${icon}"></ion-icon>
                    </a>`;
        return new handlebars.SafeString(output);
    }
};