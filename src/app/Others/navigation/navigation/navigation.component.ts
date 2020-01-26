import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  isUserLoggedIn: boolean;
user:any;
  constructor(public router:Router,public userserv:UserService,public DataSharingService:DataSharingService ) {
    this.DataSharingService.isUserLoggedIn.subscribe( value => {
     // this.isUserLoggedIn = value;
      if(localStorage.getItem("loginin")!=null){
        this.isUserLoggedIn = true;
        this.user = JSON.parse(localStorage.getItem("userconnected"))
      }
     
  });

  


  
  }

  ngOnInit() {
   
 
  }
  
  signOut(){
    this.isUserLoggedIn = false;
    localStorage.removeItem("loginin")
    this.router.navigate(["login"]);
   
  }

}
