const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>
{
// Get token
// request olarak header dan ,query olarak veya direk token olarak veri bize gelebilir.
// Bu yüzden bu durumları kontol ediyoruz
// x-access-token bizim belirlediğimiz bir string değişken başka isim de verebiliriz

const token=req.headers['x-access-token'] || req.body.token || req.query.token;
if(token)
{
    // İlk parametre gelen token
    // İkinci parametre ise bizim secret key olarak atadığımız api_secret_key i veririz
jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>
{
if(err)
{
    res.json({
status:false,
message:'Failed to authenticate token.'
    });
}
else{
    // Belirlemiş olduğumuz payload kısmını req nesnesine atıyoruz
    req.decode=decoded;
    next(); // Herşey yolunda artık herhangi bir router nesnesi ile eşleşilebilir.
}
});
}
else
{
res.json({
status:false,
message:'No token provided'
});
}
};
