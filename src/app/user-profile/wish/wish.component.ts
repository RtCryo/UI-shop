import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_service/product.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {

  checked = false;
  wishList!: number[];
  wishProduct!: Product[];

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.wishList$.subscribe((wish) => {
      this.wishList = wish;
      this.getAllProductFromWish();
    })
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
    this.wishList.splice(this.wishList.indexOf(product.id),1);
    this.userService.updateWishList(this.wishList);
  }

  getAllProductFromWish(){
    this.productService.getAllProductsById(this.wishList).subscribe({
      next: (response) => {
        this.wishProduct = response;
      }
    });
  }

}
