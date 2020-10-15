const Med = require("../../../models/Med");

module.exports = async function find(request, response) {
  if (Object.keys(request.query).length === 0) {
    return response.status(406).send();
  }

  let resultSearch;
  const { latitude, longitude, specialty, city } = request.query;

    if (Object.keys(request.query).length === 0) {
        return response.status(406).send();
    }

    console.log(request.query);
    let resultSearch;
    const {
        latitude,
        longitude,
        specialty,
        city,
        age,
        healthPlan
    } = request.query;

    let query = {};

    if (specialty != undefined) {
        query.especialidade = specialty;
    }
    if (city != undefined) {
        query.cidade = city
    }
    if (age != undefined) {
        query.idade = { $gte: age };
    }
    if (healthPlan != undefined) {
        query.convenio = healthPlan;
    }

    /* 
        Option where the user are looking for
        doctors only by Radius
    */
    let radius;
    if (request.query.radius === undefined) radius = 10; // Default to radius!
    else radius = request.query.radius

    if (Object.keys(query).length === 0) {
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

        /*  Option where the user are looking for
            doctors only by Radius, city or specialty
        */    
    } else {
        console.log(query);
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

  if (resultSearch.length === 0) {
    return response.status(404).json({
      msg: "Data not found, try again!!",
    });
  }

  return response.status(200).json(resultSearch);
};
