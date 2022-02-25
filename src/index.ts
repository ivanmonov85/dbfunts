import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { usersRouter } from "./routers/users.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

// Load local environmental variables
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

app.use("/api/v1/users", usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

// =Server Activation=
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});