const Med = require('../../../models/Med');

module.exports = async function deletar(request, response) {
    const med = await Med.findById(request.params.id);

    await med.remove();

    return response.send();
}