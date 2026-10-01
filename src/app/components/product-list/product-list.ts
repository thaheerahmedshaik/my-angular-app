import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../services/productService';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css',
  
})
export class ProductList implements OnInit, OnDestroy {
addToCart(product: Product): void {
    console.log('🛒 Added to cart:', product);
    // add your actual cart logic here
  }

  products: Product[] = [];
  currentCategoryId!: number;
  errorMessage: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef   // 👈 this forces UI refresh
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const idParam = params.get('id');
        this.currentCategoryId = idParam ? +idParam : 1;
        console.log('🔄 Fetching category:', this.currentCategoryId);
        this.listProducts();
      });
  }

  listProducts(): void {
    this.errorMessage = null;
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe({
        next: (data: Product[]) => {
          console.log('✅ Products received:', data);
          this.products = [...data];  
          this.products=data;
           console.log('✅ Products received:', data);
          console.log('🔎 First product ID:', data[0]?.id);        // new array reference
          this.cd.detectChanges();            // 👈 force view update
        },
        error: err => {
          console.error('❌ Error:', err);
          this.errorMessage = 'Failed to load products.';
          this.products = [];
          this.cd.detectChanges();
        }
      });
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}