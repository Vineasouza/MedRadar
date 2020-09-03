const Med = require('../../../models/Med')
const parseStringAsArray = require('../../../utils/parseStringAsArray');

module.exports = async function create(request, response) {

    console.log(request.body);

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

    const convArray = parseStringAsArray(convenio);

    /* Criando tipo location com a longitude e latitude */
    const location = {
        type: "Point",
        coordinates: [longitude, latitude],
    };

    /* Criando novo médico */
    const newMed = await Med.create({
        nome,
        especialidade,
        convenio: convArray,
        uf,
        cidade,
        endereço,
        telefone,
        email,
        location
    }).catch((e) => {
        // Caso de erro
        return null;
    }).then((newMedCreated) => {
        // Caso de sucesso na criação
        return newMedCreated;
    });

    /* Resposta da requisição*/
    if (!newMed) {
        return response.status(409).send();
    }

    return response.status(201).json(newMed);
}
