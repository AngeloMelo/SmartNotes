const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const formatDateForQuery = require('../utils/formatDateForQuery');

router.get('/', (req, res)=>
{
    let keywords = JSON.parse(req.query['keywords']);
    let ini = req.query['iniDate'];
    let fin = req.query['finDate'];
    let title = req.query['title'];
    let statements = new Array();

    if(ini !=='')
    {
        let dtParam = formatDateForQuery(ini);
        statements.push({"create_date": {"$gte": dtParam}});
    }

    if(fin !=='')
    {
        let dtParam = formatDateForQuery(fin);
        statements.push({"create_date": {"$lt": dtParam}});
    }

    if(title !=='')
    {
        statements.push({"title": { $regex: '.*' + title + '.*' } });
    }

    if(keywords.length >0)
    {
        statements.push({ "keywords": { $in: keywords } });
    }

    let queryobj = {};
    if(statements.length >0)
        queryobj = { $and: statements };
    
    Report.find(queryobj)
        .sort({create_date: -1})
        .then(reports => res.json(reports));
    
});

router.post('/', (req, res)=>
{
    const newReport = new Report({
        title : req.body.title,
        description: req.body.description,
        keywords: req.body.keywords
    });

    newReport.save().then(report => res.json(report));
});

router.put('/:id',(req,res)=>{
    let updt = {
        title : req.body.title,
        description: req.body.description,
        keywords: req.body.keywords || []
    };

    Report.findOneAndUpdate({_id:req.params.id},updt)
        .then(()=> res.json({success:true}))
        .catch(err => res.status(404).json({success:false}));
});

router.delete('/:id',(req,res)=>{
    Report.findById(req.params.id)
        .then(report => report.remove())
        .then(()=> res.json({success:true}))
        .catch(err => res.status(404).json({success:false}));
});

module.exports = router;  