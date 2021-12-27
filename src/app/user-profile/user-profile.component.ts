import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  status!: string;
  user = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    router.events.subscribe((event) => {
      event instanceof NavigationEnd? this.status = event.url.substring(6): null
    });
    authenticationService?.currentUser?.subscribe((user) => {
      if(user !== null) { 
        this.user = true; 
      } else {
        this.user = false;
      }
    })
  }

  ngOnInit(): void {
  }

  selectMenu(menu: string){
    this.status = menu;
  }

}
