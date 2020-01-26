import { Utilisateur } from './Utilisateur';

export class Product {
    public id:string;
    //simple attributs
    public Title:string;
    public Description:string;
    public Type:string;
    public Price:number;
    //gallery images 
    public Pictures:string[];
    //complextypes
    public AddDate:Date;
    public Selled:boolean;
    public User:string;

    //userpicturetest
    public UserPicture?:string;
    
}