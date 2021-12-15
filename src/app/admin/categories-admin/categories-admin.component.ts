import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/_model/category';
import { CategoryAdminService } from 'src/app/_service/adminService/category-admin.service';
import { CategoryService } from 'src/app/_service/category.service';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  categories!: Category[];
  checked = false;
  categoryForm!: FormGroup;
  isEdit: boolean = false;
  categoryToEdit!: Category;

  constructor(private categoryAdminService: CategoryAdminService, private categoryService: CategoryService) {
    this.getAllCategory();
   }

  ngOnInit(): void {
    this.categoryService.category$.subscribe((categories) => this.categories = categories)
  }

  getAllCategory(){
    this.categoryAdminService.getAllCategory().subscribe({
      next: (response) => {
        this.categoryService.category$.next(response);
      }
    })
  }

  createNewForm(){
    this.isEdit = false;
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', Validators.required),
    })
  }

  submit(){
    if(this.categoryForm.valid){
      if(!this.isEdit) {
        this.categoryAdminService.saveCategory(this.categoryForm.value).subscribe({
          next: () => {
            this.getAllCategory();
          },
          complete: () => {
            this.closebutton.nativeElement.click();
          }
        })
      } else {
        let category = new Category;
        category.id = this.categoryToEdit.id;
        category.categoryName = this.categoryForm.controls['categoryName'].value;
        this.categoryAdminService.updateCategory(category).subscribe({
          next: () => {
            this.getAllCategory();
          },
          complete: () => {
            this.closebutton.nativeElement.click();
          }
        })
      }
    }
  }

  editCategory(category: Category){
    this.isEdit = true;
    this.categoryToEdit = category;
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(category.categoryName, Validators.required),
    });
  }

  checkAllOptions(){
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

  deleteProduct(category: Category){
    this.categoryAdminService.sendToDelete(category).subscribe({
      next: () => {
        
      },
      complete: () => {
        this.getAllCategory();
      }
    })
  }

  deleteProducts(){
    let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll("#chkBox");
    let listToDelete: Category[] = [];
    checkboxes.forEach((e) => {
      if(e.checked) { 
        let id: number = +e.value!;
        this.categories.forEach((category) => {
          if(category.id === id) {
            listToDelete.push(category);
            return;
          }
        })
      }
    })
    if(listToDelete.length > 0) {
      this.categoryAdminService.sendListToDelete(listToDelete).subscribe({
        next: () => {
          this.getAllCategory();
          this.resetCheckAll();
        },
        error: (msg) => {
          alert(msg);
        }
      });
    }
  }

}
