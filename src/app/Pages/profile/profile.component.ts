import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { Product } from 'src/app/Models/Product';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
product:Product=new Product();
ConnectedUser:any;
productlist:any=[];

public sportsData: Object[] = [
  { Id: 'Antiques', Game: 'Antiques' },
  { Id: 'Art', Game: 'Art' },
  { Id: 'Baby', Game: 'Baby' },
  { Id: 'Books', Game: 'Books' },
  { Id: 'Business & Industrial', Game: 'Business & Industrial' },
  { Id: 'Cameras & Photo', Game: 'Cameras & Photo' },
  { Id: 'Cell Phones & Accessories', Game: 'Cell Phones & Accessories' },
  { Id: 'Clothing, Shoes & Accessories', Game: 'Clothing, Shoes & Accessories' },
  { Id: 'Computers/Tablets & Networking', Game: 'Computers/Tablets & Networking' },
  { Id: 'Consumer Electronics', Game: 'Consumer Electronics' },
  { Id: 'Motors', Game: 'Motors' },
  { Id: 'Home & Garden', Game: 'Home & Garden' },
  { Id: 'Jewelry & Watches', Game: 'Jewelry & Watches' },
  { Id: 'Pet Supplies', Game: 'Pet Supplies' },
  { Id: 'Travel', Game: 'Travel' },
  { Id: 'Video Games & Consoles', Game: 'Video Games & Consoles' },
  {Id:'Others' , Game:'Others'}

];
// maps the local data column to fields property
public localFields: Object = { text: 'Game', value: 'Id' };
// set the placeholder to DropDownList input element
public localWaterMark: string = 'Select Product Type';
  constructor(public Userserv:UserService,public DataSharingService:DataSharingService,private storage: AngularFireStorage,public productserv:ProductsService) { 
    
  }

  ngOnInit() {
   /* this.DataSharingService.userconnected.subscribe( value => {
      this.ConnectedUser = value;
      console.log(this.ConnectedUser)
  });  */
  this.ConnectedUser = JSON.parse(localStorage.getItem("userconnected"));
  console.log(this.ConnectedUser)
  this.listofproducts();
  }

  urls = new Array<string>();
  urlsfile = new Array<string>();
  detectFiles(event) {
    
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
         
          console.log(this.urls)
        }
        reader.readAsDataURL(file);
        this.urlsfile.push(file);
        console.log(this.urlsfile)
      }
    }
  }

  deleteimg(url){
    let index = this.urls.indexOf(url);
    this.urls.splice(index,1);
  }


  onSubmit(){
    this.product.User = this.ConnectedUser.id;
    this.product.AddDate = new Date();
    this.product.Pictures = [];
    //pictures
  let arrayurls:any[]= [];
    for(let pictureinfo of this.urlsfile){
    var filePath = `${pictureinfo['name'].split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, pictureinfo).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url)
     arrayurls.push(url);
     if(arrayurls.length ===this.urlsfile.length){
       console.log("donnee")
      this.productserv.createProduct(this.product,arrayurls);
      this.product =new Product();
      this.urls = [];
        }else {
      console.log("waiit upload")
    }
        });
      })
    ).subscribe();
  }
  console.log("in component");
  console.log(arrayurls);
  
 
 
  }
 
  listofproducts(){
    this.productserv.getProductsByUserId(this.ConnectedUser.id).subscribe(data => {
      this.productlist = data;
    })
  }
  getstyle(picture){
    return {
      'background-image':'url('+picture+')' ,
      'background-size': 'cover',
      'background-position': 'center'
  
    }
  }

}
