import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodID = Math.random().toString();
    const newProd = new Product(prodID, title, description, price);
    this.products.push(newProd);
    return prodID;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(i: string) {
    const productAns = this.products.find((prod) => prod.id === i);
    if (!productAns) {
      throw new NotFoundException('Your product is missing!!');
    }
    return { ...productAns };
  }
}
