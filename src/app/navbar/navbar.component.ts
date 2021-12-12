import { Component, OnInit } from '@angular/core';
import { Category } from '../_model/category';
import { CategoryService } from '../_service/category.service';
import { NavbarService } from '../_service/navbar.service';
import { SiteSettingsService } from '../_service/site-settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories!: Category[];
  status: string = "Home";
  siteSettingsService: SiteSettingsService;

  constructor(private categoryService: CategoryService, siteSettingsService: SiteSettingsService) {
    this.siteSettingsService = siteSettingsService;
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (category) => {
        this.categories = category;
      }
    })
  }

  selectMenu(menu: string){
    this.status = menu;
  }

}
