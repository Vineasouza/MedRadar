const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../src/index");
const should = chai.should();
chai.use(chaiHttp);

var query;
var specialty;

describe("GET:// PROCURAR --> METHOD FIND CASES OF SUCESS", () => {


    it("Only with specialty", (done) => {

        specialty = "psiquiatra";
        query = `specialty=${specialty}`;

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("Array");
                response.body.forEach(element => {
                    element.should.have.property("especialidade", specialty);
                });
                done();
            })
    });

    it("Specialty with city", (done) => {

        specialty = "psiquiatra";
        var city = "Nova%20F%C3%A1tima";

        query = `specialty=${specialty}&city=${city}`;

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("Array");
                response.body.forEach(element => {
                    element.should.have.property("especialidade", specialty);
                    element.should.have.property("cidade", "Nova Fátima");
                });
                done();
            })
    });

    it("Only with city", (done) => {

        query = "city=S%C3%A3o%20Jos%C3%A9%20dos%20Campos";
        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("Array");
                response.body.forEach(element => {
                    element.should.have.property("cidade", "São José dos Campos");
                })
                done();
            });
    })

    var longitude;
    var latitude;
    var radius;

    it("Only with radius", (done) => {

        latitude = -23.4444548;
        longitude = -50.5653303;
        radius = 10;
        query = `radius=${radius}&latitude=${latitude}&longitude=${longitude}`;

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("Array");
                done();
            })
    })

    it("Latitude and Longitude only", (done) => {

        latitude = -23.4444548;
        longitude = -50.5653303;
        query = `latitude=${latitude}&longitude=${longitude}`;

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });

    });

    it("Latitude, Longitude with city", (done) => {

        latitude = -23.4444548;
        longitude = -50.5653303;
        query = `latitude=${latitude}&longitude=${longitude}&specialty=Dermatologista`;

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });

    });
})


describe("GET:// PROCURAR --> METHOD FIND CASES OF ERROR OR SYSTEM DIDN'T FIND DATAS", () => {

    it("Dont't have doctors with the specialty", (done) => {

        specialty = "oncologista";
        query = `specialty=o${specialty}`;

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });

    it("Calling the route whitout querys to filter", (done) => {

        chai.request(server)
            .get('/procurar')
            .end((err, response) => {
                response.should.have.status(406);
                done();
            });
    })
})