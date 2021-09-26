import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { FilesService } from './files.service';
import {
  Controller,
  HttpCode,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUnitResponse } from './dto/file-response-unit.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]): Promise<FileUnitResponse[]> {
    return this.service.saveFiles(files);
  }
}
