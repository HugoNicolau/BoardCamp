import { connectionDB } from "../database/database.js";

export async function getRentals(req, res){
    const findCustomer = req.query.customerId;
    const findGame = req.query.gameId;
    try{
        if(findCustomer){
        const allRentals = await connectionDB.query(`
        SELECT rentals.*, json_build_object('id',customers.id, 'name', customers.name) 
        AS customer, json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) 
        AS game 
        FROM rentals 
        JOIN customers ON "customerId" = customers.id 
        JOIN games ON "gameId" = games.id
        JOIN categories ON categories.id = games."categoryId" 
        WHERE "customerId"=($1);`,[findCustomer])
            return res.status(200).send(allRentals.rows);
        }
        if(findGame){
            const allRentals = await connectionDB.query(`
            SELECT rentals.*, json_build_object('id',customers.id, 'name', customers.name) 
            AS customer, json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) 
            AS game 
            FROM rentals 
            JOIN customers ON "customerId" = customers.id 
            JOIN games ON "gameId" = games.id
            JOIN categories ON categories.id = games."categoryId" 
            WHERE "gameId"=($1);`,[findGame])
                return res.status(200).send(allRentals.rows);
            }
        const allRentals = await connectionDB.query(`
        SELECT rentals.*, json_build_object('id',customers.id, 'name', customers.name) 
        AS customer, json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) 
        AS game 
        FROM rentals 
        JOIN customers ON "customerId" = customers.id 
        JOIN games ON "gameId" = games.id
        JOIN categories ON categories.id = games."categoryId"; 
        `);
        return res.status(200).send(allRentals.rows);
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