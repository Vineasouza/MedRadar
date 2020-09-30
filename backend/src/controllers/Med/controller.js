const methodCreate = require('./methods/create');
const methodList = require('./methods/list');
const methodDelete = require('./methods/delete');

module.exports = {
    create: methodCreate,
    list: methodList,
    delete: methodDelete,
}