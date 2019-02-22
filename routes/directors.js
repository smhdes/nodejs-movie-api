const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const Director=require('../models/Director');

router.post('/',(req,res,next)=>
{
const director=new Director(req.body);
const promise=director.save();
promise.then((director) => {
    res.json(director);
}).catch((err) => {
    res.json(err);
});
});



//Join and get relations movies and directors

router.get('/',(req,res)=>
{

const promise=Director.aggregate([
    {
        $lookup:
        {
            from:'movies', // Hangi koleksiyonda join işlemi yapacağız
            localField:'_id', // join yapılacak diğer tabloda ki hangi key ile join yapılacak
            foreignField:'director_id',//join yapılacak koleksiyonda hangi alan ile eşleşme yapılacak
            as:'movies' // Dönen datanın atanacağı değişken
            // $unwind ile veriyi yakalamak içinde as:'movies' de ki movies datası ile yakalarız
        }
        },
        {
            $unwind:
            {
                path:'$movies',
                preserveNullAndEmptyArrays:true // Eşleştirmede herhangi bir veri ile eşleşmese bile verileri getirir
                //Mesela director koleksiyonunda kayıtlı ancak movies de kayıtlı olmayan yönetmenleri de getirir.
            }
        },
        {
            $group:  // Yönetmene ait bütün filmleri tek bir obje olarak dönmesi için gruplama yapıyoruz
            {
               _id: // Yönetmene ait bütün filmleri tek bir id başlığı altında obje olarak yazar
               {
                _id:'$_id',
                name:'$name',
                surname:'$surname',
                bio:'$bio'
               },
               movies:
               {
                   $push:'$movies' // Yukarıda unwind için kullandığımız movies datasını push ettik
               } 
            }
           
        },
            //başka isimde verebiliriz sadece bir değişken
                     
        
        {
            // Project kısmını yazma sebebimiz group kısmında gruplama yapılırken direk id bilgisi ile yazılıyordu
            // Biz gruplama yaparken direk id altında bulunan id ile yani yönetmen id si ile yazdırmış olacağız
            $project:
            {
                _id:'$_id._id', // yukarıda group kısmında atama yaptığımız id altında ki id verisini almış olduk
                name:'$_id.name', //Yukarı da ki gruplama kısmında bulunan _id altında ki name kısmını aldık
                surname:'$_id.surname',
                movies:'$movies' // yukarıda ki movies datasını direk almış olduk
            }

        }
    ]);
    promise.then((data)=>
    {
        res.json(data);
    }).catch((err)=>
    {
res.json(err);
    });
});


//Get director byId

router.get('/:director_id',(req,res)=>
{

const promise=Director.aggregate([
    {
        $match:  // Sadece eşleşen yani belli bir id ye sahip olan veri yada verileri getirir
        {
            // id object id tipinde olduğu için req.params ifadesinde bulunan id verisini de convert etmeliyiz
        /*hangi alan match edilecek id alanı*/
         '_id':mongoose.Types.ObjectId(req.params.director_id)
        }
    },
    {
        $lookup:
        {
            from:'movies', // Hangi koleksiyonda join işlemi yapacağız
            localField:'_id', // join yapılacak diğer tabloda ki hangi key ile join yapılacak
            foreignField:'director_id',//join yapılacak koleksiyonda hangi alan ile eşleşme yapılacak
            as:'movies' // Dönen datanın atanacağı değişken
            // $unwind ile veriyi yakalamak içinde as:'movies' de ki movies datası ile yakalarız
        }
        },
        {
            $unwind:
            {
                path:'$movies',
                preserveNullAndEmptyArrays:true // Eşleştirmede herhangi bir veri ile eşleşmese bile verileri getirir
                //Mesela director koleksiyonunda kayıtlı ancak movies de kayıtlı olmayan yönetmenleri de getirir.
            }
        },
        {
            $group:  // Yönetmene ait bütün filmleri tek bir obje olarak dönmesi için gruplama yapıyoruz
            {
               _id: // Yönetmene ait bütün filmleri tek bir id başlığı altında obje olarak yazar
               {
                _id:'$_id',
                name:'$name',
                surname:'$surname',
                bio:'$bio'
               },
               movies:
               {
                   $push:'$movies' // Yukarıda unwind için kullandığımız movies datasını push ettik
               } 
            }
           
        },
            //başka isimde verebiliriz sadece bir değişken
                     
        
        {
            // Project kısmını yazma sebebimiz group kısmında gruplama yapılırken direk id bilgisi ile yazılıyordu
            // Biz gruplama yaparken direk id altında bulunan id ile yani yönetmen id si ile yazdırmış olacağız
            $project:
            {
                _id:'$_id._id', // yukarıda group kısmında atama yaptığımız id altında ki id verisini almış olduk
                name:'$_id.name', //Yukarı da ki gruplama kısmında bulunan _id altında ki name kısmını aldık
                surname:'$_id.surname',
                movies:'$movies' // yukarıda ki movies datasını direk almış olduk
            }

        }
    ]);
    promise.then((data)=>
    {
        res.json(data);
    }).catch((err)=>
    {
res.json(err);
    });
});


//Update director
router.put('/:director_id',(req,res)=>
{
    //İlk parametre güncellemek istediğimiz director id si
  //İkinci parametre ise bize geri dönecek değer yani yeni gelecek post datası
const promise=Director.findByIdAndUpdate(
    req.params.director_id,
    req.body,
    {
        new:true   // bu satır ile bize güncellenmiş verinin dönmesini sağlamış oluruz
    }
    );

    promise.then((data)=>
    {
        res.json(data);
    }).catch((err)=>
    {
        res.json(err);
    });
});


//Delete director
router.delete('/:director_id',(req,res)=>
{
const promise=Director.findByIdAndRemove(req.params.director_id);
promise.then((data)=>
{
res.json(data);
}).catch((err)=>
{
    res.json(err);
})
});
module.exports=router;