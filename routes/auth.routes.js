/**
 *  POST localhost:8888/ecomm/api/v1/auth/singup
 * 
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", [authMiddleware.verifySignUpBody], authController.signup);

    /**
     * route for 
     * POST localhost:8081/ecomm/api/v1/auth/signin
     */
    app.post("/ecomm/api/v1/auth/signin", [authMiddleware.verifySignInBody],authController.signin);
}