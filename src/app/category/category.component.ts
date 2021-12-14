import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../_model/product';
import { CategoryService } from '../_service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  name!: string;
  categoryProduct!: Product[];

  private querySubscription!: Subscription;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.name = queryParam['name'];
        this.getProduct();
      }
    );
  }

  getProduct(){
    this.categoryService.getProductByCategoryName(this.name).subscribe({
      next: (response) => {
        this.categoryProduct = response;
      }
    })
  }

}
