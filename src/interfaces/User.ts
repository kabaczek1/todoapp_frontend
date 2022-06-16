export interface IUserLS {
    name: string;
    email: string;
}

export interface IUser extends IUserLS {
    password: string;
}
