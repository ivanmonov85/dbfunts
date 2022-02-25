import { Address } from "../types/address.type"
import { Company } from "../types/company.type";

export interface User {
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface UserItem extends User {
    id: number;
}
