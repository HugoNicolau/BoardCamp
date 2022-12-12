import { connectionDB } from "../database/database.js";

export async function getCategories(req, res){
try{

    const categories = await connectionDB.query(`SELECT * FROM categories;`);

    res.status(200).send(categories.rows);
}   catch(err){
    console.log(err);
    res.sendStatus(500);
}
}

export async function postCategories (req, res){
    const name = res.locals.name;
    
    
    try{
        const categorie = await connectionDB.query(`INSERT INTO categories (name) VALUES ($1);`,[name])
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

