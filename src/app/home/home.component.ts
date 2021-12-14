import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product';
import { HomeService } from '../_service/home.service';
import { SiteSettingsService } from '../_service/adminService/site-settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products!: Product[];
  siteSettingsService: SiteSettingsService;

  constructor(private homeService: HomeService, private serviceSite: SiteSettingsService) {
    this.siteSettingsService = serviceSite;
    homeService.getRandomProducts().subscribe({
      next: (response)=>{
        this.products = response;
      }
    })
  }

  ngOnInit(): void {
  }

}
