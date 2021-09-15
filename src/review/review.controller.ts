import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ReviewModel } from './review.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(
    @Body() dto: CreateReviewDto,
  ): Promise<DocumentType<ReviewModel>> {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DocumentType<ReviewModel>> {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(
        'Review with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return deletedDoc;
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('id') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
