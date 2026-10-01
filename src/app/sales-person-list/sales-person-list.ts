import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';
import { RouterModule } from '@angular/router';
 import { CurrencyPipe } from '@angular/common';
import { forkJoin, of } from 'rxjs';
@Component({
  selector: 'app-sales-person-list',
  imports: [RouterModule,CurrencyPipe],
  templateUrl: './sales-person-list-boostrap.html',
  styleUrl: './sales-person-list.css',
})
export class SalesPersonList {

 salesPersonlist:SalesPerson[]=[
  new SalesPerson('John', 'Doe', 'john.doe@example.com', 100000),
  new SalesPerson('Jane', 'Smith', 'jane.smith@example.com', 150000),
  new SalesPerson('Bob', 'Johnson', 'bob.johnson@example.com', 200000),
  new SalesPerson('Alice', 'Williams', 'alice.williams@example.com', 250000)
 ]
 
 stateData$= of(["MP","AP","UP","TN"]);
 cityData$= of(['mp','dehil',"mumbai","kolkata"]);





constructor(){
  forkJoin({
    states:this.stateData$,
    cities:this.cityData$
  }).subscribe((res:any)=>{
console.log('sates',res.states);
console.log('cities',res.cities);
  })
}
}
