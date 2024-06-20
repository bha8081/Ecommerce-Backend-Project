const category_model = require("../models/category.model.js")

/**
 * Controller for creating the category
 * 
 * POST: localhost:8080/ecom/api/v1/categories
 * 
 *  {
 *      "name": "Electronics"
 *      "description": "This will have all the Electronics items."
 *  }
 */

exports.createNewCategory = async (req, res) => {
    
    // Read the req body.

    // Create the category object.
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }

    try {
        // Insert into monogodb.
        const category = await category_model.create(cat_data)
        return res.status(201).send(category)
    } catch (error) {
        console.log("Error while creating the category", error)
        return res.status(500).send({
            message: "Error while creating the category"
        })
    }

    // return the response of the created category.
}