/**
 * I need to write the controller / logic to register a user.
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { user_model } = require("../models/user.model.js");
const secret = require("../configs/auth.config.js");

exports.signup = async (req, res) => {
    /**
     * Logic to create the user
     */
    
    // 1. Read the request body
    const request_body = req.body 


    // 2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {
        const user_created = await user_model.create(userObj)

        // Return this user
        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updateAt
        } 

        res.status(201).send(res_obj)

    } catch(error) {
        console.log("Error while registering the user", error)
        res.status(500).send({
            message: "Some error while registering the user"
        })
    }


    // 3. Return the response back to the user
}

exports.signin = async (req, res) => {

    // Check if the user id is present in the system.
    const user = await user_model.findOne({userId: req.body.userId})

    if(user == null) {
        return res.status(400).send({
            message: "User id passed is not a valid user id"
        })
    }

    // Password is correct
    const isPasswordValid = bcrypt.compareSync(res.body.password, user.password)

    if(!isPasswordValid) {
        return res.status(401).send({
            message: "Wrong password passed"
        })
    }

    // using JWT we will create the acces token with a given TTL and return.
    const token = jwt.sign({ id: user.userId }, secret.secret, {
        expiresIn : 120 // 2 min
    });

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token,
    });
}