import { Component} from '@angular/core';
import { ProductService } from '../../services/product-service';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  addProductForm: FormGroup;
  private readonly productService = inject(ProductService);
  isProductCreated = false;

  constructor(private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      skuCode: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const product = {
        skuCode: this.addProductForm.get('skuCode')?.value,
        name: this.addProductForm.get('name')?.value,
        description: this.addProductForm.get('description')?.value,
        price: this.addProductForm.get('price')?.value

      }
      this.productService.createProduct(product).subscribe(product => {
        this.isProductCreated = true;
        this.addProductForm.reset();
      });
    } else {
      console.log("Form invalid, Cannot submit product");
    }
  }

  get skuCode() {
    return this.addProductForm.get('skuCode');
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get description() {
    return this.addProductForm.get('description');
  }
  get price() {
    return this.addProductForm.get('price');
  }

}
