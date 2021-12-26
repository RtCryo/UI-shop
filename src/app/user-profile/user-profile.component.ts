import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  status: string = "Profile"

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectMenu(menu: string){
    this.status = menu;
  }

}
