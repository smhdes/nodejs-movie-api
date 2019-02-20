const mongoose=require('mongoose');

module.exports=()=>
{
mongoose.connect('mongodb://localhost/movie',{ useNewUrlParser: true});
mongoose.connection.once('open',()=>
{
console.log("Veri tabanı bağlantısı kuruldu");

}).on('error',(error)=>
{
    console.log('Error: ',error);
});

mongoose.Promise=global.Promise;
};
