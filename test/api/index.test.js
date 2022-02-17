const chai = require('chai');
const chaiHttp = require('chai-http');
//chai nin should metodu ile şu olmalı şeklinde yürütülüt
const should= chai.should();
const server= require('../../app');

chai.use(chaiHttp);

describe('Node Server', () => {
	it('(GET/) returns run page',(done) => {
		chai.request(server)
		.get('/')
		.end((err,res) => {
			res.should.have.status(200);
			done();
		})
	});	
});