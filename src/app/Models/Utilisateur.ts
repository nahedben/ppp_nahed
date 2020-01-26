import { Product } from './Product';

export class Utilisateur {
    public id:string;
    public FirstName:string;
    public LastName:string;
    public UserName:string;
    public Password:string;
    public Email:string;
    public Role:String;
    public Products?:Product[];
    public CreationDate?:Date;
    public Picture:string;
    public Addresse:string;
  
    public phoneNumber:number;

}