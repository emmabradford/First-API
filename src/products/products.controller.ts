import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.sevice';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedID = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedID };
  }
  @Get()
  async getAllProducts() {
    const result = await this.productsService.getProducts();
    return result;
  }

  @Get(':id')
  getProduct(@Param('id') i: string) {
    return this.productsService.getProduct(i);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') i: string,
    @Body('title') t: string,
    @Body('description') desc: string,
    @Body('price') p: number,
  ) {
    await this.productsService.updateProduct(i, t, desc, p);
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') i: string) {
    await this.productsService.deleteProduct(i);
    return null;
  }
}
