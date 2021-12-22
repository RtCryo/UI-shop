import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/product';
import { User } from '../_model/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public cart$: BehaviorSubject<Product[]>;
  public wishList$: BehaviorSubject<Product[]>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
      this.cart$ = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('cart')!));
      this.wishList$ = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('wishList')!));
  }

  userToUpdate(user: User) {
   this.http.post(`${environment.hostUrl}/updateUser`, user, {withCredentials: true})
  }

  getCurrentCart(){
    return this.cart$.value;
  }

  getWishList(){
    return this.wishList$.value;
  }

  updateCurrentCart(product: Product[]) {
    localStorage.setItem('cart', JSON.stringify(product));
    this.cart$.next(product);
  }

  updateWishList(product: Product[]) {
    localStorage.setItem('wishList', JSON.stringify(product));
    this.wishList$.next(product);
  }

}
