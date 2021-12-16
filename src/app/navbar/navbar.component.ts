import { Component, OnInit } from '@angular/core';
import { Category } from '../_model/category';
import { CategoryService } from '../_service/category.service';
import { SiteSettingsService } from '../_service/adminService/site-settings.service';
import { SiteSettings } from '../_model/site-settings';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  siteSettings!: SiteSettings;
  categories!: Category[];
  status: string = "Home";
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  registration = false;

  constructor(private categoryService: CategoryService, private readonly siteSettingService: SiteSettingsService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.siteSettingService.siteSettings$.subscribe((settings) => this.siteSettings = settings);
    this.categoryService.category$.subscribe((categories) => this.categories = categories);
    this.categoryService.getAllCategory().subscribe({
      next: (category) => {
        this.categories = category;
      }
    })
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  registrationSubmit(){
    this.registration = !this.registration;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  }

  selectMenu(menu: string){
    this.status = menu;
  }

}
