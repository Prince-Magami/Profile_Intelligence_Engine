const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const parseNaturalQuery = require("../utils/queryParser");


router.get("/", async (req,res)=>{

 try {

   let query={};

   if(req.query.gender){
     query.gender = req.query.gender.toLowerCase();
   }

   if(req.query.age_group){
     query.age_group = req.query.age_group.toLowerCase();
   }

   if(req.query.country_id){
     query.country_id = req.query.country_id.toUpperCase();
   }

   if(req.query.min_age || req.query.max_age){
      query.age={};

      if(req.query.min_age){
        query.age.$gte=Number(req.query.min_age);
      }

      if(req.query.max_age){
        query.age.$lte=Number(req.query.max_age);
      }
   }

   if(req.query.min_gender_probability){
      query.gender_probability={
       $gte:Number(req.query.min_gender_probability)
      };
   }

   if(req.query.min_country_probability){
      query.country_probability={
       $gte:Number(req.query.min_country_probability)
      };
   }

   let sort={};

   if(req.query.sort_by){
      let direction=
      req.query.order==="desc" ? -1 : 1;

      sort[req.query.sort_by]=direction;
   }

   let page=parseInt(req.query.page)||1;

   let limit=parseInt(req.query.limit)||10;

   if(limit>50){
      limit=50;
   }

   const skip=(page-1)*limit;

   const total=
   await Profile.countDocuments(query);

   const data=
   await Profile.find(query)
   .sort(sort)
   .skip(skip)
   .limit(limit);

   return res.json({
      status:"success",
      page,
      limit,
      total,
      data
   });

 } catch(e){

   return res.status(500).json({
      status:"error",
      message:"Server failure"
   });

 }

});


router.get("/search", async (req,res)=>{

 try {

   const q=req.query.q;

   if(!q){
      return res.status(400).json({
       status:"error",
       message:"Missing parameter"
      });
   }

   const filters=
   parseNaturalQuery(q);

   if(!filters){
      return res.status(400).json({
       status:"error",
       message:"Unable to interpret query"
      });
   }

   let page=parseInt(req.query.page)||1;

   let limit=parseInt(req.query.limit)||10;

   if(limit>50){
      limit=50;
   }

   const skip=(page-1)*limit;

   const total=
   await Profile.countDocuments(filters);

   const data=
   await Profile.find(filters)
   .skip(skip)
   .limit(limit);

   return res.json({
      status:"success",
      page,
      limit,
      total,
      data
   });

 } catch(e){

   return res.status(500).json({
      status:"error",
      message:"Server failure"
   });

 }

});


module.exports=router;