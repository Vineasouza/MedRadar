const Med = require('../../../models/Med');

module.exports = async function find(request, response) {

    const { longitude, latitude, especialidade, nome } = request.query;


    const meds = await Med.find({
        //codigo de procura 
    });


    return response.json({ especialidade });

}