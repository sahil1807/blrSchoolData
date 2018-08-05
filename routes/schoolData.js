const express = require('express');
const bodyParser = require('body-parser');
const SchoolData = require('../models/schoolData.js');
const fs = require('fs');

const schoolDataRouter = express.Router();

schoolDataRouter.use(bodyParser.json());


schoolDataRouter.route('/getAllData')

    .get(function (req, res, next) {
        fs.readFile("data/schoolData.json", function(err,data) {
            if (err) {
                console.log(err);
            }
            let schoolData = JSON.parse(data);
            return res.status(200).send(schoolData);
        });
    });

schoolDataRouter.post('/getSchoolData', function(req, res, next) {

    let query = {};
    let sort ='schoolid';
    let sort_order = 1;

    //Sorting parameter
    if(req.body.sort!==undefined){
        sort=req.body.sort;
        query[sort] = {$exists:true, $ne:null, $ne:""}
    }
    if(req.body.sort_order!==undefined && req.body.sort_order!=='' ){
        sort_order=req.body.sort_order;
    }

    //Filter Parameter
    if(req.body.category!==undefined && req.body.category!=='' ){
        query.category=req.body.category;
    }
    if(req.body.gender!==undefined && req.body.gender!=='' ){
        query.gender=req.body.gender;
    }
    if(req.body.medium_of_inst!==undefined && req.body.medium_of_inst!=='' ){
        query.medium_of_inst=req.body.medium_of_inst;
    }
    let perPage = 10;
    let page = req.body.page || 1;

    //Text Search query param

    if (req.body.search!==undefined  && req.body.search!=='') {
        let search = req.body.search;
        query = { $text: { $search: search}};
    }
    let sortQuery ={};
    sortQuery[sort] = sort_order;
    SchoolData.find(query).skip((perPage * page) - perPage).limit(perPage).sort(sortQuery)
        .exec(function(err, schoolData) {
            schoolData.shift();
            return res.status(200).send(schoolData);
        })
});


module.exports = schoolDataRouter;