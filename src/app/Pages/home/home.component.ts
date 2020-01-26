import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { UserService } from 'src/app/Services/user.service';
import { Product } from 'src/app/Models/Product';

import { Utilisateur } from 'src/app/Models/Utilisateur';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rating: number = 3;
  productList: Product[] = [];

  constructor(public productserv: ProductsService, public userserv: UserService) { }

  ngOnInit() {
    this.productserv.getProductsAvailable().subscribe(
      data => {
        this.productList = JSON.parse(JSON.stringify(data));
        for (let a of this.productList){
          this.userserv.getUser(a.User).subscribe(data => {
            a.UserPicture = JSON.parse(JSON.stringify(data.data().Picture));
          })
        }
        
        console.log(this.productList)
      }
    )



  }


  getstyle(picture) {

   /* this.userserv.getUser(prod.User).subscribe(data => {
      let User = new Utilisateur();
      User = JSON.parse(JSON.stringify(data.data()));  */
      return {
        'background-image': 'url('+picture+')'
      }
  //  })

  }


}
