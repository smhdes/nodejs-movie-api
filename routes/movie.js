const express = require('express');
const router = express.Router();
const Movie=require('../models/Movie');

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
module.exports = router;
