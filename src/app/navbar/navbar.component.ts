import { Component, OnInit } from '@angular/core';
import { Category } from '../_model/category';
import { CategoryService } from '../_service/category.service';
import { SiteSettingsService } from '../_service/adminService/site-settings.service';
import { SiteSettings } from '../_model/site-settings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  siteSettings!: SiteSettings;
  categories!: Category[];
  status: string = "Home";

  constructor(private categoryService: CategoryService, private readonly siteSettingService: SiteSettingsService) {
  }

  ngOnInit(): void {
    this.siteSettingService.siteSettings$.subscribe((settings) => this.siteSettings = settings)
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
