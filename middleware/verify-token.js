const { query } = require('express');
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token=req.headers['x-access-token'] || req.body.token || req.query.token
    if(token){
        jwt.verify(token, req.app.get('api_secret_key'),(err,decode) => {
            if(err){
                res.json({
                    status:false,
                    message:'failed to authenticate'
                })
            }else{
                req.decode = decode;
                next();
            }
        });
    }else{
        res.json({
            status:false,
            message: 'no token provided'
        })
    }
};