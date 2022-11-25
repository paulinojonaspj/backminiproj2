const Experts = require('../models/experts.model');
const {
    validationResult
} = require('express-validator');
const msgs = require("../messages/msg.messages");

exports.get = (req, res) => {

    Experts.find(req.query).populate("experts").exec((error, r) => {
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

    new Experts({
        nome: req.body.nome,
        formacao: req.body.formacao,
        telefone: req.body.telefone
       
    }).save((error, r) => {
        if (error) throw error;
        r.populate("experts", (error) => {
            if (error) throw error;
            let message = msgs.success.s0;
            message.body = r;
            return res.header("location", "/admin/experts/" + r._id).status(message.http).send(message);
        });

    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Experts.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, r) => {
        if (error) throw error;
        if (!r) return res.status(msgs.error.e0.http).send(msgs.error.e0);
        r.populate("experts", (error) => {
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

    Experts.deleteOne({
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
    Experts.findOne({
        _id: req.params.id
    }).populate("experts").exec((error, r) => {
        if (error) throw error;
        if (!r) return res.status(msgs.error.e0.http).send(msgs.error.e0);
        let message = msgs.success.s2;
        message.body = r;
        return res.status(message.http).send(message);
    });

}
 