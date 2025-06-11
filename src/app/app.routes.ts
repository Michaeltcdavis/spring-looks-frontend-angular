import { Routes } from '@angular/router';
import { Products } from './products/products';
import { AddProduct } from './pages/add-product/add-product';

export const routes: Routes = [
    {path: '', component: Products},
    {path: 'addProduct', component: AddProduct}

];
