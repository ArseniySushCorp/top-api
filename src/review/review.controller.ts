import { JwtAuthGuard } from './../auth/guards/jwt.guard';
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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewModel } from './review.model';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { REVIEW_NOT_FOUND } from './review.const';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() dto: CreateReviewDto,
  ): Promise<DocumentType<ReviewModel>> {
    return this.reviewService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DocumentType<ReviewModel>> {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return deletedDoc;
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
