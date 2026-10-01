import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-product-category-memu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './product-category-memu.html',
  styleUrl: './product-category-memu.css',
   host: { 'ngSkipHydration': '' }
})
export class ProductCategoryMemu implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(): void {
 this.productService.getProductCategories().subscribe(
      data=>{
        console.log('product categories='+JSON.stringify(data));
        this.productCategories=data;
      }
    );
  }
}
