const Med = require('../../../models/Med');

module.exports = async function find(request, response) {

    let resultSearch;

    console.log(request.query);

    const {
        latitude,
        longitude,
        specialty,
        city,
    } = request.query;

    let query = {};
    if (specialty != undefined) {
        query.especialidade = specialty;
    }
    if (city != undefined) {
        query.cidade = city
    }


    if (latitude != undefined && longitude != undefined) {

        /* 
            Option where the user are looking for
            doctors only by Radius
        */
        let radius;
        if (request.query.radius === undefined) radius = 10; // Default to radius!
        else radius = request.query.radius

        if (query == {}) {
            resultSearch = await Med.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: radius * 1000, // Converting from km to m
                    },
                }
            });

            /* 
                Option where the user are looking for
                doctors only by Radius, city or specialty
            */
        } else {

            resultSearch = await Med.find({
                ...query
                ,
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: radius * 1000,
                    },
                }
            });
        }


    } else {
        /* 
            Here, the User are looking for doctors using
            specialty, city, or two together  
        */
        resultSearch = await Med.find(query);
    }

    if (!resultSearch) {
        return response.status(404).json({
            msg: "Data not found, try again!!"
        })
    }

    return response.status(200).json(resultSearch);


}