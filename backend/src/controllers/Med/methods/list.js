const Med = require('../../../models/Med');

module.exports = async function list(request, response) {
    const meds = await Med.find();
    return response.json(meds);
}