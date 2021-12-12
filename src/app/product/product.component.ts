import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../_model/product';
import { ProductService } from '../_service/product.service';

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

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService) {
    this.subscription = activateRoute.params.subscribe(
      (params) => (this.showProduct(params['id']))
    )
   }

  ngOnInit(): void {
  }

  updateValue(event: any){
    if (Number(event.target.value) !== NaN) {
      this.value > this.product.valueInStock? this.value = this.product.valueInStock: this.value < 1? this.value = 1: true;
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
}
