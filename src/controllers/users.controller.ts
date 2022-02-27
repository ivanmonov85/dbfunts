import express, { Request, Response } from "express";
import UserDataService from "../services/users.service";
import { User } from "../models/user.interface";
import { checkJwt } from "../middleware/auth.middleware";

// =Router Definition=
export const usersController = express.Router();

// =Controller Definitions=

// Public API endpoints
// GET users
usersController.get("/", async (req: Request, res: Response) => {
    try {
        const userDataService = await UserDataService.build();
        const users: User[] = await userDataService.list();

        res.status(200).send(users);

    } catch (ex) {
        let errorMessage = "Failed to Get list of users";
        if (ex instanceof Error) {
            errorMessage = ex.message;
        }
        console.log(errorMessage);

        res.status(500).send(errorMessage);
    }
});

// Protected API endpoints
usersController.use(checkJwt);

// GET users/:id
usersController.get("/:id", async (req: Request, res: Response) => {
  
    const id: number = parseInt(req.params.id, 10);

    try {
        const userDataService = await UserDataService.build();
        const user = await userDataService.find(id);
        if (user) {
            return res.status(200).send(user);
        }

        res.status(404).send("User not found");

    } catch (ex) {
        let errorMessage = "Failed to Get user";
        if (ex instanceof Error) {
            errorMessage = ex.message;
        }
        console.log(errorMessage);

        res.status(500).send(errorMessage);
    }
});

// Protected API endpoints
usersController.use(checkJwt);

// POST users
usersController.post("/", async (req: Request, res: Response) => {
    try {
        const userDataService = await UserDataService.build();
        const user: User = req.body;
        const newUser = await userDataService.create(user);
  
        res.status(201).json(newUser);

    } catch (ex) {
        let errorMessage = "Failed to Create users";
        if (ex instanceof Error) {
            errorMessage = ex.message;
        }
        console.log(errorMessage);

        res.status(500).send(errorMessage);
    }
});

// PUT users/:id
usersController.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
        const userDataService = await UserDataService.build();
        const user: User = req.body;
        const existingUser = await userDataService.find(id);
  
        if (existingUser) {
            const updatedUser = await userDataService.update(id, user);
            return res.status(200).json(updatedUser);
        }

        // Create user if not existing
        const newUser = await userDataService.create(user);
  
        res.status(201).json(newUser);

    } catch (ex) {
        let errorMessage = "Failed to Update user";
        if (ex instanceof Error) {
            errorMessage = ex.message;
        }
        console.log(errorMessage);

        res.status(500).send(errorMessage);
    }
});

// DELETE users/:id
usersController.delete("/:id", async (req: Request, res: Response) => {
    try {
        const userDataService = await UserDataService.build();
        const id: number = parseInt(req.params.id, 10);
        await userDataService.remove(id);
  
        res.sendStatus(204);

    } catch (ex) {
        let errorMessage = "Failed to Delete user";
        if (ex instanceof Error) {
            errorMessage = ex.message;
        }
        console.log(errorMessage);

        res.status(500).send(errorMessage);
    }
});