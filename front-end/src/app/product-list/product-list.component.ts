import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { ProductService } from '../product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList:Observable<any>;
  constructor(private productServicce:ProductService) { }

  ngOnInit(){
    this.productServicce.listProduct().subscribe((data) => {
      this.productList = data;
    })
  }

  changeUnit(product,event){
    let unitPrice = product.priceList.find(obj => obj._id == event.target.value)
    product.currentPrice = unitPrice.price;
  }

}
