const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../src/index");
const should = chai.should();
chai.use(chaiHttp);

var query;

describe("GET:// PROCURAR --> METHOD FIND CASES OF SUCESS", () => {


    it("Only with specialty", (done) => {

        query = "specialty=psiquiatra";

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("Array");
                response.body.forEach(element => {
                    element.should.have.property("especialidade", "psiquiatra");
                });
                done();
            })
    });

    it("Specialty with city", (done) => {
        query = "specialty=psiquiatra&city=Nova%20F%C3%A1tima";

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("Array");
                response.body.forEach(element => {
                    element.should.have.property("especialidade", "psiquiatra");
                    element.should.have.property("cidade", "Nova Fátima");
                });
                done();
            })
    });
})

describe("GET:// PROCURAR --> METHOD FIND CASES OF ERROR OR SYSTEM DIDN'T FIND DATAS", () => {

    it("Dont't have doctors with the specialty", (done) => {

        query = "specialty=oncologista";

        chai.request(server)
            .get(`/procurar?${query}`)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    });
})