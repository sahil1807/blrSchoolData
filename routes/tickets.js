var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var logger = require("../logger");
var Ticket = require('../models/ticket');

var ticketRouter = express.Router();

ticketRouter.use(bodyParser.json());


ticketRouter.route('/getAllTickets')

    .get(function (req, res, next) {
        Ticket.find({}, function (err, result) {
            if (err){
                logger.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(result);
        })
    });

ticketRouter.route('/getTicketsByType/:type')

    .get(function (req, res, next) {
        Ticket.find({type: req.params.type}, function (err, result) {
            if (err){
                logger.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(result);
        })
    });

ticketRouter.route('/createTicket')

    .post(function(req, res, next) {
        Ticket.create(req.body, function(err, result) {
            if (err){
                logger.error(err);
                return res.status(500).send(err);
            }
            logger.debug("Ticket created Successfully - : \n" +result);
            User.findOne({uid: req.body.createdBy.uid}, function(err, user) {
                if (err) {
                    return res.status(500).send(err);
                }
                var ticketData = {
                    ticketNumber: req.body.ticketNumber,
                    title: req.body.title,
                    type: req.body.type,
                    team: req.body.team,
                    description: req.body.description,
                    time: req.body.time,
                    priority: req.body.priority,
                    image: req.body.image
                };

                if(user.tickets){
                    user.tickets.push(ticketData);
                } else {
                    user.tickets = [];
                    user.tickets.push(ticketData);
                }
                user.save(function (err, updatedUser) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.status(200).send({
                        userInfo: updatedUser,
                        userdata: result
                    });
                })
            })
        });
    });

ticketRouter.route('/getTicket/:ticketId')

    .get(function(req, res, next) {
        Ticket.findOne({ticketNumber: req.params.ticketNumber}, function(err, result) {
            if (err){
                logger.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(result);
        })
    });



module.exports = ticketRouter;