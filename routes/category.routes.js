/**
 * POST: localhost:8000/ecomm/api/v1/categories
 */

category_controller = require("../controllers/category.controller.js");
auth_mw = require("../middlewares/auth.middleware.js");

module.exports = (app) => {
    app.post("/ecomm/api/v1/categories", [auth_mw.verifyToken, auth_mw.isAdmin],category_controller.createNewCategory)
}