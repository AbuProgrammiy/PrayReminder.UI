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

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Quote/GetAll`)
  }

  getMyQuotes(userId:number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/Quote/GetByUserId/${userId}`)
  }

  changeProcess(quoteId:number, process:number): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/Quote/Accept/${quoteId}/${process}`,{})
  }
}
