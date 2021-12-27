import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_service/product.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  productsCart!: Product[];
  cart!: Map<number, number>;
  checked = false;

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.getAllProductFromCart();
     });
  }

  getAllProductFromCart(){
    this.productService.getAllProductsById(Array.from(this.userService.getCurrentCart().keys())).subscribe({
      next: (response) => {
        this.productsCart = response;
      }
    });
  }

  multipleProductSum(x1: number, x2: any){
    if(isNaN(x2)) return x1;
    return x1*x2;
  }

  checkAllOptions() {
    let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll("#chkBox");
    checkboxes.forEach((e) => {
      if(!this.checked) { 
        e.checked = true;
      }
      else {
        e.checked = false;
      }
    })
  }

  resetCheckAll(){
    let masterCheckBox = document.querySelector("#masterChkBox") as HTMLInputElement;
    masterCheckBox.checked = false;
    this.checked = false;
  }

  deleteProduct(product: Product){
    this.cart.delete(product.id);
    this.userService.updateCurrentCart(this.cart);
  }

  changeValue(event: any, product: Product){
    if (!isNaN(event.target.value)) {
      event.target.value > product.valueInStock? this.cart.set(product.id, product.valueInStock): event.target.value < 1? this.cart.set(product.id, 1): this.cart.set(product.id, event.target.value as number);
    } else {
      this.cart.set(product.id, 1);
    }
    this.userService.updateCurrentCart(this.cart);
  }

}
