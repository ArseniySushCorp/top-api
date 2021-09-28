import { TelegramService } from './../telegram/telegram.service';
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
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewService.create(dto);
  }

  @Post('notify')
  @UsePipes(new ValidationPipe())
  async notify(@Body() dto: CreateReviewDto): Promise<void> {
    const message =
      `name: ${dto.name}\n` +
      `title: ${dto.title}\n` +
      `description: ${dto.description}\n` +
      `rating: ${dto.rating}\n` +
      `product id: ${dto.productId}\n`;

    return this.telegramService.sendMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<DocumentType<ReviewModel>> {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return deletedDoc;
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
