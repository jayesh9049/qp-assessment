
import {Request, Response} from "express"
import {client} from "../pgconnection.ts"
export async function addGroceries (req: Request, res: Response) {
    try {
        console.log('req = ' , req.body);
        let payload = req.body
        if(!payload.UserType){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"User type not provided."})
        }
        if(payload.UserType && payload.UserType.toLowerCase() != 'admin'){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"User type must be admin to add groceries."})
        }
        if(!payload.Name){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocery name not provided."})
        }
        if(!payload.Price){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocery price not provided."})
        }
        if(!Number(payload.Price)){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Invalid Grocery price."})
        }
        let query = `INSERT INTO market.groceries
        ("name", price)
        VALUES('${payload.Name}', ${payload.Price});`
        let result = await client.query(query)
        if(result.rowCount > 0) return res.status(200).json({"ReturnCode":100,"ReturnMessage":"Grocerry added sucessfully."})
    } catch (error) {
        console.log('addGroceries_Error = ' , error);
        return res.status(200).json({"ReturnCode":104,"ReturnMessage":"Operation Failed."})
    }
}

export async function updateGroceriesPrice (req: Request, res: Response) {
    try {
        console.log('req = ' , req.body);
        let payload = req.body
        if(!payload.UserType){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"User type not provided."})
        }
        if(payload.UserType && payload.UserType.toLowerCase() != 'admin'){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"User type must be admin to update groceries."})
        }
        if(!payload.Name){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocery name not provided."})
        }
        if(!payload.Price){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocery price not provided."})
        }
        if(!Number(payload.Price)){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Invalid Grocery price."})
        }
        let getGroceries = `SELECT id from market.groceries where name = '${payload.Name}'`
        let getGroceriesresult = await client.query(getGroceries)
        if(getGroceriesresult.rowCount == 0){return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocerry not found"})}
        let query = `UPDATE market.groceries
        SET price = ${payload.Price}
        WHERE name = '${payload.Name}'`
        let result = await client.query(query)
        if(result.rowCount > 0) return res.status(200).json({"ReturnCode":100,"ReturnMessage":"Grocerry updated sucessfully."})
    } catch (error) {
        console.log('updateGroceries_Error = ' , error);
        return res.status(200).json({"ReturnCode":104,"ReturnMessage":"Operation Failed."})
    }
}

export async function getAllGroceries (req: Request, res: Response) {
    try {
        let payload = req.body
        let resarr = await client.query('SELECT * from market.groceries')
        if(resarr.rowCount == 0){return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocerry not found"})}
        return res.status(200).json({"ReturnCode":100,"ReturnMessage":"Sucessfull","Groceries":resarr.rows})
    } catch (error) {
        console.log('getGroceries_Error = ' , error);
        return res.status(200).json({"ReturnCode":104,"ReturnMessage":"Operation Failed."})
    }
}


export async function removeGroceries (req: Request, res: Response) {
    try {
        let payload = req.body
        if(!payload.UserType){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"User type not provided."})
        }
        if(payload.UserType && payload.UserType.toLowerCase() != 'admin'){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"User type must be admin to remove groceries."})
        }
        if(!payload.Name){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocery name not provided."})
        }
        let result = await client.query(`DELETE FROM market.groceries WHERE name = '${payload.Name}'`)
        if(result.rowCount == 0){return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocerry not found"})}
        return res.status(200).json({"ReturnCode":100,"ReturnMessage":`${payload.Name} removed`})
    } catch (error) {
        console.log('removeGroceries_Error = ' , error);
        return res.status(200).json({"ReturnCode":104,"ReturnMessage":"Operation Failed."})
    }
}

export async function bookGroceries (req: Request, res: Response) {
    try {
        let payload = req.body
        if(!payload.Name){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocery name not provided."})
        }
        if(!payload.Quantity){
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Quantity not provided."})
        }
        if (!(typeof payload.Quantity == 'number' && Number.isInteger(payload.Quantity))) {
            return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Quantity should be number."})
        }
        let result = await client.query(`SELECT name, quantity FROM market.groceries WHERE name = '${payload.Name}'`)
        if(result.rowCount == 0){return res.status(200).json({"ReturnCode":101,"ReturnMessage":"Grocerry not found"})}
        if(result.rows[0].quantity < payload.Quantity) return res.status(200).json({"ReturnCode":100,"ReturnMessage":`${payload.Quantity} ${payload.Name} not available`, "Available Quantity": result.rows[0].quantity ? result.rows[0].quantity : 0 })
        client.query(`UPDATE market.groceries set quantity = quantity - ${payload.Quantity} WHERE name = '${payload.Name}'`)
        return res.status(200).json({"ReturnCode":100,"ReturnMessage":`${payload.Quantity} ${payload.Name} Booked`, "QuantityLeft": result.rows[0].quantity - payload.Quantity})
    } catch (error) {
        console.log('removeGroceries_Error = ' , error);
        return res.status(200).json({"ReturnCode":104,"ReturnMessage":"Operation Failed."})
    }
}