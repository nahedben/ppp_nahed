import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { ImageUploadComponent } from 'src/app/Others/image-upload/image-upload.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageUploadService } from 'src/app/Others/image-upload/image-upload.service';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: Utilisateur = new Utilisateur();
  @ViewChild(ImageUploadComponent)
  private testComponent : ImageUploadComponent;
  public picturemap:string;
  public sportsData: Object[] = [
    { Id: 'Ariana', Game: 'Ariana' },
    { Id: 'Béja', Game: 'Béja' },
    { Id: 'Ben Arous', Game: 'Ben Arous' },
    { Id: 'Bizerte', Game: 'Bizerte' },
    { Id: 'Gabès', Game: 'Gabès' },
    { Id: 'Gafsa', Game: 'Gafsa' },
    { Id: 'Jendouba', Game: 'Jendouba' },
    { Id: 'Kairouan', Game: 'Kairouan' },
    { Id: 'Kasserine', Game: 'Kasserine' },
    { Id: 'Kébili', Game: 'Kébili' },
    { Id: 'Le Kef', Game: 'Le Kef' },
    { Id: 'Mahdia', Game: 'Mahdia' },
    { Id: 'La Manouba', Game: 'La Manouba' },
    { Id: 'Médenine', Game: 'Médenine' },
    { Id: 'Monastir', Game: 'Monastir' },
    { Id: 'Nabeul', Game: 'Nabeul' },
    { Id: 'Sfax', Game: 'Sfax' },
    { Id: 'Sidi Bouzid', Game: 'Sidi Bouzid' },
    { Id: 'Siliana', Game: 'Siliana' },
    { Id: 'Sousse', Game: 'Sousse' },
    { Id: 'Tataouine', Game: 'Tataouine' },
    { Id: 'Tozeur', Game: 'Tozeur' },
    { Id: 'Tunis', Game: 'Tunis' },
    { Id: 'Zaghouan', Game: 'Zaghouan' }
];
// maps the local data column to fields property
public localFields: Object = { text: 'Game', value: 'Id' };
// set the placeholder to DropDownList input element
public localWaterMark: string = 'Select Your Location';
 


constructor(private router: Router ,private storage: AngularFireStorage,public serviceimage:ImageUploadService,public userserv:UserService) { }

  ngOnInit() {
  }
  onSubmit(e) {
 
    var pictureinfo :any[] =this.testComponent.handleSubmit(e);
    console.log(pictureinfo);
  
    
    
  
  
    var filePath = `${pictureinfo['name'].split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, pictureinfo).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
       this.picturemap=url;
          console.log(this.picturemap);
         this.user.Picture = this.picturemap;
         this.user.Role = "CLIENT";
    this.userserv.createUser(this.user);
    this.router.navigate(["login"]);
        })
      })
    ).subscribe();
  }

}
