import { Client } from 'pg';
import '../configs/env_configs';

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

/**
PostgreSQL database client. 
This client is used to connect to the PostgreSQL database.

The Client class is imported from the pg module.
The environment variables are imported from the env_configs module.
The database connection details are extracted from the environment variables.
*/
const postgresqlDatabaseClient = new Client({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: parseInt(dbPort),
});


/**
The connect method is called on the postgresqlDatabaseClient object to connect to the PostgreSQL database.
If the connection is successful, a message is logged to the console.
If there is an error connecting to the database, an error message is logged to the console.
*/
postgresqlDatabaseClient.connect().then(() => {
    console.log('Connected to PostgreSQL database');
}).catch((error) => {
    console.error('Error connecting to PostgreSQL database', error);
});

/**
Method for executing SQL scripts on the PostgreSQL database.
Allows for executing SQL queries with parameters.
*/
export const execute = async (text: string, params?: unknown[]) => {
    const res = await postgresqlDatabaseClient.query(text, params);
    return res;
};