import { connectionDB } from "../database/database.js";
import { rentalSchema } from "../models/rentalsModels.js";
import dayjs from "dayjs";

export async function rentalSchemaValidation(req, res, next){
    const rental = req.body;
    const { customerId, gameId, daysRented } = rental;


    try{

        const findCustomer = (await connectionDB.query(`SELECT * FROM customers WHERE id = $1;`,[customerId])).rows;
        if(!findCustomer){
            
            return res.sendStatus(400);
        }
        const findGame = await connectionDB.query(`SELECT * FROM games WHERE id = $1;`,[gameId]);
        
        if(!findGame || findGame.rowCount<1){
            
            return res.sendStatus(400);
        }
        if(daysRented <1){
        return res.sendStatus(400);
        
    }
    const gamesAvailable = (await connectionDB.query(`SELECT "stockTotal" FROM games WHERE id=$1;`,[gameId])).rows[0].stockTotal;
    console.log(gamesAvailable,"available");
    
    const gamesRented = (await connectionDB.query(`SELECT * FROM rentals WHERE "gameId" = $1;`,[gameId])).rows.length;
    
    
    if(gamesRented >= gamesAvailable){
        return res.sendStatus(400);
        
    }
    
    const getPrice = (await connectionDB.query(`SELECT "pricePerDay" FROM games WHERE id = $1;`,[gameId])).rows[0].pricePerDay;
    const rentDate = dayjs().format(`YYYY/MM/DD`);
    const returnDate = null;
    const originalPrice = Number(getPrice)*Number(daysRented);
    const delayFee = null;
    
    const rentalObject = {
        
        customerId,
        gameId,
        rentDate,   
        daysRented,             
        returnDate,         
        originalPrice,       
        delayFee             
        
    }
    
    const {error} = rentalSchema.validate(rentalObject, {abortEarly:false});
    if(error){
        console.log(findCustomer, "customerrr");
        
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    
    res.locals.rentalObj = rentalObject;
    next();
}catch(err){
    console.log(err);
    return res.sendStatus(500);
}
}