import { TELEGRAM_MODULE_OPTIONS } from './telegram.const';
import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TelegramOptionsInterface } from './telegram.intefrace';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: TelegramOptionsInterface;
  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: TelegramOptionsInterface) {
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
