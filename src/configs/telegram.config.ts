import { ConfigService } from '@nestjs/config';
import { TelegramOptionsInterface } from '../telegram/telegram.intefrace';

export const getTelegramConfig = async (
  configService: ConfigService,
): Promise<TelegramOptionsInterface> => {
  const token = configService.get('TELEGRAM_TOKEN');

  if (!token) {
    throw new Error('TELEGRAM_TOKEN not defined');
  }

  return {
    token,
    chatId: configService.get('CHAT_ID') ?? '',
  };
};
