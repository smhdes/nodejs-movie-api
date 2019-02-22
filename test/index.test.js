const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../app');

chai.use(chaiHttp);

describe('Nodejs Server',(err,res)=>
{
it('GET isteği ile anasayfaya yönlendirme başarılı',(done)=>
{
    chai.request(server)
    .get('/')
    .end((err,res)=>
    {
res.should.have.status(200);
done();
    });

});

});