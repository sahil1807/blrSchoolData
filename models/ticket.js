var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticket = new Schema(
    {
        ticketNumber: String,
        title: String,
        type: String,
        team: String,
        description: String,
        time: String,
        priority: String,
        image: String,
        createdBy:{
            uid: String,
            name: String,
            url: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Ticket', ticket);