require('dotenv').config();
const express = require('express');
const braintree = require("braintree");

const paymentRoute = new express.Router();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
});

paymentRoute.get('/geneate/token', (req, res) => {
    gateway.clientToken.generate({}).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

paymentRoute.post("/checkout", (req, res) => {
    const nonceFromTheClient = req.body.payment_method_nonce;
    const {amount} = req.body;

    gateway.transaction.sale({
        amount: amount ,
        paymentMethodNonce: nonceFromTheClient, 
        options: {
            submitForSettlement: true
        }
    }).then(result => { res.status(200).send(result ); })
    .catch((err) => {
        res.status(500).send(err);
    });;
});

module.exports = paymentRoute;