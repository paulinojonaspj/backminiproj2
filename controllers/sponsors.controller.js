const Sponsors = require('../models/sponsors.model');
const {
    validationResult
} = require('express-validator');
const msgs = require("../messages/msg.messages");

exports.get = (req, res) => {

    Sponsors.find(req.query).populate("sponsors").exec((error, r) => {
        if (error) throw error;
        let message = msgs.success.s2;

        if (r.length < 0)
            message = msgs.success.s5;

        message.body = r;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Sponsors({
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade,
        empresa: req.body.empresa
       
    }).save((error, r) => {
        if (error) throw error;
        r.populate("sponsors", (error) => {
            if (error) throw error;
            let message = msgs.success.s0;
            message.body = r;
            return res.header("location", "/admin/sponsors/" + r._id).status(message.http).send(message);
        });

    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsors.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, r) => {
        if (error) throw error;
        if (!r) return res.status(msgs.error.e0.http).send(msgs.error.e0);
        r.populate("sponsors", (error) => {
            if (error) throw error;
            let message = msgs.success.s1;
            message.body = r;
            return res.status(message.http).send(message);
        });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsors.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(msgs.error.e0.http).send(msgs.error.e0);
        return res.status(msgs.success.s3.http).send(msgs.success.s3);
    });
}

exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);
    Sponsors.findOne({
        _id: req.params.id
    }).populate("sponsors").exec((error, r) => {
        if (error) throw error;
        if (!r) return res.status(msgs.error.e0.http).send(msgs.error.e0);
        let message = msgs.success.s2;
        message.body = r;
        return res.status(message.http).send(message);
    });

}
 