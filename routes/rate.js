const express=require("express")

const { isAuth }=require('../middlewares/isAuth')
const router=express.Router()
const Rate=require("../models/Rate")


// add Rating by client
router.post('/:id/addrate',(req,res)=>{
    const user =req.user
    const {rating }=req.body
    const product=req.params.id
   

    const rate= new Rate({user,rating,product})
     rate.save()
     .then(product=>res.send(product))
     .catch(err=>console.log(err))
          });

// get all Rate
router.get('/allrate',(req,res)=>{
    Rate.find()
    .then(products=>res.send(products))
    .catch(err=>console.log(err))
          });

          module.exports=router