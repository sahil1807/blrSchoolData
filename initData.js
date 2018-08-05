const csvFilePath='data/Bangalore_schools.csv';
const csv=require('csvtojson');
const fs = require('fs');
const SchoolData = require('./models/schoolData.js');

exports.init = function () {

    SchoolData.countDocuments({}, function(err, count){
        console.log( "Number of docs: ", count );
        if(count <1){
            csv({
                delimiter: '|'
            })
                .fromFile(csvFilePath)
                .then((jsonObj)=>{
                    console.log("Total data");
                    console.log(jsonObj.length);
                    jsonObj.shift();
                    SchoolData.insertMany(jsonObj, function(error, docs) {
                        console.log(docs);
                    });
                    fs.writeFile("data/schoolData.json", JSON.stringify(jsonObj), function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
        }
    });

};