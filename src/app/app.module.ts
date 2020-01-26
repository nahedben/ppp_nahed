import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Others/navigation/navigation/navigation.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { FormsModule } from '@angular/forms/';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ImageUploadComponent } from './Others/image-upload/image-upload.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RatingModule } from 'primeng/rating';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    SignupComponent,
    ImageUploadComponent,
    HomeComponent,
    ProfileComponent,
    ProductDetailsComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    DropDownListModule,
    MaterialModule,
    FlexLayoutModule,
    RatingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
