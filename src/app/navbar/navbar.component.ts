import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../_model/category';
import { CategoryService } from '../_service/category.service';
import { SiteSettingsService } from '../_service/adminService/site-settings.service';
import { SiteSettings } from '../_model/site-settings';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from '../_service/authentication.service';
import { Role } from '../_model/role';
import { UserService } from '../_service/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent!.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  siteSettings!: SiteSettings;
  categories!: Category[];
  status: string = "Home";
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  error = '';
  loading = false;
  registration = false;
  matcher = new MyErrorStateMatcher();
  isAdmin: boolean = false;
  userEmail: string = "";
  countGoods: number = 0;
  wishList: number = 0;
  totalSum: number = 0;

  constructor(private categoryService: CategoryService, 
    private readonly siteSettingService: SiteSettingsService, 
    private formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.siteSettingService.siteSettings$.subscribe((settings) => this.siteSettings = settings);
    this.userService.cart$.subscribe((cart) => {
      this.countGoods = 0;
      if(cart && cart.size > 0) {
        for (let entry of cart.entries()){
          this.countGoods += entry[1];
        }
      }
    });
    this.userService.wishList$.subscribe((wishList) => {
      if(wishList && wishList.size > 0) {
        for (let entry of wishList.entries()){
          this.wishList += entry[1];
        }
      }
    });
    this.authenticationService.currentUser.subscribe((user) => {
      this.userEmail = "";
      this.isAdmin = (user?.role === Role.Admin);
      this.userEmail = user?.email;
    })
    this.categoryService.category$.subscribe((categories) => this.categories = categories);
    this.categoryService.getAllCategory().subscribe({
      next: (category) => {
        this.categories = category;
      }
    });
    this.createLoginForm();
  }

  createLoginForm(){
    this.error = "";
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  createRegistrationForm(){
    this.error = ""
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z_]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords} as AbstractControlOptions)
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }

  registrationSubmit(){
    this.registration = !this.registration;
    if(this.registration){
      this.createRegistrationForm();
    } else {
      this.createLoginForm();
    }
  }

  logout() {
    this.authenticationService.logout();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    if(!this.registration){
      this.authenticationService.login(this.loginForm.value)
      .subscribe({
          next: () => {
            this.closebutton.nativeElement.click();
            this.error = "";
          },
          error: () => {
              this.error = "Invalid Credentials";
              this.loading = false;
          }
      });
    } else {
      this.authenticationService.registration(this.loginForm.value)
      .subscribe({
          next: () => {
            this.closebutton.nativeElement.click();
            this.error = "";
          },
          error: () => {
              this.error = "Invalid Credentials";
              this.loading = false;
          }
      });
    }

  }

  selectMenu(menu: string){
    this.status = menu;
  }

}
