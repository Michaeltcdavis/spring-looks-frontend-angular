import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(order: Order): Observable<String> {
    return this.httpClient.post('http://localhost:9000/api/order', order, {responseType: 'text'});
  }
}
