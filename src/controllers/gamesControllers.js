import { connectionDB } from "../database/database.js";

export async function getGames(req,res){
    const findGame = req.query;

    if(findGame){
        const searching = await connectionDB.query(`SELECT * FROM games WHERE LOWER(name) LIKE LOWER($1%);`,[findGame]);
        return res.status(200).send(searching.rows);
    }

    try{
        const games = await connectionDB.query(`SELECT * FROM games`)
        return res.status(200).send(games.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

