export interface person{
    id?:number | string;
    name:string;
    phone:number;
    email:string;
    address:string;
    gender:Gender;
}
export enum Gender
{
    male='Male',
    female='Female',
    other='Other'
}