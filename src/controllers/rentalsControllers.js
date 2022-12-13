import { connectionDB } from "../database/database.js";

export async function getRentals(req, res){
    const findCustomer = req.query.customerId;
    const findGame = req.query.gameId;
    try{
        if(findCustomer){
        const allRentals = await connectionDB.query(`SELECT * FROM rentals JOIN customers ON "customerId" = customers.id JOIN games ON "gameId" = games.id WHERE "customerId" ILIKE ($1);`,[findCustomer])
            return res.status(200).send(allRentals);
        }
        if(findGame){
            const allRentals = await connectionDB.query(`SELECT * FROM rentals JOIN customers ON "customerId" = customers.id JOIN games ON "gameId" = games.id WHERE "gameId" ILIKE ($1);`,[findGame])
                return res.status(200).send(allRentals);
            }
        const allRentals = await connectionDB.query(`SELECT * FROM rentals JOIN customers ON "customerId" = customers.id JOIN games ON "gameId" = games.id;`)
        console.log(allRentals);
        return res.status(200).send(allRentals);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}