/* busca por médico por:
nome
especialidade
raio
*/

const Med = require('../models/Med');

module.exports = {
    find: async (request, response) => {

        const { longitude, latitude, especialidade, nome } = request.query;

        const meds = await Med.find({ 
            /* codigo de procura */
        });

        return response.json({ meds });
    }
}