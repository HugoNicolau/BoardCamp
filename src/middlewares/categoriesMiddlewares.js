import { categorySchema } from "../models/categoriesModel.js";
import { connectionDB } from "../database/database.js";

export async function categogySchemaValidation(req, res, next){


    const category = req.body
    const { name } = category;

    if(name === '' || !name){
        return res.status(400).send("O campo name está vazio")
    }
    const { error } = categorySchema.validate(category, { abordEarly: false});
    if(error){
        const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
    }

    const nameExists = await connectionDB.query(`SELECT name FROM categories WHERE name =$1;`,[name]);
    if(nameExists.rowCount > 0){
        return res.status(409).send("Essa categoria já existe");
    }

    res.locals.name = name;
    next();

}