import { Client } from 'pg';
import '../configs/env_configs';

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

console.log(dbHost, dbPort, dbUser, dbPassword, dbName);
export const postgresqlDatabaseClient = new Client({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: parseInt(dbPort),
});

postgresqlDatabaseClient.connect().then(() => {
    console.log('Connected to PostgreSQL database');
}).catch((error) => {
    console.error('Error connecting to PostgreSQL database', error);
});