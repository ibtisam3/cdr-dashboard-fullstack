const express = require('express');
const router = express.Router();
const CDR = require('./cdr');
const tokenCheck = require('./tokenCheck');


router.get('/', tokenCheck(['admin','analyst']), async(req,res)=>{
  let {page=1,limit=10,city,from,to,caller,receiver} = req.query;
  page=parseInt(page); limit=parseInt(limit);
  const filter={};
  if(city) filter.city=city;
  if(caller) filter.caller=caller;
  if(receiver) filter.receiver=receiver;
  if(from||to) filter.date={};
  if(from) filter.date.$gte=new Date(from);
  if(to) filter.date.$lte=new Date(to);

  try{
    const total = await CDR.countDocuments(filter);

    
    const records = await CDR.find(filter).sort({ date: -1 });

    res.json({total,page,records});
  }catch{
    res.status(500).json({message:'Server error'});
  }
});

// Analytics
router.get('/analytics', tokenCheck(['admin','analyst']), async(req,res)=>{
  try{
    const totalCalls = await CDR.countDocuments();
    const totalDurationAgg = await CDR.aggregate([{$group:{_id:null,totalDuration:{$sum:"$duration"}}}]);
    const totalDuration = totalDurationAgg[0]?.totalDuration||0;
    const typeDistribution = await CDR.aggregate([{$group:{_id:"$type",count:{$sum:1}}}]);
    const topCallers = await CDR.aggregate([{$group:{_id:"$caller",count:{$sum:1}}},{$sort:{count:-1}},{$limit:5}]);
    res.json({totalCalls,totalDuration,typeDistribution,topCallers});
  }catch{
    res.status(500).json({message:'Server error'});
  }
});

module.exports = router;
