export interface person{
    name:string;
    phone:number;
    email:string;
    address:string;
    gender:Gender;
}
export enum Gender
{
    Male='male',
    Feamale='female',
    Other='other'
}