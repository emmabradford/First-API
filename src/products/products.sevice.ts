import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProd = new this.productModel({
      title,
      description: description,
      price,
    });

    const result = await newProd.save();
    return result.id as string;
  }

  async getProducts() {
    const result = await this.productModel.find().exec();
    return result.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getProduct(i: string) {
    const productAns = await this.findProd(i);

    return {
      id: productAns.id,
      title: productAns.title,
      description: productAns.description,
      price: productAns.price,
    };
  }

  async updateProduct(i: string, t: string, d: string, p: number) {
    const newProd = await this.findProd(i);

    if (t) {
      newProd.title = t;
    }
    if (d) {
      newProd.description = d;
    }
    if (p) {
      newProd.price = p;
    }
    newProd.save();
  }

  private async findProd(i: string): Promise<Product> {
    let productAns;
    try {
      productAns = await this.productModel.findById(i).exec();
    } catch (error) {
      throw new NotFoundException('Your product is missing!!');
    }
    if (!productAns) {
      throw new NotFoundException('Your product is missing!!');
    }
    return productAns;
  }

  async deleteProduct(i: string) {
    const product = await this.productModel.deleteOne({ _id: i }).exec();
    //  this.products.splice(index, 1);
    if (product.n === 0) {
      throw new NotFoundException('could not find the product');
    }
  }
}
