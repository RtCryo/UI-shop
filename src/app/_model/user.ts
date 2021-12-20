import { Role } from "./role";
import { Status } from "./status";


export class User{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: Role;
    public status!: Status;
    public enabled!: boolean;
    public token!: string;
}