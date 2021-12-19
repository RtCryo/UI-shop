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
import { AdminGuard } from './_guards/admin.guard';

const adminRoutes: Routes = [
  { path: 'users', component: UsersAdminComponent},
  { path: 'products', component: ProductsAdminComponent},
  { path: 'productsToDelete', component: ProductsAdminComponent},
  { path: 'categories', component: CategoriesAdminComponent},
  { path: 'site', component: SiteAdminComponent},
]


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent},
  { path: 'product/**', redirectTo: '404'},
  { path: 'category', component: CategoryComponent},
  { path: 'admin', component: AdminComponent, children: adminRoutes, canActivate: [AdminGuard]},
  { path: '**', redirectTo: 'home' },
  { path: '404', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
