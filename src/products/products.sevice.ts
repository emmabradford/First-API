import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    //const prodID = Math.random().toString();
    const newProd = new this.productModel({
      title: title,
      description: description,
      price: price,
    });

    const result = await newProd.save();
    console.log(result);
    return 'prodID';
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

  updateProduct(i: string, t: string, d: string, p: number) {
    const found = this.findProd(i);
    const foundIndex = found[1];
    const foundProd = found[0];
    const newProd = { ...foundProd };
    if (t) {
      newProd.title = t;
    }
    if (d) {
      newProd.description = d;
    }
    if (p) {
      newProd.price = p;
    }
    this.products[foundIndex] = newProd;
  }

  private findProd(i: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === i);
    const productAns = this.products[productIndex];

    if (!productAns) {
      throw new NotFoundException('Your product is missing!!');
    }
    return [productAns, productIndex];
  }

  deleteProduct(i: string) {
    const [product, index] = this.findProd(i);
    this.products.splice(index, 1);
  }
}
