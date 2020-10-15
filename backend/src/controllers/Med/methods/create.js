const Med = require("../../../models/Med");
const parseStringAsArray = require("../../../utils/parseStringAsArray");

module.exports = async function create(request, response) {
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
    endereco,
    telefone,
    email,
    bio,
    latitude,
    longitude,
  } = request.body;

  const convArray = parseStringAsArray(convenio);

  /* Criando tipo location com a longitude e latitude */
  const location = {
    type: "Point",
    coordinates: [longitude, latitude],
  };

  const { location: image_url = " " } = request.file;

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
    endereco,
    telefone,
    email,
    bio,
    location,
    tipoEndereco,
    image: image_url,
  })
    .catch((e) => {
      // Caso de erro
      console.log(e);
      return null;
    })
    .then((newMedCreated) => {
      // Caso de sucesso na criação
      return newMedCreated;
    });

  /* Resposta da requisição*/
  if (!newMed) {
    return response.status(409).send();
  }

  return response.status(201).json(newMed);
};
