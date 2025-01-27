import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.baseUrl

  create(body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/Quote/Create`, body)
  }

  getMyQuotes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Quote/Create`)
  }
}
