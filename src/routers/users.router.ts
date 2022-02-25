import express, { Request, Response } from "express";
import UserDataService from "../services/users.service";
import { UserItem, User } from "../models/user.interface";

// =Router Definition=
export const usersRouter = express.Router();

// =Controller Definitions=

// GET users
usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const userDataService = await UserDataService.build();
        const users: UserItem[] = await userDataService.list();

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

// GET users/:id
usersRouter.get("/:id", async (req: Request, res: Response) => {
  
    const id: number = parseInt(req.params.id, 10);

    try {
        const userDataService = await UserDataService.build();
        const user: UserItem = await userDataService.find(id);
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

// POST users
usersRouter.post("/", async (req: Request, res: Response) => {
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
usersRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
        const userDataService = await UserDataService.build();
        const user: UserItem = req.body;
        const existingUser: UserItem = await userDataService.find(id);
  
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
usersRouter.delete("/:id", async (req: Request, res: Response) => {
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