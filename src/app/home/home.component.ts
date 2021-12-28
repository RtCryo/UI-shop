import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product';
import { HomeService } from '../_service/home.service';
import { SiteSettingsService } from '../_service/adminService/site-settings.service';
import { SiteSettings } from '../_model/site-settings';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { SearchService } from '../_service/search.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  siteSettings!: SiteSettings;
  products!: Product[];
  searchTerm!: string;

  constructor(private homeService: HomeService, 
    private readonly siteSettingService: SiteSettingsService, 
    private route: ActivatedRoute,
    private productService: ProductService,
    private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.siteSettingService.siteSettings$.subscribe((settings) => this.siteSettings = settings);
    $(document).ready(function(){
      $('.carousel').carousel();
    });
    this.route.params.subscribe((params) => {
      if(params['searchTerm']){
        this.productService.getAllProducts().subscribe((response) => {
          this.searchService.searchTerm$.next(params['searchTerm']);
          this.products = response.filter(product => product.productName.toLowerCase().includes(params['searchTerm'].toLowerCase()));
        })
      } else {
        this.homeService.getRandomProducts().subscribe({
          next: (response)=>{
            this.products = response;
          }
        });
      }
    })
  }

}
