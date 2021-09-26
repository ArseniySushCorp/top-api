import { IdValidationPipe } from './../pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { PAGE_NOT_FOUND_ERROR } from './top-page.const';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly service: TopPageService) {}

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.service.findById(id);

    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
    }

    return page;
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.service.findByText(text);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async findByFirstCategory(@Body() { firstCategory }: FindTopPageDto) {
    return this.service.findByFirstCategory(firstCategory);
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.service.findByAlias(alias);

    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
    }

    return page;
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.service.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    const updatedPage = await this.service.updateById(id, dto);

    if (!updatedPage) {
      throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
    }

    return updatedPage;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPage = await this.service.deleteById(id);

    if (!deletedPage) {
      throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
    }

    return deletedPage;
  }
}
