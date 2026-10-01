import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/productService';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private destroy$ = new Subject<void>();

  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
      private cd: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = Number(params.get('id'));
        if (id) {
          console.log('🔄 Fetching product ID:', id);
          this.productService.getProduct(id).subscribe({
            next: (data: Product) => {
              this.product = data;
              this.cd.detectChanges();
              console.log('✅ Product received:', data);
            },
            error: (err) => {
              console.error('❌ Error fetching product:', err);
              this.product = null;
            }
          });
        }
      });
  }

  handleProductDetails() {
   
    //get the "id" param string . convert string to a number using the "+" symbol
    const theProductId:number=+this.route.snapshot.paramMap.get('id')!;
 
    this.productService.getProductList(theProductId).subscribe(
      data=>{
        this.product=data[0];
      }
    )
  }
 
  handleProductDetail(): void {

    // Get product ID from URL
    const theProductId: number =
      +this.route.snapshot.paramMap.get('id')!;

    console.log('Product ID:', theProductId);

    // Get ONE product using its ID
    this.productService.getProduct(theProductId).subscribe({
      next: data => {
        console.log('Product:', data);
        this.product = data;
      },
      error: err => {
        console.error('Error loading product:', err);
      }
    });
  }
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}