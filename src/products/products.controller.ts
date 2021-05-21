import { Body, Controller, Post, Get, Param } from '@nestjs/common';
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
}
