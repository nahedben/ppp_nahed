import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Others/navigation/navigation/navigation.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'register', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'product/:id',component:ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
