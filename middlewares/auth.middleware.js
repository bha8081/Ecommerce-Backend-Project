const user_model = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config.js");

/**
 * Create a new will check if the request body is proper and correct
 */

const verifySignUpBody = async (req, res, next) => {

    try {
        // Check for the name
        if (!req.body.name) {
            return res.status(400).send({ 
                message: "Failed ! Name was not provid in request body" 
            });
        }

        // Check for the email
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed ! Email was not provid in request body"
            })
        }

        // Check for the userId
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed ! UserId was not provid in request body"
            })
        }

        // Check if the user with the same userId is already presen
        const user = await user_model.findOne({userId: req.body.userId})

        if(user) {
            return res.status(400).send({
                message: "Failed ! user with the same userId is already present!!"
            })
        }

        next()

    } catch(err) {
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
}

const verifySignInBody = async (req, res, next) => {

    if(!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId was not provid"
        })
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password was not provid"
        })
    }
    next();
}

// check the category creating token
const verifyToken = async (req, res, next) => {
    // Check if the token is present in the header.
    const token = req.headers["x-access-token"]

    if(!token) {
        return res.status(403).send({
            message: "No token found : UnAuthorized"
        })
    }

    // If it's the valid token.
    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: "UnAuthorized !"
            })
        }
        const user = await user_model.findOne({userId: decoded.id})
        if(!user) {
            return res.status(404).send({
                message: "UnAuthorized, this user for this token doesn't exist"
            })
        }
        // Set the user info in the req body
        req.user = user
        next();
    });

    // Then move to the step.

};

// Create category only Admin.
const isAdmin = (req, res, next) => {
    const user = req.user
    if(user && user.userType == "ADMIN") {
        next()
    } else {
        return res.status(403).send({
            message: "Only Admin users are allowed to access this endpoint."
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}