// =Data Model Interfaces=
import { User, UserItem } from "../models/user.interface";
import { Users } from "../models/users.interface";

// =In-Memory Store=
let users: Users = {
    1: {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": -37.3159,
              "lng": 81.1496
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
    2: {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
              "lat": -43.9509,
              "lng": -34.4618
            }
          },
          "phone": "010-692-6593 x09125",
          "website": "anastasia.net",
          "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
          }
        },
    3: {
          "id": 3,
          "name": "Clementine Bauch",
          "username": "Samantha",
          "email": "Nathan@yesenia.net",
          "address": {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
            "geo": {
              "lat": -68.6102,
              "lng": -47.0653
            }
          },
          "phone": "1-463-123-4447",
          "website": "ramiro.info",
          "company": {
            "name": "Romaguera-Jacobson",
            "catchPhrase": "Face to face bifurcated interface",
            "bs": "e-enable strategic applications"
          }
        }
 };

// =Service Methods=

// User needs to have options from UI to list, create, remove, and update records.
interface IUsersDataService {
    list(): Promise<UserItem[]>;
    find(id: number): Promise<UserItem>;
    create(item: User): Promise<UserItem>;
    update(id: number, item: User): Promise<UserItem | null>;
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

    async list(): Promise<UserItem[]> {
        return Object.values(users);
    }

    async find(id: number): Promise<UserItem> {
        return users[id];
    }

    async create(item: User): Promise<UserItem> {
        const id = new Date().valueOf();
        
        users[id] = { id, ...item };
        
        return users[id];
    }

    async update(id: number, item: User): Promise<UserItem | null> {
        const user = await this.find(id);

        if (!user) {
            return null;
        }

        users[id] = { id, ...item };

        return users[id];
    }

    async remove(id: number): Promise<null | void> {
        const user = await this.find(id);
  
        if (!user) {
            return null;
        }
    
        delete users[id];
    }
}
