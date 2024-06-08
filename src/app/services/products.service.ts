import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  addProducts = (url: string, body: Product): Observable<Products> => {
    return this.apiService.post(url, body, {});
  };

  editProducts = (url: string, body: Product): Observable<Products> => {
    return this.apiService.put(url, body, {});
  };

  deleteProducts = (url: string): Observable<Products> => {
    return this.apiService.delete(url, {});
  };
}
