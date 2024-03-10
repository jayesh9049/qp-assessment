
// const pgconnection = require("./src/pgconnection.ts");  
// import { client, pgConnect } from "./src/pgconnection.ts";
const { client, pgConnect } = require("./src/pgconnection.ts");  
const express = require("express")
const bodyparser = require('body-parser')
const app = express() 

const port = process.env.PORT || 5000
console.log('client = ' );

// console.log('pg = ' , pgconnection);

app.use(bodyparser.json())

require("./routes/routes.ts")(app)

app.listen(port, async()=> {
    console.log(`Server is running on port ${port}`);
    console.log('await pgconnection.pgConnect = ' , await pgConnect());
})

try {
    let queryFunc = async() => {
        console.log('Running sample query ');
        const res = await client.query('SELECT * from market.groceries')
        console.log('res = ' , res.rows);
    }
queryFunc()

} catch (error) {
    console.log('error= ' , error);
}