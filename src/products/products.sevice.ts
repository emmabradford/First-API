import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodID = new Date().toString();
    const newProd = new Product(prodID, title, description, price);
    this.products.push(newProd);
    return prodID;
  }

  getProducts() {
    return [...this.products];
  }
}
