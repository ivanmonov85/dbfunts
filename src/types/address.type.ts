import { Coordinates } from "./coordinates.type";

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Coordinates;
}