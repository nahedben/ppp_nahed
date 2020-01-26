import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Utilisateur } from '../Models/Utilisateur';
import { Product } from '../Models/Product';
import { analytics } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  constructor(private firestore: AngularFirestore) { }

  createProduct(Product: Product,Pictures:string[]){
    console.log("pictures in serv")
   console.log(Pictures)
   
   const prod ={
     id:null,
 Title:Product.Title,
   Description:Product.Description,
    Type:Product.Type,
    Pictures:Pictures,
   Price:Product.Price,  
   AddDate:Product.AddDate,
    Selled:false,
  User:Product.User
   }  

   return this.firestore.collection(`Products`).add(prod).then(docRef => {
       docRef.update({id: docRef.id});
    
     })
  .catch(error => console.error("Error adding document: ", error)) ;  
}

getProductsByUserId(userId){
  const starsRef = this.firestore.collection('Products', ref => ref.where('User', '==', userId));
  return starsRef.valueChanges();
}
getProductsAvailable(){
  const starsRef = this.firestore.collection('Products', ref => ref.where('Selled', '==', false));
  return starsRef.valueChanges();
}
getproductbyid(productid){
  return this.firestore.collection('Products').doc(productid).get();
}



 
}
