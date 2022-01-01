import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../_model/product';
import { ProductService } from '../_service/product.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public product!: Product;
  public value: number = 1;
  public disabled: boolean = true;
  public imgName: string = "";
  private subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService, private userService: UserService) {
    this.subscription = activateRoute.params.subscribe(
      (params) => {
        if(!isNaN(+params['id'])){
          this.showProduct(params['id']);
        } else {
          location.replace('404');
        }
      }
    )
   }

  ngOnInit(): void {
  }

  updateValue(event: any){
    if (!isNaN(event.target.value)) {
      this.value > this.product.valueInStock? this.value = this.product.valueInStock: this.value < 1? this.value = 1: this.value = +event.target.value;
    } else {
      this.value = 1;
    }
  }

  showProduct(id: number){
    this.productService.getProduct(id).subscribe({
      next: (response) => {
        this.product = response;
        this.disabled = this.product.valueInStock > 0;
        this.imgName = "/assets/img_product/" + this.product.imgName;
      }
    })
  }

  onChanged(increased: any) {
    if(!isNaN(+this.value)) {
      if(!this.disabled) {
        increased == true ? this.value++ : this.value <= 1? this.value = 1: this.value--
      } else {
        increased == true ? this.value > this.product.valueInStock? true: this.value++ : this.value <= 1? this.value = 1: this.value--
      }
    } else {
      this.value = 1;
    }
  }

  buy(){
    let newCart = this.userService.getCurrentCart();
    if(newCart && newCart.size > 0){
      if(newCart.has(this.product.id)) {
        let t = newCart.get(this.product.id);
        newCart.set(this.product.id, t?t + this.value:0 )
      } else {
        newCart.set(this.product.id, this.value);
      }
    } else {
      newCart = new Map();
      newCart.set(this.product.id,this.value);
    }
    this.userService.updateCurrentCart(newCart);
  }

  wish(){
    let newWish = this.userService.getWishList();
    if(newWish && newWish.length > 0) {
      if(newWish.indexOf(this.product.id) < 0){
        newWish.push(this.product.id);
      } else {
        return;
      }
    } else {
      newWish = [];
      newWish.push(this.product.id);
    }
    this.userService.updateWishList(newWish);
  }
}
