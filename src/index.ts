import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { usersController } from "./controllers/users.controller";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { testDbConnection } from "./dbconfig/dbconfig";

// Load environmental variables
dotenv.config();

// =Validate App Variables=
if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

// =Express web framework=
const app = express();

// =App Configuration=
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", usersController);

app.use(errorHandler);
app.use(notFoundHandler);

testDbConnection();

// =Server Activation=
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
