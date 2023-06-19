import MindsDB from "mindsdb-js-sdk";
import { Database, Model, ModelPrediction } from "mindsdb-js-sdk";
import { Sequelize } from "sequelize";

async function mySQLtoMindsDB() {
    const sequelize = new Sequelize({
        username: "root",
        port: 3306,
        host: "127.0.0.1",
        dialect: "mysql",
        password: process.env.password,
    });
    try {
        await sequelize.authenticate();
        console.log("Sequelize Connected!");
    } catch (err) {
        console.log("Sequelize couldn't connect to MindsDB SQL.");     
        console.log(err);
    }
}

export async function connectMindsDB() {
    try {
        await MindsDB.connect({
            host: "http://127.0.0.1:47334",
            user: process.env.mdbuser as string,
            password: process.env.mdbpass as string,
        });
        console.log("Connected to MindsDB!");
    } catch (err) {
        console.log("Failed to authenticate to MindsDB");
        console.log(err);
    }
    try {
        const ConnectionOptions = {
            user: "root",
            port: 3306,
            password: process.env.password as string,
            host: "127.0.0.1",
            database: "businessplanner",
        }
        const db = await MindsDB.Databases.getDatabase("businessplanner");
        if(db == null) {
            const newdb = await MindsDB.Databases.createDatabase("businessplanner", "mysql", ConnectionOptions);
        }
    } catch (err) {
        console.log("Failed to connect MySQL to MindsDB.");
        console.log(err);
    }
    mySQLtoMindsDB();
}