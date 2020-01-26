import { Injectable } from '@angular/core';
import { Utilisateur } from '../Models/Utilisateur';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationComponent } from '../Others/navigation/navigation/navigation.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore ) { }


  createUser(User: Utilisateur){
    User.id = null;
    return this.firestore.collection(`Users`).add(JSON.parse(JSON.stringify(User))).then(docRef => {
       docRef.update({id: docRef.id});
  })
  .catch(error => console.error("Error adding document: ", error));
}

getUsers(){
  return this.firestore.collection('Users').snapshotChanges();
}
deleteUser(userKey){
  return this.firestore.collection('Users').doc(userKey).delete();
}

getUser(userId){
 return this.firestore.collection('Users').doc(userId).get();
}
getUserByemailPassword(email,password){
  const starsRef = this.firestore.collection('Users', ref => ref.where('Email', '==', email).where('Password','==',password) );
  return starsRef.valueChanges();
}



}
