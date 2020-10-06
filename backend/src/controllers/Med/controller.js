const methodCreate = require('./methods/create');
const methodList = require('./methods/list');
const methodDelete = require('./methods/delete');
const methodShow = require('./methods/show');

module.exports = {
    show: methodShow,
    create: methodCreate,
    list: methodList,
    delete: methodDelete,
}