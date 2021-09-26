import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { FilesService } from './files.service';
import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUnitResponse } from './dto/file-response-unit.dto';
import { MFile } from './dto/mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileUnitResponse[]> {
    const saveArray: MFile[] = [file];

    if (file.mimetype.includes('image')) {
      const webP = await this.service.convertToWebP(file.buffer);

      saveArray.push(
        new MFile({ originalname: `${file.originalname.split(',')[0]}.webp`, buffer: webP }),
      );
    }

    return this.service.saveFiles(saveArray);
  }
}
