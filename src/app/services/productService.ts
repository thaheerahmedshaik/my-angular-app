import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  // Get products by category
  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  // Get one product by ID
  getProduct(theProductId: number): Observable<Product> {

    const productUrl = `${this.baseUrl}/${theProductId}`;

    console.log('Product URL:', productUrl);

    return this.httpClient.get<Product>(productUrl);
  }

  // Get all product categories
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(
        map(response =>
          response._embedded.productCategory.map(category => {

            const id = Number(
              category._links.self.href.split('/').pop()
            );

            return new ProductCategory(
              id,
              category.categoryName
            );
          })
        )
      );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategoryResponse[];
  };
}

interface ProductCategoryResponse {
  categoryName: string;
  _links: {
    self: {
      href: string;
    };
  };
}