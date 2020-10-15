const Med = require('../../../models/Med');

module.exports = async function show(request, response) {

    const id = request.params.id;

    const med = await Med.findById(id);

    if (med === undefined) {
        return response.status(404).json({ msg: "Data not found, try again!!" });
    }

    return response.status(200).json(med);
}
