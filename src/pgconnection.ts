const {Client} = require ("pg")


let client = new Client({
    host : process.env.DB_HOST || "localhost",
    user : process.env.DB_USER || "postgres",
    database  : process.env.DB_DATABASE || "qp_assesment",
    password : process.env.DB_PASS || "Jay@8090",
    port: process.env.DB_PORT || 5432
})

console.log('process.env.DB_HOST = ' , process.env.DB_HOST);

async function pgConnect() {
    return new Promise<String>(async(resolve, reject) => {
        client.connect()
        .then(() => {
            console.log('Connected to PostgreSQL database');
            return resolve ('connection success')
        }).catch((error: Error) => {
            console.error('Error connecting to PostgreSQL database:', error.message);
            reject(error);
        });
    })
}

// Listen for the 'error' event
client.on('error',(error: Error) => {
    console.error('Error connecting to PostgreSQL database:', error.message);
});
  
// Connect to the database
// client.connect();


export {client, pgConnect}

/*

const { Client } = require("pg");

let client = new Client({
    host: "localhost",
    user: "postgres",
    database: "qp_assesment",
    password: "Jay@8090",
    port: 5432
});

async function pgConnect() {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                console.log('Connected to PostgreSQL database');
                resolve('Connection successful');
            })
            .catch((error) => {
                console.error('Error connecting to PostgreSQL database:', error.message);
                reject(error);
            });

        // Listen for the 'error' event
        client.on('error', (error) => {
            console.error('Error connecting to PostgreSQL database:', error.message);
            reject(error);
        });
    });
}

// docker run --network=mynetwork --name=market -e POSTGRES_DB=marketdb -e POSTGRES_USER=jayesh -e POSTGRES_PASSWORD=Jay@8090 -d postgres:latest
//docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mydatabase
// Export the client and pgConnect function
export { client, pgConnect };

*/