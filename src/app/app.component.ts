import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Product } from './product';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Grouping and Table Reorder';
  availableProducts: Product[];
  draggedProduct: Product;
  rowGroupMetaData: any;
  draggedProductIndex: number;
  droppedProductIndex: number;

  constructor(private productService: DataService) {}

  ngOnInit() {
    this.productService.getProducts().then((products: Product[]) => {
      this.availableProducts = products;
      this.updateRowGroupMetaData(this.availableProducts);
    });
  }

  updateRowGroupMetaData(productData: Product[]) {
    this.rowGroupMetaData = {};
    if (productData) {
      for (let i = 0; i < productData.length; i++) {
        let rowData = productData[i];
        let productId = rowData.id;
        if (i == 0) {
          this.rowGroupMetaData[productId] = { index: 0, size: 1 };
        } else {
          let previousRowData = productData[i - 1];
          let previousRowGroupId = previousRowData.id;
          if (productId === previousRowGroupId) {
            this.rowGroupMetaData[productId].size++;
          } else {
            this.rowGroupMetaData[productId] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  onDragStart(event: any) {
    this.draggedProductIndex = event.target.attributes[1].value;
  }

  onDragEnd(event: any) {
    this.droppedProductIndex = event.target.attributes[1].value;
    if (this.draggedProductIndex != this.droppedProductIndex) {
      this.availableProducts[this.droppedProductIndex].id = this.getProductId(
        this.droppedProductIndex
      );
      this.updateRowGroupMetaData(this.availableProducts);
    }
  }

  getProductId(index: number) {
    for (let product in this.rowGroupMetaData) {
      if (
        index >= this.rowGroupMetaData[product].index &&
        index <
          this.rowGroupMetaData[product].index +
            this.rowGroupMetaData[product].size
      ) {
        return parseInt(product);
      }
    }
    return -1;
  }
}
