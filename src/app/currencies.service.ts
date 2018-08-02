import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private currenciesUrl = 'http://free.currencyconverterapi.com/api/v6/currencies';
  constructor(private http: HttpClient) { }
  public getCurrencies(): any {
    return this.http.get<any>(this.currenciesUrl);
  }
}
