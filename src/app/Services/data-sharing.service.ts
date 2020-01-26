import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from '../Models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userconnected:BehaviorSubject<unknown> = new BehaviorSubject<unknown>(null);
  constructor() { }
}
