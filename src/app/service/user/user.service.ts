import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.baseUrl
  
  checkTempCode(code:any):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/User/CheckTempCode/${code}`)
  }
}
