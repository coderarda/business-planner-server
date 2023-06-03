import Express from "express";
import { DataTypes, Sequelize } from "sequelize";
import cors from "cors";
import * as dotenv from "dotenv";
import { CalendarEvent } from "../../business-planner-shared/src/CalendarEvent";

dotenv.config();

const app = Express();
app.use(cors());

app.listen(3000, () => console.log("Listening at port 5000!"));


const sequelize = new Sequelize({
    username: "root",
    password: process.env.password,
    database: process.env.database,
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected!");
    })
    .catch((err) => {
        console.log("Error connecting: " + err);
    });

const Developer = sequelize.define("Developer", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

async () => {
    const dev = Developer.create({ firstName: "Arda", lastName: "Akcagöz" });
    if (dev instanceof Developer) {
        await dev.save();
    }
}


app.get('/', (req, res) => {
    const obj : CalendarEvent = {
        title: "default",
        description: "Default desc",
        date: new Date().toUTCString(),
        id:1,
    };
    res.send(JSON.stringify(obj));
});
