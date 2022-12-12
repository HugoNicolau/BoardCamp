import { connectionDB } from "../database/database.js";

export async function getCustomers(req, res){
    const findCustomer = req.query.cpf

    if(findCustomer){
        const searching = await connectionDB.query(`SELECT * FROM customers WHERE name ILIKE ($1);`,[`${findCustomer}%`])
        return res.status(200).send(searching.rows);
    }

    try{
        const customers = await connectionDB.query(`Select * FROM customers`);
        return res.status(200).send(customers.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postCustomers(req, res){
    const customer = res.locals.customer;
    const {name, phone, cpf, birthday} = customer;
    try{
        const games = await connectionDB.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,[name, phone, cpf, birthday]);  
        return res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}