import { ConfigModule } from '@nestjs/config';
import { hhBaseURL } from '../hh/hh.const';

const getHhConfig = async (configService) => ({
  baseURL: hhBaseURL,
  headers: {
    'User-Agent': configService.get('HH_USER_AGENT'),
    Authorization: 'Bearer ' + configService.get('HH_TOKEN'),
  },
});

export default getHhConfig;
