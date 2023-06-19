import Express from "express";
import { DataTypes, Sequelize } from "sequelize";
import cors from "cors";
import * as dotenv from "dotenv";
import { CalendarEvent } from "../../business-planner-shared/src/CalendarEvent";
import { connectMindsDB } from "./mdbConn";


dotenv.config();

const app = Express();
app.use(cors());

app.listen(3000, () => console.log("Listening at port 3000!"));

connectMindsDB();

app.get('/', (req, res) => {
    const obj: CalendarEvent = {
        title: "default",
        description: "Default desc",
        date: new Date().toUTCString(),
        id: 1,
    };
    res.send(JSON.stringify(obj));
});
