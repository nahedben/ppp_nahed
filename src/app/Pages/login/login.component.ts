import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Utilisateur } from 'src/app/Models/Utilisateur';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  x: boolean;
  model: any = {
    username: '',
    password: '',
  };
  showmsg: boolean = false;

  constructor(public userserv: UserService, public router: Router, public dataSharingService: DataSharingService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.userserv.getUserByemailPassword(this.model.username, this.model.password).subscribe(data => {
      if (data.length !== 0) {


        console.log(data)
        for (let a of data) {

          this.dataSharingService.userconnected.next(a);
          localStorage.setItem("userconnected",JSON.stringify(a));
          console.log(JSON.parse(localStorage.getItem("userconnected")));
          break;
        }
        localStorage.setItem("loginin","true");
        this.dataSharingService.isUserLoggedIn.next(true);
        
        this.router.navigate(['home']);

        this.x = true;
      } else {
        this.showmsg = true;
      }

   

    })
  }

}
