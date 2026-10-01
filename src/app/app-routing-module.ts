import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ProductDetails } from './components/product-details/product-details';
import { ProductList } from './components/product-list/product-list';

export const routes: Routes = [
  {path: 'products/:id',component:ProductDetails},
  {path: 'search/:keyword',component:ProductList},
  { path: 'category/:id', component: ProductList },
  { path: 'category', component: ProductList },
  { path: 'products', component: ProductList },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];
@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AppRoutingModule {}
