import Express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { CalendarEvent } from "../../business-planner-shared/src/CalendarEvent";


dotenv.config();

const app = Express();
app.use(cors());

app.listen(3000, () => console.log("Listening at port 3000!"));

app.get('/', (req, res) => {
    const obj: CalendarEvent = {
        title: "default",
        description: "Default desc",
        date: new Date().toUTCString(),
        id: 1,
    };
    res.send(JSON.stringify(obj));
});
