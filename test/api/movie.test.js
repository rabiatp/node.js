const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

//tooken olmadan server çalışmıyor
// before ile testler başlamadan önce işlem yapılabiliyor
//res.body dönen datanın ne olduğunu ifade ediyor
// should olmalı anlamında 
chai.use(chaiHttp);

let token,movieId;

describe('/api/movies tests', () => {
   before((done) => {
        chai.request(server)
        .post('/authenticate')
        .send({ username: 'mseven', password: 'asdf'})
        .end((err,res) => {
            token=res.body.token;
            done();
        });
   });

   describe('/GET movies',() => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token',token)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        })
   });
   describe('/POST movie', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'udemy',
                category: 'komedi',
                country: 'turkey',
                year: 1950,
                imdb_score: 8
            };
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('title');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movieId = res.body._id;
                done();
            })
        });
   });
   
   // eql eşit olmalı 

   describe('/GET/:dicrector_id movie',() => {
       it('it should GET a movie by the given id', (done) => {
        chai.request(server)
        .get('/api/movies/' + movieId)
        .set('x-acess-token', token)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('category');
            res.body.should.have.property('country');
            res.body.should.have.property('year');
            res.body.should.have.property('imdb_score');
            res.body.should.have.property('_id').eql(movieId);
            (done);
        })
       });
   })
});
