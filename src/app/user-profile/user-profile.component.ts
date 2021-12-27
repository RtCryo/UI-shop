import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  status: string = "profile"

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd? this.status = event.url.substring(6): null
    })
    console.log(this.status);
  }

  selectMenu(menu: string){
    this.status = menu;
  }

}
