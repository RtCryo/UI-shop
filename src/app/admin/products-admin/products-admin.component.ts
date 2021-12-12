import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/_model/category';
import { Product } from 'src/app/_model/product';
import { ProductAdminService } from 'src/app/_service/adminService/product-admin.service';
import { CategoryService } from 'src/app/_service/category.service';
import { UploadService } from 'src/app/_service/upload.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  products!: Product[];
  categories!: Category[];
  value: number = 0;
  checked = false;
  progress = 0;
  isSingleUploaded = false;
  acceptedExtensions = "jpg, jpeg, png";
  fileToUpload!:File;
  message = '';
  selectedRadio: any;
  imgName!: string;
  isEdit: boolean = false;
  loading: boolean = false;
  productToEdit!: Product;

  selectedFiles!: any;
  currentFile!: any;

  productForm!: FormGroup;

  constructor(private productService: ProductAdminService, private categoryService: CategoryService, private uploadService: UploadService) {
    this.getAllProducts();
    this.getAllCategories();
    this.createNewForm();
   }

  ngOnInit(): void {
  }

  submit(){
    if(this.productForm.valid) {
      this.loading = true;
      let product = new Product;
      product.productName = this.productForm.controls["productName"].value;
      product.valueInStock = this.productForm.controls["valueInStock"].value;
      product.description = this.productForm.controls["description"].value;
      product.price = this.productForm.controls["price"].value;
      this.categories.forEach(e => {
        if(e.id === +this.productForm.controls["category"].value) {
          product.category = e;
        }
      });
      if( this.isEdit ){
        product.id = this.productToEdit.id;
      }
      if( this.selectedFiles) { 
        this.currentFile = this.selectedFiles.item(0)!;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              if(event.total) {
                this.progress = Math.round(100 * event.loaded / event.total);
              }
            } else if (event instanceof HttpResponse) {
              product.imgName = event.body.message;
              this.saveDoneProduct(product);
            }
          },
          error: () => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.loading = false;
          },
          complete: () => {
            this.currentFile = undefined;
          }
        });
        this.selectedFiles = undefined;
      } else {
        if(!this.isEdit) { 
          product.imgName = "noimage.jpg"; 
        } else {
          product.imgName = this.productToEdit.imgName;
        }
        this.saveDoneProduct(product);
        }
      }
  }

  editProduct(product: Product) {
    this.isEdit = true;
    this.productToEdit = product;
    this.productForm = new FormGroup({
      productName: new FormControl(product.productName, Validators.required),
      valueInStock: new FormControl(product.valueInStock, [Validators.required, Validators.pattern('[0-9]*')]),
      description: new FormControl(product.description, Validators.required),
      category : new FormControl("" + product.category.id, Validators.required),
      price: new FormControl(product.price, [Validators.required, Validators.pattern('[0-9]*')]),
      imageFile: new FormControl()
    })
    this.progress = 0;
    this.imgName = "/assets/img_product/" + product.imgName;
  }

  saveDoneProduct(product: Product){
    if(!this.isEdit) {
      this.productService.saveProduct(product).subscribe({
        next: () => {
          this.getAllProducts();
          },
        complete: () => {
          this.closebutton.nativeElement.click();
          this.loading = false;
          }
        })
      } else {
        this.productService.updateProduct(product).subscribe({
          next: () => {
            this.getAllProducts();
            },
          complete: () => {
            this.closebutton.nativeElement.click();
            this.loading = false;
            }
          })
      }
  }

  createNewForm(){
    this.isEdit = false;
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      valueInStock: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      description: new FormControl('', Validators.required),
      category : new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      imageFile: new FormControl()
    })
    this.progress = 0;
    this.imgName = "";
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      }
    })
  }

  getAllCategories(){
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response;
      }
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
    this.productService.sendToDelete(product).subscribe({
      next: () => {
        
      },
      complete: () => {
        this.getAllProducts();
      }
    })
  }

  deleteProducts(){
    let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll("#chkBox");
    let listToDelete: Product[] = [];
    checkboxes.forEach((e) => {
      if(e.checked) { 
        let id: number = +e.value!;
        this.products.forEach((product) => {
          if(product.id === id) {
            listToDelete.push(product);
            return;
          }
        })
      }
    })
    if(listToDelete.length > 0) {
      this.productService.sendListToDelete(listToDelete).subscribe({
        next: () => {
          this.getAllProducts();
          this.resetCheckAll();
        },
        error: (msg) => {
          alert(msg);
        }
      });
    }
  }

}
