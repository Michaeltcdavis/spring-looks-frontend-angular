import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProductService } from '../services/product-service';
import { Product } from '../model/product';
import { OrderService } from '../services/order-service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly productService = inject(ProductService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  isAuthenticated = false;
  products: Array<Product> = [];
  quantity = 1;
  quantityIsNull = false;
  isOrderSuccess = false;
  isOrderFailed = false;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated}) => {
        this.isAuthenticated = isAuthenticated;
        this.productService.getProducts()
          .pipe()
          .subscribe(product => {
            this.products = product;
          })
      }
    )
  }

  orderProduct(product: Product, quantity: String): void {
    this.oidcSecurityService.checkAuth().subscribe(result => {
      const user = {
        email: result.userData.email,
        firstName: result.userData.firstName,
        lastName: result.userData.lastName
      }
      const order = {
            skuCode: product.name,
            price: product.price,
            quantity: Number(quantity),
            userDetails: user
      }
      this.orderService.createOrder(order).subscribe({
        next: () => {this.isOrderSuccess = true; console.log("Order Success!")}
      });
    })
  }

  goToCreateProductPage(): void {
    this.router.navigateByUrl("/addProduct");
  }

}
