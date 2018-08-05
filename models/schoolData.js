const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolData = new Schema(
    {
        district: String,
        block: String,
        cluster: String,
        schoolid: String,
        schoolname: String,
        category: String,
        gender: String,
        medium_of_inst: String,
        address: String,
        area: String,
        pincode: String,
        landmark: String,
        identification1: String,
        busroutes: String,
        identification2: String,
        latlong: String
    },
    {
        timestamps: true
    }
);

schoolData.index({schoolname: 'text', address: 'text', area: 'text', pincode: 'text', landmark: 'text'});

module.exports = mongoose.model('School', schoolData);