const express = require('express');
const router = express.Router();
const Movie=require('../models/Movie');

//Get movies between dates
router.get('/between/:start_year/:end_year',(req,res)=>
{
const {start_year,end_year}=req.params;
  const promise=Movie.find({
    year:
    {
      "$gte":parseInt(start_year),
      "$lte":parseInt(end_year)
    }
  });
promise.then((data) => {
  res.json(data);
}).catch((err) => {
  res.json(err);
});
});



//Get Top 10 movies
router.get('/top10',(req,res)=>
{

  // -1 büyükten küçüğe, 1  ise küçükten büyüğe doğru sıralama yapar
const promise=Movie.find({}).limit(10).sort({imdb_score:1});
promise.then((result) => {
  res.json(result);
}).catch((err) => {
  res.json(err);
});
});

//Get all movies
router.get('/',(req,res)=>
{

const promise=Movie.find({});
promise.then((result) => {
  res.json(result);
}).catch((err) => {
  res.json(err);
});
});


//Get movies byId
// req.params ifadesi movie_id kısmında ki değeri alır
// req.params.movie_id dersek direk id yi verir
router.get('/:movie_id',(req,res,next)=>
{
const promise=Movie.findById(req.params.movie_id);
promise.then((movie)=>
{
  if(!movie)
  next({message:'The movie was not found',code:34});
 
  res.json(movie);
}).catch((err)=>
{
res.json(err);
});

//Update movie byId
router.put('/:movie_id',(req,res,next)=>
{
  //İlk parametre güncellemek istediğimiz film
  //İkinci parametre ise bize geri dönecek değer yani yeni gelecek post datası
const promise=Movie.findByIdAndUpdate(req.params.movie_id,req.body,
  {
    new:true  // Bu parametre ile req.body den dönen nesne güncellendikten sonra ki nesne olur.Yani güncel  hali gelir.
  });
promise.then((movie)=>
{
  if(!movie)
  next({message:'The movie was not update',code:34});
 
  res.json(movie);
}).catch((err)=>
{
res.json(err);
});


});


router.post('/', (req, res, next)=> {
  const {title,imdb_score,category,country,year}=req.body;

  //Eğer tek tek eşleştirme yaparak yada verilerin üzerinde işlem yaparak kaydetmek
  //istersek bu yöntemi kullanabiliriz
//   const movie=new Movie({
// title:title,
// imdb_score:imdb_score,
// category:category,
// country:country,
// year:year
//   });

const movie=new Movie(req.body);
// Bu şekilde callback fonksiyonu ile de kayıt yapılabilir.
// Ama genel kullanım şekli global Promise yapısıdır.
// movie.save((err,data)=>
// {
// if(err)
// res.json(err);
// res.json(data);
// });


// Global Promise yapısı ile veri kaydetme
const promise=movie.save();
promise.then((data) => {
  res.json(data);
}).catch((err) => {
  res.json(err);
});
 });


 //Delete movie
 router.delete('/:movie_id',(req,res,next)=>
 {
 const promise=Movie.findByIdAndRemove(req.params.movie_id);
 promise.then((movie)=>
 {
   if(!movie)
   next({message:'The movie was not found',code:34});
  
   res.json(movie);
 }).catch((err)=>
 {
 res.json(err);
 });

});
});
module.exports = router;
