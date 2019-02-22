const express = require('express');
const router = express.Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res,next)=>
{
  /*
  const user=new User(req.body);
  */
  const {username,password}=req.body;
  // req.body ile kullanıcının girdiği şifreyi hash methodunda ilk parametre olarak veiriyoruz.
  // Diğer parametre ise yani 10 değeri ise şifreleme aralığını belirtir
 bcrypt.hash(password,10).then((hash)=>
 {
  const user=new User({
    username,  // User modelimizde bulunan username alanına karşılık geliyor.
    password :hash  // User modelimizde bulunan password alanına karşılık geliyor.
      });
      const promise=user.save();
      promise.then((result) => {
        res.json(result);
      }).catch((err) => {
        res.json(err);
      });
 });
});

router.post('/authenticate',(req,res)=>
{
const {username,password}=req.body;

User.findOne({username},(err,user)=>
{
if(err)
throw err;

if(!user)
{
  res.json({
    status:false,
    message:'The user not found'
    });
    
}
else{
  // İlk parametre olan password kullanıcıdan gelen password
  // ikinci parametre ise finone sorgusu sonrasında bize dönen koleksiyonda kayıtlı şifredir
  // result değeri  true yada false olarak döner
bcrypt.compare(password,user.password).then(result=>
  {
if(!result)
{
  res.json({
    status:false,
    message:'Authentication failed,wrong password'
    });
}
else
{
  const payload=
  {
    // taşımak istediğimiz veriyi yazıyoruz.Yani sonuç olarak hangi data bize dönsün onu yazarız
    // username:username olarakda yazabiliriz
    username
  };

  //İlk parametre yukarıda tanımlanan payload 
  // İkinci parametre ise app.js de app.use('api_secret_key',config) olarak tanımlanan api_secret_key 
  //verisini req.app.get('api_secret_key') ile alıyoruz.
  // Burada ki api_secret_key ifadesi app.use('api_secret_key',config) de ki ilk string ifadedir.Yani iki veri de aynı olmalı
  const token=jwt.sign(payload,req.app.get('api_secret_key'),
  {
expiresIn:720 // geçerlilik süresi veriyoruz dakika olarak 720 dakika atadık
  });
  res.json({
status:true,
token
  });
  }
  });
}
});
});
module.exports = router;
