/**
 *  This will we the starting file of the project.
 */

const express = require("express");
const mongoose = require("mongoose");

const server_config = require("./configs/server.config.js");
const db_config = require("./configs/db.config.js");
const user_model = require("./models/user.model.js");
const bcrypt = require("bcryptjs");


const app = express();

app.use(express.json())

/**
 * Create an admin user at the starting of the application
 * if not already present.
 */


// Connection with the mongo database.
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", () => {
    console.log("Error while connecting to the mongoDB.")
});

db.once("open", () => {
    console.log("Connected to MongoDB")
    init()
});

async function init() {
    try {
        let user = await user_model.findOne({userId: "admin"})

        if(user) {
            console.log("Admin is already present");
            return
        }

    } catch(err) {
        console.log("Error while reading the data", err)
    }

    try {
        user = await user_model.create({
            name: "Raju",
            userId: "raju",
            email: "raju@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("raju@123", 8)
        })
        console.log("Admin created ", user)
    } catch(err) {
        console.log("Error while create Admin", err)
    }
}

/**
 *  Stich the route to the server
 */
require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)


/**
 *  Strat the server.
 */

app.listen(server_config.PORT, () => {
    console.log("Server is running on port num : ", server_config.PORT);
});
