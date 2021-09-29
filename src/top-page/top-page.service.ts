import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageModel, TopLevelCategory } from './top-page.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { addDays } from 'date-fns';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly pageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto): Promise<TopPageModel> {
    return this.pageModel.create(dto);
  }

  async findById(id: string): Promise<TopPageModel> {
    return this.pageModel.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<TopPageModel> {
    return this.pageModel.findOne({ alias }).exec();
  }

  async deleteById(id: string): Promise<TopPageModel> {
    return this.pageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto): Promise<TopPageModel> {
    return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByFirstCategory(firstCategory: TopLevelCategory): Promise<TopPageModel[]> {
    return this.pageModel
      .aggregate()
      .match({ firstCategory })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  async findByText(text: string) {
    return this.pageModel
      .find({
        $text: {
          $search: text,
          $caseSensitive: false,
        },
      })
      .exec();
  }

  async findForHhUpdate(date: Date) {
    return this.pageModel
      .find({ firstCategory: TopLevelCategory.Courses, 'hh.updatedAt': { $lt: addDays(date, -1) } })
      .exec();
  }
}
