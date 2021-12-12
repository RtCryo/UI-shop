import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_model/category';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {

  categories!: Category[];
  checked = false;

  constructor(private categoryService: CategoryService) {
    categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response;
      }
    })
   }

  ngOnInit(): void {
  }

}
