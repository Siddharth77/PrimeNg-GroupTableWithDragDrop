import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<Product[]>('assets/products-group.json')
      .toPromise()
      .then(res => <Product[]>res.data)
      .then(data => {
        return data;
      });
  }
}
