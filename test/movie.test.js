const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../app');
chai.use(chaiHttp);
let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InMxIiwiaWF0IjoxNTUwODYyOTQ5LCJleHAiOjE1NTA4NjM2Njl9.IRsCUBpeOb6szGK7b0kQsZArc-DwXFfyXFUYTCPEJ28';
let movie_id;
describe('/api/movies tests', () => {
	before((done) => {
		chai.request(server)
			.post('/authenticate')
			.send({username: 's1', password: '1234'})
			.end((err, res) => {
			token = res.body.token;
				done();
			});
    });
});

describe('get all movies',()=>
{
	it('get movies',(done)=>
	{
chai.request(server)
.get('/api/movies')
.set('x-access-token',token)
.end((err,res)=>
{
res.should.have.status(200);
//res.should.be.a('array');
done();
});
});

// Add movies
describe('add movies to collection',()=>
{
	const movie = {
		title: 'Udemysdas',
		director_id: '5a34e1afb8523a78631f8540',
		category: 'Komedi',
		country: 'Türkiye',
		year: 1950,
		imdb_score: 8
	}
it('add movies',(done)=>
{
chai.request(server)
.post('/api/movies')
.send(movie)
.set('x-access-token',token)
.end((err,res)=>
{
res.should.have.status(200);
res.should.be.a('object');
res.should.have.property('title');
res.should.have.property('director_id');
res.should.have.property('category');
res.should.have.property('country');
res.should.have.property('imdb_score');
movie_id=res.body._id;
done();

});

});
});

//Delete
describe('Update movies to collection',()=>
{
	
it('delete movies',(done)=>
{
chai.request(server)
.delete('/api/movies'+movie_id)
.set('x-access-token',token)
.end((err,res)=>
{
res.should.have.status(200);
res.should.be.a('object');
res.should.have.property('status').eql(1);
done();

});

});
});





describe('Update movies to collection',()=>
{
	const movie = {
		title: 'Udemysdas',
		director_id: '5a34e1afb8523a78631f8540',
		category: 'Komedi',
		country: 'Türkiye',
		year: 1950,
		imdb_score: 8
	}
it('update movies',(done)=>
{
chai.request(server)
.put('/api/movies'+movie_id)
.send(movie)
.set('x-access-token',token)
.end((err,res)=>
{
res.should.have.status(200);
res.should.be.a('object');
res.should.have.property('title').eql(movie.title);
res.should.have.property('director_id').eql(movie.director_id);
res.should.have.property('category').eql(movie.category);
res.should.have.property('country').eql(movie.country);
res.should.have.property('imdb_score').eql(movie.imdb_score);
movie_id=res.body._id;
done();

});

});
});





describe('Get movies byId',()=>
{
it('get byId movies',(done)=>
{
chai.request(server)
.get('/api/movies/'+movie_id)
.set('x-access-token',token)
.end((err,res)=>
{

	res.should.have.status(200);
	res.should.have.property('_id').equal(movie_id);
	done();
});

});

});
});









// describe('/GET movies', () => {
//     it('it should GET all the movies', (done) => {
//         chai.request(server)
//             .get('/api/movies')
//             .set('x-access-token', token)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 //res.body.should.be.a('array');
//                 done();
//             });
//     })
// });
