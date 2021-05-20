import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.sevice';

@Controller('products')
export class ProductsController {
  productsService: ProductsService;
  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
  }
}
