import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { ProductsAdminComponent } from './admin/products-admin/products-admin.component';
import { CategoriesAdminComponent } from './admin/categories-admin/categories-admin.component';
import { SiteAdminComponent } from './admin/site-admin/site-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorInterceptor } from './_config/error.interceptor';
import { JwtInterceptor } from './_config/jwt.interceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { WishComponent } from './user-profile/wish/wish.component';
import { PurchaseComponent } from './user-profile/purchase/purchase.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CategoryComponent,
    ProductComponent,
    FooterComponent,
    AdminComponent,
    UsersAdminComponent,
    ProductsAdminComponent,
    CategoriesAdminComponent,
    SiteAdminComponent,
    NotFoundComponent,
    UserProfileComponent,
    ProfileComponent,
    WishComponent,
    PurchaseComponent,
    SearchComponent
  ],
  imports: [
    MatInputModule,
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
