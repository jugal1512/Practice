export interface ILogin{
    UserName : string;
    Password : string;
    RoleName : string;
}

export interface IRegister{
    UserName : string;
    Email : string;
    PasswordHash : string;
    RoleName : string;
}