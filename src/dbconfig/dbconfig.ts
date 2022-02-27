import * as dotenv from "dotenv";
// import { Pool } from 'pg';
import { Sequelize } from 'sequelize';

// export const pool = new Pool ({
//     max: 20,
//     //connectionString: 'postgres://user:password@hostname:port/dbname',
//     connectionString: 'postgres://postgres:Sl0jnaP@rola123@postgres:5432/dbfunts',
//     idleTimeoutMillis: 30000
// });

// Load environmental variables
dotenv.config();

export const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

export async function testDbConnection() : Promise<void> {
    await sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}
