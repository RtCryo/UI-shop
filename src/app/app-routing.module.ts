import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoriesAdminComponent } from './admin/categories-admin/categories-admin.component';
import { ProductsAdminComponent } from './admin/products-admin/products-admin.component';
import { SiteAdminComponent } from './admin/site-admin/site-admin.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { PurchaseComponent } from './user-profile/purchase/purchase.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WishComponent } from './user-profile/wish/wish.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';

const adminRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', component: UsersAdminComponent},
  { path: 'products', component: ProductsAdminComponent},
  { path: 'productsToDelete', component: ProductsAdminComponent},
  { path: 'categories', component: CategoriesAdminComponent},
  { path: 'site', component: SiteAdminComponent},
]

const userRoutes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full'},
  { path: 'profile', component: ProfileComponent},
  { path: 'wish', component: WishComponent},
  { path: 'purchase', component: PurchaseComponent},
]

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'product/**', redirectTo: '404'},
  { path: 'category', component: CategoryComponent},
  { path: 'user', component: UserProfileComponent, children: userRoutes, canActivate: [AuthGuard]},
  { path: '404', component: NotFoundComponent},
  { path: 'admin', component: AdminComponent, children: adminRoutes, canActivate: [AdminGuard]},
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
