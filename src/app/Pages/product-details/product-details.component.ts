import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductsService } from 'src/app/Services/products.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Utilisateur } from 'src/app/Models/Utilisateur';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  starRating=2.5;
  product:Product = new Product();
  user:Utilisateur =new Utilisateur();
  firstimg:string ="";
 
  constructor(public productserv:ProductsService,private route: ActivatedRoute,public userserv:UserService) { 
  
  }

  ngOnInit() {
    
    this.productserv.getproductbyid(this.route.snapshot.params.id).subscribe(data => {
      this.product =JSON.parse(JSON.stringify(data.data()));
  
      this.firstimg =this.product.Pictures[0];



      this.product.AddDate = new Date(data.data().AddDate["seconds"]*1000);

 
      this.userserv.getUser(this.product.User).subscribe(data => {
        this.user = JSON.parse(JSON.stringify(data.data()));
      })
    })


  }

}
