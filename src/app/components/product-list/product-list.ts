import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from '../../services/productService';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgbModule
  ],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit, OnDestroy {

  products: Product[] = [];

  currentCategoryId: number = 1;

  PreviousCategoryId: number = 1;

  searchMode: boolean = false;

  // Angular page number starts from 1
  thePageNumber: number = 1;

  thePageSize: number = 5;

  theTotalElements: number = 0;

  errorMessage: string | null = null;

  private destroy$ = new Subject<void>();


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {

        const idParam = params.get('id');

        this.currentCategoryId =
          idParam
            ? Number(idParam)
            : 1;


        // Category changed
        // Reset pagination to page 1
        if (
          this.PreviousCategoryId !==
          this.currentCategoryId
        ) {

          this.thePageNumber = 1;
        }


        this.PreviousCategoryId =
          this.currentCategoryId;


        console.log(
          `🔄 Category=${this.currentCategoryId}, ` +
          `Page=${this.thePageNumber}`
        );


        this.listProducts();

      });

  }


  listProducts(): void {

    this.errorMessage = null;


    /*
      Angular pagination is 1-based:

          Page 1
          Page 2
          Page 3

      Spring Data REST pagination is 0-based:

          Page 0
          Page 1
          Page 2

      Therefore subtract 1.
    */

    const backendPageNumber =
      this.thePageNumber - 1;


    console.log(
      `📡 Request -> category=${this.currentCategoryId}, ` +
      `page=${backendPageNumber}, ` +
      `size=${this.thePageSize}`
    );


    this.productService
      .getProductListPaginate(
        backendPageNumber,
        this.thePageSize,
        this.currentCategoryId
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: (data) => {

          console.log(
            '✅ API response:',
            data
          );


          // Load products
          this.products =
            data._embedded?.products ?? [];


          // Convert backend page back to Angular page
          this.thePageNumber =
            data.page.number + 1;


          // Update page size
          this.thePageSize =
            data.page.size;


          // Total products
          this.theTotalElements =
            data.page.totalElements;


          console.log(
            `✅ Category: ${this.currentCategoryId}`
          );

          console.log(
            `✅ Current Page: ${this.thePageNumber}`
          );

          console.log(
            `✅ Page Size: ${this.thePageSize}`
          );

          console.log(
            `✅ Total Products: ${this.theTotalElements}`
          );

          console.log(
            '🔎 First Product ID:',
            this.products[0]?.id
          );

        },


        error: (err) => {

          console.error(
            '❌ Error loading products:',
            err
          );


          this.errorMessage =
            'Failed to load products.';


          this.products = [];

        }

      });

  }


  /*
    Called when user changes page size
  */

  updatePageSize(pageSize: string): void {

    this.thePageSize =
      Number(pageSize);


    // Start from first page
    this.thePageNumber = 1;


    console.log(
      `📄 Page size changed to ${this.thePageSize}`
    );


    this.listProducts();

  }


  addToCart(product: Product): void {

    console.log(
      '🛒 Added to cart:',
      product
    );

    // Add actual cart logic here

  }


  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}
