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

  public cart$: BehaviorSubject<Map<number, number>>;
  public wishList$: BehaviorSubject<Map<number, number>>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
      this.cart$ = new BehaviorSubject<Map<number, number>>(this.jsonConvert('cart'));
      this.wishList$ = new BehaviorSubject<Map<number, number>>(this.jsonConvert('wishList'));
  }

  jsonConvert(item: string){
    return new Map<number, number>(JSON.parse(localStorage.getItem(item)!));
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

  updateCurrentCart(cart: Map<number, number>) {
    localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));
    this.cart$.next(cart);
  }

  updateWishList(wishList: Map<number, number>) {
    localStorage.setItem('wishList', JSON.stringify(Array.from(wishList.entries())));
    this.wishList$.next(wishList);
  }

}
