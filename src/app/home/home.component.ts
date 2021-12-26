import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product';
import { HomeService } from '../_service/home.service';
import { SiteSettingsService } from '../_service/adminService/site-settings.service';
import { SiteSettings } from '../_model/site-settings';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  siteSettings!: SiteSettings;
  products!: Product[];

  constructor(private homeService: HomeService, private readonly siteSettingService: SiteSettingsService) {
  }

  ngOnInit(): void {
    this.siteSettingService.siteSettings$.subscribe((settings) => this.siteSettings = settings);
    this.homeService.getRandomProducts().subscribe({
      next: (response)=>{
        this.products = response;
      }
    });
    $(document).ready(function(){
      $('.carousel').carousel();
    });
  }

}
