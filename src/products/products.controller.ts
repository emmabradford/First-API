import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';
import { ProductsService } from './products.sevice';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedID = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedID };
  }
  @Get()
  getAllProducts() {
    return { products: this.productsService.getProducts() };
  }

  @Get(':id')
  getProduct(@Param('id') i: string) {
    return { product: this.productsService.getProduct(i) };
  }

  @Patch(':id')
  updateProduct(
    @Param('id') i: string,
    @Body('title') t: string,
    @Body('description') desc: string,
    @Body('price') p: number,
  ) {
    this.productsService.updateProduct(i, t, desc, p);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') i: string) {
    this.productsService.deleteProduct(i);
    return null;
  }
}
