import { Sequelize } from 'sequelize';

// Create the connection to SQL Express or any other database
const sequelize = new Sequelize('navegador', 'root', 'password', {
    host: 'localhost',
    dialect: 'mssql'  // If you're using SQL Server, otherwise use 'mysql', 'postgres', etc.
});

export default sequelize;
