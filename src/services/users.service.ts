// import { QueryResult } from "pg";

// =Data Model Interfaces=
import { User, Users } from "../models/user.interface";

// =Service Methods=

// Note: Regarding ErrorHandlong - the try-catch is on the top-most level (controller)

// User needs to have options from UI to list, create, remove, and update records.
interface IUsersDataService {
    list(): Promise<User[]>;
    find(id: number): Promise<User | null>;
    create(item: User): Promise<User>;
    update(id: number, item: User): Promise<User | null>;
    remove(id: number): Promise<null | void>;
}

// usage: const usersDataService = await UsersDataService.build()
export default class UsersDataService implements IUsersDataService {
    constructor() {
        // set props normally
        // Note: nothing async can go here!
    }  

    public static async build(): Promise<UsersDataService> {
        // async stuff here
        return new UsersDataService()
    }

    async list(): Promise<User[]> {
        // const result: QueryResult = await pool.query('SELECT * FROM users ORDER BY id ASC');
        // Object.values(result.rows)
        const result = Users.findAll({
            //order: sequelize.literal('id ASC'),
            order: [
                ['id', 'ASC']
            ]
        });

        return result;
    }

    async find(id: number): Promise<User | null> {
        //const result: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        const result = Users.findOne({
            where: {
                id: id
            }
        });

        return result;
    }

    async create(item: User): Promise<User> {
        item.id = BigInt(new Date().valueOf());
        const result = Users.create(item);

        return result;
    }

    async update(id: number, item: User): Promise<User | null> {
        let user = await this.find(id);

        if (!user) {
            return null;
        }

        item.updatedAt = new Date();

        await Users.update(item, {
            where: {
              id: id
            }
        });

        user = await this.find(id);

        return user;
    }

    async remove(id: number): Promise<null | void> {
        const user = await this.find(id);
  
        if (!user) {
            return null;
        }

        await Users.destroy({
            where: {
              id: id
            }
        });
    }
}
