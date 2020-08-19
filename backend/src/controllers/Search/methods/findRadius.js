const Med = require('../../../models/Med');

const formatToSearch = (query) => {
    delete query.latitude;
    delete query.longitude;
    delete query.raio;
}

module.exports = async function findRadius(request, response) {

    let resultSearch;

    if (request.query.hasOwnProperty('latitude') && request.query.hasOwnProperty('longitude') && request.query.hasOwnProperty('raio')) {

        const { latitude, longitude, raio } = request.query;


        formatToSearch(request.query);

        if (request.query == {}) {
            resultSearch = await Med.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 10000,
                    },
                }
            });
        } else {
            resultSearch = await Med.find({
                ...request.query,
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 10000,
                    },
                }
            });
        }


    } else {

        formatToSearch(request.query);

        resultSearch = await Med.find(request.query);
    }

    if (!resultSearch) {
        return response.status(404).json({
            msg: "Datas weren't found, try again!!"
        })
    }

    return response.status(200).json(resultSearch);


}