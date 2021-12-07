import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product';
import { HomeService } from '../_service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products!: Product[];

  constructor(private homeService: HomeService) {
    homeService.getRandomProducts().subscribe({
      next: (response)=>{
        this.products = response;
      }
    })
  }

  ngOnInit(): void {
  }

}
