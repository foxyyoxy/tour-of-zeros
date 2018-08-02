import { Component, OnInit } from '@angular/core';
import {CurrenciesService} from '../currencies.service';
import {ConvertService} from '../convert.service';
import {Currency} from '../Currency';
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  currencies: Currency[];
  currentRate;
  curr1: Currency;
  curr2: Currency;
  curr1_amt = 1;
  curr2_amt: number;
  constructor(private currService: CurrenciesService, private conService: ConvertService) { }
  ngOnInit() {
    this.currencies = [];
    // get list of currencies right away; roughly 10 KB and convert it into currencies array
    this.currService.getCurrencies().subscribe(data => {
      const results = data['results'];
     for (const x in results) {
       if (results.hasOwnProperty(x)) {
         this.currencies.push(results[x]);
       }
     }
      this.currencies = this.currencies.sort((n1, n2) => {
        if (n1.currencyName > n2.currencyName) {
          return 1;
        }
        if (n1.currencyName < n2.currencyName) {
          return -1;
        }
        return 0;
      });
    });
  }
  getRate() {
    if (this.curr1 && this.curr2) {
      this.conService.convert(this.curr1, this.curr2).subscribe(result => {
        for (const x in result) {
          if (result.hasOwnProperty(x)) {
            this.currentRate = result[x];
            this.update1();
          }
        }
      });
    }
  }
  update1() {
    if (this.currentRate) {
      this.curr2_amt = Number((this.curr1_amt * this.currentRate).toFixed(4));
    }
  }
  update2() {
    if (this.currentRate) {
      this.curr1_amt = Number((this.curr2_amt / this.currentRate).toFixed(4));
    }
  }
}
