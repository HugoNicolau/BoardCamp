import { gameSchema } from "../models/gamesModels.js";
import { connectionDB } from "../database/database.js";

export async function gameSchemaValidation(req, res, next){
    const game = req.body;
    if(game.name.length <1 || !game.name){
        return res.sendStatus(400);
    }
    if(game.stockTotal <1 || !game.stockTotal){
        return res.sendStatus(400);
    }
    if(game.pricePerDay <1 || !game.pricePerDay){
        return res.sendStatus(400);
    }
    const { error } = gameSchema.validate(game, { abordEarly: false});
    if(error){
        const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
    }
    
    const gameExists = await connectionDB.query(`SELECT name FROM games WHERE name = $1;`,[game.name]);
    if(gameExists.rowCount > 0){
        return res.status(409).send("Este jogo já existe");
    }

    res.locals.game = game;
    next();
}