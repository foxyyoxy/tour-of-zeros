import { Injectable } from '@angular/core';
import {Currency} from './Currency';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {
  constructor(private http: HttpClient) { }
  private convertUrl = 'http://free.currencyconverterapi.com/api/v6/convert';
  public convert(curr1: Currency, curr2: Currency): Observable<any> {
    const params = new HttpParams()
      .set('q', `${curr1.id}_${curr2.id}`)
      .set('compact', 'ultra');
    return this.http.get<any>(this.convertUrl, {params: params});
  }// convert
}
