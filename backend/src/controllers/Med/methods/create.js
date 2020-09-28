const Med = require('../../../models/Med')
const parseStringAsArray = require('../../../utils/parseStringAsArray');

module.exports = async function create(request, response) {

    console.log(request.body);

    const {
        nome,
        idade,
        genero,
        especialidade,
        registro,
        convenio,
        tipoEndereco,
        uf,
        cidade,
        endereço,
        telefone,
        email,
        bio,
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
        idade,
        genero,
        especialidade,
        registro,
        convenio: convArray,
        uf,
        cidade,
        endereço,
        telefone,
        email,
        bio,
        location,
        tipoEndereco
    }).catch((e) => {
        // Caso de erro
        console.log(e);
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
