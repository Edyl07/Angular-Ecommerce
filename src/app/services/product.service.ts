import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]>{


    // need to build URL on category id
    const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchURL);
    }


    searchProducts(theKeyword: string): Observable<Product[]>{

      // need to build URL based on the keyword
      const searchURL = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

      return this.getProducts(searchURL);
    }


  private getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchURL).pipe(
      map(response => response._embedded.products)
    );
  }

    getProductCategories(): Observable<ProductCategory[]> {
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
        )

    }


  }

  interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
_embedded: {
  productCategory: ProductCategory[];
}
}
