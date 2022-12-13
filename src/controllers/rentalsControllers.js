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


export async function postRentals(req, res){

    const rental = res.locals.rentalObj;
    const {customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = rental;
    try{
        await connectionDB.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`,[customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
        return res.sendStatus(201)
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

}