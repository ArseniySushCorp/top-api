import { ReviewModel } from './review.model';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('review')
export class ReviewController {
  @Post()
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Get('byProduct/:productId')
  async getByProduct(@Param('id') productId: string) {}
}