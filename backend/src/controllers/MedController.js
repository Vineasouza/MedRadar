const Med = require('../models/Med');
const parseStringAsArray = require('../utils/parseStringAsArray'); /* para os convênio */


module.exports = {

    /*Criando médicos */
    create: async (request, response) => {

        const {
            nome,
            especialidade,
            convenio,
            uf,
            cidade,
            endereço,
            telefone,
            email,
            latitude,
            longitude
        } = request.body;

        const convenioFormatado = parseStringAsArray(convenio);

        /* Criando tipo location com a longitude e latitude */
        const location = {
            type: "Point",
            coordinates: [longitude, latitude],
        };

        /* Criando novo médico */
        const novoMedico = await Med.create({
            nome,
            especialidade,
            convenio: convenioFormatado,
            uf,
            cidade,
            endereço,
            telefone,
            email,
            location
        }).catch((e) => {
            // Caso de erro
            return null;
        }).then((novoMedicoCriado) => {
            // Caso de sucesso na criação
            return novoMedicoCriado;
        });

        /* Resposta da requisição*/
        if (!novoMedico) {
            return response.status(409).send();
        }

        return response.status(201).json(novoMedico);
    }


}